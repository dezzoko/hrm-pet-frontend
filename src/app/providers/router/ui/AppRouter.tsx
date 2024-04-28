import {
    memo, useCallback,
} from 'react';
import { Route, Routes } from 'react-router-dom';
import { RequireAuth } from './RequireAuth';
import { AppRouteProps, routeConfig } from '../config/route-config';
import { PageLayout } from '../../PageLayout';
import { RequireUnauth } from './RequireUnauth';

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRouteProps) => {
        if (route.outsideLayout) {
            return (
                <Route
                    key={route.path}
                    path={route.path}
                    element={route.unAuthOnly
                        ? (
                            <RequireUnauth>
                                {route.element}
                            </RequireUnauth>
                        )
                        : route.element}
                />
            );
        }

        let element = (
            <PageLayout>
                {route.element}
            </PageLayout>
        );

        if (route.unAuthOnly) {
            element = <RequireUnauth>{element}</RequireUnauth>;
        }
        if (route.authOnly) {
            element = <RequireAuth>{element}</RequireAuth>;
        }
        if (route.roles) {
            element = <RequireAuth roles={route.roles}>{element}</RequireAuth>;
        }

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
