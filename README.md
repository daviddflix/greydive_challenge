# Form Project

Este proyecto tiene dos rutas: una para el formulario en la raíz (/) y otra para las respuestas (/responses). Los clientes pueden llenar sus datos de contacto en el formulario y enviarlos, y luego pueden ver las respuestas en la ruta de respuestas.

## Instalación

Utiliza el administrador de paquetes npm para instalar todas las dependencias.

```bash
npm install
```


## Tecnologías utilizadas
Este proyecto utiliza las siguientes tecnologías:

HTML   
CSS   
JavaScript   
React   
Firebase
## Cómo funciona
Este proyecto envía los datos del formulario a una base de datos en Firebase utilizando una biblioteca de JavaScript llamada firebase.js. Después de enviar los datos, la aplicación recupera los datos de la base de datos y los muestra en la ruta de respuestas.

Para ejecutar este proyecto, primero debes seguir estos pasos:

1. Clona este repositorio en tu computadora local.   
2. Crea una cuenta en Firebase y crea un nuevo proyecto.      
3. En la sección de configuración del proyecto de Firebase, encontrarás las credenciales de tu proyecto. Copia estas credenciales en un archivo llamado firebase-config.js en la carpeta src.
4. En la sección de base de datos de Firebase, crea una nueva colección llamada responses.
5. Ejecuta npm install para instalar las dependencias necesarias.
6. Ejecuta npm start para iniciar el servidor.   

Ahora, puedes abrir tu navegador y visitar la URL http://localhost:3000 para ver el formulario y enviar tus datos de contacto. También puedes visitar http://localhost:3000/responses para ver las respuestas que se han enviado hasta el momento.

## Contribuciones
Si deseas contribuir a este proyecto, puedes hacer un fork del repositorio y crear una solicitud de extracción con tus cambios. También puedes informar de cualquier problema o error que encuentres abriendo un problema en el repositorio.

## License

[MIT](https://choosealicense.com/licenses/mit/)
