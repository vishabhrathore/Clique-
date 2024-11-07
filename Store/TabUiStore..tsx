import { observable, action, computed, makeObservable } from "mobx";
import { createContext, useContext } from "react";

class TabUIStore {
  isTabBarVisible: boolean = true;
  lastScrollDirection: "up" | "down" | null = null; // Initialize lastScrollDirection

  constructor() {
    makeObservable(this, {
      isTabBarVisible: observable,
      lastScrollDirection: observable, // Make it observable
      toggleTabBarVisibility: action.bound,
      setTabBarVisibility: action.bound,
      setScrollDirection: action.bound, // Add action to set scroll direction
      visibilityStatus: computed,
    });
  }

  toggleTabBarVisibility() {
    this.isTabBarVisible = !this.isTabBarVisible;
  }

  setTabBarVisibility(isVisible: boolean) {
    this.isTabBarVisible = isVisible;
  }

  setScrollDirection(direction: "up" | "down" | null) {
    this.lastScrollDirection = direction; // Update the last scroll direction
  }

  get visibilityStatus() {
    return this.isTabBarVisible ? "Visible" : "Hidden";
  }
}

const tabUIStore = new TabUIStore();
export const TabUIStoreContext = createContext<TabUIStore>(tabUIStore);

export const useTabUIStore = () => {
  return useContext(TabUIStoreContext);
};

export default tabUIStore;
