import {
    ButtonHTMLAttributes, FC, memo, ReactNode,
} from 'react';
import { StyledButton } from './Button.styles';

export enum ButtonTheme {
    CLEAR = 'clear',
    OUTLINE = 'outline',
    BACKGROUND = 'background',
    OUTLINE_RED = 'outlineRed'
}
export enum ButtonSize {
    M = 'size_m',
    L = 'size_l',
    XL = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    theme?: ButtonTheme;
    size?: ButtonSize;
    square?: boolean;
    disabled?: boolean;
    children?: ReactNode
}

export const Button: FC<ButtonProps> = memo((props: ButtonProps) => {
    const {
        children,
        theme = ButtonTheme.OUTLINE,
        disabled,
        size = ButtonSize.M,
        ...otherProps
    } = props;

    return (
        <StyledButton
            disabled={disabled}
            type="button"
            size={size}
            buttonTheme={ButtonTheme.OUTLINE}
            {...otherProps}
        >
            {children}
        </StyledButton>
    );
});
