import { useState } from "react";
import FilmDetails from './FilmDetails';
import FilmEdit from "./FilmEdit";
import {HiPencilSquare} from "react-icons/hi2"

function FilmSearch() {
    let [title, setTitle] = useState('');
    let [show, setShow] = useState(false);
    let [films, setFilms] = useState([]);
    let [filmId, setFilmId] = useState(1);
    let [isClicked, setIsClicked] = useState(false);
    let [showEdit, setShowEdit] = useState(false);

    let doSearch = (event) => {
        setIsClicked(false);
        console.log(event.target.value);
        let newTitle = event.target.value;
        setTitle(newTitle);

        if (newTitle.length > 2) {
            setShow(true);
            // go and fetch data
            let url = 'http://localhost:8080/films/search?title=' + newTitle;
            let param = { method : 'GET' };
            fetch(url, param)
            .then(data => data.json())
            .then(json => setFilms(json));
        } else
            setShow(false);
    }

    const myTable = () => {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {films.map((film, no) => (
                    <tr key={film.filmId}>
                        <td>{ no + 1 }</td>
                        <td><a onClick={ () => { setFilmId(film.filmId); setIsClicked(true); }} href="##">{ film.title }</a></td>
                        <td>{ film.description }</td>
                        <td>
                            <button 
                            onClick={() => {setShowEdit(true); setFilmId(film.filmId)}}
                            className="btn btn-warning btn-sm"><HiPencilSquare/></button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-8">
                    <h2>Film Search</h2>
                    <input type="text" className="form-control" placeholder="search film title..." onChange={ doSearch } />
                    { show && myTable() }
                    { showEdit && <FilmEdit isShow={showEdit} 
                    filmId={filmId} key={filmId} /> }
                </div>

                <div className="col-md-4">
                    { isClicked && <FilmDetails filmId={ filmId } key={ filmId } /> }
                </div>
            </div>
        </div>
    );
}

export default FilmSearch;