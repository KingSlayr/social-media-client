import React, { useContext } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import { Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthContext, AuthProvider } from './context/auth';
import AuthRoute from './utils/authRoute';
import SinglePost from './pages/SinglePost';

function App() {
  const {user} = useContext(AuthContext)
  console.log(user);
  return (
    <AuthProvider>
      <Container>
        <Router>
          <MenuBar/>
          <Route exact path='/' component={Home}/>
          <AuthRoute exact path='/login' component={Login}/>
          <AuthRoute exact path='/register' component={Register}/>
          <Route exact path='/posts/:postID' component={SinglePost} />
        </Router>
      </Container>
    </AuthProvider>
  );
}

export default App;
