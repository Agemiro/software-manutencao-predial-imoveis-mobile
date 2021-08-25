import * as React from 'react';
import { Component } from "react";
import { View, Text } from "react-native";
import { FlatList, StyleSheet } from "react-native";
import { receberServico } from "./CadastroServico";
import servicoService from '../services/ServicoService';

let notificacoes = null;

const getNotificacoes = async () => { 
    servicoService.obterNotificacoes()
    .then((response) => {
        notificacoes = response.data; 
    })
    .catch((error) => {
        console.log(error);     
    });
}
getNotificacoes();

class ListItem extends Component {
    render(){
        const {item} = this.props;
        return (
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', paddingLeft:20, paddingBottom: 15}}>
                <Text style={{fontSize:20}} onPress={this.props.notificar}>{item.title}</Text>
            </View>
        );
    }
}

class BasicFlatList extends Component {
    state = {
        notificacoes
      }
    
    onPressAction = (item) => {
        receberServico(item);
        this.props.navigation.navigate("Cadastro Servico")
    }
  
    render() {
      return(
        <View style={styles.container}>
            <FlatList
                data={this.state.notificacoes}
                renderItem={({item, index}) => (
                    <ListItem 
                        item={item}
                        notificar={() => this.onPressAction(item)}
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
            />
            </View>
      );
    }
}

export default function Notificação({navigation}) {
    return (
        <BasicFlatList navigation={navigation}></BasicFlatList>
    );
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: "#b0c4de",
    paddingTop: 22
},
item: {
    padding: 10,
    fontSize: 17,
    height: 40,
},
});