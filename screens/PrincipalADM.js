import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Perfil from './Perfil';
import CadastrarDoADM from './CadastrarDoADM';
import Relatorios from './Relatorios';

const Tab = createBottomTabNavigator();

export default function PrincipalADM({navigation}){

  return (
    
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#000080',
      }}
    >
      <Tab.Screen
        name="CadastrarDoADM"
        component={CadastrarDoADM}
        options={{
          tabBarLabel: 'Cadastrar',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus-circle" color={color} size={size} />
          ),
        }}
      />
    <Tab.Screen
        name="Relatorios"
        component={Relatorios}
        options={{
          tabBarLabel: 'Ver Relatórios',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="eye" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>

  );

}
