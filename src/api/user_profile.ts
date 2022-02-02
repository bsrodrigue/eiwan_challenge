import { UserProfile } from '../interfaces/auth';
import { supabase } from '../lib/supabase/client';

export const createUserProfile = async (user: UserProfile) => {
    try {

        const { data, error } = await supabase.from("user_profiles").insert(
            [user],
        );

        if (error) throw error;
        if (data) return data;

    } catch (error) {
        console.error("Error while creating user profile: ", error);
    }
}

export const getUserProfile = async (user_id: string) => {
    try {

        const { data, error } = await supabase.from("user_profiles")
            .select("*")
            .eq('user_id', user_id);

        if (error) throw error;
        if (data) return data[0];

    } catch (error) {
        console.error("Error while requesting user profile: ", error);
    }
}

export const getUserProfiles = async (): Promise<UserProfile[] | undefined> => {
    try {

        const { data, error } = await supabase.from("user_profiles")
            .select("*");

        if (error) throw error;
        if (data) return data as UserProfile[];

    } catch (error) {
        console.error("Error while requesting user profiles: ", error);
    }
}