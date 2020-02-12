import React from 'react';
import Html from 'slate-html-serializer';

const BLOCK_TAGS = {
    P: 'paragraph',
    BR: 'paragraph',
    UL: 'bulleted_list',
    OL: 'numbered_list',
    LI: 'list_item',
    H1: 'heading_one',
    H2: 'heading_two',
    H3: 'heading_three',
    H4: 'heading_three',
    H5: 'heading_three',
    H6: 'heading_three',
    TABLE: 'table',
    TR: 'table_row',
    TD: 'table_cell',
};

const INLINE_TAGS = {
    A: 'link',
};

const MARK_TAGS = {
    EM: 'italic',
    I: 'italic',
    STRONG: 'bold',
    B: 'bold',
    U: 'underlined',
};

const rules = [
    {
        deserialize(el, next) {
            const type = BLOCK_TAGS[el.tagName];
            if (!type) return;

            return {
                object: 'block',
                type,
                nodes: next(el.childNodes),
            };
        },
        serialize(object, children) {
            if (object.object !== 'block') return;

            switch (object.type) {
                case 'numbered_list':
                    return <ol>{children}</ol>;
                case 'bulleted_list':
                    return <ul>{children}</ul>;
                case 'list_item':
                    return <li>{children}</li>;
                case 'paragraph': {
                    if (object.text === '') {
                        return <br />;
                    }
                    return <p>{children}</p>;
                }
                case 'heading_one':
                    return <h1>{children}</h1>;
                case 'heading_two':
                    return <h2>{children}</h2>;
                case 'heading_three':
                    return <h3>{children}</h3>;
                case 'table':
                    const header = object.data.get('header');

                    if (header && !!children && children.length > 1) {
                        const [head, ...rows] = children;
                        return (
                            <table>
                                {header && <thead>{head}</thead>}
                                <tbody>{rows}</tbody>
                            </table>
                        );
                    }

                    return (
                        <table>
                            <tbody>{children}</tbody>
                        </table>
                    );
                case 'table_row':
                    return <tr>{children}</tr>;
                case 'table_cell':
                    return <td>{children}</td>;
                case 'div':
                    return <div>{children}</div>;
                default:
                    return null;
            }
        },
    },
    {
        deserialize(el, next) {
            const type = MARK_TAGS[el.tagName];
            if (!type) return;

            return {
                object: 'mark',
                type,
                nodes: next(el.childNodes),
            };
        },
        serialize(object, children) {
            if (object.object !== 'mark') return;

            switch (object.type) {
                case 'bold':
                    return <strong>{children}</strong>;
                case 'italic':
                    return <em>{children}</em>;
                case 'underlined':
                    return <u>{children}</u>;
                default:
                    return null;
            }
        },
    },
    {
        deserialize(el, next) {
            const type = INLINE_TAGS[el.tagName];
            if (!type) return;

            return {
                object: 'inline',
                type,
                nodes: next(el.childNodes),
                data: {
                    href: (
                        Array.from(el.attributes).find(({ name }) => name === 'href') || {
                            value: null,
                        }
                    ).value,
                },
            };
        },
        serialize(object, children) {
            switch (object.type) {
                case 'link':
                    return <a href={object.data.get('href')}>{children}</a>;
                default:
                    return null;
            }
        },
    },
];

const parseHtml = (html) => {
    const parsed = new DOMParser().parseFromString(html, 'text/html');

    const htmlEl = Array.from(parsed.childNodes).find(
        (n) => typeof n.tagName === 'string' && n.tagName.toLowerCase() === 'html',
    ) || { childNodes: [] };

    const bodyEl = Array.from(htmlEl.childNodes).find(
        (n) => typeof n.tagName === 'string' && n.tagName.toLowerCase() === 'body',
    );

    return bodyEl;
};

export default new Html({
    rules,
    parseHtml,
    defaultBlock: {
        type: 'paragraph',
    },
});

export { rules, parseHtml, BLOCK_TAGS, INLINE_TAGS, MARK_TAGS };
