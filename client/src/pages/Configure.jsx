import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';
import LoginNavbar from '../components/LoginNavbar';
import axios from 'axios';
import { publicRequest } from '../requestMethods';
import { useParams, useNavigate } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
`;

const Wrapper = styled.div`
  width: 80%;
  max-width: 600px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 8px;
`;

const Button = styled.button`
  background-color: #0275d8;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 20px;
  font-size: 16px;
  cursor: pointer;
`;

const LoadingSpinner = styled.div`
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
`;

const Configure = () => {
  const [myStartDatas, setMyStartDatas] = useState([]);
  const [examName, setExamName] = useState('');
  const [examGrade, setExamGrade] = useState('');
  const [examTime, setExamTime] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    getConfigureData();
  }, []);

  const getConfigureData = async () => {
    await publicRequest.get(`/exam/exam/${id}`).then((response) => {
      console.log(response.status);
      setMyStartDatas(response.data);
      setIsLoading(false);
    });
  };

  const handleConfigure = (e) => {
    e.preventDefault();
    const exam = {
      examname: examName,
      time: examTime,
      passGrade: examGrade,
    };
    publicRequest.patch(`/exam/${id}`, exam).then((response) => {
      console.log(response.status);
      console.log(response.data);
      navigate('/dashboard');
    });
  };

  if (isLoading) {
    return (
      <>
      <style>
          {`
          body, html {
              margin: 0;
              padding: 0;
              height: 100%;
          }

          .loader-container {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh; /* Full viewport height */
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              background: rgba(255, 255, 255, 0.8); /* Optional: background color with transparency */
          }

          .thunder {
              width: 65px;
              height: 117px;
              position: relative;
          }

          .thunder:before,
          .thunder:after {
              content: "";
              position: absolute;
              inset: 0;
              background: #ff8001;
              box-shadow: 0 0 0 50px;
              clip-path: polygon(25% 0%, 70% 0%, 44% 40%, 78% 28%, 20% 100%, 40% 55%, 3% 60%);
          }

          .thunder:after {
              animation: pulsing 1s infinite;
              transform: perspective(300px) translateZ(0px);
          }

          @keyframes pulsing {
              to {
                  transform: perspective(300px) translateZ(180px);
                  opacity: 0;
              }
          }
          `}
      </style>
      <LoginNavbar />
      <div className="loader-container">
          <div className="thunder"></div>
      </div>
  </>
    );
  }

  return (
    <>
      <LoginNavbar />
      <Container>
        <Wrapper>
          <Form onSubmit={handleConfigure}>
            <Section>
              <Label htmlFor="quizName">Quiz Name</Label>
              <Input
                type="text"
                name="quizName"
                placeholder="Enter Quiz Name"
                value={examName}
                onChange={(e) => setExamName(e.target.value)}
              />
            </Section>
            <Section>
              <Label htmlFor="time">Time Limit (minutes)</Label>
              <Input
                type="number"
                name="time"
                placeholder="Enter Time Limit"
                value={examTime}
                onChange={(e) => setExamTime(e.target.value)}
              />
            </Section>
            <Section>
              <Label htmlFor="grade">Pass Grade</Label>
              <Input
                type="text"
                name="grade"
                placeholder="Enter Grade"
                value={examGrade}
                onChange={(e) => setExamGrade(e.target.value)}
              />
            </Section>
            <Section>
              <Button type="submit">Save</Button>
            </Section>
          </Form>
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default Configure;
