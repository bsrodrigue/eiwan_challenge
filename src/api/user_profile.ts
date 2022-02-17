import { UserProfile } from '../interfaces/auth';
import { supabase } from '../lib/supabase/client';

const DATABASE_TABLE_NAME = 'user_profiles';

export const createUserProfile = async (user: UserProfile) => {
    try {

        const { data, error } = await supabase.from(DATABASE_TABLE_NAME)
            .insert(
                [user],
            );

        if (error) throw error;
        if (data) return data;

    } catch (error) {
        console.error("Error while creating user profile: ", error);
    }
}

export const getUserProfile = async (user_id: string): Promise<UserProfile | undefined> => {
    try {

        const { data, error } = await supabase.from(DATABASE_TABLE_NAME)
            .select("*")
            .eq('user_id', user_id);

        if (error) throw error;
        if (data) return data[0] as UserProfile;

    } catch (error) {
        console.error("Error while requesting user profile: ", error);
    }
}

export const getUserProfiles = async (): Promise<UserProfile[] | undefined> => {
    try {

        const { data, error } = await supabase.from(DATABASE_TABLE_NAME)
            .select("*");

        if (error) throw error;
        if (data) return data as UserProfile[];

    } catch (error) {
        console.error("Error while requesting user profiles: ", error);
    }
}
