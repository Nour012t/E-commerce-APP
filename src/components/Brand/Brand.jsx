import axios from 'axios';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

function Brand() {
  async function getBrands() {
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
    queryFn: getBrands
  });

  if (isLoading) return <p className="text-center text-gray-500">Loading brands...</p>;
  if (isError) return <p className="text-center text-red-500">Error loading brands</p>;

  return (
    <div className="container mx-auto px-4 mt-25 mb-5">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {brands?.map((brand) => (
          <div 
            key={brand._id} 
            className="flex flex-col items-center justify-center p-6 border border-gray-300 rounded-lg shadow-md bg-white transition-all hover:border-green-400 hover:shadow-lg"
          >
            <img className="w-24 md:w-28 lg:w-32 h-auto" src={brand.image} alt={brand.name} />
            <h2 className="mt-3 text-lg font-semibold text-gray-700">{brand.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Brand;
