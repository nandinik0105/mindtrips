/* ══════════════════════════════════════════
   FEATURES DEMOS
══════════════════════════════════════════ */
function toggleDemo(id){
  const d=document.getElementById('demo-'+id);
  const isOpen=d.classList.contains('open');
  document.querySelectorAll('.feature-demo').forEach(x=>x.classList.remove('open'));
  document.querySelectorAll('.feature-card').forEach(x=>x.classList.remove('active'));
  if(!isOpen){
    d.classList.add('open');
    d.closest('.feature-card').classList.add('active');
    if(id==='ai')runAIDemo();
  }
}

const AI_DEMO_LINES=[
  "📍 Day 1 — Amber Fort at dawn (7am). Beat crowds, see Sheesh Mahal's mirror ceiling.",
  "🍽️ Lunch: 1135 AD inside Amber Fort complex — Rajasthani thali ₹800.",
  "🛍️ Evening: Johari Bazaar for gems. Bargain hard — start at 40% of asking price.",
  "🏰 Day 2 — City Palace museum (2hrs) → Jantar Mantar UNESCO (1hr).",
  "🌅 Tip: Nahargarh Fort at 5:30pm. Best sunset view in all of Jaipur.",
  "🎭 Night: Chokhi Dhani for folk dance, puppet show, camel ride — full Rajasthani experience.",
];
function runAIDemo(){
  const c=document.getElementById('ai-demo-lines');c.innerHTML='';
  AI_DEMO_LINES.forEach((line,i)=>{
    setTimeout(()=>{
      const d=document.createElement('div');
      d.className='ai-demo-line';d.style.animationDelay='0s';
      d.textContent=line;d.style.marginBottom='.4rem';
      c.appendChild(d);
    },i*350);
  });
}

function demoExportPDF(){const m=document.getElementById('export-preview-msg');m.style.display='block';m.innerHTML='✅ <strong>PDF Generated!</strong> mindtrips-jaipur-5day.pdf (248 KB)<br><span style="color:var(--muted)">Includes: itinerary, map, hotel list, budget breakdown</span>';}
function demoShareLink(){const m=document.getElementById('export-preview-msg');m.style.display='block';m.innerHTML='🔗 <strong>Link copied!</strong> mindtrips.app/trip/JAI-2025-5D<br><span style="color:var(--muted)">Anyone with this link can view your itinerary</span>';navigator.clipboard?.writeText('https://mindtrips.app/trip/JAI-2025-5D').catch(()=>{});}
function demoWhatsApp(){const m=document.getElementById('export-preview-msg');m.style.display='block';m.innerHTML='💬 <strong>Opening WhatsApp…</strong><br><span style="color:var(--muted)">Sharing: "My MindTrip to Jaipur — 5 days, ₹25,000 budget 🏰"</span>';}

