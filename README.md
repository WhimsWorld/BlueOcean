# BlueOcean

## Table of Contents


## Team members (Should we include this here? at the end? not at all?)

## Usage
### 1. Run npm install to install all necessary dependencies
```bash
npm install
```
### 2. Create a firebase account
Use the following [link](https://console.firebase.google.com/u/0/) to create a firebase account. Upon successful completion of setting up firebase,
you will be given a config file. Hold on to that for after the next step.
### 3. Create a copy of the example.env file and rename it .env
This is where you will be adding in the information about your firebase account and your postgres database information
### 4. Start up the postgres database
On linux, this would be done through
```bash
sudo service postgresql start
```
### 5. Run npm build to build and start the application
```bash
npm build
```
### 6. Go to localhost:5173 to view the project. By default vite uses port 5173

## Overview
The goal of the project was to build a collaborative story telling website that appeals to those
who love both games and fantasy. In this web app, groups of friends/strangers take turns writing a fantasy story in a theme
of their choosing.

## Landing Page
Upon first visiting the website, users are greeted with a fantasy page that gives users a glimpse of what
the website will provide.

[img goes here]

## Home Page
Upon entering the website, users will have a chance to view the different stories that groups of other users have written.
Those that are not currently logged in or those that do not have an account are limited in what they are able to do and are
only able to view the different stories and any attempt to interactions outside of reading and searching through the stories will result
in a redirect to a login page.

If users are logged in, they will be able to interact further with the homepage by liking stories or even creating their own story,
which will be discussed further down.

[img of home page goes here]

## Story page
Users are able to view any individual story. Here they will be greeted with a list of all
current characters in the story as well as a live chat bar that refreshes every 15 seconds.
If a user wants to participate in the chat about the story or wants to help write the story
by creating their own character, they will be redirected to a login page.

(image of story page goes here)

## Login/sign-up page
On the sign up page, users sign up by choosing a username and a valid email/password. Upon
successful account creation, the user will be redirected to the login page where they will
input their credentials to then be taken back to the home page. If the user is being prompted
to login from somewhere besides the home page, the user will be redirected back to the page
they were on previously to help improve the user experience. As the owner of the site, a list of
all of the users that have created an account can be viewed in the firebase console.

(image of login page goes here)

## Character Creation
At this point, the user is logged in and is engaged and wants to contribute to a story
they have thouroughly enjoyed up to this point. Here they can create a character that will be in the
story. Depending on the theme of the story they are creating the character for, the background image will
change accordingly. The user can select from different races, a character origin story, different sexes, different strengths and
weaknesses, a character icon as well as a sound that will play when clicking on the character icon
or on the character portrait that is located on the side of the story page. All of the customization options as well
as the overall layout is designed replicate the feeling of character creation that can be found in games.
