<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import FormGenerator from "../components/FormGenerator.vue";

type FeedbackFormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const feedbackFormData = reactive<FeedbackFormData>({
  name: '',
  email: '',
		phone: '',
  message: ''
});

const dynamicFields = ref([]);

onMounted(async () => {
  try {
    const response = await fetch('data/api_form_data.json');
    const data = await response.json();
    dynamicFields.value = data.fields;

    // Добавляем поле message, если его нет в данных
    if (!dynamicFields.value.some(field => field.name === 'message')) {
      dynamicFields.value.push({
        name: 'message',
        label: 'Сообщение',
        type: 'textarea'
      });
    }
  } catch (error) {
    console.error('Ошибка загрузки данных', error);
  }
});

const submitForm = (data: typeof feedbackFormData) => {
  console.log('Форма отправлена с данными:', data);
};

const cancelForm = () => {
  Object.keys(feedbackFormData).forEach(key => {
    if (typeof feedbackFormData[key] === 'boolean') {
      feedbackFormData[key] = false;
    } else {
      feedbackFormData[key] = '';
    }
  });
  console.log('Форма отменена, данные очищены:', feedbackFormData);
};
</script>

<template>
		<FormGenerator
						v-if="dynamicFields.length > 0"
						:modelValue="feedbackFormData"
						:fields="dynamicFields"
						title="Форма с сервера"
						@submit="submitForm"
						@cancel="cancelForm"
		>
				<template #field-message="{ fieldData, model }">
						<div class="custom-msg-field">
								<label :for="fieldData.name" class="form-generator__label">{{ fieldData.label }}</label>
								<textarea
												v-model="model[fieldData.name]"
												class="form-generator__textarea"
												placeholder="Введите ваше сообщение"
								></textarea>
						</div>
				</template>
		</FormGenerator>
</template>
