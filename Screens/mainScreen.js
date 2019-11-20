import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Button, FlatList, Image, TouchableOpacity} from 'react-native'
import PRODUCTS from '../models/dummy-data'
import {connect} from 'react-redux'
import {cartItems} from '../store/action'
import { Ionicons } from '@expo/vector-icons';

const MainScreen = (props) => {
    const [cart, setCart] = useState(false)
    const [cartItems, setCartItems] = useState([])

    const addItems = (item) => {
    setCart(true)
    item.count = 1;
    setCartItems(cartItems => cartItems.concat(item))
    }
    const refreshFunction = (value) => {
        setCartItems([...value])
    }

     const {navigation} = props
     useEffect(() => { 
            navigation.setParams({ 
                headerRight: cart === true ? <TouchableOpacity onPress={() => navigation.navigate('Cart', {refresh: refreshFunction})}><Ionicons name="ios-cart" size={32} style={{marginRight: 10}}/></TouchableOpacity> : null
            }) 
        }, [cart])

        useEffect(() => { 
            console.log(cartItems)
            let newArr = cartItems
            for(let i=0; i< newArr.length; i++){
              for(let j=1; j < newArr.length; j++){
                if(newArr[i].id === newArr[j].id && i !== j){
                 newArr[i]['count'] = newArr[i].count + 1
                 newArr.splice(j,1)
                  j = j-1;
                }
              }
            }
            props.addCartItems(newArr)
        }, [cartItems])
        
            
    return(
        <View style={styles.container}>
           <FlatList 
           data={PRODUCTS}
           keyExtractor = {item =>item.id}
           renderItem={({item}) => {
               return(
                   <View style={styles.itemBox}>
                       <View style={styles.itemTitleBox}> 
                       <Text style={styles.itemTitle}>{item.title}</Text>
                       </View>
                       <View style={styles.imageBox}>
                           <Image 
                           source={{uri:item.imageUrl}}
                           style={{width: 400, height: 150, borderColor:"red"}}
                           resizeMode={'cover'}
                           />
                       </View>
                       <View style={styles.itemBoxFooter}>
                           <View style={{alignSelf:"stretch", flex:1}}>
                               <Button
                               title="Details"
                               onPress={() => checktheValue(props)}
                               />
                           </View>
                           <View style={{flex:1}}>
                               <Text style={{textAlign: "center", fontSize: 20}}>${item.price}</Text>
                           </View>
                           <View style={{alignSelf:"stretch", flex:1}}>
                           <Button
                               title="Cart"
                               onPress={() => addItems(item)}
                               />
                           </View>
                       </View>   
                   </View>
               )
           }}
           />
        </View>
    )
}

MainScreen.navigationOptions = ({navigation}) => {
    console.group(navigation)
    return{
        title: "Title center",
        headerRight: navigation.getParam('headerRight'),
        headerLeft:<TouchableOpacity onPress={() => navigation.openDrawer()}><Text>Menu</Text></TouchableOpacity>,
        headerTitleStyle: { 
            textAlign:"center", 
            flex:1 
        },
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    itemBox: {
        backgroundColor:"white",
        borderTopColor:"black",
        height: 200,
        borderColor: 'black',
        width:"100%",
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 20
    },
    itemTitleBox :{
        backgroundColor: 'black',
        width: "100%",
        padding: 2
    },
    itemTitle:{
        color: 'white',
        textDecorationLine: "underline",
        fontSize: 20,
        alignSelf: 'center'
    }, 
    imageBox:{  
        borderColor:'green',
        marginTop: 5,
    },
    itemBoxFooter:{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignSelf:"center"
    }
  });
