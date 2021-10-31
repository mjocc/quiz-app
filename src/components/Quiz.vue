<template>
  <span id="question-count" class="montserrat bold text-white"
    >Question {{ currentQuestionNum + 1 }} out of {{ totalQuestions }}</span
  >
  <span id="quiz-title" class="montserrat bold text-white">{{
    this.quiz.name
  }}</span>

  <div
    id="play-container"
    class="container d-flex justify-content-center flex-column text-white"
    v-show="showQuestion"
  >
    <quiz-question
      v-for="question in quiz.questions"
      :key="question.order"
      :question="question"
      :questionNum="question.order + 1"
      :totalQuestions="totalQuestions"
      :quizTitle="quiz.name"
      :showQuestion="question.order === currentQuestionNum"
      :showAnswers="showAnswers"
      @update:answer="updateAnswer"
    />

    <div class="d-flex">
      <button
        class="btn btn-lg mt-3 me-2 flex-grow-1"
        :class="{ 'btn-dark': firstQuestion, 'btn-light': !firstQuestion }"
        @click="previousQuestion"
        :disabled="firstQuestion"
      >
        Previous
      </button>
      <span
        class="d-flex d-inline-block mt-3 ms-2 flex-grow-1"
        tabindex="0"
        data-bs-toggle="popover"
        data-bs-trigger="hover focus"
        data-bs-content="Select an option to continue"
        ref="next-popover"
      >
        <button
          class="btn btn-lg btn-light flex-grow-1"
          @click="nextQuestion"
          :disabled="disableNext"
          v-if="!lastQuestion"
        >
          Next
        </button>
        <button
          class="btn btn-lg btn-success flex-grow-1"
          @click="finishQuiz"
          :disabled="disableNext"
          v-else
        >
          Finish
        </button>
      </span>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import { Popover } from 'bootstrap';

import QuizQuestion from '@/components/QuizQuestion.vue';

export default {
  name: 'Quiz',
  emits: ['quizFinished'],
  props: {
    quiz: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showQuestion: true,
      showAnswers: false,
      currentQuestionNum: 0,
      answers: {},
      answersCreated: false,
      nextPopover: null,
    };
  },
  methods: {
    blinkQuestion() {
      this.showQuestion = false;
      setTimeout(() => {
        this.showQuestion = true;
      }, 350);
    },
    previousQuestion() {
      this.blinkQuestion();
      if (this.currentQuestionNum >= 0) {
        this.currentQuestionNum -= 1;
      }
    },
    nextQuestion() {
      this.blinkQuestion();
      if (this.currentQuestionNum < this.totalQuestions - 1) {
        this.currentQuestionNum += 1;
      }
    },
    updateAnswer(payload) {
      this.answers[payload.questionNum] = payload;
    },
    finishQuiz() {
      this.$emit('quizFinished', { score: this.score, answers: this.answers });
    },
  },
  watch: {
    currentQuestionNum() {
      document.title = `Play ${this.quiz.name}: Q${
        this.currentQuestionNum + 1
      }`;
      this.$router.replace({
        name: 'PlayQuizzes',
        query: { quiz: this.quiz.name },
      });
    },
    disableNext() {
      if (this.disableNext) {
        this.nextPopover.enable();
      } else {
        this.nextPopover.disable();
      }
    },
  },
  mounted() {
    document.title = `Play ${this.quiz.name}: Q1`;
    for (const question of Object.values(this.quiz.questions)) {
      this.answers[question.order + 1] = {
        questionNum: question.order + 1,
        correct: false,
        answer: null,
        correctAnswer: null,
      };
    }
    this.answersCreated = true;

    this.nextPopover = new Popover(this.$refs['next-popover'], {
      popperConfig: { placement: 'bottom' },
    });
  },
  computed: {
    totalQuestions() {
      return _.size(this.quiz.questions);
    },
    firstQuestion() {
      return this.currentQuestionNum === 0;
    },
    lastQuestion() {
      return this.currentQuestionNum + 1 === this.totalQuestions;
    },
    score() {
      let results = _.groupBy(this.answers, (question) => {
        return question.correct;
      });
      if (_.has(results, true)) {
        return results.true.length;
      } else {
        return 0;
      }
    },
    disableNext() {
      if (this.answersCreated) {
        return this.answers[this.currentQuestionNum + 1].answer === null;
      } else {
        return true;
      }
    },
  },
  components: {
    QuizQuestion,
  },
};
</script>

<style scoped>
#play-container {
  height: 100vh;
}

#question-count,
#quiz-title {
  position: absolute;
  top: 10px;
  font-size: 1.25rem;
}

#question-count {
  left: 10px;
}

#quiz-title {
  right: 10px;
}
</style>
