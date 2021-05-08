song="";
music="";
scoreLeftWrist=0;

LeftWristX=0;
LeftWristY=0;
RightWristX=0;
RightWristY=0;

function preload(){
  song=loadSound("music.mp3");
  music=loadSound("Bassthoven.mp3");
}

function setup(){
canvas=createCanvas(600,500);
canvas.center();

video=createCapture(VIDEO);
video.hide();

poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on('pose',gotPoses);
}

function draw(){
  image(video,0,0,600,500);

  fill(255,0,0);
  stroke(255,0,0);

  if(scoreLeftWrist>0.2){
  circle(LeftWristX,LeftWristY,20);
  InNumberleftWristY=Number(LeftWristY);
  remove_decimals=floor(InNumberleftWristY);
  volume=remove_decimals/500;
  console.log("volume= "+volume);
  document.getElementById('volume').innerHTML="volume="+volume;
  song.setVolume(volume);
  }
}

function play() {
  song.play();
  song.setVolume(1);
  song.rate(1);
  music.play();
  music.rate(1);
  music.setVolume(1);
}

function modelLoaded() {
  console.log('Posenet is initialized');
}

function gotPoses(results){
  if(results.length>0){
    console.log(results);
    scoreLeftWrist=results[0].pose.keypoints[9].score;
    LeftWristX=results[0].pose.leftWrist.x;
    LeftWristY=results[0].pose.leftWrist.y;
    console.log("LeftWristX="+LeftWristX+" LeftWristY="+LeftWristY);
    RightWristX=results[0].pose.leftWrist.x;
    RightWristY=results[0].pose.leftWrist.y;
    console.log("RightWristX="+RightWristX+" RightWristY="+RightWristY);
  }
}