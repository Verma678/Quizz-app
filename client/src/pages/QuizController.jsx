import axios from "axios";
import { useEffect, useState } from "react";
import Quiz from "../components/quizHandler/Quiz";
import { useParams, useNavigate } from 'react-router-dom'
import LoginNavbar from "../components/LoginNavbar";
import Footer from "../components/Footer";
import Countdown from 'react-countdown';
import { publicRequest } from "../requestMethods";
import CountDownTimer from "../components/CountDownTimer";

const QuizController = (CUId) => {

    const userId = CUId.CUId
    const [questions, setQuestions] = useState([]);
    const [score, setScore] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [exam_id, setExam_id] = useState("");
    const [timerData, setTimerData] = useState(0);

    const navigate = useNavigate()

    const params = useParams();
    const id = params;

    useEffect(() => {
        getExams();
    }, [])

    const getExams = async () => {
        const { data } = await publicRequest.get('/examquestions/' + id.id);
        setQuestions(data);
        userCheck();
    }

    const securityData = async () => {
        axios.all([
            await publicRequest.get('/users/' + CUId.CUId),
            await publicRequest.get('/exam/exam/' + id.id)
        ]).then(axios.spread((data, data2) => {
            if (data2.data[0].creatorUserId == CUId.CUId) {
                setTimerData(data2.data[0].time)
                console.log(data2.data[0].time)
                alert("You are in preview mode that means your question data will not be saved")
                setTimeout(() => {
                    navigate("/dashboard" + exam_id)
                }, ((data2.data[0].time) * 60) + "000");
            } else {
                const dummyData = {
                    userId: CUId.CUId,
                    examId: id.id,
                    userInfo: {
                        username: data.data[0].firstname + " " + data.data[0].lastname,
                        examname: data2.data[0].examname,
                        score: 0,
                    }
                };
                publicRequest.post("/userexams/", dummyData).then((response) => {
                    console.log(response.status);
                    console.log(response.data);
                    setExam_id(response.data._id);
                    setTimeout(() => {
                        navigate("/result/" + response.data._id)
                    }, ((data2.data[0].time) * 60) + "000");
                });
                setTimerData(data2.data[0].time)
            }

        }))
    }

    const userCheck = async () => {
        try {
            const { data } = await publicRequest.get('/userexams/' + CUId.CUId);
            const myData = await Promise.all(data.map((d) => d.examId))
            for (let i = 0; i <= myData.length; i++) {
                if (myData[i] === id.id) {
                    navigate("/dashboard")
                    alert("you have already given this exam")
                    return
                }
            }
            securityData();
            setIsLoading(false);
        } catch (err) {
            console.log(err);
            alert("you have already took this exam")
        }
    }

    const hoursMinSecs = { hours: 0, minutes: timerData, seconds: 0 }
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
        <div>
            <LoginNavbar />
            <CountDownTimer hoursMinSecs={hoursMinSecs} />
            <Quiz
                questions={questions}
                score={score}
                setScore={setScore}
                setQuestions={setQuestions}
                userId={userId}
                exam_id={exam_id}
            />
            <Footer />
        </div>
    );
}

export default QuizController;