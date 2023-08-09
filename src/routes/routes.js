export const pages = {
    home: '/home',
    signUp: '/signUp',
    signIn: '/'
}

const API_URL = import.meta.env.VITE_API_URL;

export const requisitions = {
    postSignUp: API_URL + '/signup',
    postSignIn: API_URL + '/signin',
    postSignInGoogle: API_URL + '/signin/google',
}

export function headersAuth(token) {
    if (!token && localStorage.user) {
        const user = JSON.parse(localStorage.user);
        token = user.token;
    }

    return {headers: {
        'Authorization': `Bearer ${token}`
    }}
}