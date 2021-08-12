prediction = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90,
});

camer = document.getElementById("camera");
Webcam.attach('#camera');

function snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    });
}

console.log('ml5 version', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/aPzL8BNqb/model.json', modelLoaded);

function check(){
    document.getElementById("result_gesture_name").innerHTML= "Please wait...";
    img=document.getElementById('captured_image');
    classifier.classify(img,gotResults);
}

function modelLoaded() {
    console.log('model loaded');
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data1 = "The prediction is" + prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    synth.speak(utterThis);
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    else{

        if(results[0].label=="vectory"){
         document.getElementById("result_gesture_name").innerHTML= "&#9996";
        }

        if(results[0].label=="super"){
            document.getElementById("result_gesture_name").innerHTML= "&#128076";;
        }

        if(results[0].label=="done"){
            document.getElementById("result_gesture_name").innerHTML= "&#128077";
        }

        console.log(results);
        //document.getElementById("result_gesture_name").innerHTML= results[0].label;
        prediction=result[0].label;
    }
}
