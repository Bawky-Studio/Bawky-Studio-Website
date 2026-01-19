const fs = require("fs");
const path = require("path");

const baseDir = path.join(__dirname, "..", "src", "i18n", "messages");
const locales = ["en", "ko"];

const flattenKeys = (value, prefix = "") => {
  const keys = [];
  if (value && typeof value === "object" && !Array.isArray(value)) {
    for (const [key, child] of Object.entries(value)) {
      const next = prefix ? `${prefix}.${key}` : key;
      keys.push(...flattenKeys(child, next));
    }
    return keys;
  }
  if (prefix) {
    keys.push(prefix);
  }
  return keys;
};

const readJson = (filePath) => JSON.parse(fs.readFileSync(filePath, "utf8"));

const loadLocaleNamespaces = (locale) => {
  const localeDir = path.join(baseDir, locale);
  if (!fs.existsSync(localeDir)) {
    throw new Error(`Missing locale directory: ${localeDir}`);
  }
  const entries = fs
    .readdirSync(localeDir)
    .filter((name) => name.endsWith(".json"))
    .map((name) => ({
      name: path.basename(name, ".json"),
      data: readJson(path.join(localeDir, name)),
    }));
  return Object.fromEntries(entries.map((entry) => [entry.name, entry.data]));
};

const localesData = Object.fromEntries(
  locales.map((locale) => [locale, loadLocaleNamespaces(locale)])
);

const namespaces = new Set();
for (const locale of locales) {
  Object.keys(localesData[locale]).forEach((name) => namespaces.add(name));
}

const missing = [];

for (const namespace of namespaces) {
  const keysByLocale = Object.fromEntries(
    locales.map((locale) => {
      const data = localesData[locale][namespace];
      return [locale, data ? new Set(flattenKeys(data)) : new Set()];
    })
  );

  for (const locale of locales) {
    if (!localesData[locale][namespace]) {
      missing.push(`${locale}: missing namespace "${namespace}"`);
    }
  }

  const allKeys = new Set(
    locales.flatMap((locale) => Array.from(keysByLocale[locale]))
  );

  for (const locale of locales) {
    const localeKeys = keysByLocale[locale];
    for (const key of allKeys) {
      if (!localeKeys.has(key)) {
        missing.push(`${locale}: ${namespace}.${key}`);
      }
    }
  }
}

if (missing.length > 0) {
  console.error("Missing i18n keys detected:");
  for (const item of missing) {
    console.error(`- ${item}`);
  }
  process.exit(1);
}

console.log("i18n check passed. No missing keys found.");
