/* ─── CURSOR ─── */
const cur=document.getElementById('cur'),cr=document.getElementById('cur-ring');
let mx=-200,my=-200,rx=-200,ry=-200;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY});
(function ac(){
  cur.style.left=mx+'px';cur.style.top=my+'px';
  rx+=(mx-rx)*.1;ry+=(my-ry)*.1;
  cr.style.left=rx+'px';cr.style.top=ry+'px';
  requestAnimationFrame(ac);
})();

/* ─── MOBILE NAV ─── */
const nt=document.getElementById('navToggle'),mm=document.getElementById('mobMenu');
nt.addEventListener('click',()=>{
  const o=nt.classList.toggle('open');
  mm.classList.toggle('open',o);
  document.body.style.overflow=o?'hidden':'';
});
function closeMenu(){nt.classList.remove('open');mm.classList.remove('open');document.body.style.overflow='';}

/* ─── WHATSAPP FORM ─── */
document.getElementById('waBtn').addEventListener('click',()=>{
  const n=document.getElementById('cf-n').value.trim();
  const e=document.getElementById('cf-e').value.trim();
  const s=document.getElementById('cf-s').value.trim();
  const m=document.getElementById('cf-m').value.trim();
  let ok=true;
  document.getElementById('en').style.display=!n?(ok=false,'block'):'none';
  document.getElementById('em').style.display=!m?(ok=false,'block'):'none';
  if(!ok)return;
  let t='Hello Bimandi! 👋\n\n';
  t+='*Name:* '+n+'\n';
  if(e)t+='*Email:* '+e+'\n';
  if(s)t+='*Subject:* '+s+'\n';
  t+='\n*Message:*\n'+m;
  window.open('https://wa.me/94729698990?text='+encodeURIComponent(t),'_blank');
});

/* ─── TYPING ANIMATION ─── */
(function initTyping(){
  const el=document.getElementById('typed-text');
  if(!el)return;
  const roles=[
    'Software Engineering Undergraduate',
    'Full-Stack Developer',
    'Mobile Application Developer',
    'UI/UX Enthusiast',
  ];
  let ri=0,ci=0,deleting=false;
  const speed={type:55,delete:28,pause:2200,start:1200};
  function tick(){
    const word=roles[ri];
    if(!deleting){
      el.textContent=word.slice(0,ci+1);
      ci++;
      if(ci===word.length){deleting=true;setTimeout(tick,speed.pause);return;}
    }else{
      el.textContent=word.slice(0,ci-1);
      ci--;
      if(ci===0){deleting=false;ri=(ri+1)%roles.length;setTimeout(tick,speed.start*.4);return;}
    }
    setTimeout(tick,deleting?speed.delete:speed.type);
  }
  setTimeout(tick,speed.start);
})();


const actIO=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('.activity-fill').forEach((bar,i)=>{
        setTimeout(()=>{bar.style.width=bar.dataset.w+'%'},i*120);
      });
      actIO.unobserve(e.target);
    }
  });
},{threshold:.25});
const actEl=document.getElementById('activity-bars');
if(actEl)actIO.observe(actEl);

/* ─── THREE.JS SCENE ─── */
const canvas=document.getElementById('bg-canvas');
const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.shadowMap.enabled=false;

const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,0.1,200);
camera.position.set(0,0,8);

// ── Ambient + directional light
const ambient=new THREE.AmbientLight(0x3d1f35,1.2);
scene.add(ambient);
const dirL=new THREE.DirectionalLight(0xC77D9D,1.5);
dirL.position.set(5,8,5);
scene.add(dirL);
const pointL=new THREE.PointLight(0xa85a80,2,30);
pointL.position.set(-4,3,4);
scene.add(pointL);
const pointL2=new THREE.PointLight(0xD6B37C,1.5,25);
pointL2.position.set(6,-2,-4);
scene.add(pointL2);

// ── Particle field
const mobile=window.innerWidth<640;
const pCount=mobile?600:1400;
const pPos=new Float32Array(pCount*3);
const pCol=new Float32Array(pCount*3);
const pSz=new Float32Array(pCount);
for(let i=0;i<pCount;i++){
  const r=8+Math.random()*14;
  const theta=Math.random()*Math.PI*2;
  const phi=Math.acos(2*Math.random()-1);
  pPos[i*3]=r*Math.sin(phi)*Math.cos(theta);
  pPos[i*3+1]=r*Math.sin(phi)*Math.sin(theta)*(mobile?.6:1);
  pPos[i*3+2]=r*Math.cos(phi)-4;
  const t=Math.random();
  if(t<.5){pCol[i*3]=.91;pCol[i*3+1]=.63;pCol[i*3+2]=.69;}
  else if(t<.8){pCol[i*3]=.83;pCol[i*3+1]=.67;pCol[i*3+2]=.42;}
  else{pCol[i*3]=.24;pCol[i*3+1]=.12;pCol[i*3+2]=.21;}
  pSz[i]=Math.random()*.06+.015;
}
const pGeo=new THREE.BufferGeometry();
pGeo.setAttribute('position',new THREE.BufferAttribute(pPos,3));
pGeo.setAttribute('color',new THREE.BufferAttribute(pCol,3));
pGeo.setAttribute('size',new THREE.BufferAttribute(pSz,1));
const pMat=new THREE.PointsMaterial({size:.03,vertexColors:true,transparent:true,opacity:.7,sizeAttenuation:true});
const pts=new THREE.Points(pGeo,pMat);
scene.add(pts);

// ── Floating wireframe geometries
const geos=[
  new THREE.IcosahedronGeometry(1.1,0),
  new THREE.OctahedronGeometry(0.85,0),
  new THREE.TetrahedronGeometry(0.75,0),
  new THREE.DodecahedronGeometry(0.7,0),
];
const wireMats=[
  new THREE.MeshBasicMaterial({color:0xC77D9D,wireframe:true,transparent:true,opacity:.18}),
  new THREE.MeshBasicMaterial({color:0xD6B37C,wireframe:true,transparent:true,opacity:.15}),
  new THREE.MeshBasicMaterial({color:0xa85a80,wireframe:true,transparent:true,opacity:.14}),
  new THREE.MeshBasicMaterial({color:0xf5d0db,wireframe:true,transparent:true,opacity:.1}),
];
const floaters=[];
const fPositions=[
  [-4.5,2.5,-3],[4,1.5,-4],[3.5,-2.5,-3],[-3.5,-2,-4]
];
geos.forEach((g,i)=>{
  const m=new THREE.Mesh(g,wireMats[i]);
  m.position.set(...fPositions[i]);
  m.userData={rx:Math.random()*.008+.003,ry:Math.random()*.01+.004,floatAmp:Math.random()*.2+.1,floatOff:Math.random()*Math.PI*2};
  scene.add(m);floaters.push(m);
});

// ── Central tech sphere (rotating)
const sphereGeo=new THREE.SphereGeometry(1.6,24,24);
const sphereEdges=new THREE.EdgesGeometry(sphereGeo);
const sphereMat=new THREE.LineBasicMaterial({color:0x6b3a5a,transparent:true,opacity:.25});
const sphere=new THREE.LineSegments(sphereEdges,sphereMat);
sphere.position.set(0,0,-6);
scene.add(sphere);

// ── Grid plane (holographic floor)
const gridHelper=new THREE.GridHelper(30,30,0x3d1f35,0x3d1f35);
gridHelper.material.transparent=true;
gridHelper.material.opacity=.15;
gridHelper.position.y=-5;
scene.add(gridHelper);

// ── Ring
const ringGeo=new THREE.TorusGeometry(2.2,.008,8,80);
const ringMat=new THREE.MeshBasicMaterial({color:0xC77D9D,transparent:true,opacity:.12});
const ring=new THREE.Mesh(ringGeo,ringMat);
ring.rotation.x=Math.PI/2.2;
ring.position.set(0,0,-4);
scene.add(ring);

const ring2Geo=new THREE.TorusGeometry(3,.005,8,80);
const ring2Mat=new THREE.MeshBasicMaterial({color:0xD6B37C,transparent:true,opacity:.08});
const ring2=new THREE.Mesh(ring2Geo,ring2Mat);
ring2.rotation.x=Math.PI/1.8;ring2.rotation.z=.3;
ring2.position.set(0,0,-4);
scene.add(ring2);

// ── Mouse tracking
let tmx=0,tmy=0,cmx=0,cmy=0;
document.addEventListener('mousemove',e=>{
  tmx=(e.clientX/window.innerWidth-.5)*1.2;
  tmy=-(e.clientY/window.innerHeight-.5)*.8;
});
window.addEventListener('deviceorientation',e=>{
  if(e.gamma!==null){tmx=e.gamma/45*.6;tmy=e.beta/45*.4;}
},{passive:true});

// ── Resize
window.addEventListener('resize',()=>{
  camera.aspect=window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
});

// ── Render loop
const clock=new THREE.Clock();
(function render(){
  requestAnimationFrame(render);
  const t=clock.getElapsedTime();

  cmx+=(tmx-cmx)*.04;cmy+=(tmy-cmy)*.04;

  pts.rotation.y=t*.025;pts.rotation.x=t*.012;

  floaters.forEach(f=>{
    f.rotation.x+=f.userData.rx;f.rotation.y+=f.userData.ry;
    f.position.y+=Math.sin(t*0.7+f.userData.floatOff)*f.userData.floatAmp*.006;
  });

  sphere.rotation.y=t*.08;sphere.rotation.x=t*.04;
  ring.rotation.z=t*.06;ring2.rotation.z=-t*.04;

  gridHelper.position.z=(t*.5)%1;

  camera.position.x+=(cmx*.8-camera.position.x)*.06;
  camera.position.y+=(cmy*.5-camera.position.y)*.06;
  camera.lookAt(scene.position);

  pointL.position.x=Math.sin(t*.4)*5;
  pointL.position.z=Math.cos(t*.4)*5;

  renderer.render(scene,camera);
})();

/* ─── SCROLL REVEAL ─── */
const io=new IntersectionObserver(entries=>{
  entries.forEach((e,i)=>{
    if(e.isIntersecting)setTimeout(()=>e.target.classList.add('vi'),i*60);
  });
},{threshold:.08});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));

/* ─── SKILL BAR ANIMATION ─── */
const barIO=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const fill=e.target.querySelector('.sk-feat-fill');
      if(fill){fill.style.width=fill.dataset.w+'%';}
      barIO.unobserve(e.target);
    }
  });
},{threshold:.3});
document.querySelectorAll('.sk-feat-card').forEach(c=>barIO.observe(c));