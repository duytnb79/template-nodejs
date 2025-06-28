import { execSync } from 'child_process';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const tableNames = Object.values(Prisma.ModelName);

export default async function teardown() {
  // Drop all data from tables
  for (const tableName of tableNames) {
    await prisma.$executeRawUnsafe(
      `TRUNCATE TABLE ${tableName} RESTART IDENTITY CASCADE`,
    );
  }

  // Disconnect Prisma
  await prisma.$disconnect();

  // Stop Docker containers for testing
  execSync('docker-compose -f docker-compose.test.yml down', {
    stdio: 'inherit',
  });
}
