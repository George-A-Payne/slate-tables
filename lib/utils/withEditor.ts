import { Editor } from 'slate';
import { Options, Command } from 'types';
import { isSelectionInTable } from 'utils';

const withEditor = (fn: Command, options: Options, requiresInTable: boolean = true) => (editor: Editor, ...args: any[]) => {
    if (requiresInTable && isSelectionInTable(options)(editor)) {
        return editor;
    }

    return fn(options, editor, ...args);
};

export default withEditor;
