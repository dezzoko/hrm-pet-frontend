// theme.ts

import { StyledThemeAndVariables, Theme } from '../types/styled.types';
import { defaultSizes } from './default-sizes.styled';

export const defaultTheme: StyledThemeAndVariables = {
    themeName: Theme.LIGHT,
    ...defaultSizes,
    bgColors: {
        primaryColor: '#FFF',
        secondaryColor: 'rgb(121 144 255)',
        shadowColor: '#e3dfdf',
    },
    borderColors: {
        primaryColor: '',
        secondaryColor: '',
    },
    colors: {
        invertedPrimaryColor: '',
        primaryColor: '#121212', // black
        secondaryColor: '#fff', // white
        logoGradientColor: 'linear-gradient(to bottom, black 0%, #621981 100%)',
        logoColor: '#b653ff',
        redColor: '#ff0000',
    },
};
