import { useEffect, useState } from "react";
import FilmDetails from "./FilmDetails";


function FilmList() {

    let [films, setFilms] = useState([]);
    let [filmId, setFilmId] = useState(1);

    useEffect(()=> {
        console.log("useEffect() called !");
        let url = 'http://localhost:8080/films';
        let param = { method: 'GET'};
        fetch(url, param).then((data)=> {
            return data.json();
        }).then((json)=> {
            console.log(json);
            setFilms(json);
        }).catch((err)=> {
            console.log(err);
        });
    }, []);

    const doClick = (filmId) => {
        setFilmId(filmId);
        console.log("doClick called");
    }
    return (
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-4" id="search-list">
                    <h1>Film List</h1>
                    <table className="table table-bordered table-striped text-decoration-none">
                        <thead>
                            <tr>
                                <th>NO</th>
                                <th>TITLE</th>
                            </tr>
                        </thead>
                        <tbody>
                            { films.map((film,index)=> (
                                <tr key={film.filmId}>
                                    <td>{index + 1}</td>
                                    <td className>< a href="#" onClick={() => doClick(film.filmId)}>{film.title}</a></td>
                                </tr> 
                            ))}
                        </tbody>
                    </table>
                    </div>
                    <div className="col-md-8">
                        <div className="container">
                        <h1>Details</h1>
                        <FilmDetails filmId={filmId} key={filmId}/> 
                        </div>
                    </div>
                </div>
            
           </div>
        </div>
      );
}

export default FilmList;