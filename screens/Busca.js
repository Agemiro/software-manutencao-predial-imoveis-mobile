import * as React from 'react';
import { Text, View } from 'react-native';
import usuarioService from '../services/UsuarioService';

export default function Busca() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Tela de busca de produtos e serviços</Text>
    </View>
  );
}

async function test() {
  let user = await usuarioService.getUser();
  alert(user.password);
}
