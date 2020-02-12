import React, { ReactNode } from 'react';
import { Editor } from 'slate';

import { Options } from 'types';

/**
 * split rows into thead contents and body contents,
 * unless "headless" option is set
 */
const splitHeader = (props: any) => {
    const rows = props.children;
    const header = props.node.get('data').get('header');

    if (!header || !rows || !rows.length || rows.length === 1) {
        return {
            header: null,
            rows,
        };
    }

    return {
        header: rows[0],
        rows: rows.slice(1),
    };
};

/**
 * default renderers
 */
const makeRenderers = (options: Options) => (props: any, editor: Editor, next: () => ReactNode): ReactNode => {
    switch (props.node.type) {
        case options.typeTable: {
            const { header, rows } = splitHeader(props);
            return (
                <table>
                    {header && <thead {...props.attributes}>{header}</thead>}
                    <tbody {...props.attributes}>{rows}</tbody>
                </table>
            );
        }
        case options.typeRow:
            return <tr {...props.attributes}>{props.children}</tr>;
        case options.typeCell:
            return <td {...props.attributes}>{props.children}</td>;
        case options.typeContent:
            return <p {...props.attributes}>{props.children}</p>;
        default:
            return next();
    }
};

export default makeRenderers;
