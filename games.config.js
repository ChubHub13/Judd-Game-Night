/* Game Night catalog — replace the existing games.config.js with this file. */
window.JUDD_GAMES = [
  {
    id: "five-crowns",
    title: "Five Crowns",
    subtitle: "Three-handed card game",
    path: "https://five-crowns-7h0l.onrender.com/",
    icon: "crowns",
    enabled: true
  },
  {
    id: "three-handed-rook",
    title: "Three-Handed Rook",
    subtitle: "Three-handed trick-taking",
    path: "https://chubhub13-rook-table.onrender.com/#",
    icon: "rook",
    enabled: true
  },
  {
    id: "qwixx",
    title: "Qwixx",
    subtitle: "Three-handed dice game",
    path: "https://chubhub13.github.io/Qwixx/",
    icon: "qwixx",
    enabled: true
  }
];

window.addEventListener("DOMContentLoaded", () => {
  const css = `
    .game-art .rook-art{display:flex;gap:6px;align-items:center;justify-content:center}
    .game-art .rook-card{position:relative;width:40px;height:63px;border:2px solid currentColor;border-radius:7px;background:#fffdf7;box-shadow:2px 3px 0 #0004;color:#25232a;font:900 12px Georgia}
    .game-art .rook-card span{position:absolute;top:5px;left:6px}.game-art .rook-card.r{color:#c93832}.game-art .rook-card.y{color:#d4a217}.game-art .rook-card.g{color:#24804f}.game-art .rook-card.b{color:#287ac1}
    .game-art .qwixx-art{display:flex;flex-wrap:wrap;gap:7px;justify-content:center;width:152px}.game-art .qwixx-die{display:grid;grid-template:repeat(3,7px)/repeat(3,7px);gap:5px;place-content:center;width:42px;height:42px;border:2px solid #fff9;border-radius:10px;box-shadow:2px 4px 0 #0004}.game-art .qwixx-die i{width:7px;height:7px;border-radius:50%;background:currentColor}.game-art .qwixx-die.white{background:#faf7ed;color:#1e2230}.game-art .qwixx-die.red{background:#d95057;color:#fff}.game-art .qwixx-die.yellow{background:#efd52f;color:#20202a}.game-art .qwixx-die.green{background:#1bae74;color:#fff}.game-art .qwixx-die.blue{background:#277dcc;color:#fff}`;
  document.head.insertAdjacentHTML("beforeend", `<style>${css}</style>`);
  const pip = (number, color) => { const spots=[[1,1],[1,3],[2,2],[3,1],[3,3],[1,2]]; return `<b class="qwixx-die ${color}">${spots.slice(0,number).map(([r,c])=>`<i style="grid-area:${r}/${c}"></i>`).join("")}</b>`; };
  document.querySelectorAll(".game").forEach(card => {
    const title = card.querySelector("h3")?.textContent;
    const art = card.querySelector(".game-art"); if (!art) return;
    if (title === "Three-Handed Rook") art.innerHTML = `<div class="rook-art"><b class="rook-card r"><span>1</span></b><b class="rook-card y"><span>5</span></b><b class="rook-card g"><span>10</span></b><b class="rook-card b"><span>14</span></b></div>`;
    if (title === "Qwixx") art.innerHTML = `<div class="qwixx-art">${pip(3,"white")}${pip(4,"white")}${pip(1,"red")}${pip(1,"yellow")}${pip(5,"green")}${pip(6,"blue")}</div>`;
  });
});

window.addEventListener("DOMContentLoaded", () => {
  document.head.insertAdjacentHTML("beforeend", `<style>
    .game-art .rook-fan{position:relative;width:176px;height:112px}
    .game-art .rook-fan b{position:absolute;bottom:3px;width:53px;height:82px;padding:6px;border:3px solid currentColor;border-radius:8px;background:linear-gradient(145deg,#fffef9,#e8dfc9);box-shadow:3px 5px 0 #0005;color:#25282b;font:900 12px Georgia}
    .game-art .rook-fan b:after{content:"";position:absolute;inset:4px;border:1px solid currentColor;border-radius:4px;opacity:.65}.game-art .rook-fan span{position:relative;z-index:1}.game-art .rook-fan .r{left:13px;color:#c93832;transform:rotate(-12deg)}.game-art .rook-fan .k{left:42px;color:#24282b;transform:rotate(-6deg)}.game-art .rook-fan .y{left:72px;color:#d9a71e;transform:rotate(-1deg)}.game-art .rook-fan .g{left:102px;color:#24804f;transform:rotate(5deg)}.game-art .rook-fan .last{left:126px;color:#24282b;transform:rotate(10deg);font-size:23px}.game-art .rook-fan .last small{position:absolute;z-index:1;bottom:10px;left:9px;font:900 8px Arial;letter-spacing:.06em}
  </style>`);
  document.querySelectorAll(".game").forEach(card => { if(card.querySelector("h3")?.textContent === "Three-Handed Rook") card.querySelector(".game-art").innerHTML = `<div class="rook-fan"><b class="r"><span>12</span></b><b class="k"><span>R</span></b><b class="y"><span>1</span></b><b class="g"><span>14</span></b><b class="last"><span>14</span><small>BLACK</small></b></div>`; });
});
