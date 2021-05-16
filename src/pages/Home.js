import React, { useContext } from 'react'
import {useQuery} from '@apollo/react-hooks';
import { Grid, GridColumn, Transition } from 'semantic-ui-react'
import PostCard from '../components/PostCard';
import { AuthContext } from '../context/auth';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../utils/graphql';
import Login from './Login';

function Home() {
    const {user} = useContext(AuthContext);
    const {loading,data: { getPosts: posts } = {}} = useQuery(FETCH_POSTS_QUERY);
    if(user){
        return (user &&
            <Grid columns={3}>
                <Grid.Row className='page-title'>
                    <h1>Recent Posts</h1>
                </Grid.Row>
                <PostForm/>
                <Grid.Row>
                    {
                        loading?(
                            <div className="ui active centered inline loader"></div>
                        )
                        :(
                            <Transition.Group>
                                {posts && posts.map(post => (
                                    <Grid.Column key={post.id} style={{marginTop:'1em'}}>
                                        <PostCard post={post}/>
                                    </Grid.Column>
                                ))}
                            </Transition.Group>
                        )
                    }
                </Grid.Row>
            </Grid>
        )
    }else{
        return <Login/>
    }
}

export default Home