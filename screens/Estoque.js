import * as React from 'react';
import { Text, View, FlatList, StyleSheet, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import NumericInput from 'react-native-numeric-input';

const estoque = [
    {_id:  1, nome: 'Item 1', quantidade: 0},    
    {_id:  2, nome: 'Item 1', quantidade: 0},   
    {_id:  3, nome: 'Item 1', quantidade: 0},   
    {_id:  4, nome: 'Item 1', quantidade: 0},   
    {_id:  5, nome: 'Item 1', quantidade: 0},    
    {_id:  6, nome: 'Item 1', quantidade: 0},    
    {_id:  7, nome: 'Item 1', quantidade: 0},     
    {_id:  8, nome: 'Item 1', quantidade: 2},  
    {_id:  9, nome: 'Item 1', quantidade: 0},     
    {_id:  11, nome: 'Item 1', quantidade: 0},    
    {_id:  12, nome: 'Item 1', quantidade: 0},   
    {_id:  13, nome: 'Item 1', quantidade: 0},   
    {_id:  14, nome: 'Item 1', quantidade: 0},   
    {_id:  15, nome: 'Item 1', quantidade: 0},    
    {_id:  16, nome: 'Item 1', quantidade: 0},    
    {_id:  17, nome: 'Item 1', quantidade: 0},     
    {_id:  18, nome: 'Item 1', quantidade: 2},  
    {_id:  19, nome: 'Item 1', quantidade: 0}, 
    {_id:  1140, nome: 'Item 1', quantidade: 0},    
    {_id:  21, nome: 'Item 1', quantidade: 0},   
    {_id:  31, nome: 'Item 1', quantidade: 0},   
    {_id:  41, nome: 'Item 1', quantidade: 0},   
    {_id:  51, nome: 'Item 1', quantidade: 0},    
    {_id:  61, nome: 'Item 1', quantidade: 0},    
    {_id:  71, nome: 'Item 1', quantidade: 0},     
    {_id:  81, nome: 'Item 1', quantidade: 2},  
    {_id:  91, nome: 'Item 1', quantidade: 0},     
    {_id:  111, nome: 'Item 1', quantidade: 0},    
    {_id:  121, nome: 'Item 1', quantidade: 0},   
    {_id:  131, nome: 'Item 1', quantidade: 0},   
    {_id:  114, nome: 'Item 1', quantidade: 0},   
    {_id:  115, nome: 'Item 1', quantidade: 0},    
    {_id:  116, nome: 'Item 1', quantidade: 0},    
    {_id:  117, nome: 'Item 1', quantidade: 0},     
    {_id:  118, nome: 'Item 1', quantidade: 2},  
    {_id:  119, nome: 'Item 1', quantidade: 0}, 
];

class ListItem extends React.Component {

    render() {
        const {item} = this.props;
        return (
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', paddingLeft:10, paddingBottom: 8}}>
                <View style={{flexDirection:'row', flex:2,alignItems:'center'}}>
                    <Text style={{fontSize:17}}>{item.nome}</Text>
                </View>
                <View style={{flexDirection:'row', flex:1,alignItems:'center', paddingRight:20}}>
                    <NumericInput 
                        value={item.quantidade}
                        minValue={0}
                        onChange={value => this.props.setItem(value)} 
                        textColor='#012289' 
                        iconStyle={{ color: 'white' }} 
                        rightButtonBackgroundColor='#5A78D6' 
                        leftButtonBackgroundColor='#6C85D1'
                    />
                </View>
            </View>
        );
    }
}

class Estoque extends React.Component {
    state = {
        estoque,
    }

    setItem(value, index) {
        const estoque = [...this.state.estoque];
        estoque[index].quantidade = value;
        this.setState( {estoque});
    }

    cadastrarProduto(){
        this.props.navigation.navigate("Cadastro Produto")
    }

    render() {
        return (
            <View style={styles.container}>
            <FlatList
                data={this.state.estoque}
                renderItem={({item, index}) => (
                    <ListItem 
                        item={item}
                        setItem={(value) => this.setItem(value, index)}
                    />
                )}
                keyExtractor={(item) => item._id.toString()}
            />
            <Button
            icon={
              <Icon
                name="shopping-bag"
                size={15}
                color="white"
              />
            }
            title=" Cadastrar produto"
            buttonStyle={styles.button}
            onPress={() => this.cadastrarProduto()}
          />
            </View>
        );
    }
}

export default function Produtos({navigation}) {
    return (
        <Estoque navigation={navigation}></Estoque>
    )
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