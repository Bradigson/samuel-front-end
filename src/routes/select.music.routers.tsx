import {Routes , Route} from 'react-router-dom';
import Home from '../components/home/select.music.home';
import AllSong from '../components/all_songs/select.music.all.song';
import Page from '../components/page';


const AllRouters = ()=>{
    return (
        
        <Routes>
            <Route index element={<Page/>}/>
            <Route path="/all_songs" element={<AllSong/>}/>
            <Route path="*" element={"no data"} />
        </Routes>
    )
}


export default AllRouters