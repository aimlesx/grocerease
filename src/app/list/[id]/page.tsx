"use client";

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import Topbar from './_components/topbar';

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
        <Button className='w-full' variant='ghost' key={item.id} onClick={onClick} asChild>
            <div>
                <Checkbox className='mr-2' checked={checked} />
                <p>{item.name}</p>
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
                <div className='flex flex-col gap-2 p-4'>
                    {list && list.items.map((item) =>
                        <Item item={item} key={item.id} />
                    )}
                </div>
            </ScrollArea>
        </>
    );
}

export default List;