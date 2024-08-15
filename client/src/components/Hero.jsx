import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { keyframes } from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
`;


const rotateslide = keyframes`   
   0% { background-position: 0 0; }
  100% { background-position: -100% 0; }
`;



const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #03001a;
  background-image: url("https://www.transparenttextures.com/patterns/stardust.png");
  background-repeat: repeat-x;
  animation: ${rotateslide} 15s linear infinite;
  overflow: hidden;

/* This is mostly intended for prototyping; please download the pattern and re-host for production environments. Thank you! */
`;

const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
`;

const Image = styled.img`
  height: 80%;
`;

const Title = styled.h1`
  font-size: 70px;
  color: #eeeeee;
  position: absolute;
  top: 20%;
  left: 5%;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;

const Description = styled.p`
  margin: 30px 0px;
  font-size: 32px;
  font-weight: 600;
  letter-spacing: 3px;
  color: #eeeeee;
  margin-left: 5%;
`;

const Button = styled.button`
  padding: 15px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
  color: #eeeeee;
  background-color: #5cb85c;
  border: none;
  border-radius: 15px;
  margin-left: 5%;
  &:hover {
    background-color: #75db75;
  }
`;

const Hero = () => {
  const [text, setText] = useState('');
  const [isErasing, setIsErasing] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const messages = ['Online Test Maker', 'Build Quizzes For Free!'];

  useEffect(() => {
    if (charIndex < messages[textIndex].length && !isErasing) {
      setTimeout(() => {
        setText(prev => prev + messages[textIndex].charAt(charIndex));
        setCharIndex(charIndex + 1);
      }, 150);
    } else if (charIndex > 0 && isErasing) {
      setTimeout(() => {
        setText(messages[textIndex].substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, 100);
    } else if (charIndex === messages[textIndex].length && !isErasing) {
      setTimeout(() => {
        setIsErasing(true);
      }, 2000);
    } else if (charIndex === 0 && isErasing) {
      setIsErasing(false);
      setTextIndex((textIndex + 1) % messages.length);
    }
  }, [charIndex, isErasing, textIndex, messages]);

  return (
    <Container>
      <Wrapper>
        <Slide>
          <InfoContainer>
            <Title>
              {text}
            </Title>
            <Description>
              Create, Upload and Analyze Tests, Quizzes and Assessments for free with QuizBlitz!
            </Description>
            <Button>
              <Link to="/login" style={{ textDecoration: "none", color: "#EEEEEE" }}>
                Get Started for Free  &gt;&gt;
              </Link>
            </Button>
          </InfoContainer>
          <ImgContainer>
            <Image src="https://i.ibb.co/9sCCj2b/exam.png" />
          </ImgContainer>
        </Slide>
      </Wrapper>
    </Container>
  );
};

export default Hero;
