/* eslint-disable i18next/no-literal-string */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, Switch } from '@headlessui/react';
import styled, { keyframes } from 'styled-components';
import { useState } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Title2 } from '../micro-components/micro-components';

interface DropdownProps {
    // childrenComponent:React.ReactNode[]
    label:string;
    labelIcon?:IconProp;
}
const StyledMenuButton = styled(Menu.Button)`
    cursor: pointer;
    background-color:transparent;
`;
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
    transform: scale(1);
`;

const StyledText = styled.div`
     word-wrap:break-word;
   
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
const RotatableIcon = styled(FontAwesomeIcon)<{isActive:boolean}>`
  transform: rotate(${(props) => (props.isActive ? '180deg' : '0deg')});
  transition:0.3s;
`;

const MenuItemWrapper = styled.div`
height:50px;
cursor:pointer;
/* border-radius: 10px; */
    display:flex;
    column-gap:5px;
    padding:10px;
    align-items:center;
    &:hover {
        background-color:${({ theme }) => theme.bgColors.shadowColor};
        transition:0.2s; 
    }
`;

const StyledSwitch = styled(Switch)<{enabled:boolean}>`
  position: relative;
  display: inline-flex;
  align-items: center;
  height: 24px;
  width: 54px;
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 9999px;
  transition: background-color 200ms ease-in-out;
  outline: none;

  /* Custom styles based on the enabled state */
  background-color: ${({ enabled }) => (enabled ? '#4FD1C5' : '#38A169')};

  /* Focus styles */
  &:focus-visible {
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.75);
  }
`;
const StyledSwitchButton = styled.span<{enabled:boolean}>`
  position: relative;
  pointer-events: none;
  display: inline-block;
  height: 22px;
  width: 22px;
  border-radius: 9999px;
  background-color: white;
  transition: transform 200ms ease-in-out;
  transform: translateX(${({ enabled }) => (enabled ? '29px' : '0')});
`;

const StyledLanguageSwitcher = styled.div`
    display: flex;
    background-color:white;
    border-radius:10px;
    justify-content:center;
    border:1px black solid;
    text-align: center;
    overflow: hidden;
`;

const Divider = styled.div`
    min-height:100%;
    width:1px;
    background-color: black;
`;

const StyledWrapperSwitcher = styled.div<{isActive:boolean}>`
transition:0.5s;
    padding:5px;
    width:40px;

    background-color:${({ isActive }) => (isActive ? 'gray' : 'white')};
`;

const MenuActions = styled.div`
    margin-left:auto;
`;

export function Dropdown(props: DropdownProps) {
    const { label, labelIcon } = props;
    const [enabled, setEnabled] = useState(false);
    const [isActive, setIsActive] = useState('ru');

    const onClickHandler = (value:string) => {
        setIsActive(value);
    };
    return (
        <div>
            <Menu>
                {({ open }) => (
                    <>
                        <MenuButtonWrapper>
                            <StyledMenuButton>
                                <Title2>
                                    { label}
                                </Title2>
                            </StyledMenuButton>
                            {labelIcon && (
                                <StyledMenuButton>
                                    <RotatableIcon icon={labelIcon} isActive={open} />
                                </StyledMenuButton>
                            )}
                        </MenuButtonWrapper>
                        <StyledMenuItems static open={open}>
                            <StyledMenuItem>
                                <MenuItemWrapper>
                                    <FontAwesomeIcon icon={['fas', 'gear']} />
                                    <StyledText>
                                        Настройки аккаунта
                                    </StyledText>
                                </MenuItemWrapper>
                            </StyledMenuItem>
                            <Menu.Item disabled>
                                <MenuItemWrapper>
                                    <FontAwesomeIcon icon={['fas', 'globe']} />
                                    <StyledText>
                                        Язык
                                    </StyledText>
                                    <MenuActions>

                                        <StyledLanguageSwitcher>
                                            <StyledWrapperSwitcher
                                                onClick={() => onClickHandler('ru')}
                                                isActive={isActive === 'ru'}
                                            >
                                                Ru
                                            </StyledWrapperSwitcher>
                                            <Divider />
                                            <StyledWrapperSwitcher
                                                onClick={() => onClickHandler('en')}
                                                isActive={isActive === 'en'}
                                            >
                                                En
                                            </StyledWrapperSwitcher>
                                        </StyledLanguageSwitcher>
                                    </MenuActions>

                                </MenuItemWrapper>
                            </Menu.Item>
                            <Menu.Item disabled>
                                <MenuItemWrapper>
                                    <FontAwesomeIcon icon={['fas', 'display']} />
                                    <StyledText>
                                        Тема
                                    </StyledText>
                                    <MenuActions>
                                        <StyledSwitch
                                            checked={enabled}
                                            onChange={setEnabled}
                                            enabled={enabled}
                                        >
                                            <StyledSwitchButton enabled={enabled} />
                                        </StyledSwitch>
                                    </MenuActions>

                                </MenuItemWrapper>

                            </Menu.Item>
                        </StyledMenuItems>
                    </>
                )}

            </Menu>
        </div>
    );
}
