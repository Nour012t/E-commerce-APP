import axios from 'axios';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

function Categories() {
  async function getCategories() {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      return data.data;
    } catch (error) {
      toast.error("Failed to fetch categories");
      throw new Error(error);
    }
  }

  const { data: categories, isLoading, isError } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  });

  if (isLoading) return <p className="text-center text-gray-500">Loading categories...</p>;
  if (isError) return <p className="text-center text-red-500">Error loading categories</p>;

  return (
<div className="row   mt-20 container   justify-center px-12 ">
        {categories?.map((category) => (
        <div key={category._id} className=" p-4 w-1/2  product lg:w-1/3  ">
          <img className=" rounded-md w-full h-30  md:h-[25rem]" src={category.image} alt={category.name} />
          <h1 className=" text-2xl py-4 text-center font-semibold text-green-600 ">{category.name}</h1>
        </div>
      ))}
    </div>
  );
}

export default Categories;
