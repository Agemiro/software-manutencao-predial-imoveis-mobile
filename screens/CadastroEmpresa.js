import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Platform } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { Button, CheckBox, Input, Text } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../style/MainStyle';
import empresaService from '../services/EmpresaService';

export default function CadastroEmpresa({navigation}) {
    
    const [nome, setNome] = useState(null)
    const [errorNome, setErrorNome] = useState(null)
    const [cnpj, setCnpj] = useState(null)
    const [errorCnpj, setErrorCnpj] = useState(null)
    const [isLoading, setLoading] = useState(false)

    let cnpjField = null
    const validar = () => {
        let error = false

        if (cnpj == null){
            setErrorCnpj("Informe o CNPJ da empresa!")
            error = true
        }
        if (nome == null){
            setErrorNome("Preencha o nome da empresa")
            error = true
        }

        return !error //Retorna false
    }

    const salvar = () => {
        if (validar()){
            setLoading(true)
            
            let data = {
                name: nome,
                cnpj: cnpj.toString()
            }
            empresaService.cadastrar(data)
            .then((response) => {
                const titulo = (response.data.cnpj) ? "Cadastro realizado com sucesso" : "Erro ao cadastrar"
                alert(titulo, response.data.mensagem)  
            })
            .catch((error) => {
                // showDialog("Erro","Houve um erro inesperado", "ERRO")
                console.log(error);     
            })
            navigation.reset({
                index: 0,
                routes: [{name: "Principal ADM"}]
            })        
            setLoading(false)
        }
    }

    return (
        <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={[styles.container, specificStyle.specificContainer]}>

            <ScrollView style={{width: "100%"}}>
                <Text h4>Cadastrar Empresa</Text>
                <Input
                    placeholder="Digite o nome da Empresa"
                    onChangeText={value => setNome(value)}
                    errorMessage={errorNome}
                />
                <View style={styles.containerMask}>
                <TextInputMask 
                    placeholder="CNPJ"
                    type= {"cnpj"} 
                    value={cnpj}
                    name="cnpj" 
                    onChangeText={value => {
                        setCnpj(value)
                        setErrorCnpj(null)
                    }}
                    keyboardType="number-pad"
                    returnKeyType="done"      
                    style={styles.maskedInput}
                    ref={(ref) => cnpjField = ref}
                />
                </View>
        
        { isLoading && 
        <Text>Carregando...</Text>
        }

        { !isLoading && 
        <Button
            title="Cadastrar"
            buttonStyle={specificStyle.button }
            onPress={() => salvar()}
        />
        }

        </ScrollView>
        </KeyboardAvoidingView>
    );
    }

    const specificStyle = StyleSheet.create({
    specificContainer: {
        backgroundColor: "#b0c4de",
        padding: 10
    },
    button: {

        marginTop: '10%',
        width: '100%',
        borderRadius: 5,
        backgroundColor: "#008000"
    }
})