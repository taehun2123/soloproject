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
require('./routes/post.routes')(app);

app.listen(port);