import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMousePosition } from '../../hooks/useMousePosition';

// Adaptive config hook
function useDeviceConfig() {
  const [config, setConfig] = useState({
    device: 'desktop',
    nodeCount: 80,
    xOffset: 1.5,
    spreadScale: 1,
    dpr: [1, 2],
    antialias: true
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setConfig({ device: 'mobile', nodeCount: 20, xOffset: 0, spreadScale: 0.6, dpr: 1, antialias: false });
      } else if (width < 1024) {
        setConfig({ device: 'tablet', nodeCount: 50, xOffset: 1.0, spreadScale: 0.8, dpr: [1, 1.5], antialias: true });
      } else {
        setConfig({ device: 'desktop', nodeCount: 80, xOffset: 2.0, spreadScale: 1, dpr: [1, 2], antialias: true });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return config;
}

// Map depth to scale and brightness
function getDepthFactor(z) {
  // z typically between -4 and +2
  const normalized = (z + 4) / 6; 
  return Math.max(0.3, Math.min(1.0, normalized)); // clamp between 0.3 and 1.0
}

function generateGraph(config) {
  const nodes = [];
  const connections = [];

  // 1. Explicit Hub Placement
  let majorClusterCenters = [];
  
  if (config.device === 'mobile') {
    majorClusterCenters = [
      { x: 0, y: 1.5, z: 1.0, id: 0, type: 'core' },
      { x: 0, y: -2.0, z: -1.0, id: 1, type: 'core' }
    ];
  } else {
    // Desktop / Tablet
    majorClusterCenters = [
      { x: config.xOffset - 1.5, y: 0.5, z: 1.5, id: 0, type: 'core' }, // Central Hub (Closer to text, pops forward)
      { x: config.xOffset + 2.0, y: 2.0, z: -1.0, id: 1, type: 'core' }, // Top right
      { x: config.xOffset + 1.5, y: -2.0, z: 0.0, id: 2, type: 'core' }, // Bottom right
    ];
  }

  // 2. Generate Nodes
  let idCounter = 0;

  // Add Hubs (Cores)
  majorClusterCenters.forEach(center => {
    const depthFactor = getDepthFactor(center.z);
    nodes.push({
      id: idCounter++,
      x: center.x, y: center.y, z: center.z,
      baseX: center.x, baseY: center.y, baseZ: center.z,
      phase: Math.random() * Math.PI * 2,
      speed: 0.05 + Math.random() * 0.05,
      // Base scale modified by depth
      scale: 2.5 * depthFactor,
      type: center.type,
      clusterId: center.id,
      depthFactor
    });
  });

  // Add surrounding nodes
  const remainingNodes = config.nodeCount - nodes.length;
  for (let i = 0; i < remainingNodes; i++) {
    // Bias towards the central hub (id: 0)
    const centerIdx = Math.random() < 0.5 ? 0 : Math.floor(Math.random() * majorClusterCenters.length);
    const center = majorClusterCenters[centerIdx];
    
    // 70% standard, 30% satellite
    const isStandard = Math.random() > 0.3;
    const type = isStandard ? 'standard' : 'satellite';
    
    const spreadMultiplier = isStandard ? 2.0 : 3.5;
    const spreadX = spreadMultiplier * config.spreadScale;
    const spreadY = spreadMultiplier * config.spreadScale;
    const spreadZ = spreadMultiplier * config.spreadScale;

    const x = center.x + (Math.random() - 0.5) * spreadX;
    const y = center.y + (Math.random() - 0.5) * spreadY;
    const z = center.z + (Math.random() - 0.5) * spreadZ;
    
    const depthFactor = getDepthFactor(z);
    
    // Scale hierarchy
    let baseScale = isStandard ? (0.8 + Math.random() * 0.4) : (0.4 + Math.random() * 0.3);

    nodes.push({
      id: idCounter++,
      x, y, z,
      baseX: x, baseY: y, baseZ: z,
      phase: Math.random() * Math.PI * 2,
      speed: 0.1 + Math.random() * 0.15,
      scale: baseScale * depthFactor,
      type,
      clusterId: center.id,
      depthFactor
    });
  }

  // Helper distance function
  const getDistSq = (n1, n2) => {
    const dx = n1.x - n2.x; const dy = n1.y - n2.y; const dz = n1.z - n2.z;
    return dx*dx + dy*dy + dz*dz;
  };

  // 3. Strict Connections
  
  // Bridges (Core to Core only)
  const cores = nodes.filter(n => n.type === 'core');
  for (let i = 0; i < cores.length; i++) {
    for (let j = i + 1; j < cores.length; j++) {
      const distSq = getDistSq(cores[i], cores[j]);
      // Only connect if not insanely far, and limit to 1 connection per core pair mostly
      if (distSq < 25 * config.spreadScale) { 
        connections.push({ source: cores[i], target: cores[j], type: 'bridge' });
      }
    }
  }

  // Local Cluster Structure
  majorClusterCenters.forEach(center => {
    const clusterNodes = nodes.filter(n => n.clusterId === center.id);
    const coreNode = clusterNodes.find(n => n.type === 'core');
    const standardNodes = clusterNodes.filter(n => n.type === 'standard');
    
    clusterNodes.forEach(node => {
      if (node.type === 'core') return;

      if (node.type === 'standard') {
        // Connect to Core (hub-and-spoke)
        if (coreNode) {
          connections.push({ source: node, target: coreNode, type: 'core-link' });
        }
        // Connect to 1 nearest standard node
        const neighbors = standardNodes
          .filter(n => n.id !== node.id)
          .map(n => ({ node: n, dist: getDistSq(node, n) }))
          .sort((a, b) => a.dist - b.dist);
          
        if (neighbors.length > 0) {
          const nearest = neighbors[0].node;
          if (node.id < nearest.id) { // deduplicate
            connections.push({ source: node, target: nearest, type: 'local' });
          }
        }
      }

      if (node.type === 'satellite') {
        // Only connect to 1 nearest standard node, NOT the core. Prevents spaghetti.
        const neighbors = standardNodes
          .map(n => ({ node: n, dist: getDistSq(node, n) }))
          .sort((a, b) => a.dist - b.dist);
          
        if (neighbors.length > 0) {
          connections.push({ source: node, target: neighbors[0].node, type: 'local' });
        }
      }
    });
  });

  return { nodes, connections, majorClusterCenters };
}

function NeuralGraph({ mousePos, config }) {
  const groupRef = useRef();
  const nodesRef = useRef();
  const nodeGlowRef = useRef();
  const linesRef = useRef();
  
  const { nodes, connections, majorClusterCenters } = useMemo(() => generateGraph(config), [config]);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const linePositions = useMemo(() => new Float32Array(connections.length * 6), [connections]);
  
  // Set Node Colors (Depth-based brightness)
  useEffect(() => {
    if (nodesRef.current) {
      const baseColor = new THREE.Color("#3B82F6");
      const coreColor = new THREE.Color("#60A5FA");
      
      nodes.forEach((node, i) => {
        const color = node.type === 'core' ? coreColor.clone() : baseColor.clone();
        // Multiply color by depth factor to fade into background!
        color.multiplyScalar(node.depthFactor);
        
        nodesRef.current.setColorAt(i, color);
        if (nodeGlowRef.current) {
          nodeGlowRef.current.setColorAt(i, color);
        }
      });
      nodesRef.current.instanceColor.needsUpdate = true;
      if (nodeGlowRef.current) nodeGlowRef.current.instanceColor.needsUpdate = true;
    }
  }, [nodes]);



  // Generate static colors for lines based on connection type & depth
  const lineColors = useMemo(() => {
    const colors = new Float32Array(connections.length * 6);
    const baseColor = new THREE.Color("#3B82F6");
    
    connections.forEach((conn, i) => {
      // Line brightness is the average of source and target depth
      const avgDepth = (conn.source.depthFactor + conn.target.depthFactor) / 2;
      
      let alpha = 0.25;
      if (conn.type === 'bridge') alpha = 0.5;
      if (conn.type === 'core-link') alpha = 0.35;
      
      // Multiply by depth to fade far lines
      const totalBrightness = alpha * avgDepth;
      
      const r = baseColor.r * totalBrightness;
      const g = baseColor.g * totalBrightness;
      const b = baseColor.b * totalBrightness;
      
      const idx = i * 6;
      colors[idx] = r; colors[idx+1] = g; colors[idx+2] = b;
      colors[idx+3] = r; colors[idx+4] = g; colors[idx+5] = b;
    });
    return colors;
  }, [connections]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    if (nodesRef.current && nodeGlowRef.current) {
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        
        node.x = node.baseX + Math.sin(t * node.speed + node.phase) * 0.4;
        node.y = node.baseY + Math.cos(t * node.speed * 0.8 + node.phase) * 0.4;
        node.z = node.baseZ + Math.sin(t * node.speed * 0.9 + node.phase) * 0.4;
        
        dummy.position.set(node.x, node.y, node.z);
        dummy.scale.set(node.scale, node.scale, node.scale);
        dummy.updateMatrix();
        nodesRef.current.setMatrixAt(i, dummy.matrix);

        dummy.scale.set(node.scale * 2.2, node.scale * 2.2, node.scale * 2.2);
        dummy.updateMatrix();
        nodeGlowRef.current.setMatrixAt(i, dummy.matrix);
      }
      nodesRef.current.instanceMatrix.needsUpdate = true;
      nodeGlowRef.current.instanceMatrix.needsUpdate = true;
    }

    if (linesRef.current) {
      for (let i = 0; i < connections.length; i++) {
        const conn = connections[i];
        const idx = i * 6;
        linePositions[idx] = conn.source.x;
        linePositions[idx + 1] = conn.source.y;
        linePositions[idx + 2] = conn.source.z;
        linePositions[idx + 3] = conn.target.x;
        linePositions[idx + 4] = conn.target.y;
        linePositions[idx + 5] = conn.target.z;
      }
      linesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    if (groupRef.current) {
      if (config.device === 'desktop') {
        const targetY = mousePos.current.x * 0.4;
        const targetX = -mousePos.current.y * 0.25;
        groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.08;
        groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.08;
      }
      groupRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <group ref={groupRef} key={`graph-${nodes.length}-${connections.length}`}>
      {/* 1. Main Nodes */}
      <instancedMesh ref={nodesRef} args={[null, null, nodes.length]}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshBasicMaterial 
          toneMapped={false}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </instancedMesh>
      
      {/* 3. Node Glows */}
      <instancedMesh ref={nodeGlowRef} args={[null, null, nodes.length]}>
        <sphereGeometry args={[0.03, 12, 12]} />
        <meshBasicMaterial 
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </instancedMesh>

      {/* 4. Connections */}
      {connections.length > 0 && (
        <lineSegments ref={linesRef} key={`lines-${connections.length}`}>
          <bufferGeometry key={`geom-${connections.length}`}>
            <bufferAttribute
              attach="attributes-position"
              count={connections.length * 2}
              array={linePositions}
              itemSize={3}
              usage={THREE.DynamicDrawUsage}
            />
            <bufferAttribute
              attach="attributes-color"
              count={connections.length * 2}
              array={lineColors}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            vertexColors
            blending={THREE.AdditiveBlending}
            transparent
            depthWrite={false}
            opacity={0.8}
          />
        </lineSegments>
      )}
    </group>
  );
}

export default function NeuralScene() {
  const mousePos = useMousePosition();
  const config = useDeviceConfig();

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ fov: 50, position: [0, 0, 10], near: 0.1, far: 100 }}
        dpr={config.dpr}
        gl={{ 
          antialias: config.antialias, 
          alpha: true, 
          powerPreference: 'high-performance' 
        }}
        style={{ background: 'transparent' }}
      >
        <NeuralGraph key={config.device} mousePos={mousePos} config={config} />
      </Canvas>
    </div>
  );
}
