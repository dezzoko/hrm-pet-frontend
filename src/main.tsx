import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { App } from './app/App';
import GlobalStyles from './app/styles/index.styled';
import './shared/config/i18n/i18n';
import { defaultTheme } from './app/styles';

library.add(fas);
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider theme={defaultTheme}>
            <GlobalStyles />
            <App />
        </ThemeProvider>
    </React.StrictMode>,
);
