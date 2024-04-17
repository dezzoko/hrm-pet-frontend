import { ReactNode } from 'react';
import { Navbar } from '@/widgets/Navbar';

interface PageLayoutProps {
    children: ReactNode;
}
export function PageLayout({ children }:PageLayoutProps) {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
}
