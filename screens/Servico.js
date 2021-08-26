import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Platform } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput, Input, Text } from 'react-native-elements';
import { TextInputMask } from 'react-native-masked-text';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../style/MainStyle';
import usuarioService from '../services/UsuarioService';
import servicoService from '../services/ServicoService';

let servico = null;
let user;

const getUser = () => {
  usuarioService.getUser()
  .then((response) => {
    user = response;
  })
  .catch((error) => {
    console.log(error);     
});
}

export default function CadastroServico({navigation}) {
  getUser();

  const [isLoading, setLoading] = useState(false);

  const solicitarProduto = () => {
     navigation.navigate("EstoquePrestador");
  }

  const finalizar = () => {
    setLoading(true)
    let data = {
      id: servico.id,
      room: servico.room,
      title: servico.title,
      description: servico.description,
      budget: servico.budget,
      term: servico.term,
      state: "Finalizado",
      manager: servico.manager
    }  
    servicoService.cadastrar(data)
    .then((response) => {
        const titulo = (response.data.id) ? "Serviço finalizado com sucesso" : "Erro ao finalizar o servico"
        alert(titulo)  
        navigation.reset({
            index: 0,
            routes: [{name: "Principal Prestador"}]
        })        
    })
    .catch((error) => {
        console.log(error);     
    })
    setLoading(false)
  }

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS == "ios" ? "padding" : "height"}
    style={[styles.container, specificStyle.specificContainer]}>

        <ScrollView style={{width: "100%"}}>
            <Text h4 style={{paddingBottom:25}}>Detalhes do Serviço</Text>
            <Text h4 style={{paddingBottom:5, color:'#000080'}}>Nome do Imóvel: {servico.room.immobile.name}</Text>
            <Text h4 style={{paddingBottom:30, color:'#000080'}}>Endereço do Imóvel: {servico.room.immobile.address}</Text>
            <Text h4 style={{paddingBottom:30, color:'#000080'}}>Andar da Sala: {servico.room.floor}</Text>
            <Text h4 style={{paddingBottom:10, color:'#000080'}}>Título: {servico.title}</Text>
            <Text h4 style={{paddingBottom:10, color:'#000080'}}>Descrição: {servico.description}</Text>
            <Text h4 style={{paddingBottom:10, color:'#000080'}}>Prazo: {servico.term}</Text>
            
    
            { isLoading && 
            <Text>Carregando...</Text>
            }

            { !isLoading && 
            <Button
                title="Solicitar Produto"
                buttonStyle={specificStyle.button }
                onPress={() => solicitarProduto()}
            />
            }
            { isLoading && 
              <Text>Carregando...</Text>
              }
  
              { !isLoading && 
              <Button
                  title="Finalizar Servico"
                  buttonStyle={specificStyle.button }
                  onPress={() => finalizar()}
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

export function setServico(item){
  servico = item;
}