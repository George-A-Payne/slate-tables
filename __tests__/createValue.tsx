/** @jsx hyperscript */

import { Value } from 'slate';
import createEditor from './createEditor';
import hyperscript from './hyperscript';

const createValue = (...inputs: JSX.Element[]): Value => {
    const value = (
        <value>
            <document>
                {inputs}
            </document>
        </value>
    ) as any;

    return createEditor(value).value;
};

export default createValue;
