import React, { useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

const GetData = async () => {
  const res = await fetch("http://localhost:4000/data");
  return await res.json();
};
const PostData = async (data) => {
  const res = await fetch("http://localhost:4000/data", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
};

const PostQuery = () => {
  const queryClient = useQueryClient();
  const tetle = useRef();
  const body = useRef();
  const { data, error, isError, isLoading } = useQuery("getDatas", GetData);

  const { mutate } = useMutation(PostData, {
    onSuccess: () => {
      queryClient.invalidateQueries("getDatas");
    },
  });

  const sendData = () => {
    let data = {
      userId: 1,
      id: Date.now(),
      title: tetle.current.value,
      body: body.current.value,
    };
    mutate(data);
  };

  if (isLoading) return <h1 className="container mt-5">loading...</h1>;
  if (isError) return <h1 className="container mt-5">error... {error}</h1>;
  return (
    <div className="container mt-5">
      <div className="my-5 w-25 mx-auto">
        <input
          ref={tetle}
          type="text"
          className="form-control"
          placeholder="title"
        />
        <input
          ref={body}
          type="text"
          className="form-control my-2"
          placeholder="body"
        />
        <button onClick={sendData} className="btn btn-success w-100">
          send
        </button>
      </div>
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

export default PostQuery;
