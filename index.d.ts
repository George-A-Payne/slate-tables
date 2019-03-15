import { Editor, Plugin } from 'slate-react';

export interface Options {
    typeTable: string;
    typeRow: string;
    typeCell: string;
    typeContent: string;
    typeDefault: string;
}

export interface TableEditor extends Editor {
    isSelectionInTable(): boolean;
    insertTable(columns?: number, rows?: number): TableEditor;
    insertRow(at?: number): TableEditor;
    insertColumn(at?: number): TableEditor;
    removeTable(): TableEditor;
    removeRow(at?: number): TableEditor;
    removeColumn(at?: number): TableEditor;
    moveTableSelection(column: number, row: number): TableEditor;
    moveTableSelectionBy(columns: number, rows: number): TableEditor;
    toggleTableHeaders(): TableEditor;
}

declare function EditTable(options?: Partial<Options>): Plugin;

export default EditTable;
