import styled, { css } from 'styled-components';
import { StyledVariants } from '@/app/types/styled.types';

export enum ButtonTheme {
    CLEAR = 'clear',
    OUTLINE = 'outline',
    BACKGROUND = 'background',
    OUTLINE_RED = 'outlineRed',
}

export enum ButtonMods {
    SQUARE = 'square',
    ROUND = 'round',
}
export enum ButtonSize {
    M = 'size_m',
    L = 'size_l',
    XL = 'size_xl',
}

interface ButtonProps{
    buttonTheme?:ButtonTheme;
    size?:ButtonSize;
    round?:boolean;
    buttonMode?:ButtonMods;
    width?:string;
}

const sizes: StyledVariants<ButtonSize> = {
    size_l: css`
    height: 40px;
    font-size: 16px;
  `,
    size_m: css`
    height: 45px;

    font-size: 14px;
  `,
    size_xl: css`
    height: 48px;
    font-size: 18px;
  `,
};

const buttonThemes: Record<ButtonTheme, any> = {
    background: css`
    background: ${({ theme }) => theme.bgColors.primaryColor};
  `,

    clear: css`
    padding: 0;
    border: none;
    background: none;
    outline: none;
  `,

    outline: css`
    padding:10px;
    border: ${({ theme }) => `1px solid ${theme.colors.primaryColor}`};
    color: ${({ theme }) => theme.colors.primaryColor};
    background: none;
  `,
    outlineRed: css`
    border: ${({ theme }) => `1px solid ${theme.colors.redColor}`};
    color: ${({ theme }) => theme.colors.redColor};
    background: none;
    `,
};

const buttonMods:Record<ButtonMods, any> = {
    round: css`
    border-radius: 50%;

  `,
    square: css`
    border-radius: 0;
  `,

};
export const Button = styled.button<ButtonProps>`
  cursor: pointer;
  border-radius: 5px;
  display:flex;
  justify-content:center;
  align-items:center;

  color: ${({ theme }) => theme.colors.primaryColor};

  ${({ buttonTheme }) => (buttonTheme ? buttonThemes[buttonTheme] : buttonThemes.outline)}
  ${({ size }) => (size ? sizes[size] : sizes.size_m)}

  ${(props) => (props.buttonMode ? buttonMods[props.buttonMode] : '')}

  ${({ width }) => width && `width:${width}px;`};
  &:hover {
    opacity: 0.7;
  }
`;
