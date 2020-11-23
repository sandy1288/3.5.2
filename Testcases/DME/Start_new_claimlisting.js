var user_facility = require('../Userfacility/User_defaultfacility.js');
describe('Hybrent DME Module', function () {
  var EC = protractor.ExpectedConditions;
  var fac_name = browser.params.user.fac_name;
  var Dme_sku = browser.params.itemCatalog.Dme_sku;
  var Dme_item_name = browser.params.itemCatalog.Dme_item_name;
  var Dme_Alias = browser.params.itemCatalog.Dme_Alias;
  var Dme_mfr = browser.params.itemCatalog.Dme_mfr;
  var Patient_fname = browser.params.Patients.Patient_fname;
  var randNumber = browser.params.itemCatalog.randNumber;
  var Inventory_name = browser.params.user.Inv_name;
  it('Verify that following search filter appear on my claim listing page', function () {
    expect(element(by.model('searchForm.searchFilter')).isPresent()).toBeTruthy();
    expect(element(by.css(".btn-default")).isPresent()).toBeTruthy();
    expect(element(by.model('searchForm.statusFilter')).isPresent()).toBeTruthy();
    expect(element(by.model('searchForm.mirthFilter')).isPresent()).toBeTruthy();
  });

  it('Search and open newly created cliam for the patient',function(){
    element(by.css(".btn-default")).click();
    browser.sleep(1000);
    element(by.model('search.search')).sendKeys(Patient_fname + " " + randNumber);
    browser.sleep(2000);
    element(by.buttonText('Select')).click();
    browser.sleep(1000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.partialLinkText('00000002')).click();
    browser.sleep(2000);
    expect(browser.getTitle()).toEqual('Manage Claim: Create Claim');
  });

  it('Save newly created claim', function(){
    element(by.xpath("//button[contains(.,'Save claim')]")).click();
    browser.sleep(2000);
    element(by.css('.sa-button-container')).element(by.buttonText('Yes')).click();
    browser.sleep(2000);
    element(by.css("h2")).getText().then(function(Claimstatus){
    expect(Claimstatus).toBe('Success?');
    })
    element(by.css(".confirm")).click();
  });

  it('Verify that user is able to compete the assigned DME claim', function(){
    browser.sleep(2000);
    element(by.partialLinkText('00000002')).click();
    browser.sleep(2000);
    expect(browser.getTitle()).toEqual('Manage Claim: Create Claim');
    element(by.xpath("//button[@class='btn btn-primary margin-r-0 btn-sm']")).click();
    browser.sleep(1000);
    expect($('.toast-message').getText()).toMatch('Claim completed successfully.');
  });

});