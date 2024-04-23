import { useState } from 'react';
import styled from 'styled-components';

const StyledSimpleSwitcher = styled.div`
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

const StyledWrapperSwitcher = styled.div<{$isactive:boolean}>`
transition:0.5s;
    padding:5px;
    width:40px;

    background-color:${({ $isactive }) => ($isactive ? 'gray' : 'white')};
`;

interface SimpleSwitcherProps {
    onClickHandler:()=>void;
    leftLabel:string;
    defaultValue?:'right'|'left';
    rightLabel:string

}

export function SimpleSwitcher(props: SimpleSwitcherProps) {
    const {
        onClickHandler, leftLabel, rightLabel, defaultValue,
    } = props;
    const [isActive, setIsActive] = useState<'left'|'right'>(defaultValue || 'right');

    const onClick = () => {
        onClickHandler();
        setIsActive(isActive === 'left' ? 'right' : 'left');
    };
    return (
        <StyledSimpleSwitcher>
            <StyledWrapperSwitcher
                onClick={onClick}
                $isactive={isActive === 'left'}
            >
                {leftLabel}
            </StyledWrapperSwitcher>
            <Divider />
            <StyledWrapperSwitcher
                onClick={onClick}
                $isactive={isActive === 'right'}
            >
                {rightLabel}
            </StyledWrapperSwitcher>
        </StyledSimpleSwitcher>
    );
}
