import { HOSTNAME } from '../services';
import Club from "../types/Club";

const getClubs = async (): Promise<Club[]> => {

  // state.isLoading = true;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `{
        clubs{
            name    
            id
            league
          }
        }
      `
    })
  };

  const response = await fetch(HOSTNAME, options);
  const text = await response.text();
  const jsonRes = JSON.parse(text);
  // state.isLoading = false;
  return jsonRes.data.clubs;
}

export { getClubs };