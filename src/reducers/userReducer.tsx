

const initialState = {
    email: ''
}


export default (state = initialState, action:any) => {
    if(action.type === 'SET_EMAIL'){
        return { ...state, email:action.payload.email };
    }

    return state;
}