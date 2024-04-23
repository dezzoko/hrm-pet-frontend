import styled, { DefaultTheme, ThemedCssFunction, css } from 'styled-components';
import { ButtonSize, ButtonTheme } from './Button';
import { StyledVariants } from '@/app/types/styled.types';

interface ButtonProps{
    buttonTheme:ButtonTheme;
    size:ButtonSize;
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

export const StyledButton = styled.button<ButtonProps>`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primaryColor};

  ${({ buttonTheme }) => buttonThemes[buttonTheme]}
  ${({ size }) => sizes[size]}
  &:hover {
    opacity: 0.7;
  }

  ${{}}
`;
