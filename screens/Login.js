import React, { useState } from 'react';
import { Alert, StyleSheet, View, Image, ImageBackground } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import usuarioService from '../services/UsuarioService';
import styles from '../style/MainStyle';
import { ScrollView } from 'react-native-gesture-handler';

export default function Login({navigation}) {

  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  const entrar = () => {

    let data = {
      email: email,
      password: password
    }
    
    /*usuarioService.login(data)
    .then((response) => {
      Principal(data.name);*/
      let telaCargo = usuarioService.retornaTipoCargo(data.email);
      if(telaCargo != null){
        navigation.reset({
          index: 0,
          routes: [{name: telaCargo}]
        })
      }else{
        Alert.alert("Usuário não existe")
      }
   /* })
    .catch((error) => {
      Alert.alert("Usuário não existe")
    })*/
  }

  /*const cadastrar = () => {
    navigation.navigate("CadastroUsuario")
  }*/

  return (
    
    <View style={[styles.container, specificStyle.specificContainer]}>
       <Image 
        source = {require('../src/assets/logo.png')}
      />

          <Input
            placeholder="Digite seu email"
            leftIcon={{ type: 'font-awesome', name: 'envelope' }}
            onChangeText={value => setEmail(value)}
            keyboardType="email-address"
          />
          <Input
            placeholder="Digite sua senha"
            leftIcon={{ type: 'font-awesome', name: 'lock' }}
            onChangeText={value => setPassword(value)}
            secureTextEntry={true}
            />

            <Button
              icon={
                <Icon
                  name="check"
                  size={15}
                  color="white"
                />
              }
              title="Entrar"
              buttonStyle={specificStyle.button}
              onPress={() => entrar()}
            />
    </View>
 
  );
}

//estilo especifico para a tela de login
const specificStyle = StyleSheet.create({
  specificContainer: {
    flex: 1,
    backgroundColor: "#b0c4de", //cor de fundo da tela de login
    borderColor: "#fffafa",
    borderWidth: 3,
    borderStyle: "solid",
    padding: 10
  },
  button: {
      marginTop: '10%',
      width: '100%',
      borderRadius: 5,
      backgroundColor: "#008000"
  }
})