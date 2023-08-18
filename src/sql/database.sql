CREATE DATABASE libreria02;
USE  libreria02;

-- ------------------------------------------------

CREATE TABLE autores(
    id_autor INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50)
);

CREATE TABLE libros(
    id_libro INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(50),
    año VARCHAR(50),
    id_autor INT, 
    genero varchar(50),
    FOREIGN KEY (id_autor) REFERENCES autores(id_autor)
);


CREATE TABLE clientes(
    id_cliente INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR (50),
    apellido VARCHAR(50),
    email VARCHAR(50)
);


CREATE TABLE prestamos(
    id_prestamo INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_libro INT ,
    id_cliente INT,
	fecha_prestamo DATE,
    fecha_devolucion DATE,
    FOREIGN KEY (id_libro) REFERENCES libros(id_libro),
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
    
);


--------------------------------------- CARGAR EJEMPLOS---------------------------------
insert into autores(nombre) values("Yae Miko");
insert into autores(nombre) values("Epicteto");
insert into autores(nombre) values("Marco Aurelio");
insert into autores(nombre) values("Sócrates");
insert into autores(nombre) values("Crispo");

insert into clientes(nombre,apellido,email) values("Hu","Tao","hutao@gmail.com");
insert into clientes(nombre,apellido,email) values("Juan","Dominguez","juan@gmail.com");
insert into clientes(nombre,apellido,email) values("Gabriel","Pepe","gabipepe@gmail.com");
insert into clientes(nombre,apellido,email) values("Jhon","Salchi","jhon@gmail.com");
insert into clientes(nombre,apellido,email) values("Marcos","Polo","hutao@gmail.com");


insert into libros(titulo,año,id_autor,genero) values("Rio azul","2000",1,"novela");
insert into libros(titulo,año,id_autor,genero) values("Disertaciones","1700",2,"filosofía");
insert into libros(titulo,año,id_autor,genero) values("Divina Comedia","2010",3,"comedia");
insert into libros(titulo,año,id_autor,genero) values("Spirit","1888",4,"fantasía");
insert into libros(titulo,año,id_autor,genero) values("Happy Dog","1920",5,"cuento");

-- ---------------------------------------------------------------------------------------



select * from libros;
select * from autores;
select * from prestamos;
select * from clientes;

SET SQL_SAFE_UPDATES = 0;

DELETE FROM clientes;
ALTER TABLE libros AUTO_INCREMENT = 1;
ALTER TABLE autores AUTO_INCREMENT = 1;
ALTER TABLE prestamos AUTO_INCREMENT = 1;
ALTER TABLE clientes AUTO_INCREMENT = 1;
