export const StorageService = {
  // storage: sessionStorage,
  storage: localStorage,
  getItem: function (key) {
    return this.storage.getItem(key);
  },
  setItem: function (key, value) {
    return this.storage.setItem(key, value);
  },
  removeItem: function (key) {
    return this.storage.removeItem(key);
  },
};
