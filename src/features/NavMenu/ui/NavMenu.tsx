import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Dropdown, DropdownItem } from '@/shared/ui';
import { Title2 } from '@/shared/ui/micro-components/micro-components';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { LanguageSwitcher } from '@/features/LanguageSwitcher';
import { useAppSelector } from '@/app/providers/StoreProvider/config/store';
import { RoutePath } from '@/app/providers/router/config/route-config';

const ItemContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width:100%;
`;

const StyledText = styled.div`
display: flex;
justify-content:space-between;
 word-wrap:break-word;
`;

const MenuActions = styled.div`
    margin-left:auto;
`;

export function NavMenu() {
    const { t } = useTranslation();

    const user = useAppSelector((state) => state.userReducer.user?.email);
    const dropDownButton = (
        <Title2>
            {user}
        </Title2>
    );
    const navigate = useNavigate();

    const dropdownItems:DropdownItem[] = [
        {
            key: 'profile',
            props: {
                disabled: true,
            },
            component: (
                <>
                    <FontAwesomeIcon icon={['fas', 'globe']} />
                    <ItemContainer>
                        {t('language')}
                        <MenuActions>
                            <LanguageSwitcher></LanguageSwitcher>
                        </MenuActions>
                    </ItemContainer>
                </>
            ),
        },
        {
            key: 'theme',
            props: {
                disabled: true,
            },
            component:
        (
            <>
                <FontAwesomeIcon icon={['fas', 'display']} />
                <ItemContainer>
                    {t('theme')}
                    <ThemeSwitcher />
                </ItemContainer>
                <MenuActions>

                </MenuActions>
            </>
        ),
        },
        {
            key: 'settings',
            component: (
                <>
                    <FontAwesomeIcon icon={['fas', 'gear']} />
                    <StyledText onClick={() => navigate(RoutePath.settings)}>
                        {t('accountSettings')}
                    </StyledText>
                </>
            ),
        },

    ];
    return (

        <Dropdown dropdownButton={dropDownButton} right={0} dropdownItems={dropdownItems} />
    );
}
