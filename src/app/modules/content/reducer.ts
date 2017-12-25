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
import { IProtypoElement } from 'components/Protypo/Protypo';

export type State = {
    readonly pending: boolean;
    readonly preloading: boolean;
    readonly stylesheet: string;
    readonly navigationWidth: number;
    readonly navigationResizing: boolean;
    readonly navigationVisible: boolean;
    readonly notifications: IProtypoElement[];
    readonly alert: { id: string, success: string, error: string };
    readonly imageEditor: { mime: string, data: string, aspectRatio: number, minWidth: number, result: string };
    readonly defaultSection: string;
    readonly sections: {
        [name: string]: {
            pending: boolean;
            name: string;
            title: string;
            vde: boolean;
            defaultMenu: string;
            defaultPage: string;
            menus: {
                name: string;
                vde: boolean;
                content: IProtypoElement[];
            }[];
            pages: {
                vde: boolean;
                params: {
                    [key: string]: any;
                };
                menu: { name: string, vde: boolean, content: IProtypoElement[] };
                page: { name: string, content: IProtypoElement[], error?: string };
            }[];
        }
    };
};

export const initialState: State = {
    pending: false,
    preloading: false,
    stylesheet: null,
    navigationWidth: 350,
    navigationResizing: false,
    navigationVisible: true,
    notifications: null,
    alert: null,
    imageEditor: { mime: null, data: null, aspectRatio: null, minWidth: null, result: null },
    defaultSection: 'home',
    sections: {
        home: {
            pending: false,
            name: 'home',
            title: 'Home',
            vde: false,
            defaultMenu: 'default_menu',
            defaultPage: 'default_page',
            menus: [],
            pages: []
        },
        dev: {
            pending: false,
            name: 'dev',
            title: 'Developer',
            vde: false,
            defaultMenu: 'developer_tools',
            defaultPage: 'default_developer',
            menus: [],
            pages: []
        },
        vde: {
            pending: false,
            name: 'vde',
            title: 'VDE',
            vde: true,
            defaultMenu: 'default_menu',
            defaultPage: 'demo_page',
            menus: [],
            pages: []
        }
    }
};

export default (state: State = initialState, action: Action): State => {
    if (isType(action, actions.setResizing)) {
        return {
            ...state,
            navigationResizing: action.payload
        };
    }

    if (isType(action, actions.navigationResize)) {
        // Hardcoded min/max values
        if (action.payload < 200) {
            return {
                ...state,
                navigationWidth: 200
            };
        }
        else if (action.payload > 800) {
            return {
                ...state,
                navigationWidth: 800
            };
        }

        return {
            ...state,
            navigationWidth: action.payload
        };
    }

    if (isType(action, actions.navigationToggle)) {
        return {
            ...state,
            navigationVisible: !state.navigationVisible
        };
    }

    if (isType(action, actions.renderPage.started)) {
        return {
            ...state,
            sections: {
                ...state.sections,
                [action.payload.section]: {
                    ...state.sections[action.payload.section],
                    pending: true
                }
            }
        };
    }
    else if (isType(action, actions.renderPage.done)) {
        const section = state.sections[action.payload.params.section];
        const menuIndex = section.menus.findIndex(l =>
            l.name === action.payload.result.menu.name &&
            Boolean(l.vde) === Boolean(action.payload.result.menu.vde)
        );

        return {
            ...state,
            sections: {
                ...state.sections,
                [action.payload.params.section]: {
                    ...section,
                    menus: -1 === menuIndex ?
                        [...section.menus, action.payload.result.menu] :
                        section.menus.slice(0, menuIndex + 1),
                    pages: [
                        ...section.pages,
                        {
                            params: action.payload.params.params,
                            menu: action.payload.result.menu,
                            page: action.payload.result.page,
                            vde: action.payload.params.vde
                        }
                    ],
                    pending: false
                }
            }
        };
    }
    else if (isType(action, actions.renderPage.failed)) {
        const section = state.sections[action.payload.params.section];
        return {
            ...state,
            sections: {
                ...state.sections,
                [action.payload.params.section]: {
                    ...section,
                    pages: [
                        ...section.pages,
                        {
                            params: action.payload.params.params,
                            menu: null,
                            page: {
                                name: action.payload.params.name,
                                content: null,
                                error: action.payload.error
                            },
                            vde: action.payload.params.vde
                        }
                    ],
                    pending: false
                }
            }
        };
    }

    if (isType(action, actions.menuPop)) {
        const section = state.sections[action.payload.section];
        return section.menus.length > 1 ? {
            ...state,
            sections: {
                ...state.sections,
                [action.payload.section]: {
                    ...section,
                    menus: section.menus.slice(0, -1)
                }
            }
        } : state;
    }

    if (isType(action, actions.menuPush)) {
        const section = state.sections[action.payload.section];
        const menuIndex = section.menus.findIndex(l => l.name === action.payload.name && Boolean(l.vde) === Boolean(action.payload.vde));
        return {
            ...state,
            sections: {
                ...state.sections,
                [action.payload.section]: {
                    ...section,
                    menus: -1 === menuIndex ?
                        [...section.menus, action.payload] :
                        section.menus.slice(0, menuIndex + 1)
                }
            }
        };
    }

    if (isType(action, actions.ecosystemInit.started)) {
        return {
            ...state,
            preloading: true,
        };
    }
    else if (isType(action, actions.ecosystemInit.done)) {
        const section = state.sections[action.payload.params.section];
        const menuNeedsPush = !section.menus.length || !section.menus.find(l => l.name === section.defaultMenu && Boolean(l.vde) === Boolean(section.vde));
        return {
            ...state,
            preloading: false,
            stylesheet: action.payload.result.stylesheet,
            sections: menuNeedsPush ? {
                ...state.sections,
                [action.payload.params.section]: {
                    ...section,
                    menus: [action.payload.result.defaultMenu, ...section.menus]
                }
            } : state.sections
        };
    }
    else if (isType(action, actions.ecosystemInit.failed)) {
        const section = state.sections[action.payload.params.section];
        const menuNeedsPush = !section.menus.length || !section.menus.find(l => l.name === section.defaultMenu && Boolean(l.vde) === Boolean(section.vde));
        return {
            ...state,
            preloading: false,
            sections: menuNeedsPush ? {
                ...state.sections,
                [action.payload.params.section]: {
                    ...section,
                    menus: [
                        {
                            name: section.defaultMenu,
                            vde: false,
                            content: []
                        },
                        ...section.menus
                    ]
                }
            } : state.sections
        };
    }

    if (isType(action, actions.alertShow)) {
        return {
            ...state,
            alert: null
        };
    }
    else if (isType(action, actions.alertClose)) {
        return {
            ...state,
            alert: action.payload
        };
    }

    if (isType(action, actions.reset.started)) {
        const section = state.sections[action.payload.section];
        return {
            ...state,
            sections: {
                [action.payload.section]: {
                    ...section,
                    pages: [],
                    menus: [],
                    pending: true
                }
            }
        };
    }
    else if (isType(action, actions.reset.done)) {
        const section = state.sections[action.payload.params.section];
        return {
            ...state,
            sections: {
                [action.payload.params.section]: {
                    ...section,
                    pages: [
                        {
                            params: {},
                            menu: action.payload.result.menu,
                            page: action.payload.result.page,
                            vde: section.vde
                        }
                    ],
                    menus: [action.payload.result.menu],
                    pending: true
                }
            }
        };
    }
    else if (isType(action, actions.reset.failed)) {
        const section = state.sections[action.payload.params.section];
        return {
            ...state,
            sections: {
                [action.payload.params.section]: {
                    ...section,
                    pages: [
                        {
                            params: {},
                            menu: null,
                            page: {
                                name: action.payload.params.section,
                                content: null,
                                error: action.payload.error
                            },
                            vde: section.vde
                        }
                    ],
                    menus: [],
                    pending: true
                }
            }
        };
    }

    if (isType(action, actions.imageEditorOpen)) {
        return {
            ...state,
            imageEditor: {
                mime: action.payload.mime,
                data: action.payload.data,
                aspectRatio: action.payload.aspectRatio,
                minWidth: action.payload.width,
                result: null
            }
        };
    }
    else if (isType(action, actions.imageEditorClose)) {
        return {
            ...state,
            imageEditor: {
                mime: null,
                data: null,
                aspectRatio: null,
                minWidth: null,
                result: action.payload
            }
        };
    }

    if (isType(action, actions.fetchNotifications.done)) {
        return {
            ...state,
            notifications: action.payload.result
        };
    }

    return state;
};