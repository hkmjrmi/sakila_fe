import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function FilmDetails(props){
  let [film, setFilm] = useState({ actors: []});
  let {id} = useParams();
  
  if(id == null)
    id = props.filmId
  
  useEffect(() => {
    let url = `http://localhost:8080/films/search/`+id;
    let param = { method: "GET" };
    fetch(url, param)
    .then(data => data.json())
    .then(json => {
        console.log(json);
        setFilm(json)
    })
    .catch(err => console.log(err));
  },[]);

  return (
    <div>
        <Card sx= {{ minWidth: 275 }}>
          <CardContent>
              <h4>TITLE : {film.title}</h4>
              <h4>DESCRIPTION : {film.description}</h4>
              <h4>CAST LIST : </h4>
              <ul>{ film.actors.map((actor) => (
                  <li key={actor.actor_id}>{actor.first_name} {actor.last_name}</li>
                ))}</ul>
          </CardContent>
      </Card>
    </div>
  );
}

export default FilmDetails;
