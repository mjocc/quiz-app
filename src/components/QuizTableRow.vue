<template>
  <tr
    tabindex="0"
    :id="name"
    @click="handleTableRowClick"
    @dblclick="handleTableRowDblClick"
    @keyup="handleTableRowKeyUp"
    class="cursor-pointer"
  >
    <td>{{ name }}</td>
    <td>{{ dateFormat(created, 'HH:MM, yyyy-mm-dd') }}</td>
    <td>{{ numQuestions }}</td>
  </tr>
</template>

<script>
import $ from 'jquery';
import _ from 'lodash';
import dateFormat from 'dateformat';

export default {
  name: 'QuizTableRow',
  emits: ['update:clickedRow', 'update:selectedRow'],
  methods: {
    highlightTableRow() {
      this.$emit('update:clickedRow', this.$props.name);
      let row = $(this.$el);
      row.siblings().removeClass('table-active');
      row.addClass('table-active');
    },
    selectTableRow() {
      this.$emit('update:selectedRow', this.$props.name);
    },
    handleTableRowClick() {
      this.highlightTableRow();
    },
    handleTableRowKeyUp(event) {
      if (event.key === 'Enter') {
        if ($(this.$el).hasClass('table-active')) {
          this.selectTableRow();
        } else {
          this.highlightTableRow();
        }
      }
    },
    handleTableRowDblClick() {
      this.selectTableRow();
    },
    dateFormat,
  },
  computed: {
    numQuestions() {
      return _.size(this.questions);
    },
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    created: {
      type: Date,
      required: true,
    },
    questions: {
      type: Object,
      required: true,
    },
  },
};
</script>
