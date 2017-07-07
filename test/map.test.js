import React from 'react';
import { shallow } from 'enzyme';
import Root from '../app.js';

test('Map appears', () => {
    const map = shallow(
        '<Root />'
    );

    console.log(map)
})