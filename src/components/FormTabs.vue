<script setup lang="ts">
import FormGenerator from "./FormGenerator.vue";
import {onMounted, reactive, ref} from "vue";

const registerFields = [
  {
				name: 'name',
				label: 'Имя',
				type: 'text'
		},
		{
				name: 'gender',
				label: 'Пол',
				type: 'select',
				options: ['Мужской', 'Женский']
		},
		{
				name: 'message',
				label: 'Сообщение',
				type: 'textarea'
  },
  {
    name: 'agree',
				label: 'Согласен с условиями',
				type: 'checkbox'
  }
]


const subscribeFields = [
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
];

const loginForm = [
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
];


const formData = reactive({
		name: '',
		gender: '',
		message: '',
		agree: false
})

const dynamicFields = ref([])

onMounted(async () => {
  try {
		  const response = await fetch('data/api_form_data.json')
		  const data = await response.json()
		  dynamicFields.value = data.fields
  }
  catch (error) {
    console.error('Ошибка загрузки данных', error)
  }
})

</script>

<template>
		<FormGenerator
				:modelValue="formData"
				title="Регистрация"
				:fields="registerFields"
				@submit="console.log('submit')"
				@cancel="console.log('cancel')"
		/>



		<FormGenerator
						:modelValue="formData"
						:fields="subscribeFields"
						title="Подписаться"
						@submit="console.log('submit')"
						@cancel="console.log('cancel')"
		/>

		<FormGenerator
						:modelValue="formData"
						:fields="loginForm"
						title="Вход"
						@submit="console.log('submit')"
						@cancel="console.log('cancel')"
		/>

	<FormGenerator
		v-if="dynamicFields.length > 0"
			:modelValue="formData"
			:fields="dynamicFields"
			title="Форма с сервера"
			@submit="console.log('submit')"
			@cancel="console.log('cancel')"
	/>
</template>