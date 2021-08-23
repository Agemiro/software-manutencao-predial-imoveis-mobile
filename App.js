import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/Login';
import PrincipalADM from './screens/PrincipalADM';
import PrincipalGerente from './screens/PrincipalGerente';
import PrincipalChefeSetor from './screens/PrincipalChefeSetor';
import PrincipalPrestador from './screens/PrincipalPrestador';
import Cadastro from './screens/CadastroUsuario';
import CadastroProduto from './screens/CadastroProduto';
import CadastroServico from './screens/CadastroServico';
import CadastroImovel from './screens/CadastroImovel';
import CadastroSala from './screens/CadastroSala';
import CadastroEmpresa from './screens/CadastroEmpresa';
import CadastroFornecedor from './screens/CadastroFornecedor';
import CadastroOrdemServico from './screens/CadastroOrdemServico';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Principal ADM" component={PrincipalADM} />
      <Stack.Screen name="Principal Gerente" component={PrincipalGerente} />
      <Stack.Screen name="Principal Chefe de Setor" component={PrincipalChefeSetor} />
      <Stack.Screen name="Principal Prestador" component={PrincipalPrestador} />
      <Stack.Screen name="Cadastro Usuario" component={Cadastro} />
      <Stack.Screen name="Cadastro Imovel" component={CadastroImovel} />
      <Stack.Screen name="Cadastro Sala" component={CadastroSala} />
      <Stack.Screen name="Cadastro Produto" component={CadastroProduto} />
      <Stack.Screen name="Cadastro Servico" component={CadastroServico} />
      <Stack.Screen name="Cadastro Empresa" component={CadastroEmpresa} />
      <Stack.Screen name="Cadastro Fornecedor" component={CadastroFornecedor} />
      <Stack.Screen name="Cadastro Ordem de Servico" component={CadastroOrdemServico} />

    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}