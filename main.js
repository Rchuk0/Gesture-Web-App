prediction_1 = "";
prediction_2 = "";

Webcam.set({
    width:350,
    height:300,
    image_format: 'png',
    png_quility:100
});

camera = document.getElementById("webcam");

Webcam.attach('#webcam');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("snapshot_div").innerHTML = '<img id="captured_img" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/auKzt6HEp/model.json', modelLoaded);

function modelLoaded(){
    console.log('Model Loaded!');
}

function speak(){
    var synth = Window.speechSynthesis;
    speak_data_1 = "The First Prediction is: " + prediction_1;
    speak_data_2 = "The Second Prediction is: " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function analyse(){
    img = document.getElementById('captured_img');
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if (error){
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("emoji_1_name").innerHTML = results[0].label;
        document.getElementById("emoji_2_name").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if (results[0].label == "Cheers")
        {
            document.getElementById("emoji_1").innerHTML  = "✌";
        }

        if (results[0].label == "Thumbs up")
        {
            document.getElementById("emoji_1").innerHTML  = "👍";
        }

        if (results[0].label == "Super")
        {
            document.getElementById("emoji_1").innerHTML  = "👌";
        }




        if (results[1].label == "Cheers")
        {
            document.getElementById("emoji_2").innerHTML  = "✌;";
        }

        if (results[1].label == "Thumbs up")
        {
            document.getElementById("emoji_2").innerHTML  = "👍";
        }

        if (results[1].label == "Super")
        {
            document.getElementById("emoji_2").innerHTML  = "👌";
        }
    }
}

