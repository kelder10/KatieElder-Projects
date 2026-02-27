/* Katie Elder, 12/13/2024 */
let vampireHP = 100;
let slayerHP = 90;
let isVampireTurn = true;
const vampireAttackPower = 10;
const slayerAttackPower = 12;
let vampireDefense = 0; 
let slayerDefense = 0; 

function updateStats() {
    document.getElementById('vampire-hp').innerText = vampireHP;
    document.getElementById('slayer-hp').innerText = slayerHP;
    document.getElementById('turn').innerText = isVampireTurn ? 
        "It's the Vampire's Turn" : "It's the Vampire Slayer's Turn";
    toggleButtons();
}

function toggleButtons() {
    const vampireButtons = document.querySelectorAll('#vampire-stats button');
    const slayerButtons = document.querySelectorAll('#slayer-stats button');
    vampireButtons.forEach(button => { button.disabled = !isVampireTurn; });
    slayerButtons.forEach(button => { button.disabled = isVampireTurn; });
}

function playerAction(player, action) 
{
    let message = '';
    let damage = 0;

    if (player === 'vampire') {
        if (action === 'attack') {
            damage = vampireAttackPower; // Full damage when attacking
            
            if (slayerDefense > 0) {
            damage = Math.max(damage - slayerDefense, 0); // Apply Slayer's defense if they defended last turn 
            }
        
            slayerHP -= damage; // Deduct health
            message = `Vampire attacks! Damage dealt: ${damage}`;
            vampireDefense = 0; // Reset defense after action

        } else if (action === 'defend') {
            vampireDefense = 7; // Set defense for the next turn
            message = "Vampire is defending! Next attack will be reduced.";

        } else if (action === 'heal') {
            vampireHP += 10;
            message = "Vampire heals! HP Increased by 10";

        } else if (action === 'run away') {
            message = "Vampire Ran Away! Slayer Wins!! Game Over";
        }    
            
    } else if (player === 'slayer') {
        if (action === 'attack') {
        damage = slayerAttackPower; // Full damage when attacking

        if (vampireDefense > 0) {
            damage = Math.max(damage - vampireDefense, 0); // Apply Vampire's defense if they defended last turn
        }
            vampireHP -= damage; // Deduct health
            message = `Slayer attacks! Damage dealt: ${damage}`;
            slayerDefense = 0; // Reset defense after action

        } else if (action === 'defend') {
            slayerDefense = 5; // Set defense for the next turn
            message = "Slayer is defending! Next attack will be reduced.";

        } else if (action === 'magic') {
            const magicDamage = 15;
            vampireHP -= magicDamage; 
            message = "Slayer uses Holy Water! Damage dealt: " + magicDamage;

        } else if (action === 'heal') {
            slayerHP += 10;
            message = "Slayer heals! HP Increased by 10";

        } else if (action === 'run away') {
            message = "Slayer Ran Away! Vampire Wins!! Game Over";
        }           
    }
    
    isVampireTurn = !isVampireTurn; // Switch turns
    updateStats(); // Update the displayed stats
    document.getElementById('message').innerText = message; // Show action message

    // Check for game over conditions
    if (vampireHP <= 0) {
        document.getElementById('message').innerText = "Vampire has been defeated! Slayer Wins!! Game Over";
        disableAllButtons();
    } else if (slayerHP <= 0) {
        document.getElementById('message').innerText = "Vampire Slayer has been defeated! Vampire Wins!! Game Over";
        disableAllButtons(); 
    }
}

function disableAllButtons() {
const allButtons = document.querySelectorAll('button');
allButtons.forEach(button => { button.disabled = true; }); }      

// Initialize the game
updateStats()