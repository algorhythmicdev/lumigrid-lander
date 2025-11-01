<script>
  const testimonials = [
    {
      quote: "The window finally looks alive, not noisy. We switch to 'evening halo' and sales go up.",
      author: "Retail Manager",
      company: "Fashion Boutique",
      rating: 5
    },
    {
      quote: "Setup took one visit. We reuse the same scenes across 3 shops.",
      author: "Franchise Owner",
      company: "Restaurant Chain",
      rating: 5
    },
    {
      quote: "LED Node transformed our storefront. The dynamic lighting draws customers in every time.",
      author: "Store Director",
      company: "Electronics Retailer",
      rating: 5
    }
  ];
</script>

<section class="section container reveal" id="testimonials">
  <div class="header-section">
    <h2 class="section-title">What clients say</h2>
    <p class="section-lead">Real feedback from businesses using LED Node for their signage.</p>
  </div>
  <div class="testimonials-grid">
    {#each testimonials as testimonial}
      <blockquote class="testimonial-card grad-frame" data-halo="2">
        <div class="quote-mark" aria-hidden="true">"</div>
        <p class="quote-text">{testimonial.quote}</p>
        <footer class="testimonial-footer">
          <div class="rating" aria-label="{testimonial.rating} out of 5 stars">
            {#each Array(testimonial.rating) as _}
              <span class="star">★</span>
            {/each}
          </div>
          <cite class="author-info">
            <span class="author-name">{testimonial.author}</span>
            <span class="author-company">{testimonial.company}</span>
          </cite>
        </footer>
      </blockquote>
    {/each}
  </div>
</section>

<style>
  .header-section {
    text-align: center;
    margin-bottom: clamp(2rem, 5vw, 3rem);
  }

  .section-title {
    font-size: var(--fs-h2);
    font-weight: 700;
    margin-bottom: 1rem;
    background: var(--primary-grad);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .section-lead {
    font-size: var(--fs-lead);
    color: var(--muted);
    max-width: 640px;
    margin: 0 auto;
    line-height: 1.6;
  }

  .testimonials-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
    gap: clamp(1.25rem, 3vw, 1.75rem);
  }

  .testimonial-card {
    padding: clamp(1.75rem, 4vw, 2.25rem);
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    position: relative;
    transition: transform var(--dur-med) var(--ease-out);
  }

  .testimonial-card:hover {
    transform: translateY(-6px);
  }

  .quote-mark {
    font-size: 4rem;
    line-height: 1;
    color: var(--mag);
    opacity: 0.3;
    position: absolute;
    top: 0.5rem;
    left: 0.75rem;
    font-family: Georgia, serif;
  }

  .quote-text {
    font-size: clamp(1rem, 2vw, 1.15rem);
    line-height: 1.7;
    color: var(--ink);
    margin: 0;
    position: relative;
    z-index: 1;
    font-style: italic;
  }

  .testimonial-footer {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .rating {
    display: flex;
    gap: 0.25rem;
  }

  .star {
    color: var(--amb);
    font-size: 1.1rem;
  }

  .author-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    font-style: normal;
  }

  .author-name {
    font-weight: 600;
    font-size: clamp(0.95rem, 1.8vw, 1.05rem);
    color: var(--ink);
  }

  .author-company {
    font-size: 0.9rem;
    color: var(--muted);
  }

  @media (min-width: 768px) {
    .testimonials-grid {
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
    }
  }
</style>
