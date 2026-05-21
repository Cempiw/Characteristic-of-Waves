/* ═══════════════════════════════════════════
   WavEdu — app.js  (all interactivity)
   ═══════════════════════════════════════════ */

// ── NAVBAR SCROLL EFFECT ──────────────────
window.addEventListener('scroll', () => {
  const nb = document.getElementById('navbar');
  nb.style.boxShadow = window.scrollY > 40
    ? '0 4px 30px rgba(0,0,0,0.12)'
    : '0 2px 20px rgba(0,0,0,0.08)';
});

// ── HAMBURGER (mobile) ────────────────────
document.getElementById('hamburger').onclick = function() {
  const nl = document.querySelector('.nav-links');
  if (nl.style.display === 'flex') {
    nl.style.display = '';
  } else {
    nl.style.display = 'flex';
    nl.style.flexDirection = 'column';
    nl.style.position = 'absolute';
    nl.style.top = '60px';
    nl.style.left = '0';
    nl.style.width = '100%';
    nl.style.background = '#fff';
    nl.style.padding = '16px 20px';
    nl.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
    nl.style.zIndex = '999';
  }
};

// ════════════════════════════════════════════
// LESSON CONTENT DATA
// ════════════════════════════════════════════
const lessons = {
  waves: {
    icon: '🌊',
    title: 'What Are Waves?',
    html: `
      <div class="lesson-header">
        <div class="lesson-icon">🌊</div>
        <h2>What Are Waves?</h2>
      </div>
      <div class="lesson-body">
        <p>A <strong>wave</strong> is a disturbance that transfers <strong>energy</strong> from one place to another — without transporting matter!</p>
        <div class="fact-box">
          <strong>🤯 Mind-blowing fact:</strong> When you listen to music from your phone, the air molecules don't travel from the speaker to your ear. Instead, energy is passed from one molecule to the next — like a Mexican wave in a stadium!
        </div>
        <div class="lesson-illustration">
          <svg viewBox="0 0 500 120" width="100%" style="max-width:480px">
            <defs>
              <linearGradient id="wg" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#4ECDC4"/>
                <stop offset="100%" style="stop-color:#74C0FC"/>
              </linearGradient>
            </defs>
            <!-- Wave path animated -->
            <path id="wavePath" stroke="url(#wg)" stroke-width="4" fill="none"/>
            <!-- Dots on wave -->
            <circle id="dot1" r="8" fill="#FF6B6B"/>
            <circle id="dot2" r="8" fill="#FFD93D"/>
            <circle id="dot3" r="8" fill="#69DB7C"/>
            <text x="10"  y="115" font-family="Nunito" font-size="11" fill="#888">← Energy travels this way →</text>
          </svg>
          <script>
            (function animWave(){
              let t=0;
              function draw(){
                t+=0.04;
                const pts=[];
                for(let x=0;x<=500;x+=5){
                  const y=60+30*Math.sin((x/60)-t);
                  pts.push(x+','+y);
                }
                const p=document.getElementById('wavePath');
                if(p) p.setAttribute('d','M'+pts.join(' L'));
                // Move dots up and down (same x positions, wave y)
                [[100,'dot1'],[250,'dot2'],[400,'dot3']].forEach(([x,id])=>{
                  const el=document.getElementById(id);
                  if(el){
                    const y=60+30*Math.sin((x/60)-t);
                    el.setAttribute('cx',x); el.setAttribute('cy',y);
                  }
                });
                requestAnimationFrame(draw);
              }
              draw();
            })();
          </script>
        </div>
        <h4>🔑 Key Idea: Wave vs. Trolley</h4>
        <p>Imagine a trolley carrying boxes from point A to B — the trolley (matter) actually moves! A wave is different: the medium (air, water, rope) just vibrates up and down while energy travels forward.</p>
        <ul>
          <li>🌊 Ocean wave — water moves up/down, wave moves forward</li>
          <li>🔊 Sound wave — air molecules vibrate, sound travels</li>
          <li>☀️ Light wave — no medium needed at all!</li>
        </ul>
        <h4>🌍 Why Does This Matter?</h4>
        <p>This is the technological "holy grail" — it's why we can send HD video from a satellite 36,000 km away without launching physical matter into space to deliver the message!</p>
        <div class="fact-box">
          <strong>🚀 Amazing:</strong> Radio waves sent by NASA travel 300,000 km every second — that's how we communicate with spacecraft billions of kilometres away!
        </div>
      </div>
    `
  },

  properties: {
    icon: '📏',
    title: 'Wave Characteristics',
    html: `
      <div class="lesson-header">
        <div class="lesson-icon">📏</div>
        <h2>Wave Characteristics</h2>
      </div>
      <div class="lesson-body">
        <p>Every wave can be described by <strong>four key measurements</strong>. Let's learn them!</p>

        <div class="lesson-illustration">
          <svg viewBox="0 0 480 180" width="100%" style="max-width:480px">
            <defs>
              <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="#4ECDC4"/>
              </marker>
            </defs>
            <!-- Baseline -->
            <line x1="20" y1="90" x2="460" y2="90" stroke="#ddd" stroke-width="1" stroke-dasharray="4"/>
            <!-- Wave -->
            <path id="propWave" stroke="#4ECDC4" stroke-width="3" fill="none"/>
            <!-- Amplitude arrow -->
            <line x1="100" y1="90" x2="100" y2="32" stroke="#FF6B6B" stroke-width="2" marker-end="url(#arrowhead)"/>
            <text x="105" y="58" font-size="11" fill="#FF6B6B" font-family="Nunito" font-weight="700">Amplitude (A)</text>
            <!-- Wavelength arrow -->
            <line x1="20" y1="158" x2="180" y2="158" stroke="#FFD93D" stroke-width="2" marker-end="url(#arrowhead)"/>
            <line x1="180" y1="158" x2="20" y2="158" stroke="#FFD93D" stroke-width="2" marker-end="url(#arrowhead)"/>
            <text x="60" y="174" font-size="11" fill="#FFD93D" font-family="Nunito" font-weight="700">Wavelength (λ)</text>
          </svg>
          <script>
            (function(){
              const pts=[];
              for(let x=20;x<=460;x+=4){
                const y=90+48*Math.sin((x-20)*Math.PI/80);
                pts.push(x+','+y);
              }
              const pw=document.getElementById('propWave');
              if(pw) pw.setAttribute('d','M'+pts.join(' L'));
            })();
          </script>
        </div>

        <h4>1️⃣ Amplitude (A)</h4>
        <p>The <strong>maximum displacement</strong> from the rest position. Think of it as the "height" or "strength" of the wave. A loud sound has large amplitude; a soft whisper has small amplitude.</p>

        <h4>2️⃣ Frequency (f)</h4>
        <p>The <strong>number of complete waves per second</strong>, measured in Hertz (Hz). A high-pitched sound has high frequency. Formula: <code>f = 1/T</code></p>

        <h4>3️⃣ Wavelength (λ)</h4>
        <p>The <strong>distance of one complete wave</strong> — from crest to crest or trough to trough. Pro tip: measure 5 waves and divide by 5 for accuracy!</p>

        <h4>4️⃣ Wave Speed (v)</h4>
        <p>How fast the wave travels through a medium. Sound travels at ~340 m/s in air. Light travels at 300,000,000 m/s!</p>

        <div class="fact-box">
          <strong>⚡ Quick check:</strong> Period (T) = seconds per wave. Frequency (f) = waves per second. They are opposite! If T = 0.5 s, then f = 1/0.5 = 2 Hz.
        </div>

        <h4>🎵 Real World: Musical Instruments</h4>
        <p>When you tighten a guitar string, you increase its frequency — the pitch goes higher! When you pluck harder, you increase the amplitude — the sound gets louder!</p>
      </div>
    `
  },

  types: {
    icon: '🔊',
    title: 'Types of Waves',
    html: `
      <div class="lesson-header">
        <div class="lesson-icon">🔊</div>
        <h2>Types of Waves</h2>
      </div>
      <div class="lesson-body">
        <p>Waves come in two main families. Let's meet them!</p>

        <h4>🟦 Mechanical Waves — Need a Medium!</h4>
        <p>These waves need matter (solid, liquid, or gas) to travel through. They <strong>cannot</strong> travel through a vacuum.</p>
        <ul>
          <li>🔊 <strong>Sound waves</strong> — compression waves through air</li>
          <li>🌊 <strong>Water waves</strong> — surface waves on liquid</li>
          <li>🪨 <strong>Seismic waves</strong> — through the Earth's rock</li>
        </ul>

        <div class="fact-box">
          <strong>🚀 In space, no one can hear you scream!</strong> This is literally true — sound cannot travel through the vacuum of space because there's no medium!
        </div>

        <h4>⚡ Electromagnetic (EM) Waves — No Medium Needed!</h4>
        <p>These waves are special — they are made of oscillating electric and magnetic fields and can travel through <strong>empty space</strong> at the speed of light (3 × 10⁸ m/s)!</p>

        <div class="lesson-illustration">
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;text-align:center">
            ${[
              ['🔴','Radio','Long λ, Low f'],
              ['📡','Microwave','Wi-Fi, Cooking'],
              ['☀️','Infrared','Heat, Remote'],
              ['👁️','Visible Light','ROYGBIV'],
              ['🕶️','Ultraviolet','Vitamin D, Sunburn'],
              ['🏥','X-rays','Medical Imaging'],
              ['☢️','Gamma','Cancer Treatment'],
              ['💫','All travel','at c = 3×10⁸ m/s']
            ].map(([e,n,d])=>`
              <div style="background:#f0fbff;border-radius:12px;padding:10px 6px">
                <div style="font-size:1.4rem">${e}</div>
                <div style="font-weight:800;font-size:0.8rem;color:#1A1A2E">${n}</div>
                <div style="font-size:0.72rem;color:#666">${d}</div>
              </div>`).join('')}
          </div>
        </div>

        <h4>↔️ Transverse vs Longitudinal</h4>
        <p><strong>Transverse:</strong> particles vibrate perpendicular to wave direction (e.g. light, water surface). <strong>Longitudinal:</strong> particles vibrate parallel to wave direction (e.g. sound, compression waves).</p>
      </div>
    `
  },

  benefits: {
    icon: '🏥',
    title: 'Benefits for Humans',
    html: `
      <div class="lesson-header">
        <div class="lesson-icon">🏥</div>
        <h2>Benefits of Waves for Humans</h2>
      </div>
      <div class="lesson-body">
        <p>Waves and light are literally saving lives, connecting people, and powering civilization every single day!</p>

        <h4>🏥 Medicine</h4>
        <ul>
          <li>🔬 <strong>Ultrasound (f = 1–20 MHz)</strong> — Doctors use high-frequency sound waves to see inside the body. Pregnant mothers use it to see their babies! No radiation involved.</li>
          <li>🩻 <strong>X-rays</strong> — High-energy EM waves that pass through soft tissue but are blocked by bone. Essential for detecting fractures and disease.</li>
          <li>👁️ <strong>Laser Surgery</strong> — Controlled amplitude laser beams reshape the cornea in LASIK eye surgery. Precise to micrometres!</li>
          <li>☢️ <strong>Radiotherapy</strong> — Gamma rays are focused on tumour cells to destroy cancer.</li>
        </ul>

        <div class="fact-box">
          <strong>🩺 Ultrasound maths:</strong> In human tissue, sound travels at ~1500 m/s. At f = 2 MHz: λ = v/f = 1500 / 2,000,000 = 0.00075 m (0.75 mm). This tiny wavelength gives <em>very fine detail</em> in the image!
        </div>

        <h4>📡 Communication</h4>
        <ul>
          <li>📱 <strong>Mobile phones</strong> — Use microwave frequencies (700 MHz – 6 GHz) to send voice, video, and data.</li>
          <li>🛰️ <strong>Satellite TV</strong> — Microwaves bounce off geostationary satellites 36,000 km above Earth!</li>
          <li>🌐 <strong>Fiber optics</strong> — Light pulses travel through glass fibres at near-light speed, carrying internet data globally.</li>
          <li>📻 <strong>Radio/Wi-Fi</strong> — Radio waves penetrate walls, connecting us wirelessly.</li>
        </ul>

        <h4>⚡ Energy</h4>
        <ul>
          <li>☀️ <strong>Solar panels</strong> — Convert light (EM radiation) directly into electricity.</li>
          <li>🌊 <strong>Wave power converters</strong> — Use ocean wave energy to generate electricity.</li>
          <li>🔥 <strong>Microwave ovens</strong> — 2.45 GHz microwaves cause water molecules in food to vibrate, generating heat.</li>
        </ul>
      </div>
    `
  },

  equation: {
    icon: '🧮',
    title: 'The Wave Equation',
    html: `
      <div class="lesson-header">
        <div class="lesson-icon">🧮</div>
        <h2>The Wave Equation: v = fλ</h2>
      </div>
      <div class="lesson-body">
        <div class="fact-box" style="text-align:center; font-size:1.6rem; padding:20px">
          <strong style="color:#4ECDC4">v = f × λ</strong><br>
          <span style="font-size:0.9rem; color:#666">Wave speed = Frequency × Wavelength</span>
        </div>

        <h4>📐 Where does this come from?</h4>
        <p>Speed = Distance ÷ Time. In one period (T), the wave travels exactly one wavelength (λ). Since f = 1/T, we get:</p>
        <p style="text-align:center; font-family:monospace; background:#f0fbff; padding:12px; border-radius:10px; font-size:1.1rem">v = λ/T = λ × (1/T) = λ × f = <strong>fλ ✓</strong></p>

        <h4>🔢 Step-by-step example</h4>
        <p>A medical ultrasound in human tissue (v = 1500 m/s) operates at f = 2 MHz. Find the wavelength:</p>
        <div style="background:#f8fbff; border-radius:12px; padding:16px; font-family:monospace; font-size:0.95rem; line-height:2">
          <div>Step 1 — Given: v = 1500 m/s, f = 2.0 × 10⁶ Hz</div>
          <div>Step 2 — Formula: v = fλ, so λ = v/f</div>
          <div>Step 3 — Substitute: λ = 1500 / 2,000,000</div>
          <div style="background:#e0f7fa; padding:8px; border-radius:8px"><strong>Step 4 — Answer: λ = 7.5 × 10⁻⁴ m = 0.75 mm ✓</strong></div>
        </div>

        <h4>🎸 Inverse Relationship</h4>
        <p>If wave speed stays constant, <strong>frequency and wavelength are inversely related</strong>:</p>
        <ul>
          <li>🔺 Higher frequency → shorter wavelength (more waves squeezed together)</li>
          <li>🔻 Lower frequency → longer wavelength (waves spread out)</li>
        </ul>
        <p>This is why higher-frequency ultrasound gives finer medical images — the shorter wavelength can "see" smaller details!</p>

        <div class="fact-box">
          <strong>💡 Physics tip:</strong> When calculating wave problems involving weight or falling objects in these models, always use g = 10 N/kg (not 9.8).
        </div>

        <h4>🧪 Practice Problem</h4>
        <p>A Wi-Fi signal travels at 3 × 10⁸ m/s with a frequency of 2.4 × 10⁹ Hz. What is the wavelength? <em>(Try in the Wave Calculator simulation! ↑)</em></p>
      </div>
    `
  },

  safety: {
    icon: '🛡️',
    title: 'Wave Safety',
    html: `
      <div class="lesson-header">
        <div class="lesson-icon">🛡️</div>
        <h2>Wave Safety: Benefits vs. Risks</h2>
      </div>
      <div class="lesson-body">
        <p>The same waves that help us can also be harmful if used incorrectly. Understanding wave characteristics helps us use them safely!</p>

        <h4>⚡ It's All About Energy</h4>
        <p>Wave energy depends on <strong>frequency</strong> and <strong>amplitude</strong>. Higher frequency generally means more energy per photon (for EM waves):</p>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin:16px 0">
          <div style="background:#e6f9f0; border-radius:12px; padding:14px">
            <strong style="color:#1a7a4a">✅ Safe (Non-ionising)</strong>
            <ul style="margin-top:8px; font-size:0.9rem">
              <li>Radio waves</li>
              <li>Microwaves (low power)</li>
              <li>Infrared (warmth)</li>
              <li>Visible light</li>
            </ul>
          </div>
          <div style="background:#fff0f0; border-radius:12px; padding:14px">
            <strong style="color:#c0392b">⚠️ Use carefully (Ionising)</strong>
            <ul style="margin-top:8px; font-size:0.9rem">
              <li>UV rays (sunburn, skin cancer)</li>
              <li>X-rays (DNA damage in excess)</li>
              <li>Gamma rays (radioactive)</li>
            </ul>
          </div>
        </div>

        <h4>📱 Mobile Phones and 5G</h4>
        <p>Mobile phones use <strong>non-ionising microwave radiation</strong>. Current scientific evidence shows no proven harmful health effects at the power levels used. However, international guidelines set safe exposure limits, and research continues.</p>

        <div class="fact-box">
          <strong>🌏 Stakeholder thinking:</strong> Different groups have different perspectives on 5G towers: engineers see communication benefits, health advocates want more research, environmental scientists study effects on wildlife, communities want a say in placement. Good science considers all perspectives!
        </div>

        <h4>☀️ UV and Sunlight</h4>
        <ul>
          <li>✅ UV-B helps produce Vitamin D in our skin — essential for bone health</li>
          <li>⚠️ Excessive UV exposure causes sunburn and can lead to skin cancer</li>
          <li>🛡️ SPF sunscreen absorbs/reflects UV waves before they damage DNA</li>
        </ul>

        <h4>🏥 Medical Radiation — Benefit vs Risk</h4>
        <p>One chest X-ray gives you about the same radiation dose as a transatlantic flight! The diagnostic benefit far outweighs the tiny risk, but doctors minimise unnecessary scans — especially for children.</p>
      </div>
    `
  }
};

function openLesson(key) {
  const modal = document.getElementById('lessonModal');
  const content = document.getElementById('lessonContent');
  content.innerHTML = lessons[key].html;
  modal.classList.add('open');
  // Run any inline scripts in the new content
  content.querySelectorAll('script').forEach(s => {
    const ns = document.createElement('script');
    ns.textContent = s.textContent;
    document.body.appendChild(ns);
    document.body.removeChild(ns);
  });
}
function closeLesson() {
  document.getElementById('lessonModal').classList.remove('open');
}
document.getElementById('lessonModal').addEventListener('click', function(e) {
  if (e.target === this) closeLesson();
});

// ════════════════════════════════════════════
// RIPPLE TANK SIMULATION
// ════════════════════════════════════════════
let rippleRunning = true;
let rippleT = 0;
let rippleAnimId;
let rippleFreq = 5;
let rippleAmp  = 30;

function updateRipple() {
  rippleFreq = parseInt(document.getElementById('freqSlider').value);
  rippleAmp  = parseInt(document.getElementById('ampSlider').value);
  document.getElementById('freqVal').textContent = rippleFreq;
  document.getElementById('ampVal').textContent  = rippleAmp;
}

function drawRipple() {
  const canvas = document.getElementById('rippleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#0a1628';
  ctx.fillRect(0, 0, W, H);

  // Draw multiple wave rings from center
  const cx = W / 2, cy = H / 2;

  for (let ring = 0; ring < 6; ring++) {
    const phase = rippleT - ring * (80 / rippleFreq);
    const maxR = Math.min(cx, cy) * 0.95;
    const r = (phase % (maxR / rippleFreq * rippleFreq)) * (maxR / 150);

    if (r > 0 && r < maxR) {
      const alpha = 1 - r / maxR;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(78, 205, 196, ${alpha * 0.8})`;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }

  // Draw wave profile at bottom
  ctx.beginPath();
  for (let x = 0; x < W; x++) {
    const y = H - 55 + rippleAmp * 0.5 * Math.sin((x / W) * rippleFreq * 2 * Math.PI - rippleT * 0.15);
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.strokeStyle = 'rgba(255, 217, 61, 0.8)';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Source dot
  ctx.beginPath();
  ctx.arc(cx, cy, 6, 0, Math.PI * 2);
  ctx.fillStyle = '#FF6B6B';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(cx, cy, 12 + 4*Math.sin(rippleT*0.3), 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(255,107,107,0.5)';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Labels
  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  ctx.font = '12px Nunito';
  ctx.fillText(`f = ${rippleFreq} Hz`, 12, 20);
  ctx.fillText(`A = ${rippleAmp}`, 12, 36);

  if (rippleRunning) {
    rippleT += rippleFreq * 0.05;
    rippleAnimId = requestAnimationFrame(drawRipple);
  }
}

function toggleRipple() {
  rippleRunning = !rippleRunning;
  if (rippleRunning) drawRipple();
}

// Auto-start ripple when sim section visible
const simObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting && !rippleAnimId) {
      rippleRunning = true;
      drawRipple();
    }
  });
}, { threshold: 0.3 });

const simSection = document.getElementById('sim');
if (simSection) simObs.observe(simSection);

// ════════════════════════════════════════════
// SIM TABS
// ════════════════════════════════════════════
function showSim(id) {
  document.querySelectorAll('.sim-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.sim-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('sim-' + id).classList.add('active');
  event.target.classList.add('active');

  if (id === 'ripple' && !rippleRunning) {
    rippleRunning = true;
    drawRipple();
  }
}

// ════════════════════════════════════════════
// EM SPECTRUM
// ════════════════════════════════════════════
const specData = [
  { name: 'Radio', emoji: '📻', color: '#8B0000', freq: '< 1 GHz',
    use: 'Radio broadcasting, TV signals, MRI machines in hospitals',
    fun: 'Radio waves can travel through walls and even mountains! AM radio can bounce off the ionosphere and travel thousands of km!' },
  { name: 'Microwave', emoji: '📡', color: '#FF4500', freq: '1 GHz – 300 GHz',
    use: 'Wi-Fi, mobile phones, satellite TV, microwave ovens',
    fun: 'Your microwave oven uses 2.45 GHz microwaves — they cause water molecules to vibrate rapidly, generating heat in food! Genius!' },
  { name: 'Infrared', emoji: '🌡️', color: '#FF8C00', freq: '300 GHz – 400 THz',
    use: 'TV remote controls, thermal cameras, night vision goggles, heat therapy',
    fun: 'Snakes can "see" infrared! Special pit organs detect heat radiation from prey even in total darkness. 🐍' },
  { name: 'Visible Light', emoji: '🌈', color: '#22CC44', freq: '400–700 THz',
    use: 'Human vision, photography, laser surgery, fiber optics',
    fun: 'Visible light is only a tiny sliver of the entire EM spectrum — yet it\'s the only part we can see! Red has the lowest frequency, violet the highest.' },
  { name: 'Ultraviolet', emoji: '🕶️', color: '#4444FF', freq: '700 THz – 30 PHz',
    use: 'Vitamin D production, sterilisation, fluorescent lights, detecting forgeries',
    fun: 'Bees can see UV light! Flowers have secret UV patterns on their petals that guide bees to the nectar — invisible to human eyes! 🐝' },
  { name: 'X-rays', emoji: '🩻', color: '#9400D3', freq: '30 PHz – 3 EHz',
    use: 'Medical imaging, airport security scanners, detecting structural defects',
    fun: 'Wilhelm Röntgen discovered X-rays in 1895 by accident! He took an X-ray of his wife\'s hand — she reportedly said it reminded her of her death! 😬' },
  { name: 'Gamma rays', emoji: '☢️', color: '#4B0082', freq: '> 3 EHz',
    use: 'Cancer radiotherapy, sterilising medical equipment, nuclear power',
    fun: 'Gamma rays have the shortest wavelength — some are smaller than an atomic nucleus! They come from radioactive decay and supernovae explosions.' },
];

function buildSpectrum() {
  const bar = document.getElementById('spectrumBar');
  if (!bar) return;
  specData.forEach((s, i) => {
    const div = document.createElement('div');
    div.className = 'spec-item';
    div.style.background = s.color;
    div.innerHTML = `<span>${s.emoji}</span>${s.name}`;
    div.onclick = () => showSpecInfo(i);
    bar.appendChild(div);
  });
}

function showSpecInfo(i) {
  const s = specData[i];
  const box = document.getElementById('spectrumInfo');
  box.innerHTML = `
    <h4>${s.emoji} ${s.name} Waves</h4>
    <p><strong>Frequency range:</strong> ${s.freq}</p>
    <p><strong>Used for:</strong> ${s.use}</p>
    <p>💡 <em>${s.fun}</em></p>
  `;
  box.style.borderColor = s.color;
}

buildSpectrum();

// ════════════════════════════════════════════
// WAVE CALCULATOR
// ════════════════════════════════════════════
function calcWave(changed) {
  const vEl = document.getElementById('calcV');
  const fEl = document.getElementById('calcF');
  const lEl = document.getElementById('calcL');
  const res = document.getElementById('calcResult');

  const v = parseFloat(vEl.value);
  const f = parseFloat(fEl.value);
  const l = parseFloat(lEl.value);

  let result = '';

  if (changed === 'v' && !isNaN(f) && !isNaN(l)) {
    // already have all three — just show
  }
  if (changed !== 'v' && !isNaN(f) && !isNaN(l)) {
    const calc = f * l;
    vEl.value = calc.toExponential(3);
    result = `✅ Wave Speed v = ${f} × ${l} = <strong>${calc.toExponential(3)} m/s</strong>`;
  } else if (changed !== 'f' && !isNaN(v) && !isNaN(l)) {
    const calc = v / l;
    fEl.value = calc.toExponential(3);
    result = `✅ Frequency f = ${v} / ${l} = <strong>${calc.toExponential(3)} Hz</strong>`;
  } else if (changed !== 'l' && !isNaN(v) && !isNaN(f)) {
    const calc = v / f;
    lEl.value = calc.toExponential(3);
    result = `✅ Wavelength λ = ${v} / ${f} = <strong>${calc.toExponential(3)} m</strong>`;
  } else {
    result = 'Enter any two values to solve for the third!';
  }

  res.innerHTML = result;
}

function loadExample(n) {
  const vEl = document.getElementById('calcV');
  const fEl = document.getElementById('calcF');
  const lEl = document.getElementById('calcL');
  const res = document.getElementById('calcResult');
  vEl.value = ''; fEl.value = ''; lEl.value = '';
  if (n === 1) { vEl.value = 1500; fEl.value = 2000000; calcWave('f'); }
  if (n === 2) { vEl.value = 3e8; fEl.value = 2.4e9; calcWave('f'); }
  if (n === 3) { vEl.value = 340; fEl.value = 440; calcWave('f'); }
}

// ════════════════════════════════════════════
// QUIZ
// ════════════════════════════════════════════
const quizData = [
  {
    q: "Which of the following is NOT a characteristic of a wave?",
    opts: ["Amplitude", "Frequency", "Mass", "Wavelength"],
    ans: 2,
    explanation: "✅ Correct! Waves transfer energy, not mass. Mass is a property of matter, not waves!"
  },
  {
    q: "A wave has frequency f = 4 Hz. What is its period T?",
    opts: ["4 seconds", "0.25 seconds", "0.4 seconds", "2 seconds"],
    ans: 1,
    explanation: "✅ T = 1/f = 1/4 = 0.25 seconds. Remember: Period and Frequency are opposites!"
  },
  {
    q: "The wave equation is v = fλ. A wave travels at 340 m/s with λ = 0.5 m. What is the frequency?",
    opts: ["680 Hz", "170 Hz", "0.0015 Hz", "340 Hz"],
    ans: 0,
    explanation: "✅ f = v/λ = 340/0.5 = 680 Hz. This is about the frequency of a high-pitched whistle!"
  },
  {
    q: "Which type of electromagnetic wave is used in medical imaging of bones?",
    opts: ["Radio waves", "Infrared waves", "X-rays", "Microwaves"],
    ans: 2,
    explanation: "✅ X-rays! They pass through soft tissue but are absorbed by dense bone, creating a shadow image."
  },
  {
    q: "Sound CANNOT travel through which medium?",
    opts: ["Air", "Water", "Steel", "Vacuum (empty space)"],
    ans: 3,
    explanation: "✅ Sound is a mechanical wave — it needs a medium! In the vacuum of space, there's no matter to vibrate."
  },
  {
    q: "If wave speed is constant and frequency doubles, what happens to wavelength?",
    opts: ["It doubles", "It halves", "It stays the same", "It quadruples"],
    ans: 1,
    explanation: "✅ From v = fλ: if v is constant and f doubles, then λ must halve. They are inversely proportional!"
  },
  {
    q: "Which wave type carries energy through oscillating electric and magnetic fields?",
    opts: ["Mechanical waves", "Sound waves", "Seismic waves", "Electromagnetic waves"],
    ans: 3,
    explanation: "✅ Electromagnetic waves! They don't need a medium — that's how sunlight reaches Earth through space!"
  },
  {
    q: "Ultrasound in medicine uses frequencies above 20,000 Hz. What property makes it useful for imaging?",
    opts: ["High amplitude", "Short wavelength (from high frequency)", "Long wavelength", "Low energy"],
    ans: 1,
    explanation: "✅ High frequency → short wavelength → can detect finer details. v = fλ: higher f means smaller λ!"
  }
];

let quizCurrent = 0;
let quizScore   = 0;
let quizAnswered = false;

function renderQuiz() {
  const box = document.getElementById('quizContent');
  if (!box) return;

  if (quizCurrent >= quizData.length) {
    const pct = Math.round((quizScore / quizData.length) * 100);
    const emoji = pct === 100 ? '🏆' : pct >= 75 ? '🌟' : pct >= 50 ? '😊' : '💪';
    const msg   = pct === 100 ? "Perfect score! You're a wave genius!" :
                  pct >= 75  ? "Great job! You really understand waves!" :
                  pct >= 50  ? "Good effort! Review the lessons and try again!" :
                               "Keep studying! Waves can be tricky — you've got this!";
    box.innerHTML = `
      <div class="quiz-score">
        <div class="score-emoji">${emoji}</div>
        <h3>Quiz Complete!</h3>
        <div class="score-badge">${quizScore}/${quizData.length}</div>
        <p>${msg}</p>
        <button class="btn-quiz" onclick="restartQuiz()">🔄 Try Again!</button>
      </div>
    `;
    return;
  }

  const q = quizData[quizCurrent];
  const progress = ((quizCurrent) / quizData.length) * 100;

  box.innerHTML = `
    <p class="quiz-question">Question ${quizCurrent + 1} of ${quizData.length}</p>
    <div class="quiz-progress-bar">
      <div class="quiz-progress-fill" style="width:${progress}%"></div>
    </div>
    <p class="quiz-sub">🧠 ${q.q}</p>
    <div class="quiz-options">
      ${q.opts.map((o, i) => `
        <button class="quiz-option" onclick="selectAnswer(${i})" id="opt${i}">
          ${['🅐','🅑','🅒','🅓'][i]} ${o}
        </button>
      `).join('')}
    </div>
    <div class="quiz-feedback" id="quizFeedback"></div>
    <div class="quiz-nav">
      <button class="btn-quiz" id="nextBtn" onclick="nextQuestion()" disabled>
        ${quizCurrent === quizData.length - 1 ? 'See Results 🎉' : 'Next Question →'}
      </button>
    </div>
  `;
  quizAnswered = false;
}

function selectAnswer(i) {
  if (quizAnswered) return;
  quizAnswered = true;

  const q = quizData[quizCurrent];
  const fb = document.getElementById('quizFeedback');
  const nextBtn = document.getElementById('nextBtn');

  document.querySelectorAll('.quiz-option').forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === q.ans) btn.classList.add('correct');
    else if (idx === i) btn.classList.add('wrong');
  });

  if (i === q.ans) {
    quizScore++;
    fb.textContent = q.explanation;
    fb.className = 'quiz-feedback show correct';
  } else {
    fb.textContent = `❌ Not quite! ${q.explanation}`;
    fb.className = 'quiz-feedback show wrong';
  }

  nextBtn.disabled = false;
}

function nextQuestion() {
  quizCurrent++;
  renderQuiz();
}

function restartQuiz() {
  quizCurrent = 0;
  quizScore   = 0;
  quizAnswered = false;
  renderQuiz();
}

// Init quiz on load
renderQuiz();

// ════════════════════════════════════════════
// SCROLL REVEAL — fade in cards
// ════════════════════════════════════════════
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.topic-card, .teacher-card, .sim-card, .quiz-box').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObs.observe(el);
});

// PROBLEM DISCUSSION
function openDiscussion(type){

  const text = document.getElementById("discussionText");

  if(type === "5g"){

    text.innerHTML = `
      📡 Stakeholders must discuss:
      <br><br>
      • Benefits of fast internet access
      <br>
      • Radiation concerns
      <br>
      • Student safety
      <br>
      • Communication technology needs
      <br><br>
      💡 Can technology and safety work together?
    `;

  }

  else if(type === "ultrasound"){

    text.innerHTML = `
      🏥 Stakeholders must discuss:
      <br><br>
      • Benefits for pregnant women
      <br>
      • Healthcare improvement
      <br>
      • Equipment cost
      <br>
      • Need for trained operators
      <br><br>
      💡 How can wave technology improve healthcare?
    `;

  }

}

// OPEN MODAL
function openModal(type){

  const modal = document.getElementById("modal");
  const body = document.getElementById("modalBody");

  if(type === "5g"){

    body.innerHTML = `

      <h2>📡 5G Tower Investigation</h2>

      <p>
        Your city plans to build a 5G tower near a school.
      </p>

      <p>
        Some people support faster internet access,
        while others worry about radiation safety.
      </p>

      <h3>🔍 Investigation Questions</h3>

      <ul>
        <li>What type of wave does 5G use?</li>
        <li>How does frequency affect wave energy?</li>
        <li>What are the benefits of 5G?</li>
        <li>How can technology be used safely?</li>
      </ul>

    `;

  }

  else if(type === "ultrasound"){

    body.innerHTML = `

      <h2>🏥 Ultrasound Investigation</h2>

      <p>
        A hospital wants to improve healthcare using ultrasound technology.
      </p>

      <p>
        Ultrasound uses sound waves to create images inside the body.
      </p>

      <h3>🔍 Investigation Questions</h3>

      <ul>
        <li>How do sound waves travel?</li>
        <li>Why is ultrasound safer than X-Ray?</li>
        <li>How do doctors use wave reflections?</li>
        <li>How does technology improve healthcare?</li>
      </ul>

    `;

  }

  modal.style.display = "flex";

}

// CLOSE MODAL
function closeModal(){

  document.getElementById("modal").style.display = "none";

}
