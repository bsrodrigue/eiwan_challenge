import { Button, CircularProgress, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { supabase } from '../../lib/supabase/client';

const Login: React.FC = () => {
    // States
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);


    // Hooks
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['auth']);


    const submit = async (e: any) => {
        e.preventDefault();

        if (email === "" && password === "") {
            console.log("Please provide email and password");
            return;
        }

        try {
            setLoading(true);
            const { user, session, error } = await supabase.auth.signIn({
                email, password,
            });
            if (error) throw error;
            toast.success("Successfully logged in");
            setCookie("auth", {
                user, session
            }, {
                path: '/',
            });
            navigate("/");

        } catch (e: any) {
            const message = e?.message;
            toast.error(message);
            console.error("Error while login: ", e);
        }
        finally {
            setLoading(false);
        }


    }


    return (
        <>
            <TextField margin='dense' label="Email" fullWidth onChange={(e) => { setEmail(e.target.value) }} />
            <TextField margin='dense' label="Password" fullWidth onChange={(e) => { setPassword(e.target.value) }} />

            <Button fullWidth variant='contained' onClick={submit}  >
                {loading && (<CircularProgress sx={{ color: 'white', margin: '0 1em' }} size="1em" />)}
                {loading ? 'Logging in...' : 'Login'}
            </Button>
        </>
    )
}

export default Login;