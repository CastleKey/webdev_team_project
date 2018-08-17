# webdev_team_project

## This project is a collaborative effort required for Web Dev

We have the server and client in one repository for ease of uploading to git & heroku.

This project centres around marijuana strains and their relative effects. Visitors have the ability to:

• Register
• Login
• Search for Strains
• added functionality to come in due course...

On either system, Mac, Windows, you need to go to [this strains website where we got our API from](http://strains.evanbusse.com/) and click 'get a key'. Copy the key you received.


# Mac
## Mongo database:
Navigate to the folder through terminal and type:

$ mongod


## Node server:
Open a new terminal tab, in the same directory, type the following:

$ EVANBUSSE_APIKEY={YOUR KEY FROM http://strains.evanbusse.com/} npm start

This begins the server.  

## Client side:
Open a new tab in the same directory and type the following to open on localhost:4200:

$ ng serve



# Windows
Start server on windows, don't forget to "SET EVANBUSSE_APIKEY=$$" to set the api key replacing $$ with the actual api key before doing npm start.  


[Search for a strain contain letter b](https://tranquil-stream-31009.herokuapp.com/api/strain/b)  

[Search for a strain contain name afpak](https://tranquil-stream-31009.herokuapp.com/api/strain/afpak)  

[Search for a strain with name that doesn't existe](https://tranquil-stream-31009.herokuapp.com/api/strain/afpakaa)  

