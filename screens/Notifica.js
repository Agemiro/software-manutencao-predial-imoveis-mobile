import React, { useState } from 'react';
import { Platform } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { StyleSheet } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../style/MainStyle';
import servicoService from '../services/ServicoService'

let sala = null;

export default function Notifica({navigation}) {
    const [titulo, setTitulo] = useState(null)
    const [errorTitulo, setErrorTitulo] = useState(null)
    const [descricao, setDescricao] = useState(null)
    const [errorDescricao, setErrorDescricao] = useState(null)
    const [isLoading, setLoading] = useState(false)

    const validar = () => {
        let error = false
        setErrorTitulo(null)
        setErrorDescricao(null)

        if (titulo == null){
            setErrorTitulo("Preencha o título do servico")
            error = true
        }

        if (descricao == null){
            setErrorDescricao("Descreva o serviço")
            error = true
        }
        return !error
    }

    const salvar = () => {
        if (validar()){
            setLoading(true)
            
            let data = {
                title: titulo,
                description: descricao,
                state: "INICIADO",
                room: sala
            }  
            servicoService.cadastrar(data)
            .then((response) => {
                const titulo = (response.data.id) ? "Ordem Serviço cadastro com sucesso" : "Erro ao cadastrar"
                alert(titulo)  
                navigation.reset({
                    index: 0,
                    routes: [{name: "Principal Chefe de Setor"}]
                })        
            })
            .catch((error) => {
                console.log(error);     
            })
            setLoading(false)
        }
    }

    return (
        <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={[styles.container, specificStyle.specificContainer]}>

            <ScrollView style={{width: "100%"}}>
                <Text h4 style={{paddingBottom:25}}>Notificar Serviço</Text>
                <Text h4 style={{paddingBottom:5, color:'#000080'}}>Nome do Imóvel: {sala.immobile.name}</Text>
                <Text h4 style={{paddingBottom:30, color:'#000080'}}>Endereço do Imóvel: {sala.immobile.address}</Text>
                <Text h4 style={{paddingBottom:30, color:'#000080'}}>Andar da Sala: {sala.floor}</Text>
                <Input 
                    placeholder="Digite o título"
                    onChangeText={value => setTitulo(value)}
                    errorMessage={errorTitulo}
                />
                <Input
                    placeholder="Descrição do servico"
                    onChangeText={value => setDescricao(value)}
                    errorMessage={errorDescricao}
                />
                
        { isLoading && 
        <Text>Carregando...</Text>
        }

        { !isLoading && 
        <Button
            title="Enviar"
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

export function receberSala(item){
    sala = item;
}