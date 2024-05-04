import { SpotifyAuthentication } from "../../services/spotify.authentication";
import { SpotifyRequest } from "../../services/spotify.api";
import { useState, useEffect } from "react";
import { tracks, Ifilter, ISelected, IAddOwnSong } from "../../services/spotify.api.models";
import './select.music.all.song.scss';
import './select.music.all.song.mobile.scss';
import { useNavigate } from "react-router-dom";
import { filterBySongOrArtis } from "../../services/spotify.filter.songs";
import { handleAlertSendEmail } from "../../alerts/select.music.alert.send.email";



const AllSong = ()=>{

    const [songs, setSongs] = useState<tracks | null >(null);
    const [seleccionados, setSeleccionados] = useState<Set<number>>(new Set());
    const [selectedState, setSelectedState] = useState<ISelected[]>([]);
    const nuevosSeleccionados = new Set(seleccionados); // Copia del Set actual
    const [filterParams, setFilterParams] = useState<Ifilter>({
        query:"",
        limit:0
    });
    const [show, setShow] = useState<boolean>(false);
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState<boolean>(false);
    const [form, setForm] = useState<IAddOwnSong>({
        artist:"",
        track:""
    });
    const [menu, setMenu] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoadingRefresh, setIsLoadingRefresh] = useState<boolean>(false);

    //loadd all products
    useEffect( ()=>{
        const loadAllFirstSong = async ()=>{
            await SpotifyAuthentication().then(async (token)=>{
                if(token !== null)
                {
                    const requestResponse = await SpotifyRequest(token);
                    if(requestResponse !== null)
                    {   
                        setSongs(requestResponse.tracks);
                    }
                }else
                {
                    console.log("data null");
                }
            })
            .catch(err=>{
                console.log(err);
            })
        }
        loadAllFirstSong();
    },[]);


    const selectAsong = (id:number, artist:string, track:string)=>{

        //esta insercioni es para marcar los selecionados, mas luego la eliminaremos
        if (nuevosSeleccionados.has(id) && artist === '') 
        {
            nuevosSeleccionados.delete(id); // Si está seleccionado, lo deselecciona
        }
        else 
        {
            nuevosSeleccionados.add(id); // Si no está seleccionado, lo selecciona
        }
        setSeleccionados(nuevosSeleccionados); 


        // Objeto que deseas agregar (datos ficticios)
        const nuevoElemento: ISelected = { id: id, artist:artist, track:track };
        // Verificar si el objeto ya existe en el estado
        const existe = selectedState.some(item => item.id === nuevoElemento.id);
        // Si el objeto no existe en el estado, agregarlo
        if (!existe) {
            setSelectedState([...selectedState, nuevoElemento]);
        }
    }


    // function to delete
    function eliminarObjetoPorId(id:number) {
        const updatedItems = selectedState.filter((item) => item.id !== id);
        setSelectedState(updatedItems);
        selectAsong(id, '','');
    }








   //navigate to home
    const navigateToHome = ()=>{
        navigate('/')
    }

    //get param to filter
    const handleFilter = (e:any)=>{
        setFilterParams({
            ...filterParams,
            [e.target.name] : [e.target.value]
        })

    }

    //hablde limit to filter
    const handleLimit = (e:any)=>{
        setFilterParams({
            ...filterParams,
            [e.target.name] : [e.target.value]
        })
    }

    //open modal to show selected
    const showModal = ()=>{
        setShow(!show);
    }

   



    // filter functions request
    const handleFilterRequets = async ()=>{
        setIsLoading(true);
        let track = filterParams.query.toString();
        let limit = parseInt(filterParams.limit.toString());

        await SpotifyAuthentication().then(async (t)=>{
            if(t != null)
            {
                const response = await filterBySongOrArtis(t, track, limit);
                setSongs(response.tracks);
                setIsLoading(false);

            }else
            {
                console.log('no token found');
            }
        })
        .catch(err=>{
            console.log(err);
        })

        //filterParams.limit = 0;
        //filterParams.query = '';


    }




    //functiion to refresh
    const refresh = async ()=>{
        setIsLoading(true);
        await SpotifyAuthentication().then(async (token)=>{
            if(token !== null)
            {
                const requestResponse = await SpotifyRequest(token);
                if(requestResponse !== null)
                {   
                    setSongs(requestResponse.tracks);
                    setIsLoading(false);
                }
            }else
            {
                console.log("data null");
                
            }
        })
        .catch(err=>{
            console.log(err);
        })
        filterParams.limit = 0;
        filterParams.query = '';
        setSeleccionados(new Set());
    }





    //function to open form
    const handleOpenForm = ()=>{
        setShowForm(!showForm);
    }


    const handleTrack = (e:any)=>{
        setForm({
            ...form,
            [e.target.name] : [e.target.value]})
    }



    const handleArtist = (e:any)=>{
        setForm({
            ...form,
            [e.target.name] : [e.target.value]
        })
    }


    const handleAddOwnSong = (e:any)=>{
        e.preventDefault();
        const lastItem = selectedState[selectedState.length - 1];

        let lastId:number = 0;

        if(lastItem != null)
        {
            lastId = lastItem.id + 1;
        }
         // Objeto que deseas agregar (datos ficticios)
         const nuevoElemento: ISelected = { id:lastId, artist:form.artist.toString(), track:form.track.toString() };
         // Verificar si el objeto ya existe en el estado
         const existe = selectedState.some(item => item.id === nuevoElemento.id);
         // Si el objeto no existe en el estado, agregarlo
         if (!existe) {
             setSelectedState([...selectedState, nuevoElemento]);
         }

         form.artist = "";
         form.track = "";

    }




    //send email

    const handleSendEmail = ()=>{
        setSelectedState([]);
        setSeleccionados(new Set());
        handleAlertSendEmail();
        setShow(false);

    }




    //open menu
    const handleMenu = ()=>{
        setMenu(!menu);
    }



    //refresh mobile
        //functiion to refresh
        const refreshMobile = async ()=>{
            setIsLoadingRefresh(true);
            await SpotifyAuthentication().then(async (token)=>{
                if(token !== null)
                {
                    const requestResponse = await SpotifyRequest(token);
                    if(requestResponse !== null)
                    {   
                        setSongs(requestResponse.tracks);
                        setIsLoadingRefresh(false);
                        setMenu(false);
                    }
                }else
                {
                    console.log("data null");
                }
            })
            .catch(err=>{
                console.log(err);
            })
            filterParams.limit = 0;
            filterParams.query = '';
            setSeleccionados(new Set());
        }


    //mobile filter
    const handleFilterRequetsMobile = async ()=>{
        setIsLoading(true);
        let track = filterParams.query.toString();
        let limit = parseInt(filterParams.limit.toString());

        await SpotifyAuthentication().then(async (t)=>{
            if(t != null)
            {
                const response = await filterBySongOrArtis(t, track, limit);
                setSongs(response.tracks);
                setIsLoading(false);
                setMenu(false);

            }else
            {
                console.log('no token found');
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }


    return (
        <div className="allsong_container">
            <header className="allsong_header">
                <i className='bx bx-chevron-left' onClick={navigateToHome}></i>
                <div className="allsong_header-search_container">
                    <input type="text" className="allsong_header-search" name="query" value={filterParams.query}  onChange={handleFilter}/>
                    <input type="number" className="allsong_header_search-limit" name="limit" max={50} value={filterParams.limit} onChange={handleLimit}/>

                    
                    <i className='bx bx-search-alt' onClick={handleFilterRequets}></i>

                    <i className='bx bx-envelope' onClick={showModal}></i>

                    <i className='bx bx-refresh' onClick={refresh}></i>
                </div>

            </header>





            {/* mobile header */}
            <header className="header_mobiles">
                {/* <button onClick={handleMenu}>
                    <i className='bx bx-menu'></i>
                </button> */}
                <i className='bx bx-chevron-left' onClick={navigateToHome}></i>

                <nav className={`${menu ? 'change' : ''}${ ' navbar' }`}>
                    <div className='hamburger-menu' onClick={handleMenu}>
                        <div className='line line-1'></div>
                        <div className='line line-2'></div>
                        <div className='line line-3'></div>
                    </div>

                    <div id='header_mobiles_container-list'>
                        <div className='header_mobiles_container_list-container'>
                            <div className='header_mobiles_container_list-input'>
                                    <input type="text" placeholder='cancion' name="query" value={filterParams.query}  onChange={handleFilter}/><br/>
                                    <input type="number" name="limit" max={50} value={filterParams.limit} onChange={handleLimit}/>
                            </div>
                            <div className='header_mobiles_container_list-buttons'>
                                    {
                                        isLoading ? (
                                            <div className="spinner-border spinner-border-sm" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        ) : (
                                            <i className='bx bx-search-alt' onClick={handleFilterRequetsMobile}></i>
                                        )
                                    }
                                
                                <i className='bx bx-envelope' onClick={showModal}></i>

                                    {
                                        isLoadingRefresh ? (
                                            <div className="spinner-border spinner-border-sm" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        ) : (
                                            <i className='bx bx-refresh' onClick={refreshMobile}></i>
                                        )
                                    }
                            </div>
                        </div>
                    </div>
                
                </nav>
                
            </header>













           
            <div >
                    {
                        songs != null ? (
                            <div className="songs">
                                 {
                                    songs?.items.map((s, index)=>{
                                    return (
                                        <div key={index} className={seleccionados.has(index)  ?  "song_card selected" : "song_card"} 
                                                onClick={()=> selectAsong(index, s.album.artists[0].name, s.name)} >
                                            <div className="song_card-img">
                                                    {
                                                    <img src={s.album.images[0].url}/>
                                                    
                                                    }
                                                
                                            </div>
                                            <div className="song_card-footer text-muted">
                                                {s.name}
                                            </div>
                                            <div className="song_card-footer-artis">
                                                <b>{s.album.artists[0].name}</b>
                                            </div>
                                            
                                        </div>
                                        );
                                    })
                                 }
                            </div>
                        ) 
                        : (
                            <div className="song_load">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        )
                    }
            </div>





            {/* read selected  */}
            <div className={show ?  "all_selected" : "all_selected d-none"}>
                <div className="all_selected_containers">

                    <div className="all_selected_containers-close">
                        <i className='bx bx-x' onClick={showModal}></i>
                    </div> 

                    <div className="all_selected_containers-list">
                        <div>
                            {
                                selectedState.map(s=>{
                                    return (
                                        <div key={s.id}>
                                            <div>
                                                {s.track}
                                            </div>
                                            <div className="all_selected_containers-list_song">
                                                <b>{s.artist}</b>
                                            </div>
                                            <i className='bx bxs-trash' onClick={()=> eliminarObjetoPorId(s.id)}></i>
                                        </div> 
                                    )
                                })
                            }
                           
                        </div>
                    </div>
                    <div className={selectedState.length <= 0 ? "btn-send-email-container d-none" :  "btn-send-email-container"}>
                        <button id="btn-send-email-container_button" onClick={handleSendEmail}> <i className='bx bxl-telegram'></i></button>
                    </div>
                </div>
            </div>




                                
            {/* open form || button to add you own song */}
            <i className={menu ? 'bx bx-folder-plus d-none' : 'bx bx-folder-plus'} onClick={handleOpenForm}></i>

            {/* open form || button to add you own song */}
            <i className={menu ? 'bx bxs-send d-none' : 'bx bxs-send'} onClick={handleSendEmail}></i>

            <i className={menu ? 'bx bxs-envelope d-none' : 'bx bxs-envelope'} onClick={showModal}></i>









            {/* formulario to add song */}
            <div className={showForm ?  "form-container" : "form-container d-none"}>
                <form onSubmit={handleAddOwnSong}>
                    <div className="form_container-close" onClick={handleOpenForm}>
                        <i className='bx bx-x'></i>
                    </div>
                    <div className="form_container-input">
                        <input type="text" placeholder="cancion" name="track" value={form.track} onChange={handleTrack}/>
                            <br/><br/>
                        <input type="text" placeholder="artista" name="artist" value={form.artist} onChange={handleArtist}/>
                    </div>
                    <div className="form_container-button">
                        <button>Agregar</button>
                    </div>
                </form>
            </div>


            <div className={isLoading ?  "load_any_function" : " load_any_function d-none"}>
                <span className="loader"></span>
            </div>

        </div>
        
    )
}


export default AllSong