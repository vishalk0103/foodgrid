import React from 'react'
import style from './Cart.module.css'
import { Card,ListGroup } from 'react-bootstrap'

const EmptyCart=(props)=>{
    return(
        <React.Fragment>
       
           <Card className={`shadow ${style.cart}`} style={{ width: "27rem" }}>
          <Card.Body className="px-0">
            <Card.Title className="ms-2">
            </Card.Title>
          </Card.Body>
          <ListGroup className={`list-group-flush ${style["cart--items"]}`}>
     
          </ListGroup>
          <Card.Body
            className={`py-0  d-flex justify-content-between pb-2 ${style["cart-total"]}`}
          >
       <div class="card-body cart pb-4">
                    <div class="col-sm-12 empty-cart-cls text-center"> <img src="https://image.flaticon.com/icons/png/512/5497/5497180.png" width="130" height="130" class="img-fluid mb-4 mr-3"/>
                        <h5 className='text-muted'><b>Start adding items from the menu to build your order.</b></h5>
                    </div>
                </div>
          </Card.Body>
          <Card.Body className="p-0">
         {props.button}
          </Card.Body>
        </Card>
        </React.Fragment>
    )
}

export default EmptyCart