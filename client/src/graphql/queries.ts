import { HOSTNAME } from '../services';
import Club from "../types/Club";
import store from '@/store'
import axios from "axios";

const getClubs = async (): Promise<Club[]> => {
  const { data } = await axios({
    method: "POST",
    url: `${HOSTNAME}`,
    data: JSON.stringify({
      query: `{
        clubs{
            name    
            id
            league
          }
        }
      `
    }),
    headers: {
      'content-type': 'application/json',
      'Accept': 'application/json',
    }
  });
  store.commit('SET_CLUBS', data.data.clubs);
  return data.data.clubs;
}

const singleClub = async (id: number): Promise<Club> => {
  const { data } = await axios({
    method: "POST",
    url: `${HOSTNAME}`,
    data: JSON.stringify({
      query: `{
        singleClub(id:"${id}") {
            name    
            id
            league
          }
        }
      `
    }),
    headers: {
      'content-type': 'application/json',
      'Accept': 'application/json',
    }
  });
  store.commit('SET_CLUB', data.data.singleClub);
  return data.data.singleClub;
}

export { getClubs, singleClub };