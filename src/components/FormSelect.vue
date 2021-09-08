<template>
  <div class="form-group my-3">
    <label class="mb-1" :for="id"><slot></slot></label>
    <select
      class="form-select"
      :id="id"
      :name="name"
      :required="required"
      :autofocus="autofocus"
    >
      <option disabled selected hidden>Select an option</option>
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
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    options: {
      type: Array[Object], // object has value and text properties
      required: true,
      validator(options) {
        return options.every((option) => {
          Object.prototype.hasOwnProperty.call(option, 'value') &&
            Object.prototype.hasOwnProperty.call(option, 'value');
        });
      },
    },
    required: {
      type: Boolean,
      default: true,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
