import image1 from '../assets/image1.jpeg';
import image2 from '../assets/image2.jpeg';
import image3 from '../assets/image3.jpeg';
import image4 from '../assets/image4.jpeg';
import image5 from '../assets/image5.jpeg';
import image6 from '../assets/image6.jpeg';
import image7 from '../assets/image7.jpeg';
import './PageLayout.css';

const GALLERY_IMAGES = [
  { src: image1, alt: 'TEG Program' },
  { src: image2, alt: 'Prayer gathering' },
  { src: image3, alt: 'Community support' },
  { src: image4, alt: 'TEG Event' },
  { src: image5, alt: 'Ministry program' },
  { src: image6, alt: 'Women\'s gathering' },
  { src: image7, alt: 'TEG activity' },
];

function GalleryPage() {
  return (
    <div className="teg-page">
      <section className="teg-page-hero">
        <h1>Gallery</h1>
        <p>Photo galleries of past programs and events</p>
      </section>
      <section className="teg-page-content">
        <div className="teg-content-inner">
          <div className="teg-gallery-grid">
            {GALLERY_IMAGES.map((img, index) => (
              <div key={index} className="teg-gallery-item">
                <img src={img.src} alt={img.alt} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default GalleryPage;
