function init() {
    // 渲染
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(innerWidth, innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.setClearColor(0xffffff);

    // 场景
    let scene = new THREE.Scene();
    
    // 相机
    let camera = new THREE.PerspectiveCamera( 45, innerWidth / innerHeight, 1, 1000 );
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
    let cube = new THREE.Mesh(new THREE.CubeGeometry(1, 2, 3, 2, 2, 3), material);
    scene.add(cube);
    for (var i = 0; i < 10; i++) {
        let cube0 = cube.clone();
        cube0.position.set( (Math.random() - 0.5)*20, 0, (Math.random() - 0.5)*20);
        scene.add(cube0);
    }
    let geometry = new THREE.SphereGeometry( 0.3, 32, 32 );
    material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
    let sphere = new THREE.Mesh( geometry, material );
    sphere.position.set(10,10,0);
    //sphere.position = new THREE.Vector3(0,10,0);
    scene.add( sphere );
    
    var axesHelper = new THREE.AxesHelper( 10 );
    scene.add( axesHelper );

    // 渲染
    renderer.render(scene, camera);
}

init();