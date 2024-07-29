import React,{useState,useRef} from 'react';
import Axios from "../api/customAxios";
import {useNavigate} from "react-router-dom" 
import SimpleReactValidator from 'simple-react-validator';
import Header from './Header';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Ticket() {
    const [data, setData] = useState({ "name":"","description":""});
    const navigate = useNavigate()     
    const [error, setError] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, forceUpdate] = useState();


    const nameOnChange=(event)=>{
        setData(state => ({ ...state, name:  event.target.value }));
    }

    const descriptionOnChange=(event)=>{
        setData(state => ({ ...state, description:  event.target.value }));
    }

    
    const Action=async(event)=>{
        event.preventDefault();
        const formValid = simpleValidator.current.allValid()
        
        if (!formValid) {
            simpleValidator.current.showMessages()
            forceUpdate(1)
        }
        else{
            try{
                var result = await Axios.post(`action/create`,data)
                if(result.data.status===1){
                    navigate("/")
                }
            }
            catch(e){
                
            }
            
            
            
        }
    }
    return (<div className="App">
                <Header/>
                    <div className="width50">
                        <Form class="mt-5 w-50  p-5">
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                
                                <Form.Control onChange={nameOnChange}  placeholder="name" value={data.name} />
                                <p class="text-danger">{simpleValidator.current.message('name', data.name, 'required')}</p>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control as="textarea" rows={3} value={data.description} placeholder="description" onChange={descriptionOnChange} />
                                <p class="text-danger">{simpleValidator.current.message('description', data.description, 'required')}</p>
                            </Form.Group>
                            
                            <Button  onClick={Action}  as="a" variant="primary">
                                Submit
                            </Button>
                            {error ? <p class="text-danger">{error}</p>:null}
                        </Form>
                    </div>
                </div>);
}

export default Ticket