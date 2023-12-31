# WhimsiWorld Blue Ocean Project


## Team members
- [Kimberly Tom](https://github.com/tomki1)
- [Frank Soto](https://github.com/frankasoto)
- [Jack Tobin](https://github.com/luckynumberthirteen)
- [Jiahou Liu](https://github.com/zulliu)
- [Taryn Wiedrick](https://github.com/TarynCovert)
- [Rachel Miller](https://github.com/rkmiller131)


## Table of Contents
- [Tech Used](#Tech-used-to-build-the-project)
- [Usage](#Usage)
- [Overview](#Overview)
- [Landing Page](#Landing-Page)
- [Home Page](#Home-Page)
- [Story Page](#Story-Page)
- [Login/Sign up Page](#Login/sign-up-page)
- [Character Creation](#Character-Creation)
- [Create Story](#Create-Story)
- [Create Story Post](#Create-Story-Post)


## Tech used to build the project
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF.svg?style=for-the-badge&logo=Vite&logoColor=white)
![FireBase](https://img.shields.io/badge/Firebase-FFCA28.svg?style=for-the-badge&logo=Firebase&logoColor=black)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Axios](https://img.shields.io/badge/Axios-5A29E4.svg?style=for-the-badge&logo=Axios&logoColor=white)


## Usage
### 1. Clone the [repo](https://github.com/WhimsWorld/BlueOcean)
```bash
git clone https://github.com/WhimsWorld/BlueOcean.git
```
### 2. CD into the file directory
```bash
cd BlueOcean/
```
### 3. Run npm install to install all necessary dependencies
```bash
npm install
```
### 4. Create a firebase account
Use the following [link](https://console.firebase.google.com/u/0/) to create a firebase account. Upon successful completion of setting up firebase,
you will be given a config file. Hold on to that for after the next step.
### 5. Create a copy of the example.env file and rename it .env
This is where you will be adding in the information about your firebase account and your postgres database information
### 6. Start up the postgres database
On linux, this would be done through
```bash
sudo service postgresql start
```
### 7. Navigate the postgres client and then import the database schema
On Linux (if you have a different port than default, use -p <em>port number </em>)
```bash
sudo -u postgres psql
```
In the postgres shell, use \i <em>filePathToFile</em>

### 7. Run <em>npm run server-dev</em> to start the application
```bash
npm run server-dev
```
### 6. Go to localhost:5173 to view the project. By default vite uses port 5173

## Overview
The goal of the project was to build a collaborative story telling website that appeals to those
who love both games and fantasy. In this web app, groups of friends/strangers take turns writing a fantasy story in a theme
of their choosing.

## Landing Page
Upon first visiting the website, users are greeted with a fantasy page that gives users a glimpse of what
the website will provide.

![landing page](https://github.com/WhimsWorld/BlueOcean/assets/129362652/9ac0aac0-9589-44e8-9b7d-a394326f2a59)


## Home Page
Upon entering the website, users will have a chance to view the different stories that groups of other users have written.
Those that are not currently logged in or those that do not have an account are limited in what they are able to do and are
only able to view the different stories and any attempt to interactions outside of reading and searching through the stories will result
in a redirect to a login page.

If users are logged in, they will be able to interact further with the homepage by liking stories or even creating their own story,
which will be discussed further down.

![homepage](https://github.com/WhimsWorld/BlueOcean/assets/38170380/2ed36f10-9199-4800-8913-c1baa15d8ce3)


## Story page
Users are able to view any individual story. Here they will be greeted with a list of all
current characters in the story as well as a live chat bar that refreshes every 15 seconds.
If a user wants to participate in the chat about the story or wants to help write the story
by creating their own character, they will be redirected to a login page.

![storyboard](https://github.com/WhimsWorld/BlueOcean/assets/38170380/c4157b59-5b27-4dff-8577-b42790a37f29)

![story](https://github.com/WhimsWorld/BlueOcean/assets/38170380/f095f587-93cd-4d65-99ef-49f7bb80baad)


## Login/sign-up page
On the sign up page, users sign up by choosing a username and a valid email/password. Upon
successful account creation, the user will be redirected to the login page where they will
input their credentials to then be taken back to the home page. If the user is being prompted
to login from somewhere besides the home page, the user will be redirected back to the page
they were on previously to help improve the user experience. As the owner of the site, a list of
all of the users that have created an account can be viewed in the firebase console.

![signup](https://github.com/WhimsWorld/BlueOcean/assets/129362652/33454be2-de72-4c2f-8343-1efe272780c6)


## Character Creation
At this point, the user is logged in and is engaged and wants to contribute to a story
they have thouroughly enjoyed up to this point. Here they can create a character that will be in the
story. Depending on the theme of the story they are creating the character for, the background image will
change accordingly. The user can select from different races, a character origin story, different sexes, different strengths and
weaknesses, a character icon as well as a sound that will play when clicking on the character icon
or on the character portrait that is located on the side of the story page. All of the customization options as well
as the overall layout is designed replicate the feeling of character creation that can be found in games.

![character creation](https://github.com/WhimsWorld/BlueOcean/assets/129362652/176d4c39-3f3c-433c-af25-06b3907f5229)

## Create Story Post
The website is based around the idea of people coming together to build their own fantasy world. To begin their story,
a user needs to create the initial post. Here, a user will create a title for their story, a summary of what their story will, the max
number of players/creators(up to 10), a theme for their story and a thumbnail for their story that will shown on the home page.
The current themes a user can select are High Fantasy, Mystical Forest, Pirates Cove Adventures and Steampunk Cityscapes. Upon
creation of the initial story post, users will be redirected to their story page.

![Create story](https://github.com/WhimsWorld/BlueOcean/assets/129362652/5bd14501-31f3-42ba-8f21-67d716fdcc02)


## Create Post
Here a user is able to contribute to the story after they have created a character. The user (if not a narrator)
will be asked to write their section of the story as well as select a sticker that will display on the post and a
sound that will play if the sticker is clicked on. If the user happens to be a narrator for the story, they are
given the additonal option of selecting an additional image to set the stage for what is to come.

![post_not_narrator](https://github.com/WhimsWorld/BlueOcean/assets/38170380/0f5f85b1-6930-4865-b8a9-a12301a542ac)

![post_narrator](https://github.com/WhimsWorld/BlueOcean/assets/38170380/3c1ed6ee-801a-4ffe-86d5-5eca58936f4b)

