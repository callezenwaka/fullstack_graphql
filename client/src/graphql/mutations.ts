import { HOSTNAME } from '../services';
import Club from "../types/Club";
import axios from "axios";

const addClub = async (club: { name: string; league: string; }): Promise<Club> => {
  const {data} = await axios({
    method: "POST",
    url: `${HOSTNAME}`,
    data: JSON.stringify({
      query: `
        mutation {
          addClub(name: "${club.name}", league: "${club.league}"){
            name 
            league
            id
          }
        }
      `
    }),
    headers: {
      'content-type': 'application/json',
      'Accept': 'application/json',
    }
  });
  return data;
}

const deleteClub = async (id: number): Promise<Club> => {
  const {data} = await axios({
    method: "POST",
    url: `${HOSTNAME}`,
    data: JSON.stringify({
      query: `
        mutation {
          deleteClub(id:"${id}"){
            name
          }
        }
      `
    }),
    headers: {
      'content-type': 'application/json',
      'Accept': 'application/json',
    }
  });
  return data;
}

const updateClub = async (club: Club): Promise<Club> => {
  const {data} = await axios({
    method: "POST",
    url: `${HOSTNAME}`,
    data: JSON.stringify({
      query: `
        mutation{
          updateClub(id:"${club.id}", name:"${club.name}", league:"${club.league}"){
            id
            name
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
  return data;
}

export { addClub, deleteClub, updateClub };