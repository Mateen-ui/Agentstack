import Head from 'next/head';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Home() {
  const heroCanvasRef = useRef(null);
  const featureCanvasRef = useRef(null);
  const flashRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cleanupFns = [];

    function buildGraph(canvas, opts) {
      if (!canvas) return;
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
      camera.position.z = opts.camZ;

      function resize() {
        const w = canvas.clientWidth, h = canvas.clientHeight;
        renderer.setSize(w, h, false);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      }
      resize();
      window.addEventListener('resize', resize);
      cleanupFns.push(() => window.removeEventListener('resize', resize));

      const nodeDefs = opts.nodeDefs;
      const nodes = nodeDefs.map((d) => {
        const geo = new THREE.SphereGeometry(d.r, 16, 16);
        const mat = new THREE.MeshBasicMaterial({ color: d.color });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(d.x, d.y, d.z);
        const haloGeo = new THREE.SphereGeometry(d.r * 2.2, 16, 16);
        const haloMat = new THREE.MeshBasicMaterial({ color: d.color, transparent: true, opacity: 0.08 });
        mesh.add(new THREE.Mesh(haloGeo, haloMat));
        return mesh;
      });

      const group = new THREE.Group();
      nodes.forEach((n) => group.add(n));
      scene.add(group);

      const edgeLines = [];
      opts.edges.forEach(([a, b], i) => {
        const points = [nodes[a].position, nodes[b].position];
        const geo = new THREE.BufferGeometry().setFromPoints(points);
        const mat = new THREE.LineBasicMaterial({ color: opts.edgeColor, transparent: true, opacity: 0 });
        const line = new THREE.Line(geo, mat);
        group.add(line);
        edgeLines.push({ mat, delay: i * opts.bootStagger });
      });

      let t0 = performance.now();
      let mouseX = 0, mouseY = 0;
      let rafId;

      if (opts.parallax) {
        const onMove = (e) => {
          mouseX = e.clientX / window.innerWidth - 0.5;
          mouseY = e.clientY / window.innerHeight - 0.5;
        };
        window.addEventListener('mousemove', onMove);
        cleanupFns.push(() => window.removeEventListener('mousemove', onMove));
      }

      function animate(now) {
        const elapsed = now - t0;
        edgeLines.forEach((e) => {
          if (!reduceMotion) {
            const p = Math.min(Math.max((elapsed - e.delay) / 500, 0), 1);
            e.mat.opacity = p * opts.edgeOpacity;
          } else {
            e.mat.opacity = opts.edgeOpacity;
          }
        });
        if (!reduceMotion) {
          group.rotation.y = elapsed * 0.00012 + mouseX * 0.4;
          group.rotation.x = mouseY * 0.25;
        }
        renderer.render(scene, camera);
        rafId = requestAnimationFrame(animate);
      }
      rafId = requestAnimationFrame(animate);
      cleanupFns.push(() => cancelAnimationFrame(rafId));
    }

    buildGraph(heroCanvasRef.current, {
      camZ: 6.5, bootStagger: 90, edgeOpacity: 0.35, edgeColor: 0x5b8cff, parallax: true,
      nodeDefs: [
        { x: 0, y: 0, z: 0, r: 0.22, color: 0xff8a3d },
        { x: -1.9, y: 1.1, z: -0.4, r: 0.11, color: 0x5b8cff },
        { x: 1.9, y: 1.0, z: 0.3, r: 0.11, color: 0x5b8cff },
        { x: 2.1, y: -1.1, z: -0.3, r: 0.11, color: 0x5b8cff },
        { x: -2.1, y: -1.2, z: 0.4, r: 0.11, color: 0x5b8cff },
        { x: 0, y: 2.0, z: 0.2, r: 0.08, color: 0x8792a6 },
        { x: 0, y: -2.1, z: -0.2, r: 0.08, color: 0x8792a6 },
      ],
      edges: [[0,1],[0,2],[0,3],[0,4],[1,5],[2,5],[3,6],[4,6],[1,2],[3,4]],
    });

    buildGraph(featureCanvasRef.current, {
      camZ: 5.2, bootStagger: 130, edgeOpacity: 0.28, edgeColor: 0xff8a3d, parallax: false,
      nodeDefs: [
        { x: -1.4, y: 0.6, z: 0, r: 0.09, color: 0x5b8cff },
        { x: 0.2, y: 1.2, z: 0.3, r: 0.09, color: 0x5b8cff },
        { x: 1.5, y: 0.3, z: -0.2, r: 0.09, color: 0xff8a3d },
        { x: 0.9, y: -1.0, z: 0.2, r: 0.09, color: 0x5b8cff },
        { x: -0.8, y: -1.2, z: -0.3, r: 0.09, color: 0x5b8cff },
        { x: -1.6, y: -0.2, z: 0.4, r: 0.07, color: 0x8792a6 },
      ],
      edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[0,3],[1,4]],
    });

    // cube tilt + click flash
    const cards = Array.from(document.querySelectorAll('.cube-card'));
    cards.forEach((card) => {
      const onMove = (e) => {
        if (reduceMotion) return;
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `rotateY(${px * 16}deg) rotateX(${-py * 16}deg) scale(1.03)`;
      };
      const onLeave = () => { card.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)'; };
      const onClick = (e) => {
        e.preventDefault();
        const r = card.getBoundingClientRect();
        const flashEl = flashRef.current;
        if (flashEl) {
          flashEl.style.setProperty('--fx', `${r.left + r.width / 2}px`);
          flashEl.style.setProperty('--fy', `${r.top + r.height / 2}px`);
          flashEl.classList.remove('go');
          void flashEl.offsetWidth;
          flashEl.classList.add('go');
        }
        const href = card.getAttribute('href');
        setTimeout(() => { if (href && href !== '#') window.location.href = href; }, 260);
      };
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
      card.addEventListener('click', onClick);
      cleanupFns.push(() => {
        card.removeEventListener('mousemove', onMove);
        card.removeEventListener('mouseleave', onLeave);
        card.removeEventListener('click', onClick);
      });
    });

    return () => cleanupFns.forEach((fn) => fn());
  }, []);

  const posts = [
    { date: '08.31.26', img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80', glow: 'amber', title: "Agentic Coding Terms You'll Actually Run Into (A Working Glossary)", desc: 'Agent loop, MCP, context window, sandboxing — defined in plain language.' },
    { date: '08.29.26', img: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=900&q=80', glow: 'blue', title: 'Get More Out of Your AI Coding Agent: A Workflow Guide', desc: 'A handful of habits change the quality of what you get back completely.' },
    { date: '08.24.26', img: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=900&q=80', glow: 'amber', title: 'The Security Risks of AI Coding Agents Nobody Warned You About', desc: 'Slopsquatting, prompt injection, and secret leaks — and how to guard against each.' },
    { date: '08.18.26', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80', glow: 'blue', title: 'Claude Code vs. Cursor vs. Windsurf vs. Copilot', desc: "A decision framework instead of another ranked list." },
    { date: '08.10.26', img: 'https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&w=900&q=80', glow: 'amber', title: 'What Is an AI Coding Agent? A Plain-English Guide', desc: "Here's what actually changed since plain autocomplete." },
  ];

  return (
    <>
      <Head>
        <title>AgentStack — The AI Coding Agents Blog</title>
        <meta name="description" content="Field-tested guides on Claude Code, Cursor, Windsurf, and the rest of the agentic coding stack — from setup to security." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </Head>

      <div className="bg-grid"></div>
      <div
