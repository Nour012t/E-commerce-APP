import axios from 'axios';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

function Brands() {
  async function getbrands() {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
      return data.data;
    } catch (error) {
      toast.error("Failed to fetch brands");
      throw new Error(error);
    }
  }

  const { data: brands, isLoading, isError } = useQuery({
    queryKey: ['brands'],
    queryFn: getbrands
  });

  if (isLoading) return <p className="text-center text-gray-500">Loading brands...</p>;
  if (isError) return <p className="text-center text-red-500">Error loading brands</p>;

  return (
<div className="row   mt-20 container   justify-center px-12 ">
        {brands?.map((brands) => (
        <div key={brands._id} className=" p-4 w-1/2  product lg:w-1/3  ">
          <img className=" rounded-md w-full h-30  md:h-[25rem]" src={brands.image} alt={brands.name} />
          <h1 className=" text-2xl py-4 text-center font-semibold text-green-600 ">{brands.name}</h1>
        </div>
      ))}
    </div>
  );
}

export default Brands;
