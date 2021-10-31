<template>
  <div :class="{ container: !removePadding, 'mt-4': !removePadding }">
    <router-view />
  </div>
</template>

<script>
import _ from 'lodash';
import toastr from 'toastr';

toastr.options = {
  positionClass: 'toast-bottom-right',
};

export default {
  name: 'QuizApp',
  computed: {
    removePadding() {
      return _.includes(['PlayQuizzes', 'DisplayResults'], this.$route.name);
    },
  },
};
</script>
