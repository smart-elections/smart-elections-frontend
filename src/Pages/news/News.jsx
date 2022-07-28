import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './news.scss';

const News = () => {
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get(
        `https://newsdata.io/api/1/news?apikey=pub_92485c26ad795af824315c649f12fc032dce&country=fr&language=fr&category=politics`
      )
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <div className='news__container' id='style-scrollbar'>
        <div className='all__news'>
          {data
            ? data.results.map((news) => (
                <NewsArticle data={news} key={news.link} />
              ))
            : 'Loading'}
        </div>
      </div>
    </div>
  );
};

const NewsArticle = ({ data }) => {
  return (
    <div className='news'>
      <div className='horizontal-child-left'>
        <img
          className='news__image'
          src={data.image_url}
          alt={data.title}
          height={160}
          width={250}
        />
      </div>
      <div className='horizontal-child-right'>
        <div className='news__text'>
          <p className='news__source'>{data.source_id}</p>
          <p className='news__title'>
            {data.title.length > 140
              ? `${data.title.substring(0, 140)}...`
              : data.title}
          </p>
          <p className='news__published'>
            Published {data.pubDate.slice(0, 10)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default News;
