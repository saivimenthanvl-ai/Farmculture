const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'src', 'contexts', 'LanguageContext.tsx');
let content = fs.readFileSync(targetFile, 'utf8').replace(/\r\n/g, '\n');

const emailTranslations = {
  en: "No email address linked",
  ta: "மின்னஞ்சல் முகவரி இணைக்கப்படவில்லை",
  hi: "कोई ईमेल पता लिंक नहीं है",
  te: "ఇమెయిల్ చిరునామా లింక్ చేయబడలేదు",
  mr: "कोणताही ईमेल पत्ता जोडलेला नाही",
  fr: "Aucune adresse e-mail associée",
  es: "Ninguna dirección de correo vinculada",
  de: "Keine E-Mail-Adresse verknüpft",
  pl: "Brak powiązanego adresu e-mail",
  ar: "لا يوجد عنوان بريد إلكتروني مرتبط",
};

for (const [lang, text] of Object.entries(emailTranslations)) {
  const pattern = new RegExp(`("${lang}": \\{\\n(?:.*\\n)*?    "account\\.emailAddress": ".*?",\\n)`);
  if (pattern.test(content)) {
    content = content.replace(pattern, `$1    "account.noEmailLinked": "${text}",\n`);
  } else {
    // Alternative match
    const altPattern = new RegExp(`(  ${lang}: \\{\\n)`);
    content = content.replace(altPattern, `$1    "account.noEmailLinked": "${text}",\n`);
  }
}

fs.writeFileSync(targetFile, content.replace(/\n/g, '\r\n'), 'utf8');
console.log('Successfully injected account.noEmailLinked across all 10 locales!');
