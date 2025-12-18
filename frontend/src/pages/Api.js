export async function searchPlaces(query) {
  const url = `https://google-search-master-mega.p.rapidapi.com/maps?q=${query}&hl=en&page=1`;

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-host": "google-search-master-mega.p.rapidapi.com",
      "x-rapidapi-key": "YOUR_RAPIDAPI_KEY"
    }
  };

  const response = await fetch(url, options);
  return response.json();
}
