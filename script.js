window.addEventListener('DOMContentLoaded',function(){
    const canvas=document.getElementById('myCanvas');
    const ctx=canvas.getContext('2d');
    canvas.width = window.innerWidth;
        canvas.height = window.innerHeight * 0.5;
  
    var audioInput=document.getElementById('musicFile');
    var audioPlay=document.getElementById('musicAudio');
    audioInput.addEventListener('change',function(e){
        var file=audioInput.files[0];
        if(file){
            var audiourl=URL.createObjectURL(file);
            audioPlay.src=audiourl;
            audioPlay.play();

            const audioContext = new AudioContext();
            const audioSource = audioContext.createMediaElementSource(audioPlay);
            const analyser = audioContext.createAnalyser();

            audioSource.connect(analyser);
            analyser.connect(audioContext.destination);

            function visualize() {
                const bufferLength = analyser.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);
        
                requestAnimationFrame(visualize);
        
                analyser.getByteFrequencyData(dataArray);
        
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = createLinearGradient(ctx, canvas.height);
                
                const barWidth = (canvas.width / bufferLength) * 2.5;
                let x = 0;
        
                for (let i = 0; i < bufferLength; i++) {
                  const barHeight = dataArray[i] * 2.5;
        
                  ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight);
        
                  x += barWidth + 1;
                }
              }
              audioPlay.addEventListener('play', function() {
                visualize();
              });

        }
    })
    // Helper function to create a linear gradient
    function createLinearGradient(context, height) {
        const gradient = context.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, 'red');
        gradient.addColorStop(0.7, 'yellow');
        gradient.addColorStop(1, 'green');
        return gradient;
      }
})