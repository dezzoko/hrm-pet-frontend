/* eslint-disable i18next/no-literal-string */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, MenuItemProps } from '@headlessui/react';
import styled, { keyframes } from 'styled-components';
import { ReactNode } from 'react';

const enterAnimation = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const StyledMenuButton = styled(Menu.Button)`
    display: flex;  
    justify-content:center;
    align-items:center;
    column-gap: 5px;
    cursor: pointer;
    background-color:transparent;
`;

const leaveAnimation = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
`;
const StyledMenuItems = styled(Menu.Items)<{open:boolean, right?:number, left?:number, top?:number, bottom?:number}>`
    overflow:hidden;
    display: flex;
    position:absolute;
    justify-content:center;
    width:250px;
    border:1px black solid;
    right:${({ right }) => `${right}px` || '0'};
    top:${({ top }) => (top ? `${top}px` : '30px')};
    bottom:${({ bottom }) => `${bottom}px` || ''};
    left:${({ left }) => `${left}px` || '0'};
    border-radius: 12px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.14);
    flex-direction: column;
    animation: ${({ open }) => (open ? enterAnimation : leaveAnimation)} 0.3s ease-in-out forwards;
    /* opacity: 1; */
    /* transform: scale(1); */
`;

const MenuButtonWrapper = styled.div`
    display:flex;
    column-gap: 10px;
    justify-content: center;
    align-items: center;
`;

const StyledMenuItem = styled(Menu.Item)`
    word-wrap:break-word;
`;
const RotatableIcon = styled(FontAwesomeIcon)<{$isactive:boolean}>`
  color:${({ theme }) => theme.colors.primaryColor};
  transform: rotate(${(props) => (props.$isactive ? '180deg' : '0deg')});
  transition:0.3s;
`;

const MenuItemWrapper = styled.div`
    height:50px;
    cursor:pointer;
    display:flex;
    column-gap:5px;
    padding:10px;
    color:${({ theme }) => theme.colors.primaryColor};
    background-color: ${({ theme }) => theme.bgColors.primaryColor};
    align-items:center;
    &:hover {
        background-color:${({ theme }) => theme.bgColors.shadowColor};
        transition:0.2s; 
    }
`;

export interface DropdownItem{
    props?:MenuItemProps<any>
    component:ReactNode;
    key:string;
    onClick?:()=>void;
}

interface DropdownProps {
    dropdownButton?:ReactNode;
    dropdownItems?:DropdownItem[];
    right?:number;
    left?:number;
    top?:number;
    bottom?:number;
}

export function Dropdown(props: DropdownProps) {
    const {
        dropdownButton, dropdownItems, ...other
    } = props;

    return (
        <div style={{ position: 'relative' }}>
            <Menu>
                {({ open }) => (
                    <>
                        <MenuButtonWrapper>
                            <StyledMenuButton>
                                {dropdownButton}
                                <RotatableIcon icon={['fas', 'chevron-up']} $isactive={open} />
                            </StyledMenuButton>
                        </MenuButtonWrapper>
                        <StyledMenuItems {...other} open={open}>
                            {
                                dropdownItems?.map((item) => (
                                    <StyledMenuItem onClick={item?.onClick} key={item.key} {...item.props}>
                                        <MenuItemWrapper>
                                            {item.component}
                                        </MenuItemWrapper>
                                    </StyledMenuItem>
                                ))
                            }
                        </StyledMenuItems>
                    </>
                )}

            </Menu>
        </div>
    );
}
