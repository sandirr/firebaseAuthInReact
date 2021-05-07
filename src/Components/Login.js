import React, {Component} from 'react'
import { Button, Container, Grid, TextField } from '@material-ui/core'
import { Link } from 'react-router-dom'
import {firebaseAuthentication, googleProvider} from '../config/firebase'

export default class Login extends Component{
    state = {
        email:'',
        password: ''
    }
    handleChangeField = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        const {email, password} = this.state
        firebaseAuthentication.signInWithEmailAndPassword(email, password)
        .then(res=>{
            if(res.user.emailVerified){
                this.props.history.push('/home')
            }else{
                alert('Verifikasi email anda terlebih dahulu!')
                firebaseAuthentication.signOut()
            }
        })
        .catch(error=>{
            alert(error.message)
        })
    }

    handleLoginWithGoogle = () =>{
        firebaseAuthentication.signInWithPopup(googleProvider)
        .then(()=>{
            this.props.history.push('/home')
        })
        .catch(error=>{
            alert(error.message)
        })
    }

    render(){
        const {email, password} = this.state
        return(
            <Container>
                <Grid container justify="center">
                    <Grid xs="12" md="8" lg="4">
                        <h2>Halaman Login</h2>
                        <form onSubmit={this.handleSubmit}>
                            <TextField type="email" fullWidth margin="dense" variant="outlined" size="small" value={email} onChange={this.handleChangeField} name="email" label="Email" required />
                            <TextField type="password" fullWidth margin="dense" variant="outlined" size="small" value={password} onChange={this.handleChangeField} name="password" label="Password" required />
                            <Button type="submit" fullWidth variant="contained" color="primary">Login</Button>
                        </form>
                        <Button onClick={this.handleLoginWithGoogle} variant="outlined" color="inherit" fullWidth style={{marginTop:20}}>Login dengan Google</Button>
                        <p>Belum punya akun? <Link to="/registrasi">Registrasi</Link></p>
                        <p>Lupa password? <Link to="/forgot-password">Reset Password</Link></p>
                    </Grid>
                </Grid>
            </Container>
        )
    }
}