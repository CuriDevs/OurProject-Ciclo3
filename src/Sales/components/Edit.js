import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from '../styles/Table.css';
import { api } from '../../utils/api';
import React, { useState, useEffect } from "react";

function Edit({ venta, setConsulta, users}) {

    const userList = {_id: venta.idVendedor, UserName: '',Documento: 0};

    const res = () =>{
        const userData = users.filter(item => item._id === venta.idVendedor);
        userList.UserName = userData.map(item => item.UserName)[0]; 
        userList.Documento = userData.map(item => item.Documento)[0]; 
        }
        res();

    const [ show, setShow ] = useState(false);

    const [ list, setList ] = useState({
        idProduct: venta.idProduct,
        vTotal: venta.vTotal,
        amount: venta.amount,
        price: venta.price,
        dateV: venta.dateV,
        state: venta.state,
        idClient: venta.idClient,
        nameC: venta.nameC,
        Documento: venta.Documento,
    });
    
    //escucha el cambio de los inputs
    const handleInputtAdd = (e) => {
        if (e.target.value === '' || e.target.value === 0) {
            console.log('No se ingreso un nuevo valor');
        } else {
            //cambiamos el estado
            setList({
                ...list,
                [ e.target.name ]: e.target.value
            }
            );
        }
    };

    const editVenta = () => {
        updateVentas(list);
        setShow(false);
    };

    const updateVentas = async (list) => {
        await api.ventas.edit(venta,list);
        //alert("Se actualizo la venta: " + venta._id);
        setConsulta(true);
    };

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <>
            <Button variant="primary" onClick={ handleShow } className="BotonTable">
                <img src="https://img.icons8.com/ios-glyphs/30/ffffff/edit--v1.png" />
            </Button>{ ' ' }
            <Modal show={ show } onHide={ handleClose } size="lg" dialogClassName="modal-60w">
                <Modal.Header closeButton>
                    <Modal.Title>Modificación de venta</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>
                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label>Identificador</Form.Label>
                            <Form.Control size="sm" type="number" readOnly placeholder={ venta._id }
                                onChange={ handleInputtAdd }
                                name="idSales"
                            />
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={ Col } controlId="formGridVenta">
                                <Form.Label>Valor venta</Form.Label>
                                <Form.Control size="sm" type="number" readOnly placeholder={ list.amount * list.price }
                                    onChange={ handleInputtAdd }
                                    name="vTotal"
                                />
                            </Form.Group>

                            <Form.Group as={ Col } controlId="formGridCantidad">
                                <Form.Label>Cantidad</Form.Label>
                                <Form.Control size="sm" type="number" placeholder={ list.amount }
                                    onChange={ handleInputtAdd }
                                    name="amount"
                                />
                            </Form.Group>

                            <Form.Group as={ Col } controlId="formGridPrecio">
                                <Form.Label>Precio Unitario</Form.Label>
                                <Form.Control size="sm" type="number" placeholder={ list.price }
                                    onChange={ handleInputtAdd }
                                    name="price"
                                />
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3" controlId="formGridFecha">
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control size="sm" readOnly placeholder={ list.dateV } />
                        </Form.Group>

                        <Row className="mb-3">

                            <Form.Group as={ Col } controlId="formGridNombre">
                                <Form.Label>Nombre Cliente</Form.Label>
                                <Form.Control size="sm" type="text" placeholder={ venta.nameC } />
                            </Form.Group>

                            <Form.Group as={ Col } controlId="formGridDocumento">
                                <Form.Label>Numero Documento</Form.Label>
                                <Form.Control size="sm" type="number" placeholder={ venta.Documento } />
                            </Form.Group>
                            
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={ Col } controlId="formGridVendedor">
                                <Form.Label>Vendedor</Form.Label>
                                <Form.Control size="sm" type="text" readOnly placeholder={ userList.UserName } />
                            </Form.Group>

                            <Form.Group as={ Col } controlId="formGridEstado">
                                <Form.Label>Estado</Form.Label>
                                <Form.Select size="sm" defaultValue="Choose..." onChange={ handleInputtAdd } name="state">
                                    <option>Choose...</option>
                                    <option>Entregada</option>
                                    <option>En proceso</option>
                                    <option>Cancelada</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={ handleClose }>
                        Close
                    </Button>
                    <Button variant="success" onClick={ editVenta } >
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Edit;