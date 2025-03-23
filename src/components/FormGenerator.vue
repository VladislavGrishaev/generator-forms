<script setup lang="ts">
import {defineProps, defineModel, reactive} from 'vue';
import '../assets/styles/form_generator.scss';

/** -------------------------------------------------- **/

const props = defineProps<{
  fields: {
    name: string;
    label: string;
    type: string;
    options?: string[]
  }[];
  modelValue: Record<string, any>;
}>()


const emit = defineEmits(['update:modelValue', 'submit', 'cancel']);



</script>

<template>
		<form class="form-generator" >

				<div
								v-for="(field, index) in props.fields"
								:key="index"
								class="form-generator__field"
				>
						<label
										:for="field.name"
										class="form-generator__label">{{ field.label }}
						</label>
						<input
										v-if="field.type === 'text'"
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
				</div>
		</form>
</template>
