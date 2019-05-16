# Práctica 5
### Autores
Eugenio Alcántara García  
Pablo García Llorente

## Crear un tar con ficheros locales y copiarlos en un equipo remoto
En la práctica 2 ya vimos cómo dejar un tar.gz en un directorio y moverlo a otro mediante la herramienta SSH. Al juntarlos mediante un pipe, logramos de forma directa, obtener el tar del equipo de destino en ese caso. Esto lo que tiene que hacer es coger la salida del tar para escribirla en un fichero. Todo esto lo haríamos mediante el comando: 

    $ tar czf - directorio | ssh equipodestino 'cat > ~/tar.tgz'

## Crear una BD e insertar datos
Para seguir con la práctica, debemos de crear un base de datos en MySQL e insertarle algunos datos. Con ello tenderemos datos para poder hacer las copias de seguridad de ahora en adelante. En todo momento haremos uso de la interfaz de línea de comandos de MySQL. Para poder iniciar esta línea de comandos escribiremos el comando:

    $ mysql -u root -p
    
Una vez estemos dentro de la interfaz de línea de comandos MySQL, vamos a crear nuestra base de datos llamada "datos" e insertarle datos (un registro) en el interior de esta. Todo esto lo hemos hecho con los siguientes comandos de la línea de comandos de MySQL. 

    $ mysql> create database contactos;
    $ mysql> use contactos;
    $ mysql> create table datos(nombre varchar(100),tlf int);
    $ mysql> insert into datos(nombre,tlf) values ("pepe",95834987);
    
Para poder comprobar que todo está correcto podríamos hacer uso del comando:

    $ mysql> select * from datos;
    
![Imagen 2](./imagenes/añadir_pepe_a_tabla.PNG)        

## Replicar una BD MySQL con mysqldump
La herramienta mysqldump, ofrecida por MySQL, nos permite clonar la base de datos que tenemos en nuestra máquina. Esta herramienta forma parte de los programas del cliente MySQL y se pude hacer uso de ella para hacer copias de seguridad de la base de datos. Pero antes de hacer uso de esta herramienta, tendríamos que tener en cuenta que los datos pueden estár actualizándose constantemente en el servidor de BD de datos principal. Por ello vamos a evitar que se acceda a la BD para cambiar nada, antes de hacer la copia de seguridad en el archivo .SQL. 

Máquina 1:

    $ mysql -u root –p
    $ mysql> FLUSH TABLES WITH READ LOCK;
    $ mysql> quit
    
Con ello lo que habremos hecho es bloquear las tablas de la máquina 1. Por lo que ya podremos proceder a usar mysqldump para guardar los datos. 

Máquina 1:
    
    $ mysqldump ejemplodb-u root -p > /tmp/ejemplodb.sql
    
Después de usar la orden anterior, ya sí podemos desbloquear las tablas. 

Máquina 1:

    $ mysql -u root –p
    $ mysql> UNLOCK TABLES; 
    
Ahora ya podemos ejecutar la copia de seguridad en la máquina 2. 

Máquina 2:

    $ scp maquina1:/tmp/ejemplodb.sql /tmp/
    
Al haber ejecutado el comando anterior, ya tendremos el archivo en la máquina 2 y podemos importar la base de datos completa en el MySQL. Para ello creamos la BD con las líneas de comando de a continuación. 

Máquina 2: 

    $ mysql -u root –p
    $ mysql> CREATE DATABASE ‘ejemplodb’;
    
Ahora vamos a restaurar los datos contenidos en la base de datos. 

    $ mysql -u root -p ejemplodb < /tmp/ejemplodb.sql
    
![Imagen 3](./imagenes/imagen_3.PNG)    

## Replicación de BD mediante una configuración maestro-esclavo
A pesar de que lo realizado anteriormente funciona perfectamente, es realizado por un operador a mano, por lo que no es muy eficiente. Por suerte MySQL tiene la opción de hacer uso de un proceso automático. A nivel de un entorno de producción real, resulta muy adecuado.  

Para poder hacer uso de este proceso, lo primero que tendremos que hacer es la configuración de mysql del maestro. Siendo usuario root, vamos a editar el archivo /etc/mysql/mysql.conf.d/mysqld.cnf. Las modificaciones que tenemos que realizar a contianuación:

    bind-address 127.0.0.1
    log_error = /var/log/mysql/error.log
    server-id = 1
    log_bin = /var/log/mysql/bin.log
    /etc/init.d/mysql restart

