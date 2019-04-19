import { createSelector } from 'reselect';

export function combineOptions(state, obj = "suppliers"){
  const ordering = state => state.common.ordering;
  const options = state => state[obj].options;
  return createSelector(
    ordering,
    options,
    (ordering, options) => ({
      ...options,
      ordering
    })
  )(state);
}
