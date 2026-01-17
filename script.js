// Helper function to inject YouTube iframe
function injectYouTubeIframe(wrapper) {
	const id = wrapper.dataset.youtubeId && wrapper.dataset.youtubeId.trim();
	if (!id) {
		alert('Vidéo non configurée. Contactez le propriétaire pour le lien.');
		return;
	}
	const iframe = document.createElement('iframe');
	const origin = encodeURIComponent(window.location.origin);
	iframe.src = `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&origin=${origin}`;
	iframe.width = '100%';
	iframe.height = '100%';
	iframe.allow = 'autoplay; fullscreen; picture-in-picture';
	iframe.setAttribute('allowfullscreen', '');
	iframe.title = 'Lecture vidéo';
	wrapper.innerHTML = '';
	wrapper.appendChild(iframe);
}

// Helper function to inject local video player
function injectLocalVideo(wrapper) {
	const videoSrc = wrapper.dataset.videoSrc;
	if (!videoSrc) {
		alert('Vidéo non configurée.');
		return;
	}
	const video = document.createElement('video');
	video.style.width = '100%';
	video.style.height = '100%';
	video.style.display = 'block';
	video.controls = true;
	video.preload = 'metadata';
	const source = document.createElement('source');
	source.src = videoSrc;
	source.type = 'video/mp4';
	video.appendChild(source);
	wrapper.innerHTML = '';
	wrapper.appendChild(video);
	console.log('Local video injected:', videoSrc);
}

// Animation simple au chargement
document.addEventListener("DOMContentLoaded", () => {
		document.body.style.opacity = 0;
		setTimeout(() => {
				document.body.style.transition = "opacity 1s";
				document.body.style.opacity = 1;
		}, 100);

		// Auto-load hero showreel (first .yt-wrapper)
		const heroShowreel = document.querySelector('.video-container .yt-wrapper');
		if (heroShowreel) {
			injectYouTubeIframe(heroShowreel);
		}

		// Initialize YouTube click-to-load for project videos
		document.querySelectorAll('.project .yt-wrapper').forEach(wrapper => {
			wrapper.addEventListener('click', function onClick(e) {
				injectYouTubeIframe(wrapper);
				wrapper.removeEventListener('click', onClick);
			}, { once: true });
		});

		// Initialize local video click-to-load for project 3
		document.querySelectorAll('.local-video-wrapper').forEach(wrapper => {
			const button = wrapper.querySelector('.video-poster');
			if (button) {
				button.addEventListener('click', function onClick(e) {
					e.preventDefault();
					injectLocalVideo(wrapper);
					button.removeEventListener('click', onClick);
				});
			}
		});
});

