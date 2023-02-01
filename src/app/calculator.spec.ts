import { Calculator } from './calculator';

describe('Test for Calculator', () => {
  describe('Multiuply()', ()=> {
    it('#multiply should return a nine', () => {
      //Arrange
      const calculator = new Calculator();
      //Act
      const rta = calculator.multiply(3,3);
      //Assert
      expect(rta).toEqual(9);
    });
    it('#multiply 1*4 should return a 4', () => {
      //Arrange
      const calculator = new Calculator();
      //Act
      const rta = calculator.multiply(1,4);
      //Assert
      expect(rta).toEqual(4);
    });
  })
  describe('Divide()', ()=> {
    it('#divide some numbers should return a null o numbers', () => {
      //Arrange
      const calculator = new Calculator();
      //Act
      expect(calculator.divide(9,0)).toEqual(null);
      //
      expect(calculator.divide(9,1)).toEqual(9);
    });
    it('#divide some numbers should return a null o numbers, matchers comparisons', () => {
      //Arrange
      const calculator = new Calculator();
      //Act
      expect(calculator.divide(9,0)).toEqual(null);  // or toBe()
      //
      expect(calculator.divide(9,.5)).toBeGreaterThan(10);
      expect(calculator.divide(9,.5) === 18).toBeTruthy();
    });
  })
});
