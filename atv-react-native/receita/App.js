import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ReceitaList from './src/view/ReceitaList';
import ReceitaForm from './src/view/ReceitaForm';
 
const Stack = createStackNavigator();

export default props => {
    return(
        <NavigationContainer>
            <Stack.Navigator
                initialRouterName="ReceitaList">

                <Stack.Screen
                    name="ReceitaList"
                    component={ReceitaList}
                />

                <Stack.Screen
                    name="ReceitaForm"
                    component={ReceitaForm}
                />

            </Stack.Navigator>
        </NavigationContainer>
    )
}