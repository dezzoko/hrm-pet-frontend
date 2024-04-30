// theme.ts

import { StyledThemeAndVariables, Theme } from '../types/styled.types';
import { defaultSizes } from './default-sizes.styled';

export const darkTheme: StyledThemeAndVariables = {
    themeName: Theme.DARK,
    ...defaultSizes,
    bgColors: {
        primaryColor: '#353535',
        secondaryColor: '#621981',
        shadowColor: 'rgb(97 97 97)',
        page: '',
        rowHeaderColor: 'rgb(96 96 96)',

        selected: 'rgba(123, 0, 213,0.5)',
    },
    borderColors: {
        primaryColor: '#999999',
        secondaryColor: '',
    },
    colors: {
        invertedPrimaryColor: '',
        primaryColor: '#fff', // black
        secondaryColor: '#000', // white
        logoGradientColor: 'linear-gradient(to bottom, #8e8e8e 0%, #621981 100%)',
        logoColor: '#b653ff',
        redColor: '#ff0000',
    },
};
