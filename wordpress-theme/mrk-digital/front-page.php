<?php get_header(); ?>
<main>
<section id="hero" class="mrk-hero">
 <div class="mrk-wrap mrk-hero-grid">
  <div>
   <span class="mrk-eyebrow">Web · Apps · WordPress · PLC · Arduino · Digital Services</span>
   <h1>Professional Digital Solutions That Help You Get Work Done.</h1>
   <p>MRK Digital helps Pakistani businesses, shops, students and individuals with websites, e-commerce, software, graphic design, digital services and practical automation projects.</p>
   <div class="mrk-urdu" dir="rtl" lang="ur">آپ کی ہر آن لائن اور ٹیکنیکل ضرورت، ایک ہی جگہ!</div>
   <div class="mrk-hero-buttons">
    <a class="mrk-btn mrk-btn-primary" href="#contact">Get a Project Quote →</a>
    <a class="mrk-btn mrk-btn-light" href="#services">View Services</a>
    <a class="mrk-btn mrk-btn-light" href="#projects">See Projects</a>
   </div>
   <p class="mrk-hero-note">Online service available across Pakistan · Local support around Mian Channu, Khanewal & Multan</p>
  </div>
  <div class="mrk-panel">
   <span class="mrk-badge">START HERE</span>
   <h2>Have a problem or project?</h2>
   <p>Send the requirement, reference or current issue. We will first clarify scope, feasibility and deliverables.</p>
   <ul><li>Business website & e-commerce</li><li>WordPress / Shopify / custom web apps</li><li>PLC, Arduino, ESP32 & automation</li><li>Graphic, office & digital services</li></ul>
  </div>
 </div>
</section>

<section id="services" class="mrk-section">
 <div class="mrk-wrap">
  <span class="mrk-kicker">Services</span><h2>Choose a service or request a custom solution.</h2>
  <p class="mrk-lead">Prices shown are starting points. Final scope and pricing are confirmed after requirements are reviewed.</p>
  <div class="mrk-toolbar"><input id="mrk-service-search" class="mrk-input mrk-search" type="search" placeholder="Search services or technology…"></div>
  <div id="mrk-services" class="mrk-cards">
   <?php $sq=new WP_Query(array('post_type'=>'mrk_service','posts_per_page'=>-1,'orderby'=>'title','order'=>'ASC')); if($sq->have_posts()): while($sq->have_posts()):$sq->the_post(); $area=get_post_meta(get_the_ID(),'mrk_area',true); $price=get_post_meta(get_the_ID(),'mrk_price',true); ?>
    <article class="mrk-card" data-search="<?php echo esc_attr(strtolower(get_the_title().' '.$area.' '.get_the_excerpt())); ?>">
      <span class="mrk-badge"><?php echo esc_html($area); ?></span><h3><?php the_title(); ?></h3><p><?php echo esc_html(mrk_digital_excerpt(get_the_excerpt(),24)); ?></p><?php if($price): ?><div class="mrk-price">Starting: <?php echo esc_html($price); ?></div><?php endif; ?>
    </article>
   <?php endwhile; wp_reset_postdata(); else: ?><p>No services added yet.</p><?php endif; ?>
  </div>
 </div>
</section>

<section id="projects" class="mrk-section alt">
 <div class="mrk-wrap"><span class="mrk-kicker">Projects & Portfolio</span><h2>Show what you can build — not just what you can say.</h2>
  <p class="mrk-lead">Selected concepts and technical work covering software, web development and automation.</p>
  <div class="mrk-project">
   <?php $pq=new WP_Query(array('post_type'=>'mrk_project','posts_per_page'=>-1,'orderby'=>'date','order'=>'DESC')); if($pq->have_posts()): while($pq->have_posts()):$pq->the_post(); $tech=get_post_meta(get_the_ID(),'mrk_technology',true); $status=get_post_meta(get_the_ID(),'mrk_status',true); ?>
    <article class="mrk-card"><span class="mrk-badge"><?php echo esc_html($status ?: 'PROJECT'); ?></span><h3><?php the_title(); ?></h3><p><?php echo esc_html(mrk_digital_excerpt(get_the_excerpt() ?: get_the_content(),30)); ?></p><?php if($tech): ?><p><b>Technology:</b> <?php echo esc_html($tech); ?></p><?php endif; ?></article>
   <?php endwhile; wp_reset_postdata(); else: ?><p>Projects will be added here.</p><?php endif; ?>
  </div>
 </div>
</section>

<section id="estimator" class="mrk-section">
 <div class="mrk-wrap">
  <span class="mrk-kicker">Quick Estimate</span><h2>Get a rough project estimate.</h2>
  <p class="mrk-lead">Select a service and scope. This is an indicative estimate, not a final quotation.</p>
  <div class="mrk-estimator">
   <label>Service<select id="mrk-est-service" class="mrk-select"><option value="website">Business Website</option><option value="wordpress">WordPress Website</option><option value="ecommerce">E-commerce Store</option><option value="webapp">Custom Web App</option><option value="automation">PLC / Arduino Automation</option><option value="design">Graphic / Digital Design</option></select></label>
   <label>Scope<select id="mrk-est-scope" class="mrk-select"><option value="basic">Basic</option><option value="standard">Standard</option><option value="advanced">Advanced</option></select></label>
   <div class="mrk-est-result"><span>Indicative range</span><strong id="mrk-est-output">PKR 25,000 – 35,000</strong><a class="mrk-btn mrk-btn-primary" href="#contact">Request Exact Quote →</a></div>
  </div>
 </div>
</section>

<section class="mrk-section alt">
 <div class="mrk-wrap"><span class="mrk-kicker">Why MRK Digital</span><h2>Clear scope. Practical delivery. Direct communication.</h2>
  <div class="mrk-cards">
   <article class="mrk-card"><span class="mrk-badge">01</span><h3>Requirement First</h3><p>We clarify the problem, target users, features and deliverables before development.</p></article>
   <article class="mrk-card"><span class="mrk-badge">02</span><h3>Useful Technology</h3><p>Technology is selected around the job — from WordPress and web apps to Arduino, ESP32 and PLC work.</p></article>
   <article class="mrk-card"><span class="mrk-badge">03</span><h3>Small Business Focus</h3><p>Solutions are designed for practical budgets, mobile users and real business workflows.</p></article>
  </div>
 </div>
</section>

<section id="guides" class="mrk-section">
 <div class="mrk-wrap"><span class="mrk-kicker">Guides & Blog</span><h2>Learn before you spend.</h2>
  <div class="mrk-cards">
   <?php $q=new WP_Query(array('post_type'=>'post','posts_per_page'=>3)); if($q->have_posts()): while($q->have_posts()):$q->the_post(); ?><article class="mrk-card"><span class="mrk-badge">GUIDE</span><h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3><p><?php echo esc_html(mrk_digital_excerpt(get_the_excerpt(),22)); ?></p><a class="mrk-price" href="<?php the_permalink(); ?>">Read article →</a></article><?php endwhile; wp_reset_postdata(); else: ?><p>New practical guides will appear here.</p><?php endif; ?>
  </div>
 </div>
</section>

<section id="about" class="mrk-section alt">
 <div class="mrk-wrap mrk-two">
  <div><span class="mrk-kicker">About</span><h2>Web development plus practical technical work.</h2><p class="mrk-lead">MRK Digital combines web development, WordPress, Shopify, software, graphic design, digital assistance and automation work for clients in Pakistan and remote projects.</p><div class="mrk-toolbar"><a class="mrk-btn mrk-btn-primary" href="#contact">Discuss Your Project</a></div></div>
  <div class="mrk-stat-grid"><div class="mrk-stat"><strong>Web</strong><span>WordPress, Shopify & apps</span></div><div class="mrk-stat"><strong>PLC</strong><span>Industrial automation</span></div><div class="mrk-stat"><strong>IoT</strong><span>Arduino / ESP32</span></div><div class="mrk-stat"><strong>Digital</strong><span>Design & online services</span></div></div>
 </div>
</section>

<section id="contact" class="mrk-section">
 <div class="mrk-wrap">
  <div class="mrk-contact"><span class="mrk-kicker" style="color:#28d5c6">Start a Project</span><h2>Tell us what you need.</h2><p>Share the service, problem, deadline and important features. The form prepares a WhatsApp message so you can continue the conversation directly.</p>
   <form class="mrk-form-grid" method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
    <input type="hidden" name="action" value="mrk_quote"><?php wp_nonce_field('mrk_quote','mrk_quote_nonce'); ?>
    <input class="mrk-input" name="name" required placeholder="Your name"><input class="mrk-input" name="phone" required placeholder="WhatsApp / phone">
    <input class="mrk-input full" name="service" placeholder="Service needed">
    <textarea class="mrk-textarea full" name="message" rows="5" placeholder="Describe your project, problem, required features or current link"></textarea>
    <button class="mrk-btn mrk-btn-primary" type="submit">Continue on WhatsApp →</button>
   </form>
  </div>
 </div>
</section>
</main>
<?php get_footer(); ?>