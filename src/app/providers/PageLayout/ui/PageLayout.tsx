import { ReactNode } from 'react';
import styled from 'styled-components';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';

interface PageLayoutProps {
    children: ReactNode;
}

const StyledPageLayout = styled.div`
    display: flex;
    max-height: calc(100vh - ${({ theme }) => theme.sizes.header.height}px);
    `;
const StyledPageWrapper = styled.div`
    border-radius: 5px;
    padding:15px;
    width:100%;
    overflow-y: auto;
    min-height: calc(100vh - ${({ theme }) => theme.sizes.header.height}px);
    
`;
const StyledPageInner = styled.div`
    box-sizing:border-box;
    margin:8px;
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
    padding:15px;
    border-radius: 5px;

    /* overflow: hidden; */
`;
export function PageLayout({ children }:PageLayoutProps) {
    return (
        <>
            <Navbar />
            <StyledPageLayout>
                <Sidebar />
                <StyledPageWrapper>
                    <StyledPageInner>
                        {children}
                    </StyledPageInner>
                </StyledPageWrapper>
            </StyledPageLayout>
        </>
    );
}
