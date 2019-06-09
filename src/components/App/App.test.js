import React from 'react'
import { shallow } from 'enzyme'
import App from './App'
import Calculator from '../Calculator/Calculator'

describe('<App/>', () => {

   let wrapp;
   beforeEach( () => wrapp = shallow( <App/> ) )

   it('Should render correctly', () => {
      expect(wrapp).toMatchSnapshot()
   })

   it('Should render a div', () => {
      expect(wrapp.find('div').length).toEqual(1);
   })

   it('Should render to Calculator component', () => {
      expect(wrapp.containsMatchingElement(<Calculator />)).toEqual(true)
   })
})