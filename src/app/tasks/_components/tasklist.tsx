import { Task } from '@prisma/client';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import { Plus, EllipsisVertical, Share2, Trash2 } from 'lucide-react';

const Tasklist = ({title, tasks}:
    {title: string, tasks: Task[]}) => {

    return (
        <div>
            <Card className='group/card inline-block min-w-60'>
                <CardHeader className='flex-row items-center space-y-0'>
                    <CardTitle spellCheck={false} contentEditable>{title}</CardTitle>
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            className='ml-auto
                            opacity-0 group-hover/card:opacity-100 data-[state=open]:opacity-100 transition-opacity
                            focus-visible:ring-0 focus-visible:ring-offset-0' asChild>

                            <Button className='w-8 h-8' variant='ghost' size='icon'><EllipsisVertical/></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem asChild>
                                <Button className='flex justify-start w-full' variant='ghost' size='sm'>
                                    <Share2 className='w-4 h-4 mr-2 text-blue-400' /> Share
                                </Button>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Button className='flex justify-start w-full' variant='ghost' size='sm'>
                                    <Trash2 className='w-4 h-4 mr-2 text-red-400' /> Delete
                                </Button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </CardHeader>
                <CardContent>
                    {
                        tasks.length === 0 ?
                            <p className='text-muted-foreground select-none'>No tasks</p>
                            : tasks.map(task => <p key={task.id}>{task.title}</p>)
                    }
                </CardContent>
                <CardFooter>
                    <div className='grow'></div>
                    <Button className='w-8 h-8 text-muted-foreground' variant='outline' size='icon'><Plus/></Button>
                </CardFooter>
            </Card>
        </div>
    );
}

export default Tasklist;