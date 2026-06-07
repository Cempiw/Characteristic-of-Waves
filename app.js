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
        <p>A <strong>wave</strong> is a disturbance that transfers <strong>energy</strong> from one place to another, without transporting matter!</p>
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
          <li>🌊 Ocean wave: water moves up/down, wave moves forward</li>
          <li>🔊 Sound wave: air molecules vibrate, sound travels</li>
          <li>☀️ Light wave: no medium needed at all!</li>
        </ul>
        <h4>🌍 Why Does This Matter?</h4>
        <p>This is the technological "holy grail". It's why we can send HD video from a satellite 36,000 km away without launching physical matter into space to deliver the message!</p>
        <div class="fact-box">
          <strong>🚀 Amazing:</strong> Radio waves sent by NASA travel 300,000 km every second, that's how we communicate with spacecraft billions of kilometres away!
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
        <p>The <strong>distance of one complete wave</strong>, from crest to crest or trough to trough. Pro tip: measure 5 waves and divide by 5 for accuracy!</p>

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

        <h4>🟦 Mechanical Waves: Need a Medium!</h4>
        <p>These waves need matter (solid, liquid, or gas) to travel through. They <strong>cannot</strong> travel through a vacuum.</p>
        <ul>
          <li>🔊 <strong>Sound waves</strong>: compression waves through air</li>
          <li>🌊 <strong>Water waves</strong>: surface waves on liquid</li>
          <li>🪨 <strong>Seismic waves</strong>: through the Earth's rock</li>
        </ul>

        <div class="fact-box">
          <strong>🚀 In space, no one can hear you scream!</strong> This is literally true, sound cannot travel through the vacuum of space because there's no medium!
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
          <li>🔬 <strong>Ultrasound (f = 1–20 MHz)</strong>: Doctors use high-frequency sound waves to see inside the body. Pregnant mothers use it to see their babies! No radiation involved.</li>
          <li>🩻 <strong>X-rays</strong>: High-energy EM waves that pass through soft tissue but are blocked by bone. Essential for detecting fractures and disease.</li>
          <li>👁️ <strong>Laser Surgery</strong>: Controlled amplitude laser beams reshape the cornea in LASIK eye surgery. Precise to micrometres!</li>
          <li>☢️ <strong>Radiotherapy</strong>: Gamma rays are focused on tumour cells to destroy cancer.</li>
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
          <li>☀️ <strong>Solar panels</strong>: Convert light (EM radiation) directly into electricity.</li>
          <li>🌊 <strong>Wave power converters</strong>: Use ocean wave energy to generate electricity.</li>
          <li>🔥 <strong>Microwave ovens</strong>: 2.45 GHz microwaves cause water molecules in food to vibrate, generating heat.</li>
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

// ═══════════════════════════════
// WAIT UNTIL HTML LOADED
// ═══════════════════════════════

document.addEventListener("DOMContentLoaded", () => {

  // ═══════════════════════════════
  // SIMULATION TAB
  // ═══════════════════════════════

  window.showSim = function(id, button){

    document
      .querySelectorAll(".sim-panel")
      .forEach(panel=>{

        panel.classList.remove("active");

      });

    document
      .querySelectorAll(".sim-tab")
      .forEach(tab=>{

        tab.classList.remove("active");

      });

    document
      .getElementById("sim-" + id)
      .classList.add("active");

    button.classList.add("active");

  }

  // ═══════════════════════════════
  // RIPPLE TANK — Interactive
  // ═══════════════════════════════

  const canvas = document.getElementById("rippleCanvas");

  if(canvas){
    const ctx = canvas.getContext("2d");
    let time = 0;
    let rippleFreq = 2;    // waves per second
    let rippleAmp  = 1.0;  // amplitude scale
    let dualSource = false;
    let animId;

    // Hook up sliders
    const freqSlider = document.getElementById("rippleFreq");
    const ampSlider  = document.getElementById("rippleAmp");
    const dualBtn    = document.getElementById("rippleDual");
    const freqVal    = document.getElementById("rippleFreqVal");
    const ampVal     = document.getElementById("rippleAmpVal");

    if(freqSlider){
      freqSlider.addEventListener("input", ()=>{
        rippleFreq = parseFloat(freqSlider.value);
        freqVal.textContent = rippleFreq + " Hz";
      });
    }
    if(ampSlider){
      ampSlider.addEventListener("input", ()=>{
        rippleAmp = parseFloat(ampSlider.value);
        ampVal.textContent = rippleAmp.toFixed(1) + "x";
      });
    }
    if(dualBtn){
      dualBtn.addEventListener("click", ()=>{
        dualSource = !dualSource;
        dualBtn.textContent = dualSource ? "🔵 Dual Source: ON" : "⚪ Dual Source: OFF";
        dualBtn.style.background = dualSource
          ? "linear-gradient(135deg,#06b6d4,#7c3aed)"
          : "";
        dualBtn.style.color = dualSource ? "white" : "";
      });
    }

    function drawSource(cx, cy, col){
      const numRings = Math.floor(6 + rippleFreq);
      const speed = 60 + rippleFreq * 15;
      for(let i = 0; i < numRings; i++){
        const r = ((time * speed * 0.05) + i * (200 / rippleFreq)) % 260;
        const alpha = rippleAmp * (1 - r / 260) * 0.9;
        if(alpha <= 0) continue;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = col.replace("1)", `${alpha.toFixed(2)})`);
        ctx.lineWidth = 2.5 * rippleAmp;
        ctx.stroke();
      }
    }

    function animateRipple(){
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background gradient
      const grad = ctx.createLinearGradient(0,0,0,canvas.height);
      grad.addColorStop(0,"#e0f7ff");
      grad.addColorStop(1,"#b3e8ff");
      ctx.fillStyle = grad;
      ctx.fillRect(0,0,canvas.width,canvas.height);

      if(dualSource){
        drawSource(canvas.width * 0.33, canvas.height / 2, "rgba(59,130,246,1)");
        drawSource(canvas.width * 0.67, canvas.height / 2, "rgba(168,85,247,1)");
        // interference label
        ctx.fillStyle = "rgba(30,30,80,0.55)";
        ctx.font = "bold 13px Nunito, sans-serif";
        ctx.fillText("← Source 1", 24, canvas.height - 16);
        ctx.fillText("Source 2 →", canvas.width - 110, canvas.height - 16);
        ctx.fillText("Interference Zone", canvas.width/2 - 62, canvas.height - 16);
      } else {
        drawSource(canvas.width / 2, canvas.height / 2, "rgba(59,130,246,1)");
      }

      // Frequency label
      ctx.fillStyle = "rgba(30,30,80,0.45)";
      ctx.font = "13px Nunito, sans-serif";
      ctx.fillText(`f = ${rippleFreq} Hz  |  Amplitude = ${rippleAmp.toFixed(1)}x`, 12, 20);

      time++;
      animId = requestAnimationFrame(animateRipple);
    }

    animateRipple();
  }

  // ═══════════════════════════════
  // EM SPECTRUM — info on click
  // ═══════════════════════════════

  const emData = {
    radio:     { emoji:"📻", freq:"< 300 MHz",  lambda:"> 1 m",       energy:"Very Low", use:"Radio/TV broadcasting, WiFi, 5G communication, MRI machines", safe:"✅ Non-ionising — completely safe at normal exposure levels" },
    microwave: { emoji:"📡", freq:"300 MHz–300 GHz", lambda:"1 mm–1 m", energy:"Low",  use:"Microwave ovens (2.45 GHz), satellite communication, weather radar, 5G", safe:"✅ Non-ionising — microwave ovens are shielded to prevent leakage" },
    infrared:  { emoji:"🌡️", freq:"300 GHz–430 THz", lambda:"700 nm–1 mm", energy:"Medium-Low", use:"TV remote controls, thermal cameras, night vision, physiotherapy heat treatment", safe:"✅ Non-ionising — felt as heat; excessive exposure can cause burns" },
    visible:   { emoji:"🌈", freq:"430–770 THz", lambda:"400–700 nm", energy:"Medium", use:"Human vision, photography, laser surgery (LASIK), fibre optic communication", safe:"✅ Non-ionising — safe; very intense lasers can damage eyes" },
    uv:        { emoji:"☀️", freq:"770 THz–30 PHz", lambda:"10–400 nm", energy:"Medium-High", use:"Vitamin D synthesis in skin, sterilisation, fluorescent lights, counterfeit detection", safe:"⚠️ Borderline ionising — UV-A/B cause sunburn & skin cancer; use sunscreen!" },
    xray:      { emoji:"🩻", freq:"30 PHz–30 EHz", lambda:"0.01–10 nm", energy:"High",  use:"Medical imaging of bones & organs, airport security scanners, cancer radiotherapy", safe:"⚠️ Ionising — can damage DNA; medical X-rays are carefully minimised" },
    gamma:     { emoji:"☢️", freq:"> 30 EHz",    lambda:"< 0.01 nm",  energy:"Very High", use:"Cancer radiotherapy (kills tumour cells), sterilising medical equipment, nuclear power", safe:"⚠️ Highly ionising — dangerous in large doses; shielding is required" }
  };

  document.querySelectorAll(".wave-box").forEach(box => {
    box.style.cursor = "pointer";
    box.addEventListener("click", () => {
      const key = box.getAttribute("data-wave");
      const d   = emData[key];
      if(!d) return;

      // Remove active from all
      document.querySelectorAll(".wave-box").forEach(b => b.classList.remove("wave-active"));
      box.classList.add("wave-active");

      const panel = document.getElementById("spectrumInfo");
      if(panel){
        panel.innerHTML = `
          <div class="spec-info-header">
            <span class="spec-emoji">${d.emoji}</span>
            <div>
              <strong>${box.querySelector(".wave-name")?.textContent || key}</strong>
              <div class="spec-badges">
                <span class="spec-badge">⚡ ${d.freq}</span>
                <span class="spec-badge">📏 λ = ${d.lambda}</span>
                <span class="spec-badge">🔋 Energy: ${d.energy}</span>
              </div>
            </div>
          </div>
          <div class="spec-row"><strong>🛠️ Uses:</strong> ${d.use}</div>
          <div class="spec-row">${d.safe}</div>
        `;
        panel.classList.add("spec-active");
      }
    });
  });

  // ═══════════════════════════════
  // WAVE CALCULATOR
  // ═══════════════════════════════

  window.calculateWave = function(){

    const v =
      parseFloat(
        document.getElementById("calcV").value
      );

    const f =
      parseFloat(
        document.getElementById("calcF").value
      );

    const l =
      parseFloat(
        document.getElementById("calcL").value
      );

    let result = "";

    if(!isNaN(f) && !isNaN(l)){

      result =
        "Wave Speed = " +
        (f*l).toFixed(2) +
        " m/s";

    }

    else if(!isNaN(v) && !isNaN(f)){

      result =
        "Wavelength = " +
        (v/f).toFixed(2) +
        " m";

    }

    else if(!isNaN(v) && !isNaN(l)){

      result =
        "Frequency = " +
        (v/l).toFixed(2) +
        " Hz";

    }

    else{

      result =
        "Please enter two values.";

    }

    document
      .getElementById("calcResult")
      .innerHTML = result;

  }

});
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
  },
{
q: "Why are electromagnetic waves important for global communication?",
opts:["Because they move slowly", "Because they require water", "Because they can travel through space", "Because they only exist in air"],
ans:2
},

{
q: "A doctor uses ultrasound instead of X-Ray for pregnancy checks. Why?",
opts:["Ultrasound uses visible light", "Ultrasound is safer for soft tissues", "X-Ray cannot form images", "Ultrasound travels slower"],
ans:1
},

{
q: "A wave has high frequency. What usually happens to its wavelength?",
opts:["It becomes longer", "It becomes shorter", "It disappears", "It doubles"],
ans:1
},

{
q: "Why should scientists consider stakeholders before building new technology?",
opts:["To avoid using science", "To balance benefits and risks", "To stop innovation", "To reduce communication"],
ans:1
},

{
q: "Which technology uses electromagnetic waves?",
opts:["Ultrasound", "Drum vibration", "Wi-Fi", "Tuning fork"],
ans:2
},

{
q:"What could happen if wave amplitude increases?",
opts:["The energy may increase", "The wave stops moving", "The frequency disappears", "The wavelength becomes zero"],
ans:0
},

{
q:"Why are waves useful in disaster warning systems?",
opts:["They can detect earthquakes and tsunamis", "They stop natural disasters", "They reduce gravity", "They create earthquakes"],
ans:0
},

{
q:"How does wave technology support SDG 3?",
opts:["By reducing internet access", "By improving healthcare systems", "By increasing pollution", "By replacing doctors"],
ans:1
},

{
q: "Which stakeholder is MOST concerned about environmental impacts?",
opts:["Engineer", "Environmentalist", "Doctor", "Student"],
ans:1
},

{
q:"Why do astronauts rely on electromagnetic waves?",
opts:["Sound cannot travel in space", "Water absorbs all waves", "Mechanical waves travel faster", "Gravity blocks communication"],
ans:0
},

{
q:"What is the relationship between frequency and energy?",
opts:["Higher frequency usually means higher energy", "Higher frequency lowers energy", "No relationship exists", "Energy disappears completely"],
ans:0
},

{
q:"Why can light travel through vacuum?",
opts:["It is a mechanical wave", "It is an electromagnetic wave", "It requires particles", "It only travels in liquids"],
ans:1
},

{
question: "What is one ethical issue related to communication towers?",
opts:["Internet speed only", "Balancing public safety and technology", "Wave color", "Sound quality"],
ans:1
},

{
q: "How does wave reflection help doctors?",
opts:["It creates ultrasound images", "It changes blood type", "It removes diseases", "It creates oxygen"],
ans:0
},

{
q:"What happens if frequency decreases while speed stays constant?",
opts:["Wavelength increases", "Wavelength decreases", "Amplitude disappears", "Energy becomes zero"],
ans:0
},

{
q: "Why is collaboration important in solving technology issues?",
opts:["One person knows everything", "Different stakeholders provide perspectives", "Technology never affects society", "Science has no risks"],
ans:1
},

{
q: "What is the BEST solution for safe technology development?",
opts:["Ignore stakeholders", "Stop all technology", "Use scientific evidence and collaboration", "Only focus on profit"],
ans:2
},

{
q:"How do waves transfer energy?",
opts:["By moving all matter permanently", "By transferring disturbances", "By destroying particles", "By removing energy"],
ans:1
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

  const content = {
    "5g": {
      badge: "📡 Communication Technology",
      title: "5G Tower Near School",
      color: "#06b6d4",
      scenario: `A city government plans to build a 5G communication tower 150 metres from a middle school. 
        The tower will provide high-speed internet to thousands of households. However, parents and teachers 
        have raised concerns about long-term electromagnetic radiation exposure for students.`,
      science: [
        { icon:"📶", title:"What is 5G?", text:"5G uses radio waves (non-ionising EM waves) at frequencies of 0.6–100 GHz. Non-ionising means they do NOT have enough energy to break chemical bonds or damage DNA." },
        { icon:"⚡", title:"Energy & Frequency", text:"Higher frequency → higher energy per photon. But 5G's power levels are far below the threshold for biological harm set by international safety standards (ICNIRP)." },
        { icon:"📏", title:"Wavelength Matters", text:"5G uses shorter wavelengths (millimetre waves) that are absorbed by buildings and air quickly — which is why towers need to be placed closer to users." }
      ],
      questions: [
        "What type of electromagnetic wave does 5G use, and is it ionising or non-ionising?",
        "How does distance from the tower affect the intensity of the electromagnetic field?",
        "What evidence would you need to decide if the tower is safe to build near a school?",
        "Which stakeholders benefit and which stakeholders are at risk?"
      ],
      perspectives: [
        { role:"🎒 Student", view:"Wants fast internet for research, but worries about daily radiation exposure during school hours." },
        { role:"📡 Engineer", view:"States the tower meets all ICNIRP safety standards. Power levels are thousands of times below harmful thresholds." },
        { role:"🏛️ Government", view:"Wants to improve city connectivity and attract economic investment, but must protect public welfare." },
        { role:"🌱 Environmentalist", view:"Concerned about effects on local wildlife (birds, bees) that may be sensitive to EM fields." }
      ]
    },
    "ultrasound": {
      badge: "🏥 Medical Technology",
      title: "Ultrasound for Rural Hospital",
      color: "#7c3aed",
      scenario: `A rural hospital serving 50,000 people wants to purchase ultrasound equipment. The machine costs 
        $80,000 USD and requires a trained sonographer to operate. Currently, pregnant women must travel 3 hours 
        to the nearest city for prenatal scans — some choose not to go at all.`,
      science: [
        { icon:"🔊", title:"How Ultrasound Works", text:"Ultrasound uses sound waves at frequencies above 20,000 Hz (typically 1–20 MHz for medical use). These waves are emitted into the body and reflected back by different tissues, creating an image." },
        { icon:"📐", title:"Wave Equation in Action", text:"In human tissue, sound travels at ~1,500 m/s. At 2 MHz: λ = v/f = 1500 ÷ 2,000,000 = 0.00075 m (0.75 mm). This tiny wavelength gives very detailed images!" },
        { icon:"✅", title:"Safety Profile", text:"Unlike X-rays, ultrasound uses mechanical waves (NOT ionising radiation). It does not damage DNA and is safe for foetuses, making it ideal for pregnancy monitoring." }
      ],
      questions: [
        "How does ultrasound produce an image using wave reflection?",
        "Why is ultrasound safer than X-rays for monitoring pregnancies?",
        "What would happen to image quality if the frequency was lowered?",
        "How do you weigh the cost of equipment against the number of lives it could improve?"
      ],
      perspectives: [
        { role:"🩺 Doctor", view:"Strongly supports the purchase — early detection of complications can save lives and reduce emergency cases." },
        { role:"🏛️ Government", view:"Concerned about budget — $80,000 is a significant investment. Could the money help more people if spent differently?" },
        { role:"🤱 Patient", view:"A pregnant woman in the village: 'I missed my last two checkups because the journey is too far and too expensive.'" },
        { role:"📚 Health Educator", view:"Wants to train local staff to operate the machine sustainably, not rely on outside experts." }
      ]
    }
  };

  const d = content[type];
  if(!d) return;

  body.innerHTML = `
    <div class="modal-badge" style="background:${d.color}20;color:${d.color}">${d.badge}</div>
    <h2 class="modal-title">${d.title}</h2>

    <div class="modal-scenario">
      <div class="modal-scenario-icon">📋</div>
      <p>${d.scenario}</p>
    </div>

    <h4 class="modal-section-title">🔬 The Science Behind It</h4>
    <div class="modal-science-grid">
      ${d.science.map(s=>`
        <div class="modal-science-card">
          <div class="modal-science-icon">${s.icon}</div>
          <div>
            <strong>${s.title}</strong>
            <p>${s.text}</p>
          </div>
        </div>
      `).join('')}
    </div>

    <h4 class="modal-section-title">❓ Guided Investigation Questions</h4>
    <ol class="modal-questions">
      ${d.questions.map(q=>`<li>${q}</li>`).join('')}
    </ol>

    <h4 class="modal-section-title">👥 Stakeholder Perspectives</h4>
    <div class="modal-perspectives">
      ${d.perspectives.map(p=>`
        <div class="modal-perspective-card">
          <div class="modal-perspective-role">${p.role}</div>
          <p>${p.view}</p>
        </div>
      `).join('')}
    </div>

    <div class="modal-cta">
      💡 <strong>Your Mission:</strong> Discuss with your group and write a recommendation 
      in the Stakeholder Worksheet below!
    </div>
  `;

  modal.style.display = "flex";

}

// CLOSE MODAL
function closeModal(){

  document.getElementById("modal").style.display = "none";

}

// WORKSHEET SUBMIT
function submitWorksheet(){

  const message = document.getElementById("submitMessage");

  message.innerHTML =
    "🎉 Great job! Your stakeholder discussion has been submitted successfully.";

}

function scrollToTop(){
  window.scrollTo({ top:0, behavior:"smooth" });
}

// ── BLUE & GREEN CURRICULUM TAB SWITCH ─────
function switchBGTab(tab, btn){
  document.querySelectorAll('.bg-tab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.bg-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('bg-' + tab).classList.add('active');
}

// ── FLIP CARD TOGGLE ────────────────────────
function toggleBGCard(card){
  card.classList.toggle('flipped');
}
/* ═══════════════════════════════════════
   BLUE & GREEN CURRICULUM CAMPAIGN
═══════════════════════════════════════ */

// SECTION REVEAL ANIMATION
const campaignCards = document.querySelectorAll(
  '.ocean-card, .green-card, .campaign-card'
);

campaignCards.forEach(card => {

  card.style.opacity = '0';
  card.style.transform = 'translateY(40px)';
  card.style.transition =
    'all 0.8s ease';

  revealObs.observe(card);

});

// BUTTON INTERACTION
document.querySelectorAll('.campaign-btn')
.forEach(btn => {

  btn.addEventListener('click', () => {

    btn.innerHTML = '✅ Joined Campaign!';

    btn.style.background =
      'linear-gradient(135deg,#22c55e,#16a34a)';

  });

});

// SIMPLE COUNTER ANIMATION
const counters =
  document.querySelectorAll('.campaign-number');

counters.forEach(counter => {

  const target =
    +counter.getAttribute('data-target');

  let current = 0;

  const updateCounter = () => {

    const increment = target / 80;

    if(current < target){

      current += increment;

      counter.innerText =
        Math.floor(current);

      requestAnimationFrame(updateCounter);

    } else {

      counter.innerText = target;

    }

  };

  updateCounter();

});

// CURRICULUM TAB SWITCH
function showCurriculum(type){

  document
    .querySelectorAll('.curriculum-panel')
    .forEach(panel => {

      panel.classList.remove('active');

    });

  document
    .getElementById(type)
    .classList.add('active');

}
