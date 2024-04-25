import { RouteProps } from 'react-router-dom';
import { ProfilePage } from '@/pages/ProfilePage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { SignInPage } from '@/pages/SignInPage';
import { MainPage } from '@/pages/MainPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { NotWorkingPage } from '@/pages/NotWorkingPage';

export type AppRouteProps = RouteProps & {
    authOnly?: boolean;
    outsideLayout?:boolean;
    unAuthOnly?: boolean;
};

export enum AppRoutes {
    MAIN = 'main',
    NOT_FOUND = 'not_found',
    PROFILE = 'profile',
    SIGN_IN = 'sign_in',
    SETTINGS = 'settings',
    NOT_WORKING='not_working',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.PROFILE]: '/profile/', // + :id
    [AppRoutes.SIGN_IN]: '/sign-in/',
    [AppRoutes.SETTINGS]: '/settings/',
    [AppRoutes.NOT_WORKING]: '/not-working/',
    [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, AppRouteProps> = {

    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        unAuthOnly: true,
        element: <MainPage />,
        outsideLayout: true,
    },
    [AppRoutes.PROFILE]: {
        path: `${RoutePath.profile}:id`,
        element: <ProfilePage />,
        authOnly: true,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
        outsideLayout: true,
    },
    [AppRoutes.SIGN_IN]: {
        path: RoutePath.sign_in,
        unAuthOnly: true,
        outsideLayout: true,
        element: <SignInPage />,
    },
    [AppRoutes.SETTINGS]: {
        path: RoutePath.settings,
        authOnly: true,
        element: <SettingsPage />,
    },
    [AppRoutes.NOT_WORKING]: {
        path: RoutePath.not_working,
        outsideLayout: true,
        element: <NotWorkingPage />,
    },
//   [AppRoutes.ARTICLES]: {
//     path: RoutePath.articles,
//     element: <ArticlesPage />,
//     authOnly: true,
//   },
//   [AppRoutes.ARTICLE_DETAILS]: {
//     path: `${RoutePath.article_details}:id`,
//     element: <ArticleDetailsPage />,
};
