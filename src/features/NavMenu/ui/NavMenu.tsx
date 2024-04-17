import { Menu, Switch } from '@headlessui/react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown, DropdownItem } from '@/shared/ui';
import { Title2 } from '@/shared/ui/micro-components/micro-components';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { LanguageSwitcher } from '@/features/LanguageSwitcher';

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

interface NavMenuProps {
}
export function NavMenu(props: NavMenuProps) {
    const [enabled, setEnabled] = useState(false);

    const [isActive, setIsActive] = useState('ru');
    const { t } = useTranslation();
    const onClickHandler = (value:string) => {
        setIsActive(value);
    };
    const dropDownButton = (
        <Title2>

        </Title2>
    );

    const dropdownItems:DropdownItem[] = [
        {
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
            component: (
                <>
                    <FontAwesomeIcon icon={['fas', 'gear']} />
                    <StyledText>
                        {t('accountSettings')}
                    </StyledText>
                </>
            ),
        },

    ];
    return (
        <Dropdown dropdownButton={dropDownButton} dropdownItems={dropdownItems} />
    );
}
