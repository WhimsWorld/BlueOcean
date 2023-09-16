CREATE DATABASE whimsiworlddb;

DROP TABLE IF EXISTS users, gifs, sounds, images, thumbnail_images, categories, stories, user_story_likes, characters, posts, users_in_story, chat, templates CASCADE;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(32)
);

CREATE TABLE gifs (
    gif_id SERIAL PRIMARY KEY,
    url TEXT,
    premium BOOLEAN
);

CREATE TABLE sounds (
    sound_id SERIAL PRIMARY KEY,
    url TEXT,
    premium BOOLEAN
);

create TABLE images (
    image_id SERIAL PRIMARY KEY,
    url TEXT,
    premium BOOLEAN
);

CREATE TABLE thumbnail_images (
    thumbnail_id SERIAL PRIMARY KEY,
    url TEXT,
    premium BOOLEAN
);

CREATE TABLE categories (
    cat_id SERIAL PRIMARY KEY,
    name VARCHAR(32)
);

CREATE TABLE stories (
    story_id SERIAL PRIMARY KEY,
    created_by_user_id INTEGER REFERENCES users(user_id),
    category_id INTEGER REFERENCES categories(cat_id),
    narrator_id INTEGER REFERENCES users(user_id),
    main_image_id INTEGER REFERENCES images(image_id),
    thumbnail_id INTEGER REFERENCES thumbnail_images(thumbnail_id),
    like_count INTEGER DEFAULT 0 NOT NULL,
    title VARCHAR(256),
    summary TEXT,
    max_characters INTEGER,
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_story_likes (
    story_id INTEGER REFERENCES stories(story_id),
    user_id INTEGER REFERENCES users(user_id)
);

CREATE TABLE characters (
    char_id SERIAL PRIMARY KEY,
    story_id INTEGER REFERENCES stories(story_id),
    user_id INTEGER REFERENCES users(user_id),
    image_id INTEGER REFERENCES images(image_id),
    name VARCHAR(32),
    strength VARCHAR(32),
    weakness VARCHAR(32),
    backstory TEXT
);

CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    story_id INTEGER REFERENCES stories(story_id),
    char_id INTEGER REFERENCES characters(char_id),
    gif_id INTEGER REFERENCES gifs(gif_id),
    sound_id INTEGER REFERENCES sounds(sound_id),
    narrator_image_id INTEGER REFERENCES images(image_id),
    narrator_post BOOLEAN,
    content TEXT,
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users_in_story (
    story_id INTEGER REFERENCES stories(story_id),
    user_id INTEGER REFERENCES users(user_id)
);

CREATE TABLE chat (
    message_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    story_id INTEGER REFERENCES stories(story_id),
    data TEXT,
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE templates (
    description TEXT,
    main_image_id INTEGER REFERENCES images(image_id),
    thumbnail_id INTEGER REFERENCES thumbnail_images(thumbnail_id)
);
