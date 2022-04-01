(window as any).__ = Object.assign((window as any).__ || {}, {
  sessionItemRoyal: {
    set(key, val) {
      sessionStorage.setItem(JSON.stringify(key), val);
    },
    get(key) {
      return JSON.parse(sessionStorage.getItem(key) || "");
    },
    remove(key) {
      sessionStorage.removeItem(key);
    },
  },
  localItemRoyal: {
    set(key, val) {
      localStorage.set(JSON.stringify(key), val);
    },
    get(key) {
      return JSON.parse(localStorage.get(key));
    },
    remove(key) {
      localStorage.remove(key);
    },
  },
});
