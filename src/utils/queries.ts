export const queriesComment = {
  GET_COMMENT:`SELECT id_comment, author, comment_text, CONCAT(DATE_FORMAT(publication_date, '%d-%m-%Y'),' ',DATE_FORMAT(publication_date,'%H:%i:%s')) AS publication_date, id_story FROM comment ORDER BY publication_date LIMIT ? OFFSET ?`,
  GET_COMMENT_BY_ID:`SELECT id_comment, author, comment_text, CONCAT(DATE_FORMAT(publication_date, '%d-%m-%Y'),' ',DATE_FORMAT(publication_date,'%H:%i:%s')) AS publication_date, id_story FROM comment WHERE id_comment = ?`,
  GET_COMMENT_BY_AUTHOR: `SELECT id_comment, author, comment_text, CONCAT(DATE_FORMAT(publication_date, '%d-%m-%Y'),' ',DATE_FORMAT(publication_date,'%H:%i:%s')) AS publication_date, id_story FROM comment WHERE UPPER(author) LIKE CONCAT('%',UPPER(?),'%') ORDER BY publication_date LIMIT ? OFFSET ?`,
  GET_COMMENT_BY_DATE:`SELECT id_comment, author, comment_text, CONCAT(DATE_FORMAT(publication_date, '%d-%m-%Y'),' ',DATE_FORMAT(publication_date,'%H:%i:%s')) AS publication_date, id_story FROM comment WHERE DATE_FORMAT(publication_date, '%d-%m-%Y') = ? ORDER BY publication_date LIMIT ? OFFSET ?`,
  GET_COMMENT_BY_TAG:`SELECT comment.id_comment, author, comment_text, CONCAT(DATE_FORMAT(publication_date, '%d-%m-%Y'),' ',DATE_FORMAT(publication_date,'%H:%i:%s')) AS publication_date, id_story FROM comment, comment_tag, tag WHERE 
                        comment.id_comment = comment_tag.id_comment AND comment_tag.id_tag = tag.id_tag AND UPPER(tag.name) LIKE CONCAT('%',UPPER(?),'%') ORDER BY publication_date LIMIT ? OFFSET ?`,
  FILTER_COMMENT:{
    BEGINNING:`SELECT comment.id_comment, author, comment_text, DATE_FORMAT(publication_date, '%d-%m-%Y') AS publication_date, id_story FROM comment, comment_tag, tag WHERE comment.id_comment = comment_tag.id_comment AND comment_tag.id_tag = tag.id_tag `,
    END:`ORDER BY publication_date LIMIT ? OFFSET ?`
  },
  INSERT_COMMENT:`INSERT INTO comment VALUES (?, ?, ?,?, ?)`,
  DELETE_COMMENT:`DELETE FROM comment WHERE id_comment = ?`
};

export const queriesStory = {
  GET_STORY:`SELECT * FROM story ORDER BY title LIMIT ? OFFSET ?`,
  GET_STORY_BY_ID:`SELECT * FROM story WHERE id_story = ?`,
  GET_STORY_BY_TITLE:`SELECT * FROM story WHERE UPPER(title) LIKE CONCAT('%',UPPER(?),'%') ORDER BY title LIMIT ? OFFSET ?`,
  GET_STORY_BY_AUTHOR:`SELECT * FROM story WHERE UPPER(author) LIKE CONCAT('%',UPPER(?),'%') ORDER BY title LIMIT ? OFFSET ?`,
  GET_STORY_BY_TAG:`SELECT story.id_story, title, author, story_text, url, CONCAT(DATE_FORMAT(publication_date, '%d-%m-%Y'),' ',DATE_FORMAT(publication_date,'%H:%i:%s')) AS publication_date, cant_comment FROM story, story_tag, tag WHERE  
                      story.id_story = story_tag.id_story AND story_tag.id_tag = tag.id_tag AND UPPER(tag.name) LIKE CONCAT('%',UPPER(?),'%') ORDER BY title LIMIT ? OFFSET ?`,
  GET_STORY_BY_DATE:`SELECT * FROM story WHERE  DATE_FORMAT(publication_date, '%d-%m-%Y') = ? ORDER BY publication_date LIMIT ? OFFSET ?`,
  FILTER_STORY:{
    BEGINNING:`SELECT story.id_story, title, author, story_text, url, CONCAT(DATE_FORMAT(publication_date, '%d-%m-%Y'),' ',DATE_FORMAT(publication_date,'%H:%i:%s')) AS publication_date, cant_comment FROM story `,
    END:`ORDER BY title LIMIT ? OFFSET ?`
  },
  INSERT_STORY:`INSERT INTO story (id_story, title, author, story_text, url, publication_date) VALUES (?, ?, ?, ?, ?, ?)`,
  INSERT_STORY_INCOMPLETE:`INSERT INTO story (id_story, title, url) VALUES (?, ?, ?)`,
  DELETE_STORY:`DELETE FROM story WHERE id_story = ?`
};

export const queriesTag = {
  GET_TAG:`SELECT * FROM tag  ORDER BY name LIMIT ? OFFSET ?`,
  CHECK_TAG:`SELECT * FROM tag WHERE name LIKE ?`,
  INSERT_TAG:`INSERT INTO tag (name) VALUES (?)`,
  INSERT_STORY_TAG:`INSERT INTO story_tag VALUES (?, ?)`,
  INSERT_COMMENT_TAG:`INSERT INTO comment_tag VALUES (?, ?)`
}