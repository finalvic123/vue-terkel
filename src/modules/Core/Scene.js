/**
 * Scene class
 */
class Scene extends THREE.Scene {
  /**
   * Constructor function
   * @param {Renderer} Renderer Renderer instance
   * @param {Camera}   Camera   Camera instance
   */
  constructor (Renderer, Camera) {
    super();

    this.renderer = Renderer;
    this.camera = Camera;

    this.createScene();
  }

  /**
   * CreateScene function
   */
  createScene () {
    // this.cube = new BasicCube();
    var geometry = new THREE.BoxGeometry(20, 20, 20);
    var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    this.cube = new THREE.Mesh(geometry, material);
    this.add(this.cube);

    this.render();
  }

  /**
   * Render function
   */
  render () {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.02;

    // this.cube.update(this.clock.time);
  };
}

export default Scene;