const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Your token
const tempToken = 'eba2d0c2-37a8-458e-856d-31403a781c87';

// Output directory
const outputDir = path.join(__dirname, 'playerData');

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Function to fetch data for a single playerId
async function fetchData(playerId) {
  try {
    const response = await axios.get(`https://project.trumedianetworks.com/api/mlb/player/${playerId}`, {
      headers: {
        'tempToken': tempToken
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch data for playerId ${playerId}: ${error.message}`);
    return null;
  }
}

// Function to fetch data for all playerIds
async function fetchAllData() {
  try {
    const players = JSON.parse(fs.readFileSync(path.join(__dirname, 'players.json'), 'utf8'));
    await Promise.all(players.map(async (player) => {
      const data = await fetchData(player.playerId);
      if (data) {
        const fileName = `player_${player.playerId}.json`;
        const filePath = path.join(outputDir, fileName);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        console.log(`Data for playerId ${player.playerId} saved to ${fileName}`);
      }
    }));
  } catch (error) {
    console.error(`Failed to fetch playerIds from players.json: ${error.message}`);
  }
}

// Call fetchAllData to start fetching data for all playerIds
fetchAllData();
