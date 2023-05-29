import React from "react";
import { View, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import receitas from "../view/data/Receitas";
import { ListItem, Avatar } from "react-native-elements";
import { Button, Icon } from 'react-native-elements';


export default (props) => {
  function getActions(receita) {
    console.log('tá funcionando va descansar workarround na veia!!')
    props.navigation.navigate("ReceitaForm", receita)
  }

  function getReceitaItem({ item: receita }) {
    return (
      <ListItem
        key={receita.id}
        bottomDivider
        onPress={() => props.navigation.navigate("ReceitaForm", receita)}
      >
        <Avatar source={{ uri: receita.img }} />
        <ListItem.Content>
          <ListItem.Title>{receita.titulo}</ListItem.Title>
        </ListItem.Content>
        <Button
        onPress={() => getActions(receita)}
        type="clear"
        icon={<Icon name="edit" size={35} color="orange" />}
      />
      </ListItem>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        keyExtractor={(receita) => receita.id.toString()}
        data={receitas}
        renderItem={getReceitaItem}
      />
    </View>
  );
};
