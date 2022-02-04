import { Challenge } from '../interfaces/models';
import { supabase } from '../lib/supabase/client';

export const createChallenge = async (challenge: Challenge) => {
    try {

        const { data, error } = await supabase.from("challenges").insert(
            [challenge],
        );

        if (error) throw error;

    } catch (error) {
        console.error("Error while creating challenge: ", error);
    }
}

export const getChallengesAsChallenger = async (user_id: string) => {
    try {

        const { data, error } = await supabase.from("challenges")
            .select("*")
            .eq('challenger', user_id);

        if (error) throw error;
        if (data) return data;

    } catch (error) {
        console.error("Error while requesting challenges where user participates: ", error);
    }
}