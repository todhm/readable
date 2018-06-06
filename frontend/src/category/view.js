import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getCategories, getCategoryPost} from '../default/action';
import CategoryPost from '../default/CategoryPost';
import Grid from '@material-ui/core/Grid';

class Category extends Component {
    static contextTypes = {
        router: PropTypes.object
    }

    state = {
        postList: [],
        categoryName: ""
    }

    componentDidMount() {
        const pathList = this.context.router.history.location.pathname.split("/", -1);
        const categoryName = pathList[pathList.length - 1];
        this.setState({categoryName: categoryName})
        this.props.getCategoryPost(categoryName);

    }

    render() {
        const {categoryName} = this.state;
        const {categoryList, postList} = this.props;
        const category = categoryList[categoryName]
        const postArray = Object.keys(postList).map(key => postList[key]);
        return (<Grid container="container">
            {
                category
                    ? <Grid item="item" xs={12} key={category.name}>
                            <CategoryPost categoryObj={category} postList={postArray} key={category.name}/>
                        </Grid>
                    : null
            }
        </Grid>);
    }
}

const mapStateToProps = ({DataCenterReducer}) => {
    return {
        ...DataCenterReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCategoryPost: (categoryName) => dispatch(getCategoryPost(categoryName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
