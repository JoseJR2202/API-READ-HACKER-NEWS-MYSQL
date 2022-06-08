# Api_Read_hacker_News

Este  proyecto es una version alternativa del hecho previamente (https://github.com/JoseJR2202/API-READ-HACKER-NEWS), pero utilizando una base de datos Mysql

Este proyecto representa una pequeña API dedicada a la obtención y visualizacion de la información proporcionada por hackernews acerca de temas referentes a NodeJS.

La Api tambien cuenta con una documentacion generada mediante el uso swagger. Para acceder a la documentacion use la ruta `/documentation`

## Cómo Probar

1. Clona o descarga el repositorio.

2. Montar la base de datos correspondiente:

El código de la base de datos relacional necesaria para la correcta ejecución de este proyecto es el que se encuentra en la carpeta BD, está hacer referencia al  diagrama observado en el siguiente link https://dbdiagram.io/d/620c4858485e433543bb23dd

3. Instalar todas las dependencias.

4. Cree un .env en el que coloco la variable de entorna DATABASE_URL igualada a la direccion de su base de datos postgresql (ejemplo: "postgres://postgres:*****@localhost:5432/hackernews")

5. ejecute el comando `npm start`

6. Realizar una petición a la API de hackernews (opcional, puede esperar a la primera lectura realizada cada hora):

Enviar una solicitud del tipo get al endpoint `/api`.

7. Probar la Api enviando solicitudes a sus endpoints.

## Como probar el testing 

Completada los pasos de la seccion anterior se puede proceder a probar el funcionamiente del testing o pruebas unitarias establecidas, en el caso de este proyecto fueron realizadas con jest y supertest, ademas de los correspondientes paquetes necesario para su funcionamiento en typescript.

Para realizar la prueba ejecuta el comando `npm test`.

Podra ver los resultados al finalizar su ejecucion, ademas se creara la carpeta llamada `coverage` en ella encontrara un index html, el cual al clickear le permitira visualizar la informacion acerca del testing (esta misma se puede observar en la consola)

## Caracateristicas

* Cada hora a los 0 minutos (ejemplo 4:00), el servidor realizará una petición a la API de hackernews para obtener nueva información.

* La informacion se clasifica en Storys (historias, temas, discusiones) y en Comments (Comentarios de las anterios).

* Algunas historias/discusiones no tienen toda su informacion completa, esto es debido a que su informacion tuvo que ser optinida de un comentario, ya que cada comentario se debe encontrar asociado a una historia/discusion.

* en la carpeta postman se encuentra el archivo para la creacion de la collecion de prueba, remplazar la variable `{{host}}` por `localhost:5000`, o setear la variable

