import { execSync } from 'child_process';
import dotenv from 'dotenv';
import path from 'path';

export default async function setup() {
  // Load the test environment variables
  dotenv.config({ path: path.resolve(__dirname, '.env.test') });

  // Start Docker containers for testing
  execSync('docker-compose -f docker-compose.test.yml up -d', {
    stdio: 'inherit',
  });

  // Wait for the database to be ready
  await new Promise((resolve) => setTimeout(resolve, 10000)); // Adjust the delay as needed

  // Load test data
  execSync(
    'docker exec -i postgres_test psql -U postgres -d mydatabase < ./tests/testdata/testdata.sql',
    { stdio: 'inherit' },
  );

  // Run Prisma generate
  execSync('npx prisma generate', { stdio: 'inherit' });
}
