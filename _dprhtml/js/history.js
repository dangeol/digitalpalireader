'use strict';

function removeHistory(i) {

  if (__navigationTabViewModel.isStorageSupportedByBrowser) {
    let navHistoryArrayFromStorage = localStorage.getItem("navHistoryArray");
    let data = [];
    if (navHistoryArrayFromStorage) {
      data = JSON.parse(navHistoryArrayFromStorage).slice();
      data.splice(i, 1);
      localStorage.setItem("navHistoryArray", JSON.stringify(data));
      __navigationTabViewModel.updateHistory();
      bookmarkframe(0);
    }
  }
}

function clearHistory(cp) {

  if (__navigationTabViewModel.isStorageSupportedByBrowser) {
    var answer = confirm('Are you sure you want to erase the history?');
    if(!answer) { return; }
    let navHistoryArrayFromStorage = localStorage.getItem("navHistoryArray");
    if (navHistoryArrayFromStorage) {
      localStorage.removeItem("navHistoryArray");
      __navigationTabViewModel.updateHistory();
      bookmarkframe(0);
    }
  }
}

function getHistory() {

  if (__navigationTabViewModel.isStorageSupportedByBrowser) {
    let navHistoryArrayFromStorage = localStorage.getItem("navHistoryArray");
    let content = [];
    if (navHistoryArrayFromStorage) {
      let data = JSON.parse(navHistoryArrayFromStorage);
      for (var i in data) {
        content.push(data[i]);
      }
    }
    return content.join('#').split('#');
  }

}

function addHistory(value) {

  if (__navigationTabViewModel.isStorageSupportedByBrowser) {
    let navHistoryArrayFromStorage = localStorage.getItem("navHistoryArray");
    if (navHistoryArrayFromStorage) {
      let data = JSON.parse(navHistoryArrayFromStorage);
      for (var i in data) {
        if (data[i].localeCompare(value) === 0 || i > 99) return;
      }
      data.push(value);
      localStorage.setItem("navHistoryArray", JSON.stringify(data));
      __navigationTabViewModel.updateHistory();
    }
  }
}
