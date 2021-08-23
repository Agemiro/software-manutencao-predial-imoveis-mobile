import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Platform } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Button, CheckBox, Input, Text } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../style/MainStyle';

export default function CadastroImovel({navigation}) {

  const [titulo, setTitulo] = useState(null)
  const [errorTitulo, setErrorTitulo] = useState(null)
  const [descricao, setDescricao] = useState(null)
  const [errorDescricao, setErrorDescricao] = useState(null)
  const [isLoading, setLoading] = useState(false)
  
  let prazoField = null
  const validar = () => {
    let error = false

    if (titulo == null){
        setErrorTitulo("Preencha o titulo da ordem servico")
        error = true
    }

    if (descricao == null){
        setErrorDescricao("Descrição do serviço a ser realizado ")
        error = true
    }
    return !error //Retorna false
  }

  const salvar = () => {
      if (validar()){
        setLoading(true)
        
        let data = {
          title: titulo,
          description: descricao
        }  
        Alert.alert("Ordem de Serviço cadastrado: "+data.titulo)
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
            <Text h4>Cadastrar Ordem de Serviço</Text>
            <Input
                placeholder="Digite o título"
                onChangeText={value => setTitulo(value)}
                errorMessage={errorTitulo}
            />
            <Input
                placeholder="Descrição da ordem servico"
                onChangeText={value => setDescricao(value)}
                errorMessage={errorDescricao}
            />
    
    { isLoading && 
      <Text>Carregando...</Text>
    }

    { !isLoading && 
      <Button
        title="Salvar"
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