import * as React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import usuarioService from '../services/UsuarioService';
import { Alert } from 'react-native';

export default function Perfil({navigation}) {
  const logout =  (navigation) => {
    usuarioService.setUser("");
      navigation.reset({
        index: 0,
        routes: [{name: "Login"}]
      });
    }
  // (navigation) => {
  //   try {
      
  //   } catch (error) {
  //     console.log(error)
  //     Alert.alert("Erro ao sair")
  //   }
  //     AsyncStorage.setItem("USER","").then(() => {
  //     }).catch((error) => {
  //     })
  // }
  const user = usuarioService.getUser();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Nome: {}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Cargo: {}</Text>
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
          onPress={() => logout(navigation)}
        />
    </View>
  );
}