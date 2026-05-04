// script.js

async function fetchData() {
    try {
        const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }

        const data = await response.json();
        
        // 1. Handle Image
        const pokemonSprite = data.sprites.front_default;
        document.getElementById("pokemonSprite").src = pokemonSprite;

        // 2. Handle Name
        document.getElementById("displayName").innerText = data.name;

        // 3. Handle Types
        const types = data.types.map(t => t.type.name).join(", ");
        document.getElementById("pokemonType").innerText = types;

        // 4. Handle Weight
        const weightInKg = data.weight / 10;
        document.getElementById("pokemonWeight").innerText = `${weightInKg} kg`;

        // 5. Handle Base Stats
        const hpStat = data.stats.find(stat => stat.stat.name === "hp").base_stat;
        const attackStat = data.stats.find(stat => stat.stat.name === "attack").base_stat;
        const defenseStat = data.stats.find(stat => stat.stat.name === "defense").base_stat;

        document.getElementById("pokemonHp").innerText = hpStat;
        document.getElementById("pokemonAttack").innerText = attackStat;
        document.getElementById("pokemonDefense").innerText = defenseStat;

        // 6. Reveal the entire wrapper (Image + Stats) as a Flex container
        document.getElementById("contentWrapper").style.display = "flex";
        
    } catch (error) {
        console.error(error);
        alert("Pokémon not found! Check your spelling and try again.");
        
        // Hide the main wrapper if a search fails
        document.getElementById("contentWrapper").style.display = "none";
    }
}

// Enter key listener
document.getElementById("pokemonName").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        fetchData();
    }
});