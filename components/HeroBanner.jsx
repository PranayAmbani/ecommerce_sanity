import React from 'react';
import { FiChevronDown } from 'react-icons/fi';


import { urlFor } from '../lib/client';



const HeroBanner = ({ heroBanner}) => {
  const Scroll = () =>{
    window.scrollTo(300, 500);
  }

  return (
    <div className='hero-banner-container'>
      <div>
        <p className='beats-solo'>{heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <h1>{ heroBanner.largeText1}</h1>
        <img src={urlFor(heroBanner.image)} alt="xbox series"
          className='hero-banner-image' />
        
        <div className='buttons'>
          
 <button className='buy-now' onClick={Scroll}> Explore Now</button>
        </div>

        
    
       <div className='desc'>
          <h5>Description</h5>
          <p>{heroBanner.desc}</p>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner;