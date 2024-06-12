// electron-builder-config.js
require("dotenv").config();

module.exports = {
  appId: "aegix",
  win: {
    target: "msi",
    cscLink: process.env.CODE_SIGN_CERTIFICATE_FILE_PATH,
    certificateFile: process.env.CODE_SIGN_CERTIFICATE_FILE_PATH,
    certificatePassword: process.env.CODE_SIGN_CERTIFICATE_PASSWORD,
    icon: "./aegix.ico",
    artifactName: "Aegix.exe",
    signingHashAlgorithms: ["sha256"],
    rfc3161TimeStampServer: "http://timestamp.comodoca.com/rfc3161",
  },
  nsis: {
    oneClick: true,
  },
  msi: {
    oneClick: true,
  },
  // Add other configuration options as needed
};
