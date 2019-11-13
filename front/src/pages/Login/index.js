import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { api } from '../../services'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import { setToken } from '../../actions'
import { bindActionCreators } from 'redux'
import { Redirect } from 'react-router-dom'

class Login extends Component{
    state = {
        redirect: false
    }
    componentDidMount(){
        this.getLocalStorage()
    }
    sendData = async e => {
        const { setToken } = this.props
        e.preventDefault()
        let email = document.querySelector('[type="email"]').value
        let password = document.querySelector('[type="password"]').value
        if(email && password){
            try {
                let result = await api.post('/token',{email, password})
                let { token } = result.data
                setToken(token)
                this.setState({redirect: true})
                localStorage.token = token

            } catch (error) {
                console.log(error)
            }
            
        }
    }
    getLocalStorage(){
        const { setToken } = this.props
        if(localStorage.token){
            setToken(localStorage.token)
            this.setState({redirect: true})
        }

    }

    render(){
        const { redirect } = this.state

        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col xs lg='6'>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Endereço E-mail</Form.Label>
                                <Form.Control type="email" placeholder="Escreva seu E-mail" />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Senha</Form.Label>
                                <Form.Control type="password" placeholder="Digite sua senha" />
                            </Form.Group>
                            <Button variant="primary" type="submit" onClick={this.sendData}>
                                Enviar
                            </Button>
                            {redirect ? <Redirect to="/main" />: null}
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}
const mapStateToProps = store => ({

})
const mapDispatchToProps = dispatch => (
    bindActionCreators({ setToken }, dispatch)
)

export default connect(mapStateToProps,mapDispatchToProps)(Login)