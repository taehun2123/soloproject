const User = require("../models/users.model.js");

// 새 객체 생성
exports.create = (req,res)=>{
    if(!req.body){
        res.status(400).send({
            message: "내용을 채워주세요!"
        });
    };

    const user = new User({
        email: req.body.email,
        name: req.body.name,
        userId: req.body.userId,
        userPassword: req.body.userPassword,
    });

    // 데이터베이스에 저장
    User.create(user, (err, data) =>{
        if(err){
            res.status(500).send({
                message:
                err.message || "유저 정보를 갱신하는 중 서버 오류가 발생했습니다."
            });
        } else {
          res.send({message: '성공적으로 회원가입이 완료되었습니다.', success: true});
        }
    })
};

// 전체 조회 
exports.findAll = (req,res)=>{
    User.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "유저를 조회하는 중 오류가 발생했습니다."
          });

        else res.send(data);
      });
};


// id로 조회
exports.findOne = (req,res)=>{
    User.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `해당 ID : ${req.params.id} 를 가진 유저를 찾을 수 없습니다.`
            });
          } else {
            res.status(500).send({
              message: "다음 ID를 가진 유저를 찾는 중 오류가 발생했습니다. " + req.params.id
            });
          }
        } else res.send(data);
      });
};


// id로 갱신
exports.update = (req,res)=>{
    // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "빈 내용은 갱신할 수 없습니다!"
    });
  }

  User.updateById(
    req.params.id,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `다음 유저를 찾을 수 없습니다. ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "다음 Id를 가진 유저를 갱신하는 데 오류가 발생했습니다. " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};


// id로 삭제
exports.delete = (req,res)=>{
    User.remove(req.params.userId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `다음 유저를 찾을 수 없습니다. ${req.params.userId}.`
            });
          } else {
            res.status(500).send({
              message: "해당 유저를 삭제할 수 없습니다." + req.params.userId
            });
          }
        } else res.send({ message: `성공적으로 유저를 삭제했습니다!` });
      });
};

// 전체 삭제
exports.deleteAll = (req,res)=>{
    User.removeAll((err, data) => {
        if (err) {
          res.status(500).send({
            message:
              err.message || "전체 회원을 삭제하는 중 오류가 발생했습니다."
          })}
        else res.send({ message: `성공적으로 모든 유저를 삭제했습니다!` });
      })
};

/* -=-=-=-=-= 회원가입 관련 =-=-=-=-=- */

// userId 중복 검사
exports.checkId = (req, res) => {
  // User.findByUserID 함수를 호출하여 사용자 ID 중복 검사 수행
  User.findByUserID(req.params.userId, (err, data) => {
    if (err) {
      if (data) {
        // 중복된 아이디가 존재하는 경우
        res.send({ success: false, message: "중복된 아이디입니다." });
      } else {
        // 중복된 아이디가 없는 경우
        res.send({ success: true, message: "사용 가능한 아이디입니다." });
      }
    }
  });
};


// Login 유효성 검사
exports.login = (req,res)=>{
  const loadUser = req.body;
  User.login(loadUser, (err, data) => {
    if(err){
      // 예외 처리.
      if (err.kind === "not_found") {
        res.json({ success: false, message: "아이디나 패스워드를 다시 확인해주세요!"});
      } else {
        console.error(err);
        res.status(500).json({ success: false, message: "서버 오류 발생" });
      }
    }
    else {
      if (data) {
        req.session.user = data;
        res.json({ success: true, message: "로그인 되었습니다."});
      }
      else {
        res.json({ success: false, message: "아이디 및 비밀번호를 확인해주세요!"})
      }
    }
  })
};

//로그아웃
exports.logout = (req, res) => {
  // 세션 종료 (세션 데이터 삭제)
  req.session.destroy((err) => {
    if (err) {
      console.error('세션 종료 오류:', err);
    }
    // 클라이언트 측 로그아웃 (쿠키 삭제 등)
    res.send({message: '성공적으로 로그아웃 되었습니다.', success: true}); // 세션 쿠키 이름
  });
};