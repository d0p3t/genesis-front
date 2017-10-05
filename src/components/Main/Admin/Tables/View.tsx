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
import { Button, Panel } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { ITableResponse, IListResponse } from 'lib/api';

export interface IViewProps {
    tableName: string;
    table: ITableResponse;
    tableData: IListResponse;
}

const DataPresenter: React.SFC<{ type: string, data: any }> = (props) => {
    switch (props.type) {
        case '':
            return (<span className="text-muted">[SYSTEM]</span>);

        case 'money':
        case 'numbers':
            return (<span>{props.data}</span>)

        default:
            return (<span className="text-muted">[BLOB]</span>);
    }
};

const View: React.SFC<IViewProps> = (props) => (
    <div className="content-wrapper">
        <div className="content-heading">
            <FormattedMessage id="admin.tables" defaultMessage="Tables" />
        </div>
        <ol className="breadcrumb">
            <li>
                <Link to="/admin/tables">
                    <FormattedMessage id="admin.tables" defaultMessage="Tables" />
                </Link>
            </li>
            <li>
                {props.tableName}
            </li>
        </ol>
        <Panel bsStyle="default">
            <div className="table-responsive">
                {(props.table && props.tableData) && (
                    <table className="table table-striped table-bordered table-hover ui-responsive ui-table ui-table-reflow">
                        <thead>
                            <tr>
                                <th>id</th>
                                {props.table.columns.map(col => (
                                    <th key={col.name}>{col.name}</th>
                                ))}
                                <th style={{ width: 1 }}>
                                    <FormattedMessage id="admin.tables.changes" defaultMessage="Changes" />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.table && props.tableData.list.sort((a, b) => parseInt(a.id) - parseInt(b.id)).map((row) => (
                                <tr key={row.id}>
                                    <td>{row.id}</td>
                                    {props.table.columns.map(col => (
                                        <td key={col.name}>
                                            <DataPresenter type={col.type} data={row[col.name]} />
                                        </td>
                                    ))}
                                    <td>
                                        {'0' === row.rb_id ?
                                            (
                                                <span className="text-muted">
                                                    <FormattedMessage id="admin.tables.unchanged" defaultMessage="Unchanged" />
                                                </span>
                                            ) : (
                                                <Button bsStyle="primary">
                                                    <FormattedMessage id="admin.tables.history" defaultMessage="History" />
                                                </Button>
                                            )
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </Panel>
    </div>
);

export default View;