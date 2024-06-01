-- CreateEnum
CREATE TYPE "language" AS ENUM ('fr', 'en');

-- CreateEnum
CREATE TYPE "theme" AS ENUM ('light', 'dark');

-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('INTERNSHIP', 'APPRENTICESHIP', 'FULLTIME', 'PARTTIME', 'FREELANCE');

-- CreateEnum
CREATE TYPE "ExprerienceLevel" AS ENUM ('ENTRY_LEVEL', 'JUNIOR', 'MID', 'SENIOR');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "oauthId" TEXT NOT NULL,
    "profilePic" TEXT,
    "fullname" TEXT NOT NULL,
    "description" TEXT,
    "linkedinLink" TEXT,
    "githubLink" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "language" "language" NOT NULL DEFAULT 'fr',
    "theme" "theme" NOT NULL DEFAULT 'light',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "jobType" "JobType" NOT NULL,
    "experienceLevel" "ExprerienceLevel" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" TEXT NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "totalFav" INTEGER NOT NULL DEFAULT 0,
    "resumePath" TEXT,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "totalUpLikes" INTEGER NOT NULL DEFAULT 0,
    "totalDownLikes" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PostFavorites" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CommentUpLikes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CommentDownLikes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_oauthId_key" ON "User"("oauthId");

-- CreateIndex
CREATE UNIQUE INDEX "_PostFavorites_AB_unique" ON "_PostFavorites"("A", "B");

-- CreateIndex
CREATE INDEX "_PostFavorites_B_index" ON "_PostFavorites"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CommentUpLikes_AB_unique" ON "_CommentUpLikes"("A", "B");

-- CreateIndex
CREATE INDEX "_CommentUpLikes_B_index" ON "_CommentUpLikes"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CommentDownLikes_AB_unique" ON "_CommentDownLikes"("A", "B");

-- CreateIndex
CREATE INDEX "_CommentDownLikes_B_index" ON "_CommentDownLikes"("B");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostFavorites" ADD CONSTRAINT "_PostFavorites_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostFavorites" ADD CONSTRAINT "_PostFavorites_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommentUpLikes" ADD CONSTRAINT "_CommentUpLikes_A_fkey" FOREIGN KEY ("A") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommentUpLikes" ADD CONSTRAINT "_CommentUpLikes_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommentDownLikes" ADD CONSTRAINT "_CommentDownLikes_A_fkey" FOREIGN KEY ("A") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommentDownLikes" ADD CONSTRAINT "_CommentDownLikes_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
