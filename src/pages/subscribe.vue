<script setup lang="ts">
import FormGenerator from "../components/FormGenerator.vue";
import {reactive} from "vue";

type SubscribeFormData = {
  email: string;
  agree: boolean;
};


const subscribeFormData = reactive<SubscribeFormData>({
  email: '',
  agree: false
});


const subscribeFields = [
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
    name: 'agree',
		  label: 'Согласен с условиями',
		  type: 'checkbox'
  }
]

const submitForm = (data: typeof subscribeFormData) => {
  console.log('Форма отправлена с данными:', data)
}

const cancelForm = () => {
  Object.keys(subscribeFormData).forEach(key => {
    if (typeof subscribeFormData[key] === 'boolean') {
      subscribeFormData[key] = false
    }
    else {
      subscribeFormData[key] = ''
    }
  })
  console.log('Форма отменена, данные очищены:', subscribeFormData);
}

</script>

<template>


		<FormGenerator
						:modelValue="subscribeFormData"
						:fields="subscribeFields"
						title="Подписаться"
						@submit="submitForm"
						@cancel="cancelForm"
		>
				<template #field-email="{ fieldData, model }">
						<div class="custom-email-field">
								<label :for="fieldData.name" class="form-generator__label">{{ fieldData.label }} </label>
								<input
												v-model="model[fieldData.name]"
												type="email"
												:id="fieldData.name"
												class="form-generator__input"
												placeholder="Введите ваш email"
								/>
						</div>
				</template>
		</FormGenerator>

</template>