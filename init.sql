DROP TABLE IF EXISTS blog_test;

CREATE TABLE blog_test (
  id SERIAL NOT NULL PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  body VARCHAR(500),
  is_published BOOLEAN DEFAULT false,
  date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO blog_test (title, body)
  VALUES ('Default blog post', 'Et labore consectetur magna commodo velit officia dolor incididunt dolore non. Eu velit fugiat consectetur deserunt aute enim anim veniam reprehenderit pariatur duis tempor officia. Dolore ex minim officia duis in ex anim reprehenderit occaecat minim tempor aliqua tempor.');