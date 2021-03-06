# Migration `20200711101531-init`

This migration has been generated by YPAzevedo at 7/11/2020, 10:15:31 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "Post" (
"authorId" INTEGER NOT NULL,
"content" TEXT ,
"createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"published" BOOLEAN NOT NULL DEFAULT false,
"title" TEXT NOT NULL,FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE)

CREATE TABLE "Profile" (
"bio" TEXT ,
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"userId" INTEGER NOT NULL,FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE)

CREATE TABLE "User" (
"email" TEXT NOT NULL,
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"name" TEXT )

CREATE UNIQUE INDEX "Profile.userId" ON "Profile"("userId")

CREATE UNIQUE INDEX "User.email" ON "User"("email")

PRAGMA foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200711101531-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,34 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "sqlite"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Post {
+  id        Int      @default(autoincrement()) @id
+  createdAt DateTime @default(now())
+  title     String
+  content   String?
+  published Boolean  @default(false)
+  author    User     @relation(fields: [authorId], references: [id])
+  authorId  Int
+}
+model Profile {
+  id     Int     @default(autoincrement()) @id
+  bio    String?
+  user   User    @relation(fields: [userId], references: [id])
+  userId Int     @unique
+}
+model User {
+  id      Int      @default(autoincrement()) @id
+  email   String   @unique
+  name    String?
+  posts   Post[]
+  profile Profile?
+}
```


