import {
    memo, useCallback,
} from 'react';
import { Route, Routes } from 'react-router-dom';
import { RequireAuth } from './RequireAuth';
import { AppRouteProps, routeConfig } from '../config/route-config';
import { PageLayout } from '../../PageLayout';

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRouteProps) => {
        if (route.outsideLayout) {
            return (
                <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                />
            );
        }
        const element = (
            <PageLayout>
                {route.element}
            </PageLayout>
        );
        return (
            <Route
                key={route.path}
                path={route.path}
                element={route.authOnly ? <RequireAuth>{element}</RequireAuth> : element}
            />
        );
    }, []);
    return (
        <Routes>
            {Object.values(routeConfig).map(renderWithWrapper)}
        </Routes>
    );
};

export default memo(AppRouter);
