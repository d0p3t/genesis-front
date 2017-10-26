// Copyright 2017 The apla-front Authors
// This file is part of the apla-front library.
// 
// The apla-front library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// The apla-front library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public License
// along with the apla-front library. If not, see <http://www.gnu.org/licenses/>.

import * as React from 'react';
import * as propTypes from 'prop-types';
import * as _ from 'lodash';

import Protypo from './';

export interface ITableProps {
    source?: string;
    columns?: { [key: string]: string };
}

interface ITableContext {
    protypo: Protypo;
}

const Table: React.SFC<ITableProps> = (props, context: ITableContext) => {
    const source = context.protypo.resolveSource(props.source);

    if (!source) {
        return null;
    }

    let columns: { title: string, index: number }[] = [];
    if (props.columns) {
        _.forEach(props.columns, (value, key) => {
            const index = source.columns.indexOf(key);
            if (-1 !== index) {
                columns.push({
                    title: value,
                    index
                });
            }
        });
    }
    else {
        columns = source.columns.map((col, index) => ({
            title: col,
            index
        }));
    }

    return (
        <table className="table">
            <thead>
                <tr>
                    {columns.map((col, index) => (
                        <th key={index}>{col.title}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {source.data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map((col, cellIndex) => (
                            <td key={cellIndex}>{row[col.index]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

Table.contextTypes = {
    protypo: propTypes.object.isRequired
};

export default Table;