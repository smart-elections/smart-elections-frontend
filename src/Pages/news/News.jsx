import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './news.scss';

const News = () => {
  const [data, setData] = useState();
  const apiKey = '30d90e1a9a2944bdb2d283c4e559950b';

  useEffect(() => {
    axios
      .get(
        `http://newsapi.org/v2/everything?q=rich&from=2022-07-09&sortBy=publishedAt&apiKey=${apiKey}`
      )
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <div className='news__container' id='style-scrollbar'>
        <div className='all__news'>
          {data
            ? data.articles.map((news) => (
                <NewsArticle data={news} key={news.url} />
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
          src={data.urlToImage}
          alt={data.source.name}
          height={160}
          width={250}
        />
      </div>
      <div className='horizontal-child-right'>
        <div className='news__text'>
          <p className='news__category'>{data.source.name}</p>
          <p className='news__title'>
            {data.title.length > 140
              ? `${data.title.substring(0, 140)}...`
              : data.title}
          </p>
          <p className='news__published'>
            Published {data.publishedAt.slice(0, 10)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default News;
