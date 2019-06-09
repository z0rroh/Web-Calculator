import React from 'react';
import { shallow } from 'enzyme'
import Key from './Key'

describe('<Key/>', () => {
   let wrapp

   beforeEach(() => {
      wrapp = shallow(
         <Key
            keyAction={jest.fn()}
            keyType={''}
            keyValue={''}
         />
      )
   });

   it('Should render correctly', () => {
      expect(wrapp).toMatchSnapshot()
   })

   it('Should render a div', () => {
      expect(wrapp.find('div').length).toEqual(1)
   })

   it('should render the value of keyValue', () => {
      wrapp.setProps({ keyValue: 'test'})
      expect(wrapp.text()).toEqual('test')
   })
});
