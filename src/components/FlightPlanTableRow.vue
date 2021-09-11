<template>
  <tr
    tabindex="0"
    :id="name"
    @click="handleTableRowClick"
    @dblclick="handleTableRowDblClick"
    @keyup="handleTableRowKeyUp"
  >
    <td>{{ name }}</td>
    <td>{{ created.toDateString() }}</td>
    <td v-if="complete" class="text-center p-1">
      <img src="../assets/tick.svg" width="30" height="30" alt="Complete" />
    </td>
    <td v-else class="text-center p-1">
      <img
        src="../assets/cross.svg"
        width="30"
        height="30"
        alt="Not complete"
      />
    </td>
  </tr>
</template>

<script>
import $ from 'jquery';

export default {
  name: 'fp-row',
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
      if (event.keyCode === 13) {
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
    complete: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
