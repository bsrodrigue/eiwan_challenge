import { Button, CircularProgress, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

import { supabase } from '../../lib/supabase/client';
import { createUserProfile, getUserProfile } from '../../api/user_profile';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    // States
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    // Hooks
    const navigate = useNavigate();

    const submit = async (e: any) => {
        e.preventDefault();

        const formNotFilled = [username, email, password].some((input: string) => input === "");

        if (formNotFilled) {
            alert("Please fill form");
            return;
        }

        try {
            setLoading(true);
            const { user, error } = await supabase.auth.signUp({
                email, password,
            });
            if (error) throw error;
            navigate("/auth/login");
            user && await createUserProfile({ username, user_id: user?.id });
        } catch (e) {
            console.error("Error while register: ", e);
        }
        finally {
            setLoading(false);
        }


    }


    return (
        <>
            <TextField margin='dense' label="Username" fullWidth onChange={(e) => { setUsername(e.target.value) }} />
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