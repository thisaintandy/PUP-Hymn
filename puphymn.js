document.addEventListener('DOMContentLoaded', function() {
    // synchronize audio with lyrics and scroll the lyrics container
    const audioPlayer = document.getElementById('audio-player');
    const lyrics = document.querySelectorAll('.lyrics-container p');
    const lyricsContainer = document.getElementById('lyricsContainer');

    // Start audio after 12 seconds
    setTimeout(function() {
        audioPlayer.play();
    }, 11000); 

    // Synchronize scrolling with audio playback
    audioPlayer.addEventListener('timeupdate', function() {
        const currentTime = audioPlayer.currentTime;

        lyrics.forEach((lyric) => {
            const startTime = parseInt(lyric.getAttribute('data-start'));
            const endTime = parseInt(lyric.getAttribute('data-end'));

            if (currentTime >= startTime && currentTime < endTime) {
                highlightLyric(lyric);
                scrollLyricsContainer(lyric);
            } else {
                unhighlightLyric(lyric);
            }
        });
    });

    // Function to highlight a lyric
    function highlightLyric(lyric) {
        lyric.classList.add('active-lyric');
    }

    //  to remove highlight from a lyric
    function unhighlightLyric(lyric) {
        lyric.classList.remove('active-lyric');
    }

    //  to scroll the lyrics container
    function scrollLyricsContainer(lyric) {
        const containerRect = lyricsContainer.getBoundingClientRect();
        const lyricRect = lyric.getBoundingClientRect();
        
        //  to center the active lyric
        const scrollPosition = lyric.offsetTop - (containerRect.height / 2) + (lyricRect.height / 2) - (lyricsContainer.clientHeight / 2);
    
        //  to the calculated position with smooth behavior
        lyricsContainer.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
        });
    }
});
