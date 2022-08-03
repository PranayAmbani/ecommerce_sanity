import React,{useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import { client } from '../lib/client';
import {price } from '../components/Sort'
import { Product, FooterBanner, HeroBanner} from '../components';
import PriceSlider from '../components/MySlider';
import { FaFilter } from 'react-icons/fa';
import { DropDownList } from "@progress/kendo-react-dropdowns";
import '@progress/kendo-theme-default/dist/all.css';
import product from '../sanity_ecommerce/schemas/product';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


function Home ({ products, bannerData }) {
  const [sortOptions,setSortOptions]=useState([
  
    {label:'PRICE ↑',active:false,function:data=>price(data,'asc')}, 
    {label:'PRICE ↓',active:true,function:data=>price(data,'desc')},
 ])
const [Filter, setFilter] = useState([20,100])
const [filterCategory, setFilterCategory] = useState('all')
const [ranges, setRanges] = useState(false);


const [searchTerm, setSearchTerm] = useState(null);

const handleChange = (event) => {


    setFilterCategory(event.target.value);
    

};
const handleChange2 = (event) => {


  setSearchTerm(event.target.value);
  

};

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
    var cate=[]
    var search=[]
    products.map(product=>{
      Price.push(product.price)
      cate.push(product.category)
      search.push(product.name)
     
    })
    
    
    
    
    products = products.filter(product=>(product.price<=Filter[1]&&product.price>=Filter[0]))
    products=products.filter(product=>(filterCategory!=='all'?product.category===filterCategory:products))
    products=products.filter(product=>searchTerm?(product.name.toLowerCase().includes(searchTerm)):products)





  return (
  <div>

    <HeroBanner heroBanner={bannerData.length && bannerData[0]}  />
<div className="search">


          <input
            placeholder="Search Product"
            onChange={handleChange2}
            />
            </div>

    <div className="products-heading">
      <h2>Best Seller Products</h2>
      <p>speaker There are many variations passages</p>
    </div>
  <FaFilter style={{fontSize:'2rem',cursor:'pointer',color:'#324d67'}} onClick={showrange} />

<div className={ranges ? 'filters active' : 'filters'}>
<div>

          <div>
          <Box sx={{ minWidth: 120 }}>
      <FormControl halfWidth style={{marginTop:'1rem'}}>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filterCategory}
          label="Category"
          onChange={handleChange}
        >
          


          <MenuItem value='headphones'>Headphones</MenuItem>
          <MenuItem value='neckband'>Neckband</MenuItem>
          <MenuItem value='earphones'>Earphones</MenuItem>
          <MenuItem value='tws'>Wireless Earphones</MenuItem>
          <MenuItem value='speakers'>Speakers</MenuItem>
          <MenuItem value='smartwatch'>Smart Watch</MenuItem>
          <MenuItem value='all'>All</MenuItem>
          
          
        </Select>
      </FormControl>
    </Box>
    </div>

        </div>

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