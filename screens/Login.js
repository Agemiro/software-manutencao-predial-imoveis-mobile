import React, { useState } from 'react';
import { Alert, StyleSheet, View, Image, ImageBackground } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import usuarioService from '../services/UsuarioService';
import styles from '../style/MainStyle';

export default function Login({navigation}) {

  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  const entrar = () => {

    let data = {
      email: email,
      password: password
    }
    
    usuarioService.login(data)
    .then((response) => {
      let telaCargo = usuarioService.retornaTipoCargo(response.data.job);
      if(telaCargo != null){
        navigation.reset({
          index: 0,
          routes: [{name: telaCargo}]
        })
      }else{
        Alert.alert("Usuário não existe")
      }
    })
    .catch((error) => {
      Alert.alert("Usuário não existe")
    })
  }

  return (
    <View style={[styles.container, specificStyle.specificContainer]}>
          <Image style={ {marginTop: 100, width: 300, height:100, marginBottom:50}} source={require('../src/assets/logo.png')} />
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
            <View>
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
    justifyContent: 'flex-start',
    padding: 10
  },
  button: {
    justifyContent: 'center',
    marginTop: '10%',
    width: '100%',
    borderRadius: 10,
    backgroundColor: "#008000",
  }
})