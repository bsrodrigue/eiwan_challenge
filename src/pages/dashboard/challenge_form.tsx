import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

import { createChallenge } from '../../api/challenge';
import { Challenge } from '../../interfaces/models';
import { supabase } from '../../lib/supabase/client';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const ChallengeForm: React.FC = () => {
    // States
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [supervisor, setSupervisor] = useState<string>('');
    const [validators, setValidators] = useState<string>('');
    const [challenger, setChallenger] = useState<string>('');


    const [loading, setLoading] = useState<boolean>(false);


    const submit = async (e: any) => {
        e.preventDefault();

        try {
            setLoading(true);

            const user = supabase.auth.user();

            user && await createChallenge(
                {
                    title,
                    description,
                    start_date: startDate,
                    end_date: endDate,
                    supervisors: user?.id,
                    validators: user?.id,
                    challenger: user?.id,
                    author: user?.id,
                    status: "pending",
                    is_completed: false,
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
            {/*  Text */}
            <TextField margin='dense' label="Title" fullWidth onChange={(e) => { setTitle(e.target.value) }} />
            <TextField margin='dense' label="Description" fullWidth onChange={(e) => { setDescription(e.target.value) }} />

            <FormControl margin='dense' fullWidth>
                <InputLabel>Challenger</InputLabel>
                <Select
                    label="Challenger"
                    value={challenger}
                    onChange={(e) => { setChallenger(e.target.value) }}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value={30}>BADINI Rachid Rodrigue</MenuItem>
                </Select>
            </FormControl>

            <FormControl margin='dense' fullWidth>
                <InputLabel>Challenger</InputLabel>
                <Select
                    label="Challenger"
                    value={null}
                    onChange={() => { }}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value={30}>BADINI Rachid Rodrigue</MenuItem>
                </Select>
            </FormControl>

            {/*  Dates */}
            <Box margin='dense' >
                <DatePicker selected={startDate} onChange={(date) => { date && setStartDate(date) }} />
            </Box>
            <Box margin='dense' >
                <DatePicker selected={endDate} onChange={(date) => { date && setEndDate(date) }} />
            </Box>
            <Button fullWidth variant='contained' onClick={submit}  >
                {loading && (<CircularProgress />)}
                {loading ? 'Creating new Challenge...' : 'Create'}
            </Button>
        </>
    )
}

export default ChallengeForm;