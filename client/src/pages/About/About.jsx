import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import './about.css'

function About() {
  return (
    <>
    <Navbar/>

    <section id="what_is_blockchain">
        <img src="https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2016/05/quick-share-files.jpg" alt="Image 1"/>
            <div className="section-content">
                <h2>Overview</h2>
                <p>Welcome to our secure file sharing platform. At our core, we provide a safe and efficient solution tailored for both individuals and businesses seeking to share files securely. Our platform serves as a fortress for your data, ensuring utmost protection throughout every interaction. Whether you're collaborating with colleagues on critical projects or sharing sensitive documents with clients, rest assured that our robust security measures are in place to safeguard your information.

What sets us apart is our unwavering commitment to security and efficiency. With our platform, you can seamlessly exchange files without compromising on safety. We understand the importance of maintaining confidentiality in today's digital landscape, which is why we've implemented stringent security protocols to protect your data from unauthorized access or breaches.</p>
                  </div>
        </section>
        
        <section id="how_it_works">
        <div className="section-content">
            <h2>What We Do</h2>
            <p>Our platform offers advanced features for secure file sharing, including end-to-end encryption, user authentication, access control, and secure collaboration tools. We prioritize the security and privacy of your data, providing you with peace of mind when sharing files online.</p>
            <p>Our user-friendly interface streamlines the file-sharing process, allowing you to focus on what matters most – your work. Whether you're a small business owner, a freelancer, or part of a large enterprise, our platform caters to your needs with simplicity and ease of use.</p>        
        </div>
        <img src="https://th.bing.com/th/id/R.e00cae0139a943dc068a6daffdba49de?rik=0OUkq4LxPQ8raQ&riu=http%3a%2f%2fwww.cloudwards.net%2fwp-content%2fuploads%2f2015%2f05%2fSharing-files-Digitally.jpg&ehk=QtudiNGyLdEllxp3Y74uD71NHZGicczRdfTsFMpNI6g%3d&risl=&pid=ImgRaw&r=0" alt="Image 2"/>
           
        </section>
        
        <section id="applications">
        <img src="https://www.myhubintranet.com/wp-content/uploads/2017/04/online-file-sharing.jpg" alt="Image 3"/>
        <div className="section-content">
            <h2>Why Choose Us</h2>
            <p>There are several reasons to choose our secure file sharing platform:</p>
            <ul>
                <li>Robust security measures to protect your data</li>
                <li>User-friendly interface for seamless file sharing</li>
                <li>Customizable access control settings for enhanced security</li>
                <li>24/7 customer support to assist you whenever you need help</li>
            </ul>
            <p>With our platform, you can securely share files with confidence, knowing that your data is in safe hands.</p>
        </div>
           
        </section>
        
        <section id="future">
        <div className="section-content">
            <h2>Testimonials</h2>
            <div className="testimonial">
                <p>"I've been using this platform for sharing confidential documents with my clients, and I'm impressed with the level of security it provides. Highly recommended!"</p>
                <p>- John Doe, CEO of XYZ Company</p>
            </div>
            <div className="testimonial">
                <p>"As a freelancer, I need to collaborate with clients on various projects. This platform has made it easy for me to share files securely and efficiently. It's a game-changer!"</p>
                <p>- Jane Smith, Freelancer</p>
            </div>
        </div>
        <img src="https://d57439wlqx3vo.cloudfront.net/iblock/de4/de4c4de83c86f63c97ae4a449d7f5eec/b2f9de4dca8c8400c74e6cbdeeecd75c.png" alt="Image 4"/>
            
        </section>

    <Footer/>
    </>
  )
}

export default About