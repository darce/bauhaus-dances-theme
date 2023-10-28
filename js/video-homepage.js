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
            element.currentTime = 1
        }

        else {
            undimVideos(videoElements)
        }
    }

    const handleVideoEnded = (e) => {
        videoElements.forEach(video => {
            video.classList.remove('is-dimmed')
            video.classList.remove('is-playing')
        });
        const video = e.target
        video.load()
    }

    const handleMouseover = (e) => {
        const video = e.target
        /** On mouseover, unconditionally remove 'is-dimmed' from the target video. */
        video.classList.remove('is-dimmed')
        /** Add class to parent to toggle visibility of metadata element
         * when hovering over the metadata itself.
         */
        video.parentElement.classList.add('is-hovered')
    }

    const handleMouseout = (e) => {
        const video = e.target
        const siblings = [...video.parentElement.parentElement.children].filter(el => el !== video.parentElement && el.querySelector('.video-homepage-media'))

        // Check if any sibling video has the 'is-playing' class.
        const hasPlayingSibling = siblings.some(sibling => sibling.querySelector('.video-homepage-media').classList.contains('is-playing'))

        // If a sibling video is playing and the current video is not playing, dim this video.
        if (hasPlayingSibling && !video.classList.contains('is-playing')) {
            video.classList.add('is-dimmed')
        }
    }

    const handleItemMouseout = (e) => {
        const video = e.target
        video.parentElement.classList.remove('is-hovered')
    }

    const dimVideos = (videoElements) => {
        videoElements.forEach(video => {
            video.classList.add('is-dimmed')
            video.classList.remove('is-playing')
            video.pause()
            // video.load()
        })
    }

    const undimVideos = (videoElements) => {
        videoElements.forEach(video => {
            video.classList.remove('is-dimmed')
            video.classList.remove('is-playing')
            video.pause()
            video.load()
        })
    }

    videoElements.forEach(video => {
        if ('ontouchstart' in window) {
            // Mobile device
            video.addEventListener('click', handleVideoStart)
        } else {
            // Non-mobile device
            video.addEventListener('click', handleVideoStart)
            video.addEventListener('ended', handleVideoEnded)
            video.addEventListener('mouseover', handleMouseover)
            video.addEventListener('mouseout', handleMouseout)
            /** Toggle visibility of metadata child when hovering
             * over the metadata itself
             */
            video.parentElement.addEventListener('mouseout', handleItemMouseout)
        }
    })
})