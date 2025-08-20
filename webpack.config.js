const path = require('path');
const package = require('./package.json');

const {BuildConfig, WebpackConfigBuilder, Version, DesignType, ModuleConfig} = require('@bsi-cx/design-build');

function getDate() {
    const currentDate = new Date();
    return ("0" + currentDate.getDate()).slice(-2) + "-" + ("0"+(currentDate.getMonth()+1)).slice(-2) + "-" +
        currentDate.getFullYear();
}

// const lp25DEWithDate = getDate()+'-albatros-lp-de-cx-25.2';
const lp24DEWithDate = getDate()+'-albatros-lp-de-cx-24.2';
const lp24ENWithDate = getDate()+'-albatros-lp-en-cx-24.2';

const landingpageBuildConfig = new BuildConfig()
  .withName(lp24DEWithDate)
  .withVersion(package.version)
  .withDesignType(DesignType.LANDINGPAGE)
  .withTargetVersion(Version.CX_24_2)
  .withRootPath(path.resolve(__dirname, 'templates', 'landingpage'))
  .withAssetResourceRuleFilename('static/[name][ext]')
  .withPropertiesFilePath(path.resolve(__dirname, 'properties.js'))
  .withModulesRootPath('modules')
  .withModules(
    new ModuleConfig()
      .withName('main')
      .withPath('main.js'))
  .withAdditionalFilesToCopy({
    from: path.resolve(__dirname, 'templates', 'shared', 'static', 'logo.svg'),
    to: 'static/logo.svg',
  });

module.exports = WebpackConfigBuilder.fromConfigs(
  // landingpageBuildConfig.clone()
  //   .withName(lp25DEWithDate)
  //   .withTargetVersion(Version.CX_25_2)
  //   .withPropertiesFilePath(path.resolve(__dirname, 'properties-de.js')),
  landingpageBuildConfig.clone()
      .withName(lp24DEWithDate)
      .withTargetVersion(Version.CX_24_2)
      .withPropertiesFilePath(path.resolve(__dirname, 'properties-de.js')),
  landingpageBuildConfig.clone()
      .withName(lp24ENWithDate)
      .withTargetVersion(Version.CX_24_2)
      .withPropertiesFilePath(path.resolve(__dirname, 'properties-en.js')));
