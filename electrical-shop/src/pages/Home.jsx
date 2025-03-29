import './Home.css';

function Home() {
  return (
    <div className="home">
      <h1 className="home-title">Welcome to SR Electricals</h1>
      <p className="home-description">
        Your trusted source for premium electrical products. Explore our wide range of items, from wiring to appliances!
      </p>
      <div className="home-image-container">
        <img
          src="https://via.placeholder.com/800x400?text=Electrical+Shop"
          alt="Electrical Shop Banner"
          className="home-image"
        />
      </div>
    </div>
  );
}

export default Home;