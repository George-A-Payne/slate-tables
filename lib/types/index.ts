import { Editor } from 'slate';

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

export type Command<T extends any[] = any[]> = (options: Options, editor: Editor, ...args: T) => Editor | boolean;
