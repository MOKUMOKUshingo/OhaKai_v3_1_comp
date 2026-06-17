
import * as THREE from 'three';

const scene=new THREE.Scene();
scene.background=new THREE.Color(0xf0a26a);
scene.fog=new THREE.FogExp2(0xf0a26a,0.012);
const camera=new THREE.PerspectiveCamera(70,innerWidth/innerHeight,.1,500);
camera.position.set(8,3.0,18);
const renderer=new THREE.WebGLRenderer({antialias:true});
renderer.setSize(innerWidth,innerHeight);renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;document.body.appendChild(renderer.domElement);

const miniRenderer=new THREE.WebGLRenderer({canvas:document.getElementById('miniCanvas'),alpha:true,antialias:true});
miniRenderer.setSize(230,170);miniRenderer.setPixelRatio(1);
const miniCamera=new THREE.OrthographicCamera(-34,34,25,-25,.1,100);miniCamera.position.set(0,60,0);miniCamera.lookAt(0,0,0);

scene.add(new THREE.HemisphereLight(0xffddbb,0x334466,1.7));
const sun=new THREE.DirectionalLight(0xffb15a,3.8);sun.position.set(-42,24,8);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);scene.add(sun);
const fill=new THREE.DirectionalLight(0x7da6ff,.55);fill.position.set(30,12,20);scene.add(fill);

function mat(c,r=.75,m=0){return new THREE.MeshStandardMaterial({color:c,roughness:r,metalness:m});}
const stone=mat(0x8f8172,.95), darkStone=mat(0x4d4945,.95), brick=mat(0x7f5d4c,.95), toriiMat=mat(0xe33a20,.55), roofMat=mat(0x243f3a,.75), wood=mat(0x5a331f,.8), pathMat=mat(0xa58c78,.9), grassMat=mat(0x536b38,.9);
const waterMat=new THREE.MeshStandardMaterial({color:0x244f72,roughness:.18,metalness:.25,transparent:true,opacity:.86});

function box(w,h,d,x,y,z,material,group=scene){const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),material);o.position.set(x,y,z);o.castShadow=o.receiveShadow=true;group.add(o);return o;}
function cyl(r,h,x,y,z,material,group=scene,seg=24){const o=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,seg),material);o.position.set(x,y,z);o.castShadow=o.receiveShadow=true;group.add(o);return o;}

// environment
const ground=new THREE.Mesh(new THREE.PlaneGeometry(220,220),grassMat);ground.rotation.x=-Math.PI/2;ground.position.y=-.03;ground.receiveShadow=true;scene.add(ground);
const water=new THREE.Mesh(new THREE.PlaneGeometry(95,70,130,90),waterMat);water.rotation.x=-Math.PI/2;water.position.set(-14,.03,-12);scene.add(water);
const path=box(15,.18,90,18,.06,-10,pathMat);path.receiveShadow=true;
for(let z=-50;z<36;z+=5){box(.12,.9,.12,11,.45,z,darkStone);box(.12,.9,.12,25,.45,z,darkStone);box(14,.08,.08,18,.9,z,darkStone)}
// stone wall
for(let z=-50;z<36;z+=2.2) box(.35,1.2,2.0,10.5,.55,z,stone);

// sunset sky: sun disk and clouds
const sunDisk=new THREE.Mesh(new THREE.SphereGeometry(3.2,32,16),new THREE.MeshBasicMaterial({color:0xffe27b}));sunDisk.position.set(-58,10,-55);scene.add(sunDisk);
const cloudMat=new THREE.MeshBasicMaterial({color:0xffc08d,transparent:true,opacity:.65});
for(let i=0;i<30;i++){const c=new THREE.Mesh(new THREE.SphereGeometry(1+Math.random()*2,16,8),cloudMat);c.scale.set(2.5+Math.random()*3,.25,.65);c.position.set(-40+Math.random()*90,18+Math.random()*18,-65+Math.random()*28);scene.add(c)}
// mountains
const mMat=mat(0x5c6070,.9);for(let i=0;i<16;i++){const cone=new THREE.Mesh(new THREE.ConeGeometry(8+Math.random()*8,10+Math.random()*8,4),mMat);cone.position.set(-70+i*10,4,-75-Math.random()*12);cone.rotation.y=Math.PI/4;scene.add(cone)}

// Atomic Bomb Dome - more detailed stylized ruin
const domeG=new THREE.Group();domeG.position.set(28,0,-22);domeG.rotation.y=-0.12;scene.add(domeG);
box(14,7,8,0,3.5,0,brick,domeG);box(4.2,12,4.2,-2.2,6,-.7,stone,domeG);
// damaged missing chunks using dark panels/windows
for(const [x,y,w,h] of [[-5,4,1.4,2.4],[-2,3,1.2,2],[1,4.6,1.6,3],[4.5,3.6,1.4,2.2],[-4,6,1.8,1.6],[3,6.2,1.5,1.7]]) box(w,h,.18,x,y,4.1,darkStone,domeG);
for(let x=-5.3;x<=5.3;x+=2.1){box(.45,7.2,.45,x,3.7,4.25,stone,domeG);box(.45,7.2,.45,x,3.7,-4.25,stone,domeG)}
for(let z=-3;z<=3;z+=2){box(.45,8,.45,-7.25,4,z,stone,domeG);box(.45,8,.45,7.25,4,z,stone,domeG)}
// central ribbed dome skeleton
const domeSkeleton=new THREE.Group();domeSkeleton.position.set(-2.2,12.1,-.7);domeG.add(domeSkeleton);
const ring1=new THREE.Mesh(new THREE.TorusGeometry(2.55,.045,8,64),darkStone);ring1.rotation.x=Math.PI/2;domeSkeleton.add(ring1);
const ring2=new THREE.Mesh(new THREE.TorusGeometry(1.65,.04,8,64),darkStone);ring2.rotation.x=Math.PI/2;ring2.position.y=1.0;domeSkeleton.add(ring2);
for(let i=0;i<18;i++){const rib=cyl(.035,3.0,0,0,0,darkStone,domeSkeleton,8);rib.rotation.z=Math.PI/2.55;rib.rotation.y=i*Math.PI/9;rib.position.y=.65;}
cyl(.35,1.0,-2.2,12.7,-.7,darkStone,domeG,16);
// ruin side broken blocks
for(let i=0;i<18;i++) box(.8+Math.random()*1.4,.35+Math.random()*.8,.55+Math.random(),-7+Math.random()*14,.25+Math.random()*1.1,5.2+Math.random()*2,stone,domeG);

// Torii and shrine on water
const torii=new THREE.Group();torii.position.set(-18,0,-14);scene.add(torii);
for(const x of [-5,5]){cyl(.35,9,x,4.5,0,toriiMat,torii,24);cyl(.48,.8,x,.45,0,toriiMat,torii,24)}
box(12.4,.8,1.0,0,8.2,0,toriiMat,torii);box(14.6,.65,1.0,0,9.15,0,toriiMat,torii);box(7.8,.55,.9,0,5.1,0,toriiMat,torii);box(1.0,3.0,.8,0,6.7,0,toriiMat,torii);
const shrine=new THREE.Group();shrine.position.set(-12,0,-30);scene.add(shrine);box(11,2.4,6,0,1.2,0,mat(0xd9b173,.75),shrine);box(12,.3,7,0,2.55,0,wood,shrine);const r=new THREE.Mesh(new THREE.ConeGeometry(8,2,4),roofMat);r.rotation.y=Math.PI/4;r.scale.z=.55;r.position.y=3.6;r.castShadow=true;shrine.add(r);
for(let x=-18;x<-5;x+=3) for(let z=-34;z<-18;z+=4) cyl(.16,1.4,x,.7,z,wood,scene,10);

// reflection: mirrored torii/shrine/dome silhouettes just under water
function addReflection(original,opacity=.22){const clone=original.clone(true);clone.traverse(o=>{if(o.isMesh){o.material=o.material.clone();o.material.transparent=true;o.material.opacity=opacity;o.material.depthWrite=false;}});clone.scale.y=-1;clone.position.y=-.18;scene.add(clone);return clone;}
addReflection(torii,.34);addReflection(shrine,.18);addReflection(domeG,.10);

// lamps and trees
const lampMat=new THREE.MeshStandardMaterial({color:0xffc879,emissive:0xff9d2e,emissiveIntensity:1.4});
for(let z=-44;z<32;z+=9){cyl(.07,3,24,1.5,z,darkStone);const l=new THREE.PointLight(0xffa34b,1.2,12);l.position.set(24,3.2,z);scene.add(l);const bulb=new THREE.Mesh(new THREE.SphereGeometry(.32,12,8),lampMat);bulb.position.set(24,3.2,z);scene.add(bulb)}
for(let i=0;i<34;i++){const x=28+Math.random()*20, z=-48+Math.random()*88; cyl(.22,2.7,x,1.35,z,wood);const leaf=new THREE.Mesh(new THREE.SphereGeometry(1.7+Math.random(),16,10),mat(0x27421f,.95));leaf.position.set(x,3.2,z);leaf.castShadow=true;scene.add(leaf)}

// people walking
const people=[];
function makePerson(x,z,dir=1){const g=new THREE.Group();g.position.set(x,0,z);g.userData={phase:Math.random()*10,speed:.6+Math.random()*.55,baseX:x,dir};const body=cyl(.22,1.05,0,1.05,0,mat(0x1c4f8f,.7),g,12);const head=new THREE.Mesh(new THREE.SphereGeometry(.23,14,10),mat(0xd2a073,.65));head.position.set(0,1.75,0);g.add(head);const legM=mat(0x1c1c24,.8);g.userData.l1=box(.09,.72,.09,-.12,.37,0,legM,g);g.userData.l2=box(.09,.72,.09,.12,.37,0,legM,g);g.rotation.y=dir>0?0:Math.PI;scene.add(g);people.push(g)}
for(let i=0;i<18;i++) makePerson(16+Math.random()*7,-42+i*4.5,Math.random()>.5?1:-1);

// controls
let yaw=-.25,pitch=-.08,drag=false,lastX=0,lastY=0,zoom=70;const keys={};
addEventListener('keydown',e=>{keys[e.key.toLowerCase()]=true;if(e.key.toLowerCase()==='f')document.documentElement.requestFullscreen?.()});
addEventListener('keyup',e=>keys[e.key.toLowerCase()]=false);
function rotate(dx,dy){yaw-=dx*.004;pitch-=dy*.004;pitch=Math.max(-1.25,Math.min(1.25,pitch));}
renderer.domElement.addEventListener('mousedown',e=>{drag=true;lastX=e.clientX;lastY=e.clientY});addEventListener('mouseup',()=>drag=false);addEventListener('mousemove',e=>{if(!drag)return;rotate(e.clientX-lastX,e.clientY-lastY);lastX=e.clientX;lastY=e.clientY});
addEventListener('wheel',e=>{zoom=Math.max(45,Math.min(90,zoom+e.deltaY*.02));camera.fov=zoom;camera.updateProjectionMatrix()});
const joy=document.getElementById('joy'),stick=document.getElementById('stick');if('ontouchstart'in window)joy.style.display='block';let joyActive=false,joyX=0,joyY=0;
joy.addEventListener('touchstart',e=>{joyActive=true},{passive:false});joy.addEventListener('touchmove',e=>{e.preventDefault();const rect=joy.getBoundingClientRect(),t=e.touches[0];let x=t.clientX-rect.left-66,y=t.clientY-rect.top-66;const len=Math.hypot(x,y);if(len>48){x=x/len*48;y=y/len*48}joyX=x/48;joyY=y/48;stick.style.left=43+x+'px';stick.style.top=43+y+'px'},{passive:false});joy.addEventListener('touchend',()=>{joyActive=false;joyX=joyY=0;stick.style.left='43px';stick.style.top='43px'});
renderer.domElement.addEventListener('touchmove',e=>{if(e.touches.length===1&&!joyActive){const t=e.touches[0];if(lastX)rotate(t.clientX-lastX,t.clientY-lastY);lastX=t.clientX;lastY=t.clientY}},{passive:false});renderer.domElement.addEventListener('touchend',()=>{lastX=0;lastY=0});

// mini map scene overlay uses same scene from top
const marker=new THREE.Mesh(new THREE.SphereGeometry(1.0,16,8),new THREE.MeshBasicMaterial({color:0x35a9ff}));marker.position.y=1.5;scene.add(marker);

const clock=new THREE.Clock();
function animate(){requestAnimationFrame(animate);const dt=clock.getDelta(),t=performance.now()*.001;
 camera.rotation.order='YXZ';camera.rotation.y=yaw;camera.rotation.x=pitch;
 const fwd=new THREE.Vector3(Math.sin(yaw),0,-Math.cos(yaw));const right=new THREE.Vector3(Math.cos(yaw),0,Math.sin(yaw));let mv=new THREE.Vector3();
 if(keys.w)mv.add(fwd);if(keys.s)mv.sub(fwd);if(keys.a)mv.sub(right);if(keys.d)mv.add(right);if(joyActive){mv.addScaledVector(fwd,-joyY);mv.addScaledVector(right,joyX)}if(mv.length()>0){mv.normalize();camera.position.addScaledVector(mv,dt*7.2)}camera.position.y=3.0;marker.position.set(camera.position.x,1.5,camera.position.z);
 const p=water.geometry.attributes.position;for(let i=0;i<p.count;i++){const x=p.getX(i),y=p.getY(i);p.setZ(i,Math.sin(x*.45+t*1.8)*.08+Math.cos(y*.5+t*1.25)*.055+Math.sin((x+y)*.2+t*2.3)*.025)}p.needsUpdate=true;water.rotation.z=Math.sin(t*.2)*.002;
 people.forEach((g,i)=>{g.userData.phase+=dt*5;g.position.z+=g.userData.dir*g.userData.speed*dt;if(g.position.z>34)g.position.z=-46;if(g.position.z<-46)g.position.z=34;g.userData.l1.rotation.x=Math.sin(g.userData.phase)*.55;g.userData.l2.rotation.x=-Math.sin(g.userData.phase)*.55;});
 renderer.render(scene,camera);miniRenderer.render(scene,miniCamera);
}
animate();
addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)});
