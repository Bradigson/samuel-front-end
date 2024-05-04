// 'https://api.spotify.com/v1/search?q=remaster%2520track%3AHotel%2520California%2520artist%3AEagles&type=track&limit=1'

// 'https://api.spotify.com/v1/search?q=remaster%2520track%3AHotel%2520California&type=track&limit=1'
import axios from 'axios';


export const filterBySongOrArtis = async (token:string, track:string, limit:number)=>
{
    if(limit <= 0)
    {
        limit = 1;
    }else if(limit > 50)
    {
        limit = 50;
    }
    let url = `https://api.spotify.com/v1/search?q=remaster%2520track%3A${track}&type=track&limit=${limit}`
    const config = {
        headers: {
        'Authorization': `Bearer ${token}`, // Token de acceso para autenticación
        },
        mode : 'cors'
        
    };
    // Realizar la solicitud
    return await axios.get(url, config)
    .then(response => response.data)
    .catch(err => {
        //console.error('Error en la solicitud:', error);
        return null; // Manejo de errores
    });

}