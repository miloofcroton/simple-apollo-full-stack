module.exports = {
  snapshotSerializers: [
    'enzyme-to-json/serializer'
  ],
  setupTestFrameworkScriptFile: '<rootDir>src/testing/configs/jest.setup.js',
  moduleNameMapper: {
    '\\.(css)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>src/testing/mocks/fileMock.js'
  }
};
