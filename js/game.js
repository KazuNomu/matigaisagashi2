let timer = null;
const MAX = 2;
let count = 0;
let n;
function init() {
  if (timer == null) {
    start = new Date();
    time();
    gameStart();
  }
}
const APPLICATION_KEY = "f96e85ad261768855343a3aafe01a326c44e789f10ac6c4658952b03faed6bc3";
const CLIENT_KEY = "2ae7493aab692ae463a3831c9bc75246ac8c680cb7baa4585e1b3be001eba226";
const ncmb = new NCMB(APPLICATION_KEY,CLIENT_KEY);
const DBName = "GameClass";
let key = "message";
let GameClass = ncmb.DataStore(DBName);

function gameStart() {
  let size = 5;
  let qNum = Math.floor(Math.random()*q.length);
  for(let i=0; i<size*size; i++) {
    let s =document.createElement("span");
    s.textContent = q[qNum][0];
    s.setAttribute("id", "num"+i);
    s.addEventListener("click", function() {
      if(this.textContent == q[qNum][1]) {
        count++;
        //alert("正解");
        correct.play();
        while (cells.firstChild) {
          cells.removeChild(cells.firstChild);
        }
        if( count < MAX) {
          gameStart();
        } else {
          clearTimeout(timer);
          let test = new GameClass();
          test.set(key, parseInt(timer));
          test.save()
          .then(function(){
            console.log("成功");

          })
          .catch(function(err){
            console.log("エラー発生" + err);
          });
          GameClass
          .order("message")
          .fetchAll()
          .then(function(results){
            console.log("成功");
            n=results[0].message;
            console.log(n);
            if(n<timer){
              alert("Game clear");
            }else{
              console.log(timer);
              alert("Game clear");
              alert("High scre! :" + parseInt(timer));
            }
          })
          .catch(function(err){
            console.log("エラー発生" + err);
          });
          console.log(n);
        }
      }else {
        wrong.play();
      }
    })
    cells.appendChild(s);
    if (i % size == size -1) {
      const br = document.createElement("br");
      cells.appendChild(br);
    }
  }
  let p = Math.floor(Math.random()*size*size);
  let ans = document.getElementById("num" + p);
  ans.textContent = q[qNum][1];
}

function time() {
  let now = new Date();
  let eTime = parseInt((now. getTime()-start.getTime())/1000);
  score.textContent = eTime;
  timer = setTimeout("time()", 1000);
}
