<template>
  <navbar
    :expanded="expandedNavbar"
    @transitionFinished="playQuiz"
    title="Manage quizzes"
  />
  <table :class="{ table: true, 'table-hover': !noQuizzes }">
    <thead>
      <tr>
        <th style="width: 65%" scope="col">Save name</th>
        <th style="width: 25%" scope="col">Created</th>
        <th style="width: 10%" scope="col">Number of questions</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="noQuizzes">
        <tr>
          <td colspan="3" class="text-muted fw-light text-center fst-italic">
            No quizzes exist
          </td>
        </tr>
      </template>
      <template v-else>
        <quiz-table-row
          v-for="quiz in orderedQuizzes"
          :key="quiz.name"
          :name="quiz.name"
          :created="quiz.created"
          :questions="quiz.questions"
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
    Create quiz
  </button>
  <button
    class="btn btn-danger float-end ms-1 mb-2"
    id="delete-button"
    data-bs-toggle="modal"
    data-bs-target="#delete-modal"
    :disabled="disableQuizButtons"
  >
    Delete quiz
  </button>
  <button
    class="btn btn-dark float-end ms-1 mb-2"
    id="edit-button"
    data-bs-toggle="modal"
    data-bs-target="#edit-modal"
    :disabled="disableQuizButtons"
  >
    Edit quiz name
  </button>
  <button
    class="btn btn-dark float-end ms-1 mb-2"
    id="select-button"
    :disabled="disableQuizButtons"
    @click="handleSelectButtonClick"
  >
    Edit quiz questions
  </button>
  <button
    class="btn btn-dark float-end mb-2"
    id="play-button"
    :disabled="disableQuizButtons"
    @click="expandedNavbar = true"
  >
    Play quiz
  </button>

  <teleport to="body">
    <div class="modal" tabindex="-1" id="create-modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Create quiz</h5>
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

    <div class="modal" tabindex="-1" id="edit-modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit quizz</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              ref="close-edit-modal"
            ></button>
          </div>
          <form @submit.prevent="submitEditForm">
            <div class="modal-body">
              <div class="input-group">
                <span class="input-group-text">Save name</span>
                <input
                  type="text"
                  maxlength="100"
                  class="form-control"
                  id="edit-save-name"
                  v-model="editSaveName"
                  :class="{ 'is-invalid': editSaveNameInvalid }"
                  required
                  @input="editSaveNameInvalid = false"
                />
              </div>
            </div>
            <div class="modal-footer">
              <input type="submit" class="btn btn-dark" value="Update" />
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
            <h5 class="modal-title">Delete quiz</h5>
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
              This will irreversibly delete the selected quiz. Are you sure?
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

<style scoped>
#play-button {
  background: rgb(121, 82, 179);
  background: linear-gradient(
    135deg,
    rgba(121, 82, 179, 1) 0%,
    rgba(71, 23, 143, 1) 65%,
    rgba(37, 7, 107, 1) 100%
  );
}
</style>

<script>
import _ from 'lodash';
import $ from 'jquery';
import toastr from 'toastr';
import { mapState, mapActions } from 'vuex';

import Navbar from '@/components/Navbar.vue';
import QuizTableRow from '@/components/QuizTableRow.vue';

export default {
  name: 'Quizzes',
  data() {
    return {
      clickedRow: null,
      createSaveName: null,
      createSaveNameInvalid: false,
      editSaveName: null,
      editSaveNameInvalid: false,
      expandedNavbar: false,
    };
  },
  methods: {
    ...mapActions(['createQuiz', 'updateQuiz', 'deleteQuiz']),
    updateClickedRow(name) {
      this.clickedRow = name;
      this.editSaveName = name;
    },
    removeClickedRow() {
      this.clickedRow = null;
      this.editSaveName = null;
    },
    updateSelectedRow() {
      this.$router.push({
        name: 'ManageQuestions',
        query: { quiz: this.clickedRow },
      });
    },
    handleSelectButtonClick() {
      this.updateSelectedRow(this.clickedRow);
    },
    playQuiz() {
      this.$router.push({
        name: 'PlayQuizzes',
        query: { quiz: this.clickedRow },
      });
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
    orderedQuizzes() {
      return _.orderBy(this.quizzes, ['created', 'name'], ['desc', 'asc']);
    },
    noQuizzes() {
      return _.isEmpty(this.quizzes);
    },
    disableQuizButtons() {
      return this.clickedRow === null;
    },
  },
  mounted() {
    document.title = 'Manage quizzes';
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Delete' && this.clickedRow !== null) {
        document.getElementById('delete-button').click();
      }
    });
  },
  components: {
    Navbar,
    QuizTableRow,
  },
};
</script>
