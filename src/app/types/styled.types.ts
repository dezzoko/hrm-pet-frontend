export interface StyledVariables {
    sizes:{
        header:{height:number},
    }
}

export interface StyledTheme{
    colors:{
        primaryColor:string,
        invertedPrimaryColor:string
        logoGradientColor:string;
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
