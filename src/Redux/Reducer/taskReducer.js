import { GET_ADDTASK } from '../Utils/constant';

const initialState = {
    addTask: [], getAddtask: []

}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ADDTASK:
            return {
                ...state,
                getAddtask: action.payload
            }

        default:
            return state;
    }
}