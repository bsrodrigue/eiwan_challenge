import 'react-datepicker/dist/react-datepicker.css';

import { Box, Button, Card, CardContent, CardHeader, Chip, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';

import { createChallenge, getChallengesAsChallenger } from '../../api/challenge';
import { useUserProfiles } from '../../hooks/useUserProfiles';
import { UserProfile } from '../../interfaces/auth';
import { supabase } from '../../lib/supabase/client';
import { Challenge } from '../../interfaces/models';



const STATUS_MAP: {
    [key: string]: any,
} = {
    'pending': 'warning',
    'rejected': 'error',
    'accepted': 'success',
};


interface ChallengeCardActionsProps {
    status: string;
}

const ChallengeCardActions: React.FC<ChallengeCardActionsProps> = (props: ChallengeCardActionsProps) => {
    const { status } = props;
    const actions: { [key: string]: any } = {
        'pending': {
            text: 'Accept Challenge',
            color: 'success',
            onClick: () => { alert("Hello") },
        },
        'rejected': {
            text: 'Accept Challenge',
            color: 'success',
            onClick: () => { },
        },
        'accepted': {
            text: 'Accept Challenge',
            color: 'success',
            onClick: () => { },
        },
    };

    const action = actions[status];

    return (<Button fullWidth variant='contained' onClick={action.onClick} color={action.color}>{action.text}</Button>);
}

interface ChallengeCardProps {
    challenge: Challenge;
}

const ChallengeCard: React.FC<ChallengeCardProps> = (props: ChallengeCardProps) => {
    const { challenge: { title, status } } = props;

    return (
        <Card>
            <CardHeader title={title} subheader={
                <Chip label={status} color={STATUS_MAP[status]} />
            } />
            <CardContent>
                <ChallengeCardActions status={status} />
            </CardContent>
        </Card>

    );
}


const Home: React.FC = () => {
    const [challenges, setChallenges] = useState<Challenge[]>([]);

    const user = supabase.auth.user();

    useEffect(() => {
        const fetchChallengesAsChallenger = async () => {
            if (user) {
                const result = await getChallengesAsChallenger(user.id);
                result && setChallenges(result);
            }

        }

        fetchChallengesAsChallenger();
    }, [])

    return (
        <>
            {
                challenges.map((challenge: Challenge, index: number) => {

                    return (
                        <Box key={challenge.id} marginY={1}>
                            <ChallengeCard challenge={challenge} />
                        </Box>

                    )
                })
            }
        </>

    )
}

export default Home;