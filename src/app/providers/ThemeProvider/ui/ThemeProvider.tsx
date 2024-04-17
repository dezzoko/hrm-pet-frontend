import { ReactNode, useMemo, useState } from 'react';
import { ThemeProvider as ThemeProviderSC } from 'styled-components';
import { LOCAL_STORAGE_THEME_KEY, ThemeContext } from '../lib/ThemeContext';
import { Theme } from '@/app/types/styled.types';
import { findDefaultTheme, findTheme } from '../lib/findTheme';

interface ThemeProviderProps {
    children:ReactNode
}

const localStorageTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT;

export function ThemeProvider({ children }: ThemeProviderProps) {
    const defaultTheme = findDefaultTheme(localStorageTheme);
    const [theme, setTheme] = useState(defaultTheme);

    const defaultProps = useMemo(() => ({
        theme,
        setTheme,
    }), [theme]);

    return (
        <ThemeContext.Provider value={defaultProps}>
            <ThemeProviderSC theme={theme}>
                { children }
            </ThemeProviderSC>
        </ThemeContext.Provider>
    );
}
