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

import Protypo from 'components/Protypo/Protypo';
import Button from 'components/Protypo/Button';
import Div from 'components/Protypo/Div';
import Em from 'components/Protypo/Em';
import Input from 'components/Protypo/Input';
import Label from 'components/Protypo/Label';
import MenuItem from 'components/Protypo/MenuItem';
import MenuGroup from 'components/Protypo/MenuGroup';
import P from 'components/Protypo/P';
import Span from 'components/Protypo/Span';
import Strong from 'components/Protypo/Strong';
import Style from 'components/Protypo/Style';

const handlers = {
    'button': Button,
    'div': Div,
    'em': Em,
    'input': Input,
    'label': Label,
    'menuitem': MenuItem,
    'menugroup': MenuGroup,
    'p': P,
    'span': Span,
    'strong': Strong,
    'style': Style
};

export const resolveHandler = (name: string) => {
    return handlers[name];
};

export default Protypo;