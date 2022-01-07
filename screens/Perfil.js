import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import usuarioService from '../services/UsuarioService';

class Perfil extends Component {
  state = {
    user: this.getUser(),
  }

  async getUser() {
      await usuarioService.getUser()
      .then((response) => {
          this.setState({
              user: response,
          })
      })
      .catch((error) => {
        console.log(error);     
    });
  } 

  logout() {
    this.props.navigation.reset({
        index: 0,
        routes: [{name: "Login"}]
    })
  }

  render() {
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#b0c4de" }}>
      <Text style={specificStyle.textTitle}>Perfil</Text>
      <Image style={ {marginTop: 10, marginBottom:20}} source={require('../src/assets/perfil.png')} />
      <Text style={specificStyle.text}>Nome: {this.state.user.name}</Text>
      <Text style={specificStyle.text}>Email: {this.state.user.email} </Text>
      <Text style={specificStyle.text}>CPF: {this.state.user.cpf}</Text>
      <Text style={specificStyle.text}>Cargo: {this.state.user.job}</Text>
      <Text style={specificStyle.text}>Telefone: {this.state.user.fone}</Text>
      <View>
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
            onPress={() => this.logout()}
          />
      </View>
    </View>
    );
  }
}


export default function perfil({navigation}) {
  return (
    <Perfil navigation={navigation}></Perfil>
  );
}
const specificStyle = StyleSheet.create({
  button: {
      marginTop: '10%',
      width: '100%',
      borderRadius: 5,
      backgroundColor: "#ff0000",
      justifyContent: 'center'
  },
  textTitle: {
    fontSize: 25,
  },
  text: {
    fontSize: 18,
  }
})
