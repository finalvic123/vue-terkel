<template>
  <main v:el="wrapper" v-bind:class="theme" class="notransition">

    <div id="preloader" v-if="loading" transition="fade" transition-mode="out">
      <div class="loader loader--blue">
        <div class="dot dot1"></div>
        <div class="dot dot2"></div>
        <div class="dot dot3"></div>
        <div class="dot dot4"></div>
      </div>
    </div>

    <border></border>
    <world></world>
    <secondary></secondary>
    <primary></primary>
  </main>
</template>

<script>
import store from 'vuex/store';

// Actions
import {
  windowResize,
  windowVisible,
  deviceDetect,
  secondaryOpen,
  secondaryClose
} from 'vuex/actions';

// Getters
import {
  getDevice,
  getRoute,
  getTheme,
  getSecondary
} from 'vuex/getters';

// Utils
import debounce from 'lodash.debounce';
import delay from 'lodash.delay';

// Components
import Border from './Border';
import World from './World';
import Secondary from './secondary/Main';
import Primary from './Primary';

// Styles
import 'stylesheets/main.scss';

export default {
  vuex: {
    actions: {
      resizeState: windowResize,
      visibleState: windowVisible,
      deviceState: deviceDetect,
      secondaryClose: secondaryClose,
      secondaryOpen: secondaryOpen
    },
    getters: {
      getDevice: getDevice,
      route: getRoute,
      theme: getTheme,
      secondary: getSecondary
    }
  },

  data: () => {
    return {
      loading: true
    };
  },

  watch: {
    'route.path': 'routeChange'
  },

  created () {
    this.bind();
  },

  ready () {
    this.init();
    this.consoleFun();
  },

  beforeDestroy () {
    this.removeEventListeners();
  },

  methods: {
    /**
     * bind
     * Bind functions bore init
     * @return {void}
     */
    bind () {
      this.resizeEnd = debounce(this.resizeEnd, 250);
      this.dispatchWindowSize = debounce(this.dispatchWindowSize, 50);
    },

    /**
     * init
     * bind, add event listeners and
     * set preloader
     * @return {void}
     */
    init () {
      // Set initial state
      this.resizeState();
      this.visibleState();
      this.deviceState();

      // Set Event listeners
      this.addEventListeners();

      // Add classes
      this.addDeviceClass();
      this.addBrowserClass();

      // Set Preloader
      delay(this.loadComplete, 950);
    },

    addEventListeners () {
      window.addEventListener('resize', this.onResize, false);
      document.addEventListener('visibilitychange', this.dispatchVisibilityChange);
    },

    removeEventListeners () {
      window.removeEventListener('resize', this.onResize, false);
      window.removeEventListener('visibilitychange', this.dispatchVisibilityChange);
    },

    addBrowserClass () {
      this.$el.classList.add(this.getDevice.browser + '-browser');
    },

    addDeviceClass () {
      this.$el.classList.add(this.getDevice.type + '-device');
    },

    dispatchWindowSize (event) {
      this.$broadcast('window-resize', event);
      this.resizeState();
    },

    dispatchVisibilityChange (event) {
      this.$broadcast('window-visibility', event);
      this.visibleState();
    },

    /**
     * routeChange
     * Called whenever the route changes
     * end emit an event
     * return {void}
     */
    routeChange () {
      this.$broadcast('route-change', this.$route);
      if (this.$route.secondary) {
        this.secondaryOpen();
      } else {
        this.secondaryClose();
      }
    },

    /**
     * onResize
     * Called on window resize. Dispatch event
     * @return {void}
     */
    onResize (event) {
      this.$el.classList.add('notransition');
      this.dispatchWindowSize();
      this.resizeEnd(event); // debounced function - 250
    },

    /**
     * resizeEnd
     * Called on resize end. Add transitions back.
     * Get debounced on create.
     * @return {void}
     */
    resizeEnd () {
      this.$el.classList.remove('notransition');
    },

    /**
     * laodComplete
     * Hide loader
     * Remove notranstion class
     * @return {void}
     */
    loadComplete () {
      this.loading = false;
      this.$el.classList.remove('notransition');
    },

    /**
     * Just for lolz
     * @return {void}
     */
    consoleFun () {
      const styleHeader = [
        'color: #3545E5;',
        'font-family: sans-serif;',
        'font-weight: bold;',
        'font-size: 1.8em;'
      ].join(' ');

      const styleText = [
        'color: #3545E5;',
        'font-family: sans-serif;',
        'font-weight: bold;',
        'font-size: 1.1em;'
      ].join(' ');

      console.log('%cHey there!', styleHeader);
      console.log('%c(?????????????????????)???', styleText);
      console.log('%cI\'m looking for internship. Feel free to contact me: hello@terkel.com', styleText);
    }
  },

  components: {
    Border,
    Secondary,
    World,
    Primary
  },

  store // make this and all child components aware of the new store
};
</script>
