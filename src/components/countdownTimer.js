import React from "react";
import { useState, useEffect } from "react";
import Article from "./article";
import { fetchArticleList } from "../actions/authAction";

const CountdownTimer = (props) => {
  const { initialMinute = 0, initialSeconds = 0 } = props;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isArticleFetched, setIsFetchedArticle] = useState(false);
  const [articleData, setArticleData] = useState([]);
  const [fetchcalled, setFetchCalled] = useState(false);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
          if (!fetchcalled) {
            fetchData();
          }
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  const fetchData = async () => {
    const { results } = await fetchArticleList();
    if (results) {
      setFetchCalled(true);
      setArticleData(results);
      setIsFetchedArticle(true);
    }
  };

  return (
    <div className="countDownTimer">
      {minutes === 0 && seconds === 0 ? null : (
        <h1>
          {" "}
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </h1>
      )}
      {isArticleFetched && <Article articleData={articleData} />}
    </div>
  );
};

export default CountdownTimer;
