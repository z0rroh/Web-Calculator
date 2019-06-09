import React from 'react';
import { shallow, mount } from 'enzyme'
import Keypad from './Keypad'
import Key from '../Key/Key'

describe('<Keypad/>', () => {
   let wrapp

   beforeEach(() => {
      wrapp = shallow(
         <Keypad
            callOperator={jest.fn()}
            numbers={[]}
            operators={[]}
            setOperator={jest.fn()}
            updateDisplay={jest.fn()}/>
      )
   });

   it('Should render correctly', () => {
      expect(wrapp).toMatchSnapshot()
   })

   it('Should render 4 div', () => {
      expect(wrapp.find('div').length).toEqual(4)
   })

   it('Should render a instance of Key component for each index of numbers, operators and the submit Key', () => {
      const numbers = ['0','1']
      const operators = ['+','-']
      const submit = 1
      const keyTotal = numbers.length + operators.length + submit
      wrapp.setProps({ numbers, operators })
      expect(wrapp.find('Key').length).toEqual(keyTotal)
   })

});

describe('<Keypad/> Mounted in DOM', () => {
   let wrapp;
   beforeEach(() => {
     wrapp = mount(
       <Keypad
         callOperator={jest.fn()}
         numbers={[]}
         operators={[]}
         setOperator={jest.fn()}
         updateDisplay={jest.fn()}
       />
     );
   });
 
   it('renders the values of numbers to the DOM', () => {
     wrapp.setProps({ numbers: ['0', '1', '2'] })
     expect(wrapp.find('.numbers-container').text()).toEqual('012');
   });
 
   it('renders the values of operators to the DOM', () => {
     wrapp.setProps({ operators: ['+', '-', '*', '/'] });
     expect(wrapp.find('.operators-container').text()).toEqual('+-*/');
   });
 });