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
import Protypo from 'containers/Widgets/Protypo';
import { TPage } from 'genesis/content';

import DocumentTitle from 'components/DocumentTitle';
import Error from './Error';
import Timeout from './Timeout';
import NotFound from './NotFound';

export interface IPageProps extends TPage {

}

const Page: React.SFC<IPageProps> = (props) => {
    if (props.error) {
        switch (props.error) {
            case 'E_HEAVYPAGE': return (<Timeout />);
            case 'E_NOTFOUND': return (<NotFound />);
            default: return (<Error error={props.error} />);
        }
    }
    else {
        return (
            <DocumentTitle title={props.name}>
                <Protypo context="page" {...props} />
            </DocumentTitle>
        );
    }
};

export default Page;