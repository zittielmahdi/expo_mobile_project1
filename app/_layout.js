import App from "./Scanner"
import { createStackNavigator } from '@react-navigation/stack';

const Stack=createStackNavigator()

const RootLayout=()=>{

    return(
     <Stack.Navigator screenOptions={{headerShown:false}}>
       <Stack.Screen name="Scanner" component={App}/>
     </Stack.Navigator>
    )

}

export default RootLayout