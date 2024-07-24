# Development Enviroment

### Requirements
``` js
ASP.Net Core v8 
Docker
Node.JS
Node.JS package manager
```
### Set up
Run projects in 3 seperate terminals, each terminal shall reference the listed steps, each terminal should reflect the root of each folder and ran individually

<strong>1. Start the Docker container</strong>
  </br>
  </br>

  This will insure our database is running and initalises the dummy data that's ready to go.

```bash
docker compose up
```
  </br>
  </br>

<strong>2. Use the built-in VS-Code feature `Run and Debug` when running server.</strong>
  </br>
  </br>
Alternatively we can run the dotnet cmds assuming you've installed the packages according to your OS.
  </br>

<i><strong>(dotnet cmd coming soon)</strong></i>

```bash
dotnet ....
```

<strong>3. npm start in React directory. Assuming you are experienced with React development.</strong>
</br>
</br>
Install dependencies
```bash
npm install
```
</br>
</br>

Run development application
```bash
npm run start
```
</br>
</br>

# Production

I may push too containerize this whole project and push up to dockerhub and host it from there.

</br>
</br>
</br>

## Notes while developing
Create a better developer experience for running this project locally.
</br>
</br>


### Notes from today: Date: 24/07/24
#### Where to start..
 <strong>
 <p>Since I am using this as a code-first learning approach. Coming from a background using JavaScript, TypeScript and programming in a NodeJS enviroment.</p>
<p>The idea of architecture for an application similar to this, was fine too understand but translating it into a new language, and it being my third day learning and writing Csharp.</p>
<p>
Today I wanted to change over the database to something I was familar with which is PostgreSQL. As the built in memory from asp.net didn't seem good to use. Especially for persistance of data. And it is only reccomended to use the built in memory for 1 time uses only, where with a blog and posting, posts are suppose to stay until it's removed.

 I haven't created a PG server from scratch before so decided to spin up a docker container similar to one I have worked with in a previous project.
 So I dont have to worry too much about creating a VM from scratch.

 I big caveat for me was to understand first, I need a server to handle my endpoints. 
 
 eg: ASP.Net Core Server (endpoints), Which I already have built now it's just time to switch over to using PostgreSQL. 

 But then to have this server talk to the PG server. Was super confusing to me. Because I needed to configure my PG server to accept request from the API and this took me a moment. I finally figured it out with the networking configuration in the docker compose file, needed to be changed to accept the ports I am using.


 After all this I needed to understand that my PG server I spin up in docker has a Database and a table when initalised. Therefore I need to write in my .Net DBcontext to see that there is data already present and connecting to the existing table "blog_test". <i>(refer to PostsDB.cs file)</i>

 Of course I got help from google, but after reading and writing so many different lines of code. I come to realise that the DBcontext from the Microsoft.EFC, acts as if I were using the pgclient package in a NodeJs enviroment. But with more features. <i>(I need to read more on this)</i> but apparently the DBcontext takes care of opening and closing the client, where as in a NodeJs enviroment we had to do that manually, eg: each time a requested promise was fulfilled. Close the client.
 But I should confirm this first. 

 Many more Caveats I had faced today. But we finally have the connection working. I can succesfully run each CRUD operation from my ASP.net core application. Happy :^D o7




</p>
</strong>

