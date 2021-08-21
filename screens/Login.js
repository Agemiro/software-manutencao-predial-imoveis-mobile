import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View, Image } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import usuarioService from '../services/UsuarioService';
import styles from '../style/MainStyle';
import Principal from './Principal';

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
      Principal(data.name);
      navigation.reset({
        index: 0,
        routes: [{name: "Principal"}]
      })
    })
    .catch((error) => {
      Alert.alert("Usuário não existe")
    })
  }

  const cadastrar = () => {
    navigation.navigate("CadastroImovel")
  }

  return (
    
    <View style={[styles.container, specificStyle.specificContainer]}>

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
          
          <Button
            icon={
              <Icon
                name="user"
                size={15}
                color="white"
              />
            }
            title="Cadastrar"
            buttonStyle={specificStyle.button}
            onPress={() => cadastrar()}
          />
    </View>
 
  );
}

//estilo especifico para a tela de login
const specificStyle = StyleSheet.create({
  specificContainer: {
    backgroundColor: "#b0c4de", //cor de fundo da tela de login
    borderColor: "#fffafa",
    borderWidth: 3,
    borderStyle: "solid"
  },
  button: {
    textAlign: 'center',
    width: "100%",
    marginTop: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  }
})