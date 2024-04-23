import styled, { css } from 'styled-components';
import { StyledTheme } from '@/app/types/styled.types';

interface TitleProps {
    weight?: 200 | 300 | 400 | 500 | 600 | 700;
    disablePointerEvents?:boolean;
}

export enum TypographyColors{
    primaryColor='primaryColor',
    redColor='redColor',
}

interface TypographyProps {
    color?: TypographyColors;
}
const typographyColors = {
    primaryColor: css`
    color: ${({ theme }) => theme.colors.primaryColor};`,

    redColor: css`
    color: ${({ theme }) => theme.colors.redColor};`,
};
export const Title1 = styled.h1<TitleProps>`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.primaryColor};
  font-weight: ${({ weight = 700 }) => weight};
  pointer-events: ${({ disablePointerEvents }) => (disablePointerEvents ? 'none' : '')};
`;

export const Title2 = styled.h1<TitleProps>`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.primaryColor};
  font-weight: ${({ weight = 600 }) => weight};
  pointer-events: ${({ disablePointerEvents }) => (disablePointerEvents ? 'none' : '')};
`;

export const Typography = styled.p<TypographyProps>`
  font-size: 14px;
  ${({ color }) => typographyColors[color || TypographyColors.primaryColor]}
`;

export const Text = styled.span`
`;

export const HStack = styled.div`
  display:flex;
  flex-direction:row;
`;

export const VStack = styled.div`
  width:100%;
  height:100%;
  display:flex;
  flex-direction:column;
`;
