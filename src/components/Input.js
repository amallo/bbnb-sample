import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import styles from './styles.js';

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secureTextEntry: true,
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
      this.setState({ email: 'Email non valide !' });
      return false;
    } else {
      // alert('Email is Correct');
      this.setState({ email: '' });
      console.log('Email is Correct');
    }
  };
  emailValid = () => {
    this.setState({
      pressValid: !this.state.pressValid,
    });
  };
  toggleSecureTextEntry = () => {
    this.setState({
      secureTextEntry: !this.state.secureTextEntry
    });
  }

  render() {
    const { textContentType, onChangeText, placeholder } = this.props;
    const { secureTextEntry } = this.state;
    return (
      <View style={[styles.champ]}>
        <View style={[styles.flex]}>
          <Text style={[styles.textLabel]}>{this.props.title}</Text>
          {textContentType === 'emailAddress' && (
            <TouchableOpacity onPress={this.emailValid}>
              <Text style={[styles.textShowPassword]}>Valider</Text>
            </TouchableOpacity>
          )}
          {textContentType === 'password' && (
            <TouchableOpacity
              onPress={this.toggleSecureTextEntry}>
              <Text style={styles.textShowPassword}>{secureTextEntry ? 'Afficher' : 'Masquer'}</Text>
            </TouchableOpacity>
          )}
        </View>
        <TextInput
          style={[styles.textInput]}
          textContentType={textContentType}
          placeholder={placeholder}
          secureTextEntry={textContentType === 'password' ? secureTextEntry : false}
          onChangeText={onChangeText}
        />

        {this.state.pressValid && (
          <Text onPress={this.emailValid} style={[styles.textValid]}>
            {this.state.email}
          </Text>
        )}

      </View>
    );
  }
}
