import { Editor } from 'slate';

import { Options } from 'types';
import { isSelectionInTable } from 'utils';

import onTab from './onTab';
import onUpDown from './onUpDown';

const KEY_TAB = 'Tab';
const KEY_DOWN = 'ArrowUp';
const KEY_UP = 'ArrowDown';

const onKeyDown = (options: Options) => (event: KeyboardEvent, editor: Editor, next: () => Editor): Editor => {
    if (!isSelectionInTable(options)(editor)) {
        return next();
    }

    switch (event.key) {
        case KEY_TAB:
            return onTab(event, editor, options);
        case KEY_DOWN:
        case KEY_UP:
            return onUpDown(event, editor, options);
    }

    return next();
};

export default onKeyDown;
