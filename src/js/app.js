import WidgetCardValidator from './WidgetCardValidator';

const container = document.querySelector('.container');
const cardValidator = new WidgetCardValidator();
cardValidator.bindToDOM(container);
