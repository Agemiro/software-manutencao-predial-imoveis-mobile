import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Platform, View, Picker } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { StyleSheet } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../style/MainStyle';
import imovelService from '../services/ImovelService';
import { setImovel } from './CadastroSala';

export default function CadastroImovel({navigation}) {

  const [nome, setNome] = useState(null)
  const [errorNome, setErrorNome] = useState(null)
  const [endereco, setEndereco] = useState(null)
  const [errorEndereco, setErrorEndereco] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [selectedValue, setSelectedValue] = useState("SMALL_SIZE");

  const validar = () => {
    let error = false
    setErrorNome(null)
    setErrorEndereco(null)

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
          name: nome,
          address: endereco,
          immobileSize: selectedValue
        }  
        imovelService.cadastrar(data)
        .then((response) => {
          const titulo = (response.data.id) ? "Imóvel cadastrado! Agora é a vez da sala(s)." : "Erro ao cadastrar"
          alert(titulo, response.data.mensagem)  
          if(response.data.id){
            setImovel(response.data)
            navigation.reset({
              index: 0,
              routes: [{name: "Cadastro Sala"}]
            })
          }
        })
        .catch((error) => {
            // showDialog("Erro","Houve um erro inesperado", "ERRO")
            console.log(error);     
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
            <View>
              <Text>   Selecione o Tamanho do Imóvel</Text>
              <Picker
                selectedValue={selectedValue}
                style={{ height: 70, width: 170 }}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
              >
                <Picker.Item label="Pequeno" value="SMALL_SIZE" />
                <Picker.Item label="Médio" value="MID_SIZE" />
                <Picker.Item label="Grande" value="LARGE_SIZE" />
              </Picker>
            </View>
    
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