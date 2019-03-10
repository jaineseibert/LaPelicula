import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, ImageBackground } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'lapelicula.db' });


//Component de Filmes
class Filmes extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={() => alert("Filme: " + this.props.data.descricao)} underlayColor="blue" >

          <ImageBackground resizeMode="cover" source={{ uri: this.props.data.imagem }} style={{ height: 150 }}>
            <View style={{
              flex: 1,
              alignItems: 'flex-start',
              justifyContent: 'flex-end',
              paddingLeft: 10,
              paddingBottom: 10
            }}>
              <Text style={{ fontSize: 23, color: '#FFFFFF', fontWeight: 'bold' }}>{this.props.data.descricao}</Text>
            </View>
          </ImageBackground>
        </TouchableHighlight>
      </View>
    );
  }
}

export default class ListaFilmesScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused, tintColor }) => {
      if (focused) {
        return (
          <Image source={require('../img/home_ativo.png')} style={{ width: 26, height: 26 }} />
        );
      } else {
        return (
          <Image source={require('../img/home_inativo.png')} style={{ width: 26, height: 26 }} />
        );
      }
    }
  });

  constructor(props) {
    super(props);
    this.state = {
      filmes: []
    };

    //Buscar dados dos filmes na base
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM filme ORDER BY descricao', [], (tx, res) => {
        var temp = [];
        for (let i = 0; i < res.rows.length; i++) {
          temp.push(res.rows.item(i));
        }
        this.setState({ filmes: temp });
      });
    });
  }

  render() {
    return (
      <View style={styles.container} >
        <FlatList data={this.state.filmes} keyExtractor={item => item.codigo.toString()} renderItem={({ item }) => <Filmes data={item} />} ></FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});