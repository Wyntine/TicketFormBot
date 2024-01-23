const { readFileSync, writeFileSync } = require("fs");

function checkConfig() {
  const configFile = readFileSync("./config.json", { encoding: "utf-8", flag: "a+" });
  if (!configFile.length) {
    writeFileSync(
      "./config.json",
      JSON.stringify({ TOKEN: "MTE5OTMzNTA4MTY4MTA5MjczOA.GuJ9H7.eTe53KfqZdOm4gyzPkXsowKHZFmTnodX1oNqxQ" }, undefined, 2)
    );
    console.warn("[CONFIG] Config dosyası sıfırdan oluşturuldu. Lütfen ayarları doldurunuz.");
    return false;
  }
  return true;
}

module.exports = {
  checkConfig,
};
