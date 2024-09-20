

export const todoReducer = ( initialState, action ) => {

    switch (action.type) {
        case 'Add Todo':
            //if( initialState.filter( el => el.description.trim().toLowerCase() === action.payload.description.trim().toLowerCase()).length > 0 ) return initialState;
            return [ ...initialState, action.payload ];
        case 'Delete Todo':
            return initialState.filter( todo => todo.id != action.payload );
        case 'Update Done Todo':
            return initialState.map( todo => {
                if( todo.id === action.payload ) {
                    return {
                        ...todo,
                        done: !todo.done
                    }
                }
                return todo;
            })
        default:
            return initialState;    
    }

}