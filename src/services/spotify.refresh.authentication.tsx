import request from 'request';
export const RefreshSpotifyAuthentication = async (token:string)=>{

   
    // var refresh_token  = token;
    // var client_id = '85c5b64b74804a12abb7fbc4f8548146';
    // var client_secret = '4c98de4755bf4c73878f44916809d034';

    // const authHeader = btoa(`${client_id}:${client_secret}`);

    // // Configuración para la solicitud
    // const authOptions = {
    //     method: 'POST',
    //     headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //     'Authorization': 'Basic ' + authHeader,
    //     },
    //     body: new URLSearchParams({
    //     grant_type: 'refresh_token',
    //     refresh_token: refresh_token,
    //     }),
    // };



    // try {
    //     // Enviar solicitud y obtener la respuesta
    //     const response = await fetch('https://accounts.spotify.com/api/token', authOptions);
    
    //     if (response.ok) {
    //       // Analizar la respuesta
    //       const body = await response.json();
    
    //       // Obtener el nuevo token de acceso y el nuevo refresh token
    //       const access_token = body.access_token;
    //       const new_refresh_token = body.refresh_token;
    
    //       // Imprimir para verificar resultados
    //       console.log('Access Token:', access_token);
    //       console.log('New Refresh Token:', new_refresh_token);
    
    //       // Retornar los tokens obtenidos
    //       return {
    //         access_token,
    //         refresh_token: new_refresh_token || refresh_token,
    //       };
    //     } else {
    //       console.error('Error obteniendo token:', response.status, response.statusText);
    //       const errorBody = await response.json();
    //       console.error('Detalles del error:', errorBody);
    //     }
    //   } catch (error) {
    //     console.error('Error en la solicitud:', error);
    //   }



    // var refresh_token  = token;
    // var client_id = '85c5b64b74804a12abb7fbc4f8548146';
    // var client_secret = '4c98de4755bf4c73878f44916809d034';
    // const basicAuth = 'Basic ' + btoa(`${client_id}:${client_secret}`);

    // const Auth = {
    //     method:'POST',
    //     headers:{
    //         'content-type': 'application/x-www-form-urlencoded',
    //         'Authorization': basicAuth
    //     },
    //     body:new URLSearchParams({
    //         grant_type: 'refresh_token',
    //         refresh_token: refresh_token

    //     })
    // }

    // const response = await fetch("", Auth);

    // if(response.ok)
    // {
    //     console.log("ok")
    // }else
    // {
    //     console.log("bad" + token)
    // }


    // .then(res=>{
    //     console.log(`Toekn refresh: ${res}`)
    // })
    // .catch(err=>{
    //     console.log(`Something went wrong : ${err}`);
    // })

}