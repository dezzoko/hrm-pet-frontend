// theme.ts

import { StyledThemeAndVariables, Theme } from '../types/styled.types';
import { defaultSizes } from './default-sizes.styled';

export const defaultTheme: StyledThemeAndVariables = {
    themeName: Theme.LIGHT,
    ...defaultSizes,
    bgColors: {
        primaryColor: '#FFF',
        secondaryColor: '#621981',
        shadowColor: '#e3dfdf',
    },
    borderColors: {
        primaryColor: '',
        secondaryColor: '',
    },
    colors: {
        invertedPrimaryColor: '',
        primaryColor: '',
        logoGradientColor: 'linear-gradient(to bottom, black 0%, #621981 100%)',
        logoColor: '#b653ff',
    },
};
