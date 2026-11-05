// Dynamic Projects Data (Sonicjhon1 monorepo structure rewritten for smailk)
const projectsData = [
    { title: "00 Portofolio-UI", commit: "[MISC] Shouldn't change anything", time: "3 years ago", tag: "ui", lang: "HTML/CSS" },
    { title: "01 Redirect-UI", commit: "[HTML] Extend redirect timer", time: "3 years ago", tag: "ui", lang: "JavaScript" },
    { title: "02 Cloudflare-Static-Proxy", commit: "[PNPM] Update all packages", time: "3 years ago", tag: "config", lang: "TypeScript" },
    { title: "03 Genshin-Redeem-Code-UI", commit: "[PNPM] Update all packages", time: "3 years ago", tag: "ui", lang: "React" },
    { title: "03 Genshin-Redeem-Code", commit: "[PNPM] Update all packages", time: "3 years ago", tag: "bot", lang: "Node.js" },
    { title: "04 NachoNekoNyaanime-UI", commit: "[04] Fix not building because of broken CONSUMET API", time: "3 years ago", tag: "ui", lang: "Vue" },
    { title: "05 KanoColle-UI", commit: "[PNPM] Update all packages", time: "3 years ago", tag: "ui", lang: "Svelte" },
    { title: "06 LILIESARK-UI", commit: "[ASSET] Compress Trailer video", time: "4 years ago", tag: "ui", lang: "HTML/JS" },
    { title: "07 BelajarBersama-UI", commit: "[JS] Use cookies instead of localstorage", time: "4 years ago", tag: "ui", lang: "JavaScript" },
    { title: "08 GT-Reminder-UI", commit: "[PNPM] Update all packages", time: "3 years ago", tag: "ui", lang: "React" },
    { title: "08 GT-Reminder", commit: "[PNPM] Update all packages", time: "3 years ago", tag: "bot", lang: "Node.js" },
    { title: "09 SchoolworkList-UI", commit: "[PNPM] Update all packages", time: "3 years ago", tag: "ui", lang: "React" },
    { title: "09 SchoolworkListMDX-UI", commit: "[PNPM] Update all packages", time: "3 years ago", tag: "ui", lang: "Next.js" },
    { title: "10 Portofolio-Astro-UI", commit: "[PNPM] Update all packages", time: "3 years ago", tag: "ui", lang: "Astro" },
    { title: "11 WA-GawrBot-UI", commit: "fix(deps): update tauri monorepo (#369)", time: "3 years ago", tag: "ui", lang: "Tauri" },
    { title: "11 WA-GawrBot", commit: "[PNPM] Update all packages", time: "3 years ago", tag: "bot", lang: "TypeScript" }
];

// Typing Animation
const words = ["Web Apps", "WhatsApp Bots", "Monorepos", "TypeScript Tools"];
let wordIdx = 0;
let charIdx = 0;
let isDeleting = false;
const typingElem = document.getElementById("typing-text");

function typeEffect() {
    const currentWord = words[wordIdx];
    if (isDeleting) {
        typingElem.textContent = currentWord.substring(0, charIdx - 1);
        charIdx--;
    } else {
        typingElem.textContent = currentWord.substring(0, charIdx + 1);
        charIdx++;
    }

    if (!isDeleting && charIdx === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1500);
    } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        setTimeout(typeEffect, 500);
    } else {
        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
}
typeEffect();

// Render Projects Grid
function renderProjects(data) {
    const grid = document.getElementById("projectsGrid");
    grid.innerHTML = "";
    data.forEach(item => {
        const card = document.createElement("div");
        card.className = "project-card";
        card.innerHTML = `
            <div>
                <div class="project-header">
                    <span class="folder-icon">📁</span>
                    <span class="project-title">${item.title}</span>
                </div>
                <div class="commit-msg">${item.commit}</div>
            </div>
            <div class="project-footer">
                <span class="badge">${item.lang}</span>
                <span>${item.time}</span>
            </div>
        `;
        grid.appendChild(card);
    });
}
renderProjects(projectsData);

// Filter Projects
function filterProjects(tag, btn) {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    if (tag === "all") {
        renderProjects(projectsData);
    } else {
        const filtered = projectsData.filter(p => p.tag === tag);
        renderProjects(filtered);
    }
}

// Interactive Terminal
const termInput = document.getElementById("termInput");
const termBody = document.getElementById("termBody");

termInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const cmd = termInput.value.trim().toLowerCase();
        termInput.value = "";
        
        appendTermLine(`smailk@dev-box:~$ ${cmd}`, "var(--accent)");
        
        if (cmd === "help") {
            appendTermLine("Available commands:");
            appendTermLine("  whoami   - Informasi pemilik website");
            appendTermLine("  contact  - Tampilkan kontak Smailk");
            appendTermLine("  projects - Tampilkan statistik proyek");
            appendTermLine("  clear    - Bersihkan layar terminal");
        } else if (cmd === "whoami") {
            appendTermLine("User: smailk | IG: @smailk17 | Email: shohib070@gmail.com");
        } else if (cmd === "contact") {
            appendTermLine("Email: shohib070@gmail.com");
            appendTermLine("Instagram: @smailk17");
        } else if (cmd === "projects") {
            appendTermLine(`Total projects in monorepo: ${projectsData.length}`);
            appendTermLine("Status: All builds passing.");
        } else if (cmd === "clear") {
            termBody.innerHTML = "";
        } else if (cmd === "") {
            // Do nothing
        } else {
            appendTermLine(`Command not found: ${cmd}. Type 'help' for command list.`, "#ef4444");
        }

        termBody.scrollTop = termBody.scrollHeight;
    }
});

function appendTermLine(text, color = "var(--text-main)") {
    const line = document.createElement("div");
    line.className = "term-line";
    line.style.color = color;
    line.textContent = text;
    termBody.appendChild(line);
}

// Canvas Mini Game (Neon Dash)
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let gameRunning = false;
let score = 0;
let player = { x: 50, y: 180, width: 25, height: 25, dy: 0, gravity: 0.8, jumpPower: -12, grounded: false };
let obstacles = [];
let gameLoopId;

function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function startGame() {
    document.getElementById("gameOverlay").style.display = "none";
    gameRunning = true;
    score = 0;
    player.y = 180;
    player.dy = 0;
    obstacles = [];
    if (gameLoopId) cancelAnimationFrame(gameLoopId);
    loop();
}

function gameOver() {
    gameRunning = false;
    document.getElementById("gameOverlayTitle").textContent = "GAME OVER";
    document.getElementById("gameOverlayDesc").textContent = `Skor Akhir Kamu: ${score}`;
    document.getElementById("gameOverlay").style.display = "flex";
}

function jump() {
    if (player.grounded && gameRunning) {
        player.dy = player.jumpPower;
        player.grounded = false;
    }
}

window.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        e.preventDefault();
        jump();
    }
});
canvas.addEventListener("click", jump);

function loop() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update Player
    player.dy += player.gravity;
    player.y += player.dy;

    const floorY = canvas.height - 40;
    if (player.y + player.height >= floorY) {
        player.y = floorY - player.height;
        player.dy = 0;
        player.grounded = true;
    }

    // Draw Player
    ctx.fillStyle = "#38bdf8";
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#38bdf8";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Draw Floor
    ctx.strokeStyle = "#1e2638";
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.moveTo(0, floorY);
    ctx.lineTo(canvas.width, floorY);
    ctx.stroke();

    // Handle Obstacles
    if (Math.random() < 0.015) {
        obstacles.push({ x: canvas.width, width: 15, height: 30 + Math.random() * 20 });
    }

    for (let i = 0; i < obstacles.length; i++) {
        let obs = obstacles[i];
        obs.x -= 6;

        // Draw Obstacle
        ctx.fillStyle = "#ef4444";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#ef4444";
        ctx.fillRect(obs.x, floorY - obs.height, obs.width, obs.height);

        // Collision Check
        if (
            player.x < obs.x + obs.width &&
            player.x + player.width > obs.x &&
            player.y < floorY &&
            player.y + player.height > floorY - obs.height
        ) {
            gameOver();
            return;
        }
    }

    // Filter offscreen obstacles
    obstacles = obstacles.filter(obs => obs.x > -20);

    // Score
    score++;
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#fff";
    ctx.font = "14px 'Fira Code', monospace";
    ctx.fillText(`SCORE: ${score}`, 20, 30);

    gameLoopId = requestAnimationFrame(loop);
}
