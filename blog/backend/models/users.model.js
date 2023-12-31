const sql = require('./db.js');

// 생성자 

const User = function(user){

    this.email = user.email;

    this.name = user.name;

    this.userId = user.userId;

    this.userPassword = user.userPassword;

};

// user 튜플 추가 

User.create = (newUser, result)=>{
    sql.query("INSERT INTO users SET ?", newUser, (err, res)=>{
        if(err){
            console.log("에러 발생: ", err);
            result(err, null);
            return;
        }
        console.log("새 회원이 생성되었습니다: ",{id: res.insertId, ...newUser });
        result(null, {id: res.insertId, ...newUser});
    });

};

// user 생성 id로 조회
User.findByID = (userID, result)=>{
    sql.query('SELECT * FROM users WHERE id = ?',userID, (err, res)=>{
        if(err){
            console.log("에러 발생: ", err);
            result(err, null);
            return;
        }

        if(res.length){
            console.log("다음 회원을 찾았습니다: ", res[0]);
            result(null, res[0]);
            return;
        }
        // 결과가 없을 시 
        result({kind: "not_found"}, null);
    });
};

// user 전체 조회
User.getAll = result =>{
    sql.query('SELECT * FROM users', (err, res)=>{
        if(err){
            console.log("에러 발생: ", err);
            result(err, null);
            return;
        }
        console.log("가입된 모든 회원들: ", res);
        result(null, res);
    });
};

// user id로 수정
User.updateByID = (id, user, result)=>{
    sql.query('UPDATE users SET email = ?, name = ? WHERE id = ?', 
    [user.email, user.name, id], (err, res)=>{
        if(err){
            console.log("에러 발생: ", err);
            result(err, null);
            return;
        }
        if(res.affectedRows ==0){
            // id 결과가 없을 시 
            result({kind: "not_found"}, null);
            return;
        }
        console.log("회원을 찾았습니다: ", {id:id, ... user});
        result(null, {id:id, ...user});
    });
};

// user id로 삭제
User.remove = (id, result)=>{
    sql.query('DELETE FROM users WHERE id = ?',id, (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if(res.affectedRows ==0){
            // id 결과가 없을 시 
            result({kind: "not_found"}, null);
            return;
        }
        console.log("해당 ID의 회원이 정상적으로 삭제되었습니다: ", id);
        result(null, res);
    });
};

// user 전체 삭제
User.removeAll = result =>{
    sql.query('DELETE FROM users',(err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if(res.affectedRows ==0){
            result({kind: "not_found"}, null);
            return;
        }
        console.log(`${res.affectedRows} 명의 회원을 삭제하였습니다.`);
        result(null, res);
    });
};


/* -=-=-=-= 회원가입 =-=-=-=- */

// user 생성 UserID로 조회
User.findByUserID = (userID, result) => {
    sql.query('SELECT * FROM users WHERE userId = ?', userID, (err, res) => {
        if (err) {
            console.log("에러 발생: ", err);
            result(err, null);
        } else {
            if (res && res.length > 0) {
                console.log("중복된 아이디: ", res[0]);
                result(null, res[0]); // 중복된 사용자 정보 반환
            } else {
                // 결과가 없을 시
                result({ kind: "not_found" }, null);
            }
        }
    });
};


/* -=-=-=-= 로그인 =-=-=-=- */
User.login = (user, result)=>{
    sql.query('SELECT * FROM users WHERE userId = ? AND userPassword = ?',[user.userId, user.userPassword], (err, res)=>{
        if(err){
            console.log("에러 발생: ", err);
            result(err, null);
            return;
        }
        if(res.length){
            console.log("다음 회원이 로그인을 시도합니다: ", res[0]);
            result(null, res[0]);
            return;
        }
        // 결과가 없을 시 
        result({kind: "not_found"}, null);
    });
};

module.exports = User;