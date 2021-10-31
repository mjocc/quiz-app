<template>
  <router-link
    class="position-absolute bottom-0 end-0 pb-3 pe-3 text-muted fw-light "
    :to="{ name: 'ManageQuizzes' }"
    >Manage quizzes</router-link
  >

  <div
    id="play-container"
    class="container d-flex justify-content-center flex-column"
  >
    <h1
      class="mb-5 text-white text-center montserrat bold"
      style="font-size: 200px"
    >
      Play
    </h1>
    <select
      class="form-select form-select-lg mb-3"
      v-if="!noQuizzes"
      v-model="selectedQuiz"
      :disabled="noQuizzes"
      @change="updateSelectedQuiz"
    >
      <option v-if="!quiz" value="nothing-selected" selected disabled hidden>
        No quiz selected
      </option>
      <option
        v-for="quiz in orderedQuizzes"
        :key="quiz.name"
        :value="quiz.name"
      >
        {{ quiz.name }}
      </option>
    </select>
    <div class="alert alert-danger" role="alert" v-if="noQuizzes">
      No quizzes exist.
      <router-link :to="{ name: 'ManageQuizzes' }">Create one</router-link> to
      continue.
    </div>
    <button
      class="btn btn-lg btn-success mb-5"
      :disabled="disablePlayButton"
      @click="handlePlayButtonClick"
    >
      Start
    </button>
  </div>
</template>

<style scoped>
#play-container {
  height: 100vh;
}
</style>

<script>
import _ from 'lodash';
import { mapState } from 'vuex';

export default {
  name: 'Play',
  props: {
    quiz: {
      type: String,
    },
  },
  emits: ['playQuiz'],
  data() {
    return {
      selectedQuiz: undefined,
    };
  },
  methods: {
    updateSelectedQuiz() {
      this.$router.replace({
        name: 'PlayQuizzes',
        query: { quiz: this.selectedQuiz },
      });
    },
    handlePlayButtonClick() {
      this.$emit('playQuiz', { selectedQuizName: this.selectedQuiz });
    },
  },
  mounted() {
    if (this.quiz !== null) {
      this.selectedQuiz = _.clone(this.quiz);
    } else {
      this.selectedQuiz = 'nothing-selected';
    }
  },
  computed: {
    ...mapState(['quizzes']),
    orderedQuizzes() {
      return _.orderBy(this.quizzes, ['created', 'name'], ['desc', 'asc']);
    },
    noQuizzes() {
      return _.isEmpty(this.quizzes);
    },
    disablePlayButton() {
      return this.selectedQuiz === 'nothing-selected';
    },
  },
};
</script>
