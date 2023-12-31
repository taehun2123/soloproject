const express = require("express");
const app = express();
const cors = require("cors");
const port = 8080;
const fs = require('fs');
const bodyParser = require('body-parser');
const data = require('./data.json')
const cart = require('./cart.json')
const filePath = 'data.json'
const cartPath = 'cart.json'
const { v4: uuidv4 } = require('uuid');
const randomUUID = uuidv4();
const multer = require('multer'); // 파일 업로드를 처리하기 위한 라이브러리
app.use(cors());
app.use(express.json());
app.use('/images', express.static('images'))
app.use(bodyParser.json());


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images/'); //이미지를 저장할 폴더
  }, 
  filename: function (req, file, cb){
    cb(null, file.originalname); // 파일 명
  }
});
const upload = multer({storage});

app.post('/images', upload.single('image'), (req,res) => {
  res.json({ imageUrl : req.file.path })
});

app.get("/", (req,res)=> {
  res.send({msg: "Hello world"})
})

app.get("/list", (req,res)=> {
  res.send(data);
})

app.post("/listInsert", (req,res)=>{
  const newData = req.body;
    const newItem = 
  {
    id : randomUUID,
    image: newData.image,
    name : newData.name,
    content : newData.content,
    price : newData.price,
  }
  data.push(newItem);
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

app.post("/listEdit", (req,res)=>{
  const FrontData = req.body; //바디 값 불러오기
  fs.readFile(filePath, 'utf8', (err, data) => { //이전 데이터 파일 불러오기
    if(err){
      console.error("파일 읽기 중 에러 :", err);
      res.status(500).json({msg: '파일 읽기 에러'})
    } else {
      try {
        const jsonlists = JSON.parse(data); //JSON으로 파싱한 데이터

        const updatedListIndex = jsonlists.findIndex((list) => list.id === FrontData.id);
        if (updatedListIndex!==-1) {
          jsonlists[updatedListIndex].image = FrontData.image;
          jsonlists[updatedListIndex].name = FrontData.name;
          jsonlists[updatedListIndex].content = FrontData.content;
          jsonlists[updatedListIndex].price = FrontData.price;
          const updatedListData = JSON.stringify(jsonlists);

          fs.writeFile(filePath, updatedListData, 'utf8', (err) => { 
            //수정된 데이터를 쓰기
            if(err) {
              console.error("파일 쓰기 중 에러", err);
              res.status(500).json({ msg: '파일 쓰기 에러'});
            } else {
              console.log("파일이 수정됨.")
              res.json({ msg: '파일이 수정됨'})
            }
          });
        } else {
          res.status(404).json({msg: "수정할 상품을 찾지 못했습니다."});
        }
      } catch (parseError){
        console.error('JSON 파싱 중 에러', parseError);
        res.status(400).json({msg: '잘못된 JSON'});
      }}
  });
  });

  app.delete('/listDelete/:id', (req, res) => {
    const deletedId = req.params.id;
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('파일 읽기 중 에러:', err);
        res.status(500).json({ msg: '파일 읽기 에러' });
      } else {
        try {
          const lists = JSON.parse(data);
  
          
           // 삭제할 상품을 찾아서 제외합니다.
          const updatedLists = lists.filter((list) => list.id !== deletedId);

          // 수정된 데이터를 JSON 형식의 문자열로 변환합니다.
          const updatedListData = JSON.stringify(updatedLists);
  
          // 수정된 JSON 데이터를 파일에 씁니다.
          fs.writeFile(filePath, updatedListData, 'utf8', (err) => {
            if (err) {
              console.error('파일 쓰기 중 에러:', err);
              res.status(500).json({ msg: '파일 쓰기 에러' });
            } else {
              console.log('파일이 성공적으로 수정되었습니다.');
              res.json({ msg: '데이터가 성공적으로 수정되었습니다.' });
            }
          });
        } catch (parseError) {
          console.error('JSON 파싱 중 에러:', parseError);
          res.status(400).json({ msg: '잘못된 JSON 데이터' });
        }
      }
    });
  });

  app.get("/cart", (req,res)=> {
    res.send(cart);
  })

  app.post("/cartInsert", (req,res)=> {
    const cartId = req.body.id;
    fs.readFile(filePath, 'utf8', (err, data) => {
      if(err){
        console.error("파일 읽기 중 에러 :", err);
        res.status(500).json({msg: '파일 읽기 에러'})
      } else {
        try {
          const lists = JSON.parse(data);

          const findItem = lists.find((list) => list.id === cartId);
          const isInclude = cart.find((item)=>(item.id === findItem.id));

          if(isInclude){
            isInclude.cnt += 1;
          } else {
          const newItem = 
          {
            id : findItem.id,
            image : findItem.image,
            name : findItem.name,
            content : findItem.content,
            price : findItem.price,
            cnt : 1,
          }
          cart.push(newItem);
          }
          res.send({msg : "Success"})
          const jsonData = JSON.stringify(cart);
          fs.writeFile(cartPath, jsonData, 'utf8', (err) => {
            if (err) {
            console.error('파일 저장 중 에러 발생:', err);
            } else {
            console.log('파일이 성공적으로 저장되었습니다.');
            }
          });
        } catch (parseError) {
          console.error('JSON 파싱 중 에러:', parseError);
          res.status(400).json({ msg: '잘못된 JSON 데이터' });
        }
      }
  })
})

app.delete('/cartDelete/:id', (req, res) => {
  const deletedId = req.params.id;
  fs.readFile(cartPath, 'utf8', (err, data) => {
    if (err) {
      console.error('파일 읽기 중 에러:', err);
      res.status(500).json({ msg: '파일 읽기 에러' });
    } else {
      try {
        const lists = JSON.parse(data);

        
         // 삭제할 상품을 찾아서 제외합니다.
        const updatedLists = lists.filter((list) => list.id !== deletedId);

        // 수정된 데이터를 JSON 형식의 문자열로 변환합니다.
        const updatedListData = JSON.stringify(updatedLists);

        // 수정된 JSON 데이터를 파일에 씁니다.
        fs.writeFile(cartPath, updatedListData, 'utf8', (err) => {
          if (err) {
            console.error('파일 쓰기 중 에러:', err);
            res.status(500).json({ msg: '파일 쓰기 에러' });
          } else {
            console.log('파일이 성공적으로 수정되었습니다.');
            res.json({ msg: '데이터가 성공적으로 수정되었습니다.' });
          }
        });
      } catch (parseError) {
        console.error('JSON 파싱 중 에러:', parseError);
        res.status(400).json({ msg: '잘못된 JSON 데이터' });
      }
    }
  });
});
app.listen(port, () => {
  console.log(`포트 ${port}번으로 서버 온`)
})
