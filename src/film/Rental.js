import { useState, useRef } from "react";


function Rental() {
    let [name, setName] = useState('');
    let [show,setShow] = useState(false);
    let [customers, setCustomers] = useState([]);
    let [customerId, setCustomerId] = useState(0);
    let rentalDate = useRef();
    

    const doSearch = (event) => {
        let newName = event.target.value;
        setName(newName);
        if(newName.length >= 3) {
            setShow(true);
            let url = "http://localhost:8080/customers/search?name=" + newName;
            let param = { method: "GET"};
            fetch(url, param).then((data) => {
                return data.json().then();
            }).then((json) => {
                setCustomers(json);
            }).catch((error) => {
            })
            } else {
                setShow(false);
            }
        
    }

    
    const doChoose = (cust) => {
        alert(cust.first_name + " " + cust.last_name);
        setCustomerId(cust.customer_id);
        setName(cust.first_name + " " + cust.last_name);
        setShow(false)
    }

    const doSave = () => {
        let data = { 
            customer_id: customerId, 
            rental_date: rentalDate.current.value, 
            inventory_id:1, 
            staff_id:1, 
            last_update: '2023-03-08'
        }

        let url = "http://localhost:8080/rental/save";
        let param = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }
        fetch(url, param).then((data)=> data.json()).then(json => console.log(json));
    }

    return (
        <div id="rental">
            <div className="card">
                <div className="card-header">Rental Service</div>
                <div className="card-body">
                    <div className="row p-2">
                        <div className="col-md-2">Customer</div>
                        <div className="col-md-4"><input type="text" onChange={doSearch} value={name} className="form-control"/></div>
                        { show && <div>
                            <div className="float-left">
                                <ul className="bg-secondary text-light">
                                    {customers.map((cust) =>(
                                        <li key={cust.customer_id} onClick={()=> doChoose(cust)}>{cust.first_name} {cust.last_name}</li>
                                    ))}
                                </ul>
                            </div>
                            </div>
                        }
                    </div>
                    <div className="row p-2">
                        <div className="col-md-2">Rental Date</div>
                        <div className="col-md-4"><input type="date" className="form-control" ref={rentalDate}/></div>
                    </div>
                    <div className="row p-2">
                        <div className="col-md-4 mt-1"><input type="submit" onClick={doSave} className="btn btn-block btn-primary" /></div>
                    </div>
                </div>
            </div>
        </div>
      );
}

export default Rental;