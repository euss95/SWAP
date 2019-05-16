# Práctica 5
### Autores
Eugenio Alcántara García  
Pablo García Llorente

## Crear un tar con ficheros locales y copiarlos en un equipo remoto
En la prática 2 ya vimos cómo dejar un tar.gz en un directorio y moverlo a otro mediante la herramienta SSH. Al juntarlos mediante un pipe, logramos de forma directa, obtener el tar del equipo de destino en ese caso. Esto lo que tiene que hacer es coger la salida del tar para escribirla en un fichero. Todo esto lo haríamos mediante el comando: 

    $ tar czf - directorio | ssh equipodestino 'cat > ~/tar.tgz'
    
![Imagen 1](./imagenes/imagen_1.PNG)    

## Crear una BD e insertar datos
Para seguir con la prática, debemos de crear un base de datos en MySQL e insertarle algunos datos. Con ello tenderemos datos para poder hacer las copias de seguridad de ahora en adelante. En todo momento haremos uso de la interfaz de línea de comandos de MySQL. Para poder iniciar esta línea de comandos escribiremos el comando:

    $ mysql -uroot -p
    
Una vez estemos dentro de la intefaz de línea de comandos MySQL, vamos a crear nuestra base de datos llamada "datos" e insertsrle datos (un registro) en el interior de esta. Todo esto lo hemos hecho con los siguientes comandos de la línea de comandos de MySQL. 

    $ mysql> create database contactos;
    $ mysql> use contactos;
    $ mysql> create table datos(nombre varchar(100),tlf int);
    $ mysql> insert into datos(nombre,tlf) values ("pepe",95834987);
    
Para poder comprobar que todo está correcto podríamos hacer uso del comando:

    $ mysql> select * from datos;
    
![Imagen 2](./imagenes/imagen_2.PNG)        

## Replicar una BD MySQL con mysqldump

## Replicación de BD mediante una configuración maestro-esclavo



 


