import { defaultTheme } from '@/app/styles';
import { darkTheme } from '@/app/styles/dark-theme.styled';
import { Theme } from '@/app/types/styled.types';

export function findTheme(theme?:Theme) {
    switch (theme) {
        case Theme.DARK:
            return defaultTheme;
        case Theme.LIGHT:
            return darkTheme;
        default:
            return defaultTheme;
    }
}

export function findDefaultTheme(theme?: Theme) {
    switch (theme) {
        case Theme.DARK:
            return darkTheme;
        case Theme.LIGHT:
            return defaultTheme;
        default:
            return defaultTheme;
    }
}
