import * as React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import styles from '../style/MainStyle';
import { ScrollView } from 'react-native-gesture-handler';

export default function Relatorios({navigation}) {

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#b0c4de" }}>
              <ScrollView style={{width: "100%"}}>
        <Text h4>Qual relatório deseja ver?</Text>
        <Button
            buttonStyle={styles.button}
            title="Estoque"
          />
        <Button
            buttonStyle={styles.button}
            title="Orçamento"
          />
        <Button
            buttonStyle={styles.button}
            title="Serviços"
          />
          </ScrollView>
      </View>
    );
  }