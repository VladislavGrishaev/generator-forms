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

const loading = ref(true);

onMounted(async () => {
  try {
    setTimeout(async () => {
      const response = await fetch('data/api_form_data.json');
      const data = await response.json();
      dynamicFields.value = data.fields;

      if (!dynamicFields.value.some(field => field.name === 'message')) {
        dynamicFields.value.push({
          name: 'message',
          label: 'Сообщение',
          type: 'textarea'
        });
      }

      loading.value = false;
    }, 1500);
  } catch (error) {
    console.error('Ошибка загрузки данных', error);
  }
});

const submitForm = (data: typeof feedbackFormData) => {
  console.log('Форма отправлена с данными:', data);
  alert('Форма отправлена с данными: ' + JSON.stringify(data, null, 2));
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
		<div v-if="loading" class="preloader">
				<div class="spinner"></div>
				Загрузка...
		</div>

		<FormGenerator
						v-if="dynamicFields.length > 0"
						:modelValue="feedbackFormData"
						:fields="dynamicFields"
						title="Написать нам"
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

<style scoped>

.preloader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: #2196f3;
}

.spinner {
    border: 4px solid transparent;
    border-top: 4px solid #2196f3;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin: 0 20px 0 0;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

.custom-msg-field {
    margin-top: 20px;
}

.form-generator__textarea {
    width: 100%;
    height: 150px;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 16px;
}

.form-generator__label {
    font-size: 14px;
    margin-bottom: 8px;
    display: block;
}
</style>