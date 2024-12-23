import React, { useState } from "react";
import axios from "axios";

const GameDetails = ({ fixtureId }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/games/${fixtureId}`);
      setDetails(response.data);
    } catch (error) {
      console.error("Erro ao carregar detalhes do jogo:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadDetails();
  }, [fixtureId]);

  if (loading) return <p>Carregando...</p>;

  return details ? (
    <div>
      <h3>Detalhes da Partida</h3>
      {details.events.map(event => (
        <p key={event.id}>
          {event.type}: {event.detail} - {event.player_name}
        </p>
      ))}
      <h3>Jogadores</h3>
      {details.players.map(player => (
        <p key={player.id}>
          {player.name} - Gols: {player.goals} Assistências: {player.assists}
        </p>
      ))}
    </div>
  ) : <p>Sem detalhes disponíveis.</p>;
};

export default GameDetails;
