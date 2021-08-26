import * as React from 'react';
import { Component } from "react";
import { View, Text } from "react-native";
import { FlatList, StyleSheet } from "react-native";
import { receberSala } from "./Notifica"
import salaService from '../services/SalaService';

class ListItem extends Component {
    render(){
        const {item} = this.props;
        return (
            <View style={{paddingLeft:20, marginTop: 25, backgroundColor:"#000080"}}>
                <Text style={{fontSize:20, color:"#fff"}} onPress={this.props.notificar}>IMÓVEL: {item.immobile.name}</Text>
                <Text style={{fontSize:20, color:"#fff"}} onPress={this.props.notificar}>SALA: {item.description}</Text>
            </View>
        );
    }
} 

class BasicFlatList extends Component {
    state = {
        salas: this.getSalas(),
    }
    
    onPressAction = (item) => {
        receberSala(item);
        this.props.navigation.navigate("Notifica")
    }

    getSalas() { 
        salaService.obterSalas()
        .then((response) => {
            this.setState({
                salas: response.data,
            })
        })
        .catch((error) => {
            console.log(error);     
        });
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