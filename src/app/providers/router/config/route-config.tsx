import { RouteProps } from 'react-router-dom';
import { ProfilePage } from '@/pages/ProfilePage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { SignInPage } from '@/pages/SignInPage';
import { MainPage } from '@/pages/MainPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { NotWorkingPage } from '@/pages/NotWorkingPage';
import { RolesEnum } from '@/shared/constants';
import { CourseApplications } from '@/pages/CourseApplications';

export type AppRouteProps = RouteProps & {
    authOnly?: boolean;
    outsideLayout?:boolean;
    unAuthOnly?: boolean;
    roles?: RolesEnum[];
};

export enum AppRoutes {
    MAIN = 'main',
    NOT_FOUND = 'not_found',
    PROFILE = 'profile',
    SIGN_IN = 'sign_in',
    COURSE_APPLICATIONS = 'course_applications',
    SETTINGS = 'settings',
    NOT_WORKING='not_working',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.PROFILE]: '/profile/', // + :id
    [AppRoutes.SIGN_IN]: '/sign-in/',
    [AppRoutes.SETTINGS]: '/settings/',
    [AppRoutes.NOT_WORKING]: '/not-working/',
    [AppRoutes.COURSE_APPLICATIONS]: '/course-applications/',
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
        unAuthOnly: true,
        element: <NotWorkingPage />,
    },
    [AppRoutes.COURSE_APPLICATIONS]: {
        path: RoutePath.course_applications,
        element: <CourseApplications />,
        authOnly: true,
        roles: [RolesEnum.TEACHER],
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
