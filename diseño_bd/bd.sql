DROP TABLE IF EXISTS usuarios CASCADE;
DROP TABLE IF EXISTS respuestas CASCADE;
DROP TABLE IF EXISTS eventos CASCADE;
DROP TABLE IF EXISTS presupuestos CASCADE;
DROP TABLE IF EXISTS generos CASCADE;
DROP TABLE IF EXISTS estudios CASCADE;
DROP TABLE IF EXISTS ocupaciones CASCADE;
DROP TABLE IF EXISTS con_quien_sale_habitualmente CASCADE;

--CREACION DE TABLAS
CREATE TABLE estudios
(id_estudio serial PRIMARY KEY, nombre_estudio VARCHAR);

CREATE TABLE con_quien_sale_habitualmente
(id_con_quien_sale serial PRIMARY KEY, persona_con_quien_sale VARCHAR);

CREATE TABLE generos
(id_genero SERIAL PRIMARY KEY, genero VARCHAR);

CREATE TABLE ocupaciones
(id_ocupacion SERIAL PRIMARY KEY, nombre_ocupacion VARCHAR);

CREATE TABLE eventos
(id_evento SERIAL PRIMARY KEY, nombre_evento VARCHAR);

CREATE TABLE usuarios
(id_usuario SERIAL PRIMARY KEY, id_genero int, id_estudio int,
    id_ocupacion int, id_con_quien_sale int, edad int, gasto_semanal_ocio int,
    FOREIGN KEY(id_genero) REFERENCES generos,
    FOREIGN KEY(id_estudio) REFERENCES estudios,
    FOREIGN KEY(id_ocupacion) REFERENCES ocupaciones,
    FOREIGN KEY(id_con_quien_sale) REFERENCES con_quien_sale_habitualmente);
	
CREATE TABLE presupuestos
(id_usuario int, id_evento int, presupuesto int,
    FOREIGN KEY(id_usuario) REFERENCES usuarios,
    FOREIGN KEY(id_evento) REFERENCES eventos);

CREATE TABLE respuestas
(id_respuesta SERIAL PRIMARY KEY, id_usuario int, id_evento int, puntaje int,
    FOREIGN KEY(id_usuario) REFERENCES usuarios,
	FOREIGN KEY(id_evento) REFERENCES eventos);

--Insercion de los eventos
INSERT INTO eventos(nombre_evento) values('Evento Deportivo');
INSERT INTO eventos(nombre_evento) values('Conciertos');
INSERT INTO eventos(nombre_evento) values('Bar al Aire Libre');
INSERT INTO eventos(nombre_evento) values('Galería de Arte');
INSERT INTO eventos(nombre_evento) values('Conferencias');
INSERT INTO eventos(nombre_evento) values('Exposición Canina');
INSERT INTO eventos(nombre_evento) values('Teatro');
INSERT INTO eventos(nombre_evento) values('Cine');
INSERT INTO eventos(nombre_evento) values('Feria del Libro');

--Insercion de los generos
INSERT INTO generos(genero) values('Hombre');
INSERT INTO generos(genero) values('Mujer');
INSERT INTO generos(genero) values('No Binario');

--Insercion de las ocupaciones
INSERT INTO ocupaciones(nombre_ocupacion) values('Estudiante');
INSERT INTO ocupaciones(nombre_ocupacion) values('Empleado y Estudiante');
INSERT INTO ocupaciones(nombre_ocupacion) values('Empleado');
INSERT INTO ocupaciones(nombre_ocupacion) values('Desempleado');
INSERT INTO ocupaciones(nombre_ocupacion) values('Voluntario');
INSERT INTO ocupaciones(nombre_ocupacion) values('Inválido');
INSERT INTO ocupaciones(nombre_ocupacion) values('No Contesta');

--Insercion de los estudios
INSERT INTO estudios(nombre_estudio) values('Primaria incompleta');
INSERT INTO estudios(nombre_estudio) values('Primaria');
INSERT INTO estudios(nombre_estudio) values('Bachiller');
INSERT INTO estudios(nombre_estudio) values('Técnico');
INSERT INTO estudios(nombre_estudio) values('Tecnólogo');
INSERT INTO estudios(nombre_estudio) values('Universitario');
INSERT INTO estudios(nombre_estudio) values('No Contesta');

--Insercion tabla con_quien_sale_habitualmente
INSERT INTO con_quien_sale_habitualmente(persona_con_quien_sale) VALUES('Solo');
INSERT INTO con_quien_sale_habitualmente(persona_con_quien_sale) VALUES('Con su cónyuge, pareja, novia/a');
INSERT INTO con_quien_sale_habitualmente(persona_con_quien_sale) VALUES('Con sus padres');
INSERT INTO con_quien_sale_habitualmente(persona_con_quien_sale) VALUES('Con familiares con los que no vive habitualmente');
INSERT INTO con_quien_sale_habitualmente(persona_con_quien_sale) VALUES('Con un grupo de amigos');
INSERT INTO con_quien_sale_habitualmente(persona_con_quien_sale) VALUES('Con el centro escolar');
										 
--select * from con_quien_sale_habitualmente
--select * from estudios
--select * from eventos
--select * from generos
--select * from ocupaciones
--select * from presupuestos
--select * from respuestas
--select * from usuarios
--
/* Union de tablas para busqueda de usuarios
select id_usuario, genero, nombre_estudio, nombre_ocupacion, persona_con_quien_sale, edad, gasto_semanal_ocio
	from usuarios natural join generos natural join estudios natural join ocupaciones
		natural join con_quien_sale_habitualmente
*/

--INSERCION DE LOS USUARIOS
--1, Hombre, Primaria, Empleado, Con conyuge, 42, 250000
INSERT INTO usuarios(id_genero, id_estudio, id_ocupacion, id_con_quien_sale, edad, gasto_semanal_ocio)
    VALUES(1, 2, 3, 2, 42, 250000);
--2, Mujer, Tecnico, Empleado y Estudiante, Con padres, 22, 80000
INSERT INTO usuarios(id_genero, id_estudio, id_ocupacion, id_con_quien_sale, edad, gasto_semanal_ocio)
    VALUES(2, 4, 2, 3, 22, 80000);
--3, Mujer, No contesta, Desempleado, Con amigos, 19, 50000
INSERT INTO usuarios(id_genero, id_estudio, id_ocupacion, id_con_quien_sale, edad, gasto_semanal_ocio)
    VALUES(2, 7, 4, 5, 19, 50000);