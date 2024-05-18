const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db'); 
const User = require('./models/User');
const UserInfo=require('./models/UserInfo');
const DocInfo=require('./models/DocInfo');
const Prescription=require('./models/Prescription');
const Tests=require('./models/Tests');
const UserController = require('./controllers/userController');
 const  userInfoController = require('./controllers/userInfoController');
 const  docInfoController = require('./controllers/docInfoController');
 const prescriptionController=require('./controllers/prescriptionController');
 const testController=require('./controllers/testController');
 const Alarm=require('./models/Alarm');
 const AlarmController=require('./controllers/AlarmController');
 const upload = require('./multerMiddleware');
 const userImageController=require('./controllers/userImageController');



 const nauth=require('./nauth')
const auth=require('./auth');
const app = express();
const port = 3000;


app.use(bodyParser.json());


db.sync()
  .then(() => {
    console.log('Database synced successfully');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });
  
  
app.post('/api/users', UserController.insertUser);
app.post('/api/user',UserController.loginUser);
app.post('/api/userinfo',auth,userInfoController.createUser);
app.get('/api/userdetails',nauth,userInfoController.getUserInfo);
app.post('/api/docinfo',auth,docInfoController.createDoctor);
app.get('/api/doctordetails',nauth,docInfoController.getDocInfo);
app.get('/api/alldoctors',docInfoController.getAllDoctors);
app.post('/api/prescription',auth,prescriptionController.CreatePrescription);
app.post('/api/test',auth,testController.CreateTests);
app.get('/api/Userprescriptions',nauth,prescriptionController.findPrescriptionsByPid);
app.get('/api/userTest',nauth,testController.findTestsByPid);
app.get('/api/findpatient',prescriptionController.findpatient);


app.get('/api/findtest',testController.findtest);
app.post('/api/alarm',auth,AlarmController.createAlarm);
app.get('/api/findalarm',nauth,AlarmController.findAlarm);
app.delete('/api/alarmDelete',AlarmController.deleteAlarmById);

app.get('/api/notification',nauth,AlarmController.notification);
app.post('/api/upload',auth, userImageController.insertImage);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
