import React, { useState } from 'react'
import gql from 'graphql-tag';
import { Button, Confirm, Icon, Popup } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { FETCH_POSTS_QUERY } from '../utils/graphql';

function DeleteButton({postID,commentID,callback}) {
    const [confirmOpen, setConfirmOpen] = useState(false)

    const mutation = commentID?DELETE_COMMENT_MUTATION:DELETE_POST_MUTATION;

    const [deletePostOrComment] = useMutation(mutation,{
        update(proxy){
            setConfirmOpen(false)
            
            if(!commentID){
                const data = proxy.readQuery({
                    query : FETCH_POSTS_QUERY
                })
                // data.getPosts = data.getPosts.filter(p=>p.id!==postID)
                proxy.writeQuery({
                    query:FETCH_POSTS_QUERY,
                    data:{
                        getPosts: data.getPosts.filter(p=>p.id!==postID)
                    }
                })
            }
            if(callback) callback()
        },
        variables:{
            postID,
            commentID
        }
    })

    return (
        <Popup
            content="click to delete"
            inverted
            trigger={
                <div className='deleteButton'>
                    <Button as='div' color='red' onClick={()=> setConfirmOpen(true)}  style={{margin:'0.1em'}}>
                        <Icon name='trash' style={{margin:0}}/>
                    </Button>
                    <Confirm 
                        open={confirmOpen}
                        onCancel={()=>setConfirmOpen(false)}
                        onConfirm={deletePostOrComment}
                    />
                </div>
            }
        />
    )
}

const DELETE_POST_MUTATION = gql`
    mutation deletePost(
        $postID : ID!
    ){
        deletePost(postID : $postID)
    }
`
const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment(
        $postID : ID!,
        $commentID : ID!
    ){
        deleteComment(postID : $postID,commentID : $commentID){
            id comments{
                id username createdAt body 
            }
            commentCount
        }
    }
`
export default DeleteButton
