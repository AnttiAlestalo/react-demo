import React from 'react';
import ReactDOM from 'react-dom';
import {I18nextProvider} from 'react-i18next';
import i18next from 'i18next';
import en from "./lang/en/translations.json";
import fi from "./lang/fi/translations.json";
import { BrowserRouter } from 'react-router-dom'
import Popup from 'react-popup';
import './popup.css';
import './index.css';
import './common.css';
import AppLayout from './componenets/AppLayout/AppLayout';

i18next.init({
    interpolation: { escapeValue: false },
    lng: 'en',
    resources: {
        en: { lang: en },
        fi: { lang: fi }
    }
});

ReactDOM.render(
    <I18nextProvider i18n={i18next}>
        <BrowserRouter>
            <AppLayout />
        </BrowserRouter>
    </I18nextProvider>
    ,document.getElementById('idRoot')
);

ReactDOM.render(<Popup />, document.getElementById('idDivPopup'));
