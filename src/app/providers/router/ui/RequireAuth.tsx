import { Navigate, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';
import { RoutePath } from '../config/route-config';
import { useAppSelector } from '../../StoreProvider/config/store';
import { RolesEnum } from '@/shared/constants';

export const RequireAuth = ({ children, roles }: { children: ReactNode, roles?:RolesEnum[] }) => {
    const auth = useAppSelector((state) => state.userReducer.isAuth);
    const userRoles = useAppSelector((state) => state.userReducer.user?.roles) as RolesEnum[] | undefined;

    const location = useLocation();

    if (roles) {
        if (!auth || !userRoles?.some((role) => roles.includes(role))) {
            return <Navigate to={RoutePath.main} />;
        }
    }
    if (!auth) {
        return <Navigate to={RoutePath.main} state={{ from: location }} replace />;
    }
    return (
        children
    );
};
