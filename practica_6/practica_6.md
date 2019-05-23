# Práctica 6
### Autores
Eugenio Alcántara García  
Pablo García Llorente

## Configurar el servidor NFS
Vamos a proceder a configurar un servidor NFS con el fin de exportar un espacio en disco a los servidores finales. Los cuales actuarán como clientes-NFS.

Para comenzar instalaremos las herramientas que vamos a necesitar en el servidor. Para instalarlas haremos uso de la orden:

    $ sudo apt-get install nfs-kernel-server nfs-common rpcbind
    
Ahora crearemos la carpeta que vamos a compartir posteriormente. Además cambiaremos el propietario y los permisos de la carpeta. Todo ello lo haremos ejecutando las siguientes 3 instrucciones:

    $ mkdir /dat/compartida
    $ sudo chown nobody:nogroup /dat/compartida/ 
    $ sudo chmod -R 777 /dat/compartida/

    

## Configurar los clientes

![Imagen6](./imagenes/)
    
