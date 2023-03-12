import { useRef, useState } from "react";

function InvestmentCalculator() {
    const year = useRef();
    const invest = useRef();
    const profit= useRef();
    const [result, setResult] = useState();
    let [isShow, setIsShow] = useState(false);

    function doSave() {
        let url = 'http://localhost:8080/investment/calculator?year=' + year.current.value + '&investment='+invest.current.value +'&profit=' + profit.current.value;

        let param = {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json'},
        };
        fetch(url, param)
        .then(data => data.json())
        .then(json => {
            console.log(json);
            setResult(json);
            setIsShow(true);
        });
    }

    function showResult(){
        return(
            <table>
                <thead>
                    <tr>
                        <td>year</td>
                        <td>Amount</td>
                        <td>Profit</td>
                    </tr>
                </thead>
                <tbody>
                    {result.map((investment, index) => (
                        <tr key={index}>
                            <td>{investment.year}</td>
                            <td>{investment.invest}</td>
                            <td>{investment.profit}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }


    return (

        <div>
            Duration(years) : <input type="text" ref={year}/>
            <br/>
            Investment (RM): <input type="text" ref={invest}/>
            <br/>
            Profit(%) : <input type="text" ref={profit}/>
            <br/>
            <button onClick={doSave}>Generate</button>
            <hr/>
            { isShow && showResult()}
        </div>

    );
}

export default InvestmentCalculator;