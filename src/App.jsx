
import styled from 'styled-components'


const H1 = styled.h1 `font-size: 30px;
font-weight: 600
`

const Button = styled.button `
font-size: 1.4rem;
border-radius:7px;
height: 20px;
color: white;
border: none;;
background-color: purple;
padding: 1.2rem 1.6rem
`

function App() {


  return (
    <div>
      {<H1>The wild oasis</H1>}
      <Button>Hello</Button>
    </div>
  )
}

export default App
