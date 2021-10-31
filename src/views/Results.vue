<template>
  <div style="overflow: hidden; height: 100vh; width: 100vw">
    <div
      id="play-container"
      class="d-flex justify-content-center align-items-center"
    >
      <span
        id="score-subtitle"
        class="montserrat bold text-danger"
        v-if="invalidProps"
        >Invalid query parameters</span
      >
      <div
        class="spinner-border text-light"
        role="status"
        v-else-if="!digestChecked"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
      <span
        id="score-subtitle"
        class="montserrat bold text-danger"
        v-else-if="invalidDigest"
        >Digest validation failed</span
      >
      <div v-else>
        <div
          id="quiz-title-container"
          class="
            position-absolute
            top-0
            start-0
            container-fluid
            d-flex
            justify-content-center
            align-items-center
          "
        >
          <span id="quiz-title" class="montserrat bold text-white">{{
            quizTitle
          }}</span>
        </div>
        <button
          id="share-button"
          class="
            btn btn-light btn-lg
            d-flex
            justify-content-between
            align-items-center
          "
          data-bs-toggle="modal"
          data-bs-target="#share-modal"
        >
          <img src="@/assets/share.svg" width="25" height="25" alt="Share" />
          <span class="ms-2">Share</span>
        </button>
        <button
          id="play-button"
          class="
            btn btn-light btn-lg
            d-flex
            justify-content-between
            align-items-center
          "
          @click="playAgain"
        >
          <img src="@/assets/play.svg" width="25" height="25" alt="Share" />
          <span class="ms-2">Play again</span>
        </button>
        <div class="half half-left">
          <div
            class="d-flex flex-column justify-content-center align-items-center"
          >
            <span id="score-text" class="montserrat bold text-white">
              {{ score }}
            </span>
            <span id="score-subtitle" class="montserrat bold text-white">
              out of {{ maxScore }}
            </span>
            <span id="score-percentage" class="montserrat bold text-white">
              {{ scorePercentage }}%
            </span>
          </div>
        </div>
        <div class="half half-right">
          <ol class="text-white list-group flex-grow-1 mx-5">
            <li
              class="list-group-item"
              :class="{
                'list-group-item-success': answer.correct,
                'list-group-item-danger': !answer.correct,
              }"
              v-for="answer in answers"
              :key="answer.questionNum"
            >
              <img
                v-if="answer.correct"
                src="@/assets/green-tick.svg"
                width="30"
                height="30"
                alt="Correct"
              />
              <img
                v-else
                src="@/assets/red-cross.svg"
                width="30"
                height="30"
                alt="Incorrect"
              />
              <span class="fw-bold">{{ answer.questionText }}</span>
              <br />
              <span>Your answer: {{ answer.answer }}</span>
              <br />
              <span>Correct answer: {{ answer.correctAnswer }}</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
  <teleport to="body">
    <div id="play-background"></div>

    <div class="modal" tabindex="-1" id="share-modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Share your score</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              ref="close-share-modal"
            ></button>
          </div>
          <div class="modal-body">
            <social-media-icons
              :link="url"
              :text="`I got ${score} out of ${maxScore} in ${quizTitle}. Can you do better?`"
            />
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import _ from 'lodash';
import createHmac from 'create-hmac';

import SocialMediaIcons from '@/components/SocialMediaIcons.vue';

export default {
  name: 'Results',
  props: {
    digest: {
      type: String,
      default: null,
    },
    propAnswers: {
      type: String,
      default: null,
    },
    propQuizTitle: {
      type: String,
      default: null,
    },
  },
  components: { SocialMediaIcons },
  data() {
    return {
      answers: [],
      quizTitle: '',
      invalidProps: false,
      digestChecked: false,
      invalidDigest: false,
    };
  },
  computed: {
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
    maxScore() {
      return _.size(this.answers);
    },
    scorePercentage() {
      if (this.maxScore !== 0) {
        return Math.round((this.score / this.maxScore) * 100);
      } else {
        return null;
      }
    },
    url() {
      return process.env.VUE_APP_URL + this.$route.fullPath;
    },
  },
  methods: {
    playAgain() {
      this.$router.push({
        name: 'PlayQuizzes',
        query: {
          quiz: this.quizTitle,
        },
      });
    },
  },
  mounted() {
    document.title = 'Quiz results';
    if (
      this.propQuizTitle !== null &&
      this.digest !== null &&
      this.propAnswers !== null
    ) {
      const hmac = createHmac(
        'sha224',
        Buffer.from(process.env.VUE_APP_SECRET_KEY)
      );
      let resultsJson = JSON.stringify({
        answers: JSON.parse(this.propAnswers),
        quizTitle: this.propQuizTitle,
      });
      hmac.update(resultsJson);
      let digest = encodeURIComponent(hmac.digest('base64'));
      if (digest === this.digest) {
        let answers = JSON.parse(this.propAnswers);
        answers = _.map(answers, (value) => {
          value.questionText = value.qt;
          delete value.qt;
          value.correct = value.c;
          delete value.c;
          value.answer = value.a;
          delete value.a;
          value.correctAnswer = value.ca;
          delete value.ca;
          return value;
        });
        this.answers = answers;
        this.quizTitle = this.propQuizTitle;
      } else {
        this.invalidDigest = true;
      }
      this.digestChecked = true;
    } else {
      this.invalidProps = true;
    }
  },
};
</script>

<style scoped>
#quiz-title-container {
  height: 20vh;
}

#quiz-title {
  font-size: 80px;
}

#share-button {
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 100;
}

#play-button {
  position: absolute;
  bottom: 10px;
  left: 10px;
  z-index: 100;
}

#play-container {
  height: 100vh;
}

#score-text {
  font-size: 300px;
  margin-top: -100px;
  margin-bottom: -100px;
}

#score-subtitle {
  font-size: 60px;
}

#score-percentage {
  font-size: 45px;
}

.half {
  height: 100vh;
  width: 50vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.half-left {
  position: absolute;
  top: 0;
  left: 0;
}

.half-right {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
