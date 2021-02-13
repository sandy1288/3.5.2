describe('PO special instruction', function () {
  var EC = protractor.ExpectedConditions;
  var fac_name = browser.params.user.fac_name;
  var randNumber = browser.params.itemCatalog.randNumber;


  it('Open PO Special instruction module', function () {
    element(by.cssContainingText('a.hybrent-blue', 'Admin')).click();
    browser.sleep(2000);
    element(by.linkText('PO Special Instructions')).click();
    browser.sleep(2000);
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 5000);
    expect(browser.getTitle()).toEqual('PO Special Instructions');
  });

  it('verify that search and facility fiter with search and add button appear on the page', function () {
    expect(element(by.model('searchFilter')).isPresent()).toBeTruthy();
    expect(element(by.buttonText('Search')).isPresent()).toBeTruthy();
  });

  it('add new instruction', function () {
    element(by.buttonText('Add')).click();
    browser.sleep(2000);
    element(by.model('SpecialInstructionsData.special_instruction')).sendKeys(randNumber);
    element(by.buttonText('Save')).click();
    browser.sleep(2000);
    expect($('.toast-message').getText()).toEqual('Special Instruction created successfully.');
  });

  it('search newly created instruction by name', function () {
    element(by.model('searchFilter')).sendKeys(randNumber);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    expect(element(by.repeater('specialInstruction in specialInstructions')).getText()).toContain(randNumber);
  });

  it('update the newly special instruction', function () {
    element(by.xpath('//i[@class="fa fa-edit"]')).click();
    browser.sleep(2000);
    element(by.buttonText('Save')).click();
    browser.sleep(2000);
    expect($('.toast-message').getText()).toEqual('Special Instruction updated successfully.');
  });

  it('delete newly created special instruction', function () {
    element(by.css(".fa-trash")).click();
    browser.sleep(2000);
    element(by.css(".confirm")).click();
    browser.sleep(1000);
    expect($('.toast-message').getText()).toEqual('Special Instruction deleted successfully.');
  });

});