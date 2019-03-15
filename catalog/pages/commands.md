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


