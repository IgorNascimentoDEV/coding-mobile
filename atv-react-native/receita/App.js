import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ReceitaList from './src/view/ReceitaList';
import ReceitaForm from './src/view/ReceitaForm';
import { Button, Icon } from 'react-native-elements';

const Stack = createStackNavigator();

export default props => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouterName="ReceitaList" screenOptions={screenOptions}>
                <Stack.Screen
                    name="ReceitaList"
                    component={props => <ReceitaList {...props} />}
                    options={({ navigation }) => {
                        return {
                            title: "Lista de Receitas",
                            headerRight: () => (
                                <Button
                                    onPress={() => navigation.navigate('ReceitaForm')}
                                    type='clear'
                                    icon={<Icon name="add" size={35} color='white' />}
                                />
                            )
                        }
                    }}
                />

                <Stack.Screen
                    name="ReceitaForm"
                    component={ReceitaForm}
                    options={{
                        title: "Formulário de Receitas"
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const screenOptions = {
    headerStyle: {
        backgroundColor: '#f4511e'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold'
    }
}
