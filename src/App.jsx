import styled from 'styled-components'
import GlobalStyles from './styles/GlobalStyles'
import Button from './ui/Button'
import Input from './ui/Input'
import Heading from './ui/Heading'
import Row from './ui/Row'




const StyledApp = styled.main `
background-color: black;
height: 100vh;
width: 100vw;
` 



function App() {


  return (
    <>
    <GlobalStyles/>
    <StyledApp>
      <Row>
      <Row type='horizontal'>
        <Heading type='h1'>The wild oasis</Heading>
      <div>
        <Heading as='h2'>Check in and out</Heading>
        <Button onClick={()=>alert("checked in")}>Check In </Button>
        <Button variation ='secondary' size ='small' onClick={()=>alert("checked out")}>Check Out </Button>
      </div>
      </Row>
      <Heading as='h3'>Forms</Heading>
      <Row>
        <form>
          <Input type='number' placeholder='number of guests'/>
          <Input type='number' placeholder='number of guests'/>
        </form>
      </Row>
      </Row>
    </StyledApp>


    </>
  )
}



export default App
