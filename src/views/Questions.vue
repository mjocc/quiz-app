<template>
  <navbar title="Manage questions" />
  <table :class="{ table: true, 'table-hover': !noQuestions }">
    <thead>
      <tr>
        <th style="width: 65%" scope="col">Save name</th>
        <th style="width: 30%" scope="col">Number of options</th>
      </tr>
    </thead>
    <tbody id="question-table-body">
      <template v-if="noQuestions">
        <tr>
          <td colspan="2" class="text-muted fw-light text-center fst-italic">
            No questions exist
          </td>
        </tr>
      </template>
      <template v-else>
        <question-table-row
          v-for="question in orderedQuestions"
          :key="question.order"
          :text="question.text"
          :options="question.options"
          @update:clickedRow="updateClickedRow"
          @update:selectedRow="updateSelectedRow"
        />
      </template>
    </tbody>
  </table>

  <button
    class="btn btn-dark mb-2"
    id="create-button"
    data-bs-toggle="modal"
    data-bs-target="#create-modal"
  >
    Create
  </button>
  <button
    class="btn btn-dark float-end ms-1 mb-2"
    @click="$router.push({ name: 'ManageQuizzes' })"
  >
    Back
  </button>

  <teleport to="body">
    <div class="modal" tabindex="-1" id="create-modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Create question</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              ref="close-create-modal"
            ></button>
          </div>
          <form @submit.prevent="submitCreateForm">
            <div class="modal-body">
              <div class="input-group">
                <span class="input-group-text">Save name</span>
                <input
                  type="text"
                  maxlength="100"
                  class="form-control"
                  id="create-save-name"
                  v-model="createSaveName"
                  :class="{ 'is-invalid': createSaveNameInvalid }"
                  required
                  @input="createSaveNameInvalid = false"
                />
              </div>
            </div>
            <div class="modal-footer">
              <input type="submit" class="btn btn-dark" value="Create" />
              <button
                type="button"
                class="btn btn-dark"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="modal" tabindex="-1" id="delete-modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Delete question</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              ref="close-delete-modal"
            ></button>
          </div>
          <form @submit.prevent="submitDeleteForm">
            <div class="modal-body">
              This will irreversibly delete the selected question. Are you sure?
            </div>
            <div class="modal-footer">
              <input
                type="submit"
                class="btn btn-danger"
                value="Continue"
                id="confirm-delete"
              />
              <button
                type="button"
                class="btn btn-dark"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import _ from 'lodash';
import $ from 'jquery';
import toastr from 'toastr';
import { mapState, mapActions } from 'vuex';

import Navbar from '@/components/Navbar.vue';
import QuestionTableRow from '../components/QuestionTableRow.vue';

export default {
  name: 'Questions',
  props: ['quiz'],
  data() {
    return {
      clickedRow: null,
      createSaveName: null,
      createSaveNameInvalid: false,
    };
  },
  methods: {
    ...mapActions(['createQuiz', 'deleteQuiz']),
    updateClickedRow(name) {
      this.clickedRow = name;
    },
    removeClickedRow() {
      this.clickedRow = null;
    },
    handleSelectButtonClick() {
      this.updateSelectedRow(this.clickedRow);
    },
    async submitCreateForm() {
      let [success, message] = await this.createQuiz(this.createSaveName);
      if (success) {
        $(this.$refs['close-create-modal']).click();
        this.removeClickedRow();
        this.createSaveName = null;
        toastr.success(message);
      } else {
        this.createSaveNameInvalid = true;
        toastr.error(message);
      }
    },
    async submitEditForm() {
      let [success, message] = await this.updateQuiz({
        oldName: this.clickedRow,
        newName: this.editSaveName,
      });
      if (success) {
        $(this.$refs['close-edit-modal']).click();
        this.removeClickedRow();
        this.editSaveName = null;
        toastr.success(message);
      } else {
        this.editSaveNameInvalid = true;
        toastr.error(message);
      }
    },
    async submitDeleteForm() {
      let [success, message] = await this.deleteQuiz(this.clickedRow);
      if (success) {
        $(this.$refs['close-delete-modal']).click();
        this.removeClickedRow();
        toastr.success(message);
      } else {
        toastr.error(message);
      }
    },
  },
  computed: {
    ...mapState(['quizzes']),
    questions() {
      return this.quizzes[this.quiz].questions;
    },
    orderedQuestions() {
      return _.orderBy(this.questions, ['order'], ['asc']);
    },
    noQuestions() {
      return _.isEmpty(this.questions);
    },
  },
  mounted() {
    document.title = 'Manage questions';
  },
  components: {
    Navbar,
    QuestionTableRow,
  },
};
</script>
