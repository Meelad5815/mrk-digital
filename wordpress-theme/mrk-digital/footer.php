<footer class="mrk-footer">
 <div class="mrk-wrap">
  <div class="mrk-footer-grid">
   <div><h3>MRK Digital</h3><p>Web development, digital services, PLC, Arduino, IoT and automation support for Pakistan and remote clients.</p></div>
   <div><h3>Services</h3><p><a href="#services">Web & WordPress</a><br><a href="#services">PLC & Automation</a><br><a href="#services">Arduino / ESP32 / IoT</a><br><a href="#services">IT Services</a></p></div>
   <div><h3>Contact</h3><p>WhatsApp: <a href="https://wa.me/<?php echo esc_attr(preg_replace("/\D+/","",get_theme_mod("mrk_whatsapp","+92 327 0447263"))); ?>"><?php echo esc_html(get_theme_mod("mrk_whatsapp","+92 327 0447263")); ?></a><br>Email: <a href="mailto:<?php echo antispambot(get_theme_mod("mrk_email","hafizmuhammadmeeladraza@gmail.com")); ?>"><?php echo esc_html(get_theme_mod("mrk_email","hafizmuhammadmeeladraza@gmail.com")); ?></a><br><?php echo esc_html(get_theme_mod("mrk_location","Pakistan · Remote Worldwide")); ?></p></div>
  </div>
  <div class="mrk-copy">© <?php echo esc_html(date('Y')); ?> MRK Digital. All rights reserved. · <a href="<?php echo esc_url(home_url('/privacy-policy/')); ?>">Privacy</a> · <a href="<?php echo esc_url(home_url('/contact/')); ?>">Contact</a></div>
 </div>
</footer>
<div class="mrk-float"><a class="mrk-btn" style="background:#25D366;color:#fff" href="https://wa.me/<?php echo esc_attr(preg_replace("/\D+/","",get_theme_mod("mrk_whatsapp","+92 327 0447263"))); ?>?text=Hello%20MRK%20Digital" target="_blank" rel="noopener">WhatsApp</a></div>
<?php wp_footer(); ?></body></html>