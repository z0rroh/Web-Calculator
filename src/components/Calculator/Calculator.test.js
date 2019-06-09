import React from 'react';
import { shallow, mount } from 'enzyme'
import Calculator from './Calculator'
import Display from '../Display/Display'
import Keypad from '../Keypad/Keypad'

describe('<Calculator/>', () => {
   let wrapp
   beforeEach(() => wrapp = shallow(<Calculator/>))

   it('Should render correctly', () => {
      expect(wrapp).toMatchSnapshot()
   })

   it('Should render a div',() => {
      expect(wrapp.find('div').length).toEqual(1)
   })

   it('Should render the Display Component', () => {
      expect(wrapp.containsAllMatchingElements([
         <Display displayValue={wrapp.instance().state.displayValue}/>,
         <Keypad
            callOperator={wrapp.instance().callOperator}
            numbers={wrapp.instance().state.numbers}
            operators={wrapp.instance().state.operators}
            setOperator={wrapp.instance().setOperator}
            updateDisplay={wrapp.instance().updateDisplay}/>
      ])).toEqual(true)
   })
})

describe('<Calculator/> Mounted in DOM', () => {
   let wrapp;
   beforeEach(() => wrapp = mount(<Calculator />));

   it('calls updateDisplay when a number key is clicked', () => {
      const spy = jest.spyOn(wrapp.instance(), 'updateDisplay');
      wrapp.instance().forceUpdate();
      expect(spy).toHaveBeenCalledTimes(0);
      wrapp.find('.number-key').first().simulate('click');
      expect(spy).toHaveBeenCalledTimes(1);
   });

   it('calls setOperator when an operator key is clicked', () => {
      const spy = jest.spyOn(wrapp.instance(), 'setOperator');
      wrapp.instance().forceUpdate();
      expect(spy).toHaveBeenCalledTimes(0);
      wrapp.find('.operator-key').first().simulate('click');
      expect(spy).toHaveBeenCalledTimes(1);
   });

   it('calls callOperator when the submit key is clicked', () => {
      const spy = jest.spyOn(wrapp.instance(), 'callOperator');
      wrapp.instance().forceUpdate();
      expect(spy).toHaveBeenCalledTimes(0);
      wrapp.find('.submit-key').simulate('click');
      expect(spy).toHaveBeenCalledTimes(1);
   });
});

describe('updateDisplay', () => {
   let wrapp;
   beforeEach(() => wrapp = shallow(<Calculator />));
 
   it('updates displayValue', () => {
     wrapp.instance().updateDisplay('5');
     expect(wrapp.state('displayValue')).toEqual('5');
   });
 
   it('concatenates displayValue', () => {
     wrapp.instance().updateDisplay('5');
     wrapp.instance().updateDisplay('0');
     expect(wrapp.state('displayValue')).toEqual('50');
   });
 
   it('removes leading "0" from displayValue', () => {
     wrapp.instance().updateDisplay('0');
     expect(wrapp.state('displayValue')).toEqual('0');
     wrapp.instance().updateDisplay('5');
     expect(wrapp.state('displayValue')).toEqual('5');
   });
 
   it('prevents multiple leading "0"s from displayValue', () => {
     wrapp.instance().updateDisplay('0');
     wrapp.instance().updateDisplay('0');
     expect(wrapp.state('displayValue')).toEqual('0');
   });
 
   it('removes last char of displayValue', () => {
     wrapp.instance().updateDisplay('5');
     wrapp.instance().updateDisplay('0');
     wrapp.instance().updateDisplay('ce');
     expect(wrapp.state('displayValue')).toEqual('5');
   });
 
   it('prevents multiple instances of "." in displayValue', () => {
     wrapp.instance().updateDisplay('.');
     wrapp.instance().updateDisplay('.');
     expect(wrapp.state('displayValue')).toEqual('.');
   });
 
   it('will set displayValue to "0" if displayValue is equal to an empty string', () => {
     wrapp.instance().updateDisplay('ce');
     expect(wrapp.state('displayValue')).toEqual('0');
   });

});


describe('setOperator', () => {
   let wrapp;
   beforeEach(() => wrapp = shallow(<Calculator />));
 
   it('updates the value of selectedOperator', () => {
     wrapp.instance().setOperator('+');
     expect(wrapp.state('selectedOperator')).toEqual('+');
     wrapp.instance().setOperator('/');
     expect(wrapp.state('selectedOperator')).toEqual('/');
   });
 
   it('updates the value of storedValue to the value of displayValue', () => {
     wrapp.setState({ displayValue: '5' });
     wrapp.instance().setOperator('+');
     expect(wrapp.state('storedValue')).toEqual('5');
   });
 
   it('updates the value of displayValue to "0"', () => {
     wrapp.setState({ displayValue: '5' });
     wrapp.instance().setOperator('+');
     expect(wrapp.state('displayValue')).toEqual('0');
   });
 
   it('selectedOperator is not an empty string, does not update storedValue', () => {
     wrapp.setState({ displayValue: '5' });
     wrapp.instance().setOperator('+');
     expect(wrapp.state('storedValue')).toEqual('5');
     wrapp.instance().setOperator('-');
     expect(wrapp.state('storedValue')).toEqual('5');
   });

});


describe('callOperator', () => {
   let wrapp;
   beforeEach(() => wrapp = shallow(<Calculator />));
 
   it('updates displayValue to the sum of storedValue and displayValue', () => {
     wrapp.setState({ storedValue: '3' });
     wrapp.setState({ displayValue: '2' });
     wrapp.setState({ selectedOperator: '+' });
     wrapp.instance().callOperator();
     expect(wrapp.state('displayValue')).toEqual('5');
   });
 
   it('updates displayValue to the difference of storedValue and displayValue', () => {
     wrapp.setState({ storedValue: '3' });
     wrapp.setState({ displayValue: '2' });
     wrapp.setState({ selectedOperator: '-' });
     wrapp.instance().callOperator();
     expect(wrapp.state('displayValue')).toEqual('1');
   });
 
   it('updates displayValue to the product of storedValue and displayValue', () => {
     wrapp.setState({ storedValue: '3' });
     wrapp.setState({ displayValue: '2' });
     wrapp.setState({ selectedOperator: 'x' });
     wrapp.instance().callOperator();
     expect(wrapp.state('displayValue')).toEqual('6');
   });
 
   it('updates displayValue to the quotient of storedValue and displayValue', () => {
     wrapp.setState({ storedValue: '3' });
     wrapp.setState({ displayValue: '2' });
     wrapp.setState({ selectedOperator: '/' });
     wrapp.instance().callOperator();
     expect(wrapp.state('displayValue')).toEqual('1.5');
   });
 
   it('updates displayValue to "0" if operation results in "NaN"', () => {
     wrapp.setState({ storedValue: '3' });
     wrapp.setState({ displayValue: 'string' });
     wrapp.setState({ selectedOperator: '/' });
     wrapp.instance().callOperator();
     expect(wrapp.state('displayValue')).toEqual('0');
   });
 
   it('updates displayValue to "0" if operation results in "Infinity"', () => {
     wrapp.setState({ storedValue: '7' });
     wrapp.setState({ displayValue: '0' });
     wrapp.setState({ selectedOperator: '/' });
     wrapp.instance().callOperator();
     expect(wrapp.state('displayValue')).toEqual('0');
   });
 
   it('updates displayValue to "0" if selectedOperator does not match cases', () => {
     wrapp.setState({ storedValue: '7' });
     wrapp.setState({ displayValue: '10' });
     wrapp.setState({ selectedOperator: 'string' });
     wrapp.instance().callOperator();
     expect(wrapp.state('displayValue')).toEqual('0');
   });
 
   it('updates displayValue to "0" if called with no value for storedValue or selectedOperator', () => {
     wrapp.setState({ storedValue: '' });
     wrapp.setState({ displayValue: '10' });
     wrapp.setState({ selectedOperator: '' });
     wrapp.instance().callOperator();
     expect(wrapp.state('displayValue')).toEqual('0');
   });
   
});