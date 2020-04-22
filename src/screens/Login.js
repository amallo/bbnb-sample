import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import stylesCo from './stylesCo';
import Input from '../components/Input'; //Intégration du composants Input
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from "../actions"
import { connect } from 'react-redux';

class Login extends Component {
  state = {
    displayPassword: true,
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
    const { loading } = this.props
    loading(true)
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
      .then((response) => {
        // Si un code erreur a été détecté on déclenche une erreur
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      // Pas d'erreurs on décode le json
      .then(response => response.json())

      .then((response) => {
        loading(false)
        // Sauvegarde du token dans le local storage
        return AsyncStorage
          .setItem('userToken', response.authorization)
          .then(() => {
            this.props.navigation.navigate('ExploreContainer')
          })

      })
      // Toutes les erreurs sont traitées dans le catch
      .catch((err) => {
        console.log('cannot login in', err)
        loading(false)
      })
  }
  render() {
    const { isLoading } = this.props
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
const mapStateToProps = state => ({
  isLoading: state.app.isLoading,
});

const mapDispatchToProps = dispatch => ({
  loading: (isLoading) => dispatch(Actions.loading(isLoading)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
