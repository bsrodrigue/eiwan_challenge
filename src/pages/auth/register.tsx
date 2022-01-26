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
            const { user, session, error } = await supabase.auth.signUp({
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
        <form id='login-form' >
            <label htmlFor="email">Email:</label>
            <input type="text" name="email" onChange={(e) => { setEmail(e.target.value) }} />
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" onChange={(e) => { setPassword(e.target.value) }} />

            <input type="button" onClick={submit} value={loading ? 'Loading...' : 'Register'} />
        </form>
    )
}

export default Register;