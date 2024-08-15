import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { publicRequest } from '../requestMethods';
import LoginNavbar from '../components/LoginNavbar';
import Footer from '../components/Footer';

const Container = styled.div`
  height: 100%;
  margin: 4% 7%;
`;

const Table = styled.table`
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  margin-top: 20px;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 12px 8px;
  text-align: left;
  background-color: #393E46;
  color: #EEEEEE;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
  &:hover {
    background-color: #ddd;
  }
`;

const Header = styled.h1`
  text-align: center;
  padding-bottom: 10px;
  color: #222831;
`;

const Button = styled.button`
  background-color: #393E46;
  color: #EEEEEE;
  border: none;
  border-radius: 15px;
  font-size: 14px;
  cursor: pointer;
  padding: 8px 16px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #55B4BA;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Spinner = styled.div`
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Anlyze = () => {
  const [examInfo, setExamInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    getExamInfos();
  }, []);

  const getExamInfos = async () => {
    try {
      const { data } = await publicRequest.get(`/userexams/examanalysis/${id}`);
      setExamInfo(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching exam data:', error);
      setLoading(false);
    }
  };

  if (loading) {
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
        <Header>Exam Analysis</Header>
        <Table>
          <thead>
            <Tr>
              <Th>User Name</Th>
              <Th>Exam</Th>
              <Th>Score</Th>
              <Th>Review</Th>
            </Tr>
          </thead>
          <tbody>
            {examInfo.map((exam) => (
              <Tr key={exam._id}>
                <Td>{exam.userInfo.username}</Td>
                <Td>{exam.userInfo.examname}</Td>
                <Td>{exam.grade}</Td>
                <Td>
                  <Link to={`/examreview/${exam._id}`}>
                    <Button>Click me</Button>
                  </Link>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <Footer />
    </>
  );
};

export default Anlyze;
