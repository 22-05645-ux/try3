// ------------------- DATA -------------------
let vehicles = JSON.parse(localStorage.getItem("vehicles")) || [
  { plate: "NGX 4853", whereabouts: "Batangas City", history: [] },
  { plate: "NGX 4856", whereabouts: "Batangas City", history: [] },
  { plate: "NFZ 2848", whereabouts: "Batangas City", history: [] },
  { plate: "CBP 5511", whereabouts: "Batangas City", history: [] },
  { plate: "CBP 1336", whereabouts: "Batangas City", history: [] },
  { plate: "ZSG 105", whereabouts: "Batangas City", history: [] },
  { plate: "UOF 225", whereabouts: "Batangas City", history: [] },
  { plate: "NQX 657", whereabouts: "Batangas City", history: [] },
  { plate: "WQT 225", whereabouts: "Batangas City", history: [] },
  { plate: "MAM 7806", whereabouts: "Batangas City", history: [] },
  { plate: "NBO 6586", whereabouts: "Batangas City", history: [] },
  { plate: "EMPTY", whereabouts: "Batangas City", history: [] },
];

const details = {
  "NGX 4853": { model: "Mitsubishi L300", yearBought: "2022", status: "Active", lastTrip: "2025-09-10", lastMaintenance: "2025-09-12", whereabouts: "Batangas City" },
  "NGX 4856": { model: "Mitsubishi L300", yearBought: "2021", status: "Active", lastTrip: "2025-09-05", lastMaintenance: "2025-09-15", whereabouts: "Batangas City" },
  "NFZ 2848": { model: "Isuzu Traviz", yearBought: "2023", status: "Under Maintenance", lastTrip: "2025-09-08", lastMaintenance: "2025-09-16", whereabouts: "Batangas City" },
  "CBP 5511": { model: "Isuzu Elf Truck", yearBought: "2021", status: "Active", lastTrip: "2025-09-05", lastMaintenance: "2025-09-15", whereabouts: "Batangas City" },
  "CBP 1336": { model: "Isuzu Elf Truck", yearBought: "2023", status: "Under Maintenance", lastTrip: "2025-09-08", lastMaintenance: "2025-09-16", whereabouts: "Batangas City" },
  "ZSG 105": { model: "Isuzu Elf Truck", yearBought: "2023", status: "Under Maintenance", lastTrip: "2025-09-08", lastMaintenance: "2025-09-16", whereabouts: "Batangas City" },
  "UOF 225": { model: "Isuzu Elf Truck", yearBought: "2023", status: "Under Maintenance", lastTrip: "2025-09-08", lastMaintenance: "2025-09-16", whereabouts: "Batangas City" },
  "NQX 657": { model: "Isuzu Elf Truck", yearBought: "2023", status: "Under Maintenance", lastTrip: "2025-09-08", lastMaintenance: "2025-09-16", whereabouts: "Batangas City" },
  "WQT 225": { model: "Isuzu Elf Truck", yearBought: "2023", status: "Under Maintenance", lastTrip: "2025-09-08", lastMaintenance: "2025-09-16", whereabouts: "Batangas City" },
  "MAM 7806": { model: "Isuzu Elf Truck", yearBought: "2023", status: "Under Maintenance", lastTrip: "2025-09-08", lastMaintenance: "2025-09-16", whereabouts: "Batangas City" },
  "NBO 6586": { model: "Isuzu Elf Truck", yearBought: "2023", status: "Under Maintenance", lastTrip: "2025-09-08", lastMaintenance: "2025-09-16", whereabouts: "Batangas City" },
  "EMPTY": { model: "Isuzu Elf Truck", yearBought: "2023", status: "Under Maintenance", lastTrip: "2025-09-08", lastMaintenance: "2025-09-16", whereabouts: "Batangas City" },
};

const vehicleImages = {
  "NGX 4853": "https://www.mitsubishi-motors.com.ph/content/dam/mitsubishi-motors-ph/images/site-images/cars/l300/2020/L300-FB_1080_FL.png",
  "NGX 4856": "https://upload.wikimedia.org/wikipedia/commons/8/8f/Mitsubishi_L300_Van.jpg",
  "NFZ 2848": "https://www.isuzu-gencars.com.ph/wp-content/uploads/2020/07/Isuzu-TRAVIZ-Utility-Van-222-scaled.jpg",
  "CBP 5511": "https://carused.jp/images/elf/flatbody.jpg",
  "CBP 1336": "https://carused.jp/images/elf/flatbody.jpg",
  "ZSG 105": "https://trucksite.com/photos/isuzu-npr-box-truck.jpg",
  "UOF 225": "https://www.isuzu-gencars.com.ph/wp-content/uploads/2020/07/Isuzu-TRAVIZ-Utility-Van-222-scaled.jpg",
  "NQX 657": "https://www.carmag.co.za/wp-content/uploads/2023/10/Isuzu-D-Max-edit-2-800x480.png",
  "WQT 225": "https://www.mitsubishi-motors.com.ph/content/dam/mitsubishi-motors-ph/images/site-images/cars/l300/2020/L300-FB_1080_FL.png",
  "MAM 7806": "https://carused.jp/images/elf/flatbody.jpg",
  "NBO 6586": "https://www.isuzu-gencars.com.ph/wp-content/uploads/2020/07/Isuzu-TRAVIZ-Utility-Van-222-scaled.jpg",
  "EMPTY": "https://pluspng.com/img-png/ferrari-png-ferrari-sergio-png-picture-2256.png"
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

    const imgUrl = vehicleImages[v.plate] || "https://via.placeholder.com/200x120?text=Vehicle";

    card.innerHTML = `
      <img src="${imgUrl}" alt="${v.plate}" />
      <h2>${v.plate}</h2>
      <p>Whereabouts: ${v.whereabouts}</p>
    `;

    card.onclick = () => { 
      selectedVehicle = v.plate; 
      activeTab = "Details"; 
      renderDetails(); 
    };

    grid.appendChild(card);
  });

  app.appendChild(grid);
}

// ------------------- INIT -------------------
renderList();
