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