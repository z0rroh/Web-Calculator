import React from 'react';
import { shallow } from 'enzyme'
import Display from './Display'

describe('<Display/>', () => {
   let wrapp
   beforeEach(() => wrapp = shallow(<Display displayValue={''}/>))

   it('Should render correctly', () => {
      expect(wrapp).toMatchSnapshot()
   })

   it('Should render a div', () => {
      expect(wrapp.find('div').length).toEqual(1)
   })

   it('renders the value of displayValue', () => {
      wrapp.setProps({ displayValue: 'test'})
      expect(wrapp.text()).toEqual('test')
   })

});