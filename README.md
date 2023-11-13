# CityFootie-Web

| HTTP Verb | Route                                              | Description                                                                                      | JSON |
|-----------|----------------------------------------------------|--------------------------------------------------------------------------------------------------|------|
| GET       | `/`                                                | Muestra la vista de inicio donde vamos a hacer una presentación de las funcionalidades de la app |      |
| GET       | `/registrarse`                                     | Muestra la vista de registro                                                                     |      |
| POST      | `/registrarse`                                     | Crea un usuario nuevo con rol 'JUGADOR'                                                          |      |
| GET       | `/iniciar-sesion`                                  | Muestra la vista de inicio de sesión                                                             |      |
| POST      | `/iniciar-sesion`                                  | Permite al usuario iniciar sesión al crearla                                                     |      |
| GET       | `/cerrar-sesion`                                   | Permite al usuario cerrar sesión al borrarla                                                     |      |
| GET       | `/usuarios/detalles/:usuario_id`                    | Muestra la vista con toda la información del usuario                                             |      |
| GET       | `/usuarios/editar/:usuario_id`                     | Muestra la vista con el formulario para editar un usuario                                        |      |
| POST      | `/usuarios/editar/:usuario_id`                     | Permite al organizador y al dueño de la cuenta editar el usuario                                 |      |
| POST      | `/usuarios/borrar/:usuario_id`                     | Permite al organizador eliminar un usuario                                                       |      |
| GET       | `/mapa`                                            | Muestra el mapa                                                                                  |      |
| GET       | `/campos/crear`                                    | Muestra la vista con el formulario para crear un campo                                           |      |
| POST      | `/campos/crear`                                    | Crea un campo nuevo que se vera como un marker                                                   |      |
| GET       | `/fields`                                          | Obtiene de la API todos los markers los campos para pintarlos en pantalla                        |  ✅  |
| GET       | `/fields/details/:field_id`                         | Obtiene de la API la info del marker sobre el que el usuario ha pinchado                         |  ✅  |
| GET       | `/campos/detalles/:campo_id`                        | Muestra la vista con los detalles del campo y sus partidos                         |    |
| GET       | `/campos/editar/:campo_id`                         | Muestra la vista con el formulario para editar un campo                                          |      |
| POST      | `/campos/editar/:campo_id`                         | Permite a un usuario con permisos editar un campo                                                |      |
| POST      | `/campos/borrar/:campo_id`                         | Permite a un usuario con permisos borrar un campo                                                |      |
| GET       | `/partidos/crear/:campo_id`                              | Muestra la vista para crear un partido en un campo                                                 |
| POST      | `/partidos/crear/:campo_id`                              | Crea un partido nuevo vinculado a un campo                                                       |      |
| GET       | `/partidos/detalles/:partido_id`                      | Muestra el partido vinculado al campo sobre el que se ha hecho click                             |      |
| POST      | `/partidos/:partido_id/añadir-jugador/:jugador_id` | Permite a un usuario unirse a un partido                                                         |      |
| POST      | `/partidos/:partido_id/quitar-jugador/:jugador_id` | Permite a un usuario quitarse de un partido                                                      |      |
| GET       | `/partidos/editar/:partido_id`                     | Muestra la vista con el formulario para editar un partido                                        |      |
| POST      | `/partidos/editar/:partido_id`                     | Permite a un usuario con permisos editar un partido                                              |      |
| POST      | `/partidos/borrar/:partido_id`                     | Permite a un usuario con permisos borrar un partido  
