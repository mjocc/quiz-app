export default {
  async createQuiz({ commit, state }, name) {
    if (!(name in state)) {
      await commit('createQuiz', name);
      return [true, 'Quiz created successfully'];
    } else {
      return [false, 'Name already exists'];
    }
  },
  async updateQuiz({ commit, state }, names) {
    if (!(names.newName in state)) {
      await commit('updateQuiz', names);
      return [true, 'Quiz name update successful'];
    } else if (names.oldName === names.newName) {
      return [true, 'Quiz name update successful'];
    } else {
      return [false, 'New name already exists'];
    }
  },
  async deleteQuiz({ commit }, name) {
    await commit('deleteQuiz', name);
    return [true, 'Quiz deleted successfully'];
  },
};
