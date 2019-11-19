import React from 'react'
import {View, Text, StyleSheet, Button, FlatList, TouchableOpacity, Image} from 'react-native'
import {connect} from "react-redux"
const DetailScreen = (props) => {
    const itemValue = props.data.filter(item => {
        if(item.id === props.navigation.state.params.itemType){
            return item
        }
    })
    const [item] = itemValue
    return(
        <View>
        <View style={styles.imageBox}>
        <Image 
        source={{uri:item.imageUrl}}
        style={{width: 400, height: 150, borderColor:"red"}}
        resizeMode={'cover'}
        />
        </View>
        <View>
        <Text>{item.price}</Text>
        </View>
        <View>
        <Text>{item.description}</Text>
        </View>
        <View>
            <TouchableOpacity onPress={() => {props.navigation.navigate("Cart")}}><Text>Cart</Text></TouchableOpacity>
        </View>
        </View>
        )
}

const mapStateToProps = (state) => {
    return {
    data: state.shopreducer.value,
    cart: state.shopreducer.cart
  }}
const mapDispatchToProps = (dispatch) => {
    return {
        addCartItems: (newArr) => dispatch(cartItems(newArr)),

      }
    } 

    const styles = StyleSheet.create({
        imageBox:{  
            borderColor:'green',
            marginTop: 5,
        },
    })

    export default connect(mapStateToProps,mapDispatchToProps)(DetailScreen)