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
  <br/>
  <br/>

  This will insure our database is running and initalises the dummy data that's ready to go.

```bash
docker compose up
```
  <br/>
  <br/>

<strong>2. Use the built-in VS-Code feature `Run and Debug` when running server.</strong>
  <br/>
  <br/>
Alternatively we can run the dotnet cmds assuming you've installed the packages according to your OS.
  <br/>

<i><strong>(dotnet cmd coming soon)</strong></i>

```bash
dotnet ....
```
3. npm start in React directory. Assuming you are

```bash
npm run start
```
## Notes
Create a better developer experience for running this project locally.

# Production

I may push too containerize this whole project and push up to dockerhub and host it from there.
