import Head from 'next/head';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { getSortedPostsData } from '../lib/posts';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, ORGANIZATION } from '../lib/site';

// Curated art for the launch set of posts. New posts that aren't in
// this map fall back to FALLBACK_IMG below, so adding a post never
// breaks the homepage -- it just won't have bespoke art until you add
// an entry here.
const IMG_MAP = {
  'agentic-coding-glossary': 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80',
  'ai-coding-agent-workflow-guide': 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=900&q=80',
  'ai-coding-agent-security-risks': 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=900&q=80',
  'claude-code-vs-cursor-vs-windsurf-vs-copilot': 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
  'what-is-an-ai-coding-agent': 'https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&w=900&q=80',
  'anatomy-of-an-agent-stack': 'https://picsum.photos/id/180/900/600',
  'why-agents-need-long-term-memory': 'https://picsum.photos/id/1005/900/600',
  'tool-calling-giving-agents-hands': 'https://picsum.photos/id/60/900/600',
  'when-one-agent-isnt-enough': 'https://picsum.photos/id/1015/900/600',
  'watching-agents-think': 'https://picsum.photos/id/96/900/600',
  'guardrails-without-gridlock': 'https://picsum.photos/id/201/900/600',
  'agentic-rag-vs-traditional-rag': 'https://picsum.photos/id/48/900/600',
  'grading-agents-on-more-than-accuracy': 'https://picsum.photos/id/119/900/600',
  'rise-of-autonomous-coding-agents': 'https://picsum.photos/id/2/900/600',
  'cost-control-for-always-on-agents': 'https://picsum.photos/id/160/900/600',
  // Claude Code cluster
  'claude-code': 'https://picsum.photos/id/0/900/600',
  'claude-code-install': 'https://picsum.photos/id/3/900/600',
  'claude-code-tutorial': 'https://picsum.photos/id/4/900/600',
  'claude-code-commands': 'https://picsum.photos/id/6/900/600',
  'claude-code-skills': 'https://picsum.photos/id/9/900/600',
  'claude-code-hooks': 'https://picsum.photos/id/20/900/600',
  'claude-code-mcp': 'https://picsum.photos/id/21/900/600',
  'claude-code-subagents': 'https://picsum.photos/id/26/900/600',
  'claude-code-security': 'https://picsum.photos/id/28/900/600',
  // Cursor cluster
  'cursor': 'https://picsum.photos/id/30/900/600',
  'cursor-tutorial': 'https://picsum.photos/id/36/900/600',
  'cursor-agent-mode': 'https://picsum.photos/id/37/900/600',
  'cursor-rules': 'https://picsum.photos/id/40/900/600',
  'cursor-mcp': 'https://picsum.photos/id/42/900/600',
  'cursor-security': 'https://picsum.photos/id/43/900/600',
  // Codex cluster
  'openai-codex': 'https://picsum.photos/id/46/900/600',
  'codex-cli': 'https://picsum.photos/id/49/900/600',
  'codex-vs-claude-code': 'https://picsum.photos/id/51/900/600',
};
const FALLBACK_IMG = 'https://picsum.photos/id/119/900/600';

export default function Home({ guidePosts, fieldNotePosts }) {
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

    const cards = Array.from(document.querySelectorAll('.cube-card'));
    cards.forEach((card) => {
      const onMove = (e) => {
        if (reduceMotion) return;
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = 'rotateY(' + (px * 16) + 'deg) rotateX(' + (-py * 16) + 'deg) scale(1.03)';
      };
      const onLeave = () => { card.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)'; };
      const onClick = (e) => {
        e.preventDefault();
        const r = card.getBoundingClientRect();
        const flashEl = flashRef.current;
        if (flashEl) {
          flashEl.style.setProperty('--fx', (r.left + r.width / 2) + 'px');
          flashEl.style.setProperty('--fy', (r.top + r.height / 2) + 'px');
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

  const posts = guidePosts;
  const fieldNotes = fieldNotePosts;

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
  };
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: ORGANIZATION.name,
    url: ORGANIZATION.url,
    logo: ORGANIZATION.logo,
  };

  return (
    <>
      <Head>
        <title>AgentStack - The AI Coding Agents Blog</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <link rel="canonical" href={SITE_URL + '/'} />
        <meta name="google-site-verification" content="siVuAlWtY2uDcJtA_iRN1aO8huUyJsADHnEGHCoYQJ0" />

        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="AgentStack - The AI Coding Agents Blog" />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:url" content={SITE_URL + '/'} />
        <meta property="og:image" content={SITE_URL + '/favicon.svg'} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AgentStack - The AI Coding Agents Blog" />
        <meta name="twitter:description" content={SITE_DESCRIPTION} />
        <meta name="twitter:image" content={SITE_URL + '/favicon.svg'} />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </Head>

      <div className="bg-grid"></div>
      <div className="click-flash" ref={flashRef}></div>

      <nav>
        <div className="nav-inner">
          <div className="logo">
            <div className="logo-mark"><span></span><span></span><span></span></div>
            AgentStack
          </div>
          <div className="nav-links">
            <a href="#guides">Guides</a>
            <a href="#notes">Field Notes</a>
            <a href="#" className="nav-cta">Subscribe</a>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div>
          <div className="kicker"><span className="dot"></span> No hype. No affiliate rankings. Just field notes.</div>
          <h1>Everything you need to actually <span className="accent">run</span> AI coding agents.</h1>
          <p className="lede">Field-tested guides on Claude Code, Cursor, Windsurf, and the rest of the agentic coding stack, from first setup to production security.</p>
          <div className="hero-ctas">
            <a href="#guides" className="btn-primary">Read the guides</a>
            <a href="#notes" className="btn-secondary">Field Notes</a>
          </div>
        </div>
        <div className="hero-canvas-wrap">
          <canvas id="hero-canvas" ref={heroCanvasRef}></canvas>
          <div className="hero-canvas-label"><span className="pulse"></span> the agent loop, visualized</div>
        </div>
      </section>

      <div className="stat-strip">
        <div className="wrap">
          <div className="stat"><div className="num">5</div><div className="lbl">field guides</div></div>
          <div className="stat"><div className="num">4</div><div className="lbl">agents covered</div></div>
          <div className="stat"><div className="num">weekly</div><div className="lbl">new guides</div></div>
          <div className="stat"><div className="num">0</div><div className="lbl">affiliate links</div></div>
        </div>
      </div>

      <section className="section" id="guides">
        <div className="wrap">
          <div className="section-head">
            <div>
              <h2>Latest guides</h2>
              <p>Ordered as published. Read the newest first, this stack changes fast.</p>
            </div>
          </div>

          <div className="cube-grid">
            {posts.map((p, i) => (
              <a href={p.href} className="cube-card" data-glow={p.glow} style={{ '--i': i }} key={p.title}>
                <div className="cube-face">
                  <img className="cube-img" src={p.img} alt={p.title} loading="lazy" />
                  <div className="cube-overlay"></div>
                  <div className="cube-shine"></div>
                  <div className="cube-content">
                    <div className="pd">{p.date} - {p.readingTime} min</div>
                    <h4>{p.title}</h4>
                    <p>{p.desc}</p>
                  </div>
                  <div className="cube-open">Open</div>
                </div>
              </a>
            ))}
          </div>

          <canvas id="feature-canvas" ref={featureCanvasRef} style={{ display: 'none' }}></canvas>
        </div>
      </section>

      <section className="section" id="notes">
        <div className="wrap">
          <div className="section-head">
            <div>
              <h2>Field Notes</h2>
              <p>Ten dispatches on the layers of an agent stack: memory, tools, orchestration, and the guardrails in between.</p>
            </div>
          </div>

          <div className="cube-grid">
            {fieldNotes.map((n, i) => (
              <a href={n.href} className="cube-card" data-glow={i % 2 === 0 ? 'amber' : 'blue'} style={{ '--i': i }} key={n.title}>
                <article className="cube-face">
                  <img className="cube-img" src={n.img} alt={n.title} loading="lazy" />
                  <div className="cube-overlay"></div>
                  <div className="cube-shine"></div>
                  <div className="cube-content">
                    <div className="pd">{n.tag}</div>
                    <h4>{n.title}</h4>
                    <p>{n.desc}</p>
                  </div>
                  <div className="cube-open">Open</div>
                </article>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <p>(c) 2026 AgentStack. Built with Next.js.</p>
          <div className="fl">
            <a href="#guides">Guides</a>
            <a href="#notes">Field Notes</a>
            <a href="#">RSS</a>
          </div>
        </div>
      </footer>
    </>
  );
}

function formatShortDate(dateStr) {
  const d = new Date(dateStr);
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(d.getUTCDate()).padStart(2, '0');
  const yy = String(d.getUTCFullYear()).slice(-2);
  return `${mm}.${dd}.${yy}`;
}

export async function getStaticProps() {
  const allPosts = getSortedPostsData();

  const toCard = (post, i) => ({
    date: formatShortDate(post.date),
    img: IMG_MAP[post.slug] || FALLBACK_IMG,
    glow: i % 2 === 0 ? 'amber' : 'blue',
    tag: (post.tags && post.tags[0] ? post.tags[0] : 'guide').toUpperCase(),
    title: post.title,
    desc: post.excerpt,
    href: `/posts/${post.slug}`,
    readingTime: post.readingTime,
  });

  const guidePosts = allPosts
    .filter((p) => p.section === 'guide')
    .map(toCard);

  const fieldNotePosts = allPosts
    .filter((p) => p.section !== 'guide')
    .map(toCard);

  return {
    props: { guidePosts, fieldNotePosts },
  };
}
