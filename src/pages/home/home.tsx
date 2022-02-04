import 'react-datepicker/dist/react-datepicker.css';

import { Box, Button, Card, CardContent, CardHeader, Chip } from '@mui/material';
import { useEffect, useState } from 'react';

import { acceptChallengeAsChallenger, getChallengesAsChallenger } from '../../api/challenge';
import { Challenge } from '../../interfaces/models';
import { supabase } from '../../lib/supabase/client';



const STATUS_MAP: {
    [key: string]: any,
} = {
    'pending': 'warning',
    'rejected': 'error',
    'accepted': 'success',
};


interface ChallengeCardActionsProps {
    status: string;
    userId?: string;
    challengeId?: string | number;
    setChallenges?: Function;
}

const ChallengeCardActions: React.FC<ChallengeCardActionsProps> = (props: ChallengeCardActionsProps) => {
    const { status, userId, challengeId, setChallenges } = props;
    const actions: { [key: string]: any } = {
        'pending': {
            text: 'Accept Challenge',
            color: 'success',
            onClick: async (userId: string, challengeId: string) => {
                const result = await acceptChallengeAsChallenger(userId, challengeId);
                // onActionPerformed && onActionPerformed({ status, result });
            },
        },
        'rejected': {
            text: 'Delete',
            color: 'error',
            onClick: () => { },
        },
        'accepted': {
            text: 'Give up',
            color: 'error',
            onClick: () => { },
        },
    };

    const action = actions[status];

    return (<Button fullWidth variant='contained' onClick={() => { userId && challengeId && action.onClick(userId, challengeId) }} color={action.color}>{action.text}</Button>);
}

interface ChallengeCardProps {
    challenge: Challenge;
    userId?: string;
    setChallenges?: Function;
}

const ChallengeCard: React.FC<ChallengeCardProps> = (props: ChallengeCardProps) => {
    const { challenge: { id, title, status }, userId, setChallenges } = props;

    return (
        <Card>
            <CardHeader title={title} subheader={
                <Chip label={status} color={STATUS_MAP[status]} />
            } />
            <CardContent>
                <ChallengeCardActions userId={userId} challengeId={id} status={status} setChallenges={setChallenges} />
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
                            <ChallengeCard userId={user?.id} challenge={challenge} setChallenges={setChallenges} />
                        </Box>

                    )
                })
            }
        </>

    )
}

export default Home;