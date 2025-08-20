import React from 'react';

interface HeaderProps {
  username: string;
  title: string;
  color: string;
  subtitle?: string;
  cartQty: number,
}

const Header = ({ username, title, color, subtitle, cartQty }: HeaderProps) => {
  return (
    <header
      style={{
        backgroundColor: color,
        padding: '10px',
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
      }}>
      <div >
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <p>Bienvenido, {username}!</p>
      <div style={{ position: 'relative'}}>
        Carrito: {cartQty}
      </div>
    </header>
  );
};

export default Header;
