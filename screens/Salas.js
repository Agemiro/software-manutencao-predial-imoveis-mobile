import * as React from 'react';
import { Component } from "react";
import { View, Text } from "react-native";
import { FlatList, StyleSheet } from "react-native";
import { receberSala } from "./Notifica"
import salaService from '../services/SalaService';

// const salas = [
//     {_id:  1, nome: "Salas 1"},
//     {_id:  2, nome: "Salas 1"},
//     {_id:  3, nome: "Salas 1"},
//     {_id:  4, nome: "Salas 1"},
//     {_id:  5, nome: "Salas 1"},
//     {_id:  6, nome: "Salas 1"},
//     {_id:  7, nome: "Salas 1"},
//     {_id:  8, nome: "Salas 1"},
//     {_id:  9, nome: "Salas 1"},
//     {_id:  10, nome: "Salas 1"},
//     {_id:  11, nome: "Salas 1"},
// ];

let salas = null;

const getSalas = async () => { 
    salaService.obterSalas()
    .then((response) => {
        salas = response.data;  
    })
    .catch((error) => {
        console.log(error);     
    });
}
getSalas();

class ListItem extends Component {
    render(){
        const {item} = this.props;
        // console.log(item);
        return (
            <View style={{flexDirection: 'row', alignItems:'center', paddingLeft:20, paddingBottom: 8}}>
                <Text style={{fontSize:20}} onPress={this.props.notificar}>Imóvel - {item.immobile.name}</Text>
                <Text style={{fontSize:20}} onPress={this.props.notificar}>, Sala - {item.description}</Text>
            </View>
        );
    }
} 

class BasicFlatList extends Component {
    state = {
        salas
      }
    
    onPressAction = (item) => {
        receberSala(item);
        this.props.navigation.navigate("Notifica")
    }
  
    render() {
        return(
            <View style={styles.container}>
                <FlatList
                    data={this.state.salas}
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

export default function Salas({navigation}) {
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