const fs = require('fs');

console.log("Removing the build directory...");

const path = './chrome-build';
if (fs.existsSync(path)) {
    fs.rmSync(path, { recursive: true, force: true });
    console.log("Directory removed!");
} else {
    console.log("Directory not found!");
}
