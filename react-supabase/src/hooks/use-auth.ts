import supabase from "@/lib/supabase";
import { useAuthStore } from "@/stores";
import { useEffect } from "react";

export default function UseAuthListener() {
    const setUser = useAuthStore((state) => state.setUser);

    useEffect(()=>{
        const checkSession = async() =>{
        const {data:{session}} = await supabase.auth.getSession();
        
        if(session?.user){
            setUser({
                id: session.user.id,
                email: session.user.email as string,
                role: session.user.role as string,
            });
        }
        };
        checkSession();

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            if(session?.user){
                setUser({
                    id: session.user.id,
                    email: session.user.email as string,
                    role: session.user.role as string,
                });
            } else{
                setUser(null);
            }
        });

        return () => listener.subscription.unsubscribe();

    }, []);
}
