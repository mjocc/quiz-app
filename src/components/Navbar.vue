<template>
  <div>
    <div :style="{ height: `${navbarHeight}px` }"></div>
    <nav
      id="navbar"
      class="navbar navbar-expand-xl navbar-dark px-2"
      ref="navbar"
    >
      <div class="container-fluid" ref="navbar-content">
        <transition name="fade">
          <router-link
            class="navbar-brand"
            :to="{ name: 'ManageQuizzes' }"
            v-show="!expanded"
          >
            <img
              src="@/assets/question.svg"
              width="30"
              height="30"
              class="d-inline-block align-top ms-1"
              alt="Plane logo"
            />
            Quiz App
          </router-link>
        </transition>
        <transition name="fade">
          <span v-if="title" v-show="!expanded" class="navbar-text">{{
            title
          }}</span>
        </transition>
      </div>
    </nav>
  </div>
</template>

<style scoped>
#navbar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
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
export default {
  name: 'Navbar',
  data() {
    return {
      navbarHeight: 56,
    };
  },
  props: {
    expanded: Boolean,
    title: String,
  },
  emits: ['transitionFinished'],
  watch: {
    expanded() {
      this.triggerAnimation();
    },
  },
  methods: {
    triggerAnimation() {
      this.$refs.navbar.style['z-index'] = '5';
      this.$refs['navbar-content'].style['z-index'] = '10';
      let windowHeight = window.innerHeight;
      for (let i = this.navbarHeight; i <= windowHeight; i += 0.25) {
        setTimeout(() => {
          this.$refs.navbar.style.height = `${i}px`;
          if (i === windowHeight) {
            this.$emit('transitionFinished');
          }
        }, i * 1.25);
      }
    },
  },
};
</script>
