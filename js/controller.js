const controller = (function (modulCtrl, uiCtrl) {
  function setupEventListeners() {
    modulCtrl.init();

    const elements = uiCtrl.getElements();
    const data = modulCtrl.getData();
    uiCtrl.renderItems(data, "all");
    console.log(data);
    document
      .querySelector(elements.form)
      .addEventListener("submit", ctrlAddItem);
    document
      .querySelector(elements.filter)
      .addEventListener("click", funcFilter);
    document
      .querySelector(elements.list)
      .addEventListener("click", funcSettings);

    document
      .querySelectorAll(elements.menuBtns)
      .forEach((item) => item.addEventListener("click", changeTable));
  }

  function ctrlAddItem(e) {
    e.preventDefault();
    const elements = uiCtrl.getElements();
    const input = document.querySelector(elements.input);
    const data = modulCtrl.getData()
    if (input.value.trim() === "") {
      return false;
    }

    const item = modulCtrl.createItem(input.value);

    uiCtrl.addItem(item);
    console.log(data);
    modulCtrl.setLocalStorage();
  }

  function funcFilter(e) {
    const item = e.target;
    const atr = item.getAttribute("data-filter");
    const getStatus = modulCtrl.getStatus();
    let data;
    if (atr === "normal") {
      return uiCtrl.toggleFilter();
    } else if (atr === "new") {
      modulCtrl.filterData("new");
    } else if (atr === "old") {
      modulCtrl.filterData("old");
    } else {
      return false;
    }
    data = modulCtrl.getData();
    uiCtrl.clearItems();
    uiCtrl.renderItems(data, getStatus);
    uiCtrl.toggleFilter();
  }

  function funcSettings(e) {
    const elements = uiCtrl.getElements();
    let item = e.target,
      status = null,
      listItem = item.closest(elements.listItem);
    id = Number(listItem.id);
    // let obj = modulCtrl.getItemDates(+id).obj;
    if (item.getAttribute("type") === "checkbox") {
      status = "check";
    } else if (item.getAttribute("data-settings") === "favorite") {
      uiCtrl.changeFavorite(listItem);
      status = "favorite";
    } else if (item.getAttribute("data-settings") === "delete") {
      modulCtrl.changeStatusFavorite(id, false);
      modulCtrl.deleteItem(id);
      uiCtrl.removeItem(listItem);
      modulCtrl.setLocalStorage();
      return false;
    } else if (item.getAttribute("data-settings") === "change") {
      const value = uiCtrl.changeValue(listItem);
      modulCtrl.changeValue(id, value);

      status = "change";
    } else if (item.hasAttribute("data-sel")) {
      return uiCtrl.toggleSettings(item);
    }
    modulCtrl.changeItemStatus(id, status);
    modulCtrl.setLocalStorage();
    modulCtrl.test();
  }
  function changeTable() {
    const atr = this.getAttribute("data-card");
    const data = modulCtrl.getData();

    modulCtrl.changeStatus(atr);
    uiCtrl.clearItems();
    uiCtrl.renderItems(data, atr);
    uiCtrl.navEffect(this)
  }
  return {
    init: function () {
      setupEventListeners();
    },
  };
})(modul, view);
controller.init();
