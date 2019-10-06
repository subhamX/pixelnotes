# PixelNotes

A free app which can store your notes. It doesn't have tedious authentication; all you need is NOTEID to access the record. Node and Express are the primary dependencies of this project.

## Getting Started

Clone the source locally:
```
git clone https://github.com/subhamX/pixelnotes.git
cd pixelnotes
```

### Installing

Install all the dependencies using - 

```
npm install
```
### Starting the server

```
firebase serve
```
**NOTE:** PixelNotes won't behave normally on your machine locally because of CORS restriction. You need to configure a new firebase app and add admin-key.json inside functions directory to use all the features.

### Deployment

This app is deployed on firebase hosting and can be used by anyone. [LINK](https://bit.ly/pixel-notes)
