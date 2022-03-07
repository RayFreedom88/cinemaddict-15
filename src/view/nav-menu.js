import AbstractView from './abstract';

const createNavMenuTpl = () => (
  `<nav class="main-navigation">
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`
);

export default class NavMenu extends AbstractView {
  getTemplate() {
    return createNavMenuTpl();
  }
}
