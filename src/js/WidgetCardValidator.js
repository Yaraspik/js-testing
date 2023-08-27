import typeCard from './typeCard';
import validateCard from './validator';

export default class WidgetCardValidator {
  constructor() {
    this.onSubmit = this.onSubmit.bind(this);
    this.onchange = this.onchange.bind(this);
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }
    this.container = container;
    this.init();
  }

  init() {
    this.container.innerHTML = WidgetCardValidator.markup;

    this.element = this.container.querySelector(WidgetCardValidator.selector);
    this.luhn = this.container.querySelector(WidgetCardValidator.luhnSelector);
    this.submit = this.element.querySelector(WidgetCardValidator.submitSelector);
    this.input = this.element.querySelector(WidgetCardValidator.inputSelector);
    this.cards = this.element.querySelector('.cards');

    this.element.addEventListener('submit', this.onSubmit);
    this.input.addEventListener('input', this.onchange);
  }

  onSubmit(e) {
    e.preventDefault();
    const cardNumber = this.input.value;

    if (cardNumber.length < 13 || cardNumber.length > 19) {
      this.luhn.textContent = null;
      this.showTooltip(cardNumber.length);
    } else {
      const valid = validateCard(cardNumber);
      let validText = ' ';
      if (!valid) {
        validText = ' не ';
      }
      this.luhn.textContent = `Карта${validText}валидна!`;
    }
  }

  onchange(e) {
    e.preventDefault();
    if (this.tooltip) {
      this.tooltip.remove();
      this.tooltip = null;
    }

    const systemCard = typeCard(this.input.value);
    const cards = Array.from(this.cards.children);

    cards.forEach((element) => {
      element.firstChild.classList.add('not-active');
    });

    if (!systemCard) {
      this.luhn.textContent = null;
      return;
    }

    cards.forEach((element) => {
      if (element.firstChild.dataset.name === systemCard.name) {
        element.firstChild.classList.remove('not-active');
      }
    });
  }

  showTooltip(length) {
    if (!this.tooltip) {
      const tooltip = document.createElement('div');
      tooltip.classList.add('input-tooltip');
      if (length === 0) {
        tooltip.innerText = 'Введите номер банковской карты';
      }
      if (length > 0 && length < 13) {
        tooltip.innerText = 'Номер банковской карты должен содержать не менее 13 цифр';
      }
      if (length > 19) {
        tooltip.innerText = 'Номер банковской карты не может содержать больше 19 цифр';
      }
      this.input.after(tooltip);
      this.tooltip = tooltip;
    }
  }

  static get submitSelector() {
    return '.submit';
  }

  static get inputSelector() {
    return '.input';
  }

  static get selector() {
    return '.widget-validator';
  }

  static get luhnSelector() {
    return '.luhn-algorithm';
  }

  static get tooltipSelector() {
    return '.input-tooltip';
  }

  static get markup() {
    return `
      <div class="widget-validator">
        <h3>Проверьте свою карту</h3>
        <ul class="cards">
            <li><div data-name="visa" class="card not-active"></div></li>
            <li><div data-name="master" class="card not-active"></div></li>
            <li><div data-name="amex" class="card not-active"></div></li>
            <li><div data-name="discover" class="card not-active"></div></li>
            <li><div data-name="jcb" class="card not-active"</div></li>
            <li><div data-name="diners-club" class="card not-active"></div></li>
            <li><div data-name="world" class="card not-active"</div></li>
        </ul>
        <form class="form-validate">
            <input class="input" type="number" min="0"placeholder="Номер карты"/>
            <button class="submit">Проверить</button>
        </form>
      </div>
      <div class="luhn-algorithm">
        
      </div>
    `;
  }
}
