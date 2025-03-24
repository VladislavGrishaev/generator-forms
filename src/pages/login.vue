<script setup lang="ts">
import FormGenerator from "../components/FormGenerator.vue";
import {reactive} from "vue";

type LoginFormData = {
  email: string;
  password: string;
};


const LoginFormData = reactive<LoginFormData>({
  email: '',
  password: ''
});


const loginFields = [
  {
    name: 'email',
    label: 'Почта',
    type: 'email'
  },
  {
    name: 'password',
    label: 'Пароль',
				type: 'password'
  }
]

const submitForm = (data: typeof LoginFormData) => {
  console.log('Форма отправлена с данными:', data)
  alert('Форма отправлена с данными: ' + JSON.stringify(data, null, 2));
}

const cancelForm = () => {
  Object.keys(LoginFormData).forEach(key => {
    if (typeof LoginFormData[key] === 'boolean') {
      LoginFormData[key] = false
    }
    else {
      LoginFormData[key] = ''
    }
  })
  console.log('Форма отменена, данные очищены:', LoginFormData);
}

</script>

<template>
		<FormGenerator
						:modelValue="LoginFormData"
						:fields="loginFields"
						title="Вход"
						@submit="submitForm"
						@cancel="cancelForm"
		>
				<template #field-password="{ fieldData, model }">
						<div class="custom-password-field">
								<label :for="fieldData.name" class="form-generator__label">{{ fieldData.label }} </label>
								<input
												v-model="model[fieldData.name]"
												type="password"
												:id="fieldData.name"
												class="form-generator__input"
												placeholder="Введите ваш пароль"
												autocomplete="password"
												current-password="password"
								/>
						</div>
				</template>
		</FormGenerator>

</template>