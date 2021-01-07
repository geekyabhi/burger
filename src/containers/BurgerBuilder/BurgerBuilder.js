import React, { Component } from 'react'
import Aux from '../../hoc/Auxi/auxi'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
const INGREDIENTS_PRICES={
    salad:0.5,
    bacon:0.7,
    meat:1.3,
    cheese:0.4
}

class BurgerBuilder extends Component {
    
    state={
        ingredients:null,
        totalPrice:4,
        purchasable:false,
        purchasing:false,
        loading:false
    }

    componentDidMount(){
        axios.get('https://burger-362fd-default-rtdb.firebaseio.com/Ingredients.json').then(response=>{
            this.setState({ingredients:response.data})
        })
    }

    updatePurchaseState=(ingredients)=>{
        const sum=Object.keys(ingredients)
        .map(igKey=>{
            return ingredients[igKey]
        })
        .reduce((sum,el)=>{
            return sum+el
        },0)
        this.setState({purchasable:sum>0})
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
        this.updatePurchaseState(updatedIngredients)
    }

    removeIngredientHandler=(type)=>{
        const oldCount=this.state.ingredients[type]
        if(oldCount<=0){
            return
        }
        const updatedCount=oldCount-1
        const updatedIngredients={
            ...this.state.ingredients
        }
        updatedIngredients[type]=updatedCount
        const priceDeduction=INGREDIENTS_PRICES[type]
        const oldPrice=this.state.totalPrice
        const newPrice=oldPrice-priceDeduction
        this.setState({totalPrice:newPrice,ingredients:updatedIngredients}) 
        this.updatePurchaseState(updatedIngredients)
    }

    purchaseHandler=()=>{
        this.setState({purchasing:true})
    }

    purchaseCancelHandler=()=>{
        this.setState({purchasing:false})
    }

    purchaseContinueHandler=()=>{
        // alert('You Continue !!')
        this.setState({loading:true})
        const order={
            ingredients:this.state.ingredients,
            price:this.state.totalPrice,
            customer:{
                name:'Abhinav',
                address:{
                    street:'Visrat',
                    code:'242001',
                    country:'India'
                },
                email:'thakurabhinav17122001@gmail.com'
            },
            deliveryMethod:'fastest'
        }
        axios.post('/orders.json',order).then(response=>{
            this.setState({loading:false,purchasing:false})
        }).catch(e=>{
            this.setState({loading:false,purchasing:false})
        })
    }

    render() {
        const disabledInfo={
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0
        }
        let orderSummary=null
        let burger=<Spinner></Spinner>
        if(this.state.ingredients){
            burger=
                <Aux>
                    <Burger ingredients={this.state.ingredients}></Burger>
                    <BuildControls 
                                ingredientAdded={this.addIngredientHandler} 
                                ingredientRemoved={this.removeIngredientHandler}
                                disabled={disabledInfo}
                                price={this.state.totalPrice}
                                purchasable={this.state.purchasable}
                                ordered={this.purchaseHandler}
                    >    
                    </BuildControls>
                </Aux>
            orderSummary=
                        <OrderSummary 
                            ingredients={this.state.ingredients}
                            price={this.state.totalPrice}
                            purchaseCancelled={this.purchaseCancelHandler}
                            purchaseContinued={this.purchaseContinueHandler}
                        >    
                        </OrderSummary>
        }
        if(this.state.loading){
            orderSummary=<Spinner></Spinner>
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder,axios)
