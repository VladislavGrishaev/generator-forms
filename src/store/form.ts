import {createStore} from 'vuex';


interface FormField {
  name: string;
  label: string;
  type: string;
  options?: string[];
}

type FormData = Record<string, string | boolean>;


export const form = createStore({
  state: {
    formData: {} as FormData,
    fields: [] as FormField[]
  },

  mutations: {
    setFormData(state, data: FormData) {
      state.formData = data;
    },
    setFormFields(state, fields: FormField[]) {
      state.fields = fields;
    }
  },

  actions: {
    updateFormData({commit}, data: FormData) {
      commit('setFormData', data);
    },
    updateFields({commit}, fields: FormField[]) {
      commit('setFormFields', fields);
    }
  },

  getters: {
    formData(state) {
      return state.formData;
    },
    formFields(state) {
      return state.fields;
    }
  }
});



























