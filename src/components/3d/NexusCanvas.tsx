import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { NEXUS_STRUCTURES } from '../../data/portfolioData';
import { StructureId, StructureMeta } from '../../types';
import { sounds } from '../../utils/soundEffects';

interface NexusCanvasProps {
  activeStructure: StructureId | null;
  onSelectStructure: (id: StructureId) => void;
  onOpenTerminal: () => void;
}

export const NexusCanvas: React.FC<NexusCanvasProps> = ({
  activeStructure,
  onSelectStructure,
  onOpenTerminal
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [hoveredStructure, setHoveredStructure] = useState<StructureMeta | null>(null);
  const [hoveredTerminal, setHoveredTerminal] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  // References to keep across renders
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const targetCamPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 4, 16));
  const targetLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 1, 0));
  const currentLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 1, 0));
  const interactiveObjectsRef = useRef<{ mesh: THREE.Object3D; data: StructureMeta | 'terminal' }[]>([]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Check WebGL support
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 2. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x08080d);
    scene.fog = new THREE.FogExp2(0x08080d, 0.035);

    // 3. Camera setup
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 4, 16);
    cameraRef.current = camera;

    // 4. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0x181828, 1.8);
    scene.add(ambientLight);

    const purplePoint = new THREE.PointLight(0xa855f7, 4, 25);
    purplePoint.position.set(-6, 8, -3);
    scene.add(purplePoint);

    const bluePoint = new THREE.PointLight(0x38bdf8, 4, 25);
    bluePoint.position.set(6, 8, 3);
    scene.add(bluePoint);

    const centerPoint = new THREE.PointLight(0x818cf8, 2.5, 20);
    centerPoint.position.set(0, 4, 0);
    scene.add(centerPoint);

    // 6. Holographic Floor Grid
    const gridHelper = new THREE.GridHelper(60, 60, 0xa855f7, 0x1e1b4b);
    gridHelper.position.y = -2;
    // @ts-ignore
    gridHelper.material.opacity = 0.35;
    // @ts-ignore
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    // Floating Stardust Particles
    const particleCount = 800;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(0xa855f7);
    const c2 = new THREE.Color(0x38bdf8);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = Math.random() * 22 - 3;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;

      const mixed = Math.random() > 0.5 ? c1 : c2;
      particleColors[i * 3] = mixed.r;
      particleColors[i * 3 + 1] = mixed.g;
      particleColors[i * 3 + 2] = mixed.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.14,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // 7. Energy Lines Connecting Structures
    const energyCurvePoints: THREE.Vector3[] = [];
    NEXUS_STRUCTURES.forEach(s => {
      energyCurvePoints.push(new THREE.Vector3(s.position3D[0], s.position3D[1], s.position3D[2]));
    });
    energyCurvePoints.push(new THREE.Vector3(0, 1.2, 0)); // loop back to center

    const curve = new THREE.CatmullRomCurve3(energyCurvePoints, true);
    const tubeGeometry = new THREE.TubeGeometry(curve, 120, 0.04, 6, true);
    const tubeMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });
    const energyLine = new THREE.Mesh(tubeGeometry, tubeMaterial);
    scene.add(energyLine);

    // 8. Build Interactive 3D Structures
    const interactiveList: { mesh: THREE.Object3D; data: StructureMeta | 'terminal' }[] = [];
    const animatedRings: THREE.Mesh[] = [];

    // Helper to create holographic beacon ring
    const createBeaconRing = (radius: number, color: number) => {
      const ringGeo = new THREE.RingGeometry(radius * 0.9, radius, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6,
        wireframe: true
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      return ring;
    };

    // STRUCTURE 01: SOBRE MIM (Identity Core)
    const aboutGroup = new THREE.Group();
    aboutGroup.position.set(0, 1.2, 0);

    const coreGeo = new THREE.OctahedronGeometry(1.2, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      emissive: 0x6b21a8,
      emissiveIntensity: 0.7,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: false
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    aboutGroup.add(coreMesh);

    const wireframeCore = new THREE.Mesh(
      new THREE.OctahedronGeometry(1.4, 1),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.5 })
    );
    aboutGroup.add(wireframeCore);

    const ring1 = createBeaconRing(2.0, 0xa855f7);
    aboutGroup.add(ring1);
    animatedRings.push(ring1);

    scene.add(aboutGroup);
    interactiveList.push({ mesh: coreMesh, data: NEXUS_STRUCTURES[0] });

    // STRUCTURE 02: HABILIDADES (Digital Lab - Polyhedron Matrix)
    const skillsGroup = new THREE.Group();
    const [skX, skY, skZ] = NEXUS_STRUCTURES[1].position3D;
    skillsGroup.position.set(skX, skY, skZ);

    const labGeo = new THREE.IcosahedronGeometry(1.3, 0);
    const labMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.6,
      roughness: 0.3,
      metalness: 0.7
    });
    const labMesh = new THREE.Mesh(labGeo, labMat);
    skillsGroup.add(labMesh);

    // Orbiting mini node
    const orbitNode = new THREE.Mesh(
      new THREE.BoxGeometry(0.35, 0.35, 0.35),
      new THREE.MeshBasicMaterial({ color: 0xa855f7, wireframe: true })
    );
    orbitNode.position.set(1.8, 0.5, 0);
    skillsGroup.add(orbitNode);

    const ring2 = createBeaconRing(2.2, 0x38bdf8);
    skillsGroup.add(ring2);
    animatedRings.push(ring2);

    scene.add(skillsGroup);
    interactiveList.push({ mesh: labMesh, data: NEXUS_STRUCTURES[1] });

    // STRUCTURE 03: PROJETOS (Portal de Projetos - Torus Gateway)
    const projGroup = new THREE.Group();
    const [prX, prY, prZ] = NEXUS_STRUCTURES[2].position3D;
    projGroup.position.set(prX, prY, prZ);

    const portalTorus = new THREE.Mesh(
      new THREE.TorusGeometry(1.6, 0.22, 16, 40),
      new THREE.MeshStandardMaterial({
        color: 0xa855f7,
        emissive: 0x9333ea,
        emissiveIntensity: 0.9,
        roughness: 0.1,
        metalness: 0.9
      })
    );
    portalTorus.rotation.y = -Math.PI / 6;
    projGroup.add(portalTorus);

    const innerDisc = new THREE.Mesh(
      new THREE.CircleGeometry(1.38, 32),
      new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending
      })
    );
    innerDisc.rotation.y = -Math.PI / 6;
    projGroup.add(innerDisc);

    scene.add(projGroup);
    interactiveList.push({ mesh: portalTorus, data: NEXUS_STRUCTURES[2] });

    // STRUCTURE 04: GITHUB (Digital Archive - Data Spire)
    const ghGroup = new THREE.Group();
    const [ghX, ghY, ghZ] = NEXUS_STRUCTURES[3].position3D;
    ghGroup.position.set(ghX, ghY, ghZ);

    const spireGeo = new THREE.CylinderGeometry(0.5, 0.9, 2.2, 6);
    const spireMat = new THREE.MeshStandardMaterial({
      color: 0x14141d,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.4,
      roughness: 0.2,
      metalness: 0.9
    });
    const spireMesh = new THREE.Mesh(spireGeo, spireMat);
    ghGroup.add(spireMesh);

    const spireTip = new THREE.Mesh(
      new THREE.ConeGeometry(0.5, 0.8, 6),
      new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x38bdf8,
        emissiveIntensity: 0.8
      })
    );
    spireTip.position.y = 1.5;
    ghGroup.add(spireTip);

    const ring4 = createBeaconRing(1.8, 0x38bdf8);
    ghGroup.add(ring4);
    animatedRings.push(ring4);

    scene.add(ghGroup);
    interactiveList.push({ mesh: spireMesh, data: NEXUS_STRUCTURES[3] });

    // STRUCTURE 05: CONTATO (Communications Relay)
    const contactGroup = new THREE.Group();
    const [coX, coY, coZ] = NEXUS_STRUCTURES[4].position3D;
    contactGroup.position.set(coX, coY, coZ);

    const commsDish = new THREE.Mesh(
      new THREE.ConeGeometry(1.2, 0.8, 16, 1, true),
      new THREE.MeshStandardMaterial({
        color: 0xa855f7,
        emissive: 0x7e22ce,
        emissiveIntensity: 0.5,
        roughness: 0.3,
        metalness: 0.8,
        side: THREE.DoubleSide
      })
    );
    commsDish.rotation.x = -Math.PI / 3;
    contactGroup.add(commsDish);

    const commsCore = new THREE.Mesh(
      new THREE.SphereGeometry(0.35, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xf4f4f8 })
    );
    commsCore.position.set(0, 0.4, 0.5);
    contactGroup.add(commsCore);

    const ring5 = createBeaconRing(1.9, 0xa855f7);
    contactGroup.add(ring5);
    animatedRings.push(ring5);

    scene.add(contactGroup);
    interactiveList.push({ mesh: commsDish, data: NEXUS_STRUCTURES[4] });

    // 9. Floating Holographic Terminal Monolith Station
    const terminalGroup = new THREE.Group();
    terminalGroup.position.set(0, -0.6, 6.5);

    const termPodium = new THREE.Mesh(
      new THREE.BoxGeometry(1.8, 0.15, 1.2),
      new THREE.MeshStandardMaterial({ color: 0x14141d, metalness: 0.9, roughness: 0.1 })
    );
    terminalGroup.add(termPodium);

    const termScreen = new THREE.Mesh(
      new THREE.BoxGeometry(1.4, 0.9, 0.08),
      new THREE.MeshStandardMaterial({
        color: 0x08080d,
        emissive: 0x38bdf8,
        emissiveIntensity: 0.5,
        roughness: 0.2
      })
    );
    termScreen.position.set(0, 0.7, 0);
    termScreen.rotation.x = -0.15;
    terminalGroup.add(termScreen);

    const termHoloBorder = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 1.0, 0.1),
      new THREE.MeshBasicMaterial({ color: 0xa855f7, wireframe: true })
    );
    termHoloBorder.position.copy(termScreen.position);
    termHoloBorder.rotation.copy(termScreen.rotation);
    terminalGroup.add(termHoloBorder);

    scene.add(terminalGroup);
    interactiveList.push({ mesh: termScreen, data: 'terminal' });

    interactiveObjectsRef.current = interactiveList;

    // 10. Raycasting & Mouse Tracking
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);
    const mouseParallax = { x: 0, y: 0 };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      mouseParallax.x = (clientX / window.innerWidth - 0.5) * 1.5;
      mouseParallax.y = (clientY / window.innerHeight - 0.5) * 1.0;
    };

    let prevHovered: THREE.Object3D | null = null;

    const checkIntersections = () => {
      raycaster.setFromCamera(mouse, camera);
      const objects = interactiveList.map(item => item.mesh);
      const intersects = raycaster.intersectObjects(objects, true);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (hit !== prevHovered) {
          prevHovered = hit;
          const found = interactiveList.find(item => item.mesh === hit || item.mesh.children.includes(hit));
          if (found) {
            sounds.playHover();
            if (found.data === 'terminal') {
              setHoveredTerminal(true);
              setHoveredStructure(null);
            } else {
              setHoveredStructure(found.data);
              setHoveredTerminal(false);
            }
          }
        }
        document.body.style.cursor = 'pointer';
      } else {
        if (prevHovered !== null) {
          prevHovered = null;
          setHoveredStructure(null);
          setHoveredTerminal(false);
          document.body.style.cursor = 'auto';
        }
      }
    };

    const handleClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const objects = interactiveList.map(item => item.mesh);
      const intersects = raycaster.intersectObjects(objects, true);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const found = interactiveList.find(item => item.mesh === hit || item.mesh.children.includes(hit));
        if (found) {
          sounds.playSelect();
          if (found.data === 'terminal') {
            onOpenTerminal();
          } else {
            onSelectStructure(found.data.id);
          }
        }
      }
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchstart', handlePointerMove, { passive: true });
    renderer.domElement.addEventListener('click', handleClick);

    // 11. Responsive resizing
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newW = container.clientWidth || window.innerWidth;
      const newH = container.clientHeight || window.innerHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // 12. Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Ambient particle motion
      particleSystem.rotation.y = elapsedTime * 0.02;

      // Bobbing & rotation of structures
      coreMesh.rotation.y = elapsedTime * 0.6;
      coreMesh.rotation.x = elapsedTime * 0.3;
      wireframeCore.rotation.y = -elapsedTime * 0.4;

      labMesh.rotation.y = elapsedTime * 0.4;
      labMesh.rotation.z = Math.sin(elapsedTime * 0.5) * 0.2;
      orbitNode.position.x = Math.cos(elapsedTime * 1.5) * 1.8;
      orbitNode.position.z = Math.sin(elapsedTime * 1.5) * 1.8;

      portalTorus.rotation.z = elapsedTime * 0.5;
      innerDisc.rotation.z = -elapsedTime * 0.3;

      spireMesh.rotation.y = elapsedTime * 0.2;
      commsDish.rotation.z = Math.sin(elapsedTime * 0.8) * 0.2 - Math.PI / 3;

      // Rotate beacon rings
      animatedRings.forEach((r, idx) => {
        r.rotation.z = elapsedTime * (0.3 + idx * 0.1);
      });

      // Camera lerp towards target position
      const desiredPos = targetCamPosRef.current.clone();
      // Apply mouse parallax slightly when in overview
      desiredPos.x += mouseParallax.x * 0.8;
      desiredPos.y += mouseParallax.y * 0.5;

      camera.position.lerp(desiredPos, 0.05);

      // Lerp lookAt target
      currentLookAtRef.current.lerp(targetLookAtRef.current, 0.05);
      camera.lookAt(currentLookAtRef.current);

      checkIntersections();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchstart', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('click', handleClick);
      cancelAnimationFrame(animId);
      document.body.style.cursor = 'auto';

      if (container && renderer.domElement) {
        container.innerHTML = '';
      }
      renderer.dispose();
    };
  }, [onSelectStructure, onOpenTerminal]);

  // Handle active structure camera focus
  useEffect(() => {
    if (!cameraRef.current) return;

    if (activeStructure) {
      const struct = NEXUS_STRUCTURES.find(s => s.id === activeStructure);
      if (struct) {
        sounds.playWarp();
        const [x, y, z] = struct.position3D;
        // Position camera in front of the structure
        targetCamPosRef.current.set(x * 0.7, y + 1.0, z * 0.7 + 4.5);
        targetLookAtRef.current.set(x, y + 0.2, z);
      }
    } else {
      // Reset to universe overview
      targetCamPosRef.current.set(0, 4, 16);
      targetLookAtRef.current.set(0, 1, 0);
    }
  }, [activeStructure]);

  if (!webglSupported) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: '2rem',
        textAlign: 'center',
        background: '#08080D'
      }}>
        <h2 style={{ color: '#38BDF8', fontFamily: 'var(--font-display)', marginBottom: '1rem' }}>
          NEXUS // AMBIENTE ADAPTADO
        </h2>
        <p style={{ color: '#A1A1AA', maxWidth: '500px', marginBottom: '2rem' }}>
          A aceleração de hardware 3D não está disponível neste dispositivo. Alternando automaticamente para o modo de alta performance.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="cyber-button-primary"
        >
          Tentar Reconectar
        </button>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />

      {/* Holographic HUD Tooltip on Hover */}
      {hoveredStructure && !activeStructure && (
        <div
          style={{
            position: 'absolute',
            bottom: '5.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
            zIndex: 40,
            animation: 'float-subtle 3s ease infinite'
          }}
        >
          <div className="cyber-panel cyber-panel-glow cyber-corner-brackets" style={{ padding: '0.8rem 1.6rem', textAlign: 'center' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--neon-blue)', letterSpacing: '0.15em', display: 'block', marginBottom: '0.2rem' }}>
              {hoveredStructure.code} // {hoveredStructure.subtitle.toUpperCase()}
            </span>
            <div style={{ fontSize: '1.2rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: hoveredStructure.color }}>
              {hoveredStructure.name}
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.3rem', display: 'block' }}>
              [ Clique com o mouse para entrar nesta estrutura ]
            </span>
          </div>
        </div>
      )}

      {/* Hovered Terminal Hologram Indicator */}
      {hoveredTerminal && !activeStructure && (
        <div
          style={{
            position: 'absolute',
            bottom: '5.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
            zIndex: 40
          }}
        >
          <div className="cyber-panel cyber-panel-glow cyber-corner-brackets" style={{ padding: '0.8rem 1.6rem', textAlign: 'center' }}>
            <span style={{ fontSize: '0.7rem', color: '#A855F7', letterSpacing: '0.15em', display: 'block' }}>
              INTERFACE DE COMANDO // HOLOGRÁFICA
            </span>
            <div style={{ fontSize: '1.2rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: '#38BDF8' }}>
              TERMINAL GABRIEL.EXE
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem', display: 'block' }}>
              [ Clique para abrir o terminal interativo ]
            </span>
          </div>
        </div>
      )}

      {/* Ambient Exploration Control Helper */}
      <div
        style={{
          position: 'absolute',
          bottom: '1.5rem',
          left: '1.5rem',
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.2rem',
          zIndex: 20
        }}
      >
        <div style={{ fontSize: '0.7rem', color: 'var(--neon-blue)', fontFamily: 'var(--font-mono)' }}>
          ● NEXUS ENGINE v2.4 // COORDENADAS ONLINE
        </div>
        <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
          Mova o cursor para navegar • Clique nas estruturas para inspecionar
        </div>
      </div>
    </div>
  );
};

