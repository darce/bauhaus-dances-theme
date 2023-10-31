document.addEventListener('DOMContentLoaded', () => {
    /** Video collection */
    const videoItems = document.querySelectorAll('.video-homepage-item')
    const mediaItems = document.querySelectorAll('.video-homepage-media')
    if (!videoItems) return

    const handleTogglePlayback = (e) => {
        const mediaItem = e.target.closest('.video-homepage-item').querySelector('.video-homepage-media')
        /** Toggle playback */
        if (!mediaItem.classList.contains('is-playing')) {
            helperPlayVideo(mediaItem)
        } else {
            helperPauseVideo(mediaItem)
        }
    }

    const handleMouseover = (e) => {
        const videoItem = e.target.closest('.video-homepage-item')
        /** On mouseover, unconditionally remove 'is-dimmed' from the target video. */
        videoItem.classList.remove('is-dimmed')
        /** Hide metadata when hovering off video item */
        if (!e.target.closest('.video-homepage-metadata')) {
            videoItem.classList.add('is-hovered')
        }
    }

    const handleMouseout = (e) => {
        const videoItem = e.target.closest('.video-homepage-item')
        videoItem.classList.remove('is-hovered')
        const mediaItemPlaying = document.querySelector('.is-playing')
        if (mediaItemPlaying) {
            helperDimVideos(videoItems)
        }
    }

    const handleVideoEnded = (e) => {
        const videoItem = e.target.closest('.video-homepage-item')
        const posterElement = videoItem.querySelector('.video-homepage-poster');
        if (posterElement) posterElement.classList.remove('hide')
        helperUndimVideos(videoItems)
        mediaItems.forEach(mediaItem => mediaItem.classList.remove('is-playing'))
    }

    const handleIsPlaying = (e) => {
        console.log(e)
        const videoItem = e.target.closest('.video-homepage-item')
        const loader = videoItem.querySelector('.video-homepage-loader')
        loader.classList.add('hide')
    }

    const helperPlayVideo = (mediaItem) => {
        const videoItem = mediaItem.closest('.video-homepage-item')
        const posterElement = videoItem.querySelector('.video-homepage-poster')
        posterElement.classList.add('hide')
        helperDimVideos(videoItems)
        /** Stop other videos playing */
        videoItems.forEach(videoItem => {
            const mediaItem = videoItem.querySelector('.video-homepage-media')
            if (mediaItem.classList.contains('is-playing')) {
                helperPauseVideo(mediaItem)
            }
        })
        videoItem.classList.remove('is-dimmed')
        mediaItem.classList.add('is-playing')
        mediaItem.play()
    }

    const helperPauseVideo = (mediaItem) => {
        const parentElement = mediaItem.parentElement
        const posterElement = parentElement.querySelector('.video-homepage-poster')
        posterElement.classList.remove('hide')
        helperUndimVideos(videoItems)
        mediaItem.classList.remove('is-playing')
        mediaItem.pause()
    }

    const helperDimVideos = (videoItems) => {
        videoItems.forEach(videoItem => {
            const mediaItem = videoItem.querySelector('.video-homepage-media')
            if (!mediaItem.classList.contains('is-playing')) {
                videoItem.classList.add('is-dimmed')
                mediaItem.pause()
            }
        })
    }

    const helperUndimVideos = (videoItems) => {
        videoItems.forEach(video => {
            video.classList.remove('is-dimmed')
        })
    }

    videoItems.forEach(videoItem => {
        const mediaItem = videoItem.querySelector('.video-homepage-media')
        if ('ontouchstart' in window) {
            // Mobile device
            videoItem.addEventListener('click', handleTogglePlayback)
        } else {
            // Non-mobile device
            videoItem.addEventListener('click', handleTogglePlayback)
            videoItem.addEventListener('mouseover', handleMouseover)
            videoItem.addEventListener('mouseout', handleMouseout)
        }
        mediaItem.addEventListener('ended', handleVideoEnded)
        mediaItem.addEventListener('playing', handleIsPlaying)
    })
})