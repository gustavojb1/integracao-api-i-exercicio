import React, { useEffect, useState } from "react";
import {
  Botao,
  ContainerInputs,
  ContainerMusicas,
  InputMusica,
  Musica,
} from "./styled";
import axios from "axios";

const musicasLocal = [
  {
    artist: "Artista 1",
    id: "1",
    name: "Musica1",
    url: "http://spoti4.future4.com.br/1.mp3",
  },
  {
    artist: "Artista 2",
    id: "2",
    name: "Musica2",
    url: "http://spoti4.future4.com.br/2.mp3",
  },
  {
    artist: "Artista 3",
    id: "3",
    name: "Musica3",
    url: "http://spoti4.future4.com.br/3.mp3",
  },
];

export default function Musicas(props) {
  const [musicas, setMusicas] = useState(null);
  const [artista, setArtista] = useState("");
  const [music, setMusic] = useState("");
  const [url, setUrl] = useState("");

  const pegarMusicas = () => {
    axios
      .get(
        `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`,
        { headers: { Authorization: "gustavo-barbosa-ammal" } }
      )
      .then((response) => {
        setMusicas(response.data.result.tracks);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    pegarMusicas();
  }, []);

  const add = () => {
    axios
      .post(
        `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`,
        {
          name: music,
          artist: artista,
          url: url,
        },
        { headers: { Authorization: "gustavo-barbosa-ammal" } }
      )
      .then((response) => {
        pegarMusicas();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const del = (musicaId) => {
    axios
      .delete(
        `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks/${musicaId}`,
        { headers: { Authorization: "gustavo-barbosa-ammal" } }
      )
      .then((response) => {
        pegarMusicas();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ContainerMusicas>
      <h2>{props.playlist.name}</h2>
      {musicas &&
        musicas.map((musica) => {
          return (
            <Musica key={musica.id}>
              <h3>
                {musica.name} - {musica.artist}
              </h3>
              <audio src={musica.url} controls />
              <button onClick={()=>(del(musica.id))}>X</button>
            </Musica>
          );
        })}
      <ContainerInputs>
        <InputMusica
          placeholder="artista"
          value={artista}
          onChange={({ target }) => {
            setArtista(target.value);
          }}
        />
        <InputMusica
          placeholder="musica"
          value={music}
          onChange={({ target }) => {
            setMusic(target.value);
          }}
        />
        <InputMusica
          placeholder="url"
          value={url}
          onChange={({ target }) => {
            setUrl(target.value);
          }}
        />
        <Botao onClick={add}>Adicionar musica</Botao>
      </ContainerInputs>
    </ContainerMusicas>
  );
}
