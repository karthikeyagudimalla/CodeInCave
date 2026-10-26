import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import "./App.css";

const services = [
  { id: "01", title: "Custom websites", category: "WEB DESIGN & DEVELOPMENT", short: "Professional, memorable websites that give your business a stronger digital presence.", detail: "We turn your ideas into fast, responsive websites shaped around your brand, your audience, and the goals that matter to your business.", tags: ["Web design", "Web development", "Digital presence"], symbol: "browser" },
  { id: "02", title: "Apps", category: "AI-POWERED APPLICATIONS", short: "Thoughtful applications that make everyday work simpler and more useful.", detail: "From business apps to AI-powered experiences, we build practical products around real needs—with intuitive flows, reliable engineering, and room to scale.", tags: ["AI applications", "Business apps", "Scalable products"], symbol: "app" },
  { id: "03", title: "Custom software", category: "SOFTWARE SOLUTIONS", short: "Purpose-built software that solves real challenges and fits your business.", detail: "We engineer reliable, efficient software around the way your team works—helping streamline operations, connect systems, and create space to grow.", tags: ["Business software", "Workflow tools", "Integrations"], symbol: "code" },
];

const demos = {
  overview: { eyebrow: "BUSINESS APP / OVERVIEW", title: "Everything,\nin one place.", bars: [56, 84, 68, 96, 76, 100, 80] },
  insights: { eyebrow: "BUSINESS APP / INSIGHTS", title: "See the shape\nof your business.", bars: [38, 65, 56, 82, 71, 94, 100] },
  workflow: { eyebrow: "BUSINESS APP / WORKFLOW", title: "Less busywork.\nMore momentum.", bars: [48, 72, 60, 89, 84, 92, 100] },
};


const phases = [
  { id: "01", title: "Understand the challenge", label: "DISCOVER", body: "We learn about your business, your people, and the real-world challenge your idea is here to solve.", output: "A shared goal and clear direction" },
  { id: "02", title: "Shape a practical solution", label: "DESIGN", body: "We explore the right product, map the experience, and make the important decisions clear before we build.", output: "A focused plan for the right solution" },
  { id: "03", title: "Engineer it together", label: "ENGINEER", body: "We combine technical excellence with creative problem-solving, sharing progress and refining the details with you.", output: "Reliable software shaped around your needs" },
  { id: "04", title: "Launch and grow", label: "SHIP", body: "We prepare your solution for real use, then help you build on a strong foundation as your business evolves.", output: "A useful product, ready to scale" },
];

const faqs = [
  { question: "What does CodeInCave build?", answer: "We build professional websites, business applications, custom software, AI-powered applications, and scalable digital products designed to solve real-world challenges." },
  { question: "Can you help turn an idea into a product?", answer: "Yes. We work with you from the first idea through design, engineering, and launch to create a solution grounded in your goals and the needs of its users." },
  { question: "Can you improve software we already have?", answer: "Yes. We can make an existing product more useful, streamline a workflow, connect systems, or add new capabilities without starting over." },
  { question: "How do we get started?", answer: "Tell us about your idea, your business, or a challenge you want to solve. We will ask a few useful questions and find a clear next step together." },
  { question: "How do you make sure a solution can grow with us?", answer: "We focus on reliable engineering and practical foundations, so your product can adapt as your team, operations, and ambitions grow." },
];
function Core({ energized }) {
  const group = useRef(null);
  const burst = useRef(null);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useFrame(({ clock, pointer }, delta) => {
    if (!group.current) return;
    const t = clock.elapsedTime;
    const ease = Math.min(1, delta * 2.2);
    if (burst.current) {
      const target = energized ? 1 : 0.001;
      burst.current.scale.setScalar(burst.current.scale.x + (target - burst.current.scale.x) * Math.min(1, delta * 4));
      burst.current.rotation.y += delta * (energized ? 0.24 : -0.08);
    }
    if (!reducedMotion.current) {
      group.current.rotation.x += (pointer.y * 0.2 - group.current.rotation.x) * ease;
      group.current.rotation.y += (pointer.x * 0.32 + t * (energized ? 0.18 : 0.06) - group.current.rotation.y) * ease;
      group.current.rotation.z = Math.sin(t * 0.22) * 0.025;
      group.current.position.y = Math.sin(t * 0.65) * 0.045;
    } else {
      group.current.rotation.y = 0.22;
    }
  });

  return (
    <group ref={group}>
      {/* Floating product tiles */}
      <mesh position={[-1.34, -0.35, -0.32]} rotation={[0.08, 0.28, 0.12]}>
        <boxGeometry args={[0.68, 0.9, 0.12]} />
        <meshPhysicalMaterial color="#171629" emissive="#16324a" emissiveIntensity={0.18} metalness={0.45} roughness={0.24} />
        <Edges scale={1.01} color="#f2ae3b" threshold={1} />
      </mesh>
      <mesh position={[-1.34, -0.28, -0.245]} rotation={[0.08, 0.28, 0.12]}>
        <boxGeometry args={[0.42, 0.035, 0.012]} /><meshBasicMaterial color="#16324a" />
      </mesh>
      <mesh position={[-1.34, -0.39, -0.245]} rotation={[0.08, 0.28, 0.12]}>
        <boxGeometry args={[0.3, 0.025, 0.012]} /><meshBasicMaterial color="#8a8f84" />
      </mesh>
      <mesh position={[1.28, 0.38, -0.3]} rotation={[-0.08, -0.3, -0.12]}>
        <boxGeometry args={[0.73, 0.6, 0.12]} />
        <meshPhysicalMaterial color="#101b2a" emissive="#16324a" emissiveIntensity={0.17} metalness={0.4} roughness={0.23} />
        <Edges scale={1.01} color="#f2ae3b" threshold={1} />
      </mesh>
      <mesh position={[1.28, 0.36, -0.225]} rotation={[-0.08, -0.3, -0.12]}>
        <boxGeometry args={[0.43, 0.08, 0.012]} /><meshBasicMaterial color="#f2ae3b" />
      </mesh>
      <mesh position={[1.28, 0.2, -0.225]} rotation={[-0.08, -0.3, -0.12]}>
        <boxGeometry args={[0.3, 0.025, 0.012]} /><meshBasicMaterial color="#a5b3a5" />
      </mesh>

      {/* Main 3D code workspace */}
      <group>
        <mesh>
          <boxGeometry args={[2.12, 1.58, 0.2]} />
          <meshPhysicalMaterial color="#121722" emissive="#0e1826" emissiveIntensity={0.18} metalness={0.45} roughness={0.22} clearcoat={0.8} />
          <Edges scale={1.006} color="#16324a" threshold={1} />
        </mesh>
        <mesh position={[0, 0.62, 0.108]}>
          <boxGeometry args={[1.97, 0.055, 0.025]} /><meshBasicMaterial color="#353e4a" />
        </mesh>
        {[-0.86, -0.73, -0.6].map((x, i) => (
          <mesh key={x} position={[x, 0.62, 0.13]}>
            <sphereGeometry args={[0.025, 12, 12]} /><meshBasicMaterial color={i === 0 ? "#16324a" : i === 1 ? "#f2ae3b" : "#f2ae3b"} />
          </mesh>
        ))}
        <mesh position={[-0.63, 0.38, 0.118]}>
          <boxGeometry args={[0.6, 0.026, 0.018]} /><meshBasicMaterial color="#747b6f" />
        </mesh>
        <mesh position={[0.46, 0.38, 0.118]}>
          <boxGeometry args={[0.42, 0.026, 0.018]} /><meshBasicMaterial color="#f2ae3b" />
        </mesh>

        {/* Code brackets and slash as dimensional geometry */}
        <group position={[0, -0.02, 0.17]}>
          <mesh position={[-0.44, 0, 0]} rotation={[0, 0, 0.62]}>
            <boxGeometry args={[0.34, 0.065, 0.075]} /><meshPhysicalMaterial color="#16324a" emissive="#16324a" emissiveIntensity={0.28} metalness={0.35} roughness={0.2} />
          </mesh>
          <mesh position={[-0.44, 0, 0]} rotation={[0, 0, -0.62]}>
            <boxGeometry args={[0.34, 0.065, 0.075]} /><meshPhysicalMaterial color="#16324a" emissive="#16324a" emissiveIntensity={0.28} metalness={0.35} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0, 0]} rotation={[0, 0, 0.34]}>
            <boxGeometry args={[0.065, 0.62, 0.075]} /><meshPhysicalMaterial color="#f2ae3b" emissive="#f2ae3b" emissiveIntensity={0.3} metalness={0.35} roughness={0.2} />
          </mesh>
          <mesh position={[0.44, 0, 0]} rotation={[0, 0, -0.62]}>
            <boxGeometry args={[0.34, 0.065, 0.075]} /><meshPhysicalMaterial color="#f2ae3b" emissive="#f2ae3b" emissiveIntensity={0.28} metalness={0.35} roughness={0.2} />
          </mesh>
          <mesh position={[0.44, 0, 0]} rotation={[0, 0, 0.62]}>
            <boxGeometry args={[0.34, 0.065, 0.075]} /><meshPhysicalMaterial color="#f2ae3b" emissive="#f2ae3b" emissiveIntensity={0.28} metalness={0.35} roughness={0.2} />
          </mesh>
        </group>

        {[[-0.52, -0.48, 0.12, 0.44, "#16324a"], [0.18, -0.48, 0.12, 0.62, "#626d80"], [-0.38, -0.59, 0.12, 0.5, "#f2ae3b"], [0.34, -0.59, 0.12, 0.42, "#626d80"]].map(([x, y, z, width, color], i) => (
          <mesh key={i} position={[x, y, z]}>
            <boxGeometry args={[width, 0.022, 0.02]} /><meshBasicMaterial color={color} />
          </mesh>
        ))}
      </group>

      {/* Orbit lines connect product, code, and interface layers */}
      <mesh rotation={[0.82, 0.2, -0.38]}>
        <torusGeometry args={[1.72, 0.009, 8, 140]} /><meshBasicMaterial color="#f2ae3b" transparent opacity={0.8} />
      </mesh>
      <mesh rotation={[-0.62, 0.7, 0.72]}>
        <torusGeometry args={[1.88, 0.007, 8, 140]} /><meshBasicMaterial color="#f2ae3b" transparent opacity={0.64} />
      </mesh>
      <mesh position={[0.96, 0.98, 0.25]}>
        <icosahedronGeometry args={[0.055, 1]} /><meshBasicMaterial color="#f2ae3b" />
      </mesh>
      <mesh position={[-1.2, -0.94, -0.1]}>
        <icosahedronGeometry args={[0.045, 1]} /><meshBasicMaterial color="#f2ae3b" />
      </mesh>
      <group ref={burst} scale={0.001}>
        {Array.from({ length: 30 }, (_, i) => {
          const phi = Math.acos(-1 + (2 * (i + 0.5)) / 30);
          const theta = Math.PI * (1 + Math.sqrt(5)) * i;
          const radius = 1.8 + (i % 4) * 0.12;
          const position = [radius * Math.sin(phi) * Math.cos(theta), radius * Math.sin(phi) * Math.sin(theta), radius * Math.cos(phi)];
          const colors = ["#16324a", "#f2ae3b", "#f2ae3b", "#fff0cd"];
          return <mesh key={i} position={position} scale={0.035 + (i % 3) * 0.012}><icosahedronGeometry args={[1, 0]} /><meshBasicMaterial color={colors[i % colors.length]} transparent opacity={energized ? 0.95 : 0} /></mesh>;
        })}
      </group>
    </group>
  );
}
function ProcessObject() {
  const group = useRef(null);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useFrame(({ clock, pointer }, delta) => {
    if (!group.current || reducedMotion.current) return;
    const t = clock.elapsedTime;
    const ease = Math.min(1, delta * 2.5);
    group.current.rotation.x += (pointer.y * 0.35 - group.current.rotation.x) * ease;
    group.current.rotation.y += (pointer.x * 0.42 + t * 0.14 - group.current.rotation.y) * ease;
    group.current.position.y = Math.sin(t * 1.1) * 0.08;
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[0.43, 1]} />
        <meshPhysicalMaterial color="#86c5ff" emissive="#255986" emissiveIntensity={0.34} metalness={0.58} roughness={0.2} clearcoat={0.85} />
        <Edges scale={1.02} color="#eaf5ff" threshold={1} />
      </mesh>
      <mesh scale={0.72} rotation={[0.3, 0.18, 0]}>
        <icosahedronGeometry args={[0.43, 1]} /><meshBasicMaterial color="#f2ae3b" wireframe transparent opacity={0.36} />
      </mesh>
      <mesh rotation={[0.9, 0.3, -0.5]}>
        <torusGeometry args={[0.7, 0.012, 8, 96]} /><meshBasicMaterial color="#f2ae3b" />
      </mesh>
      <mesh rotation={[-0.4, 0.8, 0.4]}>
        <torusGeometry args={[0.83, 0.008, 8, 96]} /><meshBasicMaterial color="#86c5ff" transparent opacity={0.65} />
      </mesh>
      <mesh position={[0.59, 0.33, 0.12]}>
        <icosahedronGeometry args={[0.065, 1]} /><meshBasicMaterial color="#ffdf9b" />
      </mesh>
      <mesh position={[-0.67, -0.18, -0.08]}>
        <icosahedronGeometry args={[0.045, 1]} /><meshBasicMaterial color="#86c5ff" />
      </mesh>
    </group>
  );
}
function handleTilt(event) {
  if (event.pointerType === "touch" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const rect = event.currentTarget.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width;
  const y = (event.clientY - rect.top) / rect.height;
  event.currentTarget.style.setProperty("--rx", `${(0.5 - y) * 5}deg`);
  event.currentTarget.style.setProperty("--ry", `${(x - 0.5) * 7}deg`);
  event.currentTarget.style.setProperty("--mx", `${x * 100}%`);
  event.currentTarget.style.setProperty("--my", `${y * 100}%`);
}

function resetTilt(event) {
  event.currentTarget.style.setProperty("--rx", "0deg");
  event.currentTarget.style.setProperty("--ry", "0deg");
}
function PointerHalo() {
  const cursor = useRef(null);

  useEffect(() => {
    const node = cursor.current;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!node || !finePointer) return;
    document.documentElement.classList.add("custom-cursor");
    let activeTextElement = null;
    const releaseTextElement = () => {
      if (!activeTextElement) return;
      const previousTextElement = activeTextElement;
      previousTextElement.classList.remove("cursor-text-active");
      previousTextElement.classList.add("cursor-text-returning");
      window.setTimeout(() => previousTextElement.classList.remove("cursor-text-returning"), 220);
      activeTextElement = null;
    };

    const move = (event) => {
      node.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      node.classList.add("is-active");
      document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
      const hoveredElement = document.elementFromPoint(event.clientX, event.clientY);
      const textElement = hoveredElement?.closest?.("h1,h2,h3,h4,p,a,button,li,label,b,strong,em,span,small");
      const hasText = textElement?.textContent?.trim();
      const nextTextElement = hasText ? textElement : null;
      if (nextTextElement !== activeTextElement) {
        releaseTextElement();
        activeTextElement = nextTextElement;
        activeTextElement?.classList.remove("cursor-text-returning");
        activeTextElement?.classList.add("cursor-text-active");
      }
    };
    const over = (event) => {
      const target = event.target.closest?.("[data-cursor]");
      node.dataset.label = target?.dataset.cursor || "";
      node.classList.toggle("is-over", Boolean(target));
    };
    const leave = () => {
      releaseTextElement();
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    window.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerleave", leave);
      activeTextElement?.classList.remove("cursor-text-active");
      document.documentElement.classList.remove("custom-cursor");
    };
  }, []);

  return <div ref={cursor} className="pointer-halo" aria-hidden="true"><span className="cursor-glyph">&lt;/&gt;</span><i className="cursor-light" /></div>;
}

function ReactiveWordmark() {
  const letters = [..."CodeInCave"];
  const [lit, setLit] = useState([]);
  const [active, setActive] = useState(null);
  const resetTimer = useRef(null);

  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  const visitLetter = (index) => {
    window.clearTimeout(resetTimer.current);
    setLit((current) => current.includes(index) ? current : [...current, index]);
    setActive(index);
  };

  const waveLetters = (event) => {
    const frame = event.currentTarget;
    const bounds = frame.getBoundingClientRect();
    frame.style.setProperty("--word-x", `${((event.clientX - bounds.left) / bounds.width) * 100}%`);
    frame.style.setProperty("--word-y", `${((event.clientY - bounds.top) / bounds.height) * 100}%`);
    let nearestIndex = -1;
    let nearestDistance = Infinity;
    frame.querySelectorAll(".brand-letter").forEach((letter, index) => {
      const box = letter.getBoundingClientRect();
      const dx = event.clientX - (box.left + box.width / 2);
      const dy = (event.clientY - (box.top + box.height / 2)) * 0.9;
      const distance = Math.hypot(dx, dy);
      const strength = Math.max(0, 1 - distance / 285);
      letter.style.setProperty("--lift", `${-22 * strength}px`);
      letter.style.setProperty("--scale", `${1 + 0.17 * strength}`);
      letter.style.setProperty("--tilt", `${Math.max(-12, Math.min(12, dx * 0.055 * strength))}deg`);
      letter.style.setProperty("--glow", `${strength * 28}px`);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });
    if (nearestIndex >= 0) setActive(nearestIndex);
  };

  const fadeLetters = (event) => {
    event.currentTarget.querySelectorAll(".brand-letter").forEach((letter) => {
      letter.style.removeProperty("--lift");
      letter.style.removeProperty("--scale");
      letter.style.removeProperty("--tilt");
      letter.style.removeProperty("--glow");
    });
    setActive(null);
    resetTimer.current = window.setTimeout(() => setLit([]), 650);
  };

  return (
    <section className="brand-interaction reveal" aria-label="CodeInCave cursor animation">
      <div className="wordmark-meta"><span>NAME / 001</span><span>MOVE ACROSS THE LETTERS</span></div>
      <div className="wordmark-frame" onPointerMove={waveLetters} onPointerLeave={fadeLetters}>
        <div className="brand-word" role="img" aria-label="CodeInCave">
          {letters.map((letter, index) => <span aria-hidden="true" className={`brand-letter${lit.includes(index) ? " is-lit" : ""}${active === index ? " is-active" : ""}`} onPointerEnter={() => visitLetter(index)} onPointerDown={() => visitLetter(index)} style={{ "--letter-index": index }} key={`${letter}-${index}`}>{letter}</span>)}
        </div>
      </div>
      <div className="wordmark-foot"><span>IDEAS IN MOTION</span><span>CODEINCAVE / DIGITAL STUDIO</span></div>
    </section>
  );
}
function App() {
  const [energized, setEnergized] = useState(false);
  const [openService, setOpenService] = useState(null);
  const [activeDemo, setActiveDemo] = useState("overview");
  const [activePhase, setActivePhase] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [islandOpen, setIslandOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState("Let's discuss");
  const [briefStatus, setBriefStatus] = useState("");
  const [briefFallbackHref, setBriefFallbackHref] = useState("");
  const islandRef = useRef(null);
  const manifestoHeadingRef = useRef(null);
  const demo = demos[activeDemo];

  useEffect(() => {
    const closeOnOutside = (event) => {
      if (!islandRef.current?.contains(event.target)) setIslandOpen(false);
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setIslandOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    if (window.location.hash) {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    }
    window.scrollTo(0, 0);
    const resetAtPaint = window.requestAnimationFrame(() => window.scrollTo(0, 0));
    return () => {
      window.cancelAnimationFrame(resetAtPaint);
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  const handleBriefSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const briefDetails = {
      name: form.get("name"),
      email: form.get("email"),
      company: form.get("company"),
      budget: selectedBudget,
      project: form.get("project"),
      website: form.get("website"),
    };
    if (briefDetails.website) return;

    const mailSubject = `New project inquiry from ${briefDetails.name}`;
    const mailBody = [
      "Hello CodeInCave team,",
      "",
      "I'd like to discuss a project with you. Here are my details:",
      "",
      `Name: ${briefDetails.name}`,
      `Email: ${briefDetails.email}`,
      `Company / project: ${briefDetails.company || "Not provided"}`,
      `Budget range: ${briefDetails.budget}`,
      "",
      "Project brief:",
      briefDetails.project,
      "",
      "I look forward to hearing from you.",
      "",
      "Best,",
      briefDetails.name,
    ].join("\n");
    const recipient = "codeincavedigitalsolutions@gmail.com";
    const encodedSubject = encodeURIComponent(mailSubject);
    const encodedBody = encodeURIComponent(mailBody);
    const draftHref = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${encodedSubject}&body=${encodedBody}`;
    setBriefFallbackHref(draftHref);
    setBriefStatus("Your email draft is ready. Review the details and tap Send to submit your brief.");

    const userAgent = navigator.userAgent;
    const isIOS = /iPhone|iPad|iPod/i.test(userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const isAndroid = /Android/i.test(userAgent);

    if (isIOS) {
      let gmailAppOpened = false;
      const trackAppLaunch = () => {
        if (document.hidden) gmailAppOpened = true;
      };
      document.addEventListener("visibilitychange", trackAppLaunch);
      window.location.href = `googlegmail:///co?to=${encodeURIComponent(recipient)}&subject=${encodedSubject}&body=${encodedBody}`;
      window.setTimeout(() => {
        document.removeEventListener("visibilitychange", trackAppLaunch);
        if (!gmailAppOpened && !document.hidden) window.location.assign(draftHref);
      }, 1200);
    } else if (isAndroid) {
      window.location.href = `intent:${encodeURIComponent(recipient)}?subject=${encodedSubject}&body=${encodedBody}#Intent;scheme=mailto;package=com.google.android.gm;S.browser_fallback_url=${encodeURIComponent(draftHref)};end`;
    } else {
      window.location.assign(draftHref);
    }
  };

  const handleWhatsAppBrief = (event) => {
    const form = event.currentTarget.form;
    if (!form?.reportValidity()) return;
    const formData = new FormData(form);
    if (formData.get("website")) return;

    const message = [
      "Hello CodeInCave team,",
      "",
      "I'd like to discuss a project with you. Here are my details:",
      "",
      `Name: ${formData.get("name")}`,
      `Email: ${formData.get("email")}`,
      `Company / project: ${formData.get("company") || "Not provided"}`,
      `Budget range: ${selectedBudget}`,
      "",
      "Project brief:",
      formData.get("project"),
    ].join("\n");
    const whatsappNumber = "918143120418";
    const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappHref, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.documentElement.classList.add("js-ready");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    const updateScroll = () => {
      const root = document.documentElement;
      const maxScroll = root.scrollHeight - window.innerHeight;
      root.style.setProperty("--scroll-progress", `${maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0}%`);
      const sections = ["top", "services", "why-us", "approach", "process", "work", "faq", "contact"];
      const active = [...sections].reverse().find((id) => document.getElementById(id)?.getBoundingClientRect().top <= window.innerHeight * 0.42);
      document.querySelectorAll(".navigation a[href^=\"#\"]").forEach((link) => {
        const selected = link.getAttribute("href") === `#${active}`;
        link.classList.toggle("is-current", selected);
        if (selected) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    };
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateScroll);
      document.documentElement.classList.remove("js-ready");
    };
  }, []);

  useEffect(() => {
    const heading = manifestoHeadingRef.current;
    if (!heading || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const duration = 900;
    const animations = [...heading.querySelectorAll(".manifesto-word")].map((word, index) => {
      const scatterX = ((index * 53) % 161) - 80;
      const scatterY = ((index * 37) % 111) - 55;
      const scatterZ = 28 + ((index * 19) % 60);
      const rotation = ((index * 29) % 41) - 20;
      const animation = word.animate([
        { opacity: 0, filter: "blur(7px)", transform: `translate3d(${scatterX}px, ${scatterY}px, ${scatterZ}px) rotate(${rotation}deg) scale(.82)` },
        { opacity: 1, filter: "blur(0px)", transform: "translate3d(0, 0, 0) rotate(0deg) scale(1)" },
      ], { duration, fill: "both", easing: "cubic-bezier(.2,.7,.2,1)" });
      animation.pause();
      return animation;
    });

    let frame = 0;
    const updateAssembly = () => {
      frame = 0;
      const bounds = heading.getBoundingClientRect();
      const sentenceCenter = bounds.top + bounds.height / 2;
      const viewportTarget = window.innerHeight * 0.46;
      const scrollRange = window.innerHeight * 0.62;
      const progress = Math.max(0, Math.min(1, 1 - Math.abs(sentenceCenter - viewportTarget) / scrollRange));
      animations.forEach((animation) => { animation.currentTime = progress * duration; });
    };
    const scheduleAssembly = () => {
      if (!frame) frame = window.requestAnimationFrame(updateAssembly);
    };

    updateAssembly();
    window.addEventListener("scroll", scheduleAssembly, { passive: true });
    window.addEventListener("resize", scheduleAssembly);
    return () => {
      window.removeEventListener("scroll", scheduleAssembly);
      window.removeEventListener("resize", scheduleAssembly);
      if (frame) window.cancelAnimationFrame(frame);
      animations.forEach((animation) => animation.cancel());
    };
  }, []);

  return (
    <main className={energized ? "site-shell is-energized" : "site-shell"}>
      <PointerHalo />
      <div className="entrance-screen" aria-hidden="true"><div className="entrance-panel entrance-panel-top" /><div className="entrance-panel entrance-panel-bottom" /><div className="entrance-content"><span className="entrance-kicker">ENGINEERING WHAT'S NEXT <i>·</i> 001</span><img className="entrance-logo" src="/codeincave-loader.png" alt="" /><div className="entrance-progress"><i /></div><span className="entrance-caption">IDEAS INTO REAL-WORLD SOLUTIONS</span></div><span className="entrance-coordinate entrance-coordinate-left">TELANGANA / INDIA</span><span className="entrance-coordinate entrance-coordinate-right">WEB · SOFTWARE · AI</span></div>
      <div className="pointer-light" aria-hidden="true" />
      <div className="scroll-progress" aria-hidden="true" />
      <div className="topline"><div className="topline-inner"><span><i className="availability-dot" /> BUILDING WHAT'S NEXT</span><div className={`studio-island-wrap${islandOpen ? " is-open" : ""}`} ref={islandRef}><button className="studio-island" type="button" aria-expanded={islandOpen} aria-controls="studio-island-panel" onClick={() => setIslandOpen(!islandOpen)} data-cursor="OPEN STUDIO DASHBOARD"><span className="island-indicator" /><span className="island-label">STUDIO LIVE</span><span className="island-equalizer"><i /><i /><i /><i /></span></button><div className="studio-panel" id="studio-island-panel" aria-hidden={!islandOpen} inert={!islandOpen}><div className="studio-panel-head"><span><i /> CODEINCAVE / STUDIO STATUS</span><button type="button" aria-label="Close dashboard" onClick={() => setIslandOpen(false)}>×</button></div><h2>Ideas into<br /><em>reality.</em></h2><p>Engineering practical digital solutions that help businesses move forward.</p><div className="island-stages"><a href="#services" onClick={() => setIslandOpen(false)}><span>01</span><b>Explore solutions</b><i>↗</i></a><a href="#approach" onClick={() => setIslandOpen(false)}><span>02</span><b>Meet our approach</b><i>↗</i></a><a href="#work" onClick={() => setIslandOpen(false)}><span>03</span><b>See what is possible</b><i>↗</i></a></div><a className="island-cta" href="#contact" onClick={() => setIslandOpen(false)}>START A PROJECT <span>↗</span></a></div></div><a href="https://mail.google.com/mail/?view=cm&fs=1&to=codeincavedigitalsolutions%40gmail.com" target="_blank" rel="noreferrer" data-cursor="SAY HELLO">LET'S TALK <b>↗</b></a></div></div>

      <header className="header">
        <a className="brand" href="#top" aria-label="CodeInCave home"><img className="brand-logo" src="/codeincave-wordmark.png" alt="" /></a>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
        <nav className={menuOpen ? "navigation is-open" : "navigation"} aria-label="Main navigation" onClick={() => setMenuOpen(false)}>
          <a href="#services">What we do</a><a href="#why-us">Why us</a><a href="#process">The process</a><a href="#work">The work</a><a href="#faq">FAQs</a>
        </nav>
        <a className="nav-contact" href="#contact" data-cursor="LET'S BUILD">Start a project <span>↗</span></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-backdrop-mark">C<span>/</span>C</div>
        <div className="hero-content">
          <div className="eyebrow"><span className="eyebrow-dash" /> ENGINEERING IDEAS INTO REALITY</div>
          <h1>Ideas made<br />to move you<br /><span className="hero-accent">forward<span className="hero-period">.</span></span></h1>
          <p className="hero-intro">We build <em>innovative digital experiences</em> and practical software that help businesses solve real challenges and grow through technology.</p>
          <div className="hero-cta-row"><a href="#contact" className="button button-lime" data-cursor="LET'S BUILD">Build with us <span>↗</span></a><a href="#services" className="scroll-link" data-cursor="EXPLORE">Explore what we do <span>↓</span></a></div>
          <div className="hero-footnote"><span className="footnote-line" /> TECHNICAL EXCELLENCE <span className="footnote-sep">·</span> HUMAN-FOCUSED SOLUTIONS</div>
        </div>

        <div className="hero-visual" data-cursor="MOVE TO SHAPE">
          <div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" /><div className="visual-crosshair crosshair-one" /><div className="visual-crosshair crosshair-two" />

          <div className="canvas-wrap"><div className="canvas-halo" /><Canvas camera={{ position: [0, 0, 5.2], fov: 42 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
            <ambientLight intensity={0.72} /><directionalLight position={[3, 4, 5]} intensity={2.3} color="#f2ae3b" /><pointLight position={[-3, -2, 2]} intensity={22} color="#f2ae3b" /><pointLight position={[3, 1, -2]} intensity={16} color="#f2ae3b" /><Core energized={energized} />
          </Canvas></div>
          <div className="visual-index"><span>IDEA</span><i /> <span>BUILD</span><i /> <span>REALITY</span></div>
          <div className="visual-coordinate">11°01' N<br />76°57' E</div>
          <div className="visual-chip"><span className="chip-pulse" /> PRODUCT / CODE / DESIGN</div>
          <button className="ignite-toggle" type="button" aria-pressed={energized} onClick={() => setEnergized(!energized)} data-cursor={energized ? "RESET THE SCENE" : "IGNITE THE BUILD"}><span className="ignite-icon">✳</span><span>{energized ? "RESET THE SCENE" : "IGNITE THE IDEA"}</span><i>{energized ? "↺" : "↗"}</i></button>
        </div>
        <a className="hero-scroll" href="#services" aria-label="Scroll to services"><span>SCROLL TO EXPLORE</span><i>↓</i></a>
      </section>

      <ReactiveWordmark />

      <div className="ticker" aria-label="Web development, custom software, AI applications and digital products"><div className="ticker-track">{[0, 1, 2, 3].map((copy) => <div className="ticker-group" aria-hidden={copy !== 0} key={copy}><span>WEB DEVELOPMENT</span><i>✳</i><span>CUSTOM SOFTWARE</span><i>✳</i><span>AI APPLICATIONS</span><i>✳</i><span>DIGITAL PRODUCTS</span><i>✳</i><span>BUSINESS SOLUTIONS</span><i>✳</i></div>)}</div></div>

      <section className="services section-pad" id="services">
        <div className="section-top reveal"><div><div className="eyebrow"><span className="eyebrow-dash" /> WHAT WE BUILD</div><h2>Technology for<br /><span>what comes next.</span></h2></div><p>From a professional website to a scalable digital product, we pair creative problem-solving with practical engineering to help your business move forward.</p></div>
        <div className="service-grid">{services.map((service, index) => {
          const isOpen = openService === index;
          return <article className={`service-card service-${index + 1}${isOpen ? " is-open" : ""}`} onPointerMove={handleTilt} onPointerLeave={resetTilt} key={service.id}>
            <button className="service-trigger" type="button" aria-expanded={isOpen} onClick={() => setOpenService(isOpen ? null : index)} data-cursor={isOpen ? "CLOSE" : "EXPLORE"}>
              <span className="service-card-top"><span>{service.id} / {service.category}</span><span className="service-plus">{isOpen ? "−" : "+"}</span></span>
              <span className={`service-object object-${service.symbol}`} aria-hidden="true"><i /><i /><i /></span>
              <span className="service-title">{service.title}</span><span className="service-summary">{service.short}</span>
              <span className="service-card-bottom"><span>EXPLORE CAPABILITY</span><span>↗</span></span>
            </button>
            <div className="service-expand" aria-hidden={!isOpen} inert={!isOpen}><div className="service-expand-inner"><p>{service.detail}</p><div className="tag-list">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><a href="#contact" onClick={() => setOpenService(null)}>LET'S TALK ABOUT IT <span>↗</span></a></div></div>
          </article>;
        })}</div>
        <div className="services-foot reveal"><span>01 — 03</span><span>BUILT TO SOLVE REAL CHALLENGES.</span><a href="#contact">HAVE AN IDEA TO EXPLORE? <b>LET'S TALK ↗</b></a></div>
      </section>

      <section className="why-us" id="why-us">
        <div className="why-layout section-pad">
          <div className="why-copy reveal"><div className="eyebrow"><span className="eyebrow-dash" /> WHY CODEINCAVE</div><h2>The difference between <span>off-the-shelf</span> and built for <em>you.</em></h2><p>We pair technical excellence with creative problem-solving to build reliable, user-focused products around your business and the people you serve.</p><div className="why-actions"><a className="why-primary" href="#contact" data-cursor="TELL US YOUR IDEA">Tell us your idea <span>↗</span></a><a className="why-secondary" href="#services">Explore our services <span>↓</span></a></div><div className="why-points"><article className="why-point"><span className="why-point-icon">✳</span><div><b>Made for your goals</b><small>Custom solutions, shaped around your business.</small></div></article><article className="why-point"><span className="why-point-icon">⌁</span><div><b>Thoughtful by design</b><small>Clear, useful experiences for real people.</small></div></article><article className="why-point"><span className="why-point-icon">&lt;/&gt;</span><div><b>Engineered to last</b><small>Reliable foundations, built to grow with you.</small></div></article><article className="why-point"><span className="why-point-icon">↗</span><div><b>Close collaboration</b><small>Clear communication from idea to launch.</small></div></article></div></div>
          <div className="why-stage reveal" onPointerMove={handleTilt} onPointerLeave={resetTilt} aria-label="Interactive illustration of connected digital solutions">
            <div className="why-stage-orbit why-stage-orbit-one" /><div className="why-stage-orbit why-stage-orbit-two" />
            <div className="why-console"><div className="why-console-top"><span className="why-console-dots"><i /><i /><i /></span><span>CODEINCAVE / SOLUTION SYSTEMS</span><span className="why-live"><i /> READY</span></div><div className="why-console-body"><aside className="why-console-side"><b>C.</b><i className="active">⌂</i><i>◈</i><i>⌘</i><i>⚙</i></aside><div className="why-console-main"><div className="why-greeting"><span>YOUR NEXT IDEA</span><span>01 — 03</span></div><h3>Built around<br /><em>your business.</em></h3><p>Digital tools that bring good ideas to life.</p><div className="why-system-map"><div className="why-map-core"><span>CC</span><i>YOUR<br />BUSINESS</i></div><div className="why-map-node why-node-web"><b>W</b><span>WEB</span></div><div className="why-map-node why-node-ai"><b>✳</b><span>AI</span></div><div className="why-map-node why-node-code"><b>&lt;/&gt;</b><span>SOFTWARE</span></div><i className="why-map-link why-link-one" /><i className="why-map-link why-link-two" /><i className="why-map-link why-link-three" /></div><div className="why-console-bottom"><span><i /> USER-FOCUSED</span><span>ENGINEERED TO SCALE <b>↗</b></span></div></div></div></div>
            <div className="why-float why-float-web"><span>01 / WEB</span><b>Digital presence</b><i>↗</i></div><div className="why-float why-float-ai"><span>02 / AI</span><b>Smarter workflows</b><i>✳</i></div><div className="why-stage-caption"><span>ONE PARTNER</span><i /> <span>IDEA TO IMPACT</span></div>
          </div>
        </div>
      </section>

      <section className="capability-marquee" aria-label="CodeInCave capabilities: web development, custom software, AI applications, and scalable digital products">
        <span className="marquee-label"><i /> WHAT WE ENGINEER / CODEINCAVE</span>
        <div className="marquee-lane marquee-lane-one" aria-hidden="true"><div className="marquee-track">{[0, 1, 2, 3].map((copy) => <div className="marquee-group" key={copy}><span>WEB EXPERIENCES</span><i>✳</i><span>CUSTOM SOFTWARE</span><i>✳</i><span>AI APPLICATIONS</span><i>✳</i><span>SAAS PRODUCTS</span><i>✳</i></div>)}</div></div>
        <div className="marquee-lane marquee-lane-two" aria-hidden="true"><div className="marquee-track">{[0, 1, 2, 3].map((copy) => <div className="marquee-group" key={copy}><span>DIGITAL SOLUTIONS</span><i>✳</i><span>PRODUCT ENGINEERING</span><i>✳</i><span>BUSINESS APPS</span><i>✳</i><span>SCALABLE SYSTEMS</span><i>✳</i></div>)}</div></div>
      </section>

      <section className="manifesto" id="approach">
        <div className="manifesto-noise" />
        <div className="manifesto-inner section-pad">
          <div className="manifesto-kicker reveal"><span>WHY CODEINCAVE</span><span>02 / 04</span></div>
          <div className="manifesto-heading reveal"><span className="quote-mark">“</span><h2 className="manifesto-assembly" ref={manifestoHeadingRef} aria-label="Every great idea deserves the right engineering."><span className="manifesto-line"><span className="manifesto-word">Every</span>{" "}<span className="manifesto-word">great</span>{" "}<span className="manifesto-word">idea</span></span><span className="manifesto-line"><span className="manifesto-word">deserves</span>{" "}<span className="manifesto-word">the</span>{" "}<span className="manifesto-word">right</span>{" "}<span className="manifesto-word manifesto-word-accent">engineering.</span></span></h2><span className="manifesto-aside">BUILDING MORE<br />THAN SOFTWARE.</span></div>
          <div className="manifesto-bottom reveal"><p>We help businesses establish a strong digital presence, streamline operations, and grow through technology. We build solutions that empower teams, inspire innovation, and create opportunities for the future.</p><a href="#work" className="outline-link" data-cursor="SEE HOW">See how we approach a build <span>↗</span></a></div>
          <div className="principles reveal"><div><span>01 / TECHNICAL EXCELLENCE</span><b>Build reliable, efficient solutions.</b></div><div><span>02 / CREATIVE PROBLEM-SOLVING</span><b>Make technology useful in the real world.</b></div><div><span>03 / BUILT AROUND PEOPLE</span><b>Keep every experience clear and human.</b></div></div>
        </div>
      </section>

      <section className="process section-pad" id="process">
        <div className="section-top reveal"><div><div className="eyebrow"><span className="eyebrow-dash" /> FROM FIRST IDEA TO LAUNCH</div><h2>Good engineering<br /><span>makes ideas real.</span></h2></div><p>Choose a step to see how we bring technical excellence and creative problem-solving to your project.</p></div>
        <div className="process-layout reveal">
          <div className="process-steps" role="group" aria-label="Project stages">{phases.map((phase, index) => <button type="button" className={activePhase === index ? "process-step is-active" : "process-step"} aria-pressed={activePhase === index} onClick={() => setActivePhase(index)} key={phase.id}><span>{phase.id}</span><b>{phase.label}</b><i>{phase.title}</i><em>↗</em></button>)}</div>
          <article className="process-detail interactive-3d" onPointerMove={handleTilt} onPointerLeave={resetTilt} key={activePhase}><div className="process-detail-head"><span>PROJECT PATH / {phases[activePhase].id}</span><span className="process-live"><i /> IN THE OPEN</span></div><div className="process-orbit" aria-hidden="true"><Canvas camera={{ position: [0, 0, 3.3], fov: 42 }} dpr={[1, 1.4]} gl={{ alpha: true, antialias: true }}><ambientLight intensity={0.9} /><directionalLight position={[2, 3, 4]} intensity={1.8} color="#f3f2ee" /><pointLight position={[-2, 1, 2]} intensity={8} color="#86c5ff" /><ProcessObject /></Canvas></div><div className="process-detail-copy"><span className="process-label">{phases[activePhase].label}</span><h3>{phases[activePhase].title}</h3><p>{phases[activePhase].body}</p></div><div className="process-progress"><span style={{ width: `${((activePhase + 1) / phases.length) * 100}%` }} /></div><div className="process-output"><span>THE USEFUL OUTPUT</span><b>{phases[activePhase].output}</b><i>{phases[activePhase].id}</i></div></article>
        </div>
        <div className="process-foot"><span>WORKING TOGETHER, STEP BY STEP</span><a href="#contact">TALK THROUGH YOUR PROJECT <b>↗</b></a></div>
      </section>
      <section className="work section-pad" id="work">
        <div className="section-top work-heading reveal"><div><div className="eyebrow"><span className="eyebrow-dash" /> DIGITAL PRODUCTS, MADE PRACTICAL</div><h2>Clearer work.<br /><span>Room to grow.</span></h2></div><p>Explore a sample business application: a glimpse of how the right digital tools can bring information and everyday work together.</p></div>
        <div className="product-stage reveal">
          <div className="product-backdrop product-backdrop-a" /><div className="product-backdrop product-backdrop-b" />
          <div className="product-window" data-cursor="PLAY WITH THE VIEW" onPointerMove={handleTilt} onPointerLeave={resetTilt}>
            <div className="product-chrome"><div className="window-dots"><i /><i /><i /></div><span>CODEINCAVE / BUSINESS APP</span><span className="window-avatar">C</span></div>
            <div className="product-body"><aside className="product-sidebar"><b className="sidebar-mark">f.</b><span className="sidebar-active">⌂</span><span>◷</span><span>⌘</span><span>⚙</span><i /></aside>
              <div className="product-main"><div className="product-greeting"><span>YOUR BUSINESS / OVERVIEW</span><span className="live-label"><i /> READY TO GROW</span></div><h3>{demo.title.split("\n").map((line) => <span key={line}>{line}<br /></span>)}</h3><p>Useful tools. Clearer work. More room to grow.</p>
                <div className="product-stats"><div><span>IN PROGRESS</span><b>08</b><i>↑ 2 this week</i></div><div><span>COMPLETED</span><b>24</b><i>↑ 6 this week</i></div><div><span>IN REVIEW</span><b>03</b><i>Ready for you</i></div></div>
                <div className="chart-card"><div className="chart-heading"><span>YOUR MOMENTUM</span><span>LAST 7 DAYS⌄</span></div><div className="chart-bars">{demo.bars.map((height, i) => <span className={i === 5 ? "bar-current" : ""} style={{ "--bar-height": `${height}%` }} key={`${activeDemo}-${i}`}><i /></span>)}</div><div className="chart-days"><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span></div></div>
              </div><aside className="product-note"><span>ON YOUR RADAR</span><b>One clear next step beats ten open tabs.</b><a href="#contact">Make it happen ↗</a></aside>
            </div>
          </div>
          <div className="demo-controls"><span>INTERACTION / 001</span><div className="demo-tabs" role="group" aria-label="Preview workspace views">{Object.keys(demos).map((key) => <button type="button" aria-pressed={activeDemo === key} className={activeDemo === key ? "active" : ""} key={key} onClick={() => setActiveDemo(key)}>{key}</button>)}</div><span>TRY A DIFFERENT VIEW ↗</span></div>
        </div>
      </section>

      <section className="faq section-pad" id="faq">
        <div className="section-top reveal"><div><div className="eyebrow"><span className="eyebrow-dash" /> GOOD QUESTIONS, CLEAR ANSWERS</div><h2>Before we<br /><span>get into it.</span></h2></div><div className="faq-aside"><p>Still thinking it through? That is a fine place to start.</p><a href="https://mail.google.com/mail/?view=cm&fs=1&to=codeincavedigitalsolutions%40gmail.com" target="_blank" rel="noreferrer" data-cursor="ASK US">Ask us directly <span>↗</span></a><div className="faq-gem" aria-hidden="true"><div className="faq-code-tile"><span>&lt;/&gt;</span><i /><i /><i /></div><b className="faq-orbit-dot" /></div></div></div>
        <div className="faq-list reveal">{faqs.map((faq, index) => { const isOpen = openFaq === index; return <article className={isOpen ? "faq-item is-open" : "faq-item"} key={faq.question}><button type="button" aria-expanded={isOpen} onClick={() => setOpenFaq(isOpen ? null : index)}><span className="faq-number">0{index + 1}</span><b>{faq.question}</b><i>{isOpen ? "−" : "+"}</i></button><div className="faq-answer" aria-hidden={!isOpen} inert={!isOpen}><p>{faq.answer}</p></div></article>; })}</div>
      </section>
      <div className="contact-marquee" aria-label="Ideas into reality, digital solutions built around your business"><div className="contact-marquee-track">{[0, 1, 2, 3].map((copy) => <div className="contact-marquee-group" aria-hidden={copy !== 0} key={copy}><span>IDEAS INTO REALITY</span><i>✳</i><span>WEB · SOFTWARE · AI</span><i>✳</i><span>BUILT AROUND YOUR BUSINESS</span><i>✳</i><span>CODEINCAVE DIGITAL SOLUTIONS</span><i>✳</i></div>)}</div></div>
      <section className="contact" id="contact"><div className="contact-orb contact-orb-one" /><div className="contact-orb contact-orb-two" /><div className="contact-inner section-pad reveal"><div className="eyebrow"><span className="eyebrow-dash" /> LET'S BUILD WHAT'S NEXT</div><div className="contact-layout"><h2>Bring your idea.<br />We'll build the <span>future.</span></h2><div className="contact-copy"><p>From a stronger digital presence to software that streamlines your business, let's turn your next idea into something real.</p><span className="contact-email">PREFER EMAIL? <a href="https://mail.google.com/mail/?view=cm&fs=1&to=codeincavedigitalsolutions%40gmail.com" target="_blank" rel="noreferrer">CODEINCAVEDIGITALSOLUTIONS@GMAIL.COM</a></span></div></div>
        <form className="brief-form" onSubmit={handleBriefSubmit}>
          <div className="brief-form-heading"><div><span className="brief-kicker">PROJECT INQUIRY / 001</span><h3>Send us a brief</h3></div><p>Tell us about your project. We'll get back to you as soon as we can.</p></div>
          <div className="brief-fields">
            <label className="brief-honeypot" aria-hidden="true">Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
            <label className="brief-field"><span>Your name <i>*</i></span><input name="name" autoComplete="name" placeholder="Your name" required /></label>
            <label className="brief-field"><span>Email <i>*</i></span><input name="email" type="email" autoComplete="email" placeholder="you@company.com" required /></label>
            <label className="brief-field brief-field-full"><span>Company / project name</span><input name="company" autoComplete="organization" placeholder="Your startup / company" /></label>
            <fieldset className="brief-budget brief-field-full"><legend>Budget range</legend><div>{["Under ₹50K", "₹50K – ₹1L", "₹1L – ₹3L", "₹3L+", "Let's discuss"].map((budget) => <button type="button" className={selectedBudget === budget ? "is-selected" : ""} aria-pressed={selectedBudget === budget} onClick={() => setSelectedBudget(budget)} key={budget}>{budget}</button>)}</div></fieldset>
            <label className="brief-field brief-field-full"><span>Tell us about your project <i>*</i></span><textarea name="project" rows="5" placeholder="What are you building? What problem needs to be solved? What's your timeline?" required /></label>
            <div className="brief-submit brief-field-full"><div className="brief-submit-options"><button type="submit" className="brief-submit-button" data-cursor="PREPARE GMAIL DRAFT">Continue in Gmail <span>↗</span></button><button type="button" className="brief-whatsapp-button" onClick={handleWhatsAppBrief} data-cursor="PREPARE WHATSAPP MESSAGE">Continue in WhatsApp <span>↗</span></button></div><p>Choose an option to open a prefilled message. Review the details and tap Send in Gmail or WhatsApp.</p>{briefStatus && <p className="brief-status" role="status">{briefStatus}</p>}{briefFallbackHref && <a className="brief-fallback" href={briefFallbackHref} target="_blank" rel="noreferrer">Gmail didn’t open? Open the draft here <span>↗</span></a>}</div>
          </div>
        </form>
        <footer className="contact-footer">
          <div className="footer-main">
            <div className="footer-about"><a className="brand footer-brand" href="#top" aria-label="CodeInCave home"><img className="brand-logo" src="/codeincave-wordmark.png" alt="" /></a><p>CodeInCave is a digital solutions company building thoughtful websites, custom software, AI-powered applications, and scalable products for real-world challenges.</p></div>
            <div className="footer-column"><h3>EXPLORE</h3><a href="#services">What we build <span>↗</span></a><a href="#process">Our process <span>↗</span></a><a href="#work">Product preview <span>↗</span></a><a href="#faq">FAQs <span>↗</span></a></div>
            <div className="footer-column"><h3>SOLUTIONS</h3><a href="#services">Custom websites <span>↗</span></a><a href="#services">Apps & AI <span>↗</span></a><a href="#services">Custom software <span>↗</span></a><a href="#services">Scalable digital products <span>↗</span></a></div>
            <div className="footer-column"><h3>GET IN TOUCH</h3><a href="https://mail.google.com/mail/?view=cm&fs=1&to=codeincavedigitalsolutions%40gmail.com" target="_blank" rel="noreferrer">codeincavedigitalsolutions@gmail.com <span>↗</span></a><a href="#contact">Send a project brief <span>↗</span></a><span className="footer-location">TELANGANA, INDIA</span><span className="footer-location">DIGITAL SOLUTIONS</span></div>
          </div>
          <div className="footer-bottom"><span>© {new Date().getFullYear()} CODEINCAVE DIGITAL SOLUTIONS. ALL RIGHTS RESERVED.</span><div><a href="#faq">FAQs</a><a href="#top">BACK TO TOP ↑</a></div></div>
        </footer></div></section>
    </main>
  );
}

export default App;





























