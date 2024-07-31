"use client";

import React from 'react';
import useAxios from '@/app/hooks/useAxios';

const ExampleComponent = () => {
  const { data, error, loading } = useAxios('https://jsonplaceholder.typicode.com/posts');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ExampleComponent;
