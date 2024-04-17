import { InputHTMLAttributes, useId } from 'react';
import styled from 'styled-components';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?:string;
}

const StyledInput = styled.input`
  border: 0;
  width: 100%;
  padding: 7px 0;
  border-bottom: 1px solid #ccc;
  color:black;
`;

const FocusBorder = styled.span`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.logoColor};
  transition: width 0.4s;
`;

const StyledWrapper = styled.div`
width: 100%;
font-size: 0.90rem;
`;
const InputContainer = styled.div`
  position: relative;

  ${StyledInput}:focus + ${FocusBorder} {
    width: 100%;
  }
`;

export function Input(props: InputProps) {
    const { label, ...other } = props;
    const inputId = useId();
    return (
        <StyledWrapper>
            <label htmlFor={inputId}>
                { label }
            </label>
            <InputContainer>
                <StyledInput id={inputId} className="effect-1" type="text" {...other} />
                <FocusBorder className="focus-border" />
            </InputContainer>
        </StyledWrapper>
    );
}
