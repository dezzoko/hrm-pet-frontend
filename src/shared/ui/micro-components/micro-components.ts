import styled from 'styled-components';

interface TitleProps {
    weight?: 200 | 300 | 400 | 500 | 600 | 700;
}

export const Title1 = styled.h1<TitleProps>`
  font-size: 24px;
  color:${({ theme }) => theme.colors.primaryColor};
  font-weight: ${({ weight = 700 }) => weight};
`;
export const Title2 = styled.h1<TitleProps>`
  font-size: 18px;
  color:${({ theme }) => theme.colors.primaryColor};
  font-weight: ${({ weight = 600 }) => weight};
`;
