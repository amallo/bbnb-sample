import React, {Component} from 'react';
import {Text, View, Button, TouchableOpacity} from 'react-native';
import stylesCo from './stylesCo';
import Input from '../components/Input'; //Intégration du composants Input
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Login extends Component {
  state = {
    displayPassword: false,
  };

  static navigationOptions = ({navigation}) => ({
    header: props => (
      <View style={stylesCo.containerConnect}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon size={20} style={stylesCo.iconclose} name="arrow-left"></Icon>
        </TouchableOpacity>
        <Text style={stylesCo.connect}>Mot de passe oublié ?</Text>
      </View>
    ),
  });
  render() {
    const {navigation} = this.props;
    return (
      <View style={stylesCo.structGlobal}>
        <Text style={stylesCo.titre}>Connexion</Text>
        <Input title={'Adresse e-mail'} textInputType={'email'} />
        <Input title={'Mot de passe'} textInputType={'password'} />
        <TouchableOpacity
          onPress={() => navigation.navigate('ExploreContainer')}
          style={stylesCo.scrollArrow}>
          <Icon size={35} style={stylesCo.icongo} name="angle-right"></Icon>
        </TouchableOpacity>
      </View>
    );
  }
}
