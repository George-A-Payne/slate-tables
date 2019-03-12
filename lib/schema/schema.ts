import { SchemaProperties, Block, Node } from 'slate';
import { Options } from 'types';

const SchemaViolations = {
    ChildRequired: 'child_required',
    ChildObjectInvalid: 'child_object_invalid',
    ChildTypeInvalid: 'child_type_invalid',
    ParentTypeInvalid: 'parent_type_invalid',
};

/**
 * Create a schema for tables
 */
const schema = (options: Options): SchemaProperties => ({
    blocks: {
        [options.typeCell]: {
            parent: { type: options.typeRow },
            nodes: [{
                match: { object: 'block' },
                min: 1,
            }],
            normalize: (editor, error) => {
                // enforce cells must contain blocks, insert or wrap if not
                switch (error.code) {
                    case SchemaViolations.ChildRequired: {
                        return editor.insertNodeByKey(
                            error.node.key,
                            error.index,
                            Block.create(options.typeContent),
                        );
                    }
                    case SchemaViolations.ChildObjectInvalid: {
                        return editor.replaceNodeByKey(
                            error.child.key,
                            Block.create({
                                type: options.typeContent,
                                nodes: error.node.mapDescendants((n: Node) => n.regenerateKey()).nodes,
                            }),
                        );
                    }
                    case SchemaViolations.ParentTypeInvalid: {
                        return editor.wrapBlockByKey(
                            error.node.key,
                            options.typeRow,
                        );
                    }
                }
            },
        },
        [options.typeRow]: {
            parent: { type: options.typeTable },
            nodes: [{
                match: {
                    object: 'block',
                    type: options.typeCell,
                },
                min: 1,
            }],
            normalize: (editor, error) => {
                // enforce rows must contain cells, drop all else
                switch (error.code) {
                    case SchemaViolations.ChildRequired: {
                        return editor.insertNodeByKey(
                            error.node.key,
                            error.index,
                            Block.create(options.typeCell),
                        );
                    }
                    case SchemaViolations.ChildTypeInvalid:
                    case SchemaViolations.ChildObjectInvalid: {
                        return editor.replaceNodeByKey(
                            error.child.key,
                            Block.create(options.typeCell),
                        );
                    }
                    case SchemaViolations.ParentTypeInvalid: {
                        return editor.wrapBlockByKey(
                            error.node.key,
                            options.typeTable,
                        );
                    }
                }
            },
        },
        [options.typeTable]: {
            nodes: [{
                match: {
                    object: 'block',
                    type: options.typeRow,
                },
                min: 1,
            }],
            normalize: (editor, error) => {
                // enforce rows must contain cells, drop all else
                switch (error.code) {
                    case SchemaViolations.ChildRequired: {
                        return editor.insertNodeByKey(
                            error.node.key,
                            error.index,
                            Block.create(options.typeRow),
                        );
                    }
                    case SchemaViolations.ChildObjectInvalid: {
                        return editor.replaceNodeByKey(
                            error.child.key,
                            Block.create(options.typeRow),
                        );
                    }
                    case SchemaViolations.ChildTypeInvalid: {
                        return editor.removeNodeByKey(error.child.key);
                    }
                }
            },
        },
    },
});

export default schema;
