describe('GL code moudle', function () {
  var EC = protractor.ExpectedConditions;
  var fac_name = browser.params.user.fac_name;
  var randNumber = browser.params.itemCatalog.randNumber;
  var GL_Code = browser.params.GlCode.code;
  var GLDescription = browser.params.GlCode.Name;

  it('Open GL code module', function () {
    element(by.cssContainingText('a.hybrent-blue', 'Admin')).click();
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 5000);
    browser.sleep(2000);
    var GL_Code = element(by.css("a[ng-href='#/admin/glcode']")); // NOTE: also simplified the selector
    GL_Code.click();
    browser.sleep(2000);
    // element(by.linkText('NuGL')).click();
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 5000);
    expect(browser.getTitle()).toEqual('GLCodes');
  });

  it('verify that search filter appear on the GL code page', function () {
    expect(element(by.model('searchFilter')).isPresent()).toBeTruthy();
    expect(element(by.buttonText('Search')).isPresent()).toBeTruthy();
    browser.sleep(2000);
  });

  it('Add new Gl Code', function () {
    element(by.buttonText('Add')).click();
    browser.sleep(2000);
    element(by.model('GLCodeData.code')).sendKeys(GL_Code + randNumber);
    browser.sleep(2000);
    element(by.model('GLCodeData.name')).sendKeys(GLDescription + randNumber);
    browser.sleep(2000);
    element(by.buttonText('Save')).click();
    browser.sleep(2000);
    expect($('.toast-message').getText()).toEqual('GLCode created successfully.');
  });

  it('verify that user is able to search gl code by name', function () {
    element(by.model('searchFilter')).clear().sendKeys(GLDescription + randNumber);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    expect(element(by.repeater('GLCodeData in GLCodeDatas')).getText()).toContain(GLDescription + randNumber);
  });

  it('delete GL code', function () {
    element(by.model('searchFilter')).clear().sendKeys(GLDescription + randNumber);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.buttonText('Delete')).click();
    browser.sleep(2000);
    element(by.css('.sa-button-container')).element(by.buttonText('Yes')).click();
    browser.sleep(2000);
    expect($('.toast-message').getText()).toEqual('GLCode deleted successfully.');
  });


});