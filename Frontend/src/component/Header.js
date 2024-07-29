import React, { useEffect } from 'react';
import {useNavigate} from "react-router-dom" 
import Drawer from 'react-modern-drawer'
import Menu from "../img/menu.png"
import Logo from "../img/logo.PNG"
import User from "../img/user.png"
import { Link } from "react-router-dom";
import Close from "../img/close.png"
import 'react-modern-drawer/dist/index.css'

const Header = () => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [userInfo, setUserInfo] = React.useState("")
    const navigate = useNavigate()     
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

    useEffect(() => {
        async function fetchMyAPI() {
            var userInfo=localStorage.getItem('UserInfo')
            if(userInfo){
                var store=JSON.parse(userInfo)   
                setUserInfo(store) 
            }            
        }
    
        fetchMyAPI()
    }, [])

    const LogOut=()=>{
        localStorage.removeItem('UserInfo');
        window.location.reload(false);
    }

    const goRoute=(value)=>{
        navigate("/"+value)
    }

    return (
        <div>
            <div class="vw-100 position-fixed top-0  bg-white pt-3">
                <div class="container">  
                    <div class="row">
                        <div class="col">
                            <Link to="/">
                                <img src={Logo} className='logo'/>
                            </Link>
                        </div>
                        <div class="col-5">
                        
                        </div>
                        <div class="col">
                            <img onClick={toggleDrawer} src={Menu} className='toggleIcon'/>
                        </div>
                        <div class="col text-center">
                            {userInfo ?
                                <img src={User} className='userIcon'/>
                                :
                                <img className='cursor userIcon' onClick={()=>goRoute("Login")} src={User}/>
                            }
                            <div>
                            <p style={{fontSize:12}}>{userInfo.name}</p>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            
            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='left'
            >
                <div className='drawer'>
                    <img src={Close} onClick={toggleDrawer} className='closeDrawerIcon'/>
                    {userInfo ?
                        <div style={{marginLeft:25}}>
                            <div>
                                <p onClick={()=>goRoute("Create")} className='cursor'>Create</p>
                            </div>

                            <div>
                                <p onClick={()=>goRoute('')} className='cursor'>List</p>
                            </div>

                            <div>
                                <p onClick={LogOut} className='cursor'>Log Out</p>
                            </div>
                        </div>
                        :
                        <div>
                            <div style={{marginLeft:25}}>
                                <p onClick={()=>goRoute("Login")} className='cursor'>Login</p>
                            </div>
                            
                        </div>
                    }
                    
                    
                    
                </div>
                
            </Drawer>
        </div>
    )
}

export default Header