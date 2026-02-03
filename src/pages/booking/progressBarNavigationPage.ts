import {Data} from '../../testData/pages/naviagtion/data';
import {BasePage} from '../base/basePage';

export class ProgressBarNavigationPage extends BasePage {
  readonly elements = {
    progressContainer: () =>
      this.page.locator('#progressBarNavigation__component'),
    continueButton: () =>
      this.page.getByLabel('button').filter({
        hasText: new RegExp(
          `${Data.getCommonData().elements.continueButton}|${Data.getCommonData().elements.bookNowButton}`,
        ),
      }),
  };

  async continueProcess(): Promise<void> {
    await this.elements
      .progressContainer()
      .locator(this.elements.continueButton())
      .click();
  }
}
