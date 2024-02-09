const express = require('express');
const cors = require('cors');
require('./db/config');
const User = require('./db/User');
const Message = require('./db/Messages');
const app = express();
const socket = require('socket.io')
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000"
}));

app.post('/register', async (req, resp, next) => {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
        return resp.send({ msg: "Username already used", status: false });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
        return resp.send({ msg: "Email already used", status: false });
    }
    let user = new User(req.body);
    let result = await user.save(); // details are saved in database
    result = result.toObject();
    delete user.password
    // resp.send(result);
    return resp.send({ status: true, user });

})

app.post('/login', async (req, resp, next) => {
    let user = await User.findOne(req.body);
    // if (!user) {
    //     resp.send({ msg: "Incorrect Credentials", status: false });
    // }
    // delete user.password;
    // resp.send({ user, status: true });

    console.log(user);
    if (user) {
        delete user.password;
        resp.send(user);
    }
    else {
        resp.send({ msg: "Incorrect Credentials" });
    }

})

app.post('/setAvatar/:id', async (req, resp, next) => {
    try {

        let userId = req.params.id;
        let avatarImage = req.body.image;
        let userData = await User.findByIdAndUpdate({ _id: userId }, {

            isAvatarImageSet: true,
            AvatarImage: avatarImage
        }
        );
        // console.log(userData);

        resp.send({ isSet: userData.isAvatarImageSet, image: userData.AvatarImage });
    }
    catch (error) {
        next(error);
    }

})

app.get('/allusers/:id', async (req, resp, next) => {
    let result = await User.find({ _id: { $ne: req.params.id } }).select([
        "email",
        "username",
        "AvatarImage",
        "_id"
    ]);
    if (result.length > 0) resp.send(result);
    else resp.send({ result: "data not found" });
})

app.post('/addmsg', async (req, resp, next) => {
    const { from, to, message } = req.body;
    const data = await Message.create({
        message: { text: message },
        // users: {to, from},
        users:[to , from],
        senders: from
    })
    if (data) resp.send({ msg: "Message added Successfully" });
    else resp.send({ msg: "Message not added to DataBase" });
})

app.post("/getmsg", async (req, resp, next) => {
    try {
        const {from , to} = req.body;
        const messages = await Message.find({
            // users : {$all : {to, from}}
            users:{$all:[to,from]}
        }).sort({ updatedAt: 1 });
        
        const projectMessages = messages.map((msg) => {
            return {
                fromSelf: msg.senders.toString() === from,
                message: msg.message.text,
            }
        })
        resp.send(projectMessages)
       
    }
    catch (ex) {
        next(ex);
    }
})
const server = app.listen(7000);

const io = socket(server , {
    cors:{
        origin:"http://localhost:3000",
        credentials:true,
    }
})

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user" , (userId) => {
        onlineUsers.set(userId , socket.id);
    });

    socket.on("send-msg" , (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieve" , data.message);
        }
    });
});
