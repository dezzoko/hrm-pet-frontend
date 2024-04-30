import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Typography } from '@/shared/ui/micro-components/micro-components';

const StyledFooter = styled.footer`
        margin-top: auto;
        padding:15px;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.75) 0px 0px 5px 0px;
`;

export function Footer() {
    const { t } = useTranslation();
    return (
        <StyledFooter>
            <Typography fontSize={12}>
                {t('Footer_Text')}
            </Typography>
        </StyledFooter>
    );
}
