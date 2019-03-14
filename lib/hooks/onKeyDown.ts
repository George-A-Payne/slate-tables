import { Editor } from 'slate';

import { Options } from 'types';
import { isSelectionInTable } from 'utils';

import onTab from './onTab';
import onUpDown from './onUpDown';

export enum KEY {
    TAB = 'Tab',
    UP = 'ArrowUp',
    DOWN = 'ArrowDown',
}

const onKeyDown = (options: Options) => (event: KeyboardEvent, editor: Editor, next: () => Editor): Editor => {
    if (!isSelectionInTable(options)(editor)) {
        return next();
    }

    switch (event.key) {
        case KEY.TAB:
            return onTab(event, editor, options);
        case KEY.DOWN:
        case KEY.UP:
            return onUpDown(event, editor, options);
    }

    return next();
};

export default onKeyDown;
