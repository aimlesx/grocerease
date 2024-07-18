"use client";

import { Button } from '@/components/ui/button';
import Link from "next/link";

import {
    Card,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import {
    ScrollArea
} from '@/components/ui/scroll-area';

import { useState, useEffect } from "react";
import { fetchLists, createList } from '@/actions/actions';

import { List } from '@prisma/client';

import { Plus, ShoppingBasket } from 'lucide-react';

const TasksPage = () => {
    const [lists, setLists] = useState<List[]>([]);

    useEffect(() => {
        (async () => {
            const lists = await fetchLists();
            setLists(lists);
        })();
    }, []);

    const addNewList = async () => {
        await createList('New List');
        setLists(await fetchLists());
    }

    return (
        <div className='h-dvh flex flex-col items-center gap-4 p-4'>
            <div className='flex items-center p-2 uppercase'>
                <ShoppingBasket className='text-green-400 h-5 w-5 mr-2'/>
                <h1 className='font-light'>Grocer</h1>
                <h1 className='text-green-400 font-medium'>Ease</h1>
            </div>
            <ScrollArea className='w-full grow'>
                <div className='flex flex-col gap-3'>
                    {lists.map(list =>
                        <Link href={`/list/${list.id}`} key={list.id}>
                            <Card>
                                <CardHeader className='p-4'>
                                    <CardTitle className='text-xl'>{list.name}</CardTitle>
                                </CardHeader>
                            </Card>
                        </Link>
                    )}
                </div>
            </ScrollArea>
            <Button className='text-green-400 self-end' variant='outline' onClick={addNewList}>
                <Plus className='h-6 w-6 mr-2'/>
                New
            </Button>
        </div>
    );
}

export default TasksPage;