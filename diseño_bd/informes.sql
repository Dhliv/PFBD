/*
select id_usuario, genero, nombre_estudio, nombre_ocupacion, persona_con_quien_sale, edad, gasto_semanal_ocio
	from usuarios natural join generos natural join estudios natural join ocupaciones
		natural join con_quien_sale_habitualmente
*/

--select * from con_quien_sale_habitualmente
--select * from estudios
--select * from eventos
--select * from generos
--select * from ocupaciones
--select * from presupuestos
--select * from respuestas
--select * from usuarios

------------------------------------------------------
------------Evento------------------------------------
--Evento con mas preferencia
select nombre_evento as evento, sum(puntaje) as preferencia from respuestas
natural join eventos
group by nombre_evento
order by preferencia desc

--Evento con mas presupuesto 
select nombre_evento as evento, cast(avg(presupuesto) as int) as promedio_presupuesto from presupuestos
natural join eventos
group by nombre_evento
order by promedio_presupuesto desc

------------------------------------------------------------
-----------Genero--------------------------------------------
--Promedio de gasto semanal en ocio por genero
select genero, avg(gasto_semanal_ocio) as promedio_gasto_semanal from usuarios
natural join generos
group by genero
order by promedio_gasto_semanal desc

------------------------------------------------------
-------------Estudio----------------------------------
--Promedio de gasto semanal en ocio por formacion de estudio
select nombre_estudio as formacion_estudio, avg(gasto_semanal_ocio) promedio_gasto_semanal from usuarios
natural join estudios
group by nombre_estudio
order by promedio_gasto_semanal desc

---------------------------------------------------------
-----------Ocupaciones-----------------------------------
--Promedio de gasto semanal en ocio por ocupacion
select nombre_ocupacion as ocupacion, cast(avg(gasto_semanal_ocio) as int) as promedio_gasto_semanal from usuarios
natural join ocupaciones
group by nombre_ocupacion
order by promedio_gasto_semanal desc

-----------------------------------------------------------
-------------Con quien suelen salir habitualmente----------
select persona_con_quien_sale, count(persona_con_quien_sale) as total from usuarios
natural join con_quien_sale_habitualmente
group by persona_con_quien_sale
order by total DESC