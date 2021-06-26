CREATE DATABASE sdc;

CREATE TABLE reviews (
  id SERIAL NOT NULL PRIMARY KEY,
  product_id SERIAL NOT NULL,
  rating SMALLINT,
  date DATE,
  summary VARCHAR(200),
  body VARCHAR(500),
  recommend BOOLEAN,
  reported BOOLEAN,
  reviewer_name VARCHAR(100),
  reviewer_email VARCHAR(100),
  response VARCHAR(500),
  helpfulness INT
  );

CREATE INDEX productId ON reviews(product_id);

COPY reviews
  FROM '/Users/kathy/Documents/Bootcamp/SDC/data/reviews/reviews.csv'
  DELIMITER ','
  CSV HEADER;

CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  review_id SERIAL,
  url VARCHAR(200)
  );

COPY photos
  FROM '/Users/kathy/Documents/Bootcamp/SDC/data/reviews/reviews_photos.csv'
  DELIMITER ','
  CSV HEADER;

CREATE INDEX photo_review ON photos(review_id);

CREATE TABLE chars (
  id SERIAL PRIMARY KEY,
  product_id SERIAL,
  name VARCHAR(100)
  );

COPY chars
  FROM '/Users/kathy/Documents/Bootcamp/SDC/data/reviews/characteristics.csv'
  DELIMITER ','
  CSV HEADER;

CREATE INDEX product_char ON chars(product_id);

CREATE TABLE charReviews (
  id SERIAL PRIMARY KEY,
  characteristic_id SERIAL,
  review_id SERIAL,
  value FLOAT
  );

COPY charReviews
  FROM '/Users/kathy/Documents/Bootcamp/SDC/data/reviews/characteristic_reviews.csv'
  DELIMITER ','
  CSV HEADER;

CREATE INDEX charId ON charReviews( characteristic_id);
CREATE INDEX char_review ON charReviews( review_id);

-- Transform data: put photos inside reviews' column
ALTER TABLE reviews ADD COLUMN photos json[];

CREATE TABLE urls ( id INT, photos json[] );

INSERT INTO urls (id, photos)
  SELECT review_id, array_agg(json_build_object('id', id, 'url', url)) AS photos
  FROM photos
  GROUP BY review_id;

UPDATE reviews t2
  SET photos = t1.photos
  FROM urls t1
  WHERE t2.id = t1.id;