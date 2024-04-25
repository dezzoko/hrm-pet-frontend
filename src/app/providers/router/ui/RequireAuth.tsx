import { Navigate, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';
import { RoutePath } from '../config/route-config';
import { useAppSelector } from '../../StoreProvider/config/store';

export const RequireAuth = ({ children }: { children: ReactNode }) => {
    const auth = useAppSelector((state) => state.userReducer.isAuth);
    const location = useLocation();
    if (!auth) {
        return <Navigate to={RoutePath.main} state={{ from: location }} replace />;
    }
    return (
        children
    );
};
