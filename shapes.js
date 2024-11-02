import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

function createScene(containerId, shapetype)
{
    const container = document.getElementById(containerId);

    console.log(container.clientHeight);

    const width = 400;
    const height = 400;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xE4E0E1);
    
    const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 1000)
    camera.position.setZ(30);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height, true);

    container.appendChild(renderer.domElement);

    function createShape(shapetype)
    {
        let geometry;
        const material = new THREE.MeshStandardMaterial( {color: 0xD6C0B3, wireframe: true});

        switch (shapetype)
        {
            case 'cube':
                geometry = new THREE.BoxGeometry(12, 12, 12, 8, 8, 8);
                break;
            case 'sphere':
                geometry = new THREE.SphereGeometry(12, 14, 18);
                break;
            case 'torus':
                geometry = new THREE.TorusGeometry(10, 3, 14, 50);
                break;
            default:
                geometry = new THREE.BoxGeometry(5, 5, 5);
                break;
        }
        return new THREE.Mesh(geometry, material);
    }
    const shape = createShape(shapetype);

function lightSource()
{
    // light = new THREE.PointLight(0xffffff, 100, 100, 2);
    // light.position.set(10, 10, 10)
    // const lightHelper = new THREE.PointLightHelper(light);
    const ambient = new THREE.AmbientLight(0xffffff);

    return ambient;
}

    const light = lightSource();

    scene.add(shape, light);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotateSpeed = 1.0;
    controls.enableZoom = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.035;
    controls.enablePan = false;
    controls.update();

    function animate()
    {
        requestAnimationFrame( animate );
        
        shape.rotation.x += 0.005;
        shape.rotation.y += 0.005;
        shape.rotation.z += 0.005;

        controls.update();
        
        renderer.render( scene, camera );
    }

    animate()
}

createScene('shape1', 'sphere');
createScene('shape2', 'cube');
createScene('shape3', 'torus');