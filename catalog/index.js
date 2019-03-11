import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Catalog, pageLoader } from 'catalog';

const pages = [
    {
        path: '/',
        title: 'Slate Tables',
        content: pageLoader(() => import('../README.md'))
    },
];

ReactDOM.render(
    <Catalog
        title={'Slate Tables'}
        pages={pages}
    />,
    document.getElementById('catalog')
);
