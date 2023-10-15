-- CreateTable
CREATE TABLE "SearchQuery" (
    "search_query_id" SERIAL NOT NULL,
    "query" TEXT NOT NULL,
    "results" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SearchQuery_pkey" PRIMARY KEY ("search_query_id")
);
