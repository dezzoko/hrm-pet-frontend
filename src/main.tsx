import React from 'react';
import ReactDOM from 'react-dom/client';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter } from 'react-router-dom';
import { App } from './app/App';
import GlobalStyles from './app/styles/index.styled';
import './shared/config/i18n/i18n';
import { ThemeProvider } from './app/providers/ThemeProvider/ui/ThemeProvider';

library.add(fas);
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider>
                <GlobalStyles />
                <App />
            </ThemeProvider>
        </BrowserRouter>

    </React.StrictMode>,
);
