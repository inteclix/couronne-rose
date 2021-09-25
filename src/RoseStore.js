import { makeAutoObservable } from "mobx"

class RoseStore {
  user = null;
  totalDons = 0;
  products = [];
  constructor() {
    makeAutoObservable(this);
  }
  getProductDons() {}
  login() {}
  logout() {}
  toggle() {}
}

const roseStore = new RoseStore();

export default roseStore;
