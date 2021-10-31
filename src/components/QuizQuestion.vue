<template>
  <div
    class="question-container"
    :data-question-num="questionNum"
    v-show="showQuestion"
  >
    <h1 id="question-text" class="montserrat bold text-center">
      {{ question.text }}
    </h1>
    <div id="option-grid" class="d-flex justify-content-between">
      <div
        class="option card"
        v-for="option in orderedOptions"
        :key="option.order"
        @click="selectOption"
        :data-question-num="questionNum"
        :data-option-text="option.option"
      >
        <div
          class="
            montserrat
            bold
            option-text
            card-body
            text-black
            d-flex
            justify-content-center
            align-items-center
            cursor-pointer
          "
        >
          {{ option.option }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import _ from 'lodash';

export default {
  name: 'QuizQuestion',
  emits: ['update:answer'],
  props: {
    question: {
      type: Object,
      required: true,
    },
    questionNum: {
      type: Number,
      required: true,
    },
    totalQuestions: {
      type: Number,
      required: true,
    },
    quizTitle: {
      type: String,
      required: true,
    },
    showQuestion: {
      type: Boolean,
      default: true,
    },
    showAnswers: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      selectedOption: null,
    };
  },
  computed: {
    orderedOptions() {
      return _.orderBy(this.question.options, ['order'], ['asc']);
    },
    correctAnswer() {
      return _.find(this.question.options, { correct: true }).option;
    },
    correct() {
      return this.selectedOption == this.correctAnswer;
    },
  },
  methods: {
    selectOption(event) {
      let optionElem = $(event.target).parent();
      this.selectedOption = optionElem.data('optionText');
      $(`.option[data-question-num=${this.questionNum}]`).removeClass(
        'selected'
      );
      optionElem.addClass('selected');
    },
  },
  watch: {
    selectedOption() {
      this.$emit('update:answer', {
        questionNum: this.questionNum,
        correct: this.correct,
        answer: this.selectedOption,
        correctAnswer: this.correctAnswer,
      });
    },
  },
};
</script>

<style scoped>
#question-text {
  font-size: 100px;
  margin-bottom: 6rem;
}

.option {
  width: 25vw;
  height: 35vh;
}

.option:hover {
  background: #ececec;
}

.option.selected {
  color: #fff;
  background: #0d6efd;
  border-color: #0d6efd;
}

.option.selected .option-text {
  color: #ffffff !important;
}

.option-text {
  font-size: 50px;
}
</style>
