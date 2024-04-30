import { useContext } from 'react';
import { LOCAL_STORAGE_THEME_KEY, ThemeContext } from './ThemeContext';
import { StyledThemeAndVariables } from '@/app/types/styled.types';
import { defaultTheme } from '@/app/styles';
import { findTheme } from './findTheme';

interface UseThemeResult {
    toggleTheme: () => void;
    theme: StyledThemeAndVariables;
}

export function useTheme(): UseThemeResult {
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = () => {
        const newTheme: StyledThemeAndVariables = findTheme(theme?.themeName);
        setTheme?.(newTheme);
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme.themeName);
    };

    return {
        theme: theme || defaultTheme,
        toggleTheme,
    };
}
