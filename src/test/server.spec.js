import request from 'supertest';
import { app } from '../../index.js'

let token; //Variable global para guardar el token

describe("Testeo de respuestas en 4 rutas en distintos escenarios", () => {
  it("testeo de response status code 200 al iniciar sesion en ruta POST/user/login", async () => {
    //tengo este usuario agregado en mi base de dato con una direccion asignada y su rol es admin
    const data = {
      email: "email.usuario@email.com",
      password: "1234"
    }
    const response = await request(app).post("/user/login").send(data);
    expect(response.statusCode).toBe(200);

    token = response.body.token;
  });

  it("testeo de response status code 400 cuando no encuentra el usuario al iniciar sesion en ruta POST/user/login", async () => {
    //tengo este usuario agregado en mi base de dato con una direccion asignada
    const data = {
      email: "emaill.usuario@email.com",
      password: "1234"
    }
    const response = await request(app).post("/user/login").send(data);
    expect(response.statusCode).toBe(400);
  });

  it("testeo de response status code 200 en la ruta GET/usuarios", async () => {
    const response = await request(app).get("/usuarios").set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
  });

  it("testeo de response status code 401 cuando no se provee un token en la ruta GET/usuarios", async () => {
    const response = await request(app).get("/usuarios");
    expect(response.statusCode).toBe(401);
  });

  it("testeo de response status code 404 cuando se usa un token invalido en la ruta GET/usuarios", async () => {
    const response = await request(app).get("/usuarios").set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");
    expect(response.statusCode).toBe(404);
  });

  it("testeo de response status code 200 en ruta GET/productos y verificar que devuelve un Array", async () => {
    const response = await request(app).get("/productos").send();
    const body = response.body;
    expect(response.statusCode).toBe(200);
    expect(body).toBeInstanceOf(Array);
  });

  it("testeo de response status code 200 en la ruta GET/usuarios/:id", async () => {
    //se debe tener un usuario en la base de datos para probar
    const response = await request(app).get("/usuarios/2").set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
  });

  it("testeo de response status code 500 cuando hay un error en la query de la ruta GET/usuarios/:id", async () => {
    //no debe existir un usuario con esa id en la base de datos
    const response = await request(app).get("/usuarios/aa").set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(500);
  });

});



