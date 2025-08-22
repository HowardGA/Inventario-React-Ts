import { useGetPost } from "../features/cart/hooks/ExampleHook";
import { List, Spin, Alert } from "antd";

const Home = () => {
    const { data, isLoading, error } = useGetPost(); // Usamos el hook personalizado para obtener los posts
    // data es la respuesta de la API, isLoading indica si la solicitud está en curso, y error captura cualquier error que ocurra

    if (error) return <Alert message="Error al cargar los posts" type="error" />;// Si hay un error, mostramos un mensaje de alerta
    if (isLoading) return <Spin size="large" />; // Mientras se cargan los datos, mostramos un spinner de carga

    // Definismos el tipo de datos que esperamos recibir de la API
    type Post = {
        id: number;
        title: string;
        body: string;
    }

    return (
        <>
            <h1>Home Page</h1>
            <List
                itemLayout="horizontal"
                dataSource={data} // Usamos los datos obtenidos de la API
                renderItem={(item: Post) => ( // Iteramos sobre cada post y rederizamos un elemento de la lista
                    // item es de tipo Post, lo que nos permite acceder a sus propiedades con seguridad (typescript)
                    <List.Item>
                        <List.Item.Meta
                            title={item.title} // Mostramos el título del post
                            description={item.body} // Mostramos el cuerpo del post
                        />
                    </List.Item>
                )}
            />
        </>
    )
}

export default Home;