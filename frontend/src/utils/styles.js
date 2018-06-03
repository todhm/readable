import {red,blue} from '@material-ui/core/colors';

export const DefaultStyles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  page:{
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    marginLeft:10
  },
  icon: {
    margin: theme.spacing.unit * 2,
  },
  dialog: {
    width: '80%',
    maxHeight: 700,
},
expand: {
  transform: 'rotate(0deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  marginLeft: 'auto',
},
avatar: {
  backgroundColor: red[500],
  width:"100%",
},
commentAvatar: {
  backgroundColor: blue[500],
  width:"100%",
},
thumbUp:{
    color:"black",
},
thumbDown:{
    color:"black",
},
postForm: {
  height:270,
},
commentForm: {
  height:200,
},
});
