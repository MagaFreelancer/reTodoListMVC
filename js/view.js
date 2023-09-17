let view = (function () {
  const elements = {
    form: ".todolist__form",
    input: "#input-add",
    list: "#list",
    filter: ".todolist__filter",
    filterBtn: "#filter",
    filterSelect: ".todolist__filter-list",
    listItem: ".todolist__list-item",
    label: ".todolist__label",
    todoListText: ".todolist__text",
    changeText: ".todolist__change-text",
    menuBtns: ".todolist__btn",
  };

  function addItem(itemInfo) {
    let favoriteCls = "",
      checked = "",
      changed = "";

    if (itemInfo.favorite) {
      favoriteCls = "todolist__list-item--favorites";
    }
    if (itemInfo.checked) {
      checked = "checked";
    }
    if (itemInfo.changed) {
      changed = "changed";
    }
    let html = `
    <li class="todolist__list-item ${favoriteCls}" id="${itemInfo.id}">
                        <label class="todolist__label">
                            <input type="checkbox" ${checked} class="todolist__checkbox display-checkbox">
                            <span class="todolist__checkbox-style"></span>

                            <div class="todolist__text">${itemInfo.value}</div>
                        </label>
                        <input type="text" class="todolist__change-text">
                        <div class="todolist__func">
                            <div class="todolist__settings">
                                <button class="todolist__settings-btn" data-sel>Настроить</button>
                                <ul class="todolist__settings-list">
                                    <li class="todolist__settings-item">
                                        <button data-settings="favorite"
                                            class="todolist__settings-btns todolist__settings-btn-favorites ">Избранное</button>
                                    </li>
                                    <li class="todolist__settings-item">
                                        <button data-settings="delete" class="todolist__settings-btns">Удалить</button>
                                    </li>
                                    <li class="todolist__settings-item">
                                        <button data-settings="change" class="todolist__settings-btns">Изменить</button>
                                    </li>
                                </ul>
                            </div>
                            <div class="todolist__date">
                                ${changed} ${itemInfo.date}
                            </div>
                        </div>
                    </li>
    `;

    document.querySelector(elements.list).insertAdjacentHTML("beforeend", html);
  }
  function removeItem(item) {
    item.remove();
  }
  function toggleSettings(item) {
    item.classList.toggle("todolist__settings-btn--active");
  }
  function toggleFilter() {
    document
      .querySelector(elements.filterSelect)
      .classList.toggle("todolist__filter-list--active");
  }
  function changeValue(item) {
    const cls = "todolist__list-item--change";
    const clsStatus = item.classList.contains("todolist__list-item--change");
    const field = item.querySelector(elements.changeText);
    let valueInputs = item.querySelector(elements.todoListText);
    if (clsStatus) {
      valueInputs.innerText = field.value;
      field.value = "";
    } else {
      field.value = valueInputs.innerText;
    }
    item.classList.toggle(cls);
    return valueInputs.innerText;
  }

  function renderItems(arr, type) {
    if (type === "all") {
      arr.forEach((item) => {
        addItem(item);
      });
    } else if (type === "deleted") {
      arr.forEach((item) => {
        if (item.delete) {
          addItem(item);
        }
      });
    } else if (type === "favorites") {
      arr.forEach((item) => {
        if (item.favorite) {
          addItem(item);
        }
      });
    }
  }
  function navEffect(element) {
    document.querySelectorAll(elements.menuBtns).forEach((item) => {
      item.classList.remove("todolist__btn--active");
    });
    element.classList.add('todolist__btn--active')
  }
  function getElements() {
    return elements;
  }
  function changeFavorite(item) {
    item.classList.toggle("todolist__list-item--favorites");
  }
  function clearItems() {
    document.querySelector(elements.list).innerHTML = "";
  }
  return {
    getElements,
    addItem,
    toggleSettings,
    toggleFilter,
    changeValue,
    removeItem,
    changeFavorite,
    renderItems,
    navEffect,
    clearItems,
  };
})();
