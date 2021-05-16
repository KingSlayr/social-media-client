import moment from 'moment';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import {Card, Label, Icon, Image, Button, Popup} from 'semantic-ui-react';
import { AuthContext } from '../context/auth';
import DeleteButton from './DeleteButton';
import LikeButton from './LikeButton';

function PostCard({post:{body,createdAt,id,username,likeCount,commentCount,likes}}) {

    const {user} = useContext(AuthContext);

    return (
        <Card fluid>
            <Card.Content>
            <Image
                floated='right'
                size='mini'
                src='https://react.semantic-ui.com/images/avatar/large/molly.png'
            />
            <Card.Header>{username}</Card.Header>
            <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow()}</Card.Meta>
            <Card.Description>
                {body}
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeButton user={user} post={{id,likes,likeCount}}/>
                <Popup
                    content='Click to comment'
                    inverted
                    trigger={
                        <Button labelPosition='right' as={Link} to={`/posts/${id}`} style={{margin:'0.1em'}}>
                            <Button color='blue' basic>
                                <Icon name='comments' />
                            </Button>
                            <Label basic color='teal' pointing='left'>
                                {commentCount}
                            </Label>
                        </Button>
                    }
                    />
                {user&&user.username===username && (
                    user && user.username===username && (<DeleteButton postID={id}/>)
                )}
            </Card.Content>
      </Card>
    )
}

export default PostCard