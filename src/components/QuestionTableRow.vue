<template>
  <tr
    tabindex="0"
    :id="text"
    @click="selectTableRow"
    @keyup="handleTableRowKeyUp"
    ref="table-row"
    class="cursor-pointer"
  >
    <td>{{ text }}</td>
    <td>{{ numOptions }}</td>
  </tr>
  <tr class="no-hover-effect">
    <td
      colspan="2"
      class="collapse border border-top-0 rounded-bottom bg-light"
      data-bs-parent="#question-table-body"
      ref="collapse-container"
      :id="`${uid}-collapse-container`"
    >
      <table>
        <tbody>
          <tr :key="option.option" v-for="option in options">
            <td>{{ option.option }}</td>
            <td class="text-center p1">
              <img
                v-if="option.correct"
                src="@/assets/tick.svg"
                width="30"
                height="30"
                alt="Correct"
              />
              <img
                v-else
                src="@/assets/cross.svg"
                width="30"
                height="30"
                alt="Incorrect"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </td>
  </tr>
  <button
    data-bs-toggle="collapse"
    :data-bs-target="`#${uid}-collapse-container`"
    ref="collapse-toggle"
  ></button>
</template>

<style scoped>
.table-hover > tbody > tr.no-hover-effect:hover {
  --bs-table-accent-bg: rgba(var(--bs-light-rgb), var(--bs-bg-opacity));
  color: black;
}
button[data-bs-toggle='collapse'] {
  display: none;
}
</style>

<script>
import $ from 'jquery';
import _ from 'lodash';

export default {
  name: 'QuestionTableRow',
  data() {
    return {
      uid: null,
    };
  },
  methods: {
    selectTableRow() {
      this.$emit('update:clickedRow', this.$props.text);
      let row = $(this.$refs['table-row']);
      row.siblings().removeClass('table-active');
      row.addClass('table-active');
      this.$refs['collapse-toggle'].click();
    },
    handleTableRowKeyUp(event) {
      if (event.keyCode === 13) {
        this.selectTableRow();
      }
    },
  },
  computed: {
    numOptions() {
      return _.size(this.options);
    },
  },
  mounted() {
    this.uid = _.uniqueId('uid-');
  },
  props: {
    text: {
      type: String,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    },
  },
};
</script>

#TODO: replace bootstrap collapse with vue/plain js and css one (see:
https://codepen.io/kdydesign/pen/VrQZqx)
