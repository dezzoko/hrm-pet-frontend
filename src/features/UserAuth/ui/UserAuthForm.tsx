import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/shared/ui/Input';
import { Title2, Typography, TypographyColors } from '@/shared/ui/micro-components/micro-components';
import { useLoginMutation } from '../model/api/auth.api';
import { Button } from '@/shared/ui';
import { RoutePath } from '@/app/providers/router/config/route-config';
import { useLazyGetMeQuery } from '@/entities/User';
import { useAppSelector } from '@/app/providers/StoreProvider/config/store';

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    box-shadow: 0px 0px 4px 2px rgba(0,0,0,0.75);

    border-radius:${({ theme }) => theme.sizes.borderRadius.medium}px;
    height:400px;
    width:500px;
    padding: 40px 60px;
    background-color:transparent;
`;

const InputContainer = styled.div`
    height:100%;
    width:100%;
    display:flex;
    row-gap:10px;
    flex-direction:column;
    justify-content:center;
`;

type Inputs = {
    login: string
    password: string
}
export function UserAuthForm() {
    const { t } = useTranslation();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<Inputs>();

    const [loginHandler, { data, isSuccess, isLoading }] = useLoginMutation();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        loginHandler({
            password: data.password,
            email: data.login,
        });
    };
    const [getMe] = useLazyGetMeQuery();

    const _inited = useAppSelector((state) => state.userReducer._inited);

    const navigate = useNavigate();
    useEffect(() => {
        if (isSuccess && _inited) {
            getMe().unwrap().then((data) => {
                navigate(RoutePath.profile + data.id);
            });
        }
    }, [isSuccess, data, _inited, isLoading, navigate, getMe]);

    return (
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <Title2 weight={700} disablePointerEvents>
                {t('sign-in')}
            </Title2>
            <InputContainer>
                <Input
                    label={t('username')}
                    placeholder="Login"
                    {...register('login', { required: true })}
                />
                {errors.login && (
                    <Typography color={TypographyColors.redColor}>
                        {t('login-field-is-required')}
                    </Typography>
                )}

                <Input
                    label={t('password')}
                    placeholder="Password"
                    type="password"
                    {...register('password', { required: true })}
                />

                {errors.password
                && (
                    <Typography
                        color={TypographyColors.redColor}
                    >
                        {t('password-field-is-required')}
                    </Typography>
                )}
            </InputContainer>
            <Button type="submit">{t('sign-in')}</Button>
        </StyledForm>
    );
}
