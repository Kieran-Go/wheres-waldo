-- CreateTable
CREATE TABLE "public"."scenes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "scenes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."characters" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "characters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."scene_character" (
    "sceneId" INTEGER NOT NULL,
    "characterId" INTEGER NOT NULL,
    "x_min" INTEGER NOT NULL,
    "x_max" INTEGER NOT NULL,
    "y_min" INTEGER NOT NULL,
    "y_max" INTEGER NOT NULL,

    CONSTRAINT "scene_character_pkey" PRIMARY KEY ("sceneId","characterId")
);

-- CreateTable
CREATE TABLE "public"."scores" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "time" INTEGER NOT NULL,
    "sceneId" INTEGER NOT NULL,

    CONSTRAINT "scores_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."scene_character" ADD CONSTRAINT "scene_character_sceneId_fkey" FOREIGN KEY ("sceneId") REFERENCES "public"."scenes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."scene_character" ADD CONSTRAINT "scene_character_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "public"."characters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."scores" ADD CONSTRAINT "scores_sceneId_fkey" FOREIGN KEY ("sceneId") REFERENCES "public"."scenes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
