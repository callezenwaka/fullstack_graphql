import { HOSTNAME } from '../services';
import Club from "../types/Club";
import { useStore } from 'vuex';
// import store from '@/store'
import axios from "axios";

const getClubs = async (): Promise<Club[]> => {
  const store = useStore();
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
  console.log(data.data.clubs);
  store.commit('SET_CLUBS', data.data.clubs);
  return data.data.clubs;
}

export { getClubs };