import { AccessTime, Check, FlashOn, Lock, Public, Recommend } from '@mui/icons-material'
import styled from 'styled-components'

const Container = styled.div`
display:flex;
padding:25px;
justify-content:space-between;
`
const BigTitle = styled.div`
text-align:center;
font-size:42px;
color:#393E46;
border-top:3px solid #393E46;
border-bottom:3px solid #393E46;
`

const Image = styled.div`
color:#393E46;
display:flex;
flex-directiction:column;
justify-content:center;
align-items:center;
transition: transform 0.2s ease-in-out; /* Smooth transition for the transform property */

&:hover {
  transform: scale(1.2); /* Enlarge the image on hover */
}
`
const Info = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
`
const Title = styled.div`
color:#393E46;
margin-bottom:10px;
`
const Description = styled.div`
flex:1;
text-align:center;
color:#393E46;
`

const Section = styled.div`
flex:1;
margin:10px 30px 0px 25px;
height:20vh;
`

const AllItems = styled.div`
background-color:#e8e8e8;
`

const Introducing = () => {
    return (
        <AllItems>
            <BigTitle>Awesome <b>Features</b></BigTitle>
            <Container>
                <Section>
                    <Info>
                        <Image><Public /></Image>
                        <Title> <u> Access anywhere</u></Title>
                        <Description>Being online allows you and your respondents to access, administer and take your quizzes from anywhere at anytime.</Description>
                    </Info>
                </Section>
                <Section>
                    <Info>
                        <Image><Lock /></Image>
                        <Title> <u>   Secured with SSL </u> </Title>
                        <Description>With SSL encryption and utilising our advanced cloud infrastructure you can be sure your tests will always be secure.</Description>
                    </Info>
                </Section>
                <Section>
                    <Info>
                        <Image><Check /></Image>
                        <Title> <u>Auto-grading</u> </Title>
                        <Description>QuizBlitz can automatically grade your assessments, saving you the time.</Description>
                    </Info>
                </Section>
            </Container>
            <Container>
                <Section>
                    <Info>
                        <Image><AccessTime /></Image>
                        <Title> <u>Timed tests</u> </Title>
                        <Description>With QuizBlitz, It is easy to set a time limit.</Description>
                    </Info>
                </Section>
                <Section>
                    <Info>
                        <Image><FlashOn /></Image>
                        <Title> <u>Custom Tests</u> </Title>
                        <Description>With QuizBlitz, You can customize your tests very easily.</Description>
                    </Info>
                </Section>
                <Section>
                    <Info>
                        <Image><Recommend /></Image>
                        <Title>    <u>24/7 Live Support</u> </Title>
                        <Description>Being online allows you and your respondents to access, administer and take your quizzes from anywhere at anytime.</Description>
                    </Info>
                </Section>
            </Container>
        </AllItems>

    )
}

export default Introducing