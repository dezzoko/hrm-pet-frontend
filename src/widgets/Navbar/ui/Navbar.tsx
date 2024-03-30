/* eslint-disable i18next/no-literal-string */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { css, keyframes } from 'styled-components';
import { Menu, Switch, Transition } from '@headlessui/react';
import { useState } from 'react';
import { Dropdown, Title1 } from '@/shared/ui';
import { Title2 } from '@/shared/ui/micro-components/micro-components';

const StyledNavbar = styled.div`
    height: ${({ theme }) => theme.sizes.header.height}px;
    background-color:${({ theme }) => theme.bgColors.primaryColor};
    
    /* border-bottom: 1px black solid; */
    /* border-bottom: 1px black solid; */
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.03);
`;

const WrapperNavbar = styled.div`
    display:flex;  
    column-gap: 20px;
    padding-left: 10px;
    align-items:center;
    height:100%;
`;

const LogoTitle = styled(Title1)`
  background-image: ${({ theme }) => theme.colors.logoGradientColor}; 
  background-clip: text; 
  color: transparent;
`;
const WrapperMenu = styled.div`
    display: flex;
    margin-left:auto;
    margin-right:30px;
    
`;

export function Navbar() {
    return (
        <StyledNavbar>
            <WrapperNavbar>
                <FontAwesomeIcon size="2x" icon={['fas', 'people-group']} />
                <LogoTitle>
                    HRM
                </LogoTitle>
                <WrapperMenu>
                    <Dropdown label="Gena bukin" labelIcon={['fas', 'chevron-up']} />
                </WrapperMenu>
            </WrapperNavbar>
        </StyledNavbar>
    );
}
