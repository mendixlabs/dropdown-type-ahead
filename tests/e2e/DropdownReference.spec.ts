import homePage from "./pages/home.page";

const defaultOption = "Select city";

xdescribe("Dropdown reference ", () => {
    it("should populate multiple values in a dropdown list", () => {
        homePage.open();
        homePage.dropDownSelector.waitForExist();

        homePage.dropDownSelector.click();
        homePage.dropDownOptions.waitForExist();
        browser.waitUntil(() => {
            browser.debug();
            const dropDownOptions: WebdriverIO.Element[] = homePage.dropDownOptions.value;

            return dropDownOptions.length > 1;
        });
    });

    it("should select an option from the drop-down menu", () => {
        homePage.open();
        homePage.dropDownSelector.waitForExist();
        homePage.clearIndicator.click();
        expect(homePage.selectPlaceholder).toBe(defaultOption);

        homePage.dropDownSelector.click();
        homePage.dropDownOptions.waitForExist();
        browser.keys("ArrowDown");
        browser.keys("ArrowDown");
        browser.keys("ArrowDown");
        browser.keys("Enter");

        homePage.dropDownSelector.waitForValue();
        expect(homePage.selectedElement.getHTML()).toContain(homePage.selectedValue);
    });

    it("should clear the selected option", () => {
        homePage.open();
        homePage.dropDownSelector.waitForExist();

        expect(homePage.selectedElement.getHTML()).toContain(homePage.selectedValue);

        homePage.clearIndicator.click();
        homePage.dropDownSelector.waitForValue();

        expect(homePage.selectPlaceholder).toBe(defaultOption);
    });
});
