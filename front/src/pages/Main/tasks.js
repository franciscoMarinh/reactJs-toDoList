import React, { Component } from 'react'
//Boostrap Imports
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
// IMPORTS API AND REDUX
import { api } from '../../services'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateFormTaskData, toggleFormTask } from '../../actions'



class Tasks extends Component{
    state = {
        tasksId: null,
        title: null,
        status: null,

    }
    setDataState(id,title,status){
        this.setState({
            tasksId: id,
            title,
            status,
            show: false
        })
    }
    deleteTask = async () => {
        const { token, updateTasks } = this.props
        const { tasksId } = this.state
        try {
            await api.delete(`/tasks/${tasksId}`,{
                headers: {Authorization: "Bearer " + token}
            })
            updateTasks()
            this.handleClose()
        } catch (error) {
            
        }

    }
    updateData = async () => {
        const { updateFormTaskData, toggleFormTask} = this.props
        toggleFormTask(true)
        const data = this.state
        updateFormTaskData({...data, method:"put"})
    }
    handleClose = () => {
        this.setState( {show: false} )
    }
    handleShow = () => {
        this.setState( {show: true} )
    }
    render(){
        const { userTasks }  = this.props
        const { show, title, status } = this.state
        return (
            <div id="tasks">
                <Accordion defaultActiveKey="0">
                    {
                        userTasks.map((el,index) => (
                            <Card key={el.id}>
                                <Accordion.Toggle as={Card.Header} eventKey={index}>
                                {el.title}
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey={index}>
                                <Card.Body>
                                    <Row>
                                        <Col xs='9'>
                                            {`Status: ${el.status}`}
                                        </Col>
                                        <Col xs='3' onMouseOver={()=> this.setDataState(el.id,el.title,el.status)}>
                                            <Button variant="outline-info" onClick={this.updateData}>Editar</Button>
                                            <Button variant="outline-danger" onClick={this.handleShow}>Excluir</Button>
                                        </Col>
                                    </Row>
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        ))
                    }
                </Accordion>
                    <Modal show={show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{`Tem certeza que deseja excluir a tarefa: "${title}" com o status ${status}`}</Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Fechar
                        </Button>
                        <Button variant="danger" onClick={this.deleteTask}>
                            Excluir
                        </Button>
                        </Modal.Footer>
                    </Modal>
            </div>
        )
    }
}
const mapStateToProps = store => ({
    userTasks: store.mainReducer.userTasks,
    token: store.mainReducer.token,
    updateTasks:  store.mainReducer.updateTasks
})

const mapActionToProps = dispatch => (
    bindActionCreators({ updateFormTaskData, toggleFormTask }, dispatch)
)


export default connect(mapStateToProps,mapActionToProps)(Tasks)