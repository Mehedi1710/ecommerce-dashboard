import React, { useState } from 'react';
import { AppstoreOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import { Col, Menu, Row } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';

const items = [
  {
    key: '1',
    icon: <UserOutlined />,
    label: 'Users',
    children: [
      {
        key: 'login',
        label: 'Login',
      },
      {
        key: '/merchant',
        label: 'Merchant',
      }
    ],
  },
  {
    key: '2',
    icon: <AppstoreOutlined />,
    label: 'Product',
    children: [
      {
        key: '/product',
        label: 'Add Product',
      },
      {
        key: '/allProducts',
        label: 'All Products',
      }
    ],
  },
  {
    key: '3',
    icon: <SettingOutlined />,
    label: 'Category',
    children: [
      {
        key: '/category',
        label: 'Add Category',
      },
      {
        key: '/allCategory',
        label: 'All Category',
      }
    ],
  },
  {
    key: '4',
    icon: <SettingOutlined />,
    label: 'Sub Category',
    children: [
      {
        key: '/subcategory',
        label: 'Add Sub Category',
      },
      {
        key: '/allSubCategory',
        label: 'All Sub Category',
      }
    ],
  },
];

const getLevelKeys = (items1) => {
  const key = {};
  const func = (items2, level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};
const levelKeys = getLevelKeys(items);

const Home = () => {
  const navigate = useNavigate();
  const [stateOpenKeys, setStateOpenKeys] = useState('');
  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };

  const handleClick = (e) => {
    navigate(e.key);
  }
  return (
    
    <Row>
      <Col span={6}><Menu
      mode="inline"
      defaultSelectedKeys={['231']}
      openKeys={stateOpenKeys}
      onClick={handleClick}
      onOpenChange={onOpenChange}
      style={{
        width: 256,
      }}
      items={items}
    /></Col>
      <Col span={18}><Outlet/></Col>
    </Row>
  );
};
export default Home;