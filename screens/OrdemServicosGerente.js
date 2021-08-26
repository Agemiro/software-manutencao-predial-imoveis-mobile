import * as React from 'react';
import { Component } from "react";
import { Alert } from 'react-native';
import { View, Text } from "react-native";
import { FlatList, StyleSheet } from "react-native";
import { receberServico } from "./CadastroServico";
import servicoService from '../services/ServicoService';
import usuarioService from '../services/UsuarioService';
import { setServico } from "./Prestadores";

class ListItem extends Component {
    render(){
        const {item} = this.props;
        return (
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', paddingLeft:20, marginTop: 25, backgroundColor:"#000080"}}>
                <Text style={{fontSize:20, color:"#fff"}} onPress={this.props.notificar}>{item.title} - {item.state}</Text>
            </View>
        );
    }
} 

class BasicFlatList extends Component {
    state = {
        servicos: this.getServicos(),
        user: null,
    }
    
    onPressAction = (item) => {
        if(item.state == "Executando") {
            Alert.alert("Você escolheu " + item.title + ". Adicione o Prestador")
            setServico(item);
            this.props.navigation.navigate("Prestador")
        }

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
    
    async getServicos() { 
        await this.getUser();
        servicoService.obterAll()
        .then((response) => {
            let serv = [];
            for (let index = 0; index < response.data.length; index++) {
                const element = response.data[index];
                if(element.manager != null) {
                    if(this.state.user.cpf == element.manager.cpf){
                        serv.push(element);
                    }
                }
            }
            console.log("servicos: " + serv);
            this.setState({
                servicos: serv,
            })
        })
        .catch((error) => {
            console.log(error);     
        });
    }

    render() {
      return(
        <View style={styles.container}>
            <Text style={{fontSize:20, paddingLeft:120, paddingBottom:20}}>Serviços Iniciados</Text>
            <FlatList
                data={this.state.servicos}
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