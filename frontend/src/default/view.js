import React, { Component,Fragment } from 'react';
import PropTypes from 'prop-types'
import {connect } from 'react-redux'
import {getCategories,getPosts} from '../default/action';
import CategoryPost from './CategoryPost';
import Category from '../category/view'
import Grid from  '@material-ui/core/Grid';


class Default extends Component {

     componentDidMount(){
         this.props.getCategory()
         this.props.getPost()
     }



      render() {
          const { categoryList,postList } = this.props;

          return (
              <Grid container>
                  {Object.keys(categoryList).map(name=>(
                      <Grid item xs={4} key={name}>
                          <CategoryPost
                              categoryObj={categoryList[name]}
                              postList={Object.keys(postList)
                                  .map(id=>postList[id])
                                  .filter((post)=>post.category===name)}
                              key={name}
                              />
                      </Grid>
                  ))}
            </Grid>


        );
      }
    }

const mapStateToProps=({DataCenterReducer})=>{
    return {
        ...DataCenterReducer,
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        getCategory:()=>dispatch(getCategories()),
        getPost:()=>dispatch(getPosts()),

    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Default);
