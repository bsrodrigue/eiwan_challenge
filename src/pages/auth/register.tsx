import { Button, CircularProgress, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

import { supabase } from '../../lib/supabase/client';

const Register: React.FC = () => {
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
            const { error } = await supabase.auth.signUp({
                email, password,
            });
            if (error) throw error;
            try {
                const { error } = await supabase.auth.signIn({
                    email, password,
                });
                if (error) throw error;
            } catch (e) {
                console.error("Error while login: ", e);
            }

        } catch (e) {
            console.error("Error while register: ", e);
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
                {loading && (<CircularProgress />)}
                {loading ? 'Registration...' : 'Register'}
            </Button>
        </>
    )
}

export default Register;