/* eslint-disable i18next/no-literal-string */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { Title1 } from '@/shared/ui';
import { NavMenu } from '@/features/NavMenu';

const StyledNavbar = styled.nav`
    position:relative;
    z-index: 1000;
    height: ${({ theme }) => theme.sizes.header.height}px;
    background-color:${({ theme }) => theme.bgColors.primaryColor};
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
                    <NavMenu />
                </WrapperMenu>
            </WrapperNavbar>
        </StyledNavbar>
    );
}
