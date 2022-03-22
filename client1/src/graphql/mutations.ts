import { HOSTNAME } from '../services';

const addClub = async (club: { name: string; league: string; }): Promise<any> => {
  console.log(club);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
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
  };

  const response = await fetch(HOSTNAME, options);
  // console.log(response);
  const text = await response.text();
  const res = JSON.parse(text);
  console.log(res);
  // state.isLoading = false;
  // return jsonRes.data.clubs;
  return;
}

const deleteClub = async (id: number): Promise<any> => {

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        mutation{
          deleteClub(id:"${id}"){
            name
          }
        }
      `
    }),
  };
  const response = await fetch(HOSTNAME, options);
  console.log("Delete item - ", response);
  // state.isLoading = false;
  // return response.data.clubs;
  return;
}

const updateClub = async (club: { name: string; league: string; }, id: number): Promise<any> => {
  // state.isLoading = true;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        mutation{
          updateClub(id:"${id}", name:"${club.name}", league:"${club.league}"){
            id
            name
            league
          }
        }
      `
    }),
  };
  const response = await fetch(HOSTNAME, options);
  console.log("Update clubs ", response);
  // state.isLoading = false;
  // return jsonRes.data.clubs;
  return;
}

export { addClub, deleteClub, updateClub };