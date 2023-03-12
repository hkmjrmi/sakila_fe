import { useEffect, useState } from "react";

function ActorList() {
    const [actors, setActors] = useState([]);
    useEffect(() =>  {

        let url = 'http://localhost:8080/actors';
        let param = { method: 'GET'};
        fetch(url, param).then((data)=> {
            return data.json();
            }).then((json)=> {
                console.log(json);
                setActors(json);
            }).catch((err)=> {
                console.log(err);
            });
    }, []);

    return (
        <div>
           <div className="container">
           <h1>Actor List</h1>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>NO</th>
                        <th>FIRST NAME</th>
                        <th>LAST NAME</th>
                    </tr>
                </thead>
                <tbody>
                    { actors.map((actor,index)=> (
                        <tr key={actor.actorId}>
                            <td>{index + 1}</td>
                            <td>{actor.first_name}</td>
                            <td>{actor.last_name}</td>
                        </tr> 
                    ))}
                </tbody>
            </table>
           </div>
        </div>
      );
}

export default ActorList;