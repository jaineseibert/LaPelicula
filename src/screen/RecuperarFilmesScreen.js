import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Picker } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { LPButton } from '../component/LPButton';

//Component de Filmes
class Filmes extends Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.viewFilme}>
          <Text style={{ fontSize: 18, color: 'black', fontWeight: 'bold' }}>Título: {this.props.data.Title}</Text>
          <Text style={{ fontSize: 18, color: 'black', fontWeight: 'bold' }}>Ano: {this.props.data.Year}</Text>
        </View>
      </View>
    );  }
}

export default class RecuperarFilmesScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pesquisa: '',
      filmes: [],
      filtro: 's'
    };

    this.localizar = this.localizar.bind(this);

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.areaInput}>
          <TextInput style={styles.inputText}
            multiline={true} placeholder='Procure por um filme...'
            onChangeText={(valor) => this.setState({ pesquisa: valor })} />
        </View>
        <View>
          <LPButton titulo='Buscar' onPress={() => this.localizar()} />
        </View>
        <View style={styles.flatlist}>
          <FlatList data={this.state.filmes} keyExtractor={item => item.Title.toString()} renderItem={({ item }) => <Filmes data={item}></Filmes>}></FlatList>
        </View>
      </View>
    );
  }

  localizar() {

    let endereco = 'http://www.omdbapi.com/?s=' + this.state.pesquisa + '&apikey=fdd668c6';


    fetch(endereco, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'content-type': 'multipart/form-data'
      }
    }).then((response) => response.json())
      .then((responseJson) => {

        let ret = responseJson['Search'] == undefined ? [] : responseJson['Search'];
        this.setState({ filmes: ret })

      })
  }  

  // configurando opções de navegação
  static navigationOptions = ({ navigation }) => ({
    tabBarLabel: 'Assistir',
    tabBarIcon: ({ focused, tintColor }) => {
      if (focused) {
        return (
          <Image source={require('../img/cadastrar_ativo.png')} style={{ width: 26, height: 26 }}></Image>
        );
      } else {
        return (
          <Image source={require('../img/cadastrar_inativo.png')} style={{ width: 26, height: 26 }}></Image>
        );
      }
    }
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4'
  },
  flatlist: {
    padding: 15
  },
  text: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 18,
    padding: 5
  },
  inputText: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'gray'
  },
  areaInput: {
    width: '98%'
  },
  viewFilme: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: '#D3D3D3',
    borderRadius: 5,
    paddingLeft: 10,
    margin: 5,
    paddingBottom: 10
  }
});