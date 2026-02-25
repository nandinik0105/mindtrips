/* ══════════════════════════════════════════
   PLANNER
══════════════════════════════════════════ */
function generatePlan(){
  const dest=document.getElementById('dest').value;
  const days=document.getElementById('days').value;
  const budget=parseInt(document.getElementById('budget').value)||20000;
  const style=document.getElementById('style').value;
  const travellers=document.getElementById('travellers').value;
  if(!dest){alert('Please choose a destination!');return;}
  const btn=document.getElementById('planBtn');
  btn.classList.add('loading');btn.innerHTML='⏳ Crafting your journey…';
  setTimeout(()=>{
    btn.classList.remove('loading');btn.innerHTML='✦ Generate My MindTrip';
    document.getElementById('result-title').textContent=`Your Trip to ${dest.split(',')[0]}`;
    document.getElementById('result-meta').textContent=`${days} · ${style} · ${travellers}`;
    document.getElementById('result-badge').textContent=`₹${budget.toLocaleString('en-IN')} Budget`;

    const itinData=(ITINERARY[dest]||{})[days]||getGenericItinerary(dest,parseInt(days));
    document.getElementById('itinerary').innerHTML=itinData.map(d=>`<div class="day-card"><h4>${d.day} — ${d.title}</h4><p>${d.desc}</p></div>`).join('');

    const nDays=parseInt(days);const perDay=Math.floor(budget/nDays);
    const acc=Math.floor(perDay*.4),food=Math.floor(perDay*.25),trans=Math.floor(perDay*.2),act=Math.floor(perDay*.15);
    document.getElementById('budget-breakdown').innerHTML=[
      {l:'Total Budget',a:`₹${budget.toLocaleString('en-IN')}`},
      {l:'Per Day',a:`₹${perDay.toLocaleString('en-IN')}`},
      {l:'Stay',a:`₹${(acc*nDays).toLocaleString('en-IN')}`},
      {l:'Food',a:`₹${(food*nDays).toLocaleString('en-IN')}`},
      {l:'Transport',a:`₹${(trans*nDays).toLocaleString('en-IN')}`},
      {l:'Activities',a:`₹${(act*nDays).toLocaleString('en-IN')}`},
    ].map(b=>`<div class="budget-item"><div class="amount">${b.a}</div><div class="label">${b.l}</div></div>`).join('');

    document.getElementById('budget-bars').innerHTML=[
      {l:'Stay',pct:40,c:'#C8A96E'},{l:'Food',pct:25,c:'#FF6B35'},{l:'Transport',pct:20,c:'#5B9BD5'},{l:'Activities',pct:15,c:'#4CAF7D'}
    ].map(b=>`<div class="budget-bar-row"><div class="budget-bar-label">${b.l}</div><div class="budget-bar-track"><div class="budget-bar-fill" style="width:0%;background:${b.c}" data-w="${b.pct}"></div></div><div class="budget-bar-val">${b.pct}%</div></div>`).join('');
    setTimeout(()=>{document.querySelectorAll('.budget-bar-fill').forEach(el=>{el.style.width=el.dataset.w+'%'})},100);

    const hotels=HOTELS[dest]||FALLBACK_HOTELS;
    const city=dest.split(',')[0].trim();
    const cityEnc=encodeURIComponent(city);
    const nDaysNum=parseInt(days);
    // Checkin = today + 7 days, checkout = checkin + nDays (for demo links)
    const cin=new Date(Date.now()+7*864e5);
    const cout=new Date(cin.getTime()+nDaysNum*864e5);
    const fmt=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    const cinStr=fmt(cin),coutStr=fmt(cout);
    const mmtDate=d=>`${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;

    document.getElementById('hotels-grid').innerHTML=hotels.map((h,i)=>{
      const q=encodeURIComponent(h.name+' '+city);
      const mmtUrl=`https://www.makemytrip.com/hotels/hotel-listing/?checkin=${mmtDate(cin)}&checkout=${mmtDate(cout)}&city=${cityEnc}&searchText=${encodeURIComponent(h.name)}`;
      const bdcUrl=`https://www.booking.com/search.html?ss=${q}&checkin=${cinStr}&checkout=${coutStr}&group_adults=2`;
      const isBest=i===0;
      return `<div class="hotel-card">
        <div class="hotel-name">${h.name}</div>
        <div class="stars">${'★'.repeat(h.stars)}${'☆'.repeat(5-h.stars)}</div>
        <div class="hotel-meta">${h.type}</div>
        <div class="hotel-price">${h.price}</div>
        ${isBest?'<div class="hotel-best-badge">✦ Best Value</div>':''}
        <div class="hotel-book-row">
          <a class="book-btn book-mmt" href="${mmtUrl}" target="_blank" rel="noopener" title="Book on MakeMyTrip">🏨 MakeMyTrip</a>
          <a class="book-btn book-bdc" href="${bdcUrl}" target="_blank" rel="noopener" title="Book on Booking.com">🌐 Booking.com</a>
        </div>
      </div>`;
    }).join('');

    // "View all deals" footer row
    const allMmt=`https://www.makemytrip.com/hotels/hotel-listing/?checkin=${mmtDate(cin)}&checkout=${mmtDate(cout)}&city=${cityEnc}`;
    const allBdc=`https://www.booking.com/search.html?ss=${cityEnc}&checkin=${cinStr}&checkout=${coutStr}&group_adults=2`;
    const existingViewAll=document.getElementById('hotels-view-all');
    if(existingViewAll) existingViewAll.remove();
    const viewAllDiv=document.createElement('div');
    viewAllDiv.id='hotels-view-all';
    viewAllDiv.style.cssText='margin-top:1.2rem;padding:1rem 1.2rem;background:rgba(245,237,214,.03);border:1px solid rgba(200,169,110,.1);border-radius:4px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.8rem';
    viewAllDiv.innerHTML=`
      <span style="font-size:.78rem;color:rgba(245,237,214,.45)">Can't find the right fit?</span>
      <div style="display:flex;gap:.6rem;flex-wrap:wrap">
        <a href="${allMmt}" target="_blank" rel="noopener" style="padding:.45rem 1rem;border:1px solid rgba(220,50,50,.3);border-radius:2px;font-size:.72rem;letter-spacing:.07em;text-transform:uppercase;color:#e05050;text-decoration:none;font-family:'DM Sans',sans-serif;transition:all .25s" onmouseover="this.style.background='rgba(220,50,50,.15)'" onmouseout="this.style.background='transparent'">All on MakeMyTrip →</a>
        <a href="${allBdc}" target="_blank" rel="noopener" style="padding:.45rem 1rem;border:1px solid rgba(0,102,204,.3);border-radius:2px;font-size:.72rem;letter-spacing:.07em;text-transform:uppercase;color:#5b9bd5;text-decoration:none;font-family:'DM Sans',sans-serif;transition:all .25s" onmouseover="this.style.background='rgba(0,102,204,.15)'" onmouseout="this.style.background='transparent'">All on Booking.com →</a>
      </div>`;
    document.getElementById('hotels-grid').after(viewAllDiv);

    const r=document.getElementById('results');r.style.display='block';
    setTimeout(()=>r.scrollIntoView({behavior:'smooth',block:'start'}),100);
  },1800);
}

