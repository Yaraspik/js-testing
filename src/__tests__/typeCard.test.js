import typeCard from '../js/typeCard';

test('Карта mc', () => {
  expect(typeCard('4916938850880826373')).toEqual({
    name: 'visa',
    number: [4],
  });
});
