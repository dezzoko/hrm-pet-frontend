import styled from 'styled-components';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SidebarItemType } from '../../model/types/sidebar';
import { useAppDispatch, useAppSelector } from '@/app/providers/StoreProvider/config/store';
import { RoutePath } from '@/app/providers/router/config/route-config';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui';
import { RolesEnum } from '@/shared/constants';
import { Roles } from '@/entities/User/model/types/user';
import { sidebarActions } from '../../model/slice/sidebar.slice';

interface StyledSidebarProps {
    closed:boolean;
}
const StyledSidebar = styled.aside<StyledSidebarProps>`
    position:relative;
    height: calc(100vh - ${({ theme }) => theme.sizes.header.height}px);
    width: ${({ closed }) => (closed ? '0' : '250px')};
    background-color: ${({ theme }) => theme.bgColors.primaryColor};

    transition: width 0.3s;
    box-shadow: 0px 4px 14px rgb(0 0 0 / 30%);

`;

const StyledCollapseButton = styled(Button)<StyledSidebarProps>`
    position: absolute;
    bottom: 10px;
    left: 180px;
    opacity:0;
    ${({ closed }) => closed && `
    left: 0px;
    `}
     &:hover {
        opacity:1;

    }
`;

const StyledItems = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px;
    row-gap:10px;
`;

const RotatableIcon = styled(FontAwesomeIcon)<{$isactive:boolean}>`
  transform: rotate(${(props) => (props.$isactive ? '0deg' : '180deg')});
`;

export function Sidebar() {
    const isOpen = useAppSelector((state) => state.sidebarReducer.isOpen);
    const dispatch = useAppDispatch();
    const selectedPath = useAppSelector((state) => state.sidebarReducer.selectedPath);
    const user = useAppSelector((state) => state.userReducer.user);
    const location = useLocation();

    const { t } = useTranslation();
    useEffect(() => {
        if (location.pathname !== selectedPath) {
            dispatch(sidebarActions.setPath(location.pathname));
        }
    }, [dispatch, location, selectedPath]);

    const onClickHandler = (text:string) => {
        dispatch(sidebarActions.setPath(text));
    };
    const sidebarItemList:SidebarItemType[] = [
        {
            icon: ['fas', 'home'],
            // eslint-disable-next-line no-unsafe-optional-chaining
            path: RoutePath.profile + user?.id,
            text: t('Profile'),
        },
        {
            icon: ['fas', 'cog'],
            path: RoutePath.settings,
            text: t('Settings'),
        },
        {
            icon: ['fas', 'book'],
            path: RoutePath.course_applications,
            text: t('Course_Applications'),
            roles: [RolesEnum.TEACHER],

        },
    ];
    return (
        <>
            <StyledSidebar closed={isOpen!}>
                <StyledItems>
                    {sidebarItemList.map((item) => {
                        if (item.roles && user?.roles
                            && !item.roles.some((role) => user.roles.includes(role as unknown as Roles))) {
                            return null;
                        }
                        return (
                            <SidebarItem
                                selected={item.path === selectedPath}
                                onClick={onClickHandler}
                                isClosed={isOpen!}
                                item={item}
                                key={item.path}
                            >
                            </SidebarItem>
                        );
                    })}
                </StyledItems>
            </StyledSidebar>
            <StyledCollapseButton
                type="button"
                closed={isOpen!}
                size={ButtonSize.L}
                onClick={() => dispatch(sidebarActions.setOpen(!isOpen))}
                round
                buttonTheme={ButtonTheme.OUTLINE}
            >
                <RotatableIcon $isactive={isOpen!} icon={['fas', 'arrow-right']} />
            </StyledCollapseButton>
        </>
    );
}
