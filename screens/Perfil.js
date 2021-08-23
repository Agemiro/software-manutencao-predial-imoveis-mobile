import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import usuarioService from '../services/UsuarioService';
import { Alert } from 'react-native';

export default function Perfil({navigation}) {
    const logout = (navigation) => {
       // AsyncStorage.setItem("TOKEN","").then(() => {
            navigation.reset({
                index: 0,
                routes: [{name: "Login"}]
            })
       /* }).catch((error) => {
            console.log(error)
            Alert.alert("Erro ao sair")
        })*/
    }

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#b0c4de" }}>
        <Text>Perfil</Text>
        <Button
            icon={
              <Icon
                name="check"
                size={15}
                color="white"
              />
            }
            title="Sair"
            buttonStyle={specificStyle.button}
            onPress={() => logout(navigation)}
          />
      </View>
    );
  }
  const specificStyle = StyleSheet.create({
    button: {
        marginTop: '10%',
        width: '100%',
        borderRadius: 5,
        backgroundColor: "#ff0000"
    }
  })
