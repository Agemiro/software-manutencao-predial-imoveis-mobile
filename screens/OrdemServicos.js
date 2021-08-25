import * as React from 'react';
import { Component } from "react";
import { Alert } from 'react-native';
import { View, Text } from "react-native";
import { FlatList, StyleSheet } from "react-native";
import { receberServico } from "./CadastroServico"

const servicos = [
    {_id:  1, nome: "Servico 1"},
    {_id:  2, nome: "Servico 1"},
    {_id:  3, nome: "Servico 1"},
    {_id:  4, nome: "Servico 1"},
    {_id:  5, nome: "Servico 1"},
    {_id:  6, nome: "Servico 1"},
    {_id:  7, nome: "Servico 1"},
    {_id:  8, nome: "Servico 1"},
    {_id:  9, nome: "Servico 1"},
    {_id:  10, nome: "Servico 1"},
    {_id:  11, nome: "Servico 1"},
];

class ListItem extends Component {
    render(){
        const {item} = this.props;
        return (
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', paddingLeft:20, paddingBottom: 15}}>
                <Text style={{fontSize:20}} onPress={this.props.notificar}>{item.nome}</Text>
            </View>
        );
    }
} 

class BasicFlatList extends Component {
    state = {
        servicos
      }
    
    onPressAction = (item) => {
        if(false) {
            Alert.alert("Você escolheu " + item.nome + ". Adicione o Prestador")
            this.props.navigation.navigate("Prestador")
        } else {
            this.props.navigation.navigate("Estoque")
        }
    }
  
    render() {
      return(
        <View style={styles.container}>
            <FlatList
                data={this.state.servicos}
                renderItem={({item, index}) => (
                    <ListItem 
                        item={item}
                        notificar={() => this.onPressAction(item)}
                    />
                )}
                keyExtractor={(item) => item._id.toString()}
            />
            </View>
      );
    }
}

export default function OrdemServicos({navigation}) {
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