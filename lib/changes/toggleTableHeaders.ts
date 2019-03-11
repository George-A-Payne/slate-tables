import { Editor, BlockProperties } from 'slate';

import { Options } from 'types';
import { TablePosition } from 'utils';

const toggleHeaders = (options: Options, editor: Editor) => {
    const { table }  = new TablePosition(editor, options);

    const currentSetting = !!table.get('data').get('header');

    editor.setNodeByKey(table.key, {
        type: options.typeTable,
        data: {
            header: !currentSetting,
        },
    } as BlockProperties);

    return editor;
};

export default toggleHeaders;
