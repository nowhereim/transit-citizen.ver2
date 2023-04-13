const crypto = require("crypto");
const connect = require("../schemas");
connect();
require("dotenv").config();
const Maching = require("../schemas/maching");
function initializeSocket(server) {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    socket.on("nickname", (nickname) => {
      console.log(nickname);
      socket["nickname"] = nickname;
    });

    socket.on("leaveRoom", (roomName) => {
      console.log(roomName);
      socket.leave(roomName);
    });

    // socket.on("randomjoin", (msg) => {
    //   socket.on("end", (msg) => {
    //     try {
    //       clearInterval(interval);
    //     } catch (e) {
    //       console.log(e + "there is no interval");
    //     }
    //   });
    //   const gender = msg.gender;
    //   const dropstation = msg.dropstation;
    //   const trainNum = msg.train;
    //   const trainline = trainNum.toString().slice(0, 1);
    //   const train = trainNum.toString().slice(1, 2);
    //   const trainNumthird = trainNum.toString().slice(2, 4);
    //   const socketjoinNumber = trainline + trainNumthird;

    //   socket.emit("maching", {
    //     msg: "매칭 중 입니다. 참여인원이 2인 이상이 되면 매칭이 시작됩니다.",
    //   });
    //   Maching.create({
    //     nickname: msg.nickname,
    //     location: socketjoinNumber,
    //     dropstation: dropstation,
    //   });
    //   let count = 0;
    //   const interval = setInterval(() => {
    //     Maching.find(
    //       {
    //         location: socketjoinNumber,
    //       },
    //       (err, result) => {
    //         if (err) {
    //           conosle.log(err);
    //         } else {
    //           if (err) {
    //             console.log(err);
    //           } else if (result.length >= 2) {
    //             machingFunction(result);
    //           }
    //         }
    //       },
    //     );
    //     count = count + 1;
    //     if (count === 10) {
    //       io.emit(msg.nickname, {
    //         fail: "매칭 가능한 상대방이 없습니다. 다시 시도해주세요.",
    //       });
    //       clearInterval(interval);
    //       Maching.deleteMany({ nickname: msg.nickname }, (err, data) => {});
    //     }
    //   }, 5000);
    //   const machingFunction = (result) => {
    //     clearInterval(interval);
    //     const ranNum = Math.floor(Math.random() * result.length);
    //     const roomkey =
    //       ranNum + crypto.randomBytes(2).toString("hex") + socketjoinNumber;
    //     if (result[ranNum].nickname !== msg.nickname) {
    //       const name = result[ranNum].nickname;
    //       repeatFunction({
    //         nickname: msg.nickname,
    //         name: name,
    //         roomkey: roomkey,
    //         train: train,
    //         debug: "debug line 158",
    //       });
    //     }
    //     if (result[ranNum].nickname === msg.nickname && result[ranNum] === 0) {
    //       ranNum = ranNum + 1;
    //       const ranNum =
    //         userone + crypto.randomBytes(2).toString("hex") + usertwo;
    //       const name = result[ranNum].nickname;
    //       repeatFunction({
    //         nickname: msg.nickname,
    //         name: name,
    //         roomkey: roomkey,
    //         train: train,
    //         debug: "debug line 175",
    //       });
    //     }
    //     if (
    //       result[ranNum].nickname === msg.nickname &&
    //       result[ranNum] !== 0 &&
    //       ranNum !== 0
    //     ) {
    //       const name = result[ranNum - 1].nickname;
    //       repeatFunction({
    //         nickname: msg.nickname,
    //         name: name,
    //         roomkey: roomkey,
    //         train: train,
    //         debug: "debug line 190",
    //       });
    //     } else if (
    //       result[ranNum].nickname === msg.nickname &&
    //       result[ranNum] !== 0 &&
    //       ranNum === 0
    //     ) {
    //       const name = result[ranNum + 1].nickname;
    //       repeatFunction({
    //         nickname: msg.nickname,
    //         name: name,
    //         roomkey: roomkey,
    //         train: train,
    //         debug: "debug line 203",
    //       });
    //     }
    //   };
    //   const repeatFunction = (value) => {
    //     Maching.deleteMany({ nickname: value.nickname }, (err, data) => {});
    //     Maching.deleteMany({ nickname: value.name }, (err, data) => {
    //       if (data.deletedCount === 0) {
    //         return interval;
    //       } else {
    //         socket.join(value.roomkey);
    //         repeatEmit(value);
    //       }
    //     });
    //   };
    // });

    // const repeatEmit = (value) => {
    //   io.emit(value.nickname, {
    //     roomkey: value.roomkey,
    //     ownself: value.nickname,
    //     fair: value.name,
    //     train: value.train,
    //     debug: value.debug,
    //   });
    //   io.emit(value.name, {
    //     msg: "매칭이 완료되었습니다. 채팅방으로 이동합니다.",
    //     roomkey: value.roomkey,
    //     fair: value.nickname,
    //     train: value.train,
    //     debug: value.debug,
    //   });
    // };
    socket.on("randomjoin", (msg) => {
      socket.on("end", () => {
        try {
          clearInterval(interval);
        } catch (e) {
          console.log(e + "there is no interval");
        }
      });

      const { gender, dropstation, train: trainNum, nickname } = msg;
      const trainline = trainNum.toString().slice(0, 1);
      const train = trainNum.toString().slice(1, 2);
      const trainNumthird = trainNum.toString().slice(2, 4);
      const socketjoinNumber = trainline + trainNumthird;

      socket.emit("maching", {
        msg: "매칭 중 입니다. 참여인원이 2인 이상이 되면 매칭이 시작됩니다.",
      });

      Maching.create({
        nickname: nickname,
        location: socketjoinNumber,
        dropstation: dropstation,
      });

      let count = 0;
      const interval = setInterval(() => {
        Maching.find({ location: socketjoinNumber }, (err, result) => {
          if (err) {
            console.log(err);
          } else if (result.length >= 2) {
            findMatch(result, nickname, socketjoinNumber);
          }
        });

        count += 1;
        if (count === 10) {
          io.emit(nickname, {
            fail: "매칭 가능한 상대방이 없습니다. 다시 시도해주세요.",
          });
          clearInterval(interval);
          Maching.deleteMany({ nickname: nickname }, (err, data) => {
            if (err) console.log(err);
          });
        }
      }, 5000);
    });

    function findMatch(result, nickname, socketjoinNumber) {
      const ranNum = Math.floor(Math.random() * result.length);
      const roomkey =
        ranNum + crypto.randomBytes(2).toString("hex") + socketjoinNumber;
      let matchedNickname = result[ranNum].nickname;

      if (matchedNickname === nickname) {
        matchedNickname = result[(ranNum + 1) % result.length].nickname; //
      }

      matchUsers({ user1: nickname, user2: matchedNickname, roomkey });
    }

    function matchUsers({ user1, user2, roomkey, train }) {
      Maching.deleteMany({ nickname: { $in: [user1, user2] } }, (err, data) => {
        if (err) {
          console.log(err);
        } else if (data.deletedCount > 0) {
          socket.join(roomkey);
          emitMatchInfo(user1, user2, roomkey, train);
        }
      });
    }

    function emitMatchInfo(user1, user2, roomkey, train) {
      io.emit(user1, {
        roomkey: roomkey,
        ownself: user1,
        fair: user2,
        train: train,
      });
      io.emit(user2, {
        msg: "매칭이 완료되었습니다. 채팅방으로 이동합니다.",
        roomkey: roomkey,
        fair: user1,
        train: train,
      });
    }

    socket.on("persnalchat", (data) => {
      io.to(data.roomkey).emit("broadcast", {
        url: data.url,
        profile: data.profile,
        name: data.nickname,
        msg: data.msg,
      });
    });

    socket.on("joinFair", (data) => {
      Maching.deleteMany({ nickname: data.name }, () => {});
      socket.join(data.roomkey);
    });

    socket.on("disconnect", (data) => {
      Maching.deleteMany({ nickname: socket["nickname"] }, () => {});
    });
  });
}
module.exports = initializeSocket;

// 1.naver , google 소셜로그인 마무리
// 2.채팅방에서 프로필 클릭시 정보 안보임
// 3.newtoken 간헐적오류 해결
// 4.마이페이지에서 사진을 저장하고 사진을 업로드하면 오류발생
// 5.상대방이 채팅종료시 알림필요
// 6.채팅후 마이페이지 이동시 토큰을 셋팅하지못함
// 7.뉴토큰 오류시 로그인 해제
