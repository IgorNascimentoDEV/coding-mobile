import React, {useContext} from "react";
import { View, Text, Alert } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { ListItem, Avatar } from "react-native-elements";
import { Button, Icon } from 'react-native-elements';
import ReceitasContext from "../context/ReceitasContext";


export default (props) => {

  const { state } = useContext(ReceitasContext)

  function confirmUserDeletio(receita){
      Alert.alert('Excluir receita', 'Deseja excluir a receita?',[
        {
          text:'Sim',
          onPress(){
            console.warn('delete', + receita.id)
          }
        },
        {
          text:'Não'
        }
      ])
  }

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
        <Button
        onPress={() => confirmUserDeletio(receita)}
        type="clear"
        icon={<Icon name="delete" size={35} color="red" />}
      />
      </ListItem>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        keyExtractor={(receita) => receita.id.toString()}
        data={state.receitas}
        renderItem={getReceitaItem}
      />
    </View>
  );
};
