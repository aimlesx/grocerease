import {Button} from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, Pencil, LoaderCircle } from "lucide-react";

const Topbar = ({listName, setEdit}
    : {
        setEdit: (v: boolean) => void,
        listName?: string
    }) => {

    const enterEditMode = () => setEdit(true);

    return (
        <div className='flex flex-row items-center justify-between p-2'>
            <Button className='text-muted-foreground' variant='ghost' size='icon' asChild>
                <Link href='/lists'>
                    <ChevronLeft/>
                </Link>
            </Button>
            {listName ? <h1 className='text-xl font-medium'>{listName}</h1> : <LoaderCircle className='animate-spin text-muted-foreground' />}
            <Button className='text-muted-foreground' variant='ghost' size='icon' onClick={enterEditMode}>
                <Pencil/>
            </Button>
        </div>
    );
}

export default Topbar;