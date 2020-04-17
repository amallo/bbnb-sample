import React, {Component} from 'react';
import {Text, TextInput, View, TouchableOpacity, Button} from 'react-native';
import styles from './styles.js';
import {ThemeColors} from 'react-navigation';

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myText: 'Afficher',
      displayPassword: false,
      email: '',
      validated: false,
      pressValid: false,
    };
  }
  validate = textEmail => {
    console.log(textEmail);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(textEmail) === false) {
      // alert('Email is Not Correct');
      console.log('Email is Not Correct');
      this.setState({email: 'Email non valide !'});
      return false;
    } else {
      // alert('Email is Correct');
      this.setState({email: ''});
      console.log('Email is Correct');
    }
  };
  emailValid = () => {
    this.setState({
      pressValid: !this.state.pressValid,
    });
  };

  render() {
    const {textInputType} = this.props;
    const {displayPassword} = this.state;
    const {displayMsg} = this.state;
    return (
      <View style={[styles.champ]}>
        <View style={[styles.flex]}>
          <Text style={[styles.textLabel]}>{this.props.title}</Text>
          {textInputType === 'email' && (
            <TouchableOpacity onPress={this.emailValid}>
              <Text style={[styles.textShowPassword]}>Valider</Text>
            </TouchableOpacity>
          )}
          {textInputType === 'password' && (
            <TouchableOpacity
              onPress={() => {
                const myText = this.state.displayPassword
                  ? 'Masquer'
                  : 'Afficher';
                this.setState({
                  displayPassword: !this.state.displayPassword,
                  myText,
                });
              }}>
              <Text style={styles.textShowPassword}>{this.state.myText}</Text>
            </TouchableOpacity>
          )}
        </View>
        {textInputType === 'email' && (
          <TextInput
            style={[styles.textInput]}
            placeholder="Saississez un e-mail"
            secureTextEntry={displayMsg}
            //onChangeText={text => console.log(text)}
            onChangeText={textEmail => this.validate(textEmail)}
            //value={this.state.email}
          ></TextInput>
        )}
       { this.state.pressValid == true ? (
          <Text onPress={this.emailValid} style={[styles.textValid]}>
            {this.state.email}
          </Text>
        ) : null}
        {textInputType === 'password' && (
          <TextInput
            style={[styles.textInput]}
            textContentType={'password'}
            placeholder="Saississez un mot de passe"
            secureTextEntry={displayPassword}
            //onChangeText={text => console.log(text)}
          ></TextInput>
        )}
      </View>
    );
  }
}
