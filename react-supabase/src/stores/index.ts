import supabase from '@/lib/supabase';
import {create} from 'zustand'
import { persist } from "zustand/middleware";


interface User {
    id: string;
    email: string;
    role: string;

}

interface AuthStore {
    user: User | null;

    setUser: (newUser: User | null)=> void;
    
    
    reset: () => Promise<void>;
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
        setUser:(newUser: User | null) => set({user : newUser}),

        reset: async() => {

                await supabase.auth.signOut();
                set({
                    user: null,
                });

                localStorage.removeItem("auth-storage");
            },
    }),
    {name: 'auth-storage', partialize:(state) => ({ user: state.user})}

));