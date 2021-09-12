import {Modal,Button} from 'react-bootstrap'
import '../../../../App.css'

const Modals=(props) =>{
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton >
          <Modal.Title id="contained-modal-title-vcenter" className={props.className}>
            {props.heading}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         {props.children}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>{props.onClose}</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
  export const TopModal=(props)=>{
 
 return (
  <>


  <Modal show={props.show} onHide={props.onHide}>
    <Modal.Header >
      <Modal.Title>{props.title}</Modal.Title>
    </Modal.Header>
    <Modal.Body> {props.children} </Modal.Body>
    <Modal.Footer>
      {props.footer}
    </Modal.Footer>
  </Modal>
</>
  );
  }

  
  export default Modals
  