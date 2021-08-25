import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Platform } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { StyleSheet } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../style/MainStyle';
import salaService from '../services/SalaService';

let imovel = null;

export default function CadastroSala({navigation}) {

  const [andar, setAndar] = useState(null)
  const [errorAndar, setErrorAndar] = useState(null)
  const [descricao, setDescricao] = useState(null)
  const [errorDescricao, setErrorDescricao] = useState(null)
  const [isLoading, setLoading] = useState(false)

  const validar = () => {
    let error = false

    if (andar == null){
        setErrorAndar("Preencha o número do andar da sala")
        error = true
    }

    if (descricao == null){
        setErrorDescricao("Preencha a descrição da sala")
        error = true
    }
    return !error //Retorna false
  }

  const salvar = () => {
    try {
      persist();
    } catch (error) {
      console.log(error);
    }
    navigation.reset({
      index: 0,
      routes: [{name: "Principal ADM"}]
    })   
  }

  const persist = () => {
    if (validar()){
      setLoading(true)

      let data = {
        floor: andar,
        description: descricao,
        immobile: imovel
      }
      salaService.cadastrar(data)
      .then((response) => {
          const titulo = (response.data.id) ? "Sala adicionada com sucesso" : "Erro ao cadastrar a sala"
          alert(titulo)  
      })
      .catch((error) => {
          // showDialog("Erro","Houve um erro inesperado", "ERRO")
          console.log(error); 
          throw "Nao foi possivel persistir as informacoes da sala";    
      })

      setLoading(false)
    } else {
      throw "Nao foi possivel validar os campos"
    }
  }

  const adicionarNovaSala = () => {
    try {
      persist();
    } catch (error) {
      console.log(error);
    }
    navigation.reset({
      index: 0,
      routes: [{name: "Cadastro Sala"}]
    }) 
  }

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS == "ios" ? "padding" : "height"}
    style={[styles.container, specificStyle.specificContainer]}>

        <ScrollView style={{width: "100%"}}>
            <Text h4 style={{paddingBottom:20}}>Cadastrar Sala(s) do Imóvel</Text>
            <Text h4 style={{paddingBottom:5, color:'#000080'}}>Nome do Imóvel: {imovel.name}</Text>
            <Text h4 style={{paddingBottom:30, color:'#000080'}}>Endereço do Imóvel: {imovel.address}</Text>
            <Input
                placeholder="Digite o número do andar"
                onChangeText={value => setAndar(value)}
                errorMessage={errorAndar}
            />
            <Input
                placeholder="Digite a descrição"
                onChangeText={value => setDescricao(value)}
                errorMessage={errorDescricao}
            />
    
    { isLoading && 
      <Text>Carregando...</Text>
    }

    { !isLoading && 

      <Button
        title="Salvar/Encerrar"
        buttonStyle={specificStyle.button1}
        onPress={() => salvar()}
      />
    }
    <Button
        title="Continuar adicionando sala"
        buttonStyle={specificStyle.button2}
        onPress={() => adicionarNovaSala()}
      />

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const specificStyle = StyleSheet.create({
  specificContainer: {
    backgroundColor: "#b0c4de",
    padding: 10
  },
  button1: {
    marginTop: '10%',
    width: '100%',
    borderRadius: 5,
    backgroundColor: "#008000"
  },
  button2: {
    marginTop: '10%',
    width: '100%',
    borderRadius: 5,
    backgroundColor: "#008000"
  }
})

export function setImovel(data) {
  imovel = data;
}