const infoBox = document.getElementById('infoBox');
 
// Partner locations data
const partnerLocations = [
  {
    lat: -1.286389, lng: 36.817223, // Nairobi, Kenya
    size: 0.5,
    color: 'orange',
    reinsurers: ['Kenya Re', 'Zep Re'],
  },
  {
    lat: 40.7128, lng: -74.0060, // New York, USA
    size: 0.6,
    color: 'orange',
    reinsurers: ['Transatlantic Re', 'Everest Re'],
  },
  {
    lat: 51.5074, lng: -0.1278, // London, UK
    size: 0.6,
    color: 'orange',
    reinsurers: ['Lloyd\'s', 'Hannover Re'],
  },
  {
    lat: 0.3136, lng: 32.5811, // Kampala, Uganda
    size: 0.6,
    color: 'orange',
    reinsurers: ['Uganda Re', 'Zep-Re', 'Africa Re'],
  },
  {
    lat: 19.0760, lng: 72.8777, // Mumbai, India
    size: 0.8,
    color: 'orange',
    reinsurers: ['GIC Re', 'India Re', 'New India Assurance'],
  },
  {
    lat: -33.9249, lng: 18.4241, // Cape Town, South Africa
    size: 0.6,
    color: 'orange',
    reinsurers: ['Santam Re', 'Hollard Re', 'Africa Re'],
  },
  {
    lat: -1.9441, lng: 30.0619, // Kigali, Rwanda
    size: 0.5,
    color: 'orange',
    reinsurers: ['Rwanda Re', 'Africa Re', 'Zep-Re'],
  },
  {
    lat: -6.7924, lng: 39.2083, // Dar es Salaam, Tanzania
    size: 0.6,
    color: 'orange',
    reinsurers: ['Tanzania Re', 'Africa Re', 'Zep-Re'],

  },
  {
  lat: 33.8938, lng: 35.5018, // Beirut, Lebanon
  size: 0.6,
  color: 'orange',
  reinsurers: ['Libano-Suisse', 'Arab Re'],
},
{
  lat: -20.1609, lng: 57.5012, // Port Louis, Mauritius
  size: 0.6,
  color: 'orange',
  reinsurers: ['Mauritius Union', 'SICOM Re'],
},
{
  lat: 28.6139, lng: 77.2090, // New Delhi, India
  size: 0.6,
  color: 'orange',
  reinsurers: ['GIC Re', 'New India Assurance'],
},
{
  lat: -26.2041, lng: 28.0473, // Johannesburg, South Africa
  size: 0.6,
  color: 'orange',
  reinsurers: ['GIC South Africa', 'Munich Re Africa'],
},
{
  lat: 27.7172, lng: 85.3240, // Kathmandu, Nepal
  size: 0.6,
  color: 'orange',
  reinsurers: ['Nepal Re', 'Orient Re'],
},
  {
    lat: -4.0435, lng: 39.6682, // Mombasa, Kenya
    size: 0.5,
    color: 'orange',
    reinsurers: ['Kenya Re', 'Africa Re', 'Zep-Re'],
  },
  {
    lat: -15.3875, lng: 28.3228, // Lusaka, Zambia
    size: 0.5,
    color: 'orange',
    reinsurers: ['Zambia Re', 'Africa Re', 'Zep-Re'],

  },
  {
  lat: 25.276987, lng: 55.296249, // Dubai, UAE
  size: 0.8,
  color: 'orange',
  reinsurers: ['Oman Re', 'Gulf Re', 'Arab Re', 'Takaful Re'],
}
];
 
// Create the globe
const world = Globe()
  // 🌐 Color texture: vivid oceans + realistic land (greens, browns, snow)
  .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
  
  // ⛰️ Bump map adds relief so vegetation/deserts/mountains stand out
  .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
  
  // 🖤 Background & atmosphere
  .backgroundColor('#0d1b2a')
  .showAtmosphere(true)
  .atmosphereColor('rgba(255,255,255,0.1)')
  .atmosphereAltitude(0.25)
  
  // 🗺️ Country polygons: very subtle fill + crisp white borders
  .polygonCapColor(() => 'rgba(255,255,255,0.05)')
  .polygonSideColor(() => 'rgba(0,0,0,0.15)')
  .polygonStrokeColor(() => 'white')
  .polygonsTransitionDuration(200)
  
  // 🏷️ Polygon labels on hover
  .polygonLabel(({ properties: d }) => `
    <div style="color:white; text-shadow:0 0 5px rgba(0,0,0,0.8);">
      <b>${d.name}</b>
    </div>
  `)
  .onPolygonHover(hoverD => {
    world
      .polygonCapColor(d => d === hoverD ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)')
      .polygonAltitude(d => d === hoverD ? 0.12 : 0.06);
  })
  .onPolygonClick(feature => {
  const country = feature.properties.name;
  const reinsurers = reinsurersByCountry[country] || ['No data'];
  
  infoBox.innerHTML = `
    <strong>${country}</strong>
    <ul>
      ${reinsurers.map(r => `
        <li class="reinsurer-item" 
            data-reinsurer="${r.replace(/"/g, '&quot;')}">
          ${r}
          <span class="more-info">🔍</span>
        </li>
      `).join('')}
    </ul>
  `;
  
  // Add click handlers to reinsurer items
  document.querySelectorAll('.reinsurer-item').forEach(item => {
    item.addEventListener('click', function(e) {
      e.stopPropagation();
      const reinsurer = this.getAttribute('data-reinsurer');
      showReinsurerDetails(reinsurer);
    });
  });
})
  
  // 📍 Your existing points (partnerLocations)
  .pointsData(partnerLocations)
  .pointAltitude(d => d.size * 0.1)
  .pointRadius(d => d.size * 0.5)
  .pointColor(d => d.color)
  .pointLabel(d => `
    <b>Location:</b> ${d.lat.toFixed(2)}°, ${d.lng.toFixed(2)}°<br>
    <b>Reinsurers:</b> ${d.reinsurers.join(', ')}
  `)
  .onPointClick(pt => {
    infoBox.innerHTML = `<strong>Partner Location</strong><br>${pt.reinsurers.join(', ')}`;
  });
  function showReinsurerDetails(reinsurer) {
  const businessClasses = reinsurersData[reinsurer] || ["No business class data available"];
  
  secondaryInfoBox.innerHTML = `
    <div class="reinsurer-header">
      <h3>${reinsurer}</h3>
      <button onclick="document.getElementById('secondaryInfoBox').style.display='none'">×</button>
    </div>
    <div class="business-classes">
      ${businessClasses.map(cls => `<div class="business-pill">${cls}</div>`).join('')}
    </div>
  `;
  
  const infoBoxRect = infoBox.getBoundingClientRect();
  secondaryInfoBox.style.top = `${infoBoxRect.bottom + window.scrollY}px`;
  secondaryInfoBox.style.left = `${infoBoxRect.left + window.scrollX}px`;
  secondaryInfoBox.style.display = 'block';
}

// Load country data and initialize globe
fetch('world.geojson')
  .then(res => res.json())
  .then(data => {
    world
      .polygonsData(data.features)
      (document.getElementById('globeViz'));
   
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xbbbbbb);
    world.scene().add(ambientLight);
   
    // Auto-rotation
    (function animate() {
      requestAnimationFrame(animate);
      world.controls().autoRotate = true;
      world.controls().autoRotateSpeed = 0.5;
    })();
  })
  .catch(err => {
    console.error("Error loading GeoJSON:", err);
  });
 
// Handle window resize
window.addEventListener('resize', () => {
  world.camera().aspect = window.innerWidth / window.innerHeight;
  world.camera().updateProjectionMatrix();
  world.width(window.innerWidth);
  world.height(window.innerHeight);
});
 
const reinsurersByCountry = {
    Algeria: ['Algeria Re'],
    Botswana: ['Continental Re'],
    Benin: ['NSIA Re (Benin)', 'Africa Re', 'CICA Re'],
    "Burkina Faso": ['SONAR Re', 'Union Assurances Re', 'Africa Re', 'WAICA Re', 'CICA Re'],
    Burundi: ['SOGEAR Re', 'Africa Re', 'ZEP RE'],
    "Cabo Verde": ['Africa Re', 'CICA Re', 'WAICA Re'],
    Cameroon: ['Ghana Re', 'Zep Re (PTA Re)', 'CICA Re', 'Continental Re'],
    "Central African Republic": ['Africa Re', 'CICA Re'],
    Chad: ['Africa Re', 'CICA Re'],
    Comoros: ['Africa Re', 'ZEP RE', 'CICA Re'],
    Congo : ['Africa Re', 'CICA Re', 'ZEP RE'],
    "Côte d'Ivoire" : ['Kenya Re', 'Zep Re (PTA Re)', 'CICA Re', 'WAICA Re', 'Continental Re', 'Aveni Re', 'Africa Re'],
    "Democratic Republic of the Congo" : ['Kenya Re', 'Zep Re (PTA Re)'],
    Egypt : ['Africa Re', 'Kenya Re'],
    "Equatorial Guinea": ['Africa Re', 'CICA Re'],
    Eritrea: ['Africa Re', 'ZEP RE'],
    Swaziland: ['Africa Re', 'ZEP RE'],
    Ethiopia : ['Africa Re', 'Kenya Re', 'Zep Re (PTA Re)', 'Ethiopian Re'],
    Gabon : ['SCG-Re'],
    Gambia: ['Africa Re', 'WAICA Re', 'CICA Re'],
    Ghana: ['Ghana Re', 'Mainstream Re', 'GN Re', 'Africa Re', 'WAICA Re', 'ZEP‑RE'],
    Guinea: ['Africa Re', 'CICA Re', 'WAICA Re'],
    "Guinea Bissau": ['Africa Re', 'CICA Re', 'WAICA Re'],
    Kenya : ['Africa Re', 'Kenya Re', 'Ghana Re', 'Zep Re (PTA Re)', 'CICA Re', 'WAICA Re', 'Continental Re', 'East Africa Re'],
    Lesotho: ['Africa Re', 'ZEP RE'],
    Liberia: ['Africa Re', 'WAICA Re', 'CICA Re'],
    Libya: ['Africa Re'],
    Madagascar: ['Africa Re', 'ZEP RE'],
    Malawi: ['Africa Re', 'ZEP RE'],
    Mali: ['Africa Re', 'WAICA Re', 'CICA Re'],
    Mauritania: ['Africa Re', 'CICA Re', 'WAICA Re'],
    Mauritius : ['Africa Re'],
    Morocco : ['Africa Re', 'Ghana Re', 'Société Centrale de Réassurance (SCR)'],
    Namibia : ['NamibRe'],
    Nigeria : ['Africa Re', 'WAICA Re', 'Nigerian Re', 'Continental Re'],
    Rwanda: ['Africa Re', 'ZEP RE'],
    "São Tomé & Príncipe": ['Africa Re', 'CICA Re'],
    Senegal: ['Sen Re', 'Africa Re', 'WAICA Re', 'CICA Re'],
    Seychelles: ['Africa Re', 'ZEP RE'],"Sierra Leone" : ['WAICA Re'],
    "South Africa" : ['Africa Re', 'Kenya Re', 'GIC Re South Africa'],
    Sudan : ['Zep Re (PTA Re)'],
    "United Republic of Tanzania" : ['Kenya Re', 'East Africa Re', 'TAN Re'],
    Togo : ['CICA Re'],
    Tunisia : ['CICA Re', 'WAICA Re', 'Tunis Re', 'Continental Re'],
    Uganda : ['Africa Re', 'Kenya Re', 'Zep Re (PTA Re)'],
    Zambia : ['Kenya Re', 'Zep Re (PTA Re)'],
    Zimbabwe : ['Zep Re (PTA Re)', 'WAICA Re', 'FBC Re'],
    Albania: ['Vienna Insurance Group (VIG)', 'Munich Re', 'Swiss Re', 'Hannover Re', 'SCOR'],
    "Andorra": ['Munich Re', 'Swiss Re', 'Hannover Re'],
    "Armenia": ['Vienna Insurance Group (VIG)', 'Munich Re', 'Swiss Re', 'SCOR'],
    "Austria": ['Vienna Insurance Group (VIG)', 'Uniqa Reinsurance', 'Munich Re', 'Swiss Re', 'Hannover Re', 'SCOR', 'Generali Re'],
    "Azerbaijan": ['VIG', 'Munich Re', 'Swiss Re', 'SCOR'],
    "Belarus": ['VIG', 'Munich Re', 'Swiss Re', 'SCOR'],
    "Belgium": ['Munich Re', 'Swiss Re', 'Hannover Re', 'SCOR', 'AXA XL', 'Lloyd’s Europe'],
    "Bosnia and Herzegovina": ['VIG', 'Munich Re', 'Swiss Re', 'SCOR'],
    "Bulgaria": ['VIG', 'Munich Re', 'Swiss Re', 'SCOR'],
    "Croatia": ['VIG Re', 'Munich Re', 'Swiss Re', 'SCOR'],
    "Cyprus": ['Munich Re', 'Swiss Re', 'Hannover Re', 'SCOR'],
    "Czech Republic": ['VIG Re', 'Munich Re', 'Swiss Re', 'Hannover Re', 'SCOR'],
    "Denmark": ['Munich Re', 'Swiss Re', 'Hannover Re', 'SCOR'],
    Greenland : ['Munich Re', 'Swiss Re', 'Hannover Re', 'SCOR'],
    "Estonia": ['Compensa VIG Re', 'Munich Re', 'Swiss Re', 'Hannover Re', 'SCOR'],
    "Finland": ['Munich Re', 'Swiss Re', 'Hannover Re', 'SCOR'],
    France: ['SCOR SE', 'Covéa/PartnerRe', 'Munich Re', 'Swiss Re', 'Hannover Re', 'Groupama Re'],
    "Georgia": ['VIG', 'Munich Re', 'Swiss Re', 'SCOR'],
    "Germany": ['Munich Re', 'Hannover Rück', 'Swiss Re', 'SCOR', 'Allianz Risk'],
    "Greece": ['Lloyd’s Europe', 'Munich Re', 'Swiss Re', 'Hannover Re', 'SCOR', 'Ydrogios Re'],
    "Hungary": ['VIG', 'Munich Re', 'Swiss Re', 'SCOR'],
    "Iceland": ['Munich Re', 'Swiss Re', 'Hannover Re', 'SCOR'],
    "Ireland": ['Hannover Re Ireland DAC', 'PartnerRe Europe SE', 'AXIS Re SE', 'Arch Re Europe', 'Munich Re', 'Swiss Re', 'SCOR'],
    "Italy": ['Assicurazioni Generali Re', 'Munich Re', 'Swiss Re', 'Hannover Re', 'SCOR'],
    "Kazakhstan": ['VIG', 'Munich Re', 'Swiss Re', 'SCOR'],
    "Kosovo": ['VIG', 'Munich Re', 'Swiss Re', 'SCOR'],
    "Latvia": ['Compensa VIG Re', 'Munich Re', 'Swiss Re', 'SCOR'],
    "Liechtenstein": ['VIG', 'Munich Re', 'Swiss Re', 'SCOR'],
    "Lithuania": ['Compensa VIG Re', 'Munich Re', 'Swiss Re', 'SCOR'],
    "Luxembourg": ['Swiss Re Europe', 'TransRe Europe SA', 'Convex Europe', 'Munich Re', 'SCOR'],
    "Malta": ['Munich Re', 'Swiss Re', 'Hannover Re', 'SCOR'],
    "Moldova": ['VIG', 'Munich Re', 'Swiss Re', 'SCOR'],
    "Monaco": ['Munich Re', 'Swiss Re', 'Hannover Re', 'SCOR'],
    "Montenegro": ['VIG', 'Munich Re', 'Swiss Re', 'SCOR'],
    "Netherlands": ['Achmea Re', 'VIG Re', 'Munich Re', 'Swiss Re', 'Hannover Re', 'SCOR'],
    "North Macedonia": ['VIG', 'Munich Re', 'Swiss Re', 'SCOR'],
    "Norway": ['Munich Re', 'Swiss Re', 'Hannover Re', 'SCOR'],
    "Poland": ['VIG Re', 'Munich Re', 'Swiss Re', 'Hannover Re', 'SCOR'],
    "Portugal": ['Mapfre Re', 'Munich Re', 'Swiss Re', 'Hannover Re', 'SCOR'],
    "Romania": ['VIG Re', 'Munich Re', 'Swiss Re', 'Hannover Re', 'SCOR'],
    "Russia": ['Munich Re', 'Swiss Re', 'Hannover Re', 'SCOR'],
    "San Marino": ['Munich Re', 'Swiss Re', 'Hannover Re', 'SCOR'],
    "Serbia": ['VIG', 'Munich Re', 'Swiss Re', 'SCOR'],
    "Slovakia": ['VIG Re', 'Munich Re', 'Swiss Re', 'SCOR'],
    "Slovenia": ['VIG Re', 'Munich Re', 'Swiss Re', 'SCOR'],
    "Spain": ['Mapfre Re', 'Munich Re', 'Swiss Re', 'Hannover Re', 'SCOR', 'CCR'],
    "Sweden": ['Munich Re', 'Swiss Re', 'Hannover Re', 'SCOR'],
    "Switzerland": ['Swiss Re Ltd', 'Munich Re', 'Hannover Re', 'SCOR'],
    "Turkey": ['VIG', 'Munich Re', 'Swiss Re', 'SCOR'],
    "Ukraine": ['VIG', 'Munich Re', 'Swiss Re', 'SCOR'],
    "England": ['Munich Re', 'Swiss Re', 'Hannover Re', 'SCOR', 'AXA XL', 'Lloyd’s'],
    "Vatican City": ['Munich Re', 'Swiss Re', 'Hannover Re', 'SCOR'],
    Afghanistan: ['China Re', 'Korean Re', 'MS&AD'],
    Armenia: ['China Re', 'Korean Re', 'Swiss Re'],
    Azerbaijan: ['China Re', 'Korean Re', 'Munich Re'],
    Bahrain: ['Malaysian Re', 'GIC Re', 'EmiratesRE'],
    Bangladesh: ['China Re', 'Korean Re', 'Malaysian Re', 'Sadharan Bima Corporation (SBC)'],
    Bhutan: ['China Re', 'Korean Re'],
    Brunei: ['Malaysian Re', 'MS&AD'],
    Cambodia: ['China Re', 'GIC Re', 'Asian Re (Asian Reinsurance Corp)'],
    China: ['China Re', 'Taiping Re', 'Peak Re', 'Swiss Re Asia'],
    Georgia: ['China Re', 'Korean Re'],
    India: ['GIC Re', 'MS&AD', 'China Re', 'Allianz‑Jio (JV)', 'Valueattics Re'],
    Indonesia: ['China Re', 'MS&AD', 'Korean Re', 'Malaysian Re', 'Asian Re'],
    Iran: ['China Re', 'MS&AD'],
    Iraq: ['China Re', 'GIC Re'],
    Israel: ['MS&AD', 'China Re'],
    Japan: ['MS&AD', 'Toa Re', 'Korean Re', 'China Re', 'Munich Re', 'Swiss Re'],
    Jordan: ['MS&AD', 'China Re'],
    Kazakhstan: ['China Re', 'Korean Re'],
    Kuwait: ['MS&AD', 'Malaysian Re', 'Saudi Re'],
    Kyrgyzstan: ['China Re', 'Korean Re'],
    Laos: ['China Re', 'Malaysian Re'],
    Lebanon: ['MS&AD', 'China Re'],
    Malaysia: ['Malaysian Re', 'Labuan Re', 'MS&AD', 'Korean Re', 'Swiss Re', 'Munich Re'],
    Maldives: ['China Re', 'MS&AD'],
    Mongolia: ['China Re', 'Korean Re'],
    Myanmar: ['China Re', 'MS&AD', 'Dai‑ichi Life Group (life)'],
    Nepal: ['China Re', 'Korean Re', 'Malaysian Re', 'Himalayan Re'],
    "North Korea": ['China Re'],
    Oman: ['MS&AD', 'Malaysian Re', 'GIC Re'],
    Pakistan: ['China Re', 'Korean Re', 'GIC Re', 'Pak Re'],
    Philippines: ['China Re', 'MS&AD', 'Korean Re', 'Nat Re'],
    Qatar: ['MS&AD', 'Malaysian Re', 'Saudi Re'],
    "Saudi Arabia": ['MS&AD', 'Malaysian Re', 'GIC Re', 'Saudi Re', 'EmiratesRE'],
    Singapore: ['Malaysian Re', 'GIC Re', 'Korean Re', 'MS&AD', 'SCOR Asia', 'Swiss Re Asia', 'RGA'],
    "South Korea": ['Korean Re', 'China Re', 'MS&AD', 'Samsung Re'],
    "Sri Lanka": ['China Re', 'Korean Re', 'MS&AD'],
    Syria: ['China Re', 'MS&AD'],
    Taiwan: ['Central Re', 'China Re', 'Toa Re', 'Swiss Re Asia', 'Munich Re'],
    Tajikistan: ['China Re', 'Korean Re'],
    Thailand: ['China Re', 'MS&AD', 'Malaysian Re', 'Thai Re', 'Peak Re', 'QBE Asia'],
    "Timor Leste": ['China Re', 'MS&AD'],
    Turkey: ['China Re', 'MS&AD', 'Korean Re', 'Munich Re', 'Swiss Re'],
    Turkmenistan: ['China Re', 'Korean Re'],
    "United Arab Emirates": ['Malaysian Re', 'GIC Re', 'MS&AD', 'EmiratesRE', 'Takaful Re'],
    Uzbekistan: ['China Re', 'Korean Re'],
    Vietnam: ['Vinare (Vietnam National Re)', 'China Re', 'MS&AD', 'Malaysian Re', 'Central Re'],
    Yemen: ['China Re', 'MS&AD'],
    "Argentina": ["IRB Brasil RE (via Brazil)", "Mapfre RE", "Munich Re", "Swiss Re", "Hannover Re", "SCOR", "Everest Re", "Lloyd’s"],
    "Bolivia": ["Everest Re", "Mapfre RE", "Munich Re", "Swiss Re", "Hannover Re", "SCOR"],
    "Brazil": ["IRB Brasil RE", "Mapfre RE", "Porto Seguro Re (via Porto Seguro)", "Munich Re", "Swiss Re", "Hannover Re", "SCOR", "Everest Re"],
    "Chile": ["Mapfre RE", "Everest Re", "Munich Re", "Swiss Re", "Hannover Re", "SCOR", "Lloyd’s"],
    "Colombia": ["Mapfre RE", "Everest Re", "Munich Re", "Swiss Re", "Hannover Re", "SCOR", "Lloyd’s"],
    "Ecuador": ["Mapfre RE", "Everest Re", "Munich Re", "Swiss Re", "Hannover Re", "SCOR", "Lloyd’s"],
    "Guyana": ["Everest Re", "Munich Re", "Swiss Re", "Hannover Re", "SCOR", "Lloyd’s"],
    "Paraguay": ["Mapfre RE", "Everest Re", "Munich Re", "Swiss Re", "Hannover Re", "SCOR", "Lloyd’s"],
    "Peru": ["Pacífico Seguros/Reaseguros (local)", "Everest Re", "Mapfre RE", "Munich Re", "Swiss Re", "Hannover Re", "SCOR", "Lloyd’s"],
    "Suriname": ["Everest Re", "Munich Re", "Swiss Re", "Hannover Re", "SCOR", "Lloyd’s"],
    "Uruguay": ["Everest Re", "Mapfre RE", "Munich Re", "Swiss Re", "Hannover Re", "SCOR", "Lloyd’s"],
    "Venezuela": ["Mapfre RE", "Everest Re", "Munich Re", "Swiss Re", "Hannover Re", "SCOR", "Lloyd’s"],
    Canada: ['Swiss Re', 'Munich Re', 'Gen Re', 'RGA', 'Fairfax Financial', 'Canada Life Re'],
    USA: ['Munich Re America', 'Swiss Re America', 'Gen Re', 'RGA', 'Everest Re', 'PartnerRe', 'Hannover Re', 'SCOR'],
    Mexico: ['Swiss Re', 'Munich Re', 'SCOR', 'Hannover Re', 'Reaseguradora Patria'],
    Guatemala: ['Swiss Re', 'Munich Re', 'SCOR', 'Mapfre Re'],
    Belize: ['Swiss Re', 'Munich Re', 'SCOR', 'Mapfre Re'],
    'El Salvador': ['Swiss Re', 'Munich Re', 'SCOR', 'Mapfre Re'],
    Honduras: ['Swiss Re', 'Munich Re', 'SCOR', 'Mapfre Re'],
    Nicaragua: ['Swiss Re', 'Munich Re', 'SCOR', 'Mapfre Re'],
    'Costa Rica': ['Swiss Re', 'Munich Re', 'SCOR', 'Mapfre Re', 'INS Re'],
    Panama: ['Swiss Re', 'Munich Re', 'SCOR', 'Mapfre Re'],
    Cuba: ['Swiss Re', 'Munich Re'],
    'Dominican Republic': ['Swiss Re', 'Munich Re', 'SCOR', 'Mapfre Re'],
    Jamaica: ['Swiss Re', 'Munich Re', 'SCOR', 'Mapfre Re'],
     Haiti: ['Swiss Re', 'Munich Re'],
    Bahamas: ['Swiss Re', 'Munich Re'],
    Barbados: ['Swiss Re', 'Munich Re', 'SCOR', 'AXIS Capital'],
    'Trinidad and Tobago': ['Swiss Re', 'Munich Re', 'SCOR', 'AXIS Capital'],
    'Antigua and Barbuda': ['Royal Bank of Canada (captive?)', 'State Insurance Co.', 'International IBC Captive Re'],
    Dominica: ['Island Heritage Insurance (reinsurance program)', 'CG United (Coralisle)'],
    Grenada: ['Island Heritage Insurance (regional reinsurance program)', 'CG United'],
    'Saint Kitts and Nevis': ['Island Heritage Insurance', 'CG United'],
    'Saint Lucia': ['Caribbean Alliance Insurance (regional)', 'CG United', 'Island Heritage Insurance'],
    'Saint Vincent and the Grenadines': ['Island Heritage Insurance', 'CG United']
  // Add more as needed
}
const reinsurersData = {
  // Africa
  "Africa Re": [
    "Crop Insurance", "Livestock Insurance", "Forestry Insurance", "Aquaculture Insurance",
    "Political Risk", "Trade Credit", "General Liability", "Group Life", "Term Life",
    "Motor Third Party Liability", "Commercial Motor", "Weather Insurance", "Parametric Insurance"
  ],
  "Algeria Re": [
    "Commercial Property", "Industrial All Risk", "Marine Liability (P&I)", "Cargo", "Hull",
    "Aviation Liability", "Aircraft Hull"
  ],
  "Aveni Re": [
    "Group Life", "Credit Life", "Universal Life", "Term Life", "Whole Life"
  ],
  "CICA Re": [
    "Crop Insurance", "Livestock Insurance", "Motor Third Party Liability", "Homeowners", "Travel Insurance"
  ],
  "Continental Re": [
    "Commercial Property", "Contractors All Risks (CAR)", "Builder's Risk",
    "Motor Third Party Liability", "General Liability", "Political Risk", "Parametric Insurance"
  ],
  "East Africa Re": [
    "Crop Insurance", "Livestock Insurance", "Weather Insurance", "Commercial Motor",
    "Motor Third Party Liability", "Group Life"
  ],
  "Ethiopian Re": [
    "Commercial Motor", "Fleet Insurance", "Industrial All Risk", "Homeowners", "Life - Group Life", 
    "Medical - Group Health"
  ],
  "FBC Re": [
    "Credit Life", "Mortgage Insurance", "Term Life", "Endowment", "Universal Life"
  ],
  "Ghana Re": [
    "Crop Insurance", "Livestock Insurance", "Weather Insurance", "Commercial Motor",
    "Marine Liability (P&I)", "Contractors Plant and Machinery (CPM)"
  ],
  "GN Re": [
    "Cyber Liability", "Professional Indemnity", "Product Liability", "Directors & Officers (D&O)", 
    "Environmental Liability"
  ],
  "Kenya Re": [
    "Crop Insurance", "Livestock Insurance", "Weather Insurance", "Parametric Insurance", 
    "Commercial Motor", "Group Life", "Health - Individual Health"
  ],
  "Mainstream Re": [
    "Mortgage Insurance", "Credit Insurance", "Surety Bonds", "Fidelity Guarantee"
  ],
  "NamibRe": [
    "Commercial Property", "Homeowners", "Renters", "Industrial All Risk", "Travel Insurance"
  ],
  "Nigerian Re": [
    "Commercial Motor", "Private Motor", "Group Life", "Cargo", "Hull", "Crop Insurance"
  ],
  "NSIA Re (Benin)": [
    "Crop Insurance", "Livestock Insurance", "Commercial Motor", "Fleet Insurance", "Parametric Insurance"
  ],
  "SCG-Re": [
    "Contractors All Risks (CAR)", "Industrial All Risk", "Commercial Property", "Marine Liability (P&I)", "Cargo"
  ],
  "Sen Re": [
    "Crop Insurance", "Weather Insurance", "Parametric Insurance", "Livestock Insurance", "Forestry Insurance"
  ],
  "SOGEAR Re": [
    "Life - Term Life", "Universal Life", "Whole Life", "Group Life", "Credit Life"
  ],
  "SONAR Re": [
    "Crop Insurance", "Political Risk", "Trade Credit", "Marine Liability (P&I)", "General Liability"
  ],
  "TAN Re": [
    "Crop Insurance", "Commercial Motor", "Weather Insurance", "Group Health", "Group Life"
  ],
  "Tunis Re": [
    "Marine Liability (P&I)", "Hull", "Cargo", "Commercial Property", "Political Risk"
  ],
  "Union Assurances Re": [
    "Mortgage Insurance", "Credit Insurance", "Life - Term Life", "Critical Illness", "Disability Income"
  ],
  "WAICA Re": [
    "Crop Insurance", "Livestock Insurance", "Commercial Motor", "Contractors All Risks (CAR)", "Weather Insurance"
  ],
  "ZEP RE": [
    "Parametric Insurance", "Weather Insurance", "Crop Insurance", "Livestock Insurance", 
    "Forestry Insurance", "Commercial Motor", "Political Risk"
  ],
  "Zep Re": [
    "Parametric Insurance", "Weather Insurance", "Crop Insurance", "Livestock Insurance", 
    "Forestry Insurance", "Commercial Property", "Terrorism Insurance"
  ],
  "Zep Re (PTA Re)": [
    "Parametric Insurance", "Weather Insurance", "Crop Insurance", "Livestock Insurance", 
    "Forestry Insurance", "Political Risk", "General Liability"
  ],

  // Europe
  "Achmea Re": ["Homeowners", "Commercial Property", "Condominium", "Term Life", "Group Health"],
  "Arch Re Europe": ["Cyber Liability", "Directors & Officers (D&O)", "Professional Indemnity", "Product Liability"],
  "Assicurazioni Generali Re": ["Whole Life", "Universal Life", "Group Life", "Health - Group Health"],
  "AXA XL": ["Marine Liability (P&I)", "Cargo", "Hull", "Aviation Liability", "Environmental Liability"],
  "AXIS Re SE": ["Event Cancellation", "Sports and Entertainment Insurance", "Kidnap and Ransom", "Fine Arts Insurance"],
  "Compensa VIG Re": ["Homeowners", "Commercial Motor", "Industrial All Risk", "Renters"],
  "Convex Europe": ["Terrorism Insurance", "Political Risk", "Cyber Liability", "Nuclear Risk Insurance"],
  "Covéa/PartnerRe": ["Life - Endowment", "Credit Life", "Critical Illness", "Term Life"],
  "Generali Re": ["Universal Life", "Whole Life", "Group Health", "Individual Health"],
  "Groupama Re": ["Agriculture - Crop Insurance", "Forestry Insurance", "Parametric Insurance"],
  "Hannover Re": ["All Classes"],
  "Hannover Re Ireland DAC": ["All Classes"],
  "Hannover Rück": ["All Classes"],
  "Lloyd's": ["All Classes"],
  "Lloyd’s Europe": ["All Classes"],
  "Mapfre Re": ["Commercial Motor", "Fleet Insurance", "Travel Insurance", "Marine Liability (P&I)"],
  "Munich Re": ["All Classes"],
  "PartnerRe Europe SE": ["All Classes"],
  "SCOR": ["All Classes"],
  "SCOR SE": ["All Classes"],
  "Swiss Re": ["All Classes"],
  "Swiss Re Europe": ["All Classes"],
  "Swiss Re Ltd": ["All Classes"],
  "TransRe Europe SA": ["Cyber Liability", "Terrorism Insurance", "Parametric Insurance", "Weather Insurance"],
  "Uniqa Reinsurance": ["Commercial Property", "Homeowners", "Condominium", "Group Life"],
  "VIG": ["Commercial Property", "Motor Third Party Liability", "Life - Credit Life", "Health - Dental"],
  "VIG Re": ["Industrial All Risk", "Commercial Property", "Group Life", "Travel Insurance"],
  "Ydrogios Re": ["Marine Liability (P&I)", "Cargo", "Hull", "Commercial Motor"],

  // Asia
  "Allianz Risk": ["Cyber Liability", "Political Risk", "Commercial Property", "Parametric Insurance"],
  "Allianz‑Jio (JV)": ["Individual Health", "Group Health", "Term Life", "Universal Life"],
  "Asian Re": ["Crop Insurance", "Livestock Insurance", "Weather Insurance"],
  "Asian Re (Asian Reinsurance Corp)": ["Forestry Insurance", "Parametric Insurance", "Marine Liability (P&I)"],
  "Central Re": ["Commercial Property", "Industrial All Risk", "Commercial Motor"],
  "China Re": ["All Classes"],
  "EmiratesRE": ["Takaful - Family Takaful", "Medical Takaful", "Property Takaful"],
  "GIC Re": ["Commercial Motor", "Fleet Insurance", "Homeowners", "Industrial All Risk"],
  "GIC Re South Africa": ["Commercial Property", "Contractors All Risks (CAR)", "Parametric Insurance"],
  "Himalayan Re": ["Weather Insurance", "Crop Insurance", "Livestock Insurance"],
  "Korean Re": ["All Classes"],
  "Labuan Re": ["Commercial Property", "Marine Liability (P&I)", "Political Risk"],
  "Malaysian Re": ["Takaful Business", "Health - Group Health", "Life - Term Life"],
  "MS&AD": ["Commercial Motor", "Fleet Insurance", "Individual Health", "Homeowners"],
  "Nat Re": ["Weather Insurance", "Crop Insurance", "Livestock Insurance"],
  "Pak Re": ["Commercial Property", "Marine Liability (P&I)", "Political Risk"],
  "Peak Re": ["Travel Insurance", "Life - Universal Life", "Parametric Insurance"],
  "Sadharan Bima Corporation (SBC)": ["Commercial Motor", "Industrial All Risk", "Group Life"],
  "Samsung Re": ["Cyber Liability", "Directors & Officers (D&O)", "Event Cancellation"],
  "Saudi Re": ["Takaful Re", "Crop Insurance", "Parametric Insurance"],
  "Swiss Re Asia": ["All Classes"],
  "Taiping Re": ["Marine Liability (P&I)", "Cargo", "Commercial Property"],
  "Takaful Re": ["Takaful - Life", "Takaful - Family Health", "Takaful - Property"],
  "Thai Re": ["Health - Group Health", "Weather Insurance", "Life - Term Life"],
  "Toa Re": ["Commercial Motor", "Fleet Insurance", "Crop Insurance"],
  "Valueattics Re": ["Weather Insurance", "Parametric Insurance", "Political Risk"],
  "Vinare (Vietnam National Re)": ["Crop Insurance", "Livestock Insurance", "Weather Insurance"],

  // Americas
  "Canada Life Re": ["Credit Life", "Group Life", "Disability Income", "Term Life"],
  "Everest Re": ["All Classes"],
  "Fairfax Financial": ["Commercial Property", "Industrial All Risk", "Fleet Insurance"],
  "Gen Re": ["All Classes"],
  "INS Re": ["Travel Insurance", "Life - Term Life", "Weather Insurance"],
  "IRB Brasil RE": ["Commercial Motor", "Fleet Insurance", "Crop Insurance"],
  "IRB Brasil RE (via Brazil)": ["Weather Insurance", "Livestock Insurance", "Parametric Insurance"],
  "Munich Re America": ["All Classes"],
  "Porto Seguro Re (via Porto Seguro)": ["Motor Third Party Liability", "Private Motor", "Homeowners"],
  "Reaseguradora Patria": ["Commercial Property", "Travel Insurance", "Marine Liability (P&I)"],
  "RGA": ["Group Life", "Universal Life", "Credit Life"],
  "Swiss Re America": ["All Classes"],

  // Caribbean (Captives/Specialty)
  "CG United": ["Commercial Property", "Homeowners", "Group Health"],
  "CG United (Coralisle)": ["Travel Insurance", "Homeowners", "Industrial All Risk"],
  "Caribbean Alliance Insurance (regional)": ["Commercial Motor", "Fleet Insurance", "Marine Liability (P&I)"],
  "International IBC Captive Re": ["Specialty Captives", "Political Risk", "Terrorism Insurance"],
  "Island Heritage Insurance": ["Homeowners", "Renters", "Travel Insurance"],
  "Island Heritage Insurance (regional reinsurance program)": ["Weather Insurance", "Parametric Insurance"],
  "Island Heritage Insurance (reinsurance program)": ["Group Life", "Group Health"],
  "Royal Bank of Canada (captive?)": ["Mortgage Insurance", "Credit Insurance"],
  "State Insurance Co.": ["Commercial Property", "Homeowners"],

  // Global/Other
  "Société Centrale de Réassurance (SCR)": ["Crop Insurance", "Weather Insurance", "Marine Liability (P&I)"],
  "Pacífico Seguros/Reaseguros (local)": ["Commercial Property", "Homeowners", "Private Motor"],
  "QBE Asia": ["Cyber Liability", "Political Risk", "Commercial Property"],
  "Dai‑ichi Life Group (life)": ["Term Life", "Whole Life", "Endowment", "Universal Life"]
};

 