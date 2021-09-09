<template>
  <div class="form-group my-3">
    <label class="mb-1" :for="id">{{ label }}</label>
    <input
      class="form-control"
      :class="{ 'is-invalid': error }"
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :autofocus="autofocus"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: 'form-input',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: [String, Number],
    },
    id: {
      type: String,
      required: true,
    },
    value: {
      type: String,
    },
    type: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
