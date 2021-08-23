import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Platform } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Button, CheckBox, Input, Text } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../style/MainStyle';

export default function CadastroProduto({navigation}) {

  const [nome, setNome] = useState(null)
  const [errorNome, setErrorNome] = useState(null)
  const [preco, setPreco] = useState(null)
  const [errorPreco, setErrorPreco] = useState(null)
  const [isLoading, setLoading] = useState(false)

  const validar = () => {
    let error = false
    //setErrorNome(null)
    //setErrorPreco(null)

    if (nome == null){
        setErrorNome("Preencha o nome do Produto")
        error = true
    }

    if (preco == null){
        setErrorPreco("Preencha o valor do produto!")
        error = true
    }
    return !error //Retorna false
  }

  const salvar = () => {
      if (validar()){
        setLoading(true)
        
        let data = {
          name: nome,
          price: preco
        }  
        Alert.alert("Produto " + data.name + " cadastrado! ")
        navigation.reset({
          index: 0,
          routes: [{name: "Principal"}]
        })
        setLoading(false)
      }
  }

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS == "ios" ? "padding" : "height"}
    style={[styles.container, specificStyle.specificContainer]}>

        <ScrollView style={{width: "100%"}}>
            <Text h4>Cadastrar Produto</Text>
            <Input
                placeholder="Digite o nome"
                onChangeText={value => setNome(value)}
                errorMessage={errorNome}
            />
            <Input
                placeholder="Digite o valor do produto"
                keyboardType="number-pad"
                onChangeText={value => setPreco(value)}
                errorMessage={errorPreco}
            />
    
    { isLoading && 
      <Text>Carregando...</Text>
    }

    { !isLoading && 
      <Button
        title="Cadastrar"
        buttonStyle={specificStyle.button }
        onPress={() => salvar()}
      />
    }

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const specificStyle = StyleSheet.create({
  specificContainer: {
    backgroundColor: "#b0c4de",
    padding: 10
  },
  button: {

    marginTop: '10%',
    width: '100%',
    borderRadius: 5,
    backgroundColor: "#008000"
  }
})