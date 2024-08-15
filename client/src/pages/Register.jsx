import Navbar from "../components/Navbar";
import Footer from '../components/Footer';
import styled from 'styled-components'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { publicRequest } from "../requestMethods";

const Container = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: whitesmoke;
`;

const Wrapper = styled.div`
  width: 60%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const HeroTitle = styled.h1`
  font-size: 36px;
  font-weight: 700;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 10px;
  color: #333;
  font-family: 'Merriweather', serif;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 400;
  text-align: center;
  margin-bottom: 30px;
  color: #555;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: teal;
    box-shadow: 0 0 8px rgba(0, 128, 128, 0.2);
  }
`;

const Button = styled.button`
  width: 50%;
  padding: 15px;
  border: none;
  border-radius: 25px;
  margin-top: 20px;
  background-color: teal;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: darkcyan;
    box-shadow: 0 4px 12px rgba(0, 128, 128, 0.4);
  }
`;

const FormWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  background-color: #f9f9f9;
`;

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pass, setPass] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const registered = {
      firstname: name,
      lastname: lastName,
      email: email,
      password: pass,
    };
    console.log(registered);
    publicRequest.post("/users/", registered).then((response) => {
      console.log(response.status);
      console.log(response.data);
    });

    navigate("/login");
  };

  return (
    <>
      <Navbar />
      <Container>
        <Wrapper>
          <HeroTitle>Sign up to OEM for free</HeroTitle>
          <Title>Register to create and manage online tests, quizzes and assessments with OEM.</Title>
          <FormWrapper>
            <Form onSubmit={handleRegister}>
              <Input placeholder="Email (username)" type="email" onChange={(e) => setEmail(e.target.value)} required />
              <Input placeholder="First Name" type="text" onChange={(e) => setName(e.target.value)} required />
              <Input placeholder="Last Name" type="text" onChange={(e) => setLastName(e.target.value)} required />
              <Input placeholder="Password" type="password" onChange={(e) => setPass(e.target.value)} required />
              <Button type="submit">Register for free</Button>
            </Form>
          </FormWrapper>
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
}

export default Register;
