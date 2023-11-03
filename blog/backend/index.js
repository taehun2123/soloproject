require('./models/db');
const express = require("express");
const cors = require("cors");
const session = require('express-session');
const app = express();
const fs = require('fs');
const data = require('./data.json');
const bodyParser = require('body-parser');
const port = 5050;
const { v4: uuidv4 } = require('uuid');
const randomUUID = uuidv4();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//세션과 쿠키 사용
app.use(session({
  secret: 'hoondev',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 3600000 } // 세션 유효 시간 (1시간)
}));

app.get("/",(req,res)=>{
  res.send({msg : "Hello"})
})

app.get("/post", (req, res)=>{
  res.send(data);
})

app.post("/postInsert",(req, res)=>{
  const reqNew = req.body;
  const newPost = 
  {
    id : randomUUID,
    title : reqNew.title,
    content : reqNew.content,
    thumb : reqNew.thumb,
    time : reqNew.time,
    log : reqNew.log,
  }
  data.push(newPost);
  res.send({msg : "Success"})
  const jsonData = JSON.stringify(data);
  fs.writeFile(filePath, jsonData, 'utf8', (err) => {
  if (err) {
  console.error('파일 저장 중 에러 발생:', err);
  } else {
  console.log('파일이 성공적으로 저장되었습니다.');
}
});
})

app.post("/postUpdate",(req, res)=>{
  const updatedData = req.body;
  // 기존 데이터를 새 데이터로 업데이트합니다.
  fs.readFile(filePath, 'utf8', (err, data) => { //json파일 읽어오기
    if (err) {
      console.error('파일 읽기 중 에러 발생:', err);
      res.status(500).json({ message: '파일 읽기 에러' });
    } else {
      try {
        // JSON 데이터를 JavaScript 객체로 파싱합니다.
        const posts = JSON.parse(data);

        // 수정된 게시물을 찾아서 업데이트합니다.
        const updatedPostIndex = posts.findIndex((post) => post.id === updatedData.id);
        const correctedUser = posts.find((user)=>user.log===updatedData.log);
        if (correctedUser) {
          posts[updatedPostIndex].title = updatedData.title;
          posts[updatedPostIndex].content = updatedData.content;
        // 수정된 데이터를 JSON 형식의 문자열로 다시 변환합니다.
        const updatedPostData = JSON.stringify(posts);

        // 수정된 JSON 데이터를 파일에 씁니다.
        fs.writeFile(filePath, updatedPostData, 'utf8', (err) => {
          if (err) {
            console.error('파일 쓰기 중 에러 발생:', err);
            res.status(500).json({ message: '파일 쓰기 에러' });
          } else {
            console.log('파일이 성공적으로 수정되었습니다.');
            res.json({ message: '게시글이 성공적으로 수정되었습니다.' });
          }
        });
      } else {
        // 수정할 게시물을 찾지 못한 경우 에러 응답을 보냅니다.
        res.status(404).json({ message: '작성자가 다르거나 수정할 게시글을 찾을 수 없습니다.' });
      }
    } catch (parseError) {
      console.error('JSON 파싱 중 에러 발생:', parseError);
      res.status(400).json({ message: '잘못된 JSON 데이터' }); 
      // status(400) Http 코드 : 잘못된 상태
    }
  }
});
});

app.delete('/postDelete/:id', (req, res) => {
  const deletedId = req.params.id;
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('파일 읽기 중 에러:', err);
      res.status(500).json({ msg: '파일 읽기 에러' });
    } else {
      try {
        const lists = JSON.parse(data);
        const updatedLists = lists.filter((list) => list.id !== deletedId);
        const updatedListData = JSON.stringify(updatedLists);

        fs.writeFile(filePath, updatedListData, 'utf8', (err) => {
          if (err) {
            console.error('파일 쓰기 중 에러:', err);
            res.status(500).json({ msg: '파일 쓰기 에러' });
          } else {
            console.log('파일이 성공적으로 수정되었습니다.');
            res.json({ message: '데이터가 성공적으로 삭제되었습니다.' });
          }
        });
      } catch (parseError) {
        console.error('JSON 파싱 중 에러:', parseError);
        res.status(400).json({ msg: '잘못된 JSON 데이터' });
      }
    }
  });
});

require('./routes/user.routes')(app);

app.listen(port);