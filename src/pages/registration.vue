<script setup lang="ts">
import FormGenerator from "../components/FormGenerator.vue";
import {reactive} from "vue";

type RegistrationFormData = {
  name: string;
  email: string;
  gender: string;
  password: string;
  agree: boolean;
};


const registrationFormData = reactive<RegistrationFormData>({
  name: '',
  email: '',
  gender: '',
  password: '',
  agree: false
});


const registrationFields = [
  {
    name: 'name',
    label: 'Ваше имя',
    type: 'text'
  },
  {
    name: 'email',
    label: 'Почта',
    type: 'email'
  },
  {
    name: 'gender',
    label: 'Пол',
    type: 'select',
    options: ['Мужской', 'Женский']
  },
  {
    name: 'password',
    label: 'Пароль',
    type: 'password'
  },
  {
    name: 'agree',
    label: 'Согласен с условиями',
    type: 'checkbox'
  }
]

const submitForm = (data: typeof registrationFormData) => {
  console.log('Форма отправлена с данными:', data)
  alert('Форма отправлена с данными: ' + JSON.stringify(data, null, 2));
}

const cancelForm = () => {
  Object.keys(registrationFormData).forEach(key => {
    if (typeof registrationFormData[key] === 'boolean') {
      registrationFormData[key] = false
    } else {
      registrationFormData[key] = ''
    }
  })
  console.log('Форма отменена, данные очищены:', registrationFormData);
}

</script>

<template>
		<FormGenerator
						:modelValue="registrationFormData"
						:fields="registrationFields"
						title="Регистрация"
						@submit="submitForm"
						@cancel="cancelForm"
		>
				<template #field-gender="{ fieldData, model }">
						<div class="custom-select-field">
								<label for="gender" class="form-generator__label">Пол</label>
								<select
												v-model="model[fieldData.name]"
												:id="fieldData.name"
												class="form-generator__select">
										<option v-for="option in fieldData.options" :value="option" :key="option">{{ option }}</option>
								</select>
						</div>
				</template>
		</FormGenerator>

</template>