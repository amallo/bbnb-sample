import { login as loginService } from "../services"

export const Types = {
  SET_LISTINGS: 'SET_LISTINGS',
  LOADING: 'LOADING',
  LOGOUT: 'LOGOUT',
  LOGIN: 'LOGIN',
  FILTER_EXPERIENCES: 'FILTER_EXPERIENCES'
};
export const Actions = {
  setListings: results => ({
    type: Types.SET_LISTINGS,
    payload: results,
  }),
  loading: (isLoading) => ({
    type: Types.LOADING,
    payload: {
      isLoading
    }
  }),
  logout: () => ({
    type: Types.LOGOUT
  }),
  login: (email, token) => ({
    type: Types.LOGIN,
    payload: {
      email,
      token
    }
  }),
  filterExperiences: (criteria, sortCriteria) => ({
    type: Types.FILTER_EXPERIENCES,
    payload: {
      criteria,
      sort: sortCriteria
    }
  })
};

export function requestGetListings() {
  return (dispatch) => {
    dispatch(Actions.loading(true))
    //Récupération des données contenus dans l'URL
    return fetch('https://my-json-server.typicode.com/amallo/bbnb-sample/blob/master/experiences') // requête vers l'API
      .then((response) => {
        // Si un code erreur a été détecté on déclenche une erreur
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then(response => {
        // On cache le loading spinner à la fin de la requête
        dispatch(Actions.loading(false))
        dispatch(Actions.setListings(response))
      })
      .catch((err) => {
        console.log('An error occured', err)
        // En cas d'erreur on cache le loading spinner également
        dispatch(Actions.loading(false))
      })
  }
}

export function requestLogin(email, password) {
  return function (dispatch) {
    dispatch(Actions.loading(true))
    return loginService(email, password)
      .then((response) => {
        // On cache le loader
        dispatch(Actions.loading(false))

        // On sauvegarde du token dans le local storage
        dispatch(Actions.login(response.user.email, response.authorization))
      })
      .catch((err) => {
        dispatch(Actions.loading(false))
        throw err
      })
  }
}