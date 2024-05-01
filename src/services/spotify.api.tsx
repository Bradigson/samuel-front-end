import axios from 'axios';
export const SpotifyRequest = async (token:string)=>{


    const endpoint = 'https://api.spotify.com/v1/search';

    let url = "https://api.spotify.com/v1/search?q=remaster%2520track%3ADoxy%2520artist%3AMiles%2520Davis&type=track";
    //let url = "https://api.spotify.com/v1/search?q=remaster%2520track%3ADoxy%2520artist%3AMiles%2520Davis&type=album";
    
    const config = {
        headers: {
        'Authorization': `Bearer ${token}`, // Token de acceso para autenticación
        },
    };
    // Realizar la solicitud
    return await axios.get(url, config)
    .then(response => response.data)
    .catch(err => {
        //console.error('Error en la solicitud:', error);
        return null; // Manejo de errores
    });

}