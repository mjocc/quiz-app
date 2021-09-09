<template>
  <div class="form-group my-3">
    <label class="mb-1" :for="id">{{ label }}</label>
    <select
      class="form-select"
      :id="id"
      :value="modelValue"
      :autofocus="autofocus"
      @input="$emit('update:modelValue', $event.target.value)"
    >
      <option value="default" disabled selected hidden>Select an option</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'form-select',
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
    label: {
      type: String,
      required: true,
    },
    options: {
      type: Array[Object], // object has value and text properties
      required: true,
      validator(options) {
        return Array.prototype.every.call(options, (option) => {
          return (
            Object.prototype.hasOwnProperty.call(option, 'value') &&
            Object.prototype.hasOwnProperty.call(option, 'text')
          );
        });
      },
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
