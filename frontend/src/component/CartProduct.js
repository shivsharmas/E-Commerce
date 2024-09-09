import React from 'react'
import { PiPlus,PiMinus } from "react-icons/pi";
import { MdDelete } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { deleteCartItem, increaseQty, deleteQty, decreaseQty } from '../redux/productSlice';


const CartProduct = ({id, name, image,price,category, qty,total}) => {
    const dispatch = useDispatch();
  return (
    <div className='bg-slate-200 p-2 flex gap-4 rounded border border-slate-300'>
        <div className='p-3 bg-white rounded overflow-hidden'>
            <img src={image} className='h-28 w-40 object-cover' />
        </div>

        <div className="flex flex-col gap-1 w-full">
        <div className='flex justify-between'>
          <h3 className="font-semibold text-slate-600  capitalize text-lg md:text-xl">
            {name}
          </h3>
            <div className='text-xl cursor-pointer text-slate-700 hover:text-red-600' onClick={()=>dispatch(deleteCartItem(id))}>
                <MdDelete />
            </div>
        </div>
          <p className=" text-slate-500 font-medium ">
            {category}
          </p>
          <p className=" font-bold text-base">
            <span className="text-red-500">₹</span>
            <span>{price}</span>
          </p>

          <div className='flex justify-between'>
                <div className="flex gap-3 items-center">
                    <button onClick={()=>dispatch(increaseQty(id))} className="bg-slate-300 mt-1 rounded-md hover:bg-slate-400 p-2">
                    <PiPlus />
                    </button>
                    <p className='font-semibold'>{qty}</p>
                    <button onClick={()=>dispatch(decreaseQty(id))} className="bg-slate-300 mt-1 rounded-md hover:bg-slate-400 p-2">
                    <PiMinus />
                    </button>
                </div>
                <div className='flex items-center gap-2 font-bold text-slate-700'>
                    <p>Total:</p>
                    <p>{total}</p>
                </div>
          </div>

        </div>

    </div>
  )
}

export default CartProduct