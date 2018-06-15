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
    for (var i = 0; i < 10; i++) {
        let height = 1 + Math.random() * 5;
        let cube = new THREE.Mesh(new THREE.BoxGeometry(1, height, 2), material);
        cube.position.set( (Math.random() - 0.5)*30, height / 2, (Math.random() - 0.5)*30);
        scene.add(cube);
    }
    let geometry = new THREE.SphereGeometry( 0.3, 32, 32 );
    material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
    let sphere = new THREE.Mesh( geometry, material );
    sphere.position.set(0,10,0);
    scene.add( sphere );
    
    var plane = new THREE.Plane( new THREE.Vector3( 0, 1, 0 ), 0 );
    var helper = new THREE.PlaneHelper( plane, 30, 0x000000 );
    scene.add( helper );

    var axesHelper = new THREE.AxesHelper( 40 );
    scene.add( axesHelper );

    // 渲染
    renderer.render(scene, camera);
}

init();