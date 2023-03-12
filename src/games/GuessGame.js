import { useEffect, useState } from "react";

function GuessGame() {

    let [num, setNum] = useState("");
    let [response, setResponse] = useState("");
    let [attempt, setAttempt] = useState(0);

    useEffect(() => {
        let url = `http://localhost:8080/game/start`;
        let param = { method: "GET" };
        fetch(url, param)
        .then(data => data.json())
        .then(json => {
            console.log(json);
        })
        .catch(err => console.log(err));
    },[]);

    const guessNumber = (event) => {
        let id = 1;
        let url = `http://localhost:8080/game/guess/${num}/${id}`;
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            setResponse(data.message);
            setAttempt(attempt => attempt + 1);
        })
        .catch((error) => {
            console.error(error);
        });
            
    }

    return ( 
        <div>
            <h1>Guess Game</h1>
            <div className="form-group">
                <label>Pick Your Guess !</label>
                <input type="number" className="form-control" value={num} onChange={(event) => setNum(event.target.value)} placeholder="Enter number"/>
                <input type="button" className="btn btn-primary mt-2" onClick={guessNumber} value="Guess" />
            </div>
            {response && <p>{response}</p>}
            <p>Number of Attempt: {attempt}</p>
        </div>
        
     );
}

export default GuessGame;