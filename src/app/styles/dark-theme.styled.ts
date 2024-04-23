// theme.ts

import { StyledThemeAndVariables, Theme } from '../types/styled.types';
import { defaultSizes } from './default-sizes.styled';

export const darkTheme: StyledThemeAndVariables = {
    themeName: Theme.DARK,
    ...defaultSizes,
    bgColors: {
        primaryColor: '#676767',
        secondaryColor: '#621981',
        shadowColor: '#e3dfdf',
    },
    borderColors: {
        primaryColor: '',
        secondaryColor: '',
    },
    colors: {
        invertedPrimaryColor: '',
        primaryColor: '#000', // black
        secondaryColor: '#fff', // white
        logoGradientColor: 'linear-gradient(to bottom, black 0%, #621981 100%)',
        logoColor: '#b653ff',
        redColor: '#ff0000',
    },
};
