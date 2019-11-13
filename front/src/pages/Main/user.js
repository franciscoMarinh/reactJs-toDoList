import React, { Component } from 'react'
//import Components

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import CreateTask from './createTask'

//import redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toggleFormTask } from '../../actions'


class User extends Component{
    toggleCreateTask = () => {
        const { toggleFormTask } = this.props
        toggleFormTask(true)
    }
    render(){
        const { userData, enableForm }  = this.props
        const { name } = userData

        let createTask
        if(enableForm) createTask = <CreateTask></CreateTask>
        return (
            <div>
                <Card>
                    <Card.Body>
                        <Card.Title>Olá: {name}</Card.Title>
                        <Card.Text>Bem vindo ao seu gerenciador de tarefas</Card.Text>
                    </Card.Body>
                    <Button variant="outline-info" onClick={this.toggleCreateTask}>Criar nova tarefa</Button>
                </Card>
                {createTask}
            </div>
        )
    }
}
const mapStateToProps = store => ({
    userData: store.mainReducer.userData,
    enableForm: store.mainReducer.enableForm
})

const mapActionToProps = dispatch => (
    bindActionCreators({ toggleFormTask }, dispatch)
)


export default connect(mapStateToProps,mapActionToProps)(User)