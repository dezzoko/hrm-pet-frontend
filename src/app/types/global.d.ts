import 'styled-components';
import { StyledThemeAndVariables } from './styled.types';

declare module 'styled-components'{
    export interface DefaultTheme extends StyledThemeAndVariables {}
}
