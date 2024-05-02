
interface Artist {
    id: string;
    name: string;
  }
  
  interface images {
    height:number,
    url:string,
    width:number
  }
  // Define una interfaz para un álbum
  
  interface ExternalUrls {
    spotify: string; // URL a Spotify
  }
  
  // Interfaz para un artista
  interface Artist {
    external_urls: ExternalUrls; // Enlaces externos (por ejemplo, Spotify)
    href: string; // Enlace al recurso en la API
    id: string; // ID del artista
    name: string; // Nombre del artista
    type: string; // Tipo de recurso (a menudo "artist")
    uri: string; // URI de Spotify
  }

  
  interface Album {
    id: string;
    name: string;
    //images: Array<{ url: string; height: number; width: number }>;
    images:images[];
    release_date: string;
    artists:Artist[]
  }
  
  // Define una interfaz para un elemento de pista (track)
  interface items {
    id: string;
    name: string;
    album: Album;
    artists: Artist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    preview_url:String
  }
  
  // Define la interfaz para la respuesta de búsqueda
  export interface tracks {
    href: string;
    items: items[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
  }


  




 export  interface Ifilter{
    query:string
    limit:number
}


export interface ISelected{
  id : number,
  artist:string,
  track:string
}



export interface IAddOwnSong{
  artist:string,
  track:string
}