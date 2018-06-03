import React,{Fragment,Component} from 'react'
import {Button,Card,ListItemText} from  '@material-ui/core';
import {ArrowDownward,ArrowUpward} from '@material-ui/icons';
import {ThumbUp,ThumbDown} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import LittlePost from './LittlePost';


export default class extends Component{

    state={desc:false}

    handleArrow=(e)=>{
        this.setState(({desc})=>(
            {desc:!desc}
            )
        )
    }

    render(){
        const {desc} = this.state;
        const {postList,sortMethod}= this.props;
        const sortedPostList = sortMethod? postList.sort((a,b)=>
            desc?b[sortMethod] -a[sortMethod]:a[sortMethod] -b[sortMethod]):postList

        return (
        <Fragment>
            {sortMethod?
                [desc?
                <Button onClick={this.handleArrow}>
                    <ArrowUpward />
                </Button>
                :<Button onClick={this.handleArrow}>
                    <ArrowDownward/>
                </Button>]
                :null
            }

            <Card>
                {sortedPostList.map(post=>(
                    typeof post.title==='string'&& !post.deleted?
                    <LittlePost
                        title={post.title}
                         postId={post.id}
                         key={post.id}
                         voteScore={post.voteScore}
                         voteUp={post.votedUp}
                         voteDown={post.votedDown}
                         commentList={post.commentList}
                         />
                    :null
                ))}
            </Card>
        </Fragment>
        )
    }
}
