import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { api } from '../../services'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toggleFormTask, updateFormTaskData } from '../../actions'

class CreateTask extends Component{
    state = {
        title: "",
        status: "pending"
    }
    componentDidMount(){
        let { status, title } = this.props.formTaskData
        if(title && status){
            this.setState({
                status,
                title
            })
        }
    }
    componentDidUpdate(){
        
    }
    titleOnHandle = e => {
        let { value } = e.target
        this.setState({title: value})
    }
    statusOnHandle = e => {
        let { value } = e.target
        this.setState({status: value})
    }
    sendTaskData = async e => { 
        let { title, status } = this.state
        let { token, updateTasks , formTaskData, updateFormTaskData, toggleFormTask} = this.props
        let { method , tasksId} = formTaskData
        let id = ""
        if(tasksId) id = tasksId
        e.preventDefault()
        if(title && status){
            await api[method](`/tasks/${id}`,{ title, status },{
                headers: {Authorization: "Bearer " + token}
            })
            updateTasks()
            document.querySelector('form').reset()
            this.setState({
                title:"",
                status: "pending"
            })
            updateFormTaskData({method: 'post'})
            toggleFormTask(false)
        }
        
    }
    cancell = () => {
        const { toggleFormTask, updateFormTaskData } = this.props
        updateFormTaskData({method: 'post'})
        toggleFormTask(false)
    }
    render(){
        const { title, status } = this.props.formTaskData
        return (
            <div>
                <Form onSubmit={this.sendTaskData}>
                    <Form.Group>
                        <Form.Label>Insira um titulo</Form.Label>
                        <Form.Control type="text" placeholder="Titulo" onChange={this.titleOnHandle} defaultValue={title}/>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect2">
                        <Form.Label>Escolhe o status da tarefa</Form.Label>
                        <Form.Control as="select" onChange={this.statusOnHandle} defaultValue={status}>
                        <option>pending</option>
                        <option>inProgress</option>
                        <option>finish</option>
                        </Form.Control>
                    </Form.Group>
                    <Button variant="outline-primary" type="submit">{title ? "Atualizar" : "Criar"}</Button>
                    <Button variant="outline-danger" onClick={this.cancell}>Cancelar</Button>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = store => ({
    token: store.mainReducer.token,
    updateTasks: store.mainReducer.updateTasks,
    formTaskData: store.mainReducer.formTaskData
})

const mapActionToProps = dispatch => (
    bindActionCreators({ toggleFormTask, updateFormTaskData}, dispatch)
)

export default connect(mapStateToProps, mapActionToProps)(CreateTask)