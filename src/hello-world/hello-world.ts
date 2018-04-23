import * as THREE from 'three'

export default class HelloWorld {
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private box: THREE.Mesh;

    setupScene(): void {
        // create the scene
        this.scene = new THREE.Scene();

        // create the camera
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        this.renderer = new THREE.WebGLRenderer();

        // set size
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        // add canvas to dom
        document.body.appendChild(this.renderer.domElement);

        // add axis to the scene
        let axis = new THREE.AxesHelper(5);

        this.scene.add(axis);

        // add lights
        let light = new THREE.DirectionalLight(0xffffff, 1.0);

        light.position.set(100, 100, 100);

        this.scene.add(light);

        let material = new THREE.MeshPhysicalMaterial({});

        // create a box and add it to the scene
        this.box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);

        this.scene.add(this.box);

        this.box.position.x = 0.6;
        this.box.rotation.y = 0.6;

    }

    setupCamera(): void {
        this.camera.position.x = 5;
        this.camera.position.y = 5;
        this.camera.position.z = 5;
        this.camera.lookAt(this.scene.position);
    }

    action(): void {
        requestAnimationFrame( () => this.action());
        this.render()
    }

    render(): void {
        let timer = 0.002 * Date.now();
        this.box.position.y = 0.5 + 0.5 * Math.sin(timer);
        this.box.rotation.x += 0.1;
        this.renderer.render(this.scene, this.camera)
    }


    doIt(): void {
        this.setupScene();
        this.setupCamera();
        this.action();

    }
}

