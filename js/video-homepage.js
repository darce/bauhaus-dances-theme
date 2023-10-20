document.addEventListener('DOMContentLoaded', () => {
    const videoElements = document.querySelectorAll('.video-homepage-media')
    if (!videoElements) return

    const handleVideoStart = (e) => {
        const element = e.target
        if (!element.classList.contains('is-playing')) {
            dimVideos(videoElements)
            element.classList.remove('is-dimmed')
            element.classList.add('is-playing')
            element.play()
        }

        else {
            undimVideos(videoElements)
        }
    }

    const handleVideoEnded = (e) => {
        videoElements.forEach(video => {
            video.classList.remove('is-dimmed');
            video.classList.remove('is-playing')
        });
        const video = e.target;
        video.currentTime = 2
    }

    const handleMouseover = (e) => {
        /** video is playing */
        /** video is not playing */
        e.target.classList.remove('is-dimmed')
    }

    const handleMouseout = (e) => {
        /** video is playing */
        /** video is not playing */
        const video = e.target
        if (!video.classList.contains('is-playing')) {
            e.target.classList.add('is-dimmed')
        }
    }

    const dimVideos = (videoElements) => {
        videoElements.forEach(video => {
            video.classList.add('is-dimmed')
            video.classList.remove('is-playing')
            video.pause()
        })
    }

    const undimVideos = (videoElements) => {
        videoElements.forEach(video => {
            video.classList.remove('is-dimmed')
            video.classList.remove('is-playing')
            video.pause()
        });
    }

    videoElements.forEach(video => {
        if ('ontouchstart' in window) {
            // Mobile device
            video.addEventListener('click', handleVideoStart);
        } else {
            // Non-mobile device
            video.addEventListener('click', handleVideoStart);
            video.addEventListener('ended', handleVideoEnded);
            video.addEventListener('mouseover', handleMouseover);
            video.addEventListener('mouseout', handleMouseout);
        }
    })
})