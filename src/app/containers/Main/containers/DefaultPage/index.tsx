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
import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { navigatePage, navigateLast } from 'modules/content/actions';

export interface IDefaultPageContainerProps {
    match?: {
        params: {
            section: string;
            page: string;
        };
    };
}

interface IDefaultPageContainerState {
    defaultPage: string;
    vde: boolean;
    hasHistory: boolean;
}

interface IDefaultPageContainerDispatch {
    navigatePage: typeof navigatePage.started;
    navigateLast: typeof navigateLast.started;
}

class DefaultPageContainer extends React.Component<IDefaultPageContainerProps & IDefaultPageContainerState & IDefaultPageContainerDispatch> {
    componentWillMount() {
        if (this.props.hasHistory) {
            this.props.navigateLast({
                section: this.props.match.params.section
            });
        }
        else {
            this.props.navigatePage({
                section: this.props.match.params.section,
                name: this.props.defaultPage,
                vde: this.props.vde,
                params: null
            });
        }
    }

    render() {
        return null as JSX.Element;
    }
}

const mapStateToProps = (state: IRootState, ownProps: IDefaultPageContainerProps) => {
    const section = state.content.sections[ownProps.match.params.section];

    return {
        defaultPage: section.defaultPage,
        vde: section.vde,
        hasHistory: section.pages.length > 0
    };
};

const mapDispatchToProps = {
    navigatePage: navigatePage.started,
    navigateLast: navigateLast.started
};

export default connect<IDefaultPageContainerState, IDefaultPageContainerDispatch, IDefaultPageContainerProps>(mapStateToProps, mapDispatchToProps)(DefaultPageContainer);