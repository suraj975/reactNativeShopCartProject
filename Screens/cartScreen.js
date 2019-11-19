import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, Button, FlatList, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import {cartItems} from '../store/action'


const CartScreen = (props) => {
  const [updateCart, setupdateCart] = useState(props.cart)
  const [totalAmount, settotalAmount] = useState(0)
   const cart = updateCart
  const addItemsCount = (id) => {
      let newValue = cart.map(obj => {
        if(obj.id !== id) return obj 
        return {...obj, count: obj.count + 1}
      })
      setupdateCart(newValue)
   }

   const deleteItemsCount = (id) => {
    let newValue = cart.filter(obj => {
      if(obj.id !== id) return obj
    })
    setupdateCart(newValue)
   }

   useEffect(() => {
    props.addCartItems(updateCart)
    if(cart.length < 0){
    props.navigation.state.params.refresh(updateCart)
    }
    settotalAmount(Math.floor(updateCart.reduce((acc, curr) => {
    return acc + (curr.price * curr.count)
       }, 0)))
   }, [updateCart])

   console.log(totalAmount)
   if(cart.length === 0){
     return <View><Text>Cart is empty!!!!</Text></View>
   } else{
    return(
      <View>
        <View style={styles.totalBox}>
          <Text styles={{fontSize: 30}}>Total Items Worth</Text>
          <Text>US $ {totalAmount}</Text>
        </View>
        <View>
            <FlatList 
           data = {cart}
           extraData={updateCart}
           keyExtractor = {(item, index) => item + index }
           renderItem= {({item}) => {
           return(<View style={styles.flatListmainBox}>
                    <View>
                    <TouchableOpacity onPress= {() => addItemsCount(item.id)}><Ionicons name="ios-add-circle" size={24}/></TouchableOpacity>  
                    </View>
                    <View>
                    <Text>{item.count}</Text>
                    </View>
                    <View>
                    <Text>{item.title}</Text>
                    </View>
                    <View>
                    <Text>{item.price}</Text>
                    </View>
                    <View>
                    <TouchableOpacity onPress= {() => deleteItemsCount(item.id)}><Ionicons name="ios-trash" size={24}/></TouchableOpacity> 
                    </View> 
                </View>
            )
            }}
            />
        </View>
        </View>
    )
   }
}

const mapStateToProps = (state) => {
    return {
    data: state.shopreducer.value,
    cart: state.shopreducer.cart
  }}
const mapDispatchToProps = (dispatch) => {
    return {
        addCartItems: (item) => dispatch(cartItems(item)),

      }
    } 
  
    const styles = StyleSheet.create({
      totalBox: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding:10,
        backgroundColor: "green",
        fontSize: 20,
        color: "white"
      },
      flatListmainBox: {
        flexDirection: "row",
        fontSize: 18,
        padding: 10,
        justifyContent: "space-around",
        alignContent:"stretch",
        textAlign: "left",
        flex:1
      }
    })

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen)
