<template>
  <div style="overflow: hidden; height: 100vh; width: 100vw">
    <transition name="fade" appear>
      <select-quiz
        :quiz="quiz"
        @playQuiz="startQuiz"
        v-if="showQuizSelection"
      />
    </transition>

    <quiz :quiz="selectedQuiz" v-if="showQuiz" @quizFinished="finishQuiz" />
  </div>
  <teleport to="body">
    <div id="play-background"></div>
  </teleport>
</template>

<script>
import _ from 'lodash';
import { mapState } from 'vuex';
import createHmac from 'create-hmac';

import SelectQuiz from '@/components/SelectQuiz.vue';
import Quiz from '@/components/Quiz.vue';

export default {
  name: 'Play',
  props: {
    quiz: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      showQuizSelection: true,
      showQuiz: false,
      score: 0,
      selectedQuiz: null,
      answers: null,
    };
  },
  methods: {
    startQuiz(payload) {
      this.showQuizSelection = false;
      this.selectedQuiz = this.quizzes[payload.selectedQuizName];
      this.$router.replace({
        name: 'PlayQuizzes',
        query: {
          quiz: this.selectedQuiz.name,
        },
      });
      this.showQuiz = true;
    },
    finishQuiz(payload) {
      this.showQuiz = false;
      this.score = payload.score;
      this.answers = payload.answers;
      this.showResults();
    },
    getQuestionText(questionNum) {
      let question = _.find(this.selectedQuiz.questions, {
        order: questionNum - 1,
      });
      if (_.has(question, 'text')) {
        return question.text;
      } else {
        return null;
      }
    },
    showResults() {
      const hmac = createHmac(
        'sha224',
        Buffer.from(process.env.VUE_APP_SECRET_KEY)
      );
      let answers = _.map(this.answers, (value) => {
        value.qt = this.getQuestionText(value.questionNum);
        delete value.questionNum;
        value.c = value.correct;
        delete value.correct;
        value.a = value.answer;
        delete value.answer;
        value.ca = value.correctAnswer;
        delete value.correctAnswer;
        return value;
      });
      let resultsJson = JSON.stringify({
        answers,
        quizTitle: this.selectedQuiz.name,
      });
      hmac.update(resultsJson);
      let digest = hmac.digest('base64');
      let urlDigest = encodeURIComponent(digest);
      this.$router.push({
        name: 'DisplayResults',
        query: {
          digest: urlDigest,
          quizTitle: this.selectedQuiz.name,
          answers: JSON.stringify(answers),
        },
      });
    },
  },
  computed: {
    ...mapState(['quizzes']),
    maxScore() {
      if (this.selectedQuiz) {
        return _.size(this.selectedQuiz.questions);
      } else {
        return null;
      }
    },
  },
  mounted() {
    document.title = 'Select quiz';
  },
  components: {
    SelectQuiz,
    Quiz,
  },
};
</script>

<style>
#play-background {
  height: 100vh;
  width: 100vw;
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  background: rgb(121, 82, 179);
  background: linear-gradient(
    135deg,
    rgba(121, 82, 179, 1) 0%,
    rgba(71, 23, 143, 1) 65%,
    rgba(37, 7, 107, 1) 100%
  );
}
</style>
