import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { set } from 'react-hook-form';
import {
    UserProfile, useGetUserQuery, useLazyGetMeQuery, useLazyGetUserQuery,
} from '@/entities/User';
import { RoutePath } from '@/app/providers/router/config/route-config';
import { useAppSelector } from '@/app/providers/StoreProvider/config/store';
import { User } from '@/entities/User/model/types/user';

/* eslint-disable i18next/no-literal-string */

export function ProfilePage() {
    const { id } = useParams();

    const [userData, setUserData] = useState<User>();
    const navigate = useNavigate();

    const [getMyPage] = useLazyGetMeQuery();
    const [getUserPage] = useLazyGetUserQuery();
    const userId = useAppSelector((state) => state.userReducer.user?.id);
    const { data, error } = useGetUserQuery(+id!);

    useEffect(() => {
        if (!id || Number.isNaN(+id)) navigate(RoutePath.not_found);
        if (userId === +id!) {
            getMyPage().unwrap().then((data) => {
                setUserData(data);
            });
        } else {
            getUserPage(+id!).unwrap().then((data) => {
                setUserData(data);
            });
        }
    }, [data, getMyPage, getUserPage, id, navigate, setUserData, userId]);
    useEffect(() => {
        if (error) navigate(RoutePath.not_found);
    }, [error, navigate]);
    return <UserProfile user={userData!}></UserProfile>;
}
