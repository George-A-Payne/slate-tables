import React, { Component } from "react";
import { Editor } from "slate-react";
import Tables from "../../../../dist/index.js";

import serializer from "./serializer";
import Styles from "./TextEditor.css";

const plugins = [Tables()];

const renderNode = (props, editor, next) => {
  switch (props.node.type) {
    case "paragraph":
      return <p {...props.attributes}>{props.children}</p>;
    case "heading":
      return <h1 {...props.attributes}>{props.children}</h1>;
    case "subheading":
      return <h2 {...props.attributes}>{props.children}</h2>;
  }
  return next();
};

class TextEditor extends Component {
  constructor(props) {
    super(props);
    const value = props.initialValue
      ? props.initialValue
      : serializer.deserialize("");
    this.state = { value };
    this.editor = null;
  }

  renderTableToolbar = () => {
    const isTable = this.editor && this.editor.isSelectionInTable();
    return (
      <div className={"toolbar"}>
        <button type={"button"} onClick={this.onInsertTable}>
          {"Insert Table"}
        </button>
        <button
          type={"button"}
          onClick={this.onInsertColumn}
          disabled={!isTable}
        >
          {"Insert Column"}
        </button>
        <button type={"button"} onClick={this.onInsertRow} disabled={!isTable}>
          {"Insert Row"}
        </button>
        <button
          type={"button"}
          onClick={this.onRemoveColumn}
          disabled={!isTable}
        >
          {"Remove Column"}
        </button>
        <button type={"button"} onClick={this.onRemoveRow} disabled={!isTable}>
          {"Remove Row"}
        </button>
        <button
          type={"button"}
          onClick={this.onRemoveTable}
          disabled={!isTable}
        >
          {"Remove Table"}
        </button>
        <button
          type={"button"}
          onClick={this.onToggleHeaders}
          disabled={!isTable}
        >
          {"Toggle Headers"}
        </button>
      </div>
    );
  };

  render() {
    const { value } = this.state;

    return (
      <>
        <div className={"editor"}>
          {this.renderTableToolbar()}
          <Editor
            className={"slate"}
            placeholder={"Enter some text..."}
            plugins={plugins}
            value={value}
            ref={editor => (this.editor = editor)}
            onChange={this.onChange}
            renderNode={renderNode}
          />
        </div>
      </>
    );
  }

  onChange = ({ value }) => this.setState({ value });

  onInsertTable = e => {
    e.preventDefault();
    this.editor.insertTable().focus();
  };

  onInsertColumn = e => {
    e.preventDefault();
    this.editor.insertColumn().focus();
  };

  onInsertRow = e => {
    e.preventDefault();
    this.editor.insertRow().focus();
  };

  onRemoveColumn = e => {
    e.preventDefault();
    this.editor.removeColumn().focus();
  };

  onRemoveRow = e => {
    e.preventDefault();
    this.editor.removeRow().focus();
  };

  onRemoveTable = e => {
    e.preventDefault();
    this.editor.removeTable().focus();
  };

  onToggleHeaders = e => {
    e.preventDefault();
    this.editor.toggleTableHeaders().focus();
  };
}

export default TextEditor;
