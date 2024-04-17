/* eslint-disable i18next/no-literal-string */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, MenuItemProps, Switch } from '@headlessui/react';
import styled, { keyframes } from 'styled-components';
import React, { ReactNode, useState } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

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
const StyledMenuItems = styled(Menu.Items)<{open:boolean}>`
    overflow:hidden;
    display: flex;
    position:absolute;
    justify-content:center;
    background-color:white;
    width:250px;
    border:1px black solid;
    top:50px;
    right:10px;
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
  transform: rotate(${(props) => (props.$isactive ? '180deg' : '0deg')});
  transition:0.3s;
`;

const MenuItemWrapper = styled.div`
    height:50px;
    cursor:pointer;
    display:flex;
    column-gap:5px;
    padding:10px;
    align-items:center;
    &:hover {
        background-color:${({ theme }) => theme.bgColors.shadowColor};
        transition:0.2s; 
    }
`;

export interface DropdownItem{
    props?:MenuItemProps<any>
    component:ReactNode
}

interface DropdownProps {
    dropdownButton?:ReactNode;
    dropdownItems?:DropdownItem[];
}

export function Dropdown(props: DropdownProps) {
    const {
        dropdownButton, dropdownItems,
    } = props;

    return (
        <div>
            <Menu>
                {({ open }) => (
                    <>
                        <MenuButtonWrapper>
                            <StyledMenuButton>
                                {dropdownButton}
                                <RotatableIcon icon={['fas', 'chevron-up']} $isactive={open} />
                            </StyledMenuButton>
                        </MenuButtonWrapper>
                        <StyledMenuItems open={open}>
                            {
                                dropdownItems?.map((item) => (
                                    <StyledMenuItem {...item.props}>
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
