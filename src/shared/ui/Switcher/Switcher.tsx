import { Switch } from '@headlessui/react';
import { useState } from 'react';
import styled from 'styled-components';

const StyledSwitch = styled(Switch)<{$enabled:boolean}>`
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
  background-color: ${({ $enabled, theme }) => ($enabled ? '#000000' : theme.colors.logoColor)};
  &:focus-visible {
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.75);
  }
`;

const StyledSwitchButton = styled.span<{$enabled:boolean}>`
  position: relative;
  pointer-events: none;
  display: inline-block;
  height: 22px;
  width: 22px;
  border-radius: 9999px;
  background-color: white;
  transition: transform 200ms ease-in-out;
  transform: translateX(${({ $enabled }) => ($enabled ? '29px' : '0')});
`;

interface SwitcherProps {
    onClick?:(isEnabled:boolean)=>void;
    enabled?:boolean;
}

export function Switcher(props: SwitcherProps) {
    const { onClick, enabled } = props;
    const [isEnabled, setEnabled] = useState(enabled || false);

    const onClickHandler = () => {
        setEnabled(!isEnabled);
        onClick?.(isEnabled);
    };
    return (
        <StyledSwitch
            checked={isEnabled}
            onChange={onClickHandler}
            $enabled={isEnabled}
        >
            <StyledSwitchButton $enabled={isEnabled} />

        </StyledSwitch>
    );
}
