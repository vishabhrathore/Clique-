// LayoutStore.ts
import { observable, action, computed, makeObservable } from 'mobx';

class TabUIStore {
    isTabBarVisible: boolean = true;

    constructor() {
        // Using `makeObservable` to manually declare observables, actions, and computed properties
        makeObservable(this, {
            isTabBarVisible: observable,
            toggleTabBarVisibility: action.bound,
            setTabBarVisibility: action.bound,
            visibilityStatus: computed,
        });
    }

    // Action to toggle the tab bar's visibility
    toggleTabBarVisibility() {
        this.isTabBarVisible = !this.isTabBarVisible;
    }

    // Action to explicitly set the tab bar's visibility
    setTabBarVisibility(isVisible: boolean) {
        this.isTabBarVisible = isVisible;
    }

    // Computed value to return a descriptive status based on visibility
    get visibilityStatus() {
        return this.isTabBarVisible ? "Visible" : "Hidden";
    }
}

// Export an instance of the store to be used throughout the app
const tabUIStore = new TabUIStore();
export default tabUIStore;
