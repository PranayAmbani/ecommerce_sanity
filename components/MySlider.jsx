import React,{useState} from 'react'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import {Grid,Chip} from '@mui/material'

function valuetext(value) {
    return `$${value}`;
  }
 export default function PriceSlider({Price,Filter,setFilter}) {
 
     
     
     const handleChange = (event, newValue) => {
         setFilter(newValue);
         
        };
        const marks = [];
    var minPrice=Math.min(...Price)
    var maxPrice=Math.max(...Price)
    var step=10
    var Price=minPrice
    
 
    while(Price<maxPrice){
      marks.push({
        value:Price,label:Price.toString()})
      Price=Price+step;
    }
    const [ranges2, setRanges2] = useState(true);

    const showrange = () => setRanges2(!ranges2);
    return (
  <Grid item style={{width:'50%'}}>
      <button type='button' className='btn2' onClick={showrange}>Price Range</button>
      <Box >
        <Slider
         className={ranges2 ? 'filters2 active' : 'filters2'}
          getAriaLabel={() => 'Price range'}
          value={Filter}
          onChange={handleChange}
          min={minPrice}
          max={maxPrice}
          valueLabelDisplay="auto"
          color='secondary'
          step={step}
          marks={marks}
          getAriaValueText={valuetext}
          style={{color:'#f02d34',fontFamily:'-apple-system'}}
        />
      </Box>
          </Grid>
    );
  }
  

