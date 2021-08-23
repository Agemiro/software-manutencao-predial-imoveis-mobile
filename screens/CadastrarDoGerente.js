import * as React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../style/MainStyle';
import { ScrollView } from 'react-native-gesture-handler';

export default function CadastrarDoGerente({navigation}) {

    function cadastrarServico(){
      navigation.navigate("Cadastro Servico")
    }

    function cadastrarProduto(){
      navigation.navigate("Cadastro Produto")
    }

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#b0c4de" }}>
        <ScrollView style={{width: "100%"}}>
        <Text>O que deseja cadastrar?</Text>
      
        <Button
            icon={
              <Icon
                name="child"
                size={15}
                color="white"
              />
            }
            buttonStyle={styles.button}
            title=" Cadastrar serviço"
            onPress={() => cadastrarServico()}
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
            onPress={() => cadastrarProduto()}
          />
        </ScrollView>
      </View>
    );
  }