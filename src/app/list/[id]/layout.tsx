import { ChevronLeft, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Layout = ({ children }
    : { children: React.ReactNode }) => {

    return (
        <>{children}</>
    );
}

export default Layout;