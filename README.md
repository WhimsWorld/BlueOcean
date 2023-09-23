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