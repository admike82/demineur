export const StorageService = {
  storage: localStorage,
  getItem: function (key) {
    try {
      return this.storage.getItem(key);
    } catch (e) {
      console.error('getItem error:', e);
      return null;
    }
  },
  setItem: function (key, value) {
    try {
      this.storage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('setItem error:', e);
      return false;
    }
  },
  removeItem: function (key) {
    try {
      this.storage.removeItem(key);
      return true;
    } catch (e) {
      console.error('removeItem error:', e);
      return false;
    }
  },
};
