// src/services/openaiService.js
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.generateMatchReport = async (matchData) => {
  try {
    const prompt = `Generate a detailed pickleball match report for the following match:
    Player 1: ${matchData.player1.name}
    Player 2: ${matchData.player2.name}
    Score: ${matchData.score}
    Winner: ${matchData.winner_id === matchData.player1.id ? matchData.player1.name : matchData.player2.name}

    Please include:
    1. A summary of the match
    2. Key moments or turning points
    3. Strengths and weaknesses of each player
    4. Suggestions for improvement for both players`;

    const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: prompt,
      max_tokens: 500,
      n: 1,
      stop: null,
      temperature: 0.7,
    });

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error generating match report:', error);
    throw error;
  }
};