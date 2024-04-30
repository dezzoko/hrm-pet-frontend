import { ReactNode } from 'react';
import styled from 'styled-components';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { Footer } from '@/widgets/Footer';

interface PageLayoutProps {
    children: ReactNode;
}

const StyledPageLayout = styled.div`
    display: flex;
    
    max-height: calc(100vh - ${({ theme }) => theme.sizes.header.height}px);
    `;
const StyledPageWrapper = styled.div`
    display:flex;
    flex-direction: column;
    padding:15px;
    color: ${({ theme }) => theme.colors.primaryColor};
    width:100%;
    background-color: ${({ theme }) => theme.bgColors.primaryColor};
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
                    <Footer />
                </StyledPageWrapper>

            </StyledPageLayout>
        </>
    );
}
