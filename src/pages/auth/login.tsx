import { TextField, Button, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';

import { supabase } from '../../lib/supabase/client';

const Login: React.FC = () => {
    // States
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);


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
            console.table(user);
            console.table(session);

        } catch (e) {
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