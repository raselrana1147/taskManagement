import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch,Route,} from "react-router-dom";
import Header from './layouts/Header'
import Footer from './layouts/Footer'
import { Container } from 'react-bootstrap';
import Home from './layouts/pages/Home'
import About from './layouts/pages/About'
import ProjectList from './layouts/pages/project/ProjectList'
import CreateProject from './layouts/pages/project/CreateProject'
import ProjectView from './layouts/pages/project/ProjectView'
import { PUBLIC_PATH } from './Constant';
import Register from './layouts/pages/auth/Register';
import Login from './layouts/pages/auth/Login';
import { CheckAuthenticated } from './services/AuthService';
import AuthenticateRoutes from './AuthenticateRoutes';

class App extends React.Component{

    state={
        PUBLIC_PATH:"/myTask/",
        user:{},
        isLoggedIn:false
    }

    componentDidMount=()=>{
           
                console.log('Auth', CheckAuthenticated())
                if(CheckAuthenticated()){
                    this.setState({
                        user:CheckAuthenticated(),
                        isLoggedIn:true
                    })
                } 
    }
   
    render(){
        return(
        
            <Router>
              <Header  authInfo={this.state}/>

              <Container>
           
                <Switch>
                    <Route path={`${PUBLIC_PATH}about`} exact={true} component={About} />

                    {/* private routes */}

                    <AuthenticateRoutes
                          authed={this.state.isLoggedIn}
                          path={`${PUBLIC_PATH}projectList`}
                          component={ProjectList}
                      />

                       <AuthenticateRoutes
                          authed={this.state.isLoggedIn}
                          path={`${PUBLIC_PATH}create/project`}
                          component={CreateProject}
                      />


                    <AuthenticateRoutes
                          authed={this.state.isLoggedIn}
                          path={`${PUBLIC_PATH}view/project/:id`}
                          component={ProjectView}
                      />

                    {/* end private routes */}

                    <Route path={`${PUBLIC_PATH}register`} exact={true} component={Register} /> 

                    <Route path={`${PUBLIC_PATH}login`} exact={true} component={Login} /> 

                    <Route path={`${PUBLIC_PATH}`} exact={true} component={Home} />
                    
                </Switch>
             </Container>
           
            <Footer />
          </Router>
        
        )
    }
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
