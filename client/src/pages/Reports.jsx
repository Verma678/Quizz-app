import Footer from '../components/Footer'
import LoginNavbar from '../components/LoginNavbar'
import styled from 'styled-components'
import axios from 'axios'
import { publicRequest } from '../requestMethods'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Container = styled.div`
  height: 100%;
  margin: 4% 7%;
`;

const Table = styled.table`
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  margin-top: 20px; /* Adjust margin as needed */
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
  color: #222831; /* Corrected typo in 'color' property */
`;

const Button = styled.button`
  background-color: #393E46;
  color: #EEEEEE;
  border: none;
  border-radius: 15px;
  font-size: 14px;
  cursor: pointer;
  padding: 10px 20px;
  margin-top: 10px; /* Adjust margin as needed */
`;

const Reports = (CUId) => {

  const [userDatas, setUserDatas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [examDatas, setExamDatas] = useState([]);

  useEffect(() => {
    getUserDatas()
    getExamDatas()
  }, [])



  const getUserDatas = async () => {
    const { data } = await publicRequest.get(`/userexams/` + CUId.CUId)
    setUserDatas(data)
    console.log(data)
  }

  const getExamDatas = async () => {
    await publicRequest.get(`/exam`).then((response) => {
      setExamDatas(response.data)
      console.log(response.data)
      setIsLoading(false)
    })
  }


  console.log()
  if (isLoading) {

    return (
      <>
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
      </>
    );
    
    
  }
  return (
    <>
      <LoginNavbar />
      <Container>
        <Header>Status report</Header>
        <Table>
          <Tr>
            <Th>Exam Name</Th>
            <Th>Link</Th>
            <Th>Status</Th>
          </Tr>
          {examDatas.map((exam, index) => (
            <Tr key={index}>
              <Td>{exam.examname}</Td>
              <Td><Link to={`/quiz/${exam._id}`}><Button>Go to exam</Button></Link></Td>
              <Td>{userDatas.findIndex(u => u.examId === exam._id) > -1 ? (<span style={{ border: "none", borderRadius: "10px", padding: "5px", backgroundColor: "#CC0000", color: "#EEEEEE", fontWeight: "500" }}>{"Solved"}</span>) : <span style={{ border: "none", borderRadius: "10px", padding: "5px", backgroundColor: "#007E33", color: "#EEEEEE", fontWeight: "500" }}>{"Available"}</span>}</Td>
            </Tr>
          ))}
        </Table>
      </Container>
      <Footer />
    </>
  )
}

export default Reports