<template>
  <div class="form-group my-3">
    <label class="mb-1" :for="id">{{ label }}</label>
    <input
      class="form-control"
      :id="id"
      :type="type"
      :value="$attrs.modelValue"
      :autofocus="autofocus"
      :placeholder="placeholder"
      @input="updateValue($event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: 'form-input',
  emits: ['update:modelValue'],
  props: {
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
  methods: {
    updateValue(value) {
      this.$emit('update:modelValue', value);
    },
  },
};
</script>
