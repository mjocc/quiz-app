export default {
  createQuiz(state, name) {
    state.quizzes[name] = {
      name: name,
      created: new Date(),
      questions: {},
    };
  },
  updateQuiz(state, names) {
    let quiz = state.quizzes[names.oldName];
    quiz.name = names.newName;
    state.quizzes[names.newName] = quiz;
    delete state.quizzes[names.oldName];
  },
  deleteQuiz(state, name) {
    delete state.quizzes[name];
  },
};
