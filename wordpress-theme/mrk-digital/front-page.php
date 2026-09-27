<?php get_header(); ?>
<main>
<section id="hero" class="mrk-hero">
 <div class="mrk-wrap mrk-hero-grid">
  <div>
   <span class="mrk-eyebrow">Web Development · Digital Services · Automation</span>
   <h1>Professional Web, Digital & Automation Solutions</h1>
   <p>MRK Digital & Online Services Center helps businesses and technical projects move forward with practical web development, digital services, PLC, Arduino and automation support.</p>
   <div class="mrk-urdu" dir="rtl" lang="ur">آپ کی ہر آن لائن اور ٹیکنیکل ضرورت، ایک ہی جگہ!</div>
   <div class="mrk-hero-buttons">
    <a class="mrk-btn mrk-btn-primary" href="#contact">Get a Free Quote →</a>
    <a class="mrk-btn mrk-btn-light" href="#services">View Services</a>
    <a class="mrk-btn mrk-btn-light" href="#projects">View Projects</a>
   </div>
  </div>
  <div class="mrk-panel">
   <span class="mrk-badge">QUICK START</span>
   <h2>Tell us what you need to solve.</h2>
   <ul><li><b>Business websites & e-commerce</b> built for mobile users and conversion.</li><li><b>PLC, Arduino and sensor automation</b> for practical technical projects.</li><li><b>Digital services & IT troubleshooting</b> for offices and individuals.</li><li><b>Clear scope first:</b> feasibility and deliverables are discussed before commitments.</li></ul>
  </div>
 </div>
</section>

<section id="services" class="mrk-section">
 <div class="mrk-wrap">
  <span class="mrk-kicker">Core Services Catalogue</span><h2>Useful technical support, built around the job.</h2>
  <p class="mrk-lead">Service availability and final pricing are confirmed after understanding the actual scope.</p>
  <div class="mrk-toolbar"><input id="mrk-service-search" class="mrk-input mrk-search" type="search" placeholder="Search services or technology…"></div>
  <div id="mrk-services" class="mrk-cards">
   <?php $sq=new WP_Query(array('post_type'=>'mrk_service','posts_per_page'=>-1,'orderby'=>'title','order'=>'ASC')); if($sq->have_posts()): while($sq->have_posts()):$sq->the_post(); $area=get_post_meta(get_the_ID(),'mrk_area',true); $price=get_post_meta(get_the_ID(),'mrk_price',true); ?>
    <article class="mrk-card" data-search="<?php echo esc_attr(strtolower(get_the_title().' '.$area.' '.get_the_excerpt())); ?>">
      <span class="mrk-badge"><?php echo esc_html($area); ?></span><h3><?php the_title(); ?></h3><p><?php echo esc_html(mrk_digital_excerpt(get_the_excerpt(),24)); ?></p><?php if($price): ?><div class="mrk-price">Starting: <?php echo esc_html($price); ?></div><?php endif; ?>
    </article>
   <?php endwhile; wp_reset_postdata(); else: ?><p>No services added yet.</p><?php endif; ?>
  </div> </div>
</section>

<section id="projects" class="mrk-section alt">
 <div class="mrk-wrap"><span class="mrk-kicker">Selected Work</span><h2>Practical projects across software and automation.</h2>
  <div class="mrk-project">
   <?php $pq=new WP_Query(array('post_type'=>'mrk_project','posts_per_page'=>-1,'orderby'=>'date','order'=>'DESC')); if($pq->have_posts()): while($pq->have_posts()):$pq->the_post(); $tech=get_post_meta(get_the_ID(),'mrk_technology',true); $status=get_post_meta(get_the_ID(),'mrk_status',true); ?>
    <article class="mrk-card"><span class="mrk-badge"><?php echo esc_html($status ?: 'PROJECT'); ?></span><h3><?php the_title(); ?></h3><p><?php echo esc_html(mrk_digital_excerpt(get_the_excerpt() ?: get_the_content(),30)); ?></p><?php if($tech): ?><p><b>Technology:</b> <?php echo esc_html($tech); ?></p><?php endif; ?></article>
   <?php endwhile; wp_reset_postdata(); else: ?><p>No projects added yet.</p><?php endif; ?>
  </div> </div>
</section>

<section id="estimator" class="mrk-section">
 <div class="mrk-wrap mrk-two">
  <div><span class="mrk-kicker">Simple Process</span><h2>From idea to deliverable.</h2><p class="mrk-lead">A practical workflow keeps technical projects clear and reduces surprises.</p></div>
  <div class="mrk-steps"><div class="mrk-step"><b>1</b><strong>Discuss</strong><p>Understand the problem and target.</p></div><div class="mrk-step"><b>2</b><strong>Scope</strong><p>Confirm features, feasibility and deliverables.</p></div><div class="mrk-step"><b>3</b><strong>Build</strong><p>Develop, test and document the solution.</p></div><div class="mrk-step"><b>4</b><strong>Deliver</strong><p>Handover, support and next steps.</p></div></div>
 </div>
</section>

<section id="guides" class="mrk-section alt">
 <div class="mrk-wrap"><span class="mrk-kicker">Guides & Blog</span><h2>Technical knowledge for practical decisions.</h2>
  <div class="mrk-cards">
   <?php $q=new WP_Query(array('post_type'=>'post','posts_per_page'=>3)); if($q->have_posts()): while($q->have_posts()):$q->the_post(); ?><article class="mrk-card"><span class="mrk-badge">GUIDE</span><h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3><p><?php echo esc_html(mrk_digital_excerpt(get_the_excerpt(),22)); ?></p><a class="mrk-price" href="<?php the_permalink(); ?>">Read article →</a></article><?php endwhile; wp_reset_postdata(); else: ?><article class="mrk-card"><span class="mrk-badge">COMING NEXT</span><h3>PLC vs Arduino: which one fits?</h3><p>We can publish guides here as normal WordPress posts without changing the theme code.</p></article><?php endif; ?>
  </div>
 </div>
</section>

<section id="about" class="mrk-section">
 <div class="mrk-wrap mrk-two"><div><span class="mrk-kicker">About MRK Digital</span><h2>One place for web, digital and technical work.</h2><p class="mrk-lead">MRK Digital combines website development, WordPress, Shopify, software, office/digital services and practical automation work for individuals, businesses and technical projects.</p></div>
 <div class="mrk-stat-grid"><div class="mrk-stat"><strong>39</strong><span>Service areas</span></div><div class="mrk-stat"><strong>Web</strong><span>WordPress & apps</span></div><div class="mrk-stat"><strong>PLC</strong><span>Automation</span></div><div class="mrk-stat"><strong>IoT</strong><span>Arduino / ESP32</span></div></div></div>
</section>

<section id="contact" class="mrk-section alt">
 <div class="mrk-wrap">
  <div class="mrk-contact"><span class="mrk-kicker" style="color:#28d5c6">Start a Project</span><h2>Tell us what you want to build.</h2><p>Submit the basic details and continue the conversation on WhatsApp.</p>
   <form class="mrk-form-grid" method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
    <input type="hidden" name="action" value="mrk_quote"><?php wp_nonce_field('mrk_quote','mrk_quote_nonce'); ?>
    <input class="mrk-input" name="name" required placeholder="Your name"><input class="mrk-input" name="phone" required placeholder="WhatsApp / phone">
    <input class="mrk-input full" name="service" placeholder="Service needed">
    <textarea class="mrk-textarea full" name="message" rows="5" placeholder="Describe your project, problem or required service"></textarea>
    <button class="mrk-btn mrk-btn-primary" type="submit">Continue on WhatsApp →</button>
   </form>
  </div>
 </div>
</section>
</main>
<?php get_footer(); ?>