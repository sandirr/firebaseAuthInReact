import React, {Component} from 'react'
import { Button, Container, Grid, Paper, TextField } from '@material-ui/core'
import { firebaseAuthentication } from '../config/firebase'

export default class Home extends Component{
    state = {
        user:{},
        password:'',
        email:'',
    }
    componentDidMount(){
        firebaseAuthentication.onAuthStateChanged((user)=>{
            if(!user){
                this.props.history.push('/login')
            }else{
                this.setState({user})
            }
        })
    }
    handleLogOut = () =>{
        firebaseAuthentication.signOut()
    }

    handleUpdateEmail = (e) =>{
        e.preventDefault()
        firebaseAuthentication.currentUser.updateEmail(this.state.email)
        .then(()=>{
            firebaseAuthentication.currentUser.sendEmailVerification()
            .then(()=>{
                alert('Verifikasi email baru anda')
            })
            .catch(error=>{
                alert(error.message)
            })
        })
        .catch(error=>{
            alert(error.message)
        })
    }

    handleUpdatePassword = (e) =>{
        e.preventDefault()
        firebaseAuthentication.currentUser.updatePassword(this.state.password)
        .then(()=>{
            alert('Sukses mengubah password')
            this.setState({password:''})
        })
        .catch(error=>{
            alert(error.message)
        })
    }

    handleUpdateProfile = (e) =>{
        e.preventDefault()
        const {displayName} = this.state.user
        firebaseAuthentication.currentUser.updateProfile({
            displayName
        })
        .then(()=>{
            alert('Sukses update profile')
        })
        .catch(error=>{
            alert(error.message)
        })
    }
    render(){
        console.log(this.state.user)
        const {displayName} = this.state.user
        return(
            <Container>
                <Paper style={{padding:5}}>
                    <Button onClick={this.handleLogOut}>Logout</Button>
                    <h1>Ini Home</h1>
                    <Grid container>
                        <Grid style={{padding:10}} xs={12} md={4} item>
                            <form onSubmit={this.handleUpdateProfile}>
                                <TextField margin="dense" label="Nama" value={displayName || ""} onChange={(e)=>{ this.setState({user: {...this.state.user, displayName: e.target.value} }) }} InputLabelProps={{shrink:true}} fullWidth variant="outlined" size="small" />
                                <Button type="submit" fullWidth variant="contained" color="primary">Update Profile</Button>
                            </form>
                        </Grid>

                        <Grid style={{padding:10}} xs={12} md={4} item>
                            <form onSubmit={this.handleUpdateEmail}>
                                <TextField required type="email" margin="dense" label="Email" value={this.state.email} onChange={(e)=>{ this.setState({email: e.target.value}) }} InputLabelProps={{shrink:true}} fullWidth variant="outlined" size="small" />
                                <Button type="submit" fullWidth variant="contained" color="primary">Update Email</Button>
                            </form>
                        </Grid>

                        <Grid style={{padding:10}} xs={12} md={4} item>
                            <form onSubmit={this.handleUpdatePassword}>
                                <TextField type="password" margin="dense" label="Password" value={this.state.password} onChange={(e)=>{ this.setState({password: e.target.value}) }} InputLabelProps={{shrink:true}} fullWidth variant="outlined" size="small" />
                                <Button type="submit" fullWidth variant="contained" color="primary">Update Password</Button>
                            </form>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        )
    }
}