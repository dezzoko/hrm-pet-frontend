import { Navigate, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';
import { RoutePath } from '../config/route-config';
import { useAppSelector } from '../../StoreProvider/config/store';

export const RequireUnauth = ({ children }: { children: ReactNode }) => {
    const auth = useAppSelector((state) => state.userReducer.isAuth);
    const userId = useAppSelector((state) => state.userReducer.user?.id);
    const location = useLocation();
    if (auth && userId) {
        return <Navigate to={RoutePath.profile + userId} state={{ from: location }} replace />;
    }
    return (
        children
    );
};
