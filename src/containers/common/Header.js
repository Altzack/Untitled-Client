import styled from 'styled-components/macro';
import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, Button, Dropdown, Input, AutoComplete } from 'antd';
import { DesktopOnly, MobileOnly } from './responsiveComponents';
import { MenuOutlined, SearchOutlined, AudioOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../../App.css';
import { AiOutlineSearch, AiOutlinePlus } from 'react-icons/ai';
import { GoPlus } from 'react-icons/go';
import config from '../../config';
import AppContext from '../../AppContext';
import NewsList from '../NewsList/NewsList';
import symbols from './symbols';
import App from '../../App';

const AppHeaderContainer = styled.div`
  padding: 8px 12px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  min-height: 60px;
  position: fixed;
  width: 100vw;
  font-family: Rubik;
  z-index: 99;
  background-color: rgb(27, 28, 29);
`;

const StyledButton = styled.button`
  color: #fff;
  font-weight: 500;
  height: 33px;
  line-height: 33px;
  background-color: rgb(40, 199, 145);
  width: 50px;
  margin-left: 10px;
  transition: all 0.1s ease-in-out;
  border: 1px solid rgba(0, 0, 0, 0.21);
  border-bottom: 4px solid rgba(0, 0, 0, 0.21);
  border-radius: 4px;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);
  :hover {
    transition: all 0.1s ease-in-out;
    background-color: #3e9afc;
    cursor: pointer;
  }
`;

const FooterSeparator = styled.span`
  padding: 0 10px;
  margin-top: 2px;
  color: #e8e6e3;
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  width: 33%;
  color: #e8e6e3;
`;

const HeaderContentContainer = styled.div`
  font-family: Rubik;
  font-weight: 300;
  max-width: 1200px;
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  height: 44px;
`;

const StyledHeader = styled.h3`
  color: #e8e6e3;
  margin-bottom: 0;
  :hover {
    color: #1890ff;
  }
`;

const StyledTitle = styled.h1`
  color: #e8e6e3;
  margin-bottom: 0;
  font-family: Rubik;
  @media (min-width: 300px) {
    font-size: 17px;
    letter-spacing: 2px;
  }
  @media (min-width: 650px) {
    font-size: 25px;
  }
`;

const LogoLink = styled(Link)`
  justify-self: center;
  align-self: center;
  color: #e8e6e3;
  font-size: 15px;
`;

export default function Header() {
  const context = useContext(AppContext);
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState([]);
  const [searchNews, setSearchNews] = useState([]);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleSearch = (searchText) => {
    const filteredTickers = symbols.filter(
      (symbol) =>
        symbol.symbol.toLowerCase().includes(searchText.toLowerCase()) ||
        symbol['Security Name'].toLowerCase().includes(searchText.toLowerCase()) // TODO: Update this so it's smarter or something
    );

    setOptions(
      filteredTickers.map((ticker) => {
        return {
          value: ticker.symbol + ' | ' + ticker['Security Name'],
        };
      })
    );
  };

  return (
    <AppHeaderContainer>
      <DesktopOnly>
        <HeaderContentContainer>
          <HeaderSection style={{ justifyContent: 'flex-start' }}>
            <Link style={{ textDecoration: 'none', color: '#000' }} to="/about">
              <StyledHeader>About</StyledHeader>
            </Link>
          </HeaderSection>
          <HeaderSection style={{ justifyContent: 'center' }}>
            <LogoLink to="/">
              <img alt="logo" src="/favicon-32x32.png" />
            </LogoLink>
          </HeaderSection>
          <HeaderSection style={{ justifyContent: 'flex-end' }}>
            <AutoComplete
              options={options}
              style={{
                width: 200,
              }}
              dropdownMatchSelectWidth={300}
              onSelect={context.handleSelect}
              onSearch={handleSearch}
              placeholder="AAPL, TSLA, FSLY..."
              allowClear
            />
            <StyledButton>
              <GoPlus />
            </StyledButton>
          </HeaderSection>
        </HeaderContentContainer>
      </DesktopOnly>
      <MobileOnly>
        <HeaderContentContainer>
          <HeaderSection style={{ justifyContent: 'flex-start' }}>
            <Button
              style={{
                borderColor: 'transparent',
                backgroundColor: 'transparent',
                color: '#e8e6e3',
              }}
              ype="text"
              onClick={showDrawer}
            >
              <MenuOutlined />
            </Button>
          </HeaderSection>
          <HeaderSection style={{ justifyContent: 'center' }}>
            <LogoLink to="/">
              <img alt="logo" src="/favicon-32x32.png" />
            </LogoLink>
          </HeaderSection>
          <HeaderSection
            className="searchContainer"
            style={{ justifyContent: 'flex-end' }}
          >
            <AiOutlineSearch />
          </HeaderSection>
        </HeaderContentContainer>
        <Drawer
          placement="left"
          closable="true"
          onClose={onClose}
          visible={visible}
          key="AppHeader-left-drawer"
        >
          <Link
            onClick={onClose}
            style={{ textDecoration: 'none', color: '#000' }}
            to="/about"
          >
            <h3>About</h3>
          </Link>
        </Drawer>
      </MobileOnly>
    </AppHeaderContainer>
  );
}
