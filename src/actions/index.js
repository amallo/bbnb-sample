export const Types = {
  SetListings: 'SET_LISTINGS',
};
export const Actions = {
  setListings: results => ({
    type: Types.SetListings,
    payload: results,
  }),
};
