# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## [0.9.0] - 2019-03-15

- Compatability with slate 0.44.x
- Fixed error when deleting a table
- Added tracking of cells position and tables expected size
- Deleted cells and rows get replaced in correct place
- Removing a table when it is the only node doesn't break editor
- Cursor positioning:
  - on insert table -> focus first cell
  - on insert column -> focus adjecent cell in new column
  - on insert row -> focus adjecent cell in new row
  - on remove column -> focus adjecent cell in previous column, or next if on leading edge
  - on remove row -> focus adjacent cell in previous row, or next if on leading edge
- Cursor movement logic:
  - Navigating nested tables
  - insert node at top level if there is nowhere to go, to prevent table trapping.
  - Add option for default node type
- Add type declaration

## [0.8.0] - 2019-03-12

- initial working fork of prior project (slate-deep-table)
