# test-categorizer
Test Tool for Bluescape Workspace Categorizer

## prerequisites
node, npm

## setup/configure
1. clone the repo
```
git clone git@github.com:BridgeCore/test-categorizer.git
```
2. initialize the module
```
cd test-categorizer
npm i
```

3. define environment variables and/or update config/config.json to provide secrets, ports, other config info:
```
export API_TOKEN=<your api key>
```

4. run it
```
node app.js
```
# TODO
[ ] determine how to close this window if it will serve as a popup
[ ] update the category xml to more representative values
[ ] update the flow to use oath expiring tokens (maybe, maybe just the real one)