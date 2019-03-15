import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Catalog, pageLoader } from 'catalog';

import { TextEditor, ExampleValue } from './components';
import './static/styles.css';

const pages = [
    {
        path: '/',
        title: 'Introduction',
        content: pageLoader(() => import('./pages/main.md'))
    },
    {
        path: '/example',
        title: 'Example',
        content: pageLoader(() => import('./pages/example.md'))
    },
    {
        path: '/commands',
        title: 'Commands',
        content: pageLoader(() => import('./pages/commands.md'))
    },
    {
        path: '/queries',
        title: 'Queries',
        content: pageLoader(() => import('./pages/queries.md'))
    },
    {
        path: '/changelog',
        title: 'Changelog',
        content: pageLoader(() => import('../CHANGELOG.md'))
    },
    {
        path: '/developing',
        title: 'Developing',
        content: pageLoader(() => import('./pages/developing.md'))
    },
];

ReactDOM.render(
    <Catalog
        title={'Slate Tables'}
        pages={pages}
        imports={{
            TextEditor,
            ExampleValue,
        }}
    />,
    document.getElementById('catalog')
);
