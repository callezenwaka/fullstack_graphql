import { HOSTNAME } from '../services';

const getClubs = async (state: { isLoading: boolean; }) => {

  state.isLoading = true;

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
  state.isLoading = false;
  return jsonRes.data.clubs;
}

export { getClubs };