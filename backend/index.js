const express = require("express");
const cors = require("cors");
const db = require("./db"); 

const app = express();
app.use(cors());

app.get("/games", (req, res) => {
  const { season } = req.query;

  if (!season) {
    return res.status(400).send("Ano da temporada não fornecido");
  }

  db.query(`
    SELECT 
      p.id AS fixture_id,
      p.data AS date,
      p.estadio AS venue,
      p.placar_casa AS home_score,
      p.placar_visitante AS away_score,
      p.arbitro AS referee,
      tc.nome AS home_team,
      tv.nome AS away_team
    FROM 
      partidas p
    JOIN 
      times tc ON p.time_casa_id = tc.id
    JOIN 
      times tv ON p.time_visitante_id = tv.id
    WHERE 
      YEAR(p.data) = ?;
  `, [season], (error, results) => {
    if (error) {
      console.error("Erro ao consultar o banco de dados para os jogos:", error);
      return res.status(500).json({ message: "Erro ao consultar o banco de dados para os jogos", error });
    }

    console.log("Resultados da consulta (games):", results);
    res.json(results);
  });
});

app.get("/games/:fixtureId", (req, res) => {
  const { fixtureId } = req.params;

  console.log("Requisição recebida para fixtureId:", fixtureId);

  if (isNaN(fixtureId)) {
    console.warn("fixtureId não é um número:", fixtureId);
    return res.status(400).json({ message: "ID da partida inválido" });
  }

  db.query(`
    SELECT 
      p.id AS fixture_id,
      p.data AS date,
      p.estadio AS venue,
      p.placar_casa AS home_score,
      p.placar_visitante AS away_score,
      p.arbitro AS referee,
      tc.nome AS home_team,
      tv.nome AS away_team
    FROM 
      partidas p
    JOIN 
      times tc ON p.time_casa_id = tc.id
    JOIN 
      times tv ON p.time_visitante_id = tv.id
    WHERE 
      p.id = ?;
  `, [fixtureId], (error, results) => {
    if (error) {
      console.error("Erro ao consultar o banco de dados para os detalhes da partida:", error);
      return res.status(500).json({ message: "Erro ao consultar o banco de dados para os detalhes da partida", error });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Partida não encontrada" });
    }

    const gameDetails = results[0];

    db.query(`
      SELECT 
        e.tipo_evento AS type,
        e.detalhe AS detail,
        j.nome AS player_name,
        t.nome AS team_name
      FROM 
        eventospartida e
      JOIN 
        jogadores j ON e.jogador_id = j.id
      JOIN 
        times t ON j.time_id = t.id
      WHERE 
        e.partida_id = ?;
    `, [fixtureId], (error, eventResults) => {
      if (error) {
        console.error("Erro ao consultar eventos da partida:", error);
        return res.status(500).json({ message: "Erro ao consultar eventos da partida", error });
      }

      db.query(`
        SELECT 
          j.nome AS player_name,
          t.nome AS team_name
        FROM 
          jogadores j
        JOIN 
          times t ON j.time_id = t.id
        WHERE 
          j.time_id IN (
            SELECT time_casa_id FROM partidas WHERE id = ?
            UNION
            SELECT time_visitante_id FROM partidas WHERE id = ?
          );
      `, [fixtureId, fixtureId], (error, playerResults) => {
        if (error) {
          console.error("Erro ao consultar jogadores da partida:", error);
          return res.status(500).json({ message: "Erro ao consultar jogadores da partida", error });
        }

        const playersByTeam = playerResults.reduce((acc, player) => {
          if (!acc[player.team_name]) {
            acc[player.team_name] = [];
          }
          acc[player.team_name].push(player.player_name);
          return acc;
        }, {});

        const response = { ...gameDetails, events: eventResults, players: playersByTeam };
        console.log("Resultados da consulta (detalhes da partida):", response);
        res.json(response);
      });
    });
  });
}); 

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
