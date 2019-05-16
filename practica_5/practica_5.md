# Práctica 5
### Autores
Eugenio Alcántara García  
Pablo García Llorente

## Crear un tar con ficheros locales y copiarlos en un equipo remoto
En la prática 2 ya vimos cómo dejar un tar.gz en un directorio y moverlo a otro mediante la herramienta SSH. Al juntarlos mediante un pipe, logramos de forma directa, obtener el tar del equipo de destino en ese caso. Esto lo que tiene que hacer es coger la salida del tar para escribirla en un fichero. Todo esto lo haríamos mediante el comando: 

    $ tar czf - directorio | ssh equipodestino 'cat > ~/tar.tgz'
    
![Imagen 1](./imagenes/imagen_1.PNG)    

## Crear una BD e insertar datos
Para seguir con la prática, debemos de crear un base de datos en MySQL e insertarle algunos datos. Con ello tenderemos datos para poder hacer las copias de seguridad de ahora en adelante. En todo momento haremos uso de la interfaz de línea de comandos de MySQL.  

## Replicar una BD MySQL con mysqldump

## Replicación de BD mediante una configuración maestro-esclavo


![iptables arranque](./imagenes/iptablesArranque.PNG)



 

