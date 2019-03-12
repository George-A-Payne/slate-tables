import { Editor, Node } from 'slate';

const updateNodeData = (editor: Editor, node: Node, data: object) => (
    editor.setNodeByKey(node.key, {
        data: {
            ...node.get('data').toJS(),
            ...data,
        },
    } as any)
);

export default updateNodeData;
