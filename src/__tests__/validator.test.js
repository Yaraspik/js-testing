import validator from '../js/validator';

test('Номер карты валидный', () => {
  expect(validator('4916938850880826373')).toBeTruthy();
});

test('Номер карты не валидный', () => {
  expect(validator('4916938851880826373')).toBeFalsy();
});
