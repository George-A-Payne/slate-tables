import { Editor, Value } from 'slate';
import SlateTables from '../lib';
import { Options, TableEditor } from 'types';

const createEditor = (value: Value, options: Partial<Options> = {}): TableEditor =>
    new Editor({ value, plugins: [SlateTables()] }) as any;

export default createEditor;
