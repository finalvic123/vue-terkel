import THREE from 'three';
var glslify = require('glslify');

/**
 * CubeMaterial class
 */
class CubeMaterial extends THREE.ShaderMaterial {
  /**
   * Constructor function
   * @param {Object} options Options
   */
  constructor (options) {
    super(options);

    this.vertexShader = glslify('./shader/vert.glsl');
    this.fragmentShader = glslify('./shader/frag.glsl');
    this.extensions.derivatives = true;

    /*
    this.uniforms = {
      time: { type: 'f', value: 0.0 },
      color: { type: 'c', value: new THREE.Color(0xffffff) }
    };
    */
  }

  /**
   * Update function
   * @param {number} time Time
   */
  update (time) {
    // this.uniforms.time.value = time * 0.3;
  }
};

export default CubeMaterial;
