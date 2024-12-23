import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

const App = () => {
  const [season, setSeason] = useState("2010");
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [gameDetails, setGameDetails] = useState({});
  const [showPlayers, setShowPlayers] = useState({});

  const seasonsOptions = Array.from({ length: 14 }, (_, i) => ({
    value: (2010 + i).toString(),
    label: (2010 + i).toString(),
  }));

  const loadGamesData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/games", {
        params: { season },
      });
      setGames(response.data);
    } catch (error) {
      console.error("Erro ao carregar dados dos jogos:", error);
      alert("Erro ao carregar dados dos jogos: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const loadGameDetails = async (fixtureId) => {
    try {
      const response = await axios.get(`http://localhost:5000/games/${fixtureId}`);
      console.log("Detalhes do Jogo:", response.data);
      setGameDetails((prevDetails) => ({
        ...prevDetails,
        [fixtureId]: response.data,
      }));
      setShowPlayers((prevShowPlayers) => ({
        ...prevShowPlayers,
        [fixtureId]: prevShowPlayers[fixtureId] || false,
      }));
    } catch (error) {
      console.error("Erro ao carregar detalhes do jogo:", error);
      alert("Erro ao carregar detalhes do jogo: " + error.message);
    }
  };

  const toggleDetails = (fixtureId) => {
    if (selectedGameId === fixtureId) {
      setSelectedGameId(null); 
    } else {
      setSelectedGameId(fixtureId);
      if (!gameDetails[fixtureId]) {
        loadGameDetails(fixtureId);
      }
    }
  };

  const togglePlayers = (fixtureId) => {
    if (!gameDetails[fixtureId]) {
      loadGameDetails(fixtureId).then(() => {
        setShowPlayers((prevShowPlayers) => ({
          ...prevShowPlayers,
          [fixtureId]: true,
        }));
      });
    } else {
      setShowPlayers((prevShowPlayers) => ({
        ...prevShowPlayers,
        [fixtureId]: !prevShowPlayers[fixtureId],
      }));
    }
  };

  useEffect(() => {
    loadGamesData();
  }, [season]);

  return (
    <div>
      <h1>Estatísticas da Liga</h1>
      <Select
        options={seasonsOptions}
        value={seasonsOptions.find(option => option.value === season)}
        onChange={(selected) => setSeason(selected.value)}
      />

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div>
          <h2>Desempenho dos Times</h2>
          {games.length > 0 ? games.map(game => (
            <div key={game.fixture_id} style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>
              <h4>{game.home_team} vs {game.away_team}</h4>
              <p>Data: {new Date(game.date).toLocaleDateString()}</p>
              <p>Estádio: {game.venue}</p>
              <p>Placar: {game.home_score} - {game.away_score}</p>
              <p>Árbitro: {game.referee || "Não informado"}</p>
              <button onClick={() => toggleDetails(game.fixture_id)}>
                {selectedGameId === game.fixture_id && gameDetails[game.fixture_id] ? "Ocultar Detalhes" : "Ver Detalhes"}
              </button>
              <button onClick={() => togglePlayers(game.fixture_id)}>
                {showPlayers[game.fixture_id] ? "Ocultar Jogadores" : "Ver Jogadores"}
              </button>

              {selectedGameId === game.fixture_id && gameDetails[game.fixture_id] && (
                <div style={{ marginTop: "10px", borderTop: "1px solid #ddd", paddingTop: "10px" }}>
                  <h3>Detalhes da Partida</h3>
                  <p><strong>Partida:</strong> {gameDetails[game.fixture_id].home_team} vs {gameDetails[game.fixture_id].away_team}</p>
                  <p><strong>Data:</strong> {new Date(gameDetails[game.fixture_id].date).toLocaleDateString()}</p>
                  <p><strong>Estádio:</strong> {gameDetails[game.fixture_id].venue}</p>
                  <p><strong>Árbitro:</strong> {gameDetails[game.fixture_id].referee || "Não informado"}</p>
                  
                  <h4>Eventos:</h4>
                  {Array.isArray(gameDetails[game.fixture_id].events) && gameDetails[game.fixture_id].events.length > 0 ? (
                    <ul>
                      {gameDetails[game.fixture_id].events.map((event, index) => (
                        <li key={index}>
                          {event.type} - {event.player_name} ({event.team_name}) - {event.detail}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>Sem eventos registrados para esta partida.</p>
                  )}

                  {showPlayers[game.fixture_id] && (
                    <div>
                      <h4>Jogadores do {gameDetails[game.fixture_id].home_team}:</h4>
                      {gameDetails[game.fixture_id].players && gameDetails[game.fixture_id].players[gameDetails[game.fixture_id].home_team]?.length ? (
                        gameDetails[game.fixture_id].players[gameDetails[game.fixture_id].home_team].map((player, index) => (
                          <p key={index}>{player}</p> 
                        ))
                      ) : (
                        <p>Nenhum jogador encontrado.</p>
                      )}
                      
                      <h4>Jogadores do {gameDetails[game.fixture_id].away_team}:</h4>
                      {gameDetails[game.fixture_id].players && gameDetails[game.fixture_id].players[gameDetails[game.fixture_id].away_team]?.length ? (
                        gameDetails[game.fixture_id].players[gameDetails[game.fixture_id].away_team].map((player, index) => (
                          <p key={index}>{player}</p> 
                        ))
                      ) : (
                        <p>Nenhum jogador encontrado.</p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )) : (
            <p>Nenhuma partida encontrada para esta temporada.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
