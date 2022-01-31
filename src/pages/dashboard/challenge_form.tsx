import { Button, CircularProgress, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

import { createChallenge } from '../../api/challenge';
import { Challenge } from '../../interfaces/models';
import { supabase } from '../../lib/supabase/client';

const ChallengeForm: React.FC = () => {
    // States
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);


    const submit = async (e: any) => {
        e.preventDefault();

        // if (email === "" && password === "") {
        //     console.log("Please provide email and password");
        //     return;
        // }

        try {
            setLoading(true);

            const user = supabase.auth.user();

            user && await createChallenge(
                {
                    title: "Draw a sticker pack for A-One Team",
                    description: "The challenger must create a whatsapp sticker pack based on A-One Team",
                    start_date: new Date(),
                    end_date: new Date(),
                    author: user?.id,
                    supervisors: user?.id,
                    validators: user?.id,
                    status: "pending",
                    is_completed: false,
                    challenger: user?.id,
                }

            );

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
                {loading ? 'Creating new Challenge...' : 'Create'}
            </Button>
        </>
    )
}

export default ChallengeForm;