import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default ({route, navigation}) => {
    const [receita, setReceita] = useState(route.params ? route.params : {})
    return(
        <View style={style.form}>

        <Text>Título:</Text>
        <TextInput style={style.input} value={receita.titulo} onChangeText={titulo => setReceita({...receita, titulo})} />
  
     
        <Text>Ingredientes:</Text>
         <TextInput
          style={style.textArea}
          value={receita.ingredientes}
          onChangeText={ingredientes => setReceita({...receita, ingredientes})}
          multiline
        />

      <Text>Instruções:</Text>
        <TextInput
          style={style.textArea}
          value={receita.instrucoes}
          onChangeText={instrucoes => setReceita({...receita, instrucoes})}
          multiline
        />
  
        <Text>URL da imagem:</Text>
        <TextInput style={style.input} value={receita.img} onChangeText={img => setReceita({...receita, img})} />
  
        <Button title="Salvar" onPress={() => {
            navigation.goBack()
        }}  />
      </View>
    )
}

const style = StyleSheet.create({
    form:{
        padding: 15
    },
    input:{
        height: 50,
        borderColor: 'gray',
        borderWidth:1,
        marginBottom:10,
    },
    textArea: {
        height: 100,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 5
      }
})