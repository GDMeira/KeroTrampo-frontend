export const pages = {
    home: '/home',
    signUp: '/signUp',
    signIn: '/',
    myServices: '/services/me',
    servicesByCategories: '/services/categories'
}

const API_URL = import.meta.env.VITE_API_URL;

export const requisitions = {
    postSignUp: API_URL + '/signup',
    postSignIn: API_URL + '/signin',
    postSignInGoogle: API_URL + '/signin/google',
    getServices: API_URL + '/services'
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