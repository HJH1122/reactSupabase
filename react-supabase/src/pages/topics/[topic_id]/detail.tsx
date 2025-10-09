import { AppEditor } from "@/components/common";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, Button, Separator } from "@/components/ui";
import supabase from "@/lib/supabase";
import { useAuthStore } from "@/stores";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

export default function TopicDetail() {

    const navigate = useNavigate();
    const {id} = useParams();
    const user = useAuthStore((state) => state.user);
    const [author, setAuthor] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [thumbnail, setThumbnail] = useState<string>('');
    const [content, setContent] = useState<string>('');

    const fetchTopic = async() =>{
        try{
            const {data: topic, error} = await supabase.from('topic').select('*').eq('id', id);

            if(error){
                toast.error(error.message);
                return;
            }

            if(topic){
                setAuthor(topic[0].author);
                setCategory(topic[0].category);
                setTitle(topic[0].title);
                setThumbnail(topic[0].thumbnail);
                setContent(topic[0].content);
            }
        }catch(error){
            console.log(error);
            throw error;
        }
    };

    const handleDelete = async() =>{
        try{
            const {error} = await supabase.from('topic').delete().eq('id', id);

            if(error){
                toast.error(error.message);
                return;
            } 

            toast.success('토픽을 삭제하였습니다.');
            navigate('/');
           
        }catch(error){
            console.log(error);
            throw error;
        }
    }

    useEffect(()=>{
        fetchTopic();
    }, [id])

    return (
            <main className="w-full h-full min-h-[720px] flex flex-col">
                <div className="relative w-full h-60 md:h-100 bg-cover bg-[50%_35%] bg-accent" style={{ backgroundImage : `url(${thumbnail})`}}>
                    <div className="absolute top-6 left-6 z-10 flex items-center gap-2">
                        <Button variant='outline' size='icon' onClick={() => navigate('/')}>
                            <ArrowLeft/>
                        </Button>
                        {author === user.id && (
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant='outline' size='icon' className="!bg-red-800/50">
                                        <Trash2 />
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                    <AlertDialogTitle>정말 해당 토픽을 삭제하시겠습니까?</AlertDialogTitle>
                                    <AlertDialogDescription>삭제하시면 해당 토픽의 모든 내용이 영구적으로 삭제됩니다.</AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                    <AlertDialogCancel>닫기</AlertDialogCancel>
                                    <AlertDialogAction className="bg-red-800/50 text-foreground hover:bg-red-700/50" onClick={handleDelete}>삭제</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                            
                        )}
                        
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-l from-[#0a0a0a] via-transparent to-transparent"></div>
                </div>
                <section className="relative w-full flex flex-col items-center -mt-40">
                    <span className="mb-4">#{category}</span>
                    <h1 className="scroll-m-20 text-center font-extrabold tracking-tight text-xl sm:text-2xl md:text-4xl">{title}</h1>
                    <Separator className="!w-6 my-6 bg-foreground"/>
                    <span>2025. 09. 09.</span>
                </section>
                <div className="w-full py-6">
                    {content && <AppEditor props={JSON.parse(content)} readonly/>}
                </div>
            </main>
    )
  
}
