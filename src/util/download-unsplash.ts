import fs from 'fs';
import { CoreError } from './error-handler';

export async function searchAndSaveImages({
  category,
  query,
  limit,
}: {
  category: string;
  query: string;
  limit: string;
}) {
  if (!limit) limit = '1';
  const jsonFilePath = `./src/util/mock/images/${category}.json`;
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  const fileExists = fs.existsSync(jsonFilePath);
  if (!fileExists) {
    fs.writeFileSync(jsonFilePath, JSON.stringify([], null, 2));
    console.log(`create ${jsonFilePath}.json file success,please try again`);
    return;
  }

  fs.readFile(jsonFilePath, 'utf8', async (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }
    try {
      const res = await fetch(
        `https://api.unsplash.com/photos/random/?client_id=${accessKey}&landscape=landscape&query=${query}&count=${+limit}`
      );
      const response = await res.json();
      const jsonData = JSON.parse(data);
      for (const photo of response) {
        jsonData.push(photo.urls.raw);
      }
      fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));
    } catch (error) {
      throw new CoreError('Download unsplash picture failed.');
    }
  });
}
