import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Perfil from './Perfil';
import Salas from './Salas';

const Tab = createBottomTabNavigator();

export default function PrincipalChefeSetor({navigation}) {

  return (
    
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#000080',
      }}
    >
      <Tab.Screen
        name="Salas"
        component={Salas}
        options={{
          tabBarLabel: 'Notificar Serviço',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="human-greeting" color={color} size={size} />
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
