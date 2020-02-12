import { Node, Block } from 'slate';

const ofType = (typeCell: string) => (p: Node | undefined): p is Block =>
    p != null && 'type' in p && p.type === typeCell;

export default ofType;
