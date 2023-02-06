import React from "react";
import { useQuery } from "react-query";

const GetData = async () => {
  const res = await fetch("http://localhost:4000/data");
  return await res.json();
};

const GetQuery = () => {
  const { data, error, isError, isLoading } = useQuery("getData", GetData);
  if (isLoading) return <h1 className="container mt-5">loading...</h1>;
  if (isError) return <h1 className="container mt-5">error...</h1>;
  return (
    <div className="container mt-5">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Title</th>
            <th scope="col">Body</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((v, i) => {
            return (
              <tr>
                <th scope="row">{v.id}</th>
                <td>{v.title}</td>
                <td>{v.body}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default GetQuery;
