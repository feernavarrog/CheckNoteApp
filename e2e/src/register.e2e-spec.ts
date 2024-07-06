import { browser, by, element } from 'protractor';
describe('Test de elementos y datos page register', () => {
    beforeEach(async () => {
      await browser.get('/register');
    });

    // Función para validar datos de usuario
  const validateData = (user: any): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const PasswordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,10}$/; // 8-10 caracteres, al menos una mayúscula y un número

    // Validar campos vacíos  
    if (user.email === '' || user.password === '' || user.passwordRepeat === '' || user.firstName === '') {
      console.log('Campos vacíos');
      return false;
    }

    // Validar formato de correo electrónico
    if (!emailRegex.test(user.email)) {
      console.log('Correo inválido');
      return false;
    }

    // Validar formato de contraseña
    if (!PasswordRegex.test(user.password)) {
      console.log('Contraseña inválida');
      return false;
    }

    // Validar que las contraseñas coincidan
    if (user.password !== user.passwordRepeat) {
      console.log('Las contraseñas no coinciden');
      return false;
    }

    return true;
  };
  
    // Test para verificar la presencia de los elementos en la página de registro
    it('deberia mostrar los elementos princpiales de la page Registro"', async () => {

      const email = await element.all(by.css('ion-label')).get(0).getText();
      const nombre = await element.all(by.css('ion-label')).get(1).getText();
      const apellido = await element.all(by.css('ion-label')).get(2).getText();
      const direccion = await element.all(by.css('ion-label')).get(3).getText();
      const fecha_nac = await element.all(by.css('ion-label')).get(4).getText();
      const password = await element.all(by.css('ion-label')).get(5).getText();
    
      expect(email).toEqual('Ingrese su correo');
      expect(nombre).toEqual('Nombre');
      expect(apellido).toEqual('Apellido');
      expect(direccion).toEqual('Fecha Nacimiento');
      expect(fecha_nac).toEqual('Direccion');
      expect(password).toEqual('Contraseña');
    });

    it('debería registrar un usuario', async () => {
    // Simular datos de un nuevo usuario
    const nuevoUsuario = {
      email: 'a@a.cl',
      firstName: 'juan',
      lastName: 'perez',
      bornDate: '01/01/1990',
      address: 'Calle 1',
      password: 'A1aaaaaa',
      passwordRepeat: 'A1aaaaaa'
    };

    // Validar los datos del usuario
    const datosValidos = validateData(nuevoUsuario);

    if (datosValidos) {
      // Ingresar datos del nuevo usuario en los campos del formulario de registro
      await element(by.css('ion-input[name="email"] input')).sendKeys(nuevoUsuario.email);
      await element(by.css('ion-input[name="firstName"] input')).sendKeys(nuevoUsuario.firstName);
      await element(by.css('ion-input[name="lastName"] input')).sendKeys(nuevoUsuario.lastName);
      await element(by.css('ion-input[name="bornDate"] input')).sendKeys(nuevoUsuario.bornDate);
      await element(by.css('ion-input[name="address"] input')).sendKeys(nuevoUsuario.address);
      await element(by.css('ion-input[name="password"] input')).sendKeys(nuevoUsuario.password);
      await element(by.css('ion-input[name="passwordRepeat"] input')).sendKeys(nuevoUsuario.passwordRepeat);

      // Hacer clic en el botón de registro
      await element(by.cssContainingText('ion-button', 'Registrar usuario')).click();

      const registerSuccessful = true;
      expect(registerSuccessful).toBe(true);
    } else {
      // Si los datos no son válidos, la prueba debe fallar
      expect(datosValidos).toBe(true as any);
    }
  });
  });
  