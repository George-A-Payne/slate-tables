import { SchemaProperties, Block, Node, Editor } from 'slate';
import { Iterable, Range } from 'immutable';
import { Options } from 'types';
import { ofType } from 'utils';
import { createCell } from 'create';

const SchemaViolations = {
    ChildRequired: 'child_required',
    ChildObjectInvalid: 'child_object_invalid',
    ChildTypeInvalid: 'child_type_invalid',
    ParentTypeInvalid: 'parent_type_invalid',
};

/**
 * Create a schema for tables
 */

const makeSchema = (opts: Options) => {
    const schema: SchemaProperties = {
        blocks: {
            [opts.typeCell]: {
                parent: { type: opts.typeRow },
                nodes: [{
                    match: { type: opts.typeCell },
                    min: 1,
                }],
                normalize: (editor, error) => {
                    // enforce cells must contain blocks, insert or wrap if not
                    switch (error.code) {
                        case SchemaViolations.ChildRequired: {
                            return editor.insertNodeByKey(
                                error.node.key,
                                error.index,
                                Block.create(opts.typeContent),
                            );
                        }
                        case SchemaViolations.ChildObjectInvalid: {
                            return editor.replaceNodeByKey(
                                error.child.key,
                                Block.create({
                                    type: opts.typeContent,
                                    nodes: error.node.mapDescendants((n: Node) => n.regenerateKey()).nodes,
                                }),
                            );
                        }
                        case SchemaViolations.ParentTypeInvalid: {
                            return editor.wrapBlockByKey(
                                error.node.key,
                                opts.typeRow,
                            );
                        }
                    }
                },
            },
            [opts.typeRow]: {
                parent: { type: opts.typeTable },
                nodes: [{
                    match: {
                        object: 'block',
                        type: opts.typeCell,
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
                                Block.create(opts.typeCell),
                            );
                        }
                        case SchemaViolations.ChildTypeInvalid:
                        case SchemaViolations.ChildObjectInvalid: {
                            return editor.replaceNodeByKey(
                                error.child.key,
                                Block.create(opts.typeCell),
                            );
                        }
                        case SchemaViolations.ParentTypeInvalid: {
                            return editor.wrapBlockByKey(
                                error.node.key,
                                opts.typeTable,
                            );
                        }
                    }
                },
            },
            [opts.typeTable]: {
                nodes: [{
                    match: {
                        type: opts.typeRow,
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
                                Block.create(opts.typeRow),
                            );
                        }
                        case SchemaViolations.ChildObjectInvalid: {
                            return editor.replaceNodeByKey(
                                error.child.key,
                                Block.create(opts.typeRow),
                            );
                        }
                        case SchemaViolations.ChildTypeInvalid: {
                            return editor.removeNodeByKey(error.child.key);
                        }
                    }
                },
            },
        },
    };

    const isRow = ofType(opts.typeRow);
    const isCell = ofType(opts.typeCell);
    const countCells = (row: Node | undefined) => isRow(row) ? row.nodes.count(isCell) : 0;

    const normalizeNode = (node: Node, editor: Editor, next: () => Editor) => {

        if (node.object !== 'block') return next();
        if (node.type !== opts.typeTable) return next();

        const table = node;
        const rows = table.nodes.filter(isRow);

        console.log(table.toJSON());

        // The number of column this table has
        const columns = rows.reduce((count, row) => {
            return Math.max(count as number, countCells(row));
        }, 1); // Min 1 column

        interface InvalidRow {
            row: Block;
            invalids: Iterable<number, Block>;
            add: number;
        }

        const invalidRows: Iterable<number, InvalidRow> = rows
            .map((row) => {
                const cells = countCells(row);
                const invalids = (row as Block).nodes.filterNot(isCell);

                // Row is valid: right count of cells and no extra node
                if (invalids.isEmpty() && cells === columns) {
                    return null;
                }

                // Otherwise, remove the invalids and append the missing cells
                return {
                    row,
                    invalids,
                    add: (columns - cells),
                };
            })
            .filter(Boolean) as Iterable<number, InvalidRow>;

        if (invalidRows.size === 0) return next();

        return (e: Editor) => (invalidRows as any).reduce(
            (tr: Editor, { row, invalids, add }: InvalidRow) => {

                tr = invalids.reduce((t, child) => {
                    return t!.removeNodeByKey(child!.key);
                }, tr);

                tr = Range(0, add).reduce((t, i) => {
                    const cell = createCell(opts, i!);
                    return t!.insertNodeByKey(row.key, 0, cell);
                }, tr);

                return tr;
            }, e);
    };

    return { schema, normalizeNode };
};

export default makeSchema;
