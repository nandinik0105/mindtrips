/* ══════════════════════════════════════════
   DATA
══════════════════════════════════════════ */
const MARQUEE_PLACES=["Jaipur","Varanasi","Goa","Manali","Leh","Darjeeling","Munnar","Hampi","Rishikesh","Udaipur","Mysuru","Amritsar","Ooty","Pushkar","Spiti","Coorg","Kaziranga","Andaman","Shimla","Agra","Meghalaya","Alleppey","Kodaikanal","Srinagar","Gulmarg","Khajuraho","Rann of Kutch","Tawang","Ziro","Dawki","Puri","Konark","Bodh Gaya","Hampi","Mahabalipuram","Pondicherry","Kolkata","Gangtok","Jaisalmer","Ajanta","Badami","Kochi","Varkala","Sundarbans","Pelling"];
const el=document.getElementById('marquee');
el.innerHTML=[...MARQUEE_PLACES,...MARQUEE_PLACES].map(p=>`<span class="marquee-item">${p}<span>✦</span></span>`).join('');

const HOTELS={
  "Jaipur, Rajasthan":[{name:"Zostel Jaipur",type:"Hostel",price:"₹600/night",stars:4},{name:"Pearl Palace Heritage",type:"Budget Heritage",price:"₹1,800/night",stars:4},{name:"Alsisar Haveli",type:"Heritage Boutique",price:"₹7,500/night",stars:4},{name:"Rambagh Palace",type:"Luxury",price:"₹35,000/night",stars:5}],
  "Udaipur, Rajasthan":[{name:"Zostel Udaipur",type:"Hostel",price:"₹500/night",stars:4},{name:"Hotel Badi Haveli",type:"Heritage",price:"₹2,500/night",stars:4},{name:"Taj Lake Palace",type:"Ultra-Luxury",price:"₹45,000/night",stars:5}],
  "Jodhpur, Rajasthan":[{name:"Cosy Guest House",type:"Budget",price:"₹700/night",stars:3},{name:"Pal Haveli",type:"Heritage",price:"₹4,200/night",stars:4},{name:"RAAS Jodhpur",type:"Luxury",price:"₹22,000/night",stars:5}],
  "Jaisalmer, Rajasthan":[{name:"Moustache Hostel",type:"Hostel",price:"₹450/night",stars:4},{name:"Hotel Nachana Haveli",type:"Heritage",price:"₹3,500/night",stars:4},{name:"Suryagarh",type:"Luxury",price:"₹28,000/night",stars:5}],
  "Pushkar, Rajasthan":[{name:"Zostel Pushkar",type:"Hostel",price:"₹400/night",stars:4},{name:"Inn Seventh Heaven",type:"Heritage Boutique",price:"₹4,000/night",stars:4}],
  "Goa — North Beaches":[{name:"Mango Tree Hostel",type:"Hostel",price:"₹450/night",stars:4},{name:"Jungle by Stunn",type:"Boutique",price:"₹2,500/night",stars:4},{name:"The Leela Goa",type:"Luxury Beach",price:"₹22,000/night",stars:5}],
  "Goa — South Beaches":[{name:"Papillon Palolem",type:"Hostel",price:"₹500/night",stars:3},{name:"Intercontinental Palolem",type:"Boutique",price:"₹5,500/night",stars:4}],
  "Goa":[{name:"Mango Tree Hostel",type:"Hostel",price:"₹450/night",stars:4},{name:"Jungle by Stunn",type:"Boutique",price:"₹2,500/night",stars:4},{name:"The Leela Goa",type:"Luxury Beach",price:"₹22,000/night",stars:5}],
  "Manali, Himachal Pradesh":[{name:"Snow Valley Hostel",type:"Hostel",price:"₹400/night",stars:4},{name:"Johnson's Hotel",type:"Heritage",price:"₹3,500/night",stars:4},{name:"The Himalayan",type:"Luxury",price:"₹18,000/night",stars:5}],
  "Shimla, Himachal Pradesh":[{name:"Backpacker Panda Shimla",type:"Hostel",price:"₹550/night",stars:4},{name:"Hotel Willow Banks",type:"Mid-Range",price:"₹3,200/night",stars:3},{name:"Wildflower Hall Oberoi",type:"Luxury",price:"₹32,000/night",stars:5}],
  "Dharamshala, Himachal Pradesh":[{name:"Zostel Dharamshala",type:"Hostel",price:"₹380/night",stars:4},{name:"Hotel Norling",type:"Budget",price:"₹1,500/night",stars:3},{name:"Chonor House",type:"Heritage",price:"₹8,000/night",stars:4}],
  "Kasol, Himachal Pradesh":[{name:"Kasol Riverside Camp",type:"Camp",price:"₹600/night",stars:3},{name:"The Kasol Escape",type:"Boutique",price:"₹2,800/night",stars:4}],
  "Spiti Valley, Himachal Pradesh":[{name:"Spiti Eco Camp",type:"Eco Camp",price:"₹1,800/night",stars:3},{name:"Kaza Mud House",type:"Homestay",price:"₹1,200/night",stars:3}],
  "Leh, Ladakh":[{name:"Hotel Ibex",type:"Budget",price:"₹2,200/night",stars:3},{name:"Manka Boutique",type:"Boutique",price:"₹4,500/night",stars:4},{name:"Grand Dragon Ladakh",type:"Luxury",price:"₹12,000/night",stars:5}],
  "Nubra Valley, Ladakh":[{name:"Desert Himalaya Camp",type:"Desert Camp",price:"₹3,500/night",stars:4},{name:"Maitreya Hotel",type:"Budget",price:"₹2,000/night",stars:3}],
  "Pangong Lake, Ladakh":[{name:"Pangong Retreat Camp",type:"Lakeside Camp",price:"₹4,500/night",stars:4},{name:"Nomadic Life Camp",type:"Eco Camp",price:"₹3,000/night",stars:3}],
  "Srinagar, Jammu & Kashmir":[{name:"Houseboat New Hope",type:"Dal Lake Houseboat",price:"₹3,500/night",stars:4},{name:"Vivanta Dal View",type:"Luxury",price:"₹18,000/night",stars:5},{name:"Lalit Grand Palace",type:"Heritage Luxury",price:"₹25,000/night",stars:5}],
  "Gulmarg, Jammu & Kashmir":[{name:"Snow Leopard Retreat",type:"Boutique",price:"₹5,500/night",stars:4},{name:"Khyber Himalayan Resort",type:"Luxury",price:"₹22,000/night",stars:5}],
  "Pahalgam, Jammu & Kashmir":[{name:"Pine View Lodge",type:"Budget",price:"₹1,800/night",stars:3},{name:"The Heevan Resort",type:"Luxury",price:"₹12,000/night",stars:5}],
  "Rishikesh, Uttarakhand":[{name:"Zostel Rishikesh",type:"Hostel",price:"₹350/night",stars:4},{name:"Aloha on the Ganges",type:"Boutique",price:"₹4,000/night",stars:4},{name:"Ananda in the Himalayas",type:"Luxury Spa",price:"₹40,000/night",stars:5}],
  "Haridwar, Uttarakhand":[{name:"Ganga Kinare",type:"Mid-Range",price:"₹2,800/night",stars:4},{name:"Haveli Hari Ganga",type:"Heritage",price:"₹6,500/night",stars:4}],
  "Mussoorie, Uttarakhand":[{name:"Hackman's Hotel",type:"Heritage",price:"₹2,800/night",stars:3},{name:"Savoy Mussoorie Mayfair",type:"Heritage Luxury",price:"₹12,000/night",stars:5}],
  "Nainital, Uttarakhand":[{name:"KMVN Rest House",type:"Budget",price:"₹1,200/night",stars:3},{name:"Palace Belvedere",type:"Heritage",price:"₹4,500/night",stars:4},{name:"Manu Maharani",type:"Luxury",price:"₹9,000/night",stars:5}],
  "Jim Corbett, Uttarakhand":[{name:"Corbett Riverside Resort",type:"Eco Resort",price:"₹5,000/night",stars:4},{name:"Taj Corbett Resort",type:"Luxury",price:"₹28,000/night",stars:5}],
  "Varanasi, Uttar Pradesh":[{name:"Stops Hostel",type:"Hostel",price:"₹300/night",stars:4},{name:"Hotel Ganges View",type:"Mid-Range",price:"₹3,000/night",stars:4},{name:"BrijRama Palace",type:"Heritage Palace",price:"₹14,000/night",stars:5}],
  "Agra, Uttar Pradesh":[{name:"Zostel Agra",type:"Hostel",price:"₹400/night",stars:4},{name:"Crystal Sarovar Premiere",type:"Mid-Range",price:"₹3,800/night",stars:4},{name:"Oberoi Amarvilas (Taj View)",type:"Ultra-Luxury",price:"₹55,000/night",stars:5}],
  "Lucknow, Uttar Pradesh":[{name:"Treebo Lucknow",type:"Budget",price:"₹1,200/night",stars:3},{name:"Piccadily Hotel",type:"Mid-Range",price:"₹3,500/night",stars:4},{name:"Taj Mahal Lucknow",type:"Luxury",price:"₹18,000/night",stars:5}],
  "Mathura, Uttar Pradesh":[{name:"Hotel Brijwasi Royal",type:"Budget",price:"₹1,000/night",stars:3},{name:"Radha Ashok Hotel",type:"Mid-Range",price:"₹2,500/night",stars:3}],
  "Ayodhya, Uttar Pradesh":[{name:"Hotel Saket",type:"Budget",price:"₹1,200/night",stars:3},{name:"Ayodhya Hotel",type:"Mid-Range",price:"₹3,000/night",stars:3}],
  "Khajuraho, Madhya Pradesh":[{name:"Hotel Payal",type:"Budget",price:"₹1,200/night",stars:3},{name:"Ken River Lodge",type:"Boutique",price:"₹6,000/night",stars:4},{name:"Radisson Jass Khajuraho",type:"Luxury",price:"₹12,000/night",stars:5}],
  "Kanha, Madhya Pradesh":[{name:"Kanha Village Camp",type:"Eco Camp",price:"₹4,500/night",stars:4},{name:"Pugmark Kanha",type:"Resort",price:"₹9,000/night",stars:4}],
  "Bandhavgarh, Madhya Pradesh":[{name:"Kings Lodge",type:"Eco Resort",price:"₹8,000/night",stars:4},{name:"Samode Safari Lodge",type:"Luxury",price:"₹35,000/night",stars:5}],
  "Orchha, Madhya Pradesh":[{name:"Betwa Retreat",type:"Eco Resort",price:"₹3,500/night",stars:4},{name:"Hotel Sheesh Mahal",type:"Heritage",price:"₹5,500/night",stars:4}],
  "Munnar, Kerala":[{name:"Zostel Munnar",type:"Hostel",price:"₹400/night",stars:4},{name:"Windermere Estate",type:"Plantation Stay",price:"₹8,000/night",stars:4},{name:"Tea County Resort",type:"Resort",price:"₹5,500/night",stars:4}],
  "Alleppey, Kerala":[{name:"Zostel Alleppey",type:"Hostel",price:"₹450/night",stars:4},{name:"Punnamada Backwater Houseboat",type:"Houseboat",price:"₹6,000/night",stars:4},{name:"Taj Kumarakom",type:"Luxury",price:"₹28,000/night",stars:5}],
  "Wayanad, Kerala":[{name:"Zostel Wayanad",type:"Hostel",price:"₹500/night",stars:4},{name:"Vythiri Resort",type:"Jungle Resort",price:"₹9,000/night",stars:4}],
  "Kochi, Kerala":[{name:"Old Harbour Hotel",type:"Heritage",price:"₹5,500/night",stars:4},{name:"Brunton Boatyard",type:"Luxury Heritage",price:"₹18,000/night",stars:5}],
  "Kovalam, Kerala":[{name:"Zostel Kovalam",type:"Hostel",price:"₹400/night",stars:4},{name:"Leela Kovalam",type:"Luxury",price:"₹22,000/night",stars:5}],
  "Thekkady, Kerala":[{name:"Spice Village CGH Earth",type:"Eco Luxury",price:"₹14,000/night",stars:5},{name:"Hotel Lake Palace",type:"Mid-Range",price:"₹3,500/night",stars:4}],
  "Ooty, Tamil Nadu":[{name:"YWCA Youth Hostel",type:"Budget",price:"₹800/night",stars:3},{name:"Savoy Hotel Ooty",type:"Heritage",price:"₹5,500/night",stars:4},{name:"Taj Savoy",type:"Luxury",price:"₹15,000/night",stars:5}],
  "Madurai, Tamil Nadu":[{name:"Hotel Keerthis",type:"Budget",price:"₹900/night",stars:3},{name:"Heritage Madurai",type:"Heritage",price:"₹7,000/night",stars:4}],
  "Kodaikanal, Tamil Nadu":[{name:"Carlton Hotel",type:"Heritage",price:"₹4,500/night",stars:4},{name:"Tamara Kodai",type:"Luxury",price:"₹18,000/night",stars:5}],
  "Pondicherry":[{name:"Park Guest House",type:"Budget",price:"₹1,200/night",stars:3},{name:"Palais de Mahe",type:"Boutique",price:"₹6,500/night",stars:4},{name:"Le Dupleix",type:"Heritage Luxury",price:"₹18,000/night",stars:5}],
  "Mahabalipuram, Tamil Nadu":[{name:"Sterling Mahabalipuram",type:"Resort",price:"₹4,800/night",stars:4},{name:"Radisson Blu",type:"Luxury",price:"₹10,000/night",stars:5}],
  "Coorg, Karnataka":[{name:"Coorg Cliffs Resort",type:"Resort",price:"₹4,500/night",stars:4},{name:"The Tamara Coorg",type:"Luxury",price:"₹22,000/night",stars:5}],
  "Hampi, Karnataka":[{name:"Kishkinda Trust",type:"Eco Stay",price:"₹1,800/night",stars:3},{name:"Evolve Back Hampi",type:"Luxury",price:"₹28,000/night",stars:5}],
  "Mysuru, Karnataka":[{name:"Hotel Dasaprakash",type:"Budget",price:"₹1,500/night",stars:3},{name:"Windflower Resort",type:"Resort",price:"₹5,500/night",stars:4},{name:"Lalitha Mahal Palace",type:"Heritage Luxury",price:"₹18,000/night",stars:5}],
  "Gokarna, Karnataka":[{name:"Zostel Gokarna",type:"Hostel",price:"₹550/night",stars:4},{name:"SwaSwara",type:"Wellness Luxury",price:"₹28,000/night",stars:5}],
  "Hyderabad, Telangana":[{name:"Zostel Hyderabad",type:"Hostel",price:"₹450/night",stars:4},{name:"Golkonda Resort",type:"Mid-Range",price:"₹4,200/night",stars:4},{name:"Taj Falaknuma Palace",type:"Ultra-Luxury Heritage",price:"₹45,000/night",stars:5}],
  "Ahmedabad, Gujarat":[{name:"Hotel Comfort Inn",type:"Budget",price:"₹1,400/night",stars:3},{name:"House of MG",type:"Heritage",price:"₹8,000/night",stars:4},{name:"Hyatt Regency Ahmedabad",type:"Luxury",price:"₹12,000/night",stars:5}],
  "Rann of Kutch, Gujarat":[{name:"Tent City Rann",type:"Luxury Tent",price:"₹8,000/night",stars:4},{name:"Rann Utsav Camp",type:"Heritage Camp",price:"₹12,000/night",stars:5}],
  "Sasan Gir, Gujarat":[{name:"Gir Birding Lodge",type:"Eco Lodge",price:"₹4,500/night",stars:4},{name:"Taj Exotica Gir",type:"Luxury",price:"₹22,000/night",stars:5}],
  "Mumbai, Maharashtra":[{name:"Zostel Mumbai",type:"Hostel",price:"₹650/night",stars:4},{name:"Gordon House Hotel",type:"Boutique",price:"₹6,000/night",stars:4},{name:"The Taj Mahal Palace",type:"Ultra-Luxury Heritage",price:"₹55,000/night",stars:5}],
  "Lonavala, Maharashtra":[{name:"Fariyas Resort",type:"Resort",price:"₹4,500/night",stars:4},{name:"The Machan",type:"Treehouse Luxury",price:"₹22,000/night",stars:5}],
  "Mahabaleshwar, Maharashtra":[{name:"MTDC Resort",type:"Budget",price:"₹2,200/night",stars:3},{name:"Brightland Resort",type:"Mid-Range",price:"₹5,500/night",stars:4}],
  "Darjeeling, West Bengal":[{name:"Zostel Darjeeling",type:"Hostel",price:"₹500/night",stars:4},{name:"Windamere Hotel",type:"Heritage",price:"₹7,000/night",stars:4},{name:"Glenburn Tea Estate",type:"Boutique Luxury",price:"₹18,000/night",stars:5}],
  "Kolkata, West Bengal":[{name:"Backpacker's Inn Kolkata",type:"Hostel",price:"₹550/night",stars:4},{name:"Tollygunge Club",type:"Heritage",price:"₹6,500/night",stars:4},{name:"ITC Royal Bengal",type:"Luxury",price:"₹20,000/night",stars:5}],
  "Sundarbans, West Bengal":[{name:"Sunderban Jungle Camp",type:"Eco Camp",price:"₹4,500/night",stars:4},{name:"Sajnekhali Tourist Lodge",type:"Budget",price:"₹1,800/night",stars:3}],
  "Kaziranga, Assam":[{name:"Infinity Resort Kaziranga",type:"Eco Resort",price:"₹5,500/night",stars:4},{name:"Diphlu River Lodge",type:"Boutique Eco",price:"₹12,000/night",stars:5}],
  "Shillong, Meghalaya":[{name:"Tripura Castle",type:"Heritage",price:"₹3,500/night",stars:4},{name:"Hotel Polo Towers",type:"Mid-Range",price:"₹4,200/night",stars:4}],
  "Cherrapunji, Meghalaya":[{name:"Cherrapunjee Holiday Resort",type:"Resort",price:"₹3,800/night",stars:4},{name:"La Villa Bethany",type:"Boutique",price:"₹5,000/night",stars:4}],
  "Gangtok, Sikkim":[{name:"Youth Hostel Gangtok",type:"Hostel",price:"₹500/night",stars:3},{name:"Elgin Nor-Khill",type:"Heritage",price:"₹6,000/night",stars:4},{name:"Denzong Regency",type:"Mid-Range",price:"₹3,800/night",stars:4}],
  "Pelling, Sikkim":[{name:"Norbu Ghang Resort",type:"Resort",price:"₹4,500/night",stars:4},{name:"The Elgin Mount Pandim",type:"Heritage",price:"₹8,500/night",stars:4}],
  "Tawang, Arunachal Pradesh":[{name:"Hotel Tawang Palace",type:"Budget",price:"₹1,500/night",stars:3},{name:"Pemaling Retreat",type:"Mid-Range",price:"₹3,200/night",stars:3}],
  "Port Blair, Andaman Islands":[{name:"TSG Emerald View",type:"Budget",price:"₹2,200/night",stars:3},{name:"Fortune Resort Bay Island",type:"Luxury",price:"₹12,000/night",stars:5}],
  "Havelock Island, Andaman":[{name:"Symphony Palms Beach Resort",type:"Resort",price:"₹5,500/night",stars:4},{name:"Barefoot at Havelock",type:"Eco Luxury",price:"₹22,000/night",stars:5}],
  "Bodh Gaya, Bihar":[{name:"Sujata Hotel",type:"Budget",price:"₹900/night",stars:3},{name:"Hotel Lotus Nikko",type:"Comfort",price:"₹4,500/night",stars:4}],
  "Puri, Odisha":[{name:"Youth Hostel Puri",type:"Hostel",price:"₹350/night",stars:3},{name:"Toshali Sands",type:"Resort",price:"₹4,500/night",stars:4},{name:"Mayfair Heritage",type:"Luxury",price:"₹12,000/night",stars:5}],
  "Amritsar, Punjab":[{name:"Homestay Golden Temple Area",type:"Budget",price:"₹800/night",stars:3},{name:"Hotel Mrs Bhandari",type:"Heritage",price:"₹4,500/night",stars:4},{name:"Taj Swarna",type:"Luxury",price:"₹18,000/night",stars:5}],
  "Delhi":[{name:"Zostel Delhi",type:"Hostel",price:"₹500/night",stars:4},{name:"The Imperial New Delhi",type:"Heritage Luxury",price:"₹30,000/night",stars:5},{name:"Taj Mahal Hotel Delhi",type:"Luxury",price:"₹28,000/night",stars:5}],
};
const FALLBACK_HOTELS=[{name:"OYO Flagship",type:"Budget",price:"₹1,200/night",stars:3},{name:"FabHotel Prime",type:"Mid-Range",price:"₹2,400/night",stars:3},{name:"Treebo Trend",type:"Boutique",price:"₹3,800/night",stars:4},{name:"IHCL SeleQtions",type:"Luxury",price:"₹12,000/night",stars:5}];

const ITINERARY={
  "Jaipur, Rajasthan":{"3 Days":[
    {day:"Day 1",title:"Pink City Arrival",desc:"Arrive & check in. Sunset at Nahargarh Fort with panoramic city views. Dinner at Suvarna Mahal, Rambagh Palace. Evening stroll on MI Road."},
    {day:"Day 2",title:"Forts & Palaces",desc:"Amber Fort (7am sharp — beat the crowds), Sheesh Mahal, City Palace museum, Jantar Mantar UNESCO site. Lunch at 1135 AD. Evening gems shopping at Johari Bazaar."},
    {day:"Day 3",title:"Markets & Farewell",desc:"Hawa Mahal sunrise (6am, no crowds). Jal Mahal viewpoint. Anokhi block-print workshop. Authentic Laal Maas lunch. Depart post noon."}],
  "5 Days":[
    {day:"Day 1",title:"Arrival & Old City Walk",desc:"Check in. Old City walking tour — Badi Chaupar, street chai, Iswari Minar. Sunset at Nahargarh."},
    {day:"Day 2",title:"Amber & City Palace",desc:"Amber Fort at dawn, Sheesh Mahal, elephant ride (optional). City Palace & Jantar Mantar."},
    {day:"Day 3",title:"Ranthambore Safari",desc:"5am drive to Ranthambore for morning Zone 2/3 tiger safari. Return by evening — wildlife photography day."},
    {day:"Day 4",title:"Art & Craft Trail",desc:"Sanganer block-print village, gem-cutting studio, blue pottery workshop. Puppet show at Bagore Ki Haveli."},
    {day:"Day 5",title:"Sunrise & Goodbye",desc:"Hawa Mahal at 6am. Johri Bazaar final shopping. Royal Rajasthani thali lunch. Depart."}]},
  "Goa":{"3 Days":[
    {day:"Day 1",title:"North Goa Beaches",desc:"Anjuna flea market, Vagator cliff views, Chapora Fort sunset. Dinner at Thalassa (Greek-Goan fusion) with sea view."},
    {day:"Day 2",title:"Heritage Old Goa",desc:"Basilica of Bom Jesus (UNESCO), Se Cathedral, Fontainhas Latin quarter. Authentic Goan fish curry at Ritz Classic."},
    {day:"Day 3",title:"South Goa Calm",desc:"Palolem beach morning yoga, Butterfly Beach by boat (30 min), Cabo de Rama Fort ruins. Departing sunset."}],
  "5 Days":[
    {day:"Day 1",title:"North Goa Arrival",desc:"Settle in, evening at Baga beach, sunset boat cruise."},
    {day:"Day 2",title:"Beach Hopping",desc:"Anjuna, Vagator, Chapora Fort. Saturday Night Bazaar at Ingo's."},
    {day:"Day 3",title:"Heritage Trail",desc:"UNESCO churches, Fontainhas, Goa Museum. Goan seafood at Vinayak."},
    {day:"Day 4",title:"South Goa Day",desc:"Palolem, Agonda, Butterfly Beach, Cola Beach — least crowded, most serene."},
    {day:"Day 5",title:"Spice Farm & Depart",desc:"Sahakari Spice Farm tour, Dudhsagar waterfall (seasonal). Farewell feni."}]},
  "Manali, Himachal Pradesh":{"5 Days":[
    {day:"Day 1",title:"Old Manali Arrival",desc:"Mall Road stroll, Hadimba Devi Temple in deodar forest, hot springs at Vashisht village."},
    {day:"Day 2",title:"Solang Valley",desc:"Snow activities — zorbing, skiing, ropeway at 2,480m. Organic apple orchard & fresh cider."},
    {day:"Day 3",title:"Rohtang Pass",desc:"Early 5am start (permit required). Rohtang Pass (3,978m). Snow, glaciers, panoramic Himalayan views."},
    {day:"Day 4",title:"Kullu Rafting",desc:"Grade 3–4 white-water rafting on Beas River. Kullu shawl factory, Naggar Castle art gallery."},
    {day:"Day 5",title:"Monasteries & Depart",desc:"Tibetan Buddhist Monasteries, Manu Temple. Trout fishing optional. Departure post-lunch."}]},
};

function getGenericItinerary(dest,nDays){
  const city=dest.split(',')[0];
  return Array.from({length:nDays},(_,i)=>({
    day:`Day ${i+1}`,title:`Discover ${city}`,
    desc:i===0?`Arrive in ${city}. Check in, orientation walk, local dinner.`:i===nDays-1?`Last morning — final sights, souvenir shopping. Depart with memories.`:`Full day exploring ${city}'s hidden gems, authentic cuisine, and local culture.`
  }));
}

