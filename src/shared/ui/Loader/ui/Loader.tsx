import styled, { keyframes } from 'styled-components';

export enum LoaderSize {
    M = 'M',
    L = 'L',
    XL='XL'
}

const rotateAnimation = keyframes`
    to {
        transform: rotate(1turn);
    }
`;

const loaderSizes = {
    [LoaderSize.M]: '50px',
    [LoaderSize.L]: '100px',
    [LoaderSize.XL]: '200px',
};

export const Loader = styled.div<{
    loaderSize?:LoaderSize;
}>`
    width: ${({ loaderSize = LoaderSize.M }) => loaderSizes[loaderSize]};
    padding: 8px;
    aspect-ratio: 1;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.logoColor};
    --_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
    -webkit-mask: var(--_m);
    mask: var(--_m);
    -webkit-mask-composite: source-out;
    mask-composite: subtract;
    animation: ${rotateAnimation} 1s infinite linear;
`;
