import styled from 'styled-components'
import GlobalStyles from './styles/GlobalStyles'
import Button from './ui/Button'
import Input from './ui/Input'


const H1 = styled.h1 `font-size: 30px;
font-weight: 600
`

const StyledApp = styled.div `
background-color: black;
height: 100vh;
width: 100vw;
` 



function App() {


  return (
    <>
    <GlobalStyles/>
    <StyledApp>
      {<H1>The wild oasis</H1>}
      <Button onClick={()=>alert("checked in")}>Check In </Button>
      <Button onClick={()=>alert("checked out")}>Check Out </Button>
      <Input type='number' placeholder='number of guests'/>
      <Input type='number' placeholder='number of guests'/>
    </StyledApp>


    </>
  )
}

export default App
