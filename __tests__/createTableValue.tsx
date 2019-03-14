/** @jsx hyperscript */

import createValue from './createValue';
import hyperscript from './hyperscript';

interface Options {
    rows: number;
    columns: number;
    cursor: [number, number];
}

const createTableValue = ({
    rows,
    columns,
    cursor = [0, 0],
}: Options) => createValue((
    <table>
        { Array.from({ length: rows }, (_, row) => (
            <tr>
                { Array.from({ length: columns }, (__, column) => (
                    <td>
                        <p key={cursor[0] === row && cursor[1] === column ? '_cursor_' : undefined}>
                            {`Row ${row }, Col ${column}`}
                        </p>
                    </td>
                ))}
            </tr>
        ))}
    </table>
));

export default createTableValue;
