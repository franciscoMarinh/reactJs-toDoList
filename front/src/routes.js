import { Switch, Route, BrowserRouter} from 'react-router-dom'
import React from 'react'
import Login from './pages/Login'
import Main from './pages/Main'

export const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Login}></Route>
            <Route exact path='/main' component={Main}></Route>
        </Switch>
    </BrowserRouter>
)
