import { AgileTimesPage } from './app.po';

describe('agile-times App', () => {
  let page: AgileTimesPage;

  beforeEach(() => {
    page = new AgileTimesPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
