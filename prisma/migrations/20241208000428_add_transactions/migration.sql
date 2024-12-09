-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "stripe_session" TEXT;
