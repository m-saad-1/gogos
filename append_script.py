
    // --- Lazy Load Videos ---
    const lazyVideos = document.querySelectorAll('video');
    if ('IntersectionObserver' in window) {
        const videoObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const video = entry.target;
                    const source = video.querySelector('source[data-src]');
                    if (source) {
                        source.src = source.dataset.src;
                        video.load();
                        // Only play if it was successfully loaded and muted
                        video.play().catch(e => console.log('Autoplay prevented', e));
                        // Remove data-src to prevent reloading
                        source.removeAttribute('data-src');
                    }
                    observer.unobserve(video);
                }
            });
        }, { rootMargin: "0px 0px 200px 0px" });

        lazyVideos.forEach(video => {
            if(video.querySelector('source[data-src]')) {
                videoObserver.observe(video);
            }
        });
    }
});
