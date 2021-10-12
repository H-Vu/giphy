import React, { useEffect, useRef } from "react";
import axios from "axios";
import "./Wall.css";

const Wall = (props) => {
  const loader = useRef(null);

  useEffect(() => {
    var options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };
    // initialize IntersectionObserver
    // and attaching to Load More div
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, []);

  const fetchData = () => {
    if (props.page > 0) {
      axios
        .get("https://api.giphy.com/v1/gifs/search", {
          params: {
            api_key: "eAbDgbVtx8KsjTMCbcjdYolMBVhUAaxz",
            q: props.input,
            limit: 20,
            offset: props.page,
          },
        })
        .then((res) => {
          props.setData((prevState) => ({
            dataArray: [...prevState.dataArray, ...res.data.data],
          }));
        })
        .catch((err) => {
          console.log(err.status);
        });
    }
  };

  useEffect(() => {
    console.log(props.page);
    if (props.page !== 0) {
      fetchData();
    }
  }, [props.page]);

  // here we handle what happens when user scrolls to Load More div
  // in this case we just update page variable
  const handleObserver = (entities) => {
    const target = entities[0];

    if (target.isIntersecting) {
      props.setPage((p) => p + 20);
    }
  };

  return (
    <div>
      <div className="body">
        {props.data.dataArray.map((item) => {
          return (
            <img
              className="li"
              key={item.id}
              src={item.images.fixed_height.url}
              alt="loading"
            />
          );
        })}
      </div>
      <div className="loading" ref={loader}>
        <div></div>
      </div>
    </div>
  );
};

export default Wall;
