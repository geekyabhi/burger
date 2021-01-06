import React from 'react'
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const controls=[
    {label:'Salad',type:'salad'},
    {label:'Bacon',type:'bacon'},
    {label:'Cheese',type:'cheese'},
    {label:'Meat',type:'meat'},
]

const buildControls=(props)=>(
    <div className={classes.BuildControls}>
        <p>Curent price : <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map((control)=>{
            return <BuildControl 
                        key={control.label} 
                        label={control.label} 
                        added={()=>props.ingredientAdded(control.type)}
                        removed={props.ingredientRemoved.bind(this,control.type)}
                        disabled={props.disabled[control.type]}>
                    </BuildControl>
        })}
        <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}
        >ORDER NOW</button>
    </div>
)

export default buildControls