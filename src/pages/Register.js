import React, { useContext, useState } from 'react'
import {Form,Button} from 'semantic-ui-react';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import { useForm } from '../utils/hooks';
import { AuthContext } from '../context/auth';

function Register(props) {
    const context = useContext(AuthContext)
    const [errors, setErrors] = useState({})

    const {onChange,onSubmit,Values} = useForm(registerUser,{
        username:'',
        email:'',
        password:'',
        confirmPassword:''
    })

    const [addUser,{loading}] = useMutation(REGISTER_USER,{
        update(_,{data:{register:userData}}){
            context.login(userData)
            props.history.push('/')
        },
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables:Values
    })

    function registerUser(){
        addUser();
    }


    return (
        <div className='form-container'>
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Register</h1>
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
                    label='Email'
                    placeholder='Email...'
                    name='email'
                    value={Values.email}
                    error={errors.email ? true : false}
                    onChange={onChange}
                    type='email'
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
                <Form.Input
                    label='Confirm Password'
                    placeholder='Confirm Password...'
                    name='confirmPassword'
                    value={Values.confirmPassword}
                    error={errors.confirmPassword ? true : false}
                    onChange={onChange}
                    type='password'
                />
                <Button type='submit' Primary>
                    Register
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

const REGISTER_USER = gql`
    mutation register(
        $username : String!
        $email : String!
        $password : String!
        $confirmPassword : String!
    ){
        register(
            registerInput:{
                username : $username
                email : $email
                password : $password
                confirmPassword : $confirmPassword
            }
        ){
            id email username token createdAt
        }
    }
`

export default Register
