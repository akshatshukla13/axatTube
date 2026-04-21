const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execPromise = promisify(exec);

const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m'
};

function log(color, text) {
    console.log(`${color}${text}${colors.reset}`);
}

async function checkFile(filePath, description) {
    try {
        if (fs.existsSync(filePath)) {
            log(colors.green, `✓ ${description}`);
            return true;
        } else {
            log(colors.red, `✗ ${description} - File not found: ${filePath}`);
            return false;
        }
    } catch (error) {
        log(colors.red, `✗ ${description} - Error: ${error.message}`);
        return false;
    }
}

async function checkCommand(command, description) {
    try {
        await execPromise(command, { stdio: 'ignore' });
        log(colors.green, `✓ ${description}`);
        return true;
    } catch (error) {
        log(colors.red, `✗ ${description}`);
        return false;
    }
}

async function checkDirectory(dirPath, description) {
    try {
        if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
            log(colors.green, `✓ ${description}`);
            return true;
        } else {
            log(colors.red, `✗ ${description} - Directory not found: ${dirPath}`);
            return false;
        }
    } catch (error) {
        log(colors.red, `✗ ${description} - Error: ${error.message}`);
        return false;
    }
}

async function runSetupVerification() {
    console.log('\n');
    log(colors.cyan, '==========================================');
    log(colors.cyan, '   AXATube Local Setup Verification');
    log(colors.cyan, '==========================================\n');

    let passed = 0;
    let total = 0;

    // Check directories
    log(colors.blue, '📁 Checking Directory Structure...');
    total++;
    if (await checkDirectory('./Backend', 'Backend directory exists')) passed++;
    
    total++;
    if (await checkDirectory('./Frontend', 'Frontend directory exists')) passed++;

    console.log();

    // Check configuration files
    log(colors.blue, '⚙️  Checking Configuration Files...');
    total++;
    if (await checkFile('./Backend/.env.local', 'Backend .env.local exists')) passed++;
    
    total++;
    if (await checkFile('./Frontend/.env.local', 'Frontend .env.local exists')) passed++;

    console.log();

    // Check Node modules
    log(colors.blue, '📦 Checking Dependencies...');
    total++;
    if (await checkDirectory('./Backend/node_modules', 'Backend dependencies installed')) {
        passed++;
    } else {
        log(colors.yellow, '   ℹ️  Run: cd Backend && npm install');
    }
    
    total++;
    if (await checkDirectory('./Frontend/node_modules', 'Frontend dependencies installed')) {
        passed++;
    } else {
        log(colors.yellow, '   ℹ️  Run: cd Frontend && npm install');
    }

    console.log();

    // Check system requirements
    log(colors.blue, '🔧 Checking System Requirements...');
    total++;
    if (await checkCommand('node --version', 'Node.js installed')) passed++;
    
    total++;
    if (await checkCommand('npm --version', 'npm installed')) passed++;

    console.log();

    // Check MongoDB
    log(colors.blue, '🗄️  Checking MongoDB...');
    total++;
    if (await checkCommand('mongosh --version', 'MongoDB Shell installed')) {
        passed++;
    } else {
        log(colors.yellow, '   ℹ️  Download from: https://www.mongodb.com/try/download/community');
    }

    // Try to connect to MongoDB
    total++;
    try {
        await execPromise('mongosh --eval "db.version()" --quiet', { timeout: 5000 });
        log(colors.green, '✓ MongoDB is running (localhost:27017)');
        passed++;
    } catch (error) {
        log(colors.yellow, '⚠ MongoDB is not running on localhost:27017');
        log(colors.yellow, '   Start with: mongosh or docker start mongodb');
    }

    console.log();

    // Summary
    log(colors.cyan, '==========================================');
    log(colors.cyan, `   Results: ${passed}/${total} checks passed`);
    log(colors.cyan, '==========================================\n');

    if (passed === total) {
        log(colors.green, '✓ All checks passed! Ready to start development.\n');
        log(colors.cyan, 'Next: Run start-local.bat or read QUICK_START.md\n');
    } else {
        log(colors.yellow, '⚠ Some checks failed. Follow the instructions above.\n');
    }
}

// Run verification
runSetupVerification().catch(error => {
    log(colors.red, `Error during verification: ${error.message}`);
    process.exit(1);
});
