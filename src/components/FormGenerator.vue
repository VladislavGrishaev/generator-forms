<script setup lang="ts">
import {defineProps, reactive, useSlots, watch} from 'vue';
import '../assets/styles/modules/_form_generator.scss';

/** -------------------------------------------------- **/

const slots = useSlots();

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

const modelObj = reactive({
  ...props.modelValue
})

watch(
  () => props.modelValue,
  (newVal) => {
    Object.assign(modelObj, newVal);
  },
  { deep: true }
);

watch(
  modelObj,
  (newModel) => {
    emit('update:modelValue', newModel);
  },
  { deep: true }
);

const onSubmit = () => {
  emit('submit', modelObj);
}

const onCancel = () => {
  for (const key in modelObj) {
    modelObj[key] = typeof modelObj[key] === 'boolean' ? false : '';
  }
  emit('cancel');
};

</script>

<template>
		<form class="form-generator" @submit.prevent="onSubmit">
				<h2 v-if="props.title">{{ props.title }}</h2>

				<div
								v-for="(field, index) in props.fields"
								:key="index"
								class="form-generator__field"
				>
						<template v-if="field.type !== 'checkbox' && !slots[`field-${field.name}`]">
								<label :for="field.name" class="form-generator__label">
										{{ field.label }}
								</label>
						</template>

						<template v-if="['text', 'email', 'password', 'number', 'radio', 'tel'].includes(field.type)">
								<slot
												:name="`field-${field.name}`"
												:fieldData="field"
												:model="modelObj"
								>
										<input
														v-model="modelObj[field.name]"
														:type="field.type"
														:id="field.name"
														class="form-generator__input"
														:autocomplete="field.type === 'password' ? 'password' : undefined"
														:current-password="field.type === 'password' ? 'password' : undefined"
										/>
								</slot>
						</template>

						<template v-else-if="field.type === 'select'">
								<slot
												:name="`field-${field.name}`"
												:fieldData="field"
												:model="modelObj"
								>
										<select
														v-model="modelObj[field.name]"
														:id="field.name"
														class="form-generator__select"
										>
												<option
																v-for="option in field.options"
																:key="option"
																:value="option"
												>
														{{ option }}
												</option>
										</select>
								</slot>
						</template>

						<template v-else-if="field.type === 'textarea'">
								<slot
												:name="`field-${field.name}`"
												:fieldData="field"
												:model="modelObj"
								>
          <textarea
				          v-model="modelObj[field.name]"
				          :id="field.name"
				          class="form-generator__textarea"
          ></textarea>
								</slot>
						</template>

						<template v-else-if="field.type === 'checkbox'">
								<slot
												:name="`field-${field.name}`"
												:fieldData="field"
												:model="modelObj"
								>
										<div class="form-generator__field form-generator__field--checkbox">
												<label class="form-generator__checkbox-label">
														<input
																		v-model="modelObj[field.name]"
																		:id="field.name"
																		type="checkbox"
																		class="form-generator__checkbox"
														/>
														{{ field.label }}
												</label>
										</div>
								</slot>
						</template>
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
								Отправить
						</button>
				</div>
		</form>
</template>
