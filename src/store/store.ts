import { createStore } from 'redux';
import { UserProfile } from '../interfaces/auth';


const reducer = (state: UserProfile = { user_id: "0", username: 'Anonymous' }, action: any) => {
    switch (action.type) {
        case 'fap':
            return { user_id: "1", username: "ultifapper" }
        default:
            return state
    }

}

let store = createStore(reducer);
