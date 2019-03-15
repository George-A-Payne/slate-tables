# slate-tables

[![npm version](https://badge.fury.io/js/slate-tables.svg)](https://badge.fury.io/js/slate-tables)

A Slate plugin to handle tables.
Forked from [slate-deep-tables](https://github.com/jasonphillips/slate-deep-table) that was forked from [slate-edit-table](https://github.com/GitbookIO/slate-edit-table).

Documentation and Demo: https://george-a-payne.github.io/slate-tables/

### Install

```
npm install slate-tables
```

### Features

- Pressing <kbd>Up</kbd> and <kbd>Down</kbd>, move the cursor to next/previous row
- Pressing <kbd>Tab</kbd>, move the select to next cell
- Pressing <kbd>Shift+Tab</kbd>, move the select to previous cell
- Permits nested block content within table cells
- Optionally create headerless tables
- Rows and Columns can only be removed by commands
- Rows and Columns retain their order on seletion deletion

### Compatibility

Slate is a fast-moving library, so check the CHANGELOG for information on the currently supported version.

### Usage

```js
import Tables from 'slate-tables';

const plugins = [
  Tables({ /* options object here; see below */ }),
];

// now instantiate your Slate Editor with these plugins, according to slate documentation
```

#### Options

- `[typeTable: String]` — type for table `default: 'table'`
- `[typeRow: String]` — type for the rows `default: 'table_row'`
- `[typeCell: String]` — type for the cells `default: 'table_cell'`
- `[typeContent: String]` — type for the default blocks within cells `default: 'paragraph'`
- `[typeDefault: String]` — type for the default blocks outside of cells, used to replace the table on deletion, if no other node is present, and for insertion  `default: 'paragraph'`


### Queries and Commands

`slate-tables` exports queries and commands that you can invoke on your `editor` instance:

```js
// anywhere where 'editor' is passed as an argument, or using the react Component's ref,
// you may directly invoke any of the exported functions below, e.g:
const inATable = editor.isSelectionInTable();

if (!inATable) {
  editor.insertTable();
}
```

Check [example](`/catalog/components/TextEditor/index.js`) for usage in a typical context.

#### `query isSelectionInTable()`

`editor.isSelectionInTable() => Boolean`

Return true if current cursor position is inside a table.

#### `command insertTable()`

`editor.insertTable(columns: Number?, rows: Number?) => Editor`

Insert a new empty table.

#### `command insertRow()`

`editor.insertRow(at: Number?) => Editor`

Insert a new row after the current one or at the specific index (`at`).

#### `command insertColumn()`

`editor.insertColumn(at: Number?) => Editor`

Insert a new column after the current one or at the specific index (`at`).

#### `command removeTable()`

`editor.removeTable() => Editor`

Remove current table.

#### `command removeRow()`

`editor.removeRow(at: Number?) => Editor`

Remove current row or the one at a specific index (`at`).

#### `command removeColumn()`

`editor.removeColumn(at: Number?) => Editor`

Remove current column or the one at a specific index (`at`).

#### `command moveTableSelection()`

`editor.moveTableSelection(column: Number, row: Number) => Editor`

Move the selection to a specific position in the table.

#### `command moveTableSelectionBy()`

`editor.moveTableSelectionBy(column: Number, row: Number) => Editor`

Move the selection by the given amount of columns and rows.

#### `command toggleTableHeaders()`

`editor.toggleTableHeaders() => Editor`

Toggles whether the table will render the first row as a header row (within a thead) or as a regular row.


