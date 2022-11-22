import { rm } from 'fs/promises';
import { join } from 'path';
// import { getConnection } from 'typeorm';

global.beforeAll(async () => {
  try {
    await rm(join(__dirname, '..', 'test.sqlite'));
  } catch (err) {
    console.log('err, ===>', err)
  }
});
