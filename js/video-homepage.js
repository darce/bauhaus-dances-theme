document.addEventListener('DOMContentLoaded', () => {
    // const videoElements = document.querySelectorAll('.video-homepage-media')

    /** Video collection */
    const videoItems = document.querySelectorAll('.video-homepage-item')
    const mediaItems = document.querySelectorAll('.video-homepage-media')

    if (!videoItems) return

    const helperPlayVideo = (mediaElement) => {
        const parentElement = mediaElement.parentElement
        const posterElement = parentElement.querySelector('.video-homepage-poster')
        posterElement.classList.add('hide')
        helperDimVideos(videoItems)
        parentElement.classList.remove('is-dimmed')
        mediaElement.classList.add('is-playing')
        mediaElement.play()
    }

    const helperPauseVideo = (mediaElement) => {
        const parentElement = mediaElement.parentElement
        const posterElement = parentElement.querySelector('.video-homepage-poster')
        posterElement.classList.remove('hide')
        helperUndimVideos(videoItems)
        mediaElement.classList.remove('is-playing')
        mediaElement.pause()
    }

    const helperDimVideos = (videoItems) => {
        videoItems.forEach(videoItem => {
            const mediaItem = videoItem.querySelector('.video-homepage-media')
            videoItem.classList.add('is-dimmed')
            mediaItem.pause()
        })
    }

    const helperUndimVideos = (videoItems) => {
        videoItems.forEach(video => {
            video.classList.remove('is-dimmed')
        })
    }

    const handleTogglePlayback = (e) => {
        const element = e.target
        let mediaItem
        if (element.classList.contains('video-homepage-poster')) {
            mediaItem = element.parentElement.querySelector('.video-homepage-media')
        } else if (element.classList.contains('video-homepage-media')) {
            mediaItem = element
        }

        /** Toggle playback */
        if (!mediaItem.classList.contains('is-playing')) {
            helperPlayVideo(mediaItem)
        } else {
            helperPauseVideo(mediaItem)
        }
    }

    const handleVideoEnded = (e) => {
        const video = e.target;
        const parentElement = video.parentElement;
        const poster = parentElement.querySelector('.video-homepage-poster');

        // Show the poster image when video is paused
        if (poster) poster.style.display = 'block';

        videoElements.forEach(video => {
            video.classList.remove('is-dimmed')
            video.classList.remove('is-playing')
        });
        // video.load()
    }

    const handleMouseover = (e) => {
        const element = e.target
        let mediaItem
        if (element.classList.contains('video-homepage-poster')) {
            mediaItem = element.parentElement.querySelector('.video-homepage-media')
        } else if (element.classList.contains('video-homepage-media')) {
            mediaItem = element
        }
        /** On mouseover, unconditionally remove 'is-dimmed' from the target video. */
        mediaItem.parentElement.classList.remove('is-dimmed')
        /** Add class to parent to toggle visibility of metadata element
        when hovering over the metadata itself. */
        mediaItem.parentElement.classList.add('is-hovered')
    }

    const handleMouseout = (e) => {
        const element = e.target
        const isPlaying = document.querySelectorAll('.is-playing')
        /** If a video is playing, dim current target if it's not the video playing */
        if (isPlaying.length) {
            console.log('something is playing')
        }
        // const siblings = [...video.parentElement.parentElement.children]
        //     .filter(el => el !== video.parentElement && el.querySelector('.video-homepage-media'))

        // // Check if any sibling video has the 'is-playing' class.
        // const hasPlayingSibling = siblings.some(sibling => sibling.querySelector('.video-homepage-media').classList.contains('is-playing'))

        // // If a sibling video is playing and the current video is not playing, dim this video.
        // if (hasPlayingSibling && !video.classList.contains('is-playing')) {
        //     video.classList.add('is-dimmed')
        // }
    }

    const handleItemMouseout = (e) => {
        const video = e.target
        video.parentElement.classList.remove('is-hovered')
    }

    videoItems.forEach(videoItem => {

        if ('ontouchstart' in window) {
            // Mobile device
            // posterElement.addEventListener('click', handleTogglePlayback)
            // videoItem.addEventListener('click', handleTogglePlayback)
        } else {
            // Non-mobile device
            videoItem.addEventListener('click', handleTogglePlayback)
            // video.addEventListener('ended', handleVideoEnded)
            videoItem.addEventListener('mouseover', handleMouseover)
            videoItem.addEventListener('mouseout', handleMouseout)
            /** Toggle visibility of metadata child when hovering
             * over the metadata itself
             */
            // parentElement.addEventListener('mouseout', handleItemMouseout)
        }
    })
})