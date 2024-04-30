import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Title1 } from '@/shared/ui';

const NotFoundPageWrapper = styled.div`
display:flex;
color:${({ theme }) => theme.colors.primaryColor};
justify-content:center;
align-items:center;
height:100%;
`;
export function NotFoundPage() {
    const { t } = useTranslation();
    return (
        <NotFoundPageWrapper>
            <Title1>
                {t('not_found')}
            </Title1>
        </NotFoundPageWrapper>
    );
}
