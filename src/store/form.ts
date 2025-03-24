import { createStore } from 'vuex';

type FormData = Record<string, any>;

export const form = createStore({
  state: {
    formData: {} as FormData,
  },
  mutations: {
    resetFormData(state, formName: string) {
      state.formData[formName] = {};
    }
  },
  actions: {
    resetFormData({ commit }, formName: string) {
      commit('resetFormData', formName);
    }
  },
  getters: {
    getFormData: (state) => (formName: string) => {
      return state.formData[formName] || {};
    }
  }
});
