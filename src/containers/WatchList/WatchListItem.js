import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import AppContext from '../../AppContext';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { message } from 'antd';
import config from '../../config';

const WatchListContainer = styled.div`
  padding: 10px;
  font-family: Rubik;
  margin-bottom: 20px;
  color: #fff;
  font-size: 15px;
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  @media (min-width: 900px) {
    justify-content: space-evenly;
  }
  :hover {
    background-color: rgb(40, 47, 51);
    cursor: pointer;
  }
`;

const WatchListItems = styled.div``;

function WatchListItem() {
  const context = useContext(AppContext);

  const listOnSelect = (e) => {
    e.preventDefault();
    const selectedSymbol = e.currentTarget.id;

    fetch(
      `${config.NEWS_API_ENDPOINT}/search?q=${selectedSymbol}&lang=en&sortby=publishedAt&country=us&token=${config.NEWS_API_KEY}`,
      {
        method: 'GET',
        headers: {},
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(context.setNews)
      .then(console.log(selectedSymbol))
      .catch((err) => {
        message.error(`Please try again later: ${err}`);
      });
  };

  const onDelete = (e) => {
    e.preventDefault();
    const symbolId = e.currentTarget.id;
    fetch(`${config.API_ENDPOINT}/watchlist/${symbolId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
      })
      .then(() => {
        context.deleteSymbol(symbolId);
        message.success('Symbol successfully deleted!');
        context.getWatchlist();
      })
      .catch((err) => {
        message.error(`Please try again later: ${err}`);
      });
  };

  return (
    <>
      {context.watchList.map((symbol) => {
        return (
          <>
            {context.editing ? (
              <WatchListContainer key={symbol.id} id={symbol.symbol}>
                <RiDeleteBin2Fill
                  onClick={onDelete}
                  id={symbol.id}
                  style={{
                    cursor: 'pointer',
                    fontSize: 20,
                    outline: 'none',
                    backgroundColor: 'rgb(27, 29, 30)',
                    border: 'none',
                    padding: 0,
                  }}
                />
                <WatchListItems>{symbol.symbol}</WatchListItems>
                <WatchListItems>142.18</WatchListItems>
              </WatchListContainer>
            ) : (
              <WatchListContainer
                onClick={listOnSelect}
                key={symbol.id}
                id={symbol.symbol}
              >
                <WatchListItems>{symbol.symbol}</WatchListItems>
                <WatchListItems>142.18</WatchListItems>
              </WatchListContainer>
            )}
          </>
        );
      })}
    </>
  );
}
export default WatchListItem;
