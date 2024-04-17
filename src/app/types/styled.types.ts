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

export enum Theme {
    LIGHT = 'app_light_theme',
    DARK = 'app_dark_theme',
}

export interface StyledTheme{
    themeName:Theme,
    colors:{
        primaryColor:string,
        invertedPrimaryColor:string
        logoGradientColor:string;
        logoColor:string;
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
