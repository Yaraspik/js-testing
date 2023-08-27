import definitionPaymentSystem from './definitionPaymentSystem';

export default function typeCard(cardNumber) {
  const activeCard = definitionPaymentSystem.find(
    (el) => el.number.find((element) => {
      const strEl = String(element);
      return cardNumber.startsWith(strEl);
    }),
  );

  return activeCard;
}
