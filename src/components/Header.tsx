import React from 'react';

//mediante una interfaz definimos las propiedades que recibirá el componente
//en este caso, username, title y color
//esto permite que TypeScript verifique los tipos de las propiedades al usarlas
interface HeaderProps {
  username: string;
  title: string;
  color: string;
  subtitle?: string; //al utilizar '?', indicamos que esta propiedad es opcional
}

const Header: React.FC<HeaderProps> = ({ username, title, color, subtitle }) => {
  return (
    <header
      style={{// style={{}} es un objeto de estilo en línea que se aplica al elemento
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
    </header>
  );
};

export default Header;
