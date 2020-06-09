import { DOMParser, Schema } from "prosemirror-model";

import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import React from "react";
import { addListNodes } from "prosemirror-schema-list";
import {exampleSetup} from "prosemirror-example-setup"
// import { schema } from "./proto/schema";
import { schema } from "prosemirror-schema-basic";

// const trivialSchema = new Schema({
//   nodes: {
//     nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
//   },
// });


export function createEditorV2(element: any) {
// const {EditorState} = require("prosemirror-state")
// const {EditorView} = require("prosemirror-view")
// const {Schema, DOMParser} = require("prosemirror-model")
// const {schema} = require("prosemirror-schema-basic")
// const {addListNodes} = require("prosemirror-schema-list")
// const {exampleSetup} = require("prosemirror-example-setup")

// Mix the nodes from prosemirror-schema-list into the basic schema to
// create a schema with list support.
const mySchema = new Schema({
  nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
  marks: schema.spec.marks
})

return new EditorView(element, {
  state: EditorState.create({
    doc: DOMParser.fromSchema(mySchema).parse(<h1>Hello World</h1>),
    plugins: exampleSetup({schema: mySchema})
  })
})
}


export function createEditor(ref): EditorView {
  const mySchema = new Schema({
    nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
    marks: schema.spec.marks
  });
  let state = EditorState.create({
    doc: DOMParser.fromSchema(mySchema).parse(ref),
    plugins: exampleSetup({schema: mySchema})
  });
  let view = new EditorView(ref, { state });
  return view;
}

type Props = {
  element: any;
};

class EditorProto extends React.Component<Props> {
  public view?: EditorView;

  componentDidMount() {
    this.view = createEditorV2(this.props.element);
  }
  render() {
    return <div> Example Page </div>;
  }
}

export default EditorProto;
