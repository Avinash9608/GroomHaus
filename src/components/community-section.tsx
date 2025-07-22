
import Image from 'next/image';

export function CommunitySection() {
  return (
    <section id="community-section">
      <div className="community-container">
        <div className="community-items">
          <h2>join our community</h2>
          <div className="community-box">
            <Image
              src="https://plus.unsplash.com/premium_photo-1669741908175-eb029fbc350f?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Community member smiling"
              width={500}
              height={500}
              data-ai-hint="smiling person"
            />
          </div>
          <div className="community-box"></div>
          <div className="community-box">
            <Image
              src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=2041&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Community event outdoors"
              width={500}
              height={500}
              data-ai-hint="outdoor event"
            />
          </div>
          <div className="community-box">
            <span>Our community work tirelessly to make an impact</span>
          </div>
          <div className="community-box">
            <Image
              src="https://plus.unsplash.com/premium_photo-1682390303440-3972e3193494?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Community gathering"
              width={500}
              height={500}
              data-ai-hint="people gathering"
            />
          </div>
          <div className="community-box">
            <span>Get updates from our newsletter</span>
          </div>
          <div className="email-input-wrapper">
            <input
              type="text"
              placeholder="Enter your email"
              className="email-input"
              aria-label="Email for newsletter"
            />
            <div className="email-input-icon">
              <Image
                src="https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_share-256.png"
                alt="Submit email"
                width={25}
                height={25}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
