import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Image, Button,
  TouchableOpacity
} from 'react-native';
import { RNCamera } from 'react-native-camera';

export default class CameraScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Captura de Foto'
  });

  componentDidMount() {    
    if (typeof this.props.navigation.state.params !== "undefined") {
      this.setState({ codigo: this.props.navigation.state.params.codigofilme });
      this.setState({ descricao: this.props.navigation.state.params.descfilme });
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      descricao: '',
      uri: null,
      codigo: 0
    }

    this.capturarFoto = this.capturarFoto.bind(this);
  }

  capturarFoto = async() =>{
    if(this.camera){
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options)
      let state = this.state;
      state.uri = data.uri;
      this.setState(state);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 2 }}>
          <RNCamera ref={ref => { this.camera = ref; }}
            captureAudio={false}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            permissionDialogTitle={'Uso da câmera'}
            permissionDialogMessage=
            {'Precisamos de permissão para acessar a câmera!'}
          />
        </View>
        <View style={{
          flex: 0.5,
          flexDirection: 'row',
          justifyContent: 'center'
        }}>
          <Button title="Capturar"
            onPress={() => this.capturarFoto()} />
        </View>
        <View style={{ flex: 1.5 }}>
          <Image style={{
            borderWidth: 1, borderColor: 'black',
            height: 150, width: 150
          }}
            source={{ uri: this.state.uri }}
          />
          <View style={{ flexDirection: 'row' }}>
            <Button title="OK" onPress={
              () => this.props.navigation.navigate('Filme',
                { imguri: this.state.uri, descfilme: this.state.descricao, codigofilme: this.state.codigo })
            } />
            <Button title="Cancelar" onPress={
              () => this.props.navigation.navigate('Filme')
            } />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  preview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});