export const pages = {
    home: '/home',
    signUp: '/signUp',
    signIn: '/',
    serviceDetails: '/services/',
    myServices: '/user/services',
    editService: '/user/services/',
    servicesByCategories: '/services/categories',
    CreateService: '/user/new-service'
}

const API_URL = import.meta.env.VITE_API_URL;

export const requisitions = {
    postSignUp: API_URL + '/signup',
    postSignIn: API_URL + '/signin',
    postSignInGoogle: API_URL + '/signin/google',
    getServices: API_URL + '/services',
    getServiceDetail: API_URL + '/services/',
    getMyServices: API_URL + '/user/services',
    getMyServiceDetail: API_URL + '/user/services/',
    updateService: API_URL + '/user/services/',
    getServiceParams: API_URL + '/user/services-params',
    postService: API_URL + '/user/new-service',
    getAllParams: API_URL + '/services-params',
    getServicesByCategories: API_URL + '/services-by-categories'
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