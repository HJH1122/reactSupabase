import { useRef } from "react";
import { Button, Input } from "../ui";
import { Image } from "lucide-react";


interface Props{
    file: File | string | null;
    onChange: (file: File | string | null) => void;
}

export function AppFileUpload({file, onChange}: Props) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) =>{
        onChange(event.target.files?.[0] ?? null);

        event.target.value = '';
    };

    const handleRenderPreview = () =>{
        if(typeof file === 'string'){
            return <img src={file} alt="@THUMBNAIL" className="w-full aspect-vieo rounded-lg object-cover border"/>
        }
        else if(file instanceof File){
            return <img src={URL.createObjectURL(file)} alt="@THUMBNAIL" className="w-full aspect-vieo rounded-lg object-cover border"/>
        }

        return(
            <div className="w-full flex items-center justify-center aspect-video bg-card rounded-lg">
                <Button size={'icon'} variant={'ghost'} onClick={()=> fileInputRef.current?.click()}>
                    <Image />
                </Button>
            </div>
        )
    };

    return (
        <>
            {handleRenderPreview()}
            <Input type="file" accept="image/*" ref={fileInputRef} onChange={handleChangeFile} className="hidden"/>
        </>
    )
}
