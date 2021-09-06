// 用JS来做导演 x y 
let scene,  // 场景
    camera, // 相机
    renderer; // 渲染器

console.log('让我们用Three.js 来开发3D的世界 ')
// 所有的资源准备好后
window.onload = function() { //一切就绪
    scene = new THREE.Scene(); //加角色 
    console.log(scene);
    // 相机拍出来的
    camera = new THREE.PerspectiveCamera(
        90, // 拍摄角度 
        //宽高比 竖着  模着  
        document.body.clientWidth/document.body.clientHeight, 
        0.1,
        1000    
    )
    camera.position.set(0,0,0.1);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(document.body.clientWidth, document.body.clientHeight);

    document.getElementById("container").appendChild(renderer.domElement);
    var Controller = new THREE.OrbitControls(camera,renderer.domElement);
    useFang();

    loop();// 一直拍
}

function useFang() {
    // 房子 
    // 正方体 + 六面都 有贴图
    let materials = []; // 六面数组
    let texture_left = 
        new THREE.TextureLoader().load('./images/scene_left.jpeg');
    materials.push(new THREE.MeshBasicMaterial({map: texture_left}));

    let texture_right = 
        new THREE.TextureLoader().load('./images/scene_right.jpeg');
    materials.push(new THREE.MeshBasicMaterial({map: texture_right}));

    let texture_top = 
        new THREE.TextureLoader().load('./images/scene_top.jpeg');
    materials.push(new THREE.MeshBasicMaterial({map: texture_top}));

    let texture_bottom = 
        new THREE.TextureLoader().load('./images/scene_bottom.jpeg');
    materials.push(new THREE.MeshBasicMaterial({map: texture_bottom}));

    let texture_front = 
        new THREE.TextureLoader().load('./images/scene_front.jpeg');
    materials.push(new THREE.MeshBasicMaterial({map: texture_front}));

    let texture_back = 
        new THREE.TextureLoader().load('./images/scene_back.jpeg');
    materials.push(new THREE.MeshBasicMaterial({map: texture_back}));
    
    // 立方体
    let box = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1),
        materials
    )
    box.geometry.scale(1, 1, -1);
    scene.add(box);
}

function loop() {
    requestAnimationFrame(loop);// 1秒60帧
    renderer.render(scene, camera)
}