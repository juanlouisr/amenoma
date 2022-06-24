import { defineStore } from "pinia";

export const usePreferencesStore = defineStore({
    id: 'preferences',
    state: () => ({
        showControlSideBar: false,
        lang: "",
        themeDark: true,
    }),
    getters: {
        isShowControlSideBar: (state) => {
           return state.showControlSideBar;
        }
    },
    actions:  {
        toggleControlSideBar(){
            this.showControlSideBar = !this.showControlSideBar;
        }
    },
});