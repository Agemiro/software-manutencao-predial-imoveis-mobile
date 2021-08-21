import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Platform } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Button, CheckBox, Input, Text } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInputMask } from 'react-native-masked-text';
import { Button as PaperButton, Provider, Dialog, Paragraph, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomDialog from '../components/CustomDialog';
import styles from '../style/MainStyle';
import usuarioService from '../services/UsuarioService';
import { Picker } from 'react-native';

export default function Cadastro({navigation}) {

  const [email, setEmail] = useState(null)
  const [nome, setNome] = useState(null)
  const [cpf, setCpf] = useState(null)
  const [senha, setSenha] = useState(null)
  const [telefone, setTelefone] = useState(null)
  const [errorEmail, setErrorEmail] = useState(null)
  const [errorNome, setErrorNome] = useState(null)
  const [errorCpf, setErrorCpf] = useState(null)
  const [errorTelefone, setErrorTelefone] = useState(null)
  const [errorSenha, setErrorSenha] = useState(null)
  const [isLoading, setLoading] = useState(false)

  const [visibleDialog, setVisibleDialog] = useState(false);
  const [titulo, setTitulo] = useState(null)
  const [mensagem, setMensagem] = useState(null)
  const [tipo, setTipo] = useState(null)
  const [selectedValue, setSelectedValue] = useState(null);

  let cpfField = null
  let telefoneField = null
  
  const validar = () => {
    let error = false
    setErrorEmail(null)
    setErrorCpf(null)
    setErrorSenha(null)
    
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!re.test(String(email).toLowerCase())){
      setErrorEmail("Preencha seu e-mail corretamente")
      error = true
    }
   // if (!cpfField.isValid()){
     // setErrorCpf("Preencha seu CPF corretamente")
    ////  error = true
    //}
    if (telefone == null){
      setErrorTelefone("Preencha seu telefone corretamente")
      error = true
    }
    if (senha == null){
      setErrorSenha("Preencha a senha")
      error = true
    }
    return !error
  }

  const salvar = () => {
      if (validar()){
        setLoading(true)
        
        let data = {
          email: email,
          cpf: cpf,
          nome: nome,
          telefone: telefone,
          senha: senha
        }
        
        usuarioService.cadastrar(data)
        .then((response) => {
          setLoading(false)
          //const titulo = (response.data.status) ? "Sucesso" : "Erro"
         // showDialog(titulo, response.data.mensagem, "SUCESSO")
          //Alert.alert(titulo, response.data.mensagem)          
        })
        .catch((error) => {
          setLoading(false)
          showDialog("Erro","Houve um erro inesperado", "ERRO")
          //Alert.alert("Erro", "Houve um erro inesperado")
        })
      }
  }

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS == "ios" ? "padding" : "height"}
    style={[styles.container, specificStyle.specificContainer]}
    keyboardVerticalOffset={80}>
      <ScrollView style={{width: "100%"}}>
      <Text h4>Cadastrar Usuário</Text>
      <Input
        placeholder="E-mail"
        onChangeText={value => {
            setEmail(value)
            setErrorEmail(null)
        }}
        keyboardType="email-address"
        errorMessage={errorEmail}        
        />
    
      <Input
        placeholder="Nome"
        onChangeText={value => setNome(value)}
        errorMessage={errorNome}
        />
    
    <View style={styles.containerMask}>
    <TextInputMask
      placeholder="CPF"
      type={'cpf'}
      value={cpf}
      onChangeText={value => {
        setCpf(value)
        setErrorCpf(null)
      }}
      keyboardType="number-pad"
      returnKeyType="done"      
      style={styles.maskedInput}
      ref={(ref) => cpfField = ref}
      />      
    </View>
    <Text style={styles.errorMessage}>{errorCpf}</Text>

    <View style={styles.containerMask}>
    <TextInputMask
      placeholder="Telefone"
      type={'cel-phone'}
      options={{
        maskType: 'BRL',
        withDDD: true,
        dddMask: '(99) '
      }}
      value={telefone}
      onChangeText={value => {
          setTelefone(value)
          setErrorTelefone(null)
        }
      }
      keyboardType="phone-pad"  
      returnKeyType="done"    
      style={styles.maskedInput}
      ref={(ref) => telefoneField = ref}
      />      
    </View>
    <Text style={styles.errorMessage}>{errorTelefone}</Text>

    <View>
      <Text>   Selecione o cargo/função</Text>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 70, width: 170 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Gerente" value="gerente" />
        <Picker.Item label="Chefe de setor" value="chefe" />
        <Picker.Item label="Prestador" value="prestador" />
      </Picker>
    </View>

    <Input
        placeholder="Senha"
        onChangeText={value => setSenha(value)}
        errorMessage={errorSenha}
        secureTextEntry={true}
        />
    
    { isLoading && 
      <Text>Carregando...</Text>
    }

    { !isLoading && 
      <Button
        icon={
          <Icon
            name="check"
            size={15}
            color="white"
          />
        }
        title="Salvar"
        buttonStyle={specificStyle.button}
        onPress={() => salvar()}
      />
    }

    { visibleDialog && 
      <CustomDialog titulo={titulo} mensagem={mensagem} tipo={tipo} visible={visibleDialog} onClose={hideDialog}></CustomDialog>
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
    width: "100%",
    marginTop: 10,
    borderRadius: 5
  }
})