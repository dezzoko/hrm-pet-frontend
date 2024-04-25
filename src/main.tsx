import React from 'react';
import ReactDOM from 'react-dom/client';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { App } from './app/App';
import GlobalStyles from './app/styles/index.styled';
import './shared/config/i18n/i18n';
import { ThemeProvider } from './app/providers/ThemeProvider/ui/ThemeProvider';
import { store } from './app/providers/StoreProvider';
import 'react-toastify/dist/ReactToastify.css';

library.add(fas);
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <ThemeProvider>
                    <GlobalStyles />
                    <App />
                </ThemeProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
);
