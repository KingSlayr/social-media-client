import React, { useContext, useRef, useState } from 'react'
import gql from 'graphql-tag';
import {useMutation, useQuery} from '@apollo/react-hooks';
import { Button, Card, CardContent, CardDescription, CardHeader, CardMeta, Form, Grid, Icon, Image, Label } from 'semantic-ui-react';
import moment from 'moment';
import LikeButton from '../components/LikeButton';
import { AuthContext } from '../context/auth';
import DeleteButton from '../components/DeleteButton';

export default function SinglePost(props) {
    const postID = props.match.params.postID;
    const {user} = useContext(AuthContext);
    const commentInputRef = useRef(null);
    let postMarkup;

    const [comment, setComment] = useState('')

    const {data: { getPost } = {}} = useQuery(FETCH_POST_QUERY,{
        variables:{
            postID
        }
    });

    const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION,{
        update(){
            setComment('')
            commentInputRef.current.blur();
        },
        variables:{
            postID,
            body:comment
        }
    })

    function deletePostCallback() {
        props.history.push('/')
    }

    if(!getPost){
        postMarkup = <div className="ui active inline loader"></div>
    }else{
        const {id,body,createdAt,username,likes,comments,likeCount,commentCount} = getPost;
        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image
                            src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                            size='small'
                            float='right'
                        />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card>
                            <Card.Content>
                                <CardHeader>{username}</CardHeader>
                                <CardMeta>{moment(createdAt).fromNow()}</CardMeta>
                                <CardDescription>{body}</CardDescription>
                            </Card.Content>
                            <hr/>
                            <CardContent extra>
                                <LikeButton user={user} post={{id,likes,likeCount}}/>
                                <Button labelPosition='right' as='div'>
                                    <Button color='blue' basic>
                                        <Icon name='comments' />
                                    </Button>
                                    <Label basic color='teal' pointing='left'>
                                        {commentCount}
                                    </Label>
                                </Button>
                                {
                                    user && user.username===username && (<DeleteButton postID={id} callback={deletePostCallback}/>)
                                }
                            </CardContent>
                        </Card>
                        {user&&(
                            <Card fluid>
                                <Card.Content>
                                    <p>Post a Comment</p>
                                    <Form>
                                        <div className='ui action input fluid'>
                                            <input
                                                type='text'
                                                placeholder='Comment..'
                                                name='comment'
                                                value={comment}
                                                onChange={event=>setComment(event.target.value)}
                                                ref={commentInputRef}
                                            />
                                            <button 
                                                type='submit'
                                                className='ui button teal'
                                                disabled={comment.trim()===''}
                                                onClick={submitComment}
                                                >Submit</button>
                                        </div>
                                    </Form>
                                </Card.Content>
                            </Card>
                        )}
                        {comments.map(comment=>(
                            <Card fluid key={comment.id}>
                                <Card.Content>
                                    {user&& user.username === comment.username &&(
                                        <DeleteButton postID={id} commentID={comment.id} />
                                    )}
                                    <Card.Header>{comment.username}</Card.Header>
                                    <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                                    <Card.Description>{comment.body}</Card.Description>
                                </Card.Content>
                            </Card>
                        ))}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

    return postMarkup
}

const SUBMIT_COMMENT_MUTATION = gql`
    mutation($postID:ID!,$body:String!){
        createComment(postID:$postID,body:$body){
            id
            comments{
                id username createdAt body
            }
            commentCount
        }
    }
`

const FETCH_POST_QUERY = gql`

    query($postID:ID!){
        getPost(postID:$postID){
            id body createdAt username likeCount
            likes{
                username
            }
            commentCount
            comments{
                id
                username
                createdAt
                body
            }
        }
    }

`