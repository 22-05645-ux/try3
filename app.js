// ------------------- DATA -------------------
let vehicles = JSON.parse(localStorage.getItem("vehicles")) || [
  { plate: "NGX 4853", whereabouts: "Batangas City", history: [] },
  { plate: "NGX 4856", whereabouts: "Batangas City", history: [] },
  { plate: "NFZ 2848", whereabouts: "Batangas City", history: [] },
  { plate: "CBP 5511", whereabouts: "Batangas City", history: [] },
  { plate: "CBP 1336", whereabouts: "Batangas City", history: [] },
  { plate: "ZSG 105", whereabouts: "Batangas City", history: [] },
  { plate: "UOF 225", whereabouts: "Batangas City", history: [],},
  { plate: "NQX 657", whereabouts: "Batangas City", history: [],},
  { plate: "WQT 225", whereabouts: "Batangas City", history: [],},
  { plate: "MAM 7806", whereabouts: "Batangas City", history: [],},
  { plate: "NBO 6586", whereabouts: "Batangas City", history: [],},
  { plate: "EMPTY", whereabouts: "Batangas City", history: [],},
];

const details = {
  "NGX 4853": { model: "Mitsubishi L300", yearBought: "2022", status: "Active", lastTrip: "2025-09-10", lastMaintenance: "2025-09-12", whereabouts: "Batangas City" },
  "NGX 4856": { model: "Mitsubishi L300", yearBought: "2021", status: "Active", lastTrip: "2025-09-05", lastMaintenance: "2025-09-15", whereabouts: "Batangas City" },
  "NFZ 2848": { model: "Isuzu Traviz", yearBought: "2023", status: "Under Maintenance", lastTrip: "2025-09-08", lastMaintenance: "2025-09-16", whereabouts: "Batangas City" },
  "CBP 5511": { model: "Isuzu Elf Truck", yearBought: "2021", status: "Active", lastTrip: "2025-09-05", lastMaintenance: "2025-09-15", whereabouts: "Batangas City" },
  "CBP 1336": { model: "Isuzu Elf Truck", yearBought: "2023", status: "Under Maintenance", lastTrip: "2025-09-08", lastMaintenance: "2025-09-16", whereabouts: "Batangas City" },
  "ZSG 105":  { model: "Isuzu Elf Truck", yearBought: "2023", status: "Under Maintenance", lastTrip: "2025-09-08", lastMaintenance: "2025-09-16", whereabouts: "Batangas City" },
  "UOF 225": { model: "Isuzu Elf Truck", yearBought: "2023", status: "Under Maintenance", lastTrip: "2025-09-08", lastMaintenance: "2025-09-16", whereabouts: "Batangas City" },
  "NQX 657": { model: "Isuzu Elf Truck", yearBought: "2023", status: "Under Maintenance", lastTrip: "2025-09-08", lastMaintenance: "2025-09-16", whereabouts: "Batangas City" },
  "WQT 225": { model: "Isuzu Elf Truck", yearBought: "2023", status: "Under Maintenance", lastTrip: "2025-09-08", lastMaintenance: "2025-09-16", whereabouts: "Batangas City" },
  "MAM 7806": { model: "Isuzu Elf Truck", yearBought: "2023", status: "Under Maintenance", lastTrip: "2025-09-08", lastMaintenance: "2025-09-16", whereabouts: "Batangas City" },
  "NBO 6586": { model: "Isuzu Elf Truck", yearBought: "2023", status: "Under Maintenance", lastTrip: "2025-09-08", lastMaintenance: "2025-09-16", whereabouts: "Batangas City" },
  "EMPTY": { model: "Isuzu Elf Truck", yearBought: "2023", status: "Under Maintenance", lastTrip: "2025-09-08", lastMaintenance: "2025-09-16", whereabouts: "Batangas City" },
};

const app = document.getElementById("app");
let selectedVehicle = null;
let activeTab = "Details";

// ------------------- CLOCK -------------------
function updateClock() {
  document.getElementById("clock").textContent = new Date().toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

// ------------------- STORAGE -------------------
function save() {
  localStorage.setItem("vehicles", JSON.stringify(vehicles));
}

// ------------------- RENDER -------------------
function renderList() {
  app.innerHTML = "";
  const grid = document.createElement("div");
  grid.className = "grid";

  vehicles.forEach(v => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="https://www.mitsubishi-motors.com.ph/content/dam/mitsubishi-motors-ph/images/site-images/cars/l300/2020/L300-FB_1080_FL.png" />
      <h2>${v.plate}</h2>
      <p>Whereabouts: ${v.whereabouts}</p>
    `;
    card.onclick = () => { selectedVehicle = v.plate; activeTab = "Details"; renderDetails(); };
    grid.appendChild(card);
  });

  app.appendChild(grid);
}

function renderDetails() {
  const v = vehicles.find(x => x.plate === selectedVehicle);
  const d = details[selectedVehicle] || {};
  app.innerHTML = `
    <button onclick="backToList()">← Back</button>
    <h1>${v.plate}</h1>
    <div class="tab-buttons">
      ${["Details","Maintenance","Vehicle Request","Whereabouts","Fuel","Reports","History"].map(tab => 
        `<button onclick="setTab('${tab}')" class="${activeTab===tab?'active':''}">${tab}</button>`).join("")}
    </div>
    <div id="tabContent"></div>
  `;
  renderTab(v,d);
}

function renderTab(v,d) {
  const tabContent = document.getElementById("tabContent");

  // ---------- DETAILS ----------
  if (activeTab === "Details") {
    tabContent.innerHTML = `
      <p><b>Model:</b> ${d.model||"N/A"}</p>
      <p><b>Year Bought:</b> ${d.yearBought||"N/A"}</p>
      <p><b>Status:</b> ${d.status||"N/A"}</p>
      <p><b>Last Trip:</b> ${d.lastTrip||"N/A"}</p>
      <p><b>Last Maintenance:</b> ${d.lastMaintenance||"N/A"}</p>
      <p><b>Whereabouts:</b> ${v.whereabouts}</p>
    `;
  }

  // ---------- FORMS ----------
  else if (activeTab === "Maintenance") {
    tabContent.innerHTML = `
      <form onsubmit="submitMaintenance(event)">
        <input type="date" name="date" required />
        <input type="text" name="cv" placeholder="CV Number" required />
        <input type="text" name="reason" placeholder="Reason" required />
        <input type="number" name="cost" placeholder="Cost" required />
        <button type="submit">Submit</button>
      </form>
    `;
  }
  else if (activeTab === "Vehicle Request") {
    tabContent.innerHTML = `
      <form onsubmit="submitVehicleRequest(event)">
        <input type="date" name="date" required />
        <input type="text" name="project" placeholder="Project" required />
        <input type="text" name="from" placeholder="Job Order #" required />
        <input type="text" name="to" placeholder="Location" required />
        <input type="text" name="driver" placeholder="Driver" required />
        <input type="text" name="purpose" placeholder="Purpose" required />
        <input type="text" name="request" placeholder="Requested By" required />
        <button type="submit">Submit</button>
      </form>
    `;
  }
  else if (activeTab === "Whereabouts") {
    tabContent.innerHTML = `
      <form onsubmit="submitWhereabouts(event)">
        <select name="place" required>
          <option value="">Select</option>
          <option>Batangas City</option>
          <option>Makati</option>
          <option>Company Use</option>
          <option>Repair Shop</option>
        </select>
        <input type="text" name="company" placeholder="Destination (if Company Use)" />
        <button type="submit">Update</button>
      </form>
    `;
  }
  else if (activeTab === "Fuel") {
    tabContent.innerHTML = `
      <form onsubmit="submitFuel(event)">
        <input type="date" name="date" required />
        <input type="text" name="bearer" placeholder="Bearer" required />
        <input type="text" name="order" placeholder="PO #" required />
        <select name="gas" required>
          <option value="">Fuel Type</option>
          <option>Diesel</option>
          <option>Gasoline</option>
        </select>
        <input type="number" name="amount" placeholder="Amount" required />
        <button type="submit">Submit</button>
      </form>
    `;
  }
  else if (activeTab === "Reports") {
    tabContent.innerHTML = `
      <form onsubmit="submitReport(event)">
        <input type="file" name="report" required />
        <button type="submit">Upload</button>
      </form>
    `;
  }

  // ---------- HISTORY ----------
  else if (activeTab === "History") {
    renderHistory(v, tabContent);
  }
}

// ------------------- HISTORY (Expandable + Sortable + CSV) -------------------
function renderHistory(v, tabContent) {
  if (!v.history.length) {
    tabContent.innerHTML = `<p>No history yet.</p>`;
    return;
  }

  if (!window.expanded) window.expanded = { Maintenance:true, Vehicle:true, Fuel:true, Whereabouts:true, Report:true };
  if (!window.sortState) window.sortState = {};

  const grouped = v.history.reduce((acc,h)=>{ acc[h.type]=acc[h.type]||[]; acc[h.type].push(h); return acc; },{});
  let html="";

  function makeTable(headers, rows, type) {
    return `
      <table>
        <thead style="background:#f3f4f6">
          <tr>
            ${headers.map((h,i)=>
              `<th onclick="sortHistory('${type}',${i})" style="cursor:pointer;">
                ${h} ${window.sortState[type]?.col===i?(window.sortState[type].asc?"▲":"▼"):""}
              </th>`).join("")}
          </tr>
        </thead>
        <tbody>${rows.join("")}</tbody>
      </table>
    `;
  }

  function makeToggle(title,key,tableHtml,color) {
    const isOpen=window.expanded[key];
    return `
      <div style="margin-bottom:12px;">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <button onclick="toggleHistory('${key}')" 
            style="flex:1;text-align:left;font-weight:bold;background:${color};color:white;padding:6px;border:none;border-radius:4px;">
            ${isOpen?"▼":"▶"} ${title}
          </button>
          <button onclick="exportHistory('${key}')" 
            style="margin-left:8px;background:#10b981;color:white;border:none;padding:6px 10px;border-radius:4px;cursor:pointer;">
            ⬇ CSV
          </button>
        </div>
        ${isOpen?tableHtml:""}
      </div>
    `;
  }

  // Sections
  if (grouped["Maintenance"]) {
    let data=sortData(grouped["Maintenance"],"Maintenance",["date","cv","reason","cost"]);
    let rows=data.map(h=>`<tr><td>${h.date}</td><td>${h.cv}</td><td>${h.reason}</td><td>₱${h.cost}</td></tr>`);
    html+=makeToggle("Maintenance","Maintenance",makeTable(["Date","CV No.","Reason","Cost"],rows,"Maintenance"),"#065f46");
  }
  if (grouped["Vehicle"]) {
    let data=sortData(grouped["Vehicle"],"Vehicle",["date","project","from","to","driver","purpose","request"]);
    let rows=data.map(h=>`<tr><td>${h.date}</td><td>${h.project}</td><td>${h.from}</td><td>${h.to}</td><td>${h.driver}</td><td>${h.purpose}</td><td>${h.request}</td></tr>`);
    html+=makeToggle("Vehicle Request","Vehicle",makeTable(["Date","Project","Job Order #","Location","Driver","Purpose","Requested By"],rows,"Vehicle"),"#1e40af");
  }
  if (grouped["Fuel"]) {
    let data=sortData(grouped["Fuel"],"Fuel",["date","bearer","order","gas","amount"]);
    let rows=data.map(h=>`<tr><td>${h.date}</td><td>${h.bearer}</td><td>${h.order}</td><td>${h.gas}</td><td>₱${h.amount}</td></tr>`);
    html+=makeToggle("Fuel","Fuel",makeTable(["Date","Bearer","PO #","Type","Amount"],rows,"Fuel"),"#c2410c");
  }
  if (grouped["Whereabouts"]) {
    let data=sortData(grouped["Whereabouts"],"Whereabouts",["date","place"]);
    let rows=data.map(h=>`<tr><td>${h.date}</td><td>${h.place}</td></tr>`);
    html+=makeToggle("Whereabouts","Whereabouts",makeTable(["Date","Location"],rows,"Whereabouts"),"#6d28d9");
  }
  if (grouped["Report"]) {
    let data=sortData(grouped["Report"],"Report",["date","file"]);
    let rows=data.map(h=>`<tr><td>${h.date}</td><td>${h.file}</td></tr>`);
    html+=makeToggle("Reports","Report",makeTable(["Date","File"],rows,"Report"),"#b91c1c");
  }

  tabContent.innerHTML=html;
}

// ------------------- HELPERS -------------------
function backToList(){selectedVehicle=null;renderList();}
function setTab(tab){activeTab=tab;renderDetails();}
function addHistory(type,data){const v=vehicles.find(x=>x.plate===selectedVehicle);v.history.push({type,...data});save();activeTab="History";renderDetails();}
function toggleHistory(key){window.expanded[key]=!window.expanded[key];renderDetails();}
function sortData(data,type,fields){
  if(window.sortState[type]){
    const {col,asc}=window.sortState[type];
    return [...data].sort((a,b)=>asc?(a[fields[col]]>b[fields[col]]?1:-1):(a[fields[col]]<b[fields[col]]?1:-1));
  }
  return data;
}
function sortHistory(type,colIndex){
  if(!window.sortState[type]) window.sortState[type]={col:colIndex,asc:true};
  else if(window.sortState[type].col===colIndex) window.sortState[type].asc=!window.sortState[type].asc;
  else window.sortState[type]={col:colIndex,asc:true};
  renderDetails();
}
function exportHistory(type){
  const v=vehicles.find(x=>x.plate===selectedVehicle);
  if(!v) return;
  const data=v.history.filter(h=>h.type===type);
  if(!data.length){alert("No records to export.");return;}
  const keys=Object.keys(data[0]);
  const csv=[keys.join(","),...data.map(r=>keys.map(k=>`"${r[k]||""}"`).join(","))].join("\n");
  const blob=new Blob([csv],{type:"text/csv"});
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a");
  a.href=url;a.download=`${selectedVehicle}_${type}_history.csv`;a.click();
  URL.revokeObjectURL(url);
}

// ------------------- FORMS -------------------
function submitMaintenance(e){
  e.preventDefault();
  const fd = new FormData(e.target);
  addHistory("Maintenance", {
    date: fd.get("date"),
    cv: fd.get("cv"),
    reason: fd.get("reason"),
    cost: fd.get("cost")
  });
}

function submitVehicleRequest(e){
  e.preventDefault();
  const fd = new FormData(e.target);
  addHistory("Vehicle", {
    date: fd.get("date"),
    project: fd.get("project"),
    from: fd.get("from"),
    to: fd.get("to"),
    driver: fd.get("driver"),
    purpose: fd.get("purpose"),
    request: fd.get("request")
  });
}

function submitWhereabouts(e){
  e.preventDefault();
  const fd = new FormData(e.target);
  let place = fd.get("place");
  if(place==="Company Use") place += " - " + fd.get("company");
  const v = vehicles.find(x=>x.plate===selectedVehicle);
  v.whereabouts = place;
  addHistory("Whereabouts", {
    date: new Date().toISOString().split("T")[0],
    place: place
  });
}

function submitFuel(e){
  e.preventDefault();
  const fd = new FormData(e.target);
  addHistory("Fuel", {
    date: fd.get("date"),
    bearer: fd.get("bearer"),
    order: fd.get("order"),
    gas: fd.get("gas"),
    amount: fd.get("amount")
  });
}

function submitReport(e){
  e.preventDefault();
  addHistory("Report", {
    date: new Date().toISOString().split("T")[0],
    file: e.target.report.value
  });
}


// ------------------- INIT -------------------
renderList();
