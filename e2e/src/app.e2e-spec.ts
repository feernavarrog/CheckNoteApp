
import { browser, by, element } from 'protractor';

describe('Aplicación móvil Ionic', () => {
  it('debería mostrar la página de inicio de sesión', async () => {
    await browser.get('/login'); 

    const pageTitle = await element(by.tagName('ion-title')).getText();
    expect(pageTitle).toEqual('Iniciar sesión');
  });
});
