CREATE DATABASE sdc;

CREATE TABLE reviews (
  id SERIAL NOT NULL,
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

COPY reviews
  FROM '/Users/kathy/Documents/Bootcamp/SDC/data/reviews/reviews.csv'
  DELIMITER ','
  CSV HEADER;

CREATE TABLE photos (
  id SERIAL,
  review_id SERIAL,
  url VARCHAR(200)
  );

COPY photos
  FROM '/Users/kathy/Documents/Bootcamp/SDC/data/reviews/reviews_photos.csv'
  DELIMITER ','
  CSV HEADER;


CREATE TABLE chars (
  id SERIAL,
  product_id SERIAL,
  name VARCHAR(100)
  );

COPY chars
  FROM '/Users/kathy/Documents/Bootcamp/SDC/data/reviews/characteristics.csv'
  DELIMITER ','
  CSV HEADER;


CREATE TABLE charReviews (
  id SERIAL,
  characteristic_id SERIAL,
  review_id SERIAL,
  value SMALLINT
  );

COPY charReviews
  FROM '/Users/kathy/Documents/Bootcamp/SDC/data/reviews/characteristic_reviews.csv'
  DELIMITER ','
  CSV HEADER;