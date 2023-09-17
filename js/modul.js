let modul = (function () {
  function changeItemStatus(id, type) {
    const info = getItemDates(id);
    const obj = info.obj;
    const index = info.index;
    if (type === "check") {
      obj.checked = !obj.checked;
    } else if (type === "change") {
      obj.changed = true;
    } else if (type === "favorite") {
      obj.favorite = !obj.favorite;
    } else if (type === "delete") {
      obj.delete = true;
    } else {
      return false;
    }

    data.splice(index, 1, obj);
  }

  function createItem(value) {
    const id = createId();
    const date = createDate();
    const item = {
      id: id,
      value: value,
      date: date,
      changed: false,
      favorite: false,
      delete: false,
    };

    data.push(item);
    return item;
  }
  function createDate() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }

    return `${day}:${month}:${year}`;
  }

  function createId() {
    return Number(new Date());
  }

  function changeValue(id, value) {
    const ItemDates = getItemDates(id);
    const obj = ItemDates.obj;
    const index = ItemDates.index;

    obj.value = value;
    data.splice(index, 1, obj);
  }
  function changeStatusFavorite(id, state) {
    const ItemDates = getItemDates(id);
    const obj = ItemDates.obj;
    const index = ItemDates.index;
    obj.favorite = state;
    data.splice(index, 1, obj);
  }
  function getItemDates(id) {
    let indexItem, objItem;
    data.forEach((item, index) => {
      if (item.id === +id) {
        indexItem = index;
        objItem = item;
      }
    });
    return {
      index: indexItem,
      obj: objItem,
    };
  }
  function deleteItem(id) {
    const ItemDates = getItemDates(id);
    const index = ItemDates.index;
    const obj = ItemDates.obj;
    const status = obj.delete === true ? "delete" : "toDelete";

    if (status === "delete") {
      data.splice(index, 1);
    } else if (status === "toDelete") {
      obj.delete = true;
      return false;
    }
  }
  function filterData(type) {
    if (type === "new") {
      data.sort((a, b) => a.id - b.id);
    } else if (type === "old") {
      newData = data.sort((a, b) => b.id - a.id);
    }
  }
  function changeStatus(type) {
    status = type;
  }
  function getStatus() {
    return status;
  }
  function getData() {
    return data;
  }
  function setLocalStorage() {
    localStorage.setItem("data", JSON.stringify(data));
  }
  function getLocalStorage() {
    let data = JSON.parse(localStorage.getItem("data"));
    if (data) {
      return data;
    }
    return [];
  }
  let data = [];
  let status = "all";

  function test() {
    console.log(data);
  }
  function init() {
    data = getLocalStorage();
  }
  return {
    createDate,
    createId,
    createItem,
    changeItemStatus,
    changeValue,
    changeStatusFavorite,
    getItemDates,
    deleteItem,
    getData,
    changeStatus,
    getStatus,
    filterData,
    setLocalStorage,
    init,
    test,
  };
})();
