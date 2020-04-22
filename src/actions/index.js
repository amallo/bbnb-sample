export const Types = {
  SET_LISTINGS: 'SET_LISTINGS',
  LOADING: 'LOADING'
};
export const Actions = {
  setListings: results => ({
    type: Types.SetListings,
    payload: results,
  }),
  loading: (isLoading) => ({
    type: Types.LOADING,
    payload: {
      isLoading
    }
  })
};
