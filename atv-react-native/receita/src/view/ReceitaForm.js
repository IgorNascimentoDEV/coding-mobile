import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import ReceitasContext from '../context/ReceitasContext';

const CadastroReceita = ({ route, navigation }) => {
  const [receita, setReceita] = useState(route.params ? route.params : {});
  const { createReceita, updateReceita } = useContext(ReceitasContext);

  const salvarReceita = async () => {
    try {
      const response = await fetch('http://localhost:3000/receita/', {
        method: receita.id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(receita),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar receita');
      }

      const data = await response.json();

      if (receita.id) {
        updateReceita(data);
      } else {
        createReceita(data);
      }

      navigation.goBack();
    } catch (error) {
      console.log(error);
      // Lógica para tratamento de erro
    }
  };

  return (
    <View style={styles.form}>
      <Text>Título:</Text>
      <TextInput
        style={styles.input}
        value={receita.titulo}
        onChangeText={(titulo) => setReceita({ ...receita, titulo })}
      />

      <Text>Ingredientes:</Text>
      <TextInput
        style={styles.textArea}
        value={receita.ingredientes}
        onChangeText={(ingredientes) => setReceita({ ...receita, ingredientes })}
        multiline
      />

      <Text>Instruções:</Text>
      <TextInput
        style={styles.textArea}
        value={receita.instrucoes}
        onChangeText={(instrucoes) => setReceita({ ...receita, instrucoes })}
        multiline
      />

      <Text>URL da imagem:</Text>
      <TextInput
        style={styles.input}
        value={receita.img}
        onChangeText={(img) => setReceita({ ...receita, img })}
      />

      <Button title="Salvar" onPress={salvarReceita} />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    padding: 15,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
  },
});

export default CadastroReceita;
