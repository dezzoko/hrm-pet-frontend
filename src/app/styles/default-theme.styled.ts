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
        page: 'rgb(243 243 243)',
        selected: 'rgba(123, 0, 213,0.5)',
        rowHeaderColor: '#f2f2f2',
    },
    borderColors: {
        primaryColor: '#000000',
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
