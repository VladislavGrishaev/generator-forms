<script setup lang="ts">
import FormGenerator from "./FormGenerator.vue";
import {reactive} from "vue";

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

const complainFields = [
  {
				name: 'name',
				label: 'Имя',
				type: 'text'
  },
		{
    'name': 'complain',
				'label': 'Жалоба',
				'type': 'select',
				'options': ['Жалоба 1', 'Жалоба 2']
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


const formData = reactive({
		name: '',
		gender: '',
		message: '',
		agree: false
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
						:fields="complainFields"
						title="Жалоба"
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
</template>