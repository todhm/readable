import React from 'react';
import {Dialog,DialogActions,DialogContent,Grid,DialogContentText,
    DialogTitle,TextField,Button} from  '@material-ui/core';


export default ({open,handleClose,submitForm,author,title,body}) =>
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullScreen={true}
      maxWidth="xs"
    >
        <form onSubmit={submitForm}>
          <DialogTitle id="form-dialog-title">Add Your Favorite Post</DialogTitle>
              <DialogContent>
                <TextField
                autoFocus
                margin="dense"
                id="author"
                label="Author"
                name="author"
                type="text"
                value={author}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="title"
                  name="title"
                  label="Title"
                  type="text"
                  fullWidth
                  defaultValue={title}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="body"
                  name="body"
                  label="Body"
                  type="text"
                  multiline
                  rows="15"
                  fullWidth
                  defaultValue={body}
                />
              </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Add Post
            </Button>
          </DialogActions>
      </form>
    </Dialog>
