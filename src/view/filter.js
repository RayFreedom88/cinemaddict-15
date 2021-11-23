const createMainNavigationItem = (filter) => {
  const {name, count} = filter;

  return (
    `<a href="#${name}" class="main-navigation__item">
      ${name} <span class="main-navigation__item-count">${count}</span>
    </a>`
  );
};

export const createMainNavigationTpl = ( filters) => {
  const mainNavigationItem = filters.map((it) => createMainNavigationItem(it)).join('\n');

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        ${mainNavigationItem}
    </nav>`
  );
};
