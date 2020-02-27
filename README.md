# open-classroom

## Project setup
```
npm install (from /src and /server folders)
```

### Start server
```
npm run start (from /server)

if you get error port already in use try this command:
lsof -i tcp:3000
kill -9 [nodePID]
```

### Start client
```
npm run serve (from /src)
```

### Start MongoDb
```
sudo mongod (from anywhere)

if you get error port already in use try this command:
sudo lsof -iTCP -sTCP:LISTEN -n -P | grep -i mongod
sudo kill [mongodPID]
```
