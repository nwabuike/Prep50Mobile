// export const USER = '[USER]'
// export const USER_LOGIN = `${USER} Set user as logged in`
// export const USER_LOGOUT = `${USER} Set user as logged out`
// export const RESTORE_TOKEN = `${USER} Set user Token`

// export const userLogin = ({ name }) => ({
//     type: USER_LOGIN,
//     payload: {
//         name,
//     },
// })
// export const userLogout = () => ({
//     type: USER_LOGOUT,
//     payload: {

//     },
// })
// export const restoreToken = () => ({
//     type: RESTORE_TOKEN,
//     payload: {

//     },
// })
export const getToken = (token) => ({
    type: 'GET_TOKEN',
    token,
});

export const saveToken = token => ({
    type: 'SAVE_TOKEN',
    token
});

export const removeToken = () => ({
    type: 'REMOVE_TOKEN',
});

export const loading = bool => ({
    type: 'LOADING',
    isLoading: bool,
});

export const error = error => ({
    type: 'ERROR',
    error,
});


