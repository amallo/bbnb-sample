import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';
import Categories from '../components/categories'; //Intégration du composants Catégories
import Experiences from '../components/experiences';
import Loading from '../components/Loading';
import Homes from '../components/homes';
import Popular from '../components/popular';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from '../actions';

class ExploreContainer extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: props => (
      <View style={styles.containerConnect}>
        <Icon size={20} style={styles.iconclose} name="close"></Icon>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.connect}>Connexion</Text>
        </TouchableOpacity>
      </View>
    )
  });
  // Initial state
  state = {
    isLoading: true // Controls the display of the animation
  }

  componentDidMount() {
    const { setListings } = this.props;

    //Récupération des données contenus dans l'URL
    return fetch('https://my-json-server.typicode.com/amallo/bbnb-sample/blob/master/experiences') // requête vers l'API
      .then(response => response.json())
      .then(results => {
        this.setState({
          isLoading: false
        })
        setListings(results);
      })
      .catch(() => {
        this.setState({
          isLoading: false
        })
      })
  }


  render() {
    const { categories, experiences, homes, popular } = this.props;
    const { isLoading } = this.state
    return (
      <View style={{ flex: 1 }}>
        <Loading animating={isLoading} />
        <ScrollView>
          <View>
            <Text style={styles.titres}>Explore Airbnb</Text>
            <Categories categories={categories} />
          </View>
          <View>
            <Text style={styles.titresExp}>Experiences</Text>
            <Text style={[styles.textVoirPlus]}>Voir tous ></Text>
            <Experiences experiences={experiences} />
          </View>
          <View>
            <Text style={styles.titresExp}>Homes</Text>
            <Text style={[styles.textVoirPlus]}>Voir tous ></Text>
            <Homes homes={homes} />
          </View>
          <View>
            <Text style={styles.titresExp}>Popular Reservations</Text>
            <Text style={[styles.textVoirPlus]}>Voir tous ></Text>
            <Popular popular={popular} />
          </View>
        </ScrollView>
      </View>
    );

  }
}
const mapStateToProps = state => ({
  categories: state.listings.categories,
  experiences: state.listings.experiences,
  homes: state.listings.homes,
  popular: state.listings.popular,
});

const mapDispatchToProps = dispatch => ({
  setListings: results => dispatch(Actions.setListings(results)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ExploreContainer);
