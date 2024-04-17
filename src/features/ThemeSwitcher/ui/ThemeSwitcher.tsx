/* eslint-disable i18next/no-literal-string */
import { useTheme } from '@/app/providers/ThemeProvider/lib/useTheme';
import { Switcher } from '@/shared/ui/Switcher';

interface ThemeSwitcherProps {
}
export function ThemeSwitcher(props: ThemeSwitcherProps) {
    const { toggleTheme, theme } = useTheme();

    return (
        <Switcher onClick={toggleTheme} enabled={theme.themeName !== 'app_light_theme'}></Switcher>
    );
}