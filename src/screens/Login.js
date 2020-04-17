import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import stylesCo from './stylesCo';
import Input from '../components/Input'; //Intégration du composants Input
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Login extends Component {
  state = {
    displayPassword: false,
    email: '',
    password: ''
  };

  static navigationOptions = ({ navigation }) => ({
    header: props => (
      <View style={stylesCo.containerConnect}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon size={20} style={stylesCo.iconclose} name="arrow-left"></Icon>
        </TouchableOpacity>
        <Text style={stylesCo.connect}>Mot de passe oublié ?</Text>
      </View>
    ),
  });
  onChangeEmail = (email) => {
    this.setState({
      email
    })
  }
  onChangePassword = (password) => {
    this.setState({
      password
    })
  }
  login = () => {
    console.log('do login...')
    const { password, email } = this.state
    return fetch('https://bbnb-booking.now.sh/api/users/signIn', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        // sauvegarde du token dans le local storage
        return AsyncStorage
          .setItem('userToken', response.authorization)
          .then(() => {
            this.props.navigation.navigate('ExploreContainer')
          })
      })
      .catch((err) => console.log('cannot login in', err))
  }
  render() {
    return (
      <View style={stylesCo.structGlobal}>
        <Text style={stylesCo.titre}>Connexion</Text>
        <Input
          title={'Adresse e-mail'}
          textContentType={'emailAddress'}
          onChangeText={this.onChangeEmail}
          placeholder={"Saississez un e-mail"} />
        <Input
          title={'Mot de passe'}
          textContentType={'password'}
          onChangeText={this.onChangePassword}
          placeholder={"Saississez un mot de passe"} />
        <TouchableOpacity
          onPress={this.login}
          style={stylesCo.scrollArrow}>
          <Icon size={35} style={stylesCo.icongo} name="angle-right"></Icon>
        </TouchableOpacity>
      </View>
    );
  }
}
