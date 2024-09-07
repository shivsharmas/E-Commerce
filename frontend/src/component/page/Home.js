import React, { useEffect, useRef, useState } from 'react'
import HomeCard from '../HomeCard'
import { useSelector } from 'react-redux'
import CardFeature from '../CardFeature';
import { GrNext, GrPrevious } from "react-icons/gr";
import FilterProduct from '../FilterProduct';

const Home = () => {
  const productData = useSelector((state)=> state.product.productList);
  console.log(productData);
  const homeProductCartList = productData.slice(0,4)
  const homeProductCartListVegetables = productData.filter(el => el.category==='vegetables',[])
  console.log(homeProductCartListVegetables)

  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10 ).fill(null);

  const slideProductRef = useRef();

  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  }

  const prevProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  }


  const categoryList = [...new Set(...productData.map(el=> el.category))];
  console.log(categoryList); 


// filter data display
const [filterby, setFilterBy] = useState("");
const [dataFilter, setDataFilter] = useState([]);

  useEffect(()=>{
    setDataFilter()
  },[])

  const handleFilterProduct = (category) =>{
    const filter = productData.filter(el => el.category.toLowerCase() === category.toLowerCase())
    setDataFilter(()=>{
      return[
        ...filter
      ]
    })
  }
  return (
    <div className='p-2 md:p-4'>
      <div className='md:flex gap-4 py-2'>
        
        <div className='md:w-1/2'>
          <div className='flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full'>
            <p className='text-sm font-medium text-slate-900'>Bike Delivery</p>
            <img src='https://cdn-icons-png.flaticon.com/512/2972/2972185.png' className='h-7' />
          </div>
          <h2 className='text-4xl md:text-7xl font-bold py-3'>The Fastest Delivery in <span className='text-red-500 '>Your Home</span></h2>
          <p className='py-3 text-base'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.</p>
          <button className='font-bold text-white bg-red-500 px-3 py-2 rounded-md'>Order Now</button>
        </div>

        <div className='md:w-1/2 flex gap-4 flex-wrap p-4 justify-center'>
          {
            homeProductCartList[0] ? homeProductCartList.map(el => {
              return(
                 <HomeCard 
                  key={el._id}
                  image={el.image}
                  name={el.name}
                  price={el.price}
                  category={el.category}
                 />

              );
            })
            :
            loadingArray.map((el, index)=>{
              return(
                <HomeCard 
                  key={index}
                  loading={"Loading..."}

                />
              )
            })
          }
        </div>
      </div>

      <div className=''>
          <div className='flex w-full items-center'>
          <h2 className='font-bold text-slate-800 text-2xl mb-4'>Fresh Vegetables</h2>
        
          <div className='ml-auto flex gap-4'>
            <button onClick={prevProduct} className='bg-slate-300 hover:bg-slate-400 p-1 text-lg rounded'><GrPrevious /></button>
            <button onClick={nextProduct} className='bg-slate-300 hover:bg-slate-400 p-1 text-lg rounded'><GrNext /></button>
          </div>
          </div>
          <div className='flex gap-5 overflow-scroll scrollbar-none scroll-smooth' ref={slideProductRef}>
            {
              homeProductCartListVegetables[0] ?
              homeProductCartListVegetables.map(el=> {
                return(
                  <CardFeature
                    key={el._id}
                    image={el.image}
                    name={el.name}
                    price={el.price}
                    category={el.category}


                  />
                )
              })
              :
              loadingArrayFeature.map(el => <CardFeature loading="Loading..." />)
            }
          </div>
      </div>

            <div className='my-5'>
              <h2 className='font-bold text-2xl text-slate-800 mb-4'>
                Your Product
              </h2>

              <div className='flex gap-4 justify-center overflow-scroll scrollbar-none'>
                {
                  categoryList[0] && categoryList.map(el=>{
                    return(
                      <FilterProduct category={el} />
                    )

                  })
                }
              </div>
              
            <div className=''>
                {
                  dataFilter.map( el => {
                    return(
                      <CardFeature 
                        key={el._id}
                        image={el.image}
                        name={el.name}
                        category={el.category}
                      />

                    )
                  })
                }
            </div>
              
            </div>
    </div>
  )
}

export default Home
