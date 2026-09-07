import React from 'react';
import { Link } from 'react-router-dom';
import AdBanner from '../components/AdBanner';
import heroImage from '../assets/hero-illustration.jpg';
import './Home.css';

export default function Home() {
  return (
    <main id="main-content">
      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero-text">
          <h1 id="hero-heading">
            Learn English the Fun Way — <span className="gradient-text">Zaban Land</span>
          </h1>
          <p>
            From your very first word to advanced fluency, Zaban Land guides kids and
            teens through vocabulary, idioms, and grammar with lessons and quizzes
            made just for them.
          </p>
          <div className="hero-actions">
            <Link to="/lessons" className="btn-primary">Start Learning</Link>
            <Link to="/register" className="btn-secondary">Create Free Account</Link>
          </div>
        </div>
        <div className="hero-image">
          <img
            src={heroImage}
            alt="Illustration of a smiling boy and girl studying English together with books and a laptop"
            width="480"
            height="480"
          />
        </div>
      </section>

      <section className="features" aria-labelledby="features-heading">
        <h2 id="features-heading">Everything you need to master English</h2>
        <ul className="features-grid">
          <li className="feature-card">
            <h3>Beginner to Advanced</h3>
            <p>Structured lessons across five levels, so every learner starts exactly where they belong.</p>
          </li>
          <li className="feature-card">
            <h3>Smart Review</h3>
            <p>Our spaced-repetition system, based on the Leitner method, shows you words right before you'd forget them.</p>
          </li>
          <li className="feature-card">
            <h3>Daily, Weekly &amp; Monthly Quizzes</h3>
            <p>Short, fun quizzes keep learning consistent without feeling like homework.</p>
          </li>
          <li className="feature-card">
            <h3>Safe for Kids &amp; Teens</h3>
            <p>A parent-friendly platform with age-appropriate content and privacy in mind.</p>
          </li>
        </ul>
      </section>

      <section className="pro-cta" aria-labelledby="pro-heading">
        <h2 id="pro-heading">Go further with Zaban Land Pro</h2>
        <p>Unlock every advanced lesson, remove ads, and get unlimited review sessions.</p>
        <Link to="/pricing" className="btn-primary">See Pro Plans</Link>
      </section>

      <AdBanner slot="home-bottom" />
    </main>
  );
}
