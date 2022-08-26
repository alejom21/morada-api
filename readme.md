## API Morada App

#Modules
- Usuarios
- Propiedades

## API Reference

Method | Endpoint | Data        | Auth Required
------ | -------- | ----------- | -------------
`POST` | /login   | body: { email, password } | No
`POST` | /Register| body: { form }            | No
`POST` | /Register| body: { title, ... }      | No
`GET ` | /Register:UserName| url: UserName    | Si

### Propiedades

Method | Endpoint | Data       | Auth Required
------ | --------  | ---------- | -------------
`GET`  | /property | query: type, bussinesType | No
obtener todas las propiedades con opcion de filtro
`GET`  | /property/:id | url: id               | No
obtener una sola propiedad, detalle
`POST` | /property | body: { title, ... }      | Si
Agregar una propiedad
`DELETE` | /property/:id | url: id             | Si
Eliminar una propiedad
`PUT`  | /property/:id | body: { title, ... }  | Si
Actualizar una propiedad
`POST` | /property/:id | body: { comentario }  | Si
Notificar interes sobre una propiedad