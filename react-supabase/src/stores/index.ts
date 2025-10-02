import {create} from 'zustand'
import { persist } from "zustand/middleware";


interface User {
    id: string;
    email: string;
    role: string;

}

interface AuthStore {
    user: User

    setUser: (newUser: User)=> void;
    
    
    reset: () => void;
}


// export const useAuthStore = create<AuthStore>((set) => ({
//     id: '',
//     email: '',
//     role: '',

//     setId: (newId) => set(({id: newId})),
//     setEmail: (newEmail) => set(({id: newEmail})),
//     setRole: (newRole) => set(({role: newRole})),

//     reset:  () => set({id: '', email: '', role: ''}),
// }));

export const useAuthStore = create<AuthStore>()(
    persist((set) =>({
        user : {
            id: '',
            email: '',
            role: '',
        },
        setUser:(newUser: User) => set({user : newUser}),

        reset: () => {
                set({
                    user: { id: "", email: "", role: "" },
                }),
                    localStorage.removeItem("auth-storage");
            },
    }),
    {name: 'auth-storage'}

));