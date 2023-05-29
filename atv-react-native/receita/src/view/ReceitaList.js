import React from 'react';
import { View, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import receitas from '../view/data/Receitas'

export default props => {

    function getReceitaItem({item}){
        return (
            <ListItem
            leftAvatar={{ source: { uri: item.img } }}
            key={item.id}
            title={item.titulo}
            bottomDivider
       
            />
            )
    }

    return(
        <View>
            <FlatList
                keyExtractor={ receita => receita.id.toString()}
                data={receitas}
                renderItem={getReceitaItem}
            />
        </View>
    )
}