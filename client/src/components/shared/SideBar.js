import React from 'react'
import {Offcanvas,Button} from 'react-bootstrap/'

function Sidebar(props) {


  return (
    <>
  
      <Offcanvas show={props.show} onHide={props.onHide} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{props.title}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        {props.children}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

  export default Sidebar;