import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer'
import MainScreen from '../Screens/mainScreen';
import DetailScreen from '../Screens/detailScreen';
import CartScreen from '../Screens/cartScreen';

const MainNavigator = createStackNavigator({
  Home: {screen: MainScreen},
  Detail: {screen: DetailScreen},
  Cart : {screen: CartScreen}
},
{   defaultNavigationOptions: {
        title:"Items",
        headerStyle: {
        backgroundColor: 'red',
           },
    headerTintColor: 'white' 
    }
});

const Drawer = createDrawerNavigator({
  Startscreen : {screen : MainNavigator}
})

export default createAppContainer(Drawer);