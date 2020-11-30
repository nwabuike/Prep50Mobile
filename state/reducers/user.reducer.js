import { USER_LOGIN, USER_LOGOUT, RESTORE_TOKEN} from '../actions/user.actions'


const initialState = {
    isLoggedIn: false,
    isLoading: true,
    isSignout: false,
    userToken: null,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        // case RESTORE_TOKEN :
        //     return {
        //       ...prevState,
        //       userToken: action.token,
        //       isLoading: false,
        //     };
            case USER_LOGIN:
                return {
                //   ...prevState,
                  isLoggedIn: true,
                  isSignout: false,
                  name: action.lastname,
                };

        case USER_LOGOUT: {
            return {
                // ...prevState,
                isSignout: true,
                userToken: null,
            }
        }
        
        default: {
            return state
        }
    }
}

export default userReducer
