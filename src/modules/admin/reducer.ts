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

import * as actions from './actions';
import { Action } from 'redux';
import { isType } from 'typescript-fsa';
import { IListResponse, ITableResponse, ITablesResponse, IPagesResponse } from 'lib/api';

export type State = {
    readonly pending: boolean;
    readonly createPageStatus: { block: string, error: string };
    readonly editPageStatus: { block: string, error: string };
    readonly createMenuStatus: { block: string, error: string };
    readonly menus: { id: string, name: string }[];
    readonly tables: ITablesResponse;
    readonly table: ITableResponse;
    readonly tableData: IListResponse;
    readonly page: { id: string, [key: string]: any };
    readonly pages: IPagesResponse;
};

export const initialState: State = {
    createPageStatus: null,
    editPageStatus: null,
    createMenuStatus: null,
    menus: null,
    pending: false,
    tables: null,
    table: null,
    tableData: null,
    page: null,
    pages: null
};

export default (state: State = initialState, action: Action): State => {
    if (isType(action, actions.getPages.started)) {
        return {
            ...state,
            pending: true,
            pages: null
        };
    }

    if (isType(action, actions.getPages.done)) {
        return {
            ...state,
            pending: false,
            pages: action.payload.result
        };
    }

    if (isType(action, actions.getPages.failed)) {
        return {
            ...state,
            pending: false,
            pages: null
        };
    }

    if (isType(action, actions.getPage.started)) {
        return {
            ...state,
            pending: true,
            page: null
        };
    }

    if (isType(action, actions.getPage.done)) {
        return {
            ...state,
            pending: false,
            page: action.payload.result.page,
            menus: action.payload.result.menus
        };
    }

    if (isType(action, actions.getPage.failed)) {
        return {
            ...state,
            pending: false,
            page: null,
            menus: null
        };
    }

    if (isType(action, actions.getTables.started)) {
        return {
            ...state,
            pending: true,
            tables: null
        };
    }

    if (isType(action, actions.getTables.done)) {
        return {
            ...state,
            pending: false,
            tables: action.payload.result
        };
    }

    if (isType(action, actions.getTables.failed)) {
        return {
            ...state,
            pending: false,
            tables: null
        };
    }

    if (isType(action, actions.getTable.started)) {
        return {
            ...state,
            pending: true,
            table: null,
            tableData: null
        };
    }

    if (isType(action, actions.getTable.done)) {
        return {
            ...state,
            pending: false,
            table: action.payload.result.table,
            tableData: action.payload.result.data
        };
    }

    if (isType(action, actions.getTable.failed)) {
        return {
            ...state,
            pending: false,
            table: null,
            tableData: null
        };
    }

    if (isType(action, actions.createPage.started)) {
        return {
            ...state,
            pending: true,
            createPageStatus: null
        };
    }

    if (isType(action, actions.createPage.done)) {
        return {
            ...state,
            pending: false,
            createPageStatus: {
                block: action.payload.result,
                error: null
            }
        };
    }

    if (isType(action, actions.createPage.failed)) {
        return {
            ...state,
            pending: false,
            createPageStatus: {
                block: null,
                error: action.payload.error
            }
        };
    }

    if (isType(action, actions.editPage.started)) {
        return {
            ...state,
            pending: true,
            editPageStatus: null
        };
    }

    if (isType(action, actions.editPage.done)) {
        return {
            ...state,
            pending: false,
            editPageStatus: {
                block: action.payload.result,
                error: null
            }
        };
    }

    if (isType(action, actions.editPage.failed)) {
        return {
            ...state,
            pending: false,
            editPageStatus: {
                block: null,
                error: action.payload.error
            }
        };
    }

    if (isType(action, actions.createMenu.started)) {
        return {
            ...state,
            pending: true,
            createMenuStatus: null
        };
    }

    if (isType(action, actions.createMenu.done)) {
        return {
            ...state,
            pending: false,
            createMenuStatus: {
                block: action.payload.result,
                error: null
            }
        };
    }

    if (isType(action, actions.createMenu.failed)) {
        return {
            ...state,
            pending: false,
            createMenuStatus: {
                block: null,
                error: action.payload.error
            }
        };
    }

    if (isType(action, actions.getMenus.started)) {
        return {
            ...state,
            pending: true,
            menus: null
        };
    }

    if (isType(action, actions.getMenus.done)) {
        return {
            ...state,
            pending: false,
            menus: action.payload.result
        };
    }

    if (isType(action, actions.getMenus.failed)) {
        return {
            ...state,
            pending: false,
            menus: null
        };
    }

    return state;
};