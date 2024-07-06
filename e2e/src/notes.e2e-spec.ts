import { browser, by, element } from 'protractor';
describe('Test de elementos en la página Home', () => {
  beforeEach(async () => {
    // Establecer sessionStorage para simular usuario autenticado
    await browser.executeScript(`window.sessionStorage.setItem("test", "true");`);
    await browser.get('/home');
  });

  it('deberia mostrar los elementos principales de la page Home', async () => {

    const pageTitle = await element(by.tagName('ion-title')).getText();
    const suggestionText = element(by.css('ion-card-content p'));
    const newNoteButton = element.all(by.css('ion-button[color="dark"][expand="block"]')).get(1);
    const newTaskButton = element.all(by.css('ion-button[color="dark"][expand="block"]')).get(0);
    
    expect(pageTitle).toEqual('CheckNote APP');
    expect(await suggestionText.isPresent());
    expect(await newNoteButton.getText()).toEqual('NUEVA NOTA');
    expect(await newTaskButton.getText()).toEqual('NUEVA TAREA');
  });

  it('deberia navegar hacia lista de notas"', async () => {
    // Obtener el boton de notas
    const goToNotesButton = element.all(by.css('ion-button[color="dark"][expand="block"]')).get(2);
    await goToNotesButton.click();

    // Esperar a que se cargue la página de notas
    await browser.waitForAngularEnabled(false); 
    await browser.sleep(2000);

    const segmentElement = element(by.css('ion-segment'));
    expect(await segmentElement.isPresent()).toBeTruthy(); // Verificar la presencia de los elementos
  });

  it('debería navegar hacia lista de tareas"', async () => {
    // Obtener el texto del botón "Nueva tarea"
    const goToNotesButton = element.all(by.css('ion-button[color="dark"][expand="block"]')).get(3);
    await goToNotesButton.click();

    // Esperar a que se cargue la página de lista de tareas
    await browser.waitForAngularEnabled(false);
    await browser.sleep(2000);

    const segmentElement = element(by.css('ion-segment'));
    expect(await segmentElement.isPresent()).toBeTruthy(); // Verificar la presencia de los elementos
  });

});
