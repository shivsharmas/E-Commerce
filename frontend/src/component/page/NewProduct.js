import React, { useState } from 'react'
import { IoCloudUploadOutline } from "react-icons/io5";
import { ImageToBase64 } from '../../utility/ImageToBase64';
import {toast} from 'react-hot-toast';

const NewProduct = () => {

  const [data, setData] = useState({
    name : "",
    category : "",
    image : "",
    price : "",
    description : "",
  });


  const handleOnChange = (e) => {

    const {name, value} = e.target;

    setData((prev)=>{
      return {
        ...prev,
        [name] : value
      }
    })
  }

  const uploadImage =async (e) => {
    const data = await ImageToBase64(e.target.files[0]);
    // console.log(data)
    setData((prev)=>{
      return {
        ...prev,
        image : data
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);

    const {name, image, price, category} = data;

    if(name && category && image && price){
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN }/updateProduct`, {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      const fetchRes = await fetchData.json();
  
      console.log(fetchRes)
      toast(fetchRes.message);

      setData(()=>{
       return {
        name : "",
        category : "",
        image : "",
        price : "",
        description : "",
       }
      })
    }
    else{
      toast("Enter required field");
    }

    

  }

  return (
    <div className='p-4'>
      <form className='m-auto w-full max-w-md shadow flex flex-col p-3 bg-white' onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input type='text' name ="name" id='name' className='bg-slate-200 p-1 my-1' onChange={handleOnChange} value={data.name} />

        <label  htmlFor='category' >Category</label>
        <select className='bg-slate-200 p-1 my-1' id='category' name='category' onChange={handleOnChange} value={data.category}>
          <option value={"other"}>select category</option>
          <option value={"Burger"}>Burger</option>
          <option value={"cake"}>Cake</option>
          <option value={"dosa"}>Dosa</option>
          <option value={"fruites"}>Fruits</option>
          <option value={"icecream"}>Ice-cream</option>
          <option value={"pizza"}>Pizza</option>
          <option value={"paneer"}>Paneer</option>
          <option value={"rice"}>Rice</option>
          <option value={"sandwich"}>Sandwich</option>
          <option value={"vegetables"}>Vegetables</option>
        </select>

        <label html='image'>Image
        <div id='image' className='h-40 w-full cursor-pointer bg-slate-200  rounded flex items-center justify-center' value={data.image}>
        
        {data.image ? <img src={data.image} className='h-full ' /> :  <span className='text-5xl'> <IoCloudUploadOutline /></span>}
        
         <input type={"file"} className='hidden' id='image' accept='image/*'  onChange={uploadImage}  />
        </div>
        </label>

        <label htmlFor='price' className='my-1'>Price</label>
        <input type='text' className='bg-slate-200 p-1 my-1' id='price' name='price' onChange={handleOnChange} value={data.price}  />

        <label htmlFor='description'>Description</label>
        <textarea rows={3} className='bg-slate-200 p-1 my-1 resize-none' name='description' id='description' onChange={handleOnChange} value={data.description}  />

        <button className='bg-red-500 hover:bg-red-600 text-white text-lg font-medium my-2 drop-shadow-md'>Save</button>
      </form>
    </div>
  )
}

export default NewProduct
