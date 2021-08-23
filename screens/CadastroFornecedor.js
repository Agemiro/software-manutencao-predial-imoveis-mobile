import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Platform } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { Button, CheckBox, Input, Text } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../style/MainStyle';

export default function CadastroFornecedor({navigation}) {
    
    const [nome, setNome] = useState(null)
    const [errorNome, setErrorNome] = useState(null)
    const [cnpj, setCnpj] = useState(null)
    const [errorCnpj, setErrorCnpj] = useState(null)
    const [isLoading, setLoading] = useState(false)

    let cnpjField = null
    const validar = () => {
        let error = false

        if (cnpj == null){
            setErrorCnpj("Informe o CNPJ do fornecedor!")
            error = true
        }
        if (nome == null){
            setErrorNome("Informe o nome do fornecedor")
            error = true
        }

        return !error //Retorna false
    }

    const salvar = () => {
        if (validar()){
            setLoading(true)
            
            let data = {
                name: nome,
                cnpj: cnpj
            }  
            Alert.alert("Fornecedor " + data.name + " cadastrado com sucesso! ")
            navigation.reset({
            index: 0,
            routes: [{name: "Principal"}]
            })
            setLoading(false)
        }
    }

    return (
        <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={[styles.container, specificStyle.specificContainer]}>

            <ScrollView style={{width: "100%"}}>
                <Text h4>Cadastrar do Fornecedor</Text>
                <Input
                    placeholder="Digite o nome do Fornecedor"
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
                <Text style={styles.errorMessage}>{errorCnpj}</Text>
        
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