import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './style/MainStyle';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/Login';
import Principal from './screens/Principal';
import Cadastro from './screens/CadastroUsuario';
import CadastroProduto from './screens/CadastroProduto';
import CadastroServico from './screens/CadastroServico';
import CadastroEmpresa from './screens/CadastroEmpresa';
import CadastroFornecedor from './screens/CadastroFornecedor';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from './util/Config';
import CadastroImovel from './screens/CadastroImovel';
import CadastroSala from './screens/CadastroSala';
import CadastroOrdemServico from './screens/CadastroOrdemServico';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Principal" component={Principal} />
      <Stack.Screen name="CadastroUsuario" component={Cadastro} />
      <Stack.Screen name="CadastroImovel" component={CadastroImovel} />
      <Stack.Screen name="CadastroSala" component={CadastroSala} />
      <Stack.Screen name="CadastroProduto" component={CadastroProduto} />
      <Stack.Screen name="CadastroServico" component={CadastroServico} />
      <Stack.Screen name="CadastroEmpresa" component={CadastroEmpresa} />
      <Stack.Screen name="CadastroFornecedor" component={CadastroFornecedor} />
      <Stack.Screen name="CadastroOrdemServico" component={CadastroOrdemServico} />
    </Stack.Navigator>
  );
}

function defineInterceptor(){
  axios.interceptors.response.use(response => {
    return response
  }, err => {
    return new Promise((resolve, reject) => {
      const originalReq = err.config
      if (err.response.status == 401 && err.config && !err.config._retry){
        originalReq._retry = true
        AsyncStorage.getItem("TOKEN").then((token) => {
          let res = axios.put(`${Config.API_URL}token/refresh`, {oldToken: token})
          .then((res) => {
            AsyncStorage.setItem("TOKEN", res.data.access_token)
            originalReq.headers["Authorization"] = `Bearer ${res.data.access_token}`
            return axios(originalReq)
          })
          resolve(res)
        })
      }else{
        reject(err)
      }
    })
  })
}

export default function App() {
  
  defineInterceptor()

  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}