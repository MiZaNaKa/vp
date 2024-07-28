import React, { useState,useEffect } from 'react';
import {useNavigate} from "react-router-dom" 
import Drawer from 'react-modern-drawer'
import Menu from "../img/menu.png"
import Logo from "../img/logo.PNG"
import User from "../img/user.png"
import { Link } from "react-router-dom";
import Close from "../img/close.png"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
        <div className='headerBox clearfix' >
            
            <div class="vw-100 position-fixed top-0  bg-white pt-3">
                <Container >
                    <Row>
                        <Col>
                            <Link to="/">
                                <img src={Logo} className='logo'/>
                            </Link>
                        
                        </Col>
                        <Col xs={8}></Col>
                        
                        <Col>
                            <img onClick={toggleDrawer} src={Menu} className='toggleIcon'/>
                        </Col>
                        <Col>
                            {userInfo ?
                                <img src={User} style={{width:30,height:30}}/>
                                :
                                <img className='cursor' onClick={()=>goRoute("Login")} src={User} style={{width:30,height:30}}/>
                            }
                            
                            <p style={{padding:0,margin:0}}>{userInfo.name}</p>
                        </Col>
                    </Row>
                </Container>
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
                                <p onClick={()=>goRoute("List")} className='cursor'>List</p>
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