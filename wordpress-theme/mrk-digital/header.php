<?php if(!defined('ABSPATH')) exit; ?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo('charset'); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<header class="mrk-header">
  <div class="mrk-wrap mrk-nav">
    <a class="mrk-brand" href="<?php echo esc_url(home_url('/')); ?>">
      <span class="mrk-logo">M</span>
      <span><strong>MRK Digital <i style="color:#28d5c6">●</i></strong><small>Online Services Center</small></span>
    </a>
    <?php if(has_nav_menu('primary')) wp_nav_menu(array('theme_location'=>'primary','container'=>false,'menu_class'=>'mrk-menu')); else mrk_digital_menu_fallback(); ?>
    <div class="mrk-actions">
      <a class="mrk-btn mrk-btn-light" href="https://wa.me/923270447263?text=Hello%20MRK%20Digital,%20I%20need%20technical%20help." target="_blank" rel="noopener">WhatsApp</a>
      <a class="mrk-btn mrk-btn-primary" href="#contact">Free Quote</a>
    </div>
    <div class="mrk-mobile">
      <a class="mrk-btn mrk-btn-primary" href="#contact">Quote</a>
      <button class="mrk-btn mrk-btn-light" type="button" id="mrk-menu-toggle" aria-label="Open menu">☰</button>
    </div>
  </div>
</header>