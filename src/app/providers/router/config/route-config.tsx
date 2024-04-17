import { RouteProps } from 'react-router-dom';
import { ProfilePage } from '@/pages/ProfilePage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { SignInPage } from '@/pages/SignInPage';

export type AppRouteProps = RouteProps & {
    authOnly?: boolean;
    outsideLayout?:boolean;
};

export enum AppRoutes {
//   MAIN = "main",
//   ABOUT = "about",
    NOT_FOUND = 'not_found',
    PROFILE = 'profile',
    SIGN_IN = 'sign_in',
//   ARTICLES = "articles",
//   ARTICLE_DETAILS = "article_details",
}

export const RoutePath: Record<AppRoutes, string> = {
//   [AppRoutes.MAIN]: "/",
//   [AppRoutes.ABOUT]: "about",
    [AppRoutes.PROFILE]: '/profile/', // + :id
    //   [AppRoutes.ARTICLES]: "/articles",
    //   [AppRoutes.ARTICLE_DETAILS]: "/articles/", // + :id
    // последний
    [AppRoutes.SIGN_IN]: '/sign-in/',
    [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, AppRouteProps> = {

    //   [AppRoutes.ABOUT]: {
    //     path: RoutePath.about,
    //     element: <AboutPage />,
    //   },
    [AppRoutes.PROFILE]: {
        path: `${RoutePath.profile}:id`,
        element: <ProfilePage />,
        authOnly: true,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        outsideLayout: true,
        element: <NotFoundPage />,
    },
    [AppRoutes.SIGN_IN]: {
        path: RoutePath.sign_in,
        outsideLayout: true,
        element: <SignInPage />,
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
