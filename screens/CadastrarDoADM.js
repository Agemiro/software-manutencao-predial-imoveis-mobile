import * as React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../style/MainStyle';
import { ScrollView } from 'react-native-gesture-handler';

export default function CadastrarDoADM({navigation}) {

    function cadastrarUsuario(){
      navigation.navigate("Cadastro Usuario")
    }

    function cadastrarImovel(){
      navigation.navigate("Cadastro Imovel")
    }

    function cadastrarFornecedor(){
      navigation.navigate("Cadastro Fornecedor")
    }

    function cadastrarEmpresa(){
      navigation.navigate("Cadastro Empresa")
    }

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#b0c4de" }}>
        <ScrollView style={{width: "100%"}}>
        <Text>O que deseja cadastrar?</Text>
        <Button
            icon={
              <Icon
                name="plus"
                size={15}
                color="white"
              />
            }
            buttonStyle={styles.button}
            title=" Cadastrar empresa"
            onPress={() => cadastrarEmpresa()}
          />
        
        <Button
            icon={
              <Icon
                name="plus"
                size={15}
                color="white"
              />
            }
            buttonStyle={styles.button}
            title=" Cadastrar usúario"
            onPress={() => cadastrarUsuario()}
          />
          <Button
            icon={
              <Icon
                name="plus"
                size={15}
                color="white"
              />
            }
            buttonStyle={styles.button}
            title=" Cadastrar Imóvel"
            onPress={() => cadastrarImovel()}
          />
          <Button
            icon={
              <Icon
                name="plus"
                size={15}
                color="white"
              />
            }
            buttonStyle={styles.button}
            title=" Cadastrar Fornecedor"
            onPress={() => cadastrarFornecedor()}
          />
          </ScrollView>
      </View>
    );
  }