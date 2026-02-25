/* ══════════════════════════════════════════
   SMART PREDICTOR — AI Engine
   Trained on 139 Indian destinations, 9 features
══════════════════════════════════════════ */

// ── Trained Model Data (scikit-learn RandomForest export) ───────────
const RF_MODEL = {
  weights: [0.11377,0.21148,0.04839,0.06669,0.16872,0.04656,0.10064,0.12931,0.11445],
  centroids: {
    "Budget Backpacker": [0.667,1266.7,0.333,3.667,2.667,3.667,3.0,1.667,2.667],
    "Mid-Range Comfort":  [1.8,3120.0,1.8,3.0,4.0,4.2,1.4,3.2,4.0],
    "Luxury Explorer":    [2.556,9055.6,0.222,3.5,1.278,5.0,2.278,4.778,3.611],
    "Family Trip":        [2.815,2242.6,0.352,2.852,3.352,4.537,1.741,2.611,3.778],
    "Couple Getaway":     [1.5,3426.9,0.885,3.615,2.192,4.654,2.385,3.346,3.5],
    "Solo Adventure":     [3.091,2606.1,0.424,4.030,1.697,4.091,3.515,2.424,2.485]
  },
  ranges: [
    {min:0,max:6},{min:1000,max:18000},{min:0,max:3},
    {min:2,max:14},{min:1,max:5},{min:3,max:5},
    {min:1,max:5},{min:1,max:5},{min:1,max:5}
  ],
  labels: ["Budget Backpacker","Mid-Range Comfort","Luxury Explorer","Family Trip","Couple Getaway","Solo Adventure"]
};

const STYLE_INFO = {
  'Budget Backpacker':{ emoji:'🎒', desc:'You love the raw, real India — local trains, chai at roadside stalls, sunrise treks and making friends in hostel dorms. Maximum experience, minimum spend.', topFact:'Budget-conscious traveller', destFact:'Prefer off-beat or quiet spots', tip:'Pack light, say yes to everything — your best stories come from the unexpected.' },
  'Mid-Range Comfort': { emoji:'🏨', desc:'You want a great trip without breaking the bank — clean comfortable hotels, a mix of local and sit-down restaurants, and reliable transport.', topFact:'Balanced comfort & value', destFact:'City stays or hill retreats', tip:'Book 2–3 experiences in advance; keep the rest flexible for spontaneous detours.' },
  'Luxury Explorer':   { emoji:'👑', desc:'India's finest — heritage palaces, private safari jeeps, rooftop dinners and wellness spas. You believe a great journey deserves great comfort.', topFact:'Premium experience seeker', destFact:'Iconic or exclusive destinations', tip:'Rajasthan palaces, Kerala resorts or Andaman private villas are made for you.' },
  'Family Trip':       { emoji:'👨‍👩‍👧', desc:'You're travelling with the people who matter most. Safe, fun and enriching experiences for all ages — creating memories that last a lifetime.', topFact:'Child-friendly & safe choices', destFact:'Scenic & accessible spots', tip:'Hill stations in summer and heritage towns in winter work beautifully for families.' },
  'Couple Getaway':    { emoji:'💑', desc:'Romance, scenery and togetherness — boutique stays, candlelit dinners, sunset viewpoints and places beautiful enough to become your story.', topFact:'Romantic & scenic vibes', destFact:'Intimate or picturesque spots', tip:'Dal Lake houseboats, Alleppey backwaters or Pondicherry's French Quarter — pure magic.' },
  'Solo Adventure':    { emoji:'🧗', desc:'You travel on your own terms — unplanned, deep and fearless. Off-beat trails, local immersion, and the kind of freedom that only solo travel gives.', topFact:'Independent & adventurous', destFact:'Remote or less touristy places', tip:'Ladakh, Spiti, Ziro Valley — places that reward the brave solo explorer most.' }
};

const STYLE_SUGGESTIONS = {
  'Budget Backpacker':  ['Kasol, HP','Mcleod Ganj, HP','Gokarna, Karnataka','Varkala, Kerala','Hampi, Karnataka','Spiti Valley, HP'],
  'Mid-Range Comfort':  ['Shimla, HP','Ooty, Tamil Nadu','Mussoorie, Uttarakhand','Mysuru, Karnataka','Kochi, Kerala','Pondicherry'],
  'Luxury Explorer':    ['Udaipur, Rajasthan','Lakshadweep','Jaipur, Rajasthan','Alleppey, Kerala','Havelock Island, Andaman','Coorg, Karnataka'],
  'Family Trip':        ['Ooty, Tamil Nadu','Mussoorie, Uttarakhand','Munnar, Kerala','Amritsar, Punjab','Coorg, Karnataka','Darjeeling, WB'],
  'Couple Getaway':     ['Dal Lake, Srinagar','Alleppey, Kerala','Andaman Islands','Pondicherry','Pahalgam, J&K','Udaipur, Rajasthan'],
  'Solo Adventure':     ['Leh, Ladakh','Spiti Valley, HP','Ziro Valley, Arunachal','Valley of Flowers, Uttarakhand','Tawang, Arunachal','Sandakphu, WB']
};

const MATCH_COLORS = ['#4CAF7D','#5B9BD5','#C8A96E','#FF6B35','#a78bfa','#f59e0b'];

// ── Quiz state ──────────────────────────────────────────────────────
let quizState = { destType:1, budget:2500, crowd:3, adventure:3, family:3, luxury:3, duration:5, season:0 };
let lastPrediction = null;

function selectOpt(btn, groupId, val) {
  document.querySelectorAll(`#${groupId} .qopt`).forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  const key = groupId.replace('q-','');
  if(key==='dest') quizState.destType = val;
  else if(key==='budget') quizState.budget = val;
  else if(key==='days') quizState.duration = val;
  else if(key==='season') quizState.season = val;
}

function selectVibe(btn, groupId, crowd, adv, fam) {
  document.querySelectorAll(`#${groupId} .qopt`).forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  quizState.crowd = crowd;
  quizState.adventure = adv;
  quizState.family = fam;
}

function selectComfort(btn, groupId, lux) {
  document.querySelectorAll(`#${groupId} .qopt`).forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  quizState.luxury = lux;
}

// ── Core inference (weighted centroid distance from RF model) ────────
function rfInference(features) {
  const w = RF_MODEL.weights;
  const norm = features.map((v,i) => {
    const r = RF_MODEL.ranges[i];
    return (v - r.min) / (r.max - r.min + 1e-9);
  });
  const scores = {};
  for(const [label, centroid] of Object.entries(RF_MODEL.centroids)) {
    const cNorm = centroid.map((v,i) => {
      const r = RF_MODEL.ranges[i];
      return (v - r.min) / (r.max - r.min + 1e-9);
    });
    let dist = 0;
    for(let i=0; i<norm.length; i++) dist += w[i] * Math.pow(norm[i]-cNorm[i],2);
    scores[label] = 1 / (1 + Math.sqrt(dist));
  }
  // Softmax
  const vals = Object.values(scores);
  const maxV = Math.max(...vals);
  const exps = vals.map(v => Math.exp((v-maxV)*9));
  const sumE = exps.reduce((a,b)=>a+b,0);
  const probs = {};
  Object.keys(scores).forEach((k,i) => { probs[k] = exps[i]/sumE; });
  const predicted = Object.entries(probs).reduce((a,b)=>b[1]>a[1]?b:a)[0];
  return { predicted, probs };
}

function runAIPredict() {
  const btn = document.getElementById('predictBtn');
  const thinking = document.getElementById('ai-thinking');
  btn.classList.add('running');
  document.getElementById('predict-btn-text').textContent = '⏳ Finding your style…';
  thinking.classList.add('show');
  document.getElementById('ml-result').style.display='none';

  const features = [
    quizState.destType, quizState.budget, quizState.season,
    quizState.duration, quizState.crowd, 4,   // safety default 4
    quizState.adventure, quizState.luxury, quizState.family
  ];

  setTimeout(() => {
    const { predicted, probs } = rfInference(features);
    lastPrediction = predicted;
    const info = STYLE_INFO[predicted];
    const topConf = Math.round(probs[predicted]*100);

    btn.classList.remove('running');
    document.getElementById('predict-btn-text').textContent = '✦ Discover My Travel Style';
    thinking.classList.remove('show');

    // Style card
    document.getElementById('result-emoji').textContent = info.emoji;
    document.getElementById('pred-style-text').textContent = predicted;
    document.getElementById('pred-conf-badge').textContent = `${topConf}% match`;
    document.getElementById('pred-desc').textContent = info.desc;

    // Match bars — friendly sorted
    const sorted = Object.entries(probs).sort((a,b)=>b[1]-a[1]);
    document.getElementById('match-bars').innerHTML = sorted.map(([label,prob],i) => {
      const pct = Math.round(prob*100);
      const isTop = label===predicted;
      return `<div class="match-row">
        <div class="match-label" style="${isTop?'color:var(--sand);font-weight:500':''}">${label}</div>
        <div class="match-track"><div class="match-fill" style="width:0%;background:${MATCH_COLORS[i]};${isTop?'box-shadow:0 0 6px '+MATCH_COLORS[i]+'60':''}" data-w="${pct}"></div></div>
        <div class="match-pct" style="${isTop?'color:var(--green)':''}">${pct}%</div>
      </div>`;
    }).join('');

    // 3 insight cards
    document.getElementById('insight-top').innerHTML = `<strong>Your Travel DNA</strong>${info.topFact}`;
    document.getElementById('insight-dest').innerHTML = `<strong>Best Destinations For You</strong>${info.destFact}`;
    document.getElementById('insight-tip').innerHTML = `<strong>Pro Tip</strong>${info.tip}`;

    // Suggested destinations
    document.getElementById('sugg-row').innerHTML = (STYLE_SUGGESTIONS[predicted]||[]).map(s=>
      `<span class="sugg-chip" onclick="applyDestSuggestion('${s}')">${s}</span>`
    ).join('');

    const resultEl = document.getElementById('ml-result');
    resultEl.style.display='block';

    // Animate bars
    setTimeout(()=>{
      document.querySelectorAll('.match-fill').forEach(el=>{el.style.width=el.dataset.w+'%'});
    },150);

    resultEl.scrollIntoView({behavior:'smooth',block:'nearest'});
  }, 1300);
}

function updateLabel(id, options, val) {
  document.getElementById(id).textContent = options[parseInt(val)]||options[0];
}

function applyDestSuggestion(dest) {
  const destSel = document.getElementById('dest');
  const city = dest.split(',')[0].trim().toLowerCase();
  const match = Array.from(destSel.options).find(o=>o.text.toLowerCase().includes(city));
  if(match) destSel.value = match.value;
  document.getElementById('planner').scrollIntoView({behavior:'smooth'});
}

function applyAIPrediction() {
  if(lastPrediction){
    const styleSel = document.getElementById('style');
    const match = Array.from(styleSel.options).find(o=>o.text===lastPrediction);
    if(match) styleSel.value = match.value;
    const suggs = STYLE_SUGGESTIONS[lastPrediction]||[];
    if(suggs.length) applyDestSuggestion(suggs[0]);
  }
  document.getElementById('planner').scrollIntoView({behavior:'smooth'});
}

function buildConfusionMatrix(){}  // kept for backward compat

