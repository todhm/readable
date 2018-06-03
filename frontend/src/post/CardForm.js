import React from 'react'
import {ThumbUp,ThumbDown,Edit,Delete,AddCircleOutline} from '@material-ui/icons';
import {DefaultStyles} from '../utils/styles'
import { withStyles } from '@material-ui/core/styles';
import {Card,CardHeader,CardMedia,CardContent,
    CardActions,Grid,Button,Tooltip,Paper,Avatar,Typography} from '@material-ui/core'
const CardForm =({classes,handleThumbUp,handleThumbDown,handleEdit,
    thumbUpColor,thumbDownColor,handleDeletePost,title,
    timeString,body,author,buttonDisabled,voteScore,isPost})=>
        <Card className={isPost?classes.postForm:classes.commentForm}>
            <CardContent>
                <Grid container>
                    <Grid item  sm={3} xs={3}>
                        <Avatar aria-label="Category" className={
                                isPost?classes.avatar:classes.commentAvatar}>
                          {author}
                        </Avatar>
                    </Grid>
                    <Grid item sm={7} xs={7}>
                        <Typography >
                          {title}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            {timeString}
                        </Typography>
                    </Grid>
                    <Grid item sm={1} xs={1}>
                        <Tooltip title="VoteUp">
                            <Button disabled={buttonDisabled} onClick={handleThumbUp}>
                                <ThumbUp nativeColor={thumbUpColor}/>
                            </Button>
                        </Tooltip>
                        <Typography >
                          VoteScore: {voteScore}
                        </Typography>
                    </Grid>
                    <Grid item sm={1} xs={1}>
                        <Tooltip title="VoteDown">
                            <Button disabled={buttonDisabled} onClick={handleThumbDown}>
                                <ThumbDown nativeColor={thumbDownColor} / >
                            </Button>
                        </Tooltip>
                    </Grid>
                </Grid>
            </CardContent>
            <CardContent>
              <Typography component="p" className={classes.expand}>
                  {body}
              </Typography>
            </CardContent>
            <CardActions>
                <Grid container>
                    <Grid item sm={10} xs={10}/>
                    <Grid item sm={2} xs={2}>
                        <Tooltip title="Edit">
                            <Button size="small" onClick={handleEdit}>
                              <Edit/>
                            </Button>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <Button size="small" onClick={handleDeletePost}>
                              <Delete/>
                            </Button>
                        </Tooltip>
                    </Grid>
                </Grid>
          </CardActions>
      </Card>


export default withStyles(DefaultStyles)(CardForm);
