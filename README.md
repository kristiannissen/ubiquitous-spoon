**Idea**

Instead of using something like redux, the goal is for each "major" components to be completely standalone and only firing events to the backend and respond to events from the backend using socket.io.

Usecase
User changes start and end date in the view, these changes are fired to the backend as events. The backend receives the event, alters the data based on start and end date, and this update is automatically reflected on the dashboard view.

**Resources**

https://stackoverflow.com/questions/6084360/using-node-js-as-a-simple-web-server
https://www.npmjs.com/package/connect
https://tutorialedge.net/react/react-socket-io-tutorial/
https://reactjs.org/docs/context.html
