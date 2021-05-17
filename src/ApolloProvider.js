import React from 'react'
import App from './App'
import ApolloClient from 'apollo-client'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {createHttpLink} from 'apollo-link-http'
import {ApolloProvider} from '@apollo/react-hooks'
import { setContext } from "@apollo/client/link/context";

const authLink = setContext(()=>{
    const token = localStorage.getItem('jwtToken');
    return{
        headers : {
            Authorization : token ? `Bearer ${token}` : ''
        }
    }
})

const httpLink = createHttpLink({
    uri:'https://peaceful-retreat-27995.herokuapp.com/'
})

const client = new ApolloClient({
    link:authLink.concat(httpLink),
    cache:new InMemoryCache()
})

export default (
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
)