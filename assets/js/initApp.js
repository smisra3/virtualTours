
let scene, camera, renderer;
var raycaster, mouse = { x: 0, y: 0 };

window.init = function initateView() {

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  function onPointerMove(event) {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
  }
  window.addEventListener('pointermove', onPointerMove);

  scene = new THREE.Scene;
  camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 45, 30000); //we need a camera. (fov, aspect, near, far)
  camera.position.set(3900, 1200, 900);

  renderer = new THREE.WebGLRenderer({ antialias: true, });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement); //If you don't pass a canvas into three.js it will create one for you but then you have to add it to your document.

  let controls = new THREE.OrbitControls(camera);
  controls.minDistance = 1500;
  controls.maxDistance = 2500;
  controls.keyPanSpeed = 10;

  const geometry = new THREE.SphereBufferGeometry(100, 300, 300);
  const sphere = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.BackSide,
  }))
  // scene.add(sphere);

  let assetArray = [];
  let t_one = new THREE.TextureLoader().load('outdoor_posx.jpg');
  let t_two = new THREE.TextureLoader().load('outdoor_negx.jpg');
  let t_three = new THREE.TextureLoader().load('outdoor_posy.jpg');
  let t_four = new THREE.TextureLoader().load('outdoor_negy.jpg');
  let t_five = new THREE.TextureLoader().load('outdoor_posz.jpg');
  let t_six = new THREE.TextureLoader().load('outdoor_negz.jpg');

  assetArray.push(new THREE.MeshBasicMaterial({ map: t_one, }));
  assetArray.push(new THREE.MeshBasicMaterial({ map: t_two, }));
  assetArray.push(new THREE.MeshBasicMaterial({ map: t_three, }));
  assetArray.push(new THREE.MeshBasicMaterial({ map: t_four, }));
  assetArray.push(new THREE.MeshBasicMaterial({ map: t_five, }));
  assetArray.push(new THREE.MeshBasicMaterial({ map: t_six, }));

  for (let i = 0; i < 6; i += 1) assetArray[i].side = THREE.BackSide;

  let boxGeometry = new THREE.BoxGeometry(8000, 8000, 8000);
  let box = new THREE.Mesh(boxGeometry, assetArray, sphere);
  scene.add(box);

  const group = new THREE.Group();
  // group.add(sphere);
  scene.add(group);

  const intersects = raycaster.intersectObjects(scene.children);
  for (let i = 0; i < intersects.length; i++) {
    const materialList = intersects[i].object.material;
    for (let j = 0; j < 1; j++) {
      const currentEdge = intersects[i].object.material[j];
      console.log(intersects[i])
      // currentEdge.color.set(0xff0000);
    }
  }

  function animate() {
    raycaster.setFromCamera(pointer, camera);
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  let z;
  let zFinal = 14;

  function raycast(e) {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children);
    for (var i = 0; i < intersects.length; i++) {
      console.log(intersects[i]);
      const { face, point } = intersects[i];
      const materialIndex = face.materialIndex;
      if (materialIndex === 1) {
        gsap.to(camera.position, {
          z: point.z,
          y: point.y,
          x: point.x,
          duration: 1,
          onComplete: () => loadBedroom(),
        })
      }
    }
  }
  animate();
  renderer.domElement.addEventListener('click', raycast, false);
  window.addEventListener('keydown', (e) => {});
};

function initateView2() {
  let scene, camera, renderer;
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  scene = new THREE.Scene;

  camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 45, 30000); //we need a camera. (fov, aspect, near, far)
  camera.position.set(-100, 0, 0);

  renderer = new THREE.WebGLRenderer({ antialias: true, });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement); //If you don't pass a canvas into three.js it will create one for you but then you have to add it to your document.

  let controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.addEventListener('change', renderer);
  controls.minDistance = 1500;
  controls.maxDistance = 2500;
  controls.keyPanSpeed = 10;

  let assetArray = [];

  let t_one = new THREE.TextureLoader().load('posx.jpg'); // front
  let t_two = new THREE.TextureLoader().load('negx.jpg'); // back
  let t_three = new THREE.TextureLoader().load('posy.jpg'); // top
  let t_four = new THREE.TextureLoader().load('negy.jpg'); // bottom
  let t_five = new THREE.TextureLoader().load('posz.jpg'); // left
  let t_six = new THREE.TextureLoader().load('negz.jpg'); // right

  assetArray.push(new THREE.MeshBasicMaterial({ map: t_one, }));
  assetArray.push(new THREE.MeshBasicMaterial({ map: t_two, }));
  assetArray.push(new THREE.MeshBasicMaterial({ map: t_three, }));
  assetArray.push(new THREE.MeshBasicMaterial({ map: t_four, }));
  assetArray.push(new THREE.MeshBasicMaterial({ map: t_five, }));
  assetArray.push(new THREE.MeshBasicMaterial({ map: t_six, }));

  for (let i = 0; i < 6; i += 1) assetArray[i].side = THREE.BackSide;

  let boxGeometry = new THREE.BoxGeometry(5500, 5500, 5500);
  let box = new THREE.Mesh(boxGeometry, assetArray);
  scene.add(box);

  function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  const raycast = (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children);
    for (var i = 0; i < intersects.length; i++) {
      console.log(intersects[i]);
      const materialIndex = intersects[i].face.materialIndex;
      if (materialIndex === 0) {
        gsap.to(camera.position, {
          z: intersects[i].point.z,
          y: intersects[i].point.y,
          x: intersects[i].point.x,
          duration: 1,
          onComplete: () => loadMusicRoom(),
        })
      } else if (materialIndex === 1) {
        gsap.to(camera.position, {
          z: intersects[i].point.z,
          y: intersects[i].point.y,
          x: intersects[i].point.x,
          duration: 1,
          onComplete: () => loadEntrance(),
        })
      }
    }
  };
  renderer.domElement.addEventListener('click', raycast, false);
  animate();
}

const loadMusicRoom = () => {
  const raycaster = new THREE.Raycaster();
  document.body.removeChild(document.getElementsByTagName('canvas')[0]);
  let scene, camera, renderer;

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 45, 30000); //we need a camera. (fov, aspect, near, far)
  camera.position.set(3900, 1200, 900);

  renderer = new THREE.WebGLRenderer({ antialias: true, });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement); //If you don't pass a canvas into three.js it will create one for you but then you have to add it to your document.

  let controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.addEventListener('change', renderer);
  controls.minDistance = 900;
  controls.maxDistance = 3900;

  const material = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    uniforms: {
      time: { value: 0, },
      resolution: { value: new THREE.Vector4(),}
    }
  });
  const geometry = new THREE.SphereBufferGeometry(10000, 300, 300);
  const sphere = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('https://images.prismic.io/2021-lp5/2723cbfa-1f46-4610-b34d-54f45445fa41_boule-bleue.jpg'),
    side: THREE.BackSide,
  }))
  scene.add(sphere);
  function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  const raycast = (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children);
    for (var i = 0; i < intersects.length; i++) {
      console.log(intersects[i]);
      const materialIndex = intersects[i].face.materialIndex;
      if (materialIndex === 0) {
        gsap.to(camera.position, {
          z: intersects[i].point.z,
          y: intersects[i].point.y,
          x: intersects[i].point.x,
          duration: 1,
          onComplete: () => loadBedroom(),
        })
      }
    }
  };
  renderer.domElement.addEventListener('click', raycast, false);
  animate();
};

const loadBedroom = () => {
  document.body.removeChild(document.getElementsByTagName('canvas')[0]);
  initateView2();
};

const loadEntrance = () => {
  const canvas = document.getElementsByTagName('canvas')[0];
  if (canvas) document.body.removeChild(canvas);
  window.init();
};

init();