import { CreatorPage } from './app.po';

describe('creator App', () => {
  let page: CreatorPage;

  beforeEach(() => {
    page = new CreatorPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
