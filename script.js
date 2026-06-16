const photos = [
    "cubeecraft.jpg", "whats in my head.png", "DSC_0002.JPG", "DSC_0040.JPG", "DSC_0039.JPG", "DSC_0038.JPG", 
    "DSC_0037.JPG", "DSC_0036.JPG", "DSC_0035.JPG", "DSC_0034.JPG", "DSC_0033.JPG", 
    "DSC_0032.JPG", "DSC_0031.JPG", "DSC_0030.JPG", "DSC_0029.JPG", "DSC_0027.JPG", 
    "DSC_0028.JPG", "DSC_0026.JPG", "DSC_0025.JPG", "DSC_0024.JPG", "DSC_0023.JPG", 
    "DSC_0022.JPG", "DSC_0021.JPG", "DSC_0020.JPG", "DSC_0019.JPG", "DSC_0018.JPG", 
    "DSC_0017 (2).JPG", "DSC_0017.JPG", "DSC_0016 (2).JPG", "DSC_0016.JPG", "DSC_0015 (2).JPG", 
    "DSC_0014 (2).JPG", "DSC_0013 (2).JPG", "DSC_0012.JPG", "DSC_0011.JPG", "DSC_0010.JPG", 
    "DSC_0009.JPG", "DSC_0008.JPG", "DSC_0007.JPG", "DSC_0006.JPG", "DSC_0005.JPG", 
    "DSC_0001.JPG", "DSC_0137.JPG", "DSC_0135.JPG", "DSC_0134.JPG", "DSC_0131.JPG", 
    "DSC_0130.JPG", "DSC_0129.JPG", "DSC_0126.JPG", "DSC_0125.JPG", "DSC_0124.JPG", 
    "DSC_0123.JPG", "DSC_0122.JPG", "DSC_0121.JPG", "DSC_0093.JPG", "DSC_0092.JPG", 
    "DSC_0090.JPG", "DSC_0089.JPG", "DSC_0087.JPG", "DSC_0086.JPG", "DSC_0083.JPG", 
    "DSC_0081.JPG", "DSC_0080.JPG", "DSC_0079.JPG", "DSC_0078.JPG", "DSC_0077.JPG", 
    "DSC_0074.JPG", "DSC_0073.JPG", "DSC_0072.JPG", "DSC_0066.JPG", "DSC_0065.JPG", 
    "DSC_0064.JPG", "DSC_0063.JPG", "DSC_0015.JPG", "DSC_0014.JPG", "DSC_0013.JPG", 
    "DSC_0004.JPG", "DSC_0003.JPG"
];

const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-btn');

function initGallery() {
    // Add images to gallery
    photos.forEach((photo, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        
        // Initial state for animation
        item.style.opacity = '0';
        item.style.animation = `fadeIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards ${index * 0.03}s`;
        
        // Using lazy loading for better performance
        const img = document.createElement('img');
        img.src = photo;
        img.alt = `Photo ${photo}`;
        img.loading = 'lazy';
        
        item.appendChild(img);
        gallery.appendChild(item);

        // Lightbox event
        item.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // prevent scrolling
        });
    });
}

// Close lightbox
closeBtn.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
        closeLightbox();
    }
});

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto'; // allow scrolling again
    
    // Wait for transition before removing src
    setTimeout(() => {
        lightboxImg.src = '';
    }, 400); // Wait 0.4s to match CSS transition
}

// Keyboard nav
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});

// Create style for dynamic animation
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(30px) scale(0.98); }
        to { opacity: 1; transform: translateY(0) scale(1); }
    }
`;
document.head.appendChild(styleSheet);

// Initialize synchronously since script is at end of body
initGallery();
