import {
	red,
	blue
} from '@material-ui/core/colors';

const drawerWidth = 240;

export const DefaultStyles = theme => ({

	root: theme.mixins.gutters({
		paddingTop: 16,
		paddingBottom: 16,
		marginTop: theme.spacing.unit * 3,
	}),

	typography: {
		marginTop: 10,
		fontSize: 14,
	},
	bigFont: {
		marginBottom: 30,
		fontSize: 20,
	},

	page: {},

	formControl: {
		margin: theme.spacing.unit,
		minWidth: 120,
		marginLeft: 10
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
		width: "100%",
	},
	commentAvatar: {
		backgroundColor: blue[500],
		width: "100%",
	},
	thumbUp: {
		color: "black",
	},
	thumbDown: {
		color: "black",
	},
	postForm: {
		height: 270,
	},
	commentForm: {
		height: 200,
	},
	appFrame: {
		height: 100,
		zIndex: 1,
		overflow: 'hidden',
		position: 'relative',
		display: 'flex',
		width: '100%',
	},
	appBar: {
		position: 'absolute',
		transition: theme.transitions.create(['margin', 'width'], {
		  easing: theme.transitions.easing.sharp,
		  duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['margin', 'width'], {
		  easing: theme.transitions.easing.easeOut,
		  duration: theme.transitions.duration.enteringScreen,
		}),
	},
	'appBarShift-left': {
		marginLeft: drawerWidth,
	},
	'appBarShift-right': {
		marginRight: drawerWidth,
	},
	menuButton: {
		marginLeft: 12,
		marginRight: 20,
	},
	hide: {
		display: 'none',
	},
	drawerPaper: {
		width: drawerWidth,
		height:"100%",
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar,
	},
	content: {
       flexGrow: 1,
	   zIndex:4,
       backgroundColor: theme.palette.background.default,
       padding: theme.spacing.unit * 3,
       transition: theme.transitions.create('margin', {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.leavingScreen,
       }),
     },
     'content-left': {
       marginLeft: -drawerWidth,
     },
     'content-right': {
       marginRight: -drawerWidth,
     },
     contentShift: {
       transition: theme.transitions.create('margin', {
         easing: theme.transitions.easing.easeOut,
         duration: theme.transitions.duration.enteringScreen,
       }),
     },
     'contentShift-left': {
       marginLeft: 0,
   },
});
