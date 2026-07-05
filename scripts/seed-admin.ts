import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcryptjs';
import { User, UserRole } from '../src/users/user.entity';

dotenv.config();

const dataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DB_PATH || 'data/db.sqlite',
  entities: [__dirname + '/../src/**/*.entity{.ts,.js}'],
  synchronize: true,
});

async function seed() {
  await dataSource.initialize();
  const repo = dataSource.getRepository(User);

  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@local';
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'Admin123!';

  const existing = await repo.findOneBy({ email: adminEmail });
  if (existing) {
    console.log('Admin user already exists:', adminEmail);
  } else {
    const hashed = await bcrypt.hash(adminPassword, 10);
    const admin = repo.create({
      name: 'Admin',
      email: adminEmail,
      password: hashed,
      role: UserRole.ADMIN,
    });
    await repo.save(admin);
    console.log('Admin user created:', adminEmail, 'password:', adminPassword);
  }

  await dataSource.destroy();
}

seed().catch((err) => {
  console.error('Seed error', err);
  process.exit(1);
});
