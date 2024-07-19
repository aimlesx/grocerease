"use client";

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import Topbar from './_components/topbar';

import { cn } from '@/lib/utils';

import { useDebounce } from '@uidotdev/usehooks';
import {useEffect, useRef, useState} from 'react';
import { useParams } from "next/navigation";

import {fetchList, updateItem} from '@/actions/actions';

import { Item as ItemType } from '@prisma/client';

const Item = ({ item }: { item: ItemType }) => {
    const [checked, setChecked] = useState(item.done);
    const debouncedChecked = useDebounce(checked, 1000);

    useEffect(() => {
        if (debouncedChecked === item.done) return;

        (async () => {
            item.done = debouncedChecked;
            await updateItem(item.id, debouncedChecked);
        })();

    }, [debouncedChecked]);

    const onClick = () => {
        setChecked(!checked);
    };

    return (
        <Button
            className={cn(
                'justify-start w-full cursor-pointer bg-accent transition-opacity select-none',
                checked && 'line-through opacity-40 bg-transparent hover:bg-transparent'
            )}
            variant='ghost'
            key={item.id}
            onClick={onClick}
            asChild>

            <div>
                <Checkbox checked={checked} id={item.id.toString()} />
                <Label className='ml-3 text-2xl pointer-events-none' htmlFor={item.id.toString()}>{item.name}</Label>
            </div>
        </Button>
    );
}

const List = () => {
    const params = useParams<{ id: string }>();

    const [edit, setEdit] = useState(false);
    const [list, setList] = useState<Awaited<ReturnType<typeof fetchList>>>();

    useEffect(() => {
        (async () => {
            const list = await fetchList(parseInt(params.id));
            setList(list);
        })();
    }, [params.id]);

    return (
        <>
            <Topbar listName={list?.name} setEdit={setEdit} />
            <ScrollArea>
                <div className='flex flex-col w-3/4 ml-auto mr-auto gap-4 p-4'>
                    {list && list.items.map((item) =>
                        <Item item={item} key={item.id} />
                    )}
                </div>
            </ScrollArea>
        </>
    );
}

export default List;