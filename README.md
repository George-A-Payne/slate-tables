# slate-tables

[![npm version](https://badge.fury.io/js/slate-tables.svg)](https://badge.fury.io/js/slate-tables)

## Introduction

A Slate plugin to handle tables.
Forked from [slate-deep-tables](https://github.com/jasonphillips/slate-deep-table) that was forked from [slate-edit-table](https://github.com/GitbookIO/slate-edit-table).

Demo: https://george-a-payne.github.io/slate-tables/

### Install

```shell
npm install slate-tables
```

### Features

-   Pressing <kbd>Up</kbd> and <kbd>Down</kbd>, move the cursor to next/previous row
-   Pressing <kbd>Tab</kbd>, move the select to next cell
-   Pressing <kbd>Shift+Tab</kbd>, move the select to previous cell
-   Permits nested block content within table cells
-   Optionally create headerless tables
-   Rows and Columns can only be removed by commands
-   Rows and Columns retain their order on seletion deletion

### Compatibility

Slate is a fast-moving library, so check the CHANGELOG for information on the currently supported version.

### Usage

```js
import Tables from 'slate-tables';

const plugins = [
    Tables({
        /* options object here; see below */
    }),
];

// now instantiate your Slate Editor with these plugins, according to slate documentation
```

#### Options

| Option        | Type     | Default        | Description                                                                                                                                                                            |
| :------------ | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `typeTable`   | `string` | `"table"`      | Type for table                                                                                                                                                                         |
| `typeRow`     | `string` | `"table_row"`  | Type for rows                                                                                                                                                                          |
| `typeCell`    | `string` | `"table_cell"` | Type for cells                                                                                                                                                                         |
| `typeContent` | `string` | `"paragraph"`  | Type for the default blocks within cells                                                                                                                                               |
| `typeDefault` | `string` | `"paragraph"`  | Type for the default blocks outside of cells, used to replace the table on deletion, if no other node is present, and for insertion when leaving the table, if there is nowhere to go. |

## Commands

#### `insertTable()`

`editor.insertTable(columns: Number?, rows: Number?) => Editor`

Insert a new empty table.

#### `insertRow()`

`editor.insertRow(at: Number?) => Editor`

Insert a new row after the current one or at the specific index (`at`).

#### `insertColumn()`

`editor.insertColumn(at: Number?) => Editor`

Insert a new column after the current one or at the specific index (`at`).

#### `removeTable()`

`editor.removeTable() => Editor`

Remove current table.

#### `removeRow()`

`editor.removeRow(at: Number?) => Editor`

Remove current row or the one at a specific index (`at`).

#### `removeColumn()`

`editor.removeColumn(at: Number?) => Editor`

Remove current column or the one at a specific index (`at`).

#### `moveTableSelection()`

`editor.moveTableSelection(column: Number, row: Number) => Editor`

Move the selection to a specific position in the table.

#### `moveTableSelectionBy()`

`editor.moveTableSelectionBy(column: Number, row: Number) => Editor`

Move the selection by the given amount of columns and rows.

#### `toggleTableHeaders()`

`editor.toggleTableHeaders() => Editor`

Toggles whether the table will render the first row as a header row (within a thead) or as a regular row.

## Queries

#### `isSelectionInTable()`

`editor.isSelectionInTable() => Boolean`

Return true if current cursor position is inside a table.

## Developing

### Install dependancies

```shell
yarn
```

### Build library

```shell
yarn build
```

### Build and watch for changes

```shell
yarn build --watch
```

### Run tests

```shell
yarn test
```
