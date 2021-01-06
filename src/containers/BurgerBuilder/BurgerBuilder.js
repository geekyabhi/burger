import React, { Component } from 'react'
import Aux from '../../hoc/auxi'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const INGREDIENTS_PRICES={
    salad:0.5,
    bacon:0.7,
    meat:1.3,
    cheese:0.4
}

class BurgerBuilder extends Component {
    
    state={
        ingredients:{
            salad:0,
            bacon:0,
            meat:0,
            cheese:0
        },
        totalPrice:4
    }

    addIngredientHandler=(type)=>{
        const oldCount=this.state.ingredients[type]
        const updatedCount=oldCount+1
        const updatedIngredients={
            ...this.state.ingredients
        }
        updatedIngredients[type]=updatedCount
        const priceAddition=INGREDIENTS_PRICES[type]
        const oldPrice=this.state.totalPrice
        const newPrice=oldPrice+priceAddition
        this.setState({totalPrice:newPrice,ingredients:updatedIngredients}) 
    }

    removeIngredientHandler=(type)=>{

    }

    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}></Burger>
                <BuildControls ingredientAdded={this.addIngredientHandler}></BuildControls>
            </Aux>
        )
    }
}

export default BurgerBuilder
