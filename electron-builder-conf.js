// electron-builder-config.js
require("dotenv").config();
module.exports = {
  appId: "aegix",
  copyright: "© 2024 - Aegix Global",
  artifactName: `${process.env.PRODUCT}.${"exe"}`,
  removePackageScripts: true,
  publish: {
    provider: "s3",
    bucket: `${process.env.DUPLO_ENVIRONMENT}-aegix-downloads`,
    region: "us-west-2",
  },
  directories: {
    output: "./dist/",
    app: ".",
  },
  win: {
    target: "nsis",
    cscLink: process.env.CODE_SIGN_CERTIFICATE_FILE_PATH,
    certificateFile: process.env.CODE_SIGN_CERTIFICATE_FILE_PATH,
    certificatePassword: process.env.CODE_SIGN_CERTIFICATE_PASSWORD,
    icon: "./aegix.ico",
    artifactName: `${process.env.PRODUCT}.${"exe"}`,
    signingHashAlgorithms: ["sha256"],
    rfc3161TimeStampServer: "http://timestamp.comodoca.com/rfc3161",
    // perMachine: true,
    publisherName: "dirs",
    publish: {
      provider: "s3",
      bucket: `${process.env.DUPLO_ENVIRONMENT}-aegix-downloads`,
      region: "us-west-2",
      path: `${process.env.PRODUCT}/${process.env.PLATFORM}/${process.env.npm_package_version}/`,
    },
  },
  nsis: {
    oneClick: true,
    // upgradeCode: "A245566B-7A8A-4618-9805-7D706A56F5D4",
    perMachine: true,
  },
  msi: {
    oneClick: true,
  },
  // Add other configuration options as needed
};
