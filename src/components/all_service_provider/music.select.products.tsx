import about_us from '../../assets/images/about-us.png';
import live from '../../assets/images/live.png';
import service from '../../assets/images/service.png';
import select_music from '../../assets/images/music-select.png'
import contact_us from '../../assets/images/contact-us.png'
import './music.select.products.scss';
import { useNavigate } from 'react-router-dom';

const Products  = ()=>
{
    const navigate = useNavigate();
    const clickToNavigate = (id:any)=>{
        if(id === 4)
        {
            navigate('/all_songs')
        }   

    }
    return (
        <div className="products_container">

            <div className='products' >

                <div className='products_card products_card-img-1'>
                    
                    <h3>Quienes Somos</h3>
                </div>



                <div className='products_card products_card-img-2'>
                    
                    <h3>Live</h3>
                </div>


                <div className='products_card products_card-img-3'> 
                    
                    <h3>Servicios</h3>
                </div>


                <div className='products_card products_card-img-4' onClick={()=> clickToNavigate(4)}>
                   
                    <h3>Elije tu cancion</h3>
                </div>

                

                <div className='products_card products_card-img-5'>
                    <h3>Contactanos</h3>
                </div>

            </div>
            
        </div>
    )
}


export default Products