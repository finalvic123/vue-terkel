'use strict';

import Vue from 'vue';
import Webgl from '../../modules/Webgl';

// Import test objects
import Quick from '../../modules/Object3D';
import Cube from '../../modules/ObjectCube';

// import './styles.scss';
// import components

export default Vue.extend({
  template: require('./template.html'),

  ready () {
    let webgl = new Webgl({
      debug: true
    });

    let quick = new Quick();
    let cube = new Cube();

    webgl.addObject(quick);
    webgl.addObject(cube);

    webgl.init();
  }

});
