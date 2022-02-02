
import { useState, useEffect } from 'react';
import { UserProfile } from '../interfaces/auth';
import { getUserProfiles } from '../api/user_profile';

export const useUserProfiles = () => {
    const [profiles, setProfiles] = useState<UserProfile[]>([]);

    useEffect(() => {
        const fetchProfiles = async () => {
            const result = await getUserProfiles();
            result && setProfiles(result);
        }
        fetchProfiles();
    }, [])

    return profiles;
}