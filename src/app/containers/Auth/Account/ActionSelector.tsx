// Copyright 2017 The genesis-front Authors
// This file is part of the genesis-front library.
// 
// The genesis-front library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// The genesis-front library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public License
// along with the genesis-front library. If not, see <http://www.gnu.org/licenses/>.

import * as React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { navigate } from 'modules/engine/actions';

import ActionSelector from 'components/Auth/Account/ActionSelector';

export interface IActionSelectorContainerProps {

}

interface IActionSelectorContainerState {

}

interface IActionSelectorContainerDispatch {
    onImport: () => void;
    onCreate: () => void;
}

const mapStateToProps = (state: IRootState) => ({

});

const mapDispatchToProps = {
    onImport: () => navigate('/account/import'),
    onCreate: () => navigate('/account/create')
};

const ActionSelectorContainer: React.SFC<IActionSelectorContainerProps & IActionSelectorContainerState & IActionSelectorContainerDispatch> = props => (
    <ActionSelector {...props} />
);

export default connect<IActionSelectorContainerState, IActionSelectorContainerDispatch, IActionSelectorContainerProps>(mapStateToProps, mapDispatchToProps)(ActionSelectorContainer);