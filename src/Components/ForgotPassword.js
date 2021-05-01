import React, {Component} from 'react'
import { Button, Container, Grid, TextField } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { firebaseAuthentication } from '../config/firebase'

export default class ForgotPassword extends Component{
    state = {
        email:'',
    }
    handleChangeField = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        const {email} = this.state
        firebaseAuthentication.sendPasswordResetEmail(email)
        .then(()=>{
            alert('Silahkan periksa email anda untuk mengubah password')
            this.props.history.push('/login')
        })
        .catch(error=>{
            alert(error.message)
        })
    }
    render(){
        const {email} = this.state
        return(
            <Container>
                <Grid container justify="center">
                    <Grid xs="12" md="8" lg="4">
                        <h2>Halaman Forgot Password</h2>
                        <form onSubmit={this.handleSubmit}>
                            <TextField type="email" fullWidth margin="dense" variant="outlined" size="small" value={email} onChange={this.handleChangeField} name="email" label="Email" required />
                            <Button type="submit" fullWidth variant="contained" color="primary">Kirim Email Reset Password</Button>
                        </form>
                        <p>Belum punya akun? <Link to="/registrasi">Registrasi</Link></p>
                        <p>Sudah Punya Akun? <Link to="/forgot-password">Login</Link></p>
                    </Grid>
                </Grid>
            </Container>
        )
    }
}