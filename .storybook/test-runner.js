const { toMatchImageSnapshot } = require('jest-image-snapshot');
const { getStoryContext } = require('@storybook/test-runner');
// const { waitFor, findByTestId } = require('@testing-library/react');
require('@testing-library/jest-dom');

const customSnapshotsDir = `${process.cwd()}/__snapshots__/image/`;

module.exports = {
  setup() {
    expect.extend({ toMatchImageSnapshot });
    // jest.mock('pixi.js', () => ({
    //   ...jest.requireActual('pixi.js-legacy'),
    // }));
  },
  async postRender(page, context) {
    // If you want to take screenshot of multiple browsers, use
    // page.context().browser().browserType().name() to get the browser name to prefix the file name
    const storyContext = await getStoryContext(page, context);
    if (storyContext.parameters.snapshotTest !== 'disable') {
      // const image = await page.getByTestId(/-with-snap$/).screenshot();
      const image = await page.screenshot();
      expect(image).toMatchImageSnapshot({
        customSnapshotsDir,
        customSnapshotIdentifier: context.id,
      });
    }
  },
};
