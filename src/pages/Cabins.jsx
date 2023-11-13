import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import { useState } from "react";
import Button from "../ui/Button";
import CreateCabinForm from "../features/cabins/CreateCabinForm";


function Cabins() {
  const [showForm,setShowForm] = useState(false)
  return (
    <>
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
    </Row>

    <Row type="horizontal">
      <CabinTable/>
      <Button onClick={()=>setShowForm((show)=>!show)}>add new cabin</Button>
      {
        showForm && <CreateCabinForm/>
      }
    </Row>
    </>
  );
}

export default Cabins;
