:: Este archivo batch comprueba si hay problemas de conexión de red
ECHO OFF
:: Ver detalles de conexión de red
ECHO cambiando directorio

::CD /C "c:\Users\DevMax\Documentos\Sistemas\Ceyco\f3\front"
ECHO iniciando servidor 
Call "C:\Program Files\nodejs\npm.cmd" run start
:: Comprobar si se puede acceder a Google.com

PAUSE