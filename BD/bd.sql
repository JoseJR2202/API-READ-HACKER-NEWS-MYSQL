CREATE TABLE `story` (
  `id_story` integer PRIMARY KEY,
  `title` varchar(255) NOT NULL,
  `author` varchar(255),
  `story_text` text,
  `url` varchar(255),
  `publication_date` timestamp,
  `cant_comment` integer DEFAULT 0
);

CREATE TABLE `comment` (
  `id_comment` integer PRIMARY KEY,
  `author` varchar(255) NOT NULL,
  `comment_text` text,
  `publication_date` timestamp NOT NULL,
  `id_story` integer
);

CREATE TABLE `tag` (
  `id_tag` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255)
);

CREATE TABLE `story_tag` (
  `id_story` integer,
  `id_tag` integer,
  PRIMARY KEY (`id_story`, `id_tag`)
);

CREATE TABLE `comment_tag` (
  `id_comment` integer,
  `id_tag` integer,
  PRIMARY KEY (`id_comment`, `id_tag`)
);

ALTER TABLE `comment` ADD FOREIGN KEY (`id_story`) REFERENCES `story` (`id_story`) on update cascade on delete cascade;

ALTER TABLE `story_tag` ADD FOREIGN KEY (`id_story`) REFERENCES `story` (`id_story`) on update cascade on delete cascade;

ALTER TABLE `story_tag` ADD FOREIGN KEY (`id_tag`) REFERENCES `tag` (`id_tag`) on update cascade on delete cascade;

ALTER TABLE `comment_tag` ADD FOREIGN KEY (`id_comment`) REFERENCES `comment` (`id_comment`) on update cascade on delete cascade;

ALTER TABLE `comment_tag` ADD FOREIGN KEY (`id_tag`) REFERENCES `tag` (`id_tag`) on update cascade on delete cascade;

DELIMITER $$

CREATE TRIGGER updateCantComment AFTER INSERT ON comment
FOR EACH ROW 
BEGIN
      UPDATE story
      SET cant_comment = (SELECT cant_comment + 1 FROM story WHERE id_story = new.id_story)
      WHERE id_story = new.id_story;
END $$

DELIMITER ;