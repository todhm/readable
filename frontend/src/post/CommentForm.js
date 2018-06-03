import React from 'react'
import {ThumbUp,ThumbDown,Edit,Delete,AddCircleOutline} from '@material-ui/icons';
import {Card,CardHeader,CardMedia,CardContent,
    CardActions,Grid,Button,Paper,TextField,Typography} from '@material-ui/core'

const CommentForm =({handleSubmit, formName, handleCommentForm,
     body, author, isAdd})=>
        <Card>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <Grid container>
                        <Grid item sm={3} xs={3}>
                            {isAdd?
                                <TextField
                                autoFocus
                                margin="dense"
                                id="author"
                                label="Author"
                                name="author"
                                type="text"
                                fullWidth
                                />:
                            <TextField
                                autoFocus
                                margin="dense"
                                id="author"
                                label="Author"
                                name="author"
                                type="text"
                                value={author}
                                fullWidth
                                />
                            }
                        </Grid>
                        <Grid item sm={8} xs={8}/>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} sm={12}>
                            <TextField
                              autoFocus
                              margin="dense"
                              id="body"
                              name="body"
                              label="Body"
                              type="text"
                              multiline
                              rows="3"
                              defaultValue={body}
                              fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={9} sm={9}/>
                        <Grid item xs={3} sm={3}>
                            <Button type="submit">
                                {formName}
                            </Button>
                            <Button onClick={handleCommentForm}>
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
      </Card>


export default CommentForm;
