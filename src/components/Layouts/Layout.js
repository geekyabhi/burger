import React, { Component } from 'react'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import Aux from '../../hoc/Auxi/auxi'
import classes from './Layout.module.css'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout extends Component{

    state={
        showSideDrawer:true
    }

    sideDrawerClosedHandler=()=>{
        this.setState({showSideDrawer:false})
    }

    sideDrawerToggleHandler=()=>{
        this.setState((prevState)=>{
            return {showSideDrawer:!prevState.showSideDrawer}
        })
    }


    render(){
        return(        
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}></Toolbar>
                <SideDrawer closed={this.sideDrawerClosedHandler} open={this.state.showSideDrawer}></SideDrawer>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout