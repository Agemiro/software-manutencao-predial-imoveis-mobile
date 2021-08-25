import * as React from 'react';
import { Component } from "react";
import { View, Text } from "react-native";
import { FlatList, StyleSheet } from "react-native";

const prestadores = [
    {_id:  1, nome: "Prestador 1"},
    {_id:  2, nome: "Prestador 1"},
    {_id:  3, nome: "Prestador 1"},
    {_id:  4, nome: "Prestador 1"},
    {_id:  5, nome: "Prestador 1"},
    {_id:  6, nome: "Prestador 1"},
    {_id:  7, nome: "Prestador 1"},
    {_id:  8, nome: "Prestador 1"},
    {_id:  9, nome: "Prestador 1"},
    {_id:  10, nome: "Prestador 1"},
    {_id:  11, nome: "Prestador 1"},
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
        prestadores
      }
    
    onPressAction = (item) => {
        alert("Prestador " + item.nome + " foi acionado!")
    }
  
    render() {
      return(
        <View style={styles.container}>
            <FlatList
                data={this.state.prestadores}
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

export default function Prestador({navigation}) {
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