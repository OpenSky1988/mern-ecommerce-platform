import {
  AimOutlined,
  FacebookFilled,
  InstagramOutlined,
  MailOutlined,
  PhoneOutlined,
  RedditOutlined,
  TwitterOutlined,
} from '@ant-design/icons';
import React from 'react';
import { Link } from 'react-router-dom';

import './style.less';

const SocialLinks: React.FC<{}> = () => (
  <div className="footer__left__socials">
    <div style={{ backgroundColor: '#3B5999' }} className="social-icon">
      <FacebookFilled />
    </div>
    <div style={{ backgroundColor: '#E4405F' }} className="social-icon">
      <InstagramOutlined />
    </div>
    <div style={{ backgroundColor: '#55ACEE' }} className="social-icon">
      <TwitterOutlined />
    </div>
    <div style={{ backgroundColor: '#E60023' }} className="social-icon">
      <RedditOutlined />
    </div>
  </div>
);

const FooterCategories: React.FC = () => (
  <ul>
    <li>
      <Link key="home" to={'/'}>Домой</Link>
    </li>
    <li>
      <Link key="cart" to={'/cart'}>Корзина</Link>
    </li>
    <li>
      <Link key="underwear" to={`/products?category=underwear`}>Нижнее бельё</Link>
    </li>
    <li>
      <Link key="shoes" to={`/products?category=shoes`}>Обувь</Link>
    </li>
    <li>
      <Link key="jeans" to={`/products?category=jeans`}>Деним</Link>
    </li>
    <li>
      <Link key="accesoires" to={`/products?category=accesoires`}>Аксессуары</Link>
    </li>
    <li>
      <Link key="coat" to={`/products?category=coat`}>Пальто</Link>
    </li>
    <li>
      <Link key="jackets" to={`/products?category=jackets`}>Куртки</Link>
    </li>
    <li>Мой Кабинет</li>
    <li>
      <Link key="orders" to={'/orders'}>Мои Заказы</Link>
    </li>
    <li>Условия</li>
  </ul>
);

const Contacts: React.FC<{}> = () => (
  <>
    <div className="footer__right__contact-item">
      <AimOutlined style={{ marginRight: '10px' }}/> 660049 г. Красноярск, ул. Карла Маркса, д. 10
    </div>
    <div className="footer__right__contact-item">
      <PhoneOutlined style={{ marginRight: '10px' }}/> +7 987 654 3210
    </div>
    <div className="footer__right__contact-item">
      <MailOutlined style={{ marginRight: '10px' }} /> contact@lamarkt.ru
    </div>
  </>
);

const Footer: React.FC<{}> = () => {
  return (
    <div className="footer">
      <div className="footer__left">
        <h1 className="footer__left__logo">LAMARKT</h1>
        <p className="footer__left__description">
          Мы стремимся предоставить лучший сервис, объединяющий людей с тем,
          что им нравится. Чистота дизайна и удобство интерфейса позволят объединить
          потребности заказчика и нужды его клиентов.
        </p>
        <SocialLinks />
      </div>
      <div className="footer__center">
        <h3>Полезные Ссылки</h3>
        <FooterCategories />
      </div>
      <div className="footer__right">
        <h3>Адрес</h3>
        <Contacts />
        <img
          className="footer__right__payment"
          src="https://i.ibb.co/Qfvn4z6/payment.png"
        />
      </div>
    </div>
  );
};

export default Footer;
