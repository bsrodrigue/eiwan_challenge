import { Challenge } from '../interfaces/models';
import { supabase } from '../lib/supabase/client';

export const createChallenge = async (challenge: Challenge) => {
    try {

        console.log(challenge);
        const { data, error } = await supabase.from("Challenge").insert(
            [challenge],
        );

        if (error) throw error;

        console.log(data);

    } catch (error) {

        console.error("Error while creating challenge: ", error);
    }


}