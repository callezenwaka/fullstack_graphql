import { createStore } from 'vuex'
import Club from "../types/Club";

export default createStore({
  state: {
    clubs: [] as Club[],
    club: {} as Club,
  },
  getters: {
    clubs: state => state.clubs,
    club: state => state.club,
  },
  mutations: {
    SET_CLUBS(state, clubs) {
      state.clubs = clubs;
    },
    SET_CLUB(state, club) {
      state.club = club;
    },
  },
  actions: {
  },
  modules: {
  }
})
