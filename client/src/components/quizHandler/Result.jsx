import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Footer from "../Footer";
import LoginNavbar from "../LoginNavbar";
import axios from 'axios'
import { publicRequest } from "../../requestMethods";
import { useParams } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 60vh;
  text-align: center;
`

const Result = () => {

  const [score, setScore] = useState(0);
  const [passGrade, setPassGrade] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const id = params;

  useEffect(() => {
    getExamNames();
  }, [isLoading])

  const getExamNames = async () => {
    console.log(id);
    const { data } = await publicRequest.get(`/userexams/exam/${id.id}`);
    setScore(data[0].grade);
    getPassGrade(data);
  }

  const getPassGrade = async (data) => {
    await publicRequest.get(`/exam/exam/${data[0].examId}`).then((response) => {
      setPassGrade(response.data[0].passGrade);
      setIsLoading(false);
    });

  }

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
      )
  }
  return (
    <>
      <LoginNavbar />
      <Container>
        <span>Final Score : {score}</span> <br />
        {passGrade <= score ? (<><span>congratulations you passed the exam</span><br /><img src="https://i.ibb.co/7vPw6r4/Png-Item-30479.png" style={{ height: "200px", width: "300px", marginLeft: "auto", marginRight: "auto" }} /></>) : (<><span>sorry you failed the exam</span><br /><img src="https://www.onlygfx.com/wp-content/uploads/2020/05/fail-stamp-7.png" style={{ height: "200px", width: "300px", marginLeft: "auto", marginRight: "auto" }} /></>)}
        <Link to="/dashboard">
          <button
            variant="contained"
            color="secondary"
            size="large"
            style={{ alignSelf: "center", marginTop: 20, cursor: "pointer" }}
          >
            Go to dashboard
          </button>
        </Link>
      </Container>
      <Footer />
    </>
  );
};

export default Result;