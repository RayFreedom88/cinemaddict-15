import AbstractView from './abstract';

const createFilmsTemplate = () => (
  `<section class="films">
  </section>`
);

export default class Films extends AbstractView {
  getTemplate() {
    return createFilmsTemplate();
  }
}
