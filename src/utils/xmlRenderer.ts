import fs from 'fs';
import path from 'path';

const xmlCache: { [key: string]: string } = {};

export const renderXML = (file: string, params: Record<string, string>): string => {
  if (!xmlCache[file]) {
    const filePath = path.resolve(__dirname, '../xml', `${file}.xml`);
    xmlCache[file] = fs.readFileSync(filePath, 'utf8');
  }
  return Object.entries(params).reduce(
    (xml, [key, value]) => xml.replace(new RegExp(`:${key}`, 'g'), value),
    xmlCache[file]
  );
};

export const escapeXML = (text: string): string => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};
