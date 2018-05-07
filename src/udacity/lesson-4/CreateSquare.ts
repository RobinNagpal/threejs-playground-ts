////////////////////////////////////////////////////////////////////////////////
// Draw a Square Exercise                                                     //
// Your task is to complete the function square (at line 28).                 //
// The function takes 4 arguments - coordinates x1, y1, x2, y2                //
// for the square and returns a geometry object (THREE.Geometry())            //
// that defines a square at the provided coordinates.                         //
////////////////////////////////////////////////////////////////////////////////
/*global THREE Coordinates $ document window*/
import * as THREE from 'three'
import {Coordinates} from "../../lib/coordinates";

export class CreateSquare {
    camera: THREE.Camera;
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;

    windowScale: any;

    exampleTriangle() {
        // This code demonstrates how to draw a triangle
        const triangle = new THREE.Geometry();
        triangle.vertices.push(new THREE.Vector3(1, 1, 0));
        triangle.vertices.push(new THREE.Vector3(3, 1, 0));
        triangle.vertices.push(new THREE.Vector3(3, 3, 0));

        triangle.faces.push(new THREE.Face3(0, 1, 2));

        return triangle;
    }

    drawSquare(x1, y1, x2, y2) {

        const square = new THREE.Geometry();
        // Your code goes here

        // don't forget to return the geometry!	The following line is required!
        return square;
    }

    init() {
        //  Set up some parameters
        const canvasWidth = 846;
        const canvasHeight = 494;
        const canvasRatio = canvasWidth / canvasHeight;
        // scene
        this.scene = new THREE.Scene();

        // Camera: Y up, X right, Z up
        this.windowScale = 12;
        const windowWidth = this.windowScale * canvasRatio;
        const windowHeight = this.windowScale;

        this.camera = new THREE.OrthographicCamera(windowWidth / -2, windowWidth / 2, windowHeight / 2, windowHeight / -2, 0, 40);

        const focus = new THREE.Vector3(5, 5, 0);
        this.camera.position.x = focus.x;
        this.camera.position.y = focus.y;
        this.camera.position.z = 20;
        this.camera.lookAt(focus);

        this.renderer = new THREE.WebGLRenderer({antialias: true, preserveDrawingBuffer: true});
        this.renderer.gammaInput = true;
        this.renderer.gammaOutput = true;
        this.renderer.setSize(canvasWidth, canvasHeight);
        this.renderer.setClearColor(0xffffff, 1.0);
    }

    addToDOM() {
        const container = document.getElementById('container');
        const canvas = container.getElementsByTagName('canvas');
        if (canvas.length > 0) {
            container.removeChild(canvas[0]);
        }
        container.appendChild(this.renderer.domElement);
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    showGrids() {
        // Background grid and axes. Grid step size is 1, axes cross at 0, 0
        Coordinates.drawGrid(this.scene, {size: 100, scale: 1, orientation: "z"});
        Coordinates.drawAxes(this.scene, {axisLength: 11, axisOrientation: "x", axisRadius: 0.04});
        Coordinates.drawAxes(this.scene, {axisLength: 11, axisOrientation: "y", axisRadius: 0.04});
    }

    doIt() {
        this.init();
        this.showGrids();
        // creating and adding the triangle to the scene
        const triangleMaterial = new THREE.MeshBasicMaterial({color: 0x2685AA, side: THREE.DoubleSide});
        const triangleGeometry = this.exampleTriangle();
        const triangleMesh = new THREE.Mesh(triangleGeometry, triangleMaterial);
        this.scene.add(triangleMesh);
        // creating and adding your square to the scene !

        const square_material = new THREE.MeshBasicMaterial({color: 0xF6831E, side: THREE.DoubleSide});
        const square_geometry = this.drawSquare(3, 5, 7, 9);
        const square_mesh = new THREE.Mesh(square_geometry, square_material);
        this.scene.add(square_mesh);
        this.addToDOM();
        this.render();

    }


}

