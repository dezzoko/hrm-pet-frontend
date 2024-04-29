import React, { InputHTMLAttributes, useId } from 'react';
import styled, { css } from 'styled-components';

export enum LabelTheme{
    LABEL_TOP = 'LABEL_TOP',
    LABEL_LEFT = 'LABEL_LEFT',
}
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?:string;
    checkBox?:boolean;
    labelTheme?:LabelTheme;
}

const StyledInput = styled.input`
  border: 0;
  width: 100%;
  padding: 7px 0;
  border-bottom: 1px solid #ccc;
  color:black;
`;

const FocusBorder = styled.span<{ checkBox?: boolean }>`
  position: absolute;
  display:${({ checkBox }) => (checkBox ? 'none' : 'static')};
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.logoColor};
  transition: width 0.4s;
`;

const StyledWrapper = styled.div<{labelTheme:LabelTheme}>`
width: 100%;
display: flex;
${({ labelTheme }) => (labelTheme === LabelTheme.LABEL_TOP
        ? css`flex-direction: column;` : 'flex-direction: row;align-items:center;')}
column-gap: 5px;
font-size: 0.90rem;
`;
const InputContainer = styled.div`
  position: relative;
  width: 100%;

  display:flex;
  align-items: center;
  ${StyledInput}:focus + ${FocusBorder} {
    width: 100%;
  }
`;
export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const {
        label, checkBox, labelTheme = LabelTheme.LABEL_LEFT, ...other
    } = props;
    const inputId = useId();
    return (
        <StyledWrapper labelTheme={labelTheme}>
            <label htmlFor={inputId}>
                { label }
            </label>
            <InputContainer>
                <StyledInput id={inputId} className="effect-1" type="text" {...other} ref={ref} />
                <FocusBorder checkBox={checkBox} className="focus-border" />
            </InputContainer>
        </StyledWrapper>
    );
});
