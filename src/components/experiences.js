//import {experiences} from '../data/listings';
import React, {Component} from 'react';
import {Text, View, Image, ScrollView, TouchableOpacity} from 'react-native';
import styles from './styles';
import Card from '../components/Card';
import photos from '../data/photos/index';
import color from '../data/colors/index';

export default class Experiences extends Component {
  render() {
    const {experiences} = this.props;
    return (
      <ScrollView
        contentContainerStyle={styles.containerExp}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {experiences.map((experiency, index) => (
          <Card
            key={`experiency-item-${index}`}
            imageCard={photos[experiency.photo]}
            titreCard={experiency.type}
            colorTitleCard={color[experiency.color]}
            paragraphe={experiency.title}
            price={experiency.price}
            priceType={experiency.priceType}
            stars={experiency.stars}
            colors={'gray'}></Card>
        ))}
      </ScrollView>
    );
  }
}
