import React,{useState} from 'react';

import { client } from '../lib/client';
import {price } from '../components/Sort'
import { Product, FooterBanner, HeroBanner,NotFound } from '../components';
import PriceSlider from '../components/MySlider';
import { FaFilter } from 'react-icons/fa'
import {AiOutlineClose} from 'react-icons/ai'
function Home ({ products, bannerData }) {
  const [sortOptions,setSortOptions]=useState([
  
    {label:'PRICE ↑',active:false,function:data=>price(data,'asc')}, 
    {label:'PRICE ↓',active:true,function:data=>price(data,'desc')},
 ])
const [Filter, setFilter] = useState([20,100])
const [ranges, setRanges] = useState(false);

const showrange = () => setRanges(!ranges);

 const handleSort=i=>{
  const newOptions=[...sortOptions]
  newOptions.map(option=>option.active=false)
  newOptions[i].active=true
  setSortOptions(newOptions)
}
 const selectedSort = sortOptions.filter(option=>option.active)[0]

    products= selectedSort.function(products)
    var Price=[]
    products.map(product=>{
      Price.push(product.price)
    })
    products=products.filter(product=>(product.price<=Filter[1]&&product.price>=Filter[0]))


  return (
  <div>
    <HeroBanner heroBanner={bannerData.length && bannerData[0]}  />
   
    <div className="products-heading">
      <h2>Best Seller Products</h2>
      <p>speaker There are many variations passages</p>
    </div>
  <FaFilter style={{fontSize:'2rem',cursor:'pointer',color:'#324d67'}} onClick={showrange} />


<div className={ranges ? 'filters active' : 'filters'}>

<PriceSlider Price={Price} setFilter={setFilter} Filter={Filter} />


  <button type='button' className='btn2' onClick={()=>handleSort(1)}> Low to high</button>
  <button type='button' className='btn2' onClick={()=>handleSort(0)}> High to low</button>
  </div>

 

    <div className="products-container">
      {products?.map((product) => <Product key={product._id} product={product} />)}

      
    </div>
    

    <FooterBanner footerBanner={bannerData && bannerData[0]} />
    <div className="container">


    </div>
  </div>
      
)};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData }
    
  }
}

export default Home;