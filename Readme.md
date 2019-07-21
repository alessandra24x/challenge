Test práctico para aspirantes al área de front-end de Mercado Libre. Se trata de una pequeña aplicación que consta de la creación de un sencillo CRUD.

## Como Iniciar

### Instalación

Clonarlo:
```
git clone https://github.com/alessandra24x/challenge.git

```
npm install
npm start

Una vez hecho esto el proyecto estará corriendo en la dirección:
```
```
http://localhost:3000/

```

Las rutas son las siguientes:
```
GET /ping: Devuelve la palabra *pong*

GET /user/list: Devuelve una tabla filtrable con los  datos de los usuarios que hayan rellenado el formulario

POST /user: Recibe un objeto JSON con el usuario especifíco y crea un nuevo usuario, asignando un ID de incremento automático.
{
name: string,
lastName: string,
phone: string,
email: string
}

GET /user/form: Devuelve un formulario que recibe la información suministrada por el usuario y la envía a través de un método POST creando un nuevo usuario.

GET /user/form/{userId}: Muestra el mismo formulario usado anteriormente para crear un nuevo usuario, pero esta vez con información precargada, al envíar se realiza una solicitud PUT actualizando la información del usuario con los datos proporcionados.

PUT /user/{userId}: Actualiza al usuario con la información que proviene del objeto JSON  (igual que en POST /user)

DELETE /user/{userId} : Elimina a un usuario específico de la "base de datos".

```

## ****Tecnologías******

```
Se utilizó:

**NodeJs, Express**: Para administrar la creación del Servidor y declarar las rutas a las cuales responde la aplicación. Express generator para generar la estructura del proyecto.

**JavaScript**: JS vanilla para desarrollar la lògica y funcionalidad de la aplicación del lado del cliente.

**HandlebarJS**: Template engine para generar las vistas necesarias.

**Sass**: Preprocesador para dar estilos y una mejor apariencia.

```