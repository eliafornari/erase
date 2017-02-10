import { ErasePage } from './app.po';

describe('erase App', function() {
  let page: ErasePage;

  beforeEach(() => {
    page = new ErasePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
