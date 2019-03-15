[![npm version](https://badge.fury.io/js/slate-tables.svg)](https://badge.fury.io/js/slate-tables)
[![Linux Build Status](https://travis-ci.org/jasonphillips/slate-deep-table.png?branch=master)](https://travis-ci.org/jasonphillips/slate-deep-table)

A Slate plugin to handle tables.


### Install

``` code
lang: shell
---
npm install slate-tables
```

### Example

``` react
<TextEditor />
```

### Features

- Pressing `Up` and `Down`, move the cursor to next/previous row
- Pressing `Tab`, move the select to next cell
- Pressing `Shift+Tab`, move the select to previous cell
- Permits nested block content within table cells
- Optionally create headerless tables
- Rows and Columns can only be removed by commands
- Rows and Columns retain their order on seletion deletion

### Compatibility

Slate is a fast-moving library, so check the CHANGELOG for information on the currently supported version.

### Usage

``` code
lang: js
---
import Tables from 'slate-tables';

const plugins = [
  Tables({ /* options object here; see below */ }),
];

// now instantiate your Slate Editor with these plugins, according to slate documentation
```

#### Options

```table
rows:
    - Option: '`typeTable`'
      Type: '`string`'
      Description: Type for table
      Default: '"table"'
    - Option: '`typeRow`'
      Type: '`string`'
      Description: Type for rows
      Default: '"table_row"'
    - Option: '`typeCell`'
      Type: '`string`'
      Description: Type for cells
      Default: '"table_cell"'
    - Option: '`typeContent`'
      Type: '`string`'
      Description: Type for the default blocks within cells
      Default: '"paragraph"'
    - Option: '`typeDefault`'
      Type: '`string`'
      Description: Type for the default blocks outside of cells, used to replace the table on deletion, if no other node is present, and for insertion when leaving the table, if there is nowhere to go.
      Default: '"paragraph"'
```

