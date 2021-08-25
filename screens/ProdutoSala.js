import * as React from 'react';
import { Component } from "react";
import { View, Text } from "react-native";
import { FlatList, TouchableOpacity, StyleSheet } from "react-native";
import NumericInput from 'react-native-numeric-input';

const produtos = [
    {_id:  1, nome: "Item 1", isSelected: false},
    {_id:  2, nome: "Item 1", isSelected: false},
    {_id:  3, nome: "Item 1", isSelected: false},
    {_id:  4, nome: "Item 1", isSelected: false},
    {_id:  5, nome: "Item 1", isSelected: false},
    {_id:  6, nome: "Item 1", isSelected: false},
    {_id:  7, nome: "Item 1", isSelected: false},
    {_id:  8, nome: "Item 1", isSelected: false},
    {_id:  9, nome: "Item 1", isSelected: false},
    {_id:  10, nome: "Item 1", isSelected: false},
    {_id:  11, nome: "Item 1", isSelected: false},
];

class ListItem extends Component {
    render(){
        const {item} = this.props;
        return (
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', paddingLeft:20, paddingBottom: 8}}>
                <Text style={{fontSize:20}}>{item.nome}</Text>
            </View>
        );
    }
} 

export default class BasicFlatList extends Component {
    state = {
        produtos
      }
    
    //   onPressAction = (key) => {
    //     this.setState((state) => {
    //       const selected = new Map(state.selected);
    //       this.state.selected.has(key) ? selected.delete(key, !selected.get(key)) : selected.set(key, !selected.get(key));
    //       return {selected};
    //     });
    //   }
  
    render() {
      return(
        <View style={styles.container}>
            <FlatList
                data={this.state.produtos}
                renderItem={({item, index}) => (
                    <ListItem 
                        item={item}
                    />
                )}
                keyExtractor={(item) => item._id.toString()}
            />
            </View>
      );
    }
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