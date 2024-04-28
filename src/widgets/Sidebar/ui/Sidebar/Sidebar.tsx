import styled from 'styled-components';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SidebarItemType } from '../../model/types/sidebar';
import { useAppSelector } from '@/app/providers/StoreProvider/config/store';
import { RoutePath } from '@/app/providers/router/config/route-config';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui';
import { RolesEnum } from '@/shared/constants';
import { Roles } from '@/entities/User/model/types/user';

interface StyledSidebarProps {
    closed:boolean;
}
const StyledSidebar = styled.aside<StyledSidebarProps>`
    height: calc(100vh - ${({ theme }) => theme.sizes.header.height}px);
box-shadow: 0px 4px 14px -3px rgba(0,0,0,0.75);

    width: 200px;
    transition: width 0.3s;
    ${({ closed }) => closed && `
        width: 0px;
            & > * {
                display:none;        
            }
    `}  
`;

const StyledCollapseButton = styled(Button)<StyledSidebarProps>`
    position: absolute;
    bottom: 10px;
    left: 150px;
    transition:  0.3s;
    ${({ closed }) => closed && `
    left: 0px;
    `}
`;

const StyledItems = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px;
    row-gap:10px;
`;
const RotatableIcon = styled(FontAwesomeIcon)<{$isactive:boolean}>`
  transform: rotate(${(props) => (props.$isactive ? '0deg' : '180deg')});
  transition:0.3s;
`;

export function Sidebar() {
    const [closed, setClosed] = useState(true);
    const user = useAppSelector((state) => state.userReducer.user);
    const sidebarItemList:SidebarItemType[] = [
        {
            icon: ['fas', 'home'],
            // eslint-disable-next-line no-unsafe-optional-chaining
            path: RoutePath.profile + user?.id,
            text: 'Profile',
        },
        {
            icon: ['fas', 'cog'],
            path: RoutePath.settings,
            text: 'Settings',
        },
        {
            icon: ['fas', 'book'],
            path: RoutePath.course_applications,
            text: 'Course Applications',
            roles: [RolesEnum.TEACHER],

        },
    ];
    return (
        <>
            <StyledSidebar closed={closed}>
                <StyledItems>
                    {sidebarItemList.map((item) => {
                        if (item.roles && user?.roles
                            && !item.roles.some((role) => user.roles.includes(role as unknown as Roles))) {
                            return null;
                        }
                        return (
                            <SidebarItem isClosed={closed} item={item} key={item.path}></SidebarItem>
                        );
                    })}
                </StyledItems>
            </StyledSidebar>
            <StyledCollapseButton
                type="button"
                closed={closed}
                size={ButtonSize.L}
                onClick={() => setClosed(!closed)}
                round
                buttonTheme={ButtonTheme.OUTLINE}
            >
                <RotatableIcon $isactive={closed} icon={['fas', 'arrow-right']} />
            </StyledCollapseButton>
        </>
    );
}
