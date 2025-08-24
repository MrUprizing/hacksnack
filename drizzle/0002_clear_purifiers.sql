ALTER TABLE "food_entry" ALTER COLUMN "consumed_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "food_entry" ALTER COLUMN "consumed_at" DROP NOT NULL;