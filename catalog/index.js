import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Catalog, pageLoader } from 'catalog';

import { TextEditor } from './components';
import './static/styles.css';

const pages = [
    {
        path: '/',
        title: 'Slate Tables',
        content: pageLoader(() => import('./main.md'))
    },
];

ReactDOM.render(
    <Catalog
        title={'Slate Tables'}
        pages={pages}
        imports={{
            TextEditor,
        }}
    />,
    document.getElementById('catalog')
);
