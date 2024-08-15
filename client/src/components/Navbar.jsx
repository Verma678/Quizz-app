import React from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom";


const Container = styled.div`
height:60px;
background-color:#010409;
`

const Wrapper = styled.div`
padding:0px 20px;
display:flex;
align-items:center;
justify-content:space-between
`

const Left = styled.div`
flex: 1;
display: flex;
align-items: center;
`

const Logo = styled.div`
font-family: 'Square Peg', cursive;
font-size:32px;
font-weight:600;
cursor:pointer;
color:#00ADB5;
margin-left:10%;
padding:10px 12px;
`

const MenuItem = styled.button`
font-size: 14px;
cursor: pointer;
background-color: #010409;
color:#EEEEEE;
padding:20px 12px;
border:none;
&:hover {
    background-color: #31363F;
    border-radius : 10px;
    margin : 1px;
    padding : 10px;
  }
`

const Right = styled.div`
flex:1;
display:flex;
align-items: center;
justify-content:flex-end;
`

const MenuItemFirst = styled.div`
width:55px;
margin-right:10%;
margin-left:25px;
cursor: pointer;
border:none;
background-color:#0275d8;
color:#EEEEEE;
padding:10px 20px;
border-radius:50px;
&:hover {
    background-color: #228CE9;
  }
`

const MenuItemSecond = styled.div`
margin-left:25px;
cursor: pointer;
border:none;
background-color:#5cb85c;
color:#EEEEEE;
padding:10px 20px;
border-radius:50px;
&:hover {
    background-color: #75DB75;
  }
`


const Navbar = () => {
    return (
        <Container>
            <Wrapper>
                <Left>

                    <Logo>
                        <img src="https://i.ibb.co/0mr4nf1/quizblit-high-resolution-logo-transparent-2.png"
                            width="140" alt="quizblit-high-resolution-logo-transparent-2" border="0" />
                    </Logo>{/*online exam maker*/}
                    <Link to="/">
                        <MenuItem>Home</MenuItem>
                    </Link>
                    <Link to="#">
                    <MenuItem>Features</MenuItem>
                    </Link>

                    <Link to="#">
                        <MenuItem>Help</MenuItem>
                    </Link>
                </Left>
                <Right>
                    <Link to="/login" style={{ textDecoration: "none" }}>
                        <MenuItemSecond>Login</MenuItemSecond>
                    </Link>
                    <Link to="/login" style={{ textDecoration: "none", marginRight: "10%" }}>
                        <MenuItemFirst>Sign up</MenuItemFirst>
                    </Link>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar