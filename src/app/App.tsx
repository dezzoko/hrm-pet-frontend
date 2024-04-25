import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useGetMeQuery } from '@/entities/User';
import AppRouter from './providers/router/ui/AppRouter';
import { useAppSelector } from './providers/StoreProvider/config/store';
import { RoutePath } from './providers/router/config/route-config';

export function App() {
    const { error } = useGetMeQuery();
    const navigate = useNavigate();

    useEffect(() => {
        // @ts-ignore
        if (error?.status === 'FETCH_ERROR') {
            navigate(RoutePath.not_working);
        }
    }, [error, navigate]);
    const inited = useAppSelector((state) => state.userReducer._inited);

    return (
        <main style={{
            height: '100vh',
        }}
        >
            {inited && <AppRouter />}
            <ToastContainer autoClose={2000} />
        </main>
    );
}
