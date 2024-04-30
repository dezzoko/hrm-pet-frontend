import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import styled from 'styled-components';
import { useGetMeQuery } from '@/entities/User';
import AppRouter from './providers/router/ui/AppRouter';
import { useAppSelector } from './providers/StoreProvider/config/store';
import { RoutePath } from './providers/router/config/route-config';
import { Loader, LoaderSize } from '@/shared/ui';

const LoaderWrapper = styled.div`
        height: 100vh;
        background-color:${({ theme }) => theme.bgColors.primaryColor};
        display: flex;
        justify-content: center;
        align-items: center;

`;

const Main = styled.main`
    height: 100vh;
    background-color:${({ theme }) => theme.bgColors.primaryColor};
`;
export function App() {
    const { isLoading, error } = useGetMeQuery();
    const navigate = useNavigate();

    useEffect(() => {
        // @ts-ignore
        if (error?.status === 'FETCH_ERROR') {
            navigate(RoutePath.not_working);
        }
    }, [error, navigate]);
    const inited = useAppSelector((state) => state.userReducer._inited);

    if (isLoading) {
        return (
            <LoaderWrapper>
                <Loader loaderSize={LoaderSize.L}></Loader>
            </LoaderWrapper>
        );
    }
    return (
        <Main>
            {inited && <AppRouter />}
            <ToastContainer autoClose={2000} />
        </Main>
    );
}
