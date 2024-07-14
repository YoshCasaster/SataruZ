document.addEventListener("DOMContentLoaded", () => { 
    loadRankings();
    document.querySelector("#search-leaderboard").addEventListener("keyup", filterRankings);
});

const rankingsBody = document.querySelector("#rankings > tbody");

function loadRankings() {
    const request = new XMLHttpRequest();
    request.open("GET", "data.json");
    request.onload = () => {
        try {
            const json = JSON.parse(request.responseText);
            populateRankings(json);
        } catch (e) {
            console.warn("Could not load Player Rankings! :(", e);
        }
    };
    request.send();
}

function populateRankings(json) {
    json.forEach((row, index) => {
        const tr = document.createElement("tr");

        // Rank
        const rankTd = document.createElement("td");
        rankTd.textContent = index + 1;
        tr.appendChild(rankTd);

        // Image
        const imgTd = document.createElement("td");
        const img = document.createElement("img");
        img.src = row.image;
        img.alt = row.team;
        imgTd.appendChild(img);
        tr.appendChild(imgTd);

        // Team
        const teamTd = document.createElement("td");
        teamTd.textContent = row.team;
        tr.appendChild(teamTd);

        // Wins
        const winsTd = document.createElement("td");
        winsTd.textContent = row.wins;
        tr.appendChild(winsTd);

        rankingsBody.appendChild(tr);
    });
}

function filterRankings() {
    const value = this.value.toLowerCase();
    document.querySelectorAll("table tbody tr").forEach((row, index) => {
        if (index === 0) return;
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(value) ? "" : "none";
    });
}

