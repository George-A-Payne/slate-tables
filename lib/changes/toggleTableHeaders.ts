import { Editor } from 'slate';

import { Options } from 'types';
import { TablePosition, updateNodeData } from 'utils';

const toggleTableHeaders = (options: Options, editor: Editor) => {
    const { table } = new TablePosition(editor, options);

    updateNodeData(editor, table, {
        header: !table.get('data').get('header'),
    });

    return editor;
};

export default toggleTableHeaders;
