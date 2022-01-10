song_1="";
song_1_status= "";
song_2_status= "";
song_2="";
left_wrist_x=0;
left_wrist_y=0;
right_wrist_x=0
right_wrist_y=0; 
score_left_wrist=0;
score_right_wrist=0; 
function preload(){
song_1= loadSound("music.mp3");
song_2= loadSound("music2.mp3");

}


function draw(){
image(video,0,0,500,500);
song_1_status=song_1.isPlaying();
song_2_status=song_2.isPlaying();
fill("red");
stroke("red");

if(score_left_wrist>0.2){

    circle(left_wrist_x,left_wrist_y,20);
    song_1.stop();

    if(song_2_status==false){

        song_2.play();
        document.getElementById("song_name").innerHTML= "playing-Peter Pan song";
    }

}

if(score_right_wrist>0.2){

    circle(right_wrist_x,right_wrist_y,20);
    song_2.stop();

    if(song_1_status==false){

        song_1.play();
        document.getElementById("song_name").innerHTML= "playing-Harry Potter theme song";
    }

}



}


function setup(){

    canvas = createCanvas(500,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    storage = ml5.poseNet(video,modelLoaded);
    storage.on("pose",gotPoses);

}


function modelLoaded(){
    console.log("Model Has Loaded Successfully!");
}

 function gotPoses(results){

    if(results.length>0){

        console.log(results);
        left_wrist_x = results[0].pose.leftWrist.x;
        left_wrist_y = results[0].pose.leftWrist.y;
        right_wrist_x = results[0].pose.rightWrist.x;
        right_wrist_y = results[0].pose.rightWrist.y;
        console.log("Left Wrist X = "+ left_wrist_x + "Left Wrist Y = " + left_wrist_y);
        console.log("Right Wrist X = "+ right_wrist_x + "Right Wrist Y = " + right_wrist_y);
        score_left_wrist=results[0].pose.keypoints[9].score;
        console.log("Score Left Wrist = " + score_left_wrist);
        score_right_wrist=results[0].pose.keypoints[10].score;
        console.log("Score Right Wrist = "+ score_right_wrist);

    }

 }
