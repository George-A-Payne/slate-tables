declare module 'slate-hyperscript' {
    type CreateHyperScript = (definition: object) => any;

    const createHyperscript: CreateHyperScript;

    export { createHyperscript };
}

declare namespace JSX {
   interface IntrinsicElements {
       table: any;
       [elemName: string]: any;
   }
}
