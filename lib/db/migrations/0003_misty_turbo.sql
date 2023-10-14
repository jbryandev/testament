ALTER TABLE "posts" RENAME TO "documents";--> statement-breakpoint
ALTER TABLE "documents" RENAME COLUMN "content" TO "url";--> statement-breakpoint
ALTER TABLE "documents" RENAME COLUMN "published" TO "active";--> statement-breakpoint
ALTER TABLE "documents" DROP CONSTRAINT "posts_user_id_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "documents" ADD CONSTRAINT "documents_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
