import React, {useEffect } from 'react';
import Header from './Header';
import Axios from "../api/customAxios";
import {useNavigate} from "react-router-dom" 
import NoData from "../img/not-found.png"

const List = () => {
    const [data, setData] = React.useState(false)
    const [pickValue, setPickValue] = React.useState("3")
    const navigate = useNavigate()    
  
    useEffect(() => {
        async function fetchMyAPI() {
            
            try{
                var result = await Axios.get(`action/getListAll`)
                if(result.data.status===1){
                    var total=result.data.success.data.success.data
                    setData(total)
                }
                
            }   
            catch(e){
                
            }   
        }

        fetchMyAPI()
    }, [])

    

    const actionStatus=async(event,id)=>{
        
        if(event.target.value=='1'){
            navigate(`/Edit/`+id)
        }
        else if(event.target.value=='2'){
            var result = await Axios.get(`action/delete/`+id)
            if(result.data.status===1){
                var total=result.data.success.data.success.data
                setData(total)
            }
        }
    }

    

    return (
        <div>
            <Header/>
            <div style={{width:'90%',margin:'0 auto',marginTop:120}}>
                
                {data.length>0 ?
                    <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((value,no)=>{
                                return <tr key={no}>
                                <th scope="row">{no+1}</th>
                                <td>{value.name}</td>
                                <td>{value.description}</td>
                                <td>
                                    <select selectedValue={pickValue} onChange={(e)=>actionStatus(e,value._id)} class="form-select" aria-label="size 3 select example">
                                        <option value="3" selected>Select</option>
                                        <option value="1">Edit</option>
                                        <option value="2">Delete</option>
                                    </select>
                                </td>
                            </tr>
                            })}
                            
                            
                        </tbody>
                    </table>
                    :
                    <div >
                        <div class="h-100 d-flex align-items-center justify-content-center">
                            <img style={{width:220,height:220}} src={NoData} class="thumbnail img-responsive"/>
                           
                        </div>
                        
                    </div>
                }  
            </div>
            
        </div>
    );
};
export default List;