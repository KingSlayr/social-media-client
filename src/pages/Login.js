import React, { useContext, useState } from 'react'
import {Form,Button} from 'semantic-ui-react';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import { useForm } from '../utils/hooks';
import { AuthContext } from '../context/auth';

function Login(props) {
    const context = useContext(AuthContext)
    const [errors, setErrors] = useState({})

    const {onChange,onSubmit,Values} = useForm(loginUserCallback,{
        username:'',
        password:'',
    })

    const [loginUser,{loading}] = useMutation(LOGIN_USER,{
        update(_,{data:{login:userData}}){
            console.log(userData);
            context.login(userData);
            props.history.push('/')
        },
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables:Values
    })

    function loginUserCallback() {
        loginUser();
    }

    return (
        <div className='form-container'>
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Login</h1>
                <Form.Input
                    label='Username'
                    placeholder='Username...'
                    name='username'
                    value={Values.username}
                    error={errors.username ? true : false}
                    onChange={onChange}
                    type='text'
                />
                <Form.Input
                    label='Password'
                    placeholder='Password...'
                    name='password'
                    value={Values.password}
                    error={errors.password ? true : false}
                    onChange={onChange}
                    type='password'
                />
                <Button type='submit' Primary>
                    Login
                </Button>
            </Form>
            {
                Object.keys(errors).length>0 && (
                    <div className='ui error message'>
                        <ul className='list'>
                            {Object.values(errors).map(value =>(
                                <li key={value}> {value} </li>
                            ))}
                        </ul>
                    </div>
                )
            } 
        </div>
    )
}

const LOGIN_USER = gql`
    mutation login(
        $username : String!
        $password : String!
    ){
        login(username : $username password : $password){
            id email username token createdAt
        }
    }
`

export default Login
