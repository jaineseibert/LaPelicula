import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LPButton } from '../component/LPButton';
import { StackActions, NavigationActions } from
  'react-navigation';

export default class SobreScreen extends Component {
  // configurando opções de navegação
  static navigationOptions = ({ navigation }) => ({
    // header: null // sem cabeçalho
    tabBarLabel: 'Sobre',
    tabBarIcon: ({ focused, tintColor }) => {
      if (focused) {
        return (
          <Image source={require('../img/cadastrar_ativo.png')} style={{ width: 26, height: 26 }} />
        );
      } else {
        return (
          <Image source={require('../img/cadastrar_inativo.png')} style={{ width: 26, height: 26 }} />
        );
      }
    }
  });

  constructor(props) {
    super(props);
    this.state = {};

    this.voltar = this.voltar.bind(this);
    this.telaPrincipal = this.telaPrincipal.bind(this);
  }

  voltar() {
    // passando para próxima tela        
    this.props.navigation.goBack();
  }

  telaPrincipal() {
    this.props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: 'Home'
          })
        ]
      })
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 23, fontWeight: 'bold' }}>Versão: 1.0</Text>
        <Text style={{ fontSize: 18, color: '#43594a', textAlign: 'center' }}>Salve sua lista de filmes da melhor forma possível!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingBottom: 10
  }
});