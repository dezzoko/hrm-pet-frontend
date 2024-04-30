import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { SidebarItemType } from '../../model/types/sidebar';
import { Typography } from '@/shared/ui/micro-components/micro-components';

interface SidebarItemProps {
    item: SidebarItemType;
    selected:boolean;
    isClosed:boolean;
    onClick:(text:string)=>void;
}

const StyledLink = styled(Link)<{$isclosed:boolean, selected:boolean}>`
    font-size: 24px;
    display:flex;
    column-gap: 10px;
    font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
    scale:${({ selected }) => (selected ? 1.01 : 1)};
    &:hover{
        font-weight: bold;
        scale:${({ selected }) => (selected ? 1.01 : 1.02)};
    };

    color:${({ theme }) => theme.colors.primaryColor};
    width:${({ $isclosed }) => ($isclosed ? 0 : '100%')};
    display:${({ $isclosed }) => ($isclosed ? 'none' : 'static')};
`;

export function SidebarItem(props: SidebarItemProps) {
    const {
        item, isClosed, onClick, selected,
    } = props;

    return (
        <StyledLink selected={selected} onClick={() => onClick(item.path)} $isclosed={isClosed} to={item.path}>
            <FontAwesomeIcon
                icon={item.icon}
            />
            <Typography>
                {item.text}
            </Typography>
        </StyledLink>
    );
}
