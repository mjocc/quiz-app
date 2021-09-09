<template>
  <div class="form-group my-3">
    <label class="mb-1" :for="id">{{ label }}</label>
    <input
      class="form-control"
      :id="id"
      :type="type"
      :value="modelValue"
      :autofocus="autofocus"
      :placeholder="placeholder"
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
      type: String,
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
    autofocus: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
