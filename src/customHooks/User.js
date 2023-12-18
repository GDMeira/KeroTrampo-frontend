import { create } from "zustand";

export const useUser = create(set => {
    const savedUser = localStorage.getItem('userKT') ? JSON.parse(localStorage.getItem('userKT')) : undefined;

    return {
        user: savedUser,
        setUser: newUser => set(state => ({ user: {...state.user, ...newUser}})),
        setAdress: newAdress => set(state => ({ user: { ...state.user, adress: { ...state.user.adress, ...newAdress}}}))
    }
})