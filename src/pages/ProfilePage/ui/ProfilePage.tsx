import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { UserProfile, useGetUserQuery } from '@/entities/User';
import { RoutePath } from '@/app/providers/router/config/route-config';

/* eslint-disable i18next/no-literal-string */

export function ProfilePage() {
    const { id } = useParams();

    const navigate = useNavigate();

    const { data, error } = useGetUserQuery(+id!);

    useEffect(() => {
        if (!id || Number.isNaN(+id)) navigate(RoutePath.not_found);
    }, [id, navigate]);
    useEffect(() => {
        if (error) navigate(RoutePath.not_found);
    }, [error, navigate]);
    return <UserProfile user={data!}></UserProfile>;
}
