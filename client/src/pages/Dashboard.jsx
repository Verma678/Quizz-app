import styled from "styled-components"
import LoginNavbar from "../components/LoginNavbar";
import Footer from "../components/Footer";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { BarChart, Delete, Edit, Visibility } from "@mui/icons-material";
import { useEffect, useState } from "react";
import Popup from 'reactjs-popup';
import axios from 'axios'
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { publicRequest } from "../requestMethods";

const Container = styled.table`
  width: 100%;
  height: 40vh;
  border-collapse: collapse;
  text-align: center;
  border-radius: 8px;
  overflow: hidden;
  background-color: #EEEEEE;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Adding a subtle shadow for depth */
`;

const Wrapper = styled.caption`
  width: 90%;
  margin: 5%;
`;

const Button = styled.button`
  background-color: #EEEEEE;
  color: #393E46;
  border: none;
  border-radius: 15px;
  font-size: 14px;
  cursor: pointer;
  padding: 8px 16px;
  transition: background-color 0.3s ease; /* Smooth transition for hover effect */
  &:hover {
    background-color: #DFE2E2; /* Lighten the background color on hover */
  }
`;

const CreateButton = styled.button`
  font-size: 26px;
  font-weight: 600;
  padding: 12px 24px;
  border: none;
  border-radius: 10px;
  background-color: #00ADB5;
  color: #EEEEEE;
  cursor: pointer;
  transition: background-color 0.3s ease; /* Smooth transition for hover effect */
  &:hover {
    background-color: #55B4BA; /* Darken the background color on hover */
  }
`;
const Dashboard = (CUId) => {

  const notify = () => toast.success("Link successfully  copied to the clipboard");

  const [isLoading, setIsLoading] = useState(true);
  const [examName, setExamName] = useState("");
  const [examNameStorage, setExamNameStorage] = useState([]);
  const [dummy, setDummy] = useState(0);


  const getExamNames = async () => {
    const { data } = await publicRequest.get(`/exam/${CUId.CUId}`);
    setExamNameStorage(data);
    setIsLoading(false);
  }

  const deleteExam = (id) => {
    publicRequest.delete(`/exam/${id}`).then((response) => {
      console.log(response.status);
      console.log(response.data);
    });
    setDummy(dummy + 1)
  }

  useEffect(() => {
    getExamNames();
  }, [examName, dummy]);

  const handleName = (e) => {
    e.preventDefault();
    if (examName == "") {
      alert("If you want to create an exam you have to give it a name")
    } else {
      const newExam = {
        creatorUserId: CUId.CUId,
        examname: examName,
      };
      console.log(newExam)
      publicRequest.post("/exam/", newExam).then((response) => {
        console.log(response.status);
        console.log(response.data);
      });
      setDummy(dummy + 1)
    }
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
        <Wrapper>
          <Popup
            trigger={<CreateButton >Create Exam </CreateButton>}
            modal
            nested
          >
            {close => (
              <div style={{ fontSize: "12px", backgroundColor: "#393E46", width: "400px" }}>
                <button style={{ cursor: "pointer", position: "absolute", display: "block", padding: "2px 5px", lineHeight: "20px", right: "-10px", top: "-10px", fontSize: "24px", background: "#ffffff", borderRadius: "18px", border: "1px solid #cfcece" }} onClick={close}>
                  &times;
                </button>
                <form onSubmit={handleName}>
                  <div style={{ width: "100", borderBottom: "1px solid gray", fontSize: "18px", padding: "5px", color: "white" }}>New Exam</div>
                  <div style={{ width: "100%", padding: "10px 5px" }}>
                    <input type="text" style={{ width: "90%", padding: "5px", borderRadius: "6px", border: "none" }} placeholder='Enter title for your exam' onChange={e => setExamName(e.target.value)} required /><br />
                  </div>
                  <div style={{ width: "100%", padding: "10px 5px", margin: "auto", textAlign: "center" }}>
                    <Popup
                      trigger={<Button className="formQButton" style={{ width: "30%", marginRight: "10px", backgroundColor: "#0275d8", color: "white" }}> Confirm </Button>}
                      position="top center"
                      nested
                    >
                    </Popup>
                    <Button
                      className="formQButton" onClick={() => { close(); }} style={{ width: "30%", color: "#100F0F" }}> Close
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </Popup>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow style={{ backgroundColor: "whitesmoke" }}>
                  <TableCell>Quizzes</TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {examNameStorage.map((name) => (
                  <TableRow
                    key={name.examname}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" onClick={() => { navigator.clipboard.writeText("http://localhost:3000/quiz/" + name._id) }}>
                      <span style={{ cursor: "pointer" }} onClick={() => { notify(); }}> {name.examname}  <span style={{ color: "#CC0000" }}>{"=>"}  Click for quiz link</span> </span>
                    </TableCell>
                    <TableCell align="right"><Link to={`/anlyze/${name._id}`}><Button><BarChart style={{ verticalAlign: "middle", padding: "5px" }} />Analyze</Button></Link></TableCell>
                    <TableCell align="right"><Link to={`/quiz/${name._id}`}><Button><Visibility style={{ verticalAlign: "middle", padding: "5px" }} />Preview</Button></Link></TableCell>
                    <TableCell align="right"><Link to={`/create/${name._id}`}><Button ><Edit style={{ verticalAlign: "middle", padding: "5px" }} />Edit</Button></Link></TableCell>
                    <TableCell align="right"><Button onClick={() => { deleteExam(name._id); }}><Delete style={{ verticalAlign: "middle", padding: "5px" }} />Delete</Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Wrapper>
      </Container>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default Dashboard