import { createContext } from 'react';
import { StyledThemeAndVariables } from '@/app/types/styled.types';

export interface ThemeContextProps {
    theme?: StyledThemeAndVariables;
    setTheme?: (theme: StyledThemeAndVariables) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({});

export const LOCAL_STORAGE_THEME_KEY = 'theme';
