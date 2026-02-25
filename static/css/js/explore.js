/* ══════════════════════════════════════════
   EXPLORE INDIA
══════════════════════════════════════════ */
const STATES=[
  // NORTH INDIA
  {name:'Rajasthan',region:'North India',emoji:'🏰',cat:'heritage',tags:['Forts','Deserts','Heritage'],bestFor:'History & royalty lovers',bestTime:'Oct–Mar',budget:'₹6,000–₹50,000',highlights:'Jaipur, Udaipur, Jodhpur, Jaisalmer, Pushkar',lang:'Hindi, Rajasthani',spots:['Amber Fort','Thar Desert Safari','Udaipur Lake Palace','Mehrangarh Fort','Pushkar Camel Fair','Ranthambore Tiger Reserve']},
  {name:'Delhi',region:'North India',emoji:'🕌',cat:'heritage',tags:['History','Food','Metro'],bestFor:'Urban history explorers',bestTime:'Oct–Mar',budget:'₹4,000–₹30,000',highlights:'Red Fort, India Gate, Qutub Minar, Chandni Chowk',lang:'Hindi, Urdu',spots:['Red Fort','Qutub Minar','Humayuns Tomb','Chandni Chowk','India Gate','Lodhi Garden']},
  {name:'Uttar Pradesh',region:'North India',emoji:'🕍',cat:'spiritual',tags:['Heritage','Spiritual','Ghats'],bestFor:'Spiritual & heritage seekers',bestTime:'Oct–Mar',budget:'₹4,000–₹25,000',highlights:'Varanasi, Agra (Taj Mahal), Lucknow, Mathura, Ayodhya',lang:'Hindi',spots:['Taj Mahal Agra','Varanasi Ghats','Mathura Krishna Temple','Lucknow Imambara','Ayodhya Ram Mandir','Fatehpur Sikri']},
  {name:'Punjab',region:'North India',emoji:'🌾',cat:'spiritual',tags:['Heritage','Food','Faith'],bestFor:'Golden Temple pilgrims',bestTime:'Oct–Mar',budget:'₹3,500–₹18,000',highlights:'Amritsar, Wagah Border, Chandigarh',lang:'Punjabi',spots:['Golden Temple Amritsar','Wagah Border Ceremony','Jallianwala Bagh','Rock Garden Chandigarh','Qila Mubarak Patiala','Anandpur Sahib']},
  {name:'Haryana',region:'North India',emoji:'🏛️',cat:'heritage',tags:['History','Pilgrimage','Food'],bestFor:'Battlefield history buffs',bestTime:'Oct–Mar',budget:'₹3,000–₹15,000',highlights:'Kurukshetra, Panipat, Chandigarh',lang:'Hindi, Haryanvi',spots:['Kurukshetra Battlefield','Panipat Museum','Surajkund Crafts Mela','Sultanpur Bird Sanctuary','Pinjore Garden','Brahma Sarovar']},

  // HIMALAYAN STATES
  {name:'Himachal Pradesh',region:'Himalayas',emoji:'🏔️',cat:'hills',tags:['Mountains','Trekking','Snow'],bestFor:'Adventure & hill lovers',bestTime:'Apr–Jun, Oct–Nov',budget:'₹5,000–₹35,000',highlights:'Manali, Shimla, Spiti, Dharamshala, Kasol',lang:'Hindi, Pahari',spots:['Rohtang Pass','Spiti Valley','Hadimba Temple Manali','Kasol Parvati Valley','Bir Billing Paragliding','Triund Trek']},
  {name:'Uttarakhand',region:'Himalayas',emoji:'🕉️',cat:'spiritual',tags:['Yoga','Trekking','Rivers'],bestFor:'Spiritual & adventure seekers',bestTime:'Mar–Jun, Sep–Nov',budget:'₹4,500–₹28,000',highlights:'Rishikesh, Mussoorie, Nainital, Jim Corbett, Kedarnath',lang:'Hindi, Garhwali',spots:['Rishikesh Yoga & Rafting','Jim Corbett Tiger Reserve','Valley of Flowers Trek','Kedarnath Temple','Nainital Lake','Mussoorie Mall Road']},
  {name:'Ladakh',region:'Himalayas',emoji:'🌌',cat:'hills',tags:['High Altitude','Monks','Bikes'],bestFor:'Off-beat adventurers',bestTime:'Jun–Sep',budget:'₹12,000–₹80,000',highlights:'Leh, Nubra Valley, Pangong Lake, Zanskar',lang:'Ladakhi, Hindi',spots:['Pangong Tso Lake','Nubra Valley Sand Dunes','Thiksey Monastery','Khardung La Pass','Zanskar River','Diskit Monastery']},
  {name:'Jammu & Kashmir',region:'Himalayas',emoji:'🌷',cat:'hills',tags:['Valley','Lakes','Houseboats'],bestFor:'Paradise seekers',bestTime:'Apr–Jun, Sep–Oct',budget:'₹8,000–₹45,000',highlights:'Srinagar Dal Lake, Gulmarg, Pahalgam, Sonamarg',lang:'Kashmiri, Dogri',spots:['Dal Lake Shikaras','Gulmarg Gondola','Pahalgam Lidder Valley','Sonamarg Glacier','Vaishno Devi Shrine','Mughal Gardens Srinagar']},
  {name:'Sikkim',region:'North East',emoji:'🌸',cat:'hills',tags:['Kanchenjunga','Monasteries','Organic'],bestFor:'Mountain & monastery lovers',bestTime:'Mar–May, Sep–Dec',budget:'₹8,000–₹40,000',highlights:'Gangtok, Pelling, Lachung, Tsomgo Lake',lang:'Nepali, Sikkimese',spots:['Tsomgo Lake','Rumtek Monastery','Pelling Kanchenjunga View','Lachung Yumthang Valley','Nathula Pass','Ravangla Buddha Park']},

  // NORTH EAST
  {name:'Assam',region:'North East',emoji:'🦏',cat:'nature',tags:['Wildlife','Tea','Rivers'],bestFor:'Wildlife & nature lovers',bestTime:'Nov–Apr',budget:'₹6,000–₹30,000',highlights:'Kaziranga Rhino Park, Guwahati, Majuli Island',lang:'Assamese',spots:['Kaziranga One-Horned Rhino','Majuli River Island','Kamakhya Temple','Haflong Blue Hill','Manas Tiger Reserve','Brahmaputra River Cruise']},
  {name:'Meghalaya',region:'North East',emoji:'🌧️',cat:'nature',tags:['Living Roots','Caves','Falls'],bestFor:'Nature & adventure explorers',bestTime:'Oct–May',budget:'₹7,000–₹32,000',highlights:'Shillong, Cherrapunji, Dawki, Mawlynnong',lang:'Khasi, Garo',spots:['Living Root Bridges Cherrapunji','Dawki Crystal Clear River','Mawlynnong Cleanest Village','Nohkalikai Waterfall','Umiam Lake','Double Decker Root Bridge']},
  {name:'Arunachal Pradesh',region:'North East',emoji:'🏔️',cat:'hills',tags:['Monasteries','Tribes','Untouched'],bestFor:'Intrepid explorers',bestTime:'Oct–Apr',budget:'₹10,000–₹45,000',highlights:'Tawang, Ziro Valley, Namdapha, Bomdila',lang:'Bengali, Nyishi, Adi',spots:['Tawang Monastery','Ziro Valley Rice Fields','Sela Pass','Namdapha National Park','Bomdila Monastery','Dong — Indias First Sunrise']},
  {name:'Manipur',region:'North East',emoji:'🌊',cat:'nature',tags:['Floating Lake','Polo','Dance'],bestFor:'Unique culture seekers',bestTime:'Oct–Mar',budget:'₹7,000–₹25,000',highlights:'Loktak Lake, Imphal, Keibul Lamjao',lang:'Meitei',spots:['Loktak Floating Lake','Keibul Lamjao Deer Park','Ima Keithel Market','Kangla Fort','Shirui Lily Festival','Thoubal River']},
  {name:'Nagaland',region:'North East',emoji:'🎪',cat:'heritage',tags:['Hornbill Fest','Tribes','Food'],bestFor:'Cultural festival lovers',bestTime:'Oct–Feb',budget:'₹8,000–₹30,000',highlights:'Kohima, Dzukou Valley, Hornbill Festival',lang:'English, Nagamese',spots:['Hornbill Festival Kisama','Dzukou Valley Trek','Kohima War Cemetery','Mokokchung','Khonoma Green Village','Japfu Peak']},
  {name:'Mizoram',region:'North East',emoji:'🌄',cat:'nature',tags:['Hills','Music','Handloom'],bestFor:'Off-beat travellers',bestTime:'Oct–Mar',budget:'₹8,000–₹28,000',highlights:'Aizawl, Champhai, Phawngpui Peak',lang:'Mizo',spots:['Phawngpui Blue Mountain','Champhai Myanmar Border','Vantawng Waterfall','Aizawl Solomon Temple','Tamdil Lake','Reiek Heritage Village']},
  {name:'Tripura',region:'North East',emoji:'🏛️',cat:'heritage',tags:['Temples','Palaces','Bamboo'],bestFor:'Hidden gem seekers',bestTime:'Oct–Mar',budget:'₹5,000–₹20,000',highlights:'Agartala, Neermahal, Unakoti',lang:'Bengali, Kokborok',spots:['Ujjayanta Palace Agartala','Neermahal Water Palace','Unakoti Rock Carvings','Sepahijala Wildlife Sanctuary','Tripura Sundari Temple','Jampui Hills']},

  // EAST INDIA
  {name:'West Bengal',region:'East India',emoji:'🍵',cat:'nature',tags:['Tea','Temples','Delta'],bestFor:'Culture, hills & wildlife',bestTime:'Oct–Apr',budget:'₹5,000–₹28,000',highlights:'Darjeeling, Kolkata, Sundarbans, Bishnupur',lang:'Bengali',spots:['Darjeeling Tea Gardens','Tiger Hill Sunrise','Sundarbans Tiger Reserve','Victoria Memorial Kolkata','Howrah Bridge','Bishnupur Terracotta Temples']},
  {name:'Odisha',region:'East India',emoji:'🛕',cat:'heritage',tags:['Temples','Beaches','Tribes'],bestFor:'Temple & beach lovers',bestTime:'Oct–Feb',budget:'₹4,000–₹20,000',highlights:'Puri, Konark Sun Temple, Bhubaneswar, Chilika',lang:'Odia',spots:['Konark Sun Temple','Jagannath Temple Puri','Chilika Lake Dolphins','Bhubaneswar Temples','Simlipal Tiger Reserve','Daringbadi Coffee Plantation']},
  {name:'Bihar',region:'East India',emoji:'☸️',cat:'spiritual',tags:['Buddhism','Hinduism','History'],bestFor:'Spiritual & history seekers',bestTime:'Oct–Mar',budget:'₹3,500–₹15,000',highlights:'Bodh Gaya, Nalanda, Patna, Rajgir',lang:'Hindi, Maithili',spots:['Bodh Gaya Mahabodhi Temple','Nalanda University Ruins','Rajgir Vishwa Shanti Stupa','Vaishali Stupa','Vikramshila Ruins','Patna Museum']},
  {name:'Jharkhand',region:'East India',emoji:'🌿',cat:'nature',tags:['Waterfalls','Tribes','Mines'],bestFor:'Nature & waterfall lovers',bestTime:'Oct–Feb',budget:'₹4,000–₹18,000',highlights:'Ranchi, Jamshedpur, Deoghar, Betla',lang:'Hindi, Santali',spots:['Hundru Falls Ranchi','Betla Elephant Safaris','Deoghar Baidyanath Temple','Dasam Falls','Jonha Falls','Panchghagh Waterfall']},

  // CENTRAL INDIA
  {name:'Madhya Pradesh',region:'Central India',emoji:'🐯',cat:'nature',tags:['Tigers','Temples','Heritage'],bestFor:'Wildlife & temple trails',bestTime:'Oct–Apr',budget:'₹5,000–₹35,000',highlights:'Khajuraho, Kanha, Bandhavgarh, Pachmarhi, Orchha',lang:'Hindi',spots:['Khajuraho Temples UNESCO','Kanha Tiger Reserve','Bandhavgarh Tigers','Pachmarhi Hill Station','Orchha Medieval Town','Sanchi Stupa UNESCO']},
  {name:'Chhattisgarh',region:'Central India',emoji:'🌊',cat:'nature',tags:['Waterfalls','Tribes','Caves'],bestFor:'Off-beat adventure seekers',bestTime:'Oct–Feb',budget:'₹4,000–₹18,000',highlights:'Jagdalpur, Chitrakote Falls, Bastar Dussehra',lang:'Hindi, Gondi',spots:['Chitrakote Waterfall (India\'s Niagara)','Tirathgarh Falls','Bastar Dussehra Festival','Kanger Valley Caves','Udanti Wildlife Sanctuary','Bhoramdeo Temple']},

  // WEST INDIA
  {name:'Gujarat',region:'West India',emoji:'🦁',cat:'heritage',tags:['Lions','Salt Desert','Temples'],bestFor:'Wildlife & culture explorers',bestTime:'Oct–Mar',budget:'₹5,000–₹30,000',highlights:'Rann of Kutch, Gir Lion Safari, Ahmedabad, Dwarka',lang:'Gujarati',spots:['Rann of Kutch White Desert','Gir Asiatic Lion Safari','Ahmedabad Heritage Walk UNESCO','Somnath Temple','Dwarka Dwarkadhish','Rani ki Vav UNESCO']},
  {name:'Maharashtra',region:'West India',emoji:'🌊',cat:'heritage',tags:['Caves','Beaches','Forts'],bestFor:'Heritage & coastal lovers',bestTime:'Oct–Mar',budget:'₹5,000–₹35,000',highlights:'Mumbai, Pune, Ajanta Ellora Caves, Mahabaleshwar, Lonavala',lang:'Marathi',spots:['Ajanta Cave Paintings UNESCO','Ellora Caves UNESCO','Gateway of India Mumbai','Raigad Fort','Mahabaleshwar Strawberry','Lonavala Bhushi Dam']},
  {name:'Goa',region:'West India',emoji:'🏖️',cat:'beach',tags:['Beaches','Nightlife','Heritage'],bestFor:'Beach & party lovers',bestTime:'Nov–Feb',budget:'₹5,000–₹40,000',highlights:'Baga, Anjuna, Palolem, Old Goa Churches, Dudhsagar',lang:'Konkani',spots:['Anjuna Flea Market','Basilica of Bom Jesus UNESCO','Dudhsagar Waterfall','Chapora Fort','Palolem Secluded Beach','Fontainhas Latin Quarter']},

  // SOUTH INDIA
  {name:'Karnataka',region:'South India',emoji:'🌿',cat:'nature',tags:['Coffee','Heritage','Wildlife'],bestFor:'Nature, heritage & coffee lovers',bestTime:'Oct–Mar',budget:'₹6,000–₹40,000',highlights:'Coorg, Hampi, Mysuru, Kabini, Gokarna, Badami',lang:'Kannada',spots:['Hampi Ruins UNESCO','Mysore Palace Illuminated','Coorg Coffee Estates','Kabini Elephant Corridor','Gokarna Beach & Temples','Badami Cave Temples']},
  {name:'Kerala',region:'South India',emoji:'🌴',cat:'nature',tags:['Backwaters','Spices','Wellness'],bestFor:'Nature & relaxation seekers',bestTime:'Sep–Mar',budget:'₹6,000–₹45,000',highlights:'Munnar, Alleppey Backwaters, Wayanad, Kovalam, Thekkady',lang:'Malayalam',spots:['Alleppey Houseboat Backwaters','Munnar Tea Gardens','Periyar Tiger Reserve','Varkala Cliffs & Beach','Kovalam Lighthouse Beach','Kochi Fort Cochin']},
  {name:'Tamil Nadu',region:'South India',emoji:'🛕',cat:'heritage',tags:['Temples','Hills','Beaches'],bestFor:'Temple trail & hill station lovers',bestTime:'Oct–Mar',budget:'₹5,000–₹30,000',highlights:'Madurai, Ooty, Kodaikanal, Mahabalipuram, Rameswaram, Pondicherry',lang:'Tamil',spots:['Meenakshi Temple Madurai','Brihadeeswarar Temple Thanjavur','Mahabalipuram Shore Temple UNESCO','Ooty Nilgiri Hills','Rameswaram Pilgrim Island','Pondicherry French Quarter']},
  {name:'Andhra Pradesh',region:'South India',emoji:'⚡',cat:'spiritual',tags:['Temples','Beaches','Tech'],bestFor:'Pilgrimage & beach lovers',bestTime:'Oct–Mar',budget:'₹4,000–₹22,000',highlights:'Tirupati, Araku Valley, Vizag, Amaravati',lang:'Telugu',spots:['Tirupati Balaji Temple','Araku Coffee Valley','Visakhapatnam RK Beach','Borra Caves','Lambasingi Mini Kashmir','Sri Sailam Dam']},
  {name:'Telangana',region:'South India',emoji:'🏰',cat:'heritage',tags:['Forts','Pearls','Biryani'],bestFor:'Heritage & food lovers',bestTime:'Oct–Feb',budget:'₹4,500–₹25,000',highlights:'Hyderabad, Warangal, Nagarjunasagar',lang:'Telugu',spots:['Charminar Hyderabad','Golconda Fort','Ramoji Film City','Warangal Fort','Nagarjunasagar Dam','Nehru Zoological Park']},
  {name:'Pondicherry',region:'South India',emoji:'🇫🇷',cat:'beach',tags:['French Quarter','Beaches','Auroville'],bestFor:'Serene coastal & yoga lovers',bestTime:'Oct–Feb',budget:'₹4,000–₹22,000',highlights:'French Quarter, Auroville, Rock Beach, Sri Aurobindo Ashram',lang:'Tamil, French',spots:['Auroville Matrimandir','Rock Beach Promenade','Sri Aurobindo Ashram','French War Memorial','Serenity Beach','Paradise Beach']},

  // ISLANDS
  {name:'Andaman & Nicobar',region:'Islands',emoji:'🐠',cat:'beach',tags:['Coral','Diving','Untouched'],bestFor:'Scuba divers & beach lovers',bestTime:'Oct–May',budget:'₹12,000–₹60,000',highlights:'Havelock Island, Neil Island, Port Blair, Radhanagar Beach',lang:'Hindi, Bengali',spots:['Radhanagar Beach Havelock','Elephant Beach Snorkelling','Cellular Jail Port Blair','Neil Island Laxmanpur','Baratang Limestone Caves','Ross Island']},
  {name:'Lakshadweep',region:'Islands',emoji:'🌊',cat:'beach',tags:['Lagoons','Coral','Untouched'],bestFor:'Luxury island seekers',bestTime:'Oct–May',budget:'₹15,000–₹80,000',highlights:'Agatti Island, Bangaram, Kavaratti',lang:'Malayalam',spots:['Agatti Coral Reef','Bangaram Atoll','Kavaratti Lagoon','Glass-bottom Boat Rides','Minicoy Lighthouse','Underwater Coral Gardens']},
];

function renderStates(cat='all'){
  const filtered=cat==='all'?STATES:STATES.filter(s=>s.cat===cat);
  document.getElementById('states-grid').innerHTML=filtered.map(s=>`
    <div class="state-card cat-${s.cat}" onclick="openStateModal('${s.name.replace(/'/g,"\\'")}')">
      <div class="state-card-top">
        <span class="state-emoji">${s.emoji}</span>
        <div class="state-name">${s.name}</div>
        <div class="state-region">${s.region}</div>
      </div>
      <div class="state-card-bottom">
        <div class="state-tags">${s.tags.map(t=>`<span class="state-tag">${t}</span>`).join('')}</div>
        <div class="state-card-cta">Explore <span>→</span></div>
      </div>
    </div>`).join('');
}
renderStates();

function filterStates(cat,btn){
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('state-search').value='';
  renderStates(cat);
}

function searchStates(q){
  if(!q.trim()){renderStates('all');return;}
  const lower=q.toLowerCase();
  const filtered=STATES.filter(s=>
    s.name.toLowerCase().includes(lower)||
    s.region.toLowerCase().includes(lower)||
    s.tags.some(t=>t.toLowerCase().includes(lower))||
    s.highlights.toLowerCase().includes(lower)||
    s.spots.some(sp=>sp.toLowerCase().includes(lower))
  );
  const grid=document.getElementById('states-grid');
  if(!filtered.length){grid.innerHTML=`<div style="color:var(--muted);font-size:.9rem;grid-column:1/-1;padding:2rem 0">No results for "${q}" — try another region or activity.</div>`;return;}
  grid.innerHTML=filtered.map(s=>`
    <div class="state-card cat-${s.cat}" onclick="openStateModal('${s.name.replace(/'/g,"\\'")}')">
      <div class="state-card-top">
        <span class="state-emoji">${s.emoji}</span>
        <div class="state-name">${s.name}</div>
        <div class="state-region">${s.region}</div>
      </div>
      <div class="state-card-bottom">
        <div class="state-tags">${s.tags.map(t=>`<span class="state-tag">${t}</span>`).join('')}</div>
        <div class="state-card-cta">Explore <span>→</span></div>
      </div>
    </div>`).join('');
}

function openStateModal(name){
  const s=STATES.find(x=>x.name===name);if(!s)return;
  document.getElementById('m-emoji').textContent=s.emoji;
  document.getElementById('m-name').textContent=s.name;
  document.getElementById('m-region').textContent=s.region+' · '+s.lang;
  document.getElementById('m-spots').innerHTML=s.spots.map(sp=>`<span class="modal-spot">${sp}</span>`).join('');
  document.getElementById('m-facts').innerHTML=[
    {k:'Best Time',v:s.bestTime},{k:'Budget Range',v:s.budget},
    {k:'Best For',v:s.bestFor},{k:'Top Highlights',v:s.highlights.split(',')[0]+' & more'},
  ].map(f=>`<div class="modal-fact"><div class="modal-fact-key">${f.k}</div><div class="modal-fact-val">${f.v}</div></div>`).join('');
  document.getElementById('m-cta').onclick=()=>{
    closeStateModal();
    const destSel=document.getElementById('dest');
    const opts=Array.from(destSel.options);
    // Try exact match first, then partial
    const match=opts.find(o=>o.text.includes(name.split('&')[0].trim()))||opts.find(o=>o.text.toLowerCase().includes(name.split(',')[0].toLowerCase()));
    if(match)destSel.value=match.value;
    document.getElementById('planner').scrollIntoView({behavior:'smooth'});
  };
  document.getElementById('stateModal').classList.add('open');
  document.body.style.overflow='hidden';
}

function closeStateModal(){
  document.getElementById('stateModal').classList.remove('open');
  document.body.style.overflow='';
}

function closeModal(e){
  if(e.target===document.getElementById('stateModal'))closeStateModal();
}

document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeStateModal();closeMobileMenu();}});

