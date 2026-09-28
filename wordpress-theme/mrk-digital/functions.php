<?php
if (!defined('ABSPATH')) exit;

require_once get_template_directory() . '/inc/content.php';

function mrk_digital_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo');
    add_theme_support('html5', array('search-form','comment-form','comment-list','gallery','caption','style','script'));
    register_nav_menus(array('primary'=>'Primary Menu'));
}
add_action('after_setup_theme','mrk_digital_setup');

function mrk_digital_assets() {
    wp_enqueue_style('mrk-digital-style', get_stylesheet_uri(), array(), '1.0.0');
    wp_enqueue_script('mrk-digital-theme', get_theme_file_uri('assets/js/theme.js'), array(), '1.0.0', true);
}
add_action('wp_enqueue_scripts','mrk_digital_assets');

function mrk_digital_menu_fallback() {
    $items = array(
        'services'=>'Services','projects'=>'Projects','estimator'=>'Estimator',
        'guides'=>'Guides','about'=>'About','contact'=>'Contact'
    );
    echo '<nav class="mrk-menu" id="mrk-menu">';
    foreach($items as $id=>$label) echo '<a href="#'.esc_attr($id).'">'.esc_html($label).'</a>';
    echo '</nav>';
}

function mrk_digital_services() {
    return array(
      array('Website Development','Web Development','Custom, high-performance responsive business websites.','PKR 25,000'),
      array('WordPress Development','Web Development','Custom WordPress themes and easy-to-manage content workflows.','PKR 30,000'),
      array('Shopify Development','Web Development','Conversion-ready Shopify stores and catalog setup.','PKR 35,000'),
      array('E-commerce Development','Web Development','Custom online stores and WooCommerce solutions.','PKR 45,000'),
      array('Web Application Development','Web Development','Client portals, dashboards and workflow automation.','PKR 55,000'),
      array('Python / Django Development','Web Development','Backend systems, REST APIs and admin dashboards.','PKR 50,000'),
      array('Business Website Development','Web Development','Professional company websites and lead-generation pages.','PKR 35,000'),
      array('App Development','App & Software','Responsive applications and cross-platform digital tools.','PKR 60,000'),
      array('Custom Software','App & Software','Software tailored to unique business processes.','PKR 65,000'),
      array('Database Applications','App & Software','Database design, migration, optimization and reporting.','PKR 50,000'),
      array('Graphic Design','Digital Services','Brand identity, marketing collateral and commercial vectors.','PKR 15,000'),
      array('Canva Design','Digital Services','Editable Canva templates and promotional assets.','PKR 10,000'),
      array('CV / Resume Design','Digital Services','Professional, structured and ATS-friendly resumes.','PKR 5,000'),
      array('PDF / Word / Excel Services','Digital Services','Spreadsheets, Word documentation and PDF cleanup.','PKR 8,000'),
      array('Online Forms','Digital Services','Registration, survey and customer onboarding forms.','PKR 8,000'),
      array('Digital Documentation','Digital Services','Technical manuals, SOPs and business documentation.','PKR 15,000'),
      array('Computer Services','Digital Services','Online portal, data conversion and IT assistance.','PKR 5,000'),
      array('PLC Programming','PLC & Automation','Ladder Logic/FBD programming for industrial PLCs.','PKR 50,000'),
      array('PLC Troubleshooting','PLC & Automation','Fault finding, signals, communication and debugging.','PKR 25,000'),
      array('Industrial Automation','PLC & Automation','Automation architecture for manufacturing systems.','PKR 85,000'),
      array('Motor Automation','PLC & Automation','VFD, soft starter, star-delta and servo control.','PKR 35,000'),
      array('Control Systems','PLC & Automation','PID control for temperature, pressure, flow and level.','PKR 45,000'),
      array('Sensor Systems','PLC & Automation','Industrial proximity, optical, ultrasonic and level sensing.','PKR 30,000'),
      array('Control Panels','PLC & Automation','Electrical control-panel design and wiring organization.','PKR 60,000'),
      array('Arduino Projects','Arduino / ESP32 / IoT','Microcontroller programming and sensor integration.','PKR 15,000'),
      array('ESP32 Projects','Arduino / ESP32 / IoT','Wi-Fi/Bluetooth smart hardware projects.','PKR 25,000'),
      array('IoT Projects','Arduino / ESP32 / IoT','MQTT telemetry, dashboards and remote monitoring.','PKR 35,000'),
      array('Sensor Automation','Arduino / ESP32 / IoT','Automation using temperature, ultrasonic, PIR and light sensors.','PKR 20,000'),
      array('Smart Automation','Arduino / ESP32 / IoT','Smart home/building automation and mobile control.','PKR 30,000'),
      array('Automatic Water Tank Controller','Arduino / ESP32 / IoT','Water-level automation with dry-run and motor protection.','PKR 18,000'),
      array('Custom Electronics Projects','Arduino / ESP32 / IoT','PCB design, prototyping and custom electronics.','PKR 25,000'),
      array('Windows / PC Support','IT Services','Windows installation, malware removal and optimization.','PKR 3,000'),
      array('Software Installation','IT Services','Software deployment, configuration and licensing guidance.','PKR 2,500'),
      array('Technical Troubleshooting','IT Services','Diagnosis of crashes, BSOD and peripheral failures.','PKR 4,000'),
      array('Basic Networking','IT Services','LAN, Wi-Fi, printer sharing and network storage.','PKR 8,000'),
      array('Software Solutions','IT Services','Workflow integration, backup routines and digital tools.','PKR 15,000')
    );
}

function mrk_digital_send_quote() {
    if (!isset($_POST['mrk_quote_nonce']) || !wp_verify_nonce($_POST['mrk_quote_nonce'],'mrk_quote')) return;
    $name=sanitize_text_field($_POST['name'] ?? '');
    $phone=sanitize_text_field($_POST['phone'] ?? '');
    $service=sanitize_text_field($_POST['service'] ?? '');
    $message=sanitize_textarea_field($_POST['message'] ?? '');
    $text="Hello MRK Digital, I would like a quote.%0AName: ".rawurlencode($name)."%0APhone: ".rawurlencode($phone)."%0AService: ".rawurlencode($service)."%0AProject: ".rawurlencode($message);
    wp_safe_redirect('https://wa.me/923270447263?text='.$text); exit;
}
add_action('admin_post_nopriv_mrk_quote','mrk_digital_send_quote');
add_action('admin_post_mrk_quote','mrk_digital_send_quote');

function mrk_digital_excerpt($text,$words=24){
    return wp_trim_words(wp_strip_all_tags($text),$words,'…');
}

function mrk_digital_customize_register($wp_customize) {
 $wp_customize->add_section('mrk_contact',array('title'=>'MRK Digital Contact','priority'=>30));
 foreach(array('whatsapp'=>'WhatsApp Number','email'=>'Business Email','location'=>'Business Location') as $key=>$label){
   $wp_customize->add_setting('mrk_'.$key,array('default'=> $key==='whatsapp' ? '+92 327 0447263' : ($key==='email' ? 'hafizmuhammadmeeladraza@gmail.com' : 'Pakistan · Remote Worldwide'),'sanitize_callback'=>'sanitize_text_field'));
   $wp_customize->add_control('mrk_'.$key,array('label'=>$label,'section'=>'mrk_contact','type'=>'text'));
 }
}
add_action('customize_register','mrk_digital_customize_register');


function mrk_digital_schema() {
    if (is_admin()) return;
    $phone = get_theme_mod('mrk_whatsapp', '+92 327 0447263');
    $email = get_theme_mod('mrk_email', 'hafizmuhammadmeeladraza@gmail.com');
    $schema = array(
        '@context' => 'https://schema.org',
        '@type' => 'ProfessionalService',
        'name' => 'MRK Digital Center',
        'url' => home_url('/'),
        'email' => $email,
        'telephone' => $phone,
        'description' => 'Web development, WordPress, Shopify, app development, graphic design, digital services, PLC, Arduino, ESP32 and automation solutions.',
        'areaServed' => array('Pakistan', 'Mian Channu', 'Khanewal', 'Multan'),
        'serviceType' => array(
            'Web Development',
            'WordPress Development',
            'Shopify Development',
            'App Development',
            'Graphic Design',
            'Digital Services',
            'PLC Programming',
            'Arduino and ESP32 Projects',
            'Industrial Automation'
        )
    );
    echo '<script type="application/ld+json">' . wp_json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . '</script>';
}
add_action('wp_head', 'mrk_digital_schema', 20);
