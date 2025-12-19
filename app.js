// LOGIN PAGE
const loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    const name = document.getElementById("playerName").value.trim();
    if (!name) return alert("Enter your name!");
    localStorage.setItem("player", name);
    window.location.href = "dashboard.html";
  });
}

// DASHBOARD PAGE
document.addEventListener("DOMContentLoaded", () => {
  const playerName = localStorage.getItem("player");
  if (playerName) {
    const playerEl = document.getElementById("player");
    if (playerEl) playerEl.innerText = playerName;
  }

  loadAll();

  // Tab switching
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const tabId = btn.dataset.tab;
      document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      document.getElementById(tabId).classList.add("active");
      btn.classList.add("active");
    });
  });

  // Save buttons
  document.querySelectorAll(".save-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const type = btn.dataset.save;
      if(type === "batting") saveBatting();
      else if(type === "bowling") saveBowling();
      else if(type === "fielding") saveFielding();
    });
  });
});

// SAVE / LOAD FUNCTIONS
function saveBatting() {
  const data = {};
  const fields = [
    "matches",
    "innings",
    "runs",
    "balls_faced",
    "fours",
    "sixes",
    "dismissals",
    "sr",
    "avg",
    "balls_per_boundary",
    "highest_score",
    "50s",
    "100s",
    "duck",
    "not_outs"
  ];

  fields.forEach(k => {
    const el = document.getElementById("bat_" + k);
    if (!el) {
      console.log("Missing field: bat_" + k);
      return;
    }
    data[k] = el.value;
  });

  localStorage.setItem("batting", JSON.stringify(data));
  console.log("Saved batting:", data);
  alert("Batting saved!");
}


function saveBowling() {
  const data = {};
  ["matches","innings","overs","balls","runs","wickets"].forEach(k => {
    const el = document.getElementById("bowl_"+k);
    data[k] = parseFloat(el.value)||0;
  });
  localStorage.setItem("bowling", JSON.stringify(data));
  alert("Bowling saved!");
}

function saveFielding() {
  const data = {};
  ["matches","catches","runouts"].forEach(k => {
    const el = document.getElementById("field_"+k);
    data[k] = parseFloat(el.value)||0;
  });
  localStorage.setItem("fielding", JSON.stringify(data));
  alert("Fielding saved!");
}

function loadAll() {
  const batting = JSON.parse(localStorage.getItem("batting") || "{}");
Object.keys(batting).forEach(k => {
  const el = document.getElementById("bat_" + k);
  if (el) el.value = batting[k];
});

  const bowling = JSON.parse(localStorage.getItem("bowling")||"{}");
  Object.keys(bowling).forEach(k => {
    const el = document.getElementById("bowl_"+k);
    if(el) el.value = bowling[k];
  });

  const fielding = JSON.parse(localStorage.getItem("fielding")||"{}");
  Object.keys(fielding).forEach(k => {
    const el = document.getElementById("field_"+k);
    if(el) el.value = fielding[k];
  });
}


