import React from 'react';
import TextEditor from './components/TextEditor';
import ExampleValue from './components/ExampleValue';

export default {
    title: 'Slate Tables',
};

export const EmptyEditor = () => <TextEditor />;

export const PrefilledEditor = () => <ExampleValue />;
