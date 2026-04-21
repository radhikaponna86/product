# MongoDB Collections & Mongoose Guide

## What Are Collections?

In MongoDB:
- **Database** = Container (like a folder)
- **Collection** = Table of documents (like a CSV file)
- **Document** = Individual record (like a row in Excel)

Example:
```
product_db (Database)
└── users (Collection)
    ├── { _id: 1, email: "user1@example.com", ... }
    ├── { _id: 2, email: "user2@example.com", ... }
    └── { _id: 3, email: "user3@example.com", ... }
```

---

## How to View MongoDB Collections

### Method 1: MongoDB Compass (GUI - Easiest)

1. **Download**: https://www.mongodb.com/products/compass
2. **Connect**: `mongodb://localhost:27017`
3. **Browse**: See databases → collections → documents

Visual interface to explore data!

---

### Method 2: MongoDB Shell (Command Line)

```bash
# Start MongoDB shell
mongosh

# List databases
show databases

# Use product_db
use product_db

# List collections
show collections

# View all documents in users collection
db.users.find()

# View with formatting
db.users.find().pretty()

# Count documents
db.users.countDocuments()
```

---

## How Mongoose Creates Collections

**When you save data**, Mongoose automatically creates collections:

```javascript
// In authController.js, when user authenticates:
user = new User({
  googleId: "123456",
  email: "user@example.com",
  displayName: "John Doe",
  picture: "url"
});
await user.save();  // ← This creates the "users" collection!
```

---

## Step-by-Step: See Your First Collection

### Step 1: Start MongoDB
```powershell
# Option A: If installed locally
mongod

# Option B: Using Docker
docker run -d -p 27017:27017 --name mongodb mongo
```

### Step 2: Test Connection
```powershell
cd e:\product\backend
node testConnection.js
```

Expected output:
```
✅ Successfully connected to MongoDB!
📊 Database Name: product_db
📋 Collections in database:
   (No collections yet - they will be created when you add data)
```

### Step 3: Create Test Data (Optional)

Create `testInsertData.js`:
```javascript
import 'dotenv/config.js';
import User from './src/models/User.js';
import { connectDB, disconnectDB } from './src/config/database.js';

const testInsert = async () => {
  try {
    await connectDB();

    // Create test user
    const testUser = new User({
      googleId: 'test-123',
      email: 'test@example.com',
      displayName: 'Test User',
      picture: 'https://example.com/pic.jpg',
    });

    await testUser.save();
    console.log('✅ Test user created!');
    console.log(testUser);

    await disconnectDB();
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
};

testInsert();
```

Run: `node testInsertData.js`

### Step 4: View Collection in Compass

1. Open MongoDB Compass
2. Connect to `localhost:27017`
3. Navigate: `product_db` → `users`
4. See your test data!

---

## Mongoose Collections Auto-Created by Our Backend

When users authenticate via Google OAuth, Mongoose creates:

```
product_db
└── users (Collection)
    ├── _id (ObjectId - unique identifier)
    ├── googleId (Google user ID)
    ├── email (User email)
    ├── displayName (User name)
    ├── picture (Profile picture URL)
    ├── createdAt (Auto timestamp)
    └── updatedAt (Auto timestamp)
```

---

## Key Mongoose Concepts

### Schema (Blueprint)
```javascript
// In User.js
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  displayName: String,
});
```
= Defines structure of documents

### Model (Factory)
```javascript
const User = mongoose.model('User', userSchema);
```
= Lets you create/read/update/delete documents

### Document (Actual Data)
```javascript
const user = new User({ email: "test@example.com" });
await user.save();  // Stores in MongoDB
```
= Individual record in collection

---

## Common Mongoose Operations

```javascript
// Create
const user = new User({ email: "test@example.com" });
await user.save();

// Read One
const user = await User.findById(id);
const user = await User.findOne({ email: "test@example.com" });

// Read All
const users = await User.find();

// Update
await User.updateOne({ _id: id }, { displayName: "New Name" });

// Delete
await User.deleteOne({ _id: id });

// Count
const count = await User.countDocuments();
```

---

## Interview Topics

**Q: What's the difference between relational (SQL) and document (MongoDB) databases?**
- SQL: Fixed schema, rows in tables
- MongoDB: Flexible schema, documents in collections

**Q: Why use Mongoose?**
- Schema validation
- Type checking
- Relationships between models
- Hooks (middleware)
- Cleaner API

**Q: How is data stored in MongoDB?**
- BSON format (Binary JSON)
- Documents are JSON-like
- Each document has unique `_id`

---

## Troubleshooting

### "connect ECONNREFUSED"
- MongoDB not running
- Run `mongod` or start Docker container

### No collections showing
- Collections created when first data inserted
- Create test data then refresh

### "Cannot find module mongoose"
- Install: `npm install mongoose`

---

## Next Steps

1. ✅ Test connection: `node testConnection.js`
2. Install MongoDB Compass to visualize data
3. Test Google OAuth flow (frontend → backend → MongoDB)
4. Check created users in Compass
5. Learn Prisma layer on top (in next guide)
