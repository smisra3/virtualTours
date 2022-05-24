let scene, camera, renderer;

function initateView() {
  scene = new THREE.Scene;

  camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 45, 30000); //we need a camera. (fov, aspect, near, far)
  camera.position.set(-1900, -1200, -1900);

  renderer = new THREE.WebGLRenderer({ antialias: true, });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement); //If you don't pass a canvas into three.js it will create one for you but then you have to add it to your document.

  let controls = new THREE.OrbitControls(camera);
  controls.addEventListener('change', renderer);
  controls.minDistance = 500;
  controls.maxDistance = 1500;

  let assetArray = [];
  let t_one = new THREE.TextureLoader().load('n_one.jpeg');
  let t_two = new THREE.TextureLoader().load('n_two.jpeg');
  let t_three = new THREE.TextureLoader().load('n_three.jpeg');
  let t_four = new THREE.TextureLoader().load('n_four.jpeg');
  let t_five = new THREE.TextureLoader().load('n_five.jpeg');
  let t_six = new THREE.TextureLoader().load('n_six.jpeg');

  assetArray.push(new THREE.MeshBasicMaterial({ map: t_five, }));
  assetArray.push(new THREE.MeshBasicMaterial({ map: t_three, }));
  assetArray.push(new THREE.MeshBasicMaterial({ map: t_two, }));
  assetArray.push(new THREE.MeshBasicMaterial({ map: t_one, }));
  assetArray.push(new THREE.MeshBasicMaterial({ map: t_four, }));
  assetArray.push(new THREE.MeshBasicMaterial({ map: t_six, }));

  for (let i = 0; i < 6; i += 1) {
    assetArray[i].side = THREE.BackSide;
  }

  let boxGeometry = new THREE.BoxGeometry(8000, 8000, 8000);
  let box = new THREE.Mesh(boxGeometry, assetArray);
  scene.add(box);

  animate();
}

function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

initateView();