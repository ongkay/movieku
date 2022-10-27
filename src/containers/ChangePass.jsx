import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
//import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import * as React from 'react';
import { useState } from 'react';
//import { Link, useNavigate } from 'react-router-dom';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

//import useUserStore, { selectErrorLogin, selectOnLogin, selectUserReady } from '../store/user';
const firebaseConfig = {
    apiKey: 'AIzaSyA8PZNnzSKPblYhnwFq7XNRjSbutPty3VQ',
    authDomain: "mood-meter-13966.firebaseapp.com",
    projectId: "mood-meter-13966",
    storageBucket: "mood-meter-13966.appspot.com",
    messagingSenderId: "17422836348",
    appId: "1:17422836348:web:25d2fbcb86bbaddb759ff9",
    measurementId: "G-YKPBJ9XBLH"
};

firebase.initializeApp(firebaseConfig);

const ChangePass = () => {
    //const navigate = useNavigate();
    //const onLogin = useUserStore(selectOnLogin);
    //const userReady = useUserStore(selectUserReady);
    //const errorLogin = useUserStore(selectErrorLogin);

    const [msg, setMsg] = useState('');
    const [severity, setSeverity] = useState('warning');
    const [openAlert, setOpenAlert] = useState(false);
    
    const handleOpenAlert = () => {
      setOpenAlert(true);
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    const reauthenticate = (currentPassword) => {
        var user = firebase.auth().currentUser;
        console.log(user);
        var cred = firebase.auth.EmailAuthProvider.credential(
            user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
      }
    
    const changePassword = (currentPassword, newPassword) => {
        reauthenticate(currentPassword).then(() => {
            var user = firebase.auth().currentUser;
            user.updatePassword(newPassword).then(() => {
                console.log("Password updated!");
            }).catch((error) => { console.log(error); });
        }).catch((error) => { console.log(error); });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const oldPassword = data.get('oldPassword');
        const newPassword = data.get('newPassword');
        const reTypePassword = data.get('reTypePassword');

        console.log(oldPassword, newPassword, reTypePassword);

        if (oldPassword && newPassword && reTypePassword) {
          if(newPassword === reTypePassword) {
            changePassword(oldPassword, newPassword);
            setSeverity('success');
            setMsg('Password User berhasil diubah !');
            handleOpenAlert(); 
          } else {
            setSeverity('warning');
            setMsg('Password yang diulangi tidak sama!');
            handleOpenAlert();
          }
        } else {
          setSeverity('warning');
          setMsg('Password belum diisi!');
          handleOpenAlert();
        } 
    };

    return (
        <Container component="main" maxWidth="xs">
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={openAlert}
                autoHideDuration={4000}
                onClose={handleCloseAlert}
                key={ 'top' & 'center'}
            >
                <Alert onClose={handleCloseAlert} severity={severity} sx={{ width: '100%' }} >
                    {msg}
                </Alert>
            </Snackbar>
            <Box
                sx={{
                    mt: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Change Password
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="oldPassword"
                        label="Current Password"
                        type="password"
                        id="oldPassword"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="newPassword"
                        label="New Password"
                        type="password"
                        id="newPassword"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="reTypePassword"
                        label="Re-Type Password"
                        type="password"
                        id="reTypePassword"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Change Password
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default ChangePass;
