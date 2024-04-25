import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { SidebarItemType } from '../../model/types/sidebar';
import { Typography } from '@/shared/ui/micro-components/micro-components';

interface SidebarItemProps {
    item: SidebarItemType;
    isClosed:boolean;
}

const StyledLink = styled(Link)<{$isclosed:boolean}>`
    font-size: 24px;
    display:flex;
    column-gap: 10px;
    &:hover{
        color:${({ theme }) => theme.colors.primaryColor}
    }
    display:${({ $isclosed }) => ($isclosed ? 'none' : 'static')};
`;

export function SidebarItem(props: SidebarItemProps) {
    const { item, isClosed } = props;
    return (
        <StyledLink $isclosed={isClosed} to={item.path}>
            <FontAwesomeIcon icon={item.icon} />
            <Typography>{item.text}</Typography>
        </StyledLink>
    );
}
