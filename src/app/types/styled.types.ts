import { FlattenSimpleInterpolation } from 'styled-components';

export interface StyledVariables {
    sizes:{
        header:{height:number},
        borderRadius:{
            small:number,
            medium:number,
            large:number,
            round:number
        }
    }
}

// E - элемент enum
export type StyledVariants<E extends string | number> = {
    [key in E]?: FlattenSimpleInterpolation;
};
export enum Theme {
    LIGHT = 'app_light_theme',
    DARK = 'app_dark_theme',
}

export interface StyledTheme{
    themeName:Theme,
    colors:{
        primaryColor:string,
        secondaryColor:string,
        invertedPrimaryColor:string
        logoGradientColor:string;
        logoColor:string;
        redColor:string;
    },
    bgColors:{
        primaryColor:string;
        secondaryColor:string;
        shadowColor:string
    },
    borderColors:{
        primaryColor:string;
        secondaryColor:string;
    }
}

export type StyledThemeAndVariables = StyledTheme & StyledVariables
