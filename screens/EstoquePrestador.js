import * as React from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import produtoService from '../services/ProdutoService';

class ListItem extends React.Component {

    render() {
        const {item} = this.props;
        return (
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', paddingLeft:10, paddingBottom: 8}}>
                <View style={{flexDirection:'row', flex:2,alignItems:'center'}}>
                    <Text style={{fontSize:17}}>{item.name}</Text>
                </View>
                <View style={{flexDirection:'row', flex:1,alignItems:'center', paddingRight:20}}>
                    <NumericInput 
                        value={item.amount}
                        minValue={0}
                        maxValue={item.amount}
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
        estoque: this.getEstoque(),
    }

    setItem(value, index) {
        const estoque = [...this.state.estoque];
        estoque[index].amount = value;
        this.setState( {estoque});
        produtoService.cadastrar(estoque[index])
        .then((response) => {
            estoque[index] = response.data;
        })
        .catch((error) => {
          console.log(error);     
        })
    }

    getEstoque() { 
        produtoService.obterAll()
        .then((response) => {
            this.setState( {
                estoque: response.data,
            }); 
        })
        .catch((error) => {
            console.log(error);     
        });
    };
    
    cadastrarProduto(){
        this.props.navigation.navigate("Cadastro Produto")
    }

    render() {
        return (
            <View style={styles.container}>
            <Text style={{fontSize:20, paddingLeft:10, paddingBottom:20}}>Escolha o produto e subtraia a quantidade</Text>
            <FlatList
                data={this.state.estoque}
                renderItem={({item, index}) => (
                    <ListItem 
                        item={item}
                        setItem={(value) => this.setItem(value, index)}
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
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