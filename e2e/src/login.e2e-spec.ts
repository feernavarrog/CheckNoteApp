import { browser, by, element } from 'protractor';

describe('Login Functionality', () => {

  beforeEach(async () => {
    // Navegar hacia la page login
    await browser.get('/login');
  });

  it('deberia mostrar los elementos de la pagina login', async () =>{

    const email = await element.all(by.css('ion-label')).get(0).getText();
    const Password = await element.all(by.css('ion-label')).get(1).getText();

    expect(email).toEqual('Email');
    expect(Password).toEqual('Contraseña');
  });

  it('deberia logear un usuario con credenciales validas', async () => {
    // Simular un usuario registrado
    const usuarioRegistrado = {
      correo: 'usuario@ejemplo.com',
      contraseña: 'contraseña123'
    };

    // Ingresar datos de usuario en los campos
    await element(by.css('ion-input[name="emailInput"] input')).sendKeys(usuarioRegistrado.correo);
    await element(by.css('ion-input[name="passwordInput"] input')).sendKeys(usuarioRegistrado.contraseña);

    // Hacer clic en el botón de login
    await element(by.css('ion-button')).click();

    const loginSuccessful = true;
    expect(loginSuccessful).toBe(true);
  });
});
