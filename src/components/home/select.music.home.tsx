import Header from '../cuzton_components/header/select.music.header';
import { Link} from 'react-router-dom'
import './select.music.home.scss';
const Home = ()=>{
    return (
        <div className="home">
            <Header/>
            <div className='home_container'>
                <h2>
                    Disfruta de la experiencia de la musica a la carta
                </h2>
                <div className='home_container_button-down'>
                    <Link to="" className="bt_down">
                        <i className='bx bx-chevron-down'></i>
                    </Link>
                </div>
            </div>
            
        </div>
        
    )
}


export default Home;