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
  const [titulo, setTitulo] = useState(servico.title)
  const [errorTitulo, setErrorTitulo] = useState(null)
  const [descricao, setDescricao] = useState(servico.description)
  const [errorDescricao, setErrorDescricao] = useState(null)
  const [orcamento, setOrcamento] = useState(null)
  const [errorOrcamento, setErrorOrcamento] = useState(null)
  const [prazo, setPrazo] = useState(null)
  const [errorPrazo, setErrorPrazo] = useState(null)
  const [isLoading, setLoading] = useState(false)
  
  let prazoField = null
  const validar = () => {
    let error = false
    setErrorOrcamento(null)
    setErrorTitulo(null)
    setErrorDescricao(null)

    if (titulo == null){
        setErrorTitulo("Preencha o título do servico")
        error = true
    }

    if (descricao == null){
        setErrorDescricao("Descreva o serviço")
        error = true
    }

    if (!prazoField.isValid()) {
      setErrorPrazo("Adicione a data limite para o término do servico")
      error = true
    }

    if (orcamento == null) {
      setErrorOrcamento("Adicione orçamento do servico")
      error = true
    }
    return !error //Retorna false
  }

  const salvar = () => {
      if (validar()){
        setLoading(true)
        let data = {
          id: servico.id,
          room: servico.room,
          title: titulo,
          description: descricao,
          budget: orcamento,
          term: prazo,
          state: "Executando",
          manager: user
        }  
        servicoService.cadastrar(data)
        .then((response) => {
            const titulo = (response.data.id) ? "Serviço cadastro com sucesso" : "Erro ao cadastrar"
            alert(titulo)  
            navigation.reset({
                index: 0,
                routes: [{name: "Principal Gerente"}]
            })        
        })
        .catch((error) => {
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
            <Text h4 style={{paddingBottom:25}}>Cadastrar Serviço</Text>
            <Text h4 style={{paddingBottom:5, color:'#000080'}}>Nome do Imóvel: {servico.room.immobile.name}</Text>
            <Text h4 style={{paddingBottom:30, color:'#000080'}}>Endereço do Imóvel: {servico.room.immobile.address}</Text>
            <Text h4 style={{paddingBottom:30, color:'#000080'}}>Andar da Sala: {servico.room.floor}</Text>
            <Input
              style={styles.input}
              value={titulo}
              placeholder="Digite o título"
              onChangeText={value => setTitulo(value)}
              errorMessage={errorTitulo}
            />
            <Input
              value={descricao}
              placeholder="Descrição do servico"
              onChangeText={value => setDescricao(value)}
              errorMessage={errorDescricao}
            />
            <Input
                placeholder="Digite orçamento do serviço"
                keyboardType="number-pad"
                onChangeText={value => setOrcamento(value)}
                errorMessage={errorOrcamento}
            />
            <View style={styles.containerMask}>
            <TextInputMask 
                placeholder="Prazo Limite"
                type= {"datetime"}
                value={prazo}
                options={{
                  format: 'DD/MM/YYYY'
                }} 
                onChangeText={value => {
                    setPrazo(value)
                    setErrorPrazo(null)
                }}
                keyboardType="number-pad"
                returnKeyType="done"      
                style={styles.maskedInput}
                ref={(ref) => prazoField = ref}
            />
            </View>
            <Text style={styles.errorMessage}>{errorPrazo}</Text>
            
    
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

export function receberServico(item){
  servico = item;
}