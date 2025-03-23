<script setup lang="ts">
import {defineProps, reactive, watch} from 'vue';
import '../assets/styles/form_generator.scss';

/** -------------------------------------------------- **/

const props = defineProps<{
  title?: string;
  fields: {
    name: string;
    label: string;
    type: string;
    options?: string[]
  }[];
  modelValue: Record<string, any>;
}>()


const emit = defineEmits(['update:modelValue', 'submit', 'cancel']);

const model = reactive({
  ...props.modelValue
})

watch(() => model, (newModel) =>
    emit('update:modelValue', newModel),
  {
    deep: true
  }
)

const onSubmit = () => {
		emit('submit', model);
}

const onCancel = () => {
		emit('cancel');
}

</script>

<template>
		<form class="form-generator" @submit.prevent="onSubmit">

				<h2 v-if="props.title">{{ props.title }}</h2>

				<div
								v-for="(field, index) in props.fields"
								:key="index"
								class="form-generator__field"
				>
						<label
										v-if="field.type !== 'checkbox'"
										:for="field.name"
										class="form-generator__label">{{ field.label }}
						</label>
						<input
										v-if="['text', 'email', 'password', 'number'].includes(field.type)"
										v-model="model[field.name]"
										type="text"
										:id="field.name"
										class="form-generator__input"/>

						<select
										v-else-if="field.type === 'select'"
										v-model="model[field.name]"
										:id="field.name"
										class="form-generator__select">
								<option
												v-for="option in field.options"
												:key="option"
												:value="option">{{ option }}
								</option>

						</select>

						<textarea
										v-else-if="field.type === 'textarea'"
										v-model="model[field.name]"
										:id="field.name"
										class="form-generator__textarea"
						></textarea>


						<div
										v-else-if="field.type === 'checkbox'"
										class="form-generator__field form-generator__field--checkbox"
						>
								<label class="form-generator__checkbox-label">
										<input
														v-model="model[field.name]"
														:id="field.name"
														type="checkbox"
														class="form-generator__checkbox"/>
										Согласен с условиями
								</label>
						</div>
				</div>
				<div class="form-generator__actions">
						<button
										type="button"
										class="form-generator__button form-generator__button--cancel"
										@click="onCancel"
						>
								Отмена
						</button>
						<button type="submit" class="form-generator__button form-generator__button--submit">
								Сохранить
						</button>
				</div>
		</form>
</template>
