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

import { IRootState } from 'modules';
import { Epic } from 'redux-observable';
import { Action } from 'redux';
import { txCallBatch } from '../actions';
import { modalShow } from '../../modal/actions';

export const txCallBatchFailedEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(txCallBatch.failed)
        .filter(l => !l.payload.params.silent && !!l.payload.error)
        .map(action =>
            modalShow({
                id: 'TX_ERROR',
                type: 'TX_ERROR',
                params: {
                    tx: action.payload.error.tx,
                    error: action.payload.error.error
                }
            })
        );

export default txCallBatchFailedEpic;