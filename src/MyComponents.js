import React from "react";
import { useQuery } from "@tanstack/react-query";

const MyComponents = () => {
  const queryKey = "todos";

  const fetchTodos = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    return response.json();
  };

  const { data, isLoading, isError, error, isSuccess, status } = useQuery({
    queryKey: [queryKey],
    queryFn: fetchTodos,
    staleTime: 5000,
    cacheTime: 10 * (60 * 1000),
  });

  console.log(isError,error);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <ul>
      {data.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
};

export default MyComponents;
