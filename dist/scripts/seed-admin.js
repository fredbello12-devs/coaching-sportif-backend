"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dotenv = __importStar(require("dotenv"));
const bcrypt = __importStar(require("bcryptjs"));
const user_entity_1 = require("../src/users/user.entity");
dotenv.config();
const dataSource = new typeorm_1.DataSource({
    type: 'sqlite',
    database: process.env.DB_PATH || 'data/db.sqlite',
    entities: [__dirname + '/../src/**/*.entity{.ts,.js}'],
    synchronize: true,
});
async function seed() {
    await dataSource.initialize();
    const repo = dataSource.getRepository(user_entity_1.User);
    const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@local';
    const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'Admin123!';
    const existing = await repo.findOneBy({ email: adminEmail });
    if (existing) {
        console.log('Admin user already exists:', adminEmail);
    }
    else {
        const hashed = await bcrypt.hash(adminPassword, 10);
        const admin = repo.create({
            name: 'Admin',
            email: adminEmail,
            password: hashed,
            role: user_entity_1.UserRole.ADMIN,
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
//# sourceMappingURL=seed-admin.js.map