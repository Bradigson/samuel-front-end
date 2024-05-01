import axios from 'axios';



export const SpotifyAuthentication = async ()=>
{
    var client_id = '85c5b64b74804a12abb7fbc4f8548146';
    var client_secret = '4c98de4755bf4c73878f44916809d034';

    try {
        const basicAuth = 'Basic ' + btoa(`${client_id}:${client_secret}`); // Base64 encode the client ID and client secret
        
        const response = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': basicAuth,
          },
          body: new URLSearchParams({
            grant_type: 'client_credentials',
          }),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json(); // Extract the JSON data from the response
        const token = data.access_token; // Access token
    
        //console.log('Access Token:', token); // Output the token
        return token; // Return the token for further use


      } catch (error) 
      {
        //console.error('Error fetching token:', error); // Log errors, if any
        return error;
      }
}