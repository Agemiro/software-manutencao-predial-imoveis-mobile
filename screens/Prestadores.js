import * as React from 'react';
import { Component } from "react";
import { View, Text } from "react-native";
import { FlatList, StyleSheet } from "react-native";
import prestadorService from "../services/PrestadorService"
import servicoService from '../services/ServicoService';

let servico = null;

class ListItem extends Component {
    render(){
        const {item} = this.props;
        return (
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', paddingLeft:20, marginTop: 25, backgroundColor:"#000080"}}>
                <Text style={{fontSize:20, color:"#fff"}} onPress={this.props.notificar}>{item.name}</Text>
            </View>
        );
    }
} 

class BasicFlatList extends Component {
    state = {
        prestadores: this.getPrestadores(),
    }
    
    onPressAction = (item) => {
        servico.providers.push(item);
        servicoService.cadastrar(servico)
        .then((response) => {
            const titulo = (response.data.id) ? "Prestador " + item.name + " foi acionado!" : "Erro ao acionar o prestador"
            alert(titulo)  
        })
        .catch((error) => {
            console.log(error);     
        })
    }

    getPrestadores() { 
        prestadorService.obterAll()
        .then((response) => {
            this.setState({
                prestadores: response.data,
            })
        })
        .catch((error) => {
            console.log(error);     
        });
    }
  
    render() {
      return(
        <View style={styles.container}>
            <Text style={{fontSize:20, paddingLeft:80, paddingBottom:20}}>Prestadores Disponíveis</Text>
            <FlatList
                data={this.state.prestadores}
                renderItem={({item, index}) => (
                    <ListItem 
                        item={item}
                        notificar={() => this.onPressAction(item)}
                    />
                )}
                keyExtractor={(item) => item.cpf}
            />
            </View>
      );
    }
}

export default function Prestador({navigation}) {
    return (
        <BasicFlatList navigation={navigation}></BasicFlatList>
    );
}

export function setServico(serv){
    servico = serv;
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