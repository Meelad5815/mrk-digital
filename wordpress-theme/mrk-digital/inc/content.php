<?php
if (!defined('ABSPATH')) exit;

function mrk_register_content_types() {
  register_post_type('mrk_service',array(
    'labels'=>array('name'=>'MRK Services','singular_name'=>'MRK Service','add_new_item'=>'Add Service','edit_item'=>'Edit Service'),
    'public'=>true,'show_in_rest'=>true,'menu_icon'=>'dashicons-admin-tools',
    'supports'=>array('title','editor','excerpt','thumbnail'),
    'rewrite'=>array('slug'=>'services')
  ));
  register_post_type('mrk_project',array(
    'labels'=>array('name'=>'MRK Projects','singular_name'=>'MRK Project','add_new_item'=>'Add Project','edit_item'=>'Edit Project'),
    'public'=>true,'show_in_rest'=>true,'menu_icon'=>'dashicons-hammer',
    'supports'=>array('title','editor','excerpt','thumbnail'),
    'rewrite'=>array('slug'=>'projects')
  ));
}
add_action('init','mrk_register_content_types');

function mrk_content_meta_boxes(){
 add_meta_box('mrk_service_details','Service Details','mrk_service_box','mrk_service','normal','high');
 add_meta_box('mrk_project_details','Project Details','mrk_project_box','mrk_project','normal','high');
}
add_action('add_meta_boxes','mrk_content_meta_boxes');

function mrk_service_box($post){
 wp_nonce_field('mrk_service_save','mrk_service_nonce');
 $area=get_post_meta($post->ID,'mrk_area',true); $price=get_post_meta($post->ID,'mrk_price',true);
 echo '<p><label>Category</label><input class="widefat" name="mrk_area" value="'.esc_attr($area).'" placeholder="Web Development"></p>';
 echo '<p><label>Starting Price</label><input class="widefat" name="mrk_price" value="'.esc_attr($price).'" placeholder="PKR 25,000"></p>';
}
function mrk_project_box($post){
 wp_nonce_field('mrk_project_save','mrk_project_nonce');
 $tech=get_post_meta($post->ID,'mrk_technology',true); $status=get_post_meta($post->ID,'mrk_status',true);
 echo '<p><label>Technology / Stack</label><input class="widefat" name="mrk_technology" value="'.esc_attr($tech).'" placeholder="Arduino · ESP32 · Sensors"></p>';
 echo '<p><label>Status</label><input class="widefat" name="mrk_status" value="'.esc_attr($status).'" placeholder="Completed / Demo / In Progress"></p>';
}
function mrk_save_meta($post_id){
 if(isset($_POST['mrk_service_nonce']) && wp_verify_nonce($_POST['mrk_service_nonce'],'mrk_service_save') && current_user_can('edit_post',$post_id)){
   update_post_meta($post_id,'mrk_area',sanitize_text_field($_POST['mrk_area']??''));
   update_post_meta($post_id,'mrk_price',sanitize_text_field($_POST['mrk_price']??''));
 }
 if(isset($_POST['mrk_project_nonce']) && wp_verify_nonce($_POST['mrk_project_nonce'],'mrk_project_save') && current_user_can('edit_post',$post_id)){
   update_post_meta($post_id,'mrk_technology',sanitize_text_field($_POST['mrk_technology']??''));
   update_post_meta($post_id,'mrk_status',sanitize_text_field($_POST['mrk_status']??''));
 }
}
add_action('save_post','mrk_save_meta');

function mrk_seed_default_content(){
 if(get_option('mrk_content_seeded')) return;
 $services=function_exists('mrk_digital_services')?mrk_digital_services():array();
 foreach($services as $s){
   $id=wp_insert_post(array('post_type'=>'mrk_service','post_title'=>$s[0],'post_excerpt'=>$s[2],'post_content'=>$s[2],'post_status'=>'publish'));
   if($id && !is_wp_error($id)){update_post_meta($id,'mrk_area',$s[1]);update_post_meta($id,'mrk_price',$s[3]);}
 }
 $projects=array(
  array('Automatic Water Tank Controller','Arduino · ESP32 · Relay · Water Sensors','Demo'),
  array('Industrial Conveyor & Multi-Motor PLC Control','Siemens S7-1200 · VFD · HMI · Ladder Logic','Concept / Portfolio'),
  array('ESP32 Environmental Monitoring','ESP32 · Sensors · MQTT · Dashboard','Concept / Portfolio'),
  array('E-commerce & Digital Inventory Platform','WordPress · WooCommerce · Web','Portfolio')
 );
 foreach($projects as $p){$id=wp_insert_post(array('post_type'=>'mrk_project','post_title'=>$p[0],'post_content'=>'Practical MRK Digital project.','post_excerpt'=>'Technical project by MRK Digital.','post_status'=>'publish'));if($id && !is_wp_error($id)){update_post_meta($id,'mrk_technology',$p[1]);update_post_meta($id,'mrk_status',$p[2]);}}
 update_option('mrk_content_seeded',1);
}
add_action('admin_init','mrk_seed_default_content');
