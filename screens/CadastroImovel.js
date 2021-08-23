import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Platform } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { StyleSheet } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../style/MainStyle';

export default function CadastroImovel({navigation}) {

  const [nome, setNome] = useState(null)
  const [errorNome, setErrorNome] = useState(null)
  const [endereco, setEndereco] = useState(null)
  const [errorEndereco, setErrorEndereco] = useState(null)
  const [isLoading, setLoading] = useState(false)

  const validar = () => {
    let error = false
    //setErrorNome(null)
    //setErrorEndereco(null)

    if (nome == null){
        setErrorNome("Preencha o nome do imóvel")
        error = true
    }

    if (endereco == null){
        setErrorEndereco("Preencha o endereço do imóvel")
        error = true
    }
    return !error //Retorna false
  }

  const salvar = () => {
      if (validar()){
        setLoading(true)
        
        let data = {
          nome: nome
        }  
        Alert.alert("Imóvel cadastrado! Agora é a vez da sala(s).")
        navigation.reset({
          index: 0,
          routes: [{name: "Cadastro Sala"}]
        })
        setLoading(false)
      }
  }

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS == "ios" ? "padding" : "height"}
    style={[styles.container, specificStyle.specificContainer]}>

        <ScrollView style={{width: "100%"}}>
            <Text h4>Cadastrar Imóvel</Text>
            <Input
                placeholder="Digite o nome"
                onChangeText={value => setNome(value)}
                errorMessage={errorNome}
            />
            <Input
                placeholder="Digite o endereço"
                onChangeText={value => setEndereco(value)}
                errorMessage={errorEndereco}
            />
    
    { isLoading && 
      <Text>Carregando...</Text>
    }

    { !isLoading && 
      <Button
        title="Proximo"
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