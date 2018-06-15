var renderer;
var camera;
var scene;
var ticks;

function init() {
    ticks = 0;
    // 渲染
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.setClearColor(0xffffff);

    // 场景
    scene = new THREE.Scene();
    
    // 相机
    camera = new THREE.PerspectiveCamera( 45, innerWidth / innerHeight, 1, 1000 );
    camera.position.set(25, 25, 25);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);
    
    // 添加光照
    let light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(10, 15, 5);
    scene.add(light);

    // Lambert材质
    let material = new THREE.MeshLambertMaterial({
        color: 0xff0000,
    });
    
    // 几何体
    for (var i = 0; i < 10; i++) {
        let height = 1 + Math.random() * 5;
        let cube = new THREE.Mesh(new THREE.BoxGeometry(1, height, 2), material);
        cube.position.set( (Math.random() - 0.5)*30, height / 2, (Math.random() - 0.5)*30);
        scene.add(cube);
    }
    // 视点
    let geometry = new THREE.SphereGeometry( 0.3, 32, 32 );
    material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
    let sphere = new THREE.Mesh( geometry, material );
    let eye_height = 6;
    sphere.position.set(0,eye_height,0);
    scene.add( sphere );
    // 轮廓线
    var material_line = new THREE.LineBasicMaterial( { color: 0x0000ff } );
    {
        // 
        let view_range = 15;
        geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3( 0, eye_height, 0) );
        geometry.vertices.push(new THREE.Vector3( -10, eye_height + 5, view_range) );
        geometry.vertices.push(new THREE.Vector3( -10, eye_height - 5, view_range) );
        
        geometry.vertices.push(new THREE.Vector3( 0, eye_height, 0) );
        geometry.vertices.push(new THREE.Vector3( 10, eye_height + 5, view_range) );
        geometry.vertices.push(new THREE.Vector3( 10, eye_height - 5, view_range) );
        geometry.vertices.push(new THREE.Vector3( 0, eye_height, 0) );

        var line = new THREE.Line( geometry, material_line );
        scene.add( line );
        
        geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3( -10, eye_height + 5, view_range) );
        geometry.vertices.push(new THREE.Vector3( -10, eye_height - 5, view_range) );
        geometry.vertices.push(new THREE.Vector3( 10, eye_height - 5, view_range) );
        geometry.vertices.push(new THREE.Vector3( 10, eye_height + 5, view_range) );
        geometry.vertices.push(new THREE.Vector3( -10, eye_height + 5, view_range) );
        line = new THREE.Line( geometry, material_line );
        scene.add( line );
    }

    var plane = new THREE.Plane( new THREE.Vector3( 0, 1, 0 ), 0 );
    var helper = new THREE.PlaneHelper( plane, 30, 0x000000 );
    scene.add( helper );

    var axesHelper = new THREE.AxesHelper( 15 );
    scene.add( axesHelper );
}

function animate() {
    requestAnimationFrame( animate );
    let step = 0.001;
    let range = 35;
    camera.position.set(range * Math.sin(ticks * step), 15, range * Math.cos(ticks * step));
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    ticks += 1;
    renderer.render( scene, camera );
}

onresize = function resize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
}

init();

animate();
