// server.js
const { spawn } = require("child_process");
const path = require("path");

// Menjalankan backend
const backend = spawn("npm", ["start"], {
	cwd: path.join(__dirname, "backend"),
});
backend.stdout.on("data", (data) => {
	console.log(`Backend: ${data}`);
});
backend.stderr.on("data", (data) => {
	console.error(`Backend error: ${data}`);
});

// Menjalankan frontend (Next.js)
const frontend = spawn("yarn", ["server:dev"], {
	cwd: path.join(__dirname, "frontend"),
});

frontend.stdout.on("data", (data) => {
	console.log(`Frontend: ${data}`);
});
frontend.stderr.on("data", (data) => {
	console.error(`Frontend error: ${data}`);
});
