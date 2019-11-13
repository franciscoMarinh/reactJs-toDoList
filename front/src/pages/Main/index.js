import React, { Component } from 'react'
//import Styles and bootstrap
import "./styles.css"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// import api and redux
import { connect } from 'react-redux'
import { setUserData, setUserTasks, updateUserTasks} from '../../actions'
import { bindActionCreators } from 'redux'
import { api } from '../../services'
//import Redirect and Components 
import { Redirect } from 'react-router-dom'
import User from './user'
import Tasks from './tasks'


class Main extends Component{
    state = {
        redirect: false
    }
    componentDidMount(){
        const { updateUserTasks } = this.props
        updateUserTasks(this.getTasksData)
        this.getUserData()
        this.getTasksData()
    }
    getUserData = async () => {
        const { token , setUserData} = this.props
        if(token){
            try {
                let result = await api.get('/user',{
                    headers: { Authorization: "Bearer " + token }
                })
                setUserData(result.data)
    
            } catch (error) {

            }
        }else{
            this.setState({redirect: true})
        }
        
    }
    getTasksData = async () => {
        const { token , setUserTasks} = this.props
        if(token){
            try {
                let result = await api.get('/tasks',{
                    headers: { Authorization: "Bearer " + token }
                })
                setUserTasks(result.data)
    
            } catch (error) {
                
            }
        }else{
            this.setState({redirect: true})
        }
        
    }
    render(){
        const { redirect } = this.state

        return (
            <Container id="container">
                {redirect ? <Redirect to="/" />: null}
                <Row>
                    <Col xs={4}>
                        <User></User>
                    </Col>
                    <Col xs={8}>
                        <Tasks></Tasks>
                    </Col>
                </Row>
            </Container>
        )
    }
}
const mapStateToProps = store => ({
    token: store.mainReducer.token,
    createTask: store.mainReducer.createTask,
    enableForm: store.mainReducer.enableForm
})
const mapActionToProps = dispatch => (
    bindActionCreators({ setUserData, setUserTasks, updateUserTasks }, dispatch)
)


export default connect(mapStateToProps,mapActionToProps)(Main)