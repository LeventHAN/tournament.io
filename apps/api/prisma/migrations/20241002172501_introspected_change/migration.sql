-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teams" (
    "id" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "seedId" TEXT,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seeds" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "bracketId" TEXT,

    CONSTRAINT "seeds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "brackets" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "roundIsFinished" BOOLEAN NOT NULL,
    "winnerPlayerId" TEXT,
    "tournamentId" TEXT,

    CONSTRAINT "brackets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tournaments" (
    "id" TEXT NOT NULL,
    "tournamentHostPlayerId" TEXT,
    "tournamentName" TEXT NOT NULL,
    "tournamentDescription" JSONB[],
    "currentTournamentBracket" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tournaments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PlayerToTeam" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_TournamentParticipants" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_username_key" ON "Player"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Player_email_key" ON "Player"("email");

-- CreateIndex
CREATE INDEX "teams_seedId_idx" ON "teams"("seedId");

-- CreateIndex
CREATE INDEX "seeds_bracketId_idx" ON "seeds"("bracketId");

-- CreateIndex
CREATE INDEX "brackets_winnerPlayerId_idx" ON "brackets"("winnerPlayerId");

-- CreateIndex
CREATE INDEX "brackets_tournamentId_idx" ON "brackets"("tournamentId");

-- CreateIndex
CREATE UNIQUE INDEX "_PlayerToTeam_AB_unique" ON "_PlayerToTeam"("A", "B");

-- CreateIndex
CREATE INDEX "_PlayerToTeam_B_index" ON "_PlayerToTeam"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TournamentParticipants_AB_unique" ON "_TournamentParticipants"("A", "B");

-- CreateIndex
CREATE INDEX "_TournamentParticipants_B_index" ON "_TournamentParticipants"("B");

-- AddForeignKey
ALTER TABLE "teams" ADD CONSTRAINT "teams_seedId_fkey" FOREIGN KEY ("seedId") REFERENCES "seeds"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seeds" ADD CONSTRAINT "seeds_bracketId_fkey" FOREIGN KEY ("bracketId") REFERENCES "brackets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "brackets" ADD CONSTRAINT "brackets_winnerPlayerId_fkey" FOREIGN KEY ("winnerPlayerId") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "brackets" ADD CONSTRAINT "brackets_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "tournaments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tournaments" ADD CONSTRAINT "tournaments_tournamentHostPlayerId_fkey" FOREIGN KEY ("tournamentHostPlayerId") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayerToTeam" ADD CONSTRAINT "_PlayerToTeam_A_fkey" FOREIGN KEY ("A") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayerToTeam" ADD CONSTRAINT "_PlayerToTeam_B_fkey" FOREIGN KEY ("B") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TournamentParticipants" ADD CONSTRAINT "_TournamentParticipants_A_fkey" FOREIGN KEY ("A") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TournamentParticipants" ADD CONSTRAINT "_TournamentParticipants_B_fkey" FOREIGN KEY ("B") REFERENCES "tournaments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
