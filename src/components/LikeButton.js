import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Icon, Label, Popup, Transition } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

export default function LikeButton({user,post:{id,likes,likeCount}}) {

    const [liked, setLiked] = useState(false)

    useEffect(()=>{
        if(user&&likes.find(like=>like.username===user.username)){
            setLiked(true)
        }else setLiked(false)
    }, [user,likes])

    const [likePost] = useMutation(LIKE_POST_MUTATION,{
        variables:{postID:id}
    })

    // function likePost(){
    //     console.log("Like");
    // }

    const likeBtn = (
        liked ? (
            <Button color='teal'>
                <Icon name='heart' />
            </Button>
        ):(
            <Button color='teal' basic>
                <Icon name='heart' />
            </Button>
        )
    )

    return (
        <Popup
            content='Click to like'
            inverted
            trigger={
                <div>
                    <Button as='div' labelPosition='right' onClick={likePost}  style={{margin:'0.1em'}}>
                        {likeBtn}
                        <Label basic color='teal' pointing='left'>
                            {likeCount}
                        </Label>
                    </Button>       
                </div>
            }
        />
    )
}

const LIKE_POST_MUTATION = gql`
    mutation likePost(
        $postID : ID!
    ){
        likePost(postID : $postID){
            id
            likes{
                id username
            }
            likeCount
        }
    }
`
