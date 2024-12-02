<?php

defined('BASEPATH') OR exit('No direct script access allowed');
date_default_timezone_set('Asia/Kolkata');
/*
  |--------------------------------------------------------------------------
  | Base Site URL
  |--------------------------------------------------------------------------
  |
  | URL to your CodeIgniter root. Typically this will be your base URL,
  | WITH a trailing slash:
  |
  |	http://example.com/
  |
  | WARNING: You MUST set this value!
  |
  | If it is not set, then CodeIgniter will try guess the protocol and path
  | your installation, but due to security concerns the hostname will be set
  | to $_SERVER['SERVER_ADDR'] if available, or localhost otherwise.
  | The auto-detection mechanism exists only for convenience during
  | development and MUST NOT be used in production!
  |
  | If you need to allow multiple domains, remember that this file is still
  | a PHP script and you can easily do that on your own.
  |
 */

$config['base_url'] = (isset($_SERVER['HTTPS']) ? "https://" : "http://") . $_SERVER['HTTP_HOST'] . '/swp_admin/';




/*
  |--------------------------------------------------------------------------
  | Index File
  |--------------------------------------------------------------------------
  |
  | Typically this will be your index.php file, unless you've renamed it to
  | something else. If you are using mod_rewrite to remove the page set this
  | variable so that it is blank.
  |
 */
$config['index_page'] = 'index.php';

/*
  |--------------------------------------------------------------------------
  | URI PROTOCOL
  |--------------------------------------------------------------------------
  |
  | This item determines which server global should be used to retrieve the
  | URI string.  The default setting of 'REQUEST_URI' works for most servers.
  | If your links do not seem to work, try one of the other delicious flavors:
  |
  | 'REQUEST_URI'    Uses $_SERVER['REQUEST_URI']
  | 'QUERY_STRING'   Uses $_SERVER['QUERY_STRING']
  | 'PATH_INFO'      Uses $_SERVER['PATH_INFO']
  |
  | WARNING: If you set this to 'PATH_INFO', URIs will always be URL-decoded!
 */
$config['uri_protocol'] = 'REQUEST_URI';

/*
  |--------------------------------------------------------------------------
  | URL suffix
  |--------------------------------------------------------------------------
  |
  | This option allows you to add a suffix to all URLs generated by CodeIgniter.
  | For more information please see the user guide:
  |
  | https://codeigniter.com/user_guide/general/urls.html
 */
$config['url_suffix'] = '';

/*
  |--------------------------------------------------------------------------
  | Default Language
  |--------------------------------------------------------------------------
  |
  | This determines which set of language files should be used. Make sure
  | there is an available translation if you intend to use something other
  | than english.
  |
 */
$config['language'] = 'english';

/*
  |--------------------------------------------------------------------------
  | Default Character Set
  |--------------------------------------------------------------------------
  |
  | This determines which character set is used by default in various methods
  | that require a character set to be provided.
  |
  | See http://php.net/htmlspecialchars for a list of supported charsets.
  |
 */
$config['charset'] = 'UTF-8';

/*
  |--------------------------------------------------------------------------
  | Enable/Disable System Hooks
  |--------------------------------------------------------------------------
  |
  | If you would like to use the 'hooks' feature you must enable it by
  | setting this variable to TRUE (boolean).  See the user guide for details.
  |
 */
$config['enable_hooks'] = FALSE;

/*
  |--------------------------------------------------------------------------
  | Class Extension Prefix
  |--------------------------------------------------------------------------
  |
  | This item allows you to set the filename/classname prefix when extending
  | native libraries.  For more information please see the user guide:
  |
  | https://codeigniter.com/user_guide/general/core_classes.html
  | https://codeigniter.com/user_guide/general/creating_libraries.html
  |
 */
$config['subclass_prefix'] = 'MY_';

/*
  |--------------------------------------------------------------------------
  | Composer auto-loading
  |--------------------------------------------------------------------------
  |
  | Enabling this setting will tell CodeIgniter to look for a Composer
  | package auto-loader script in application/vendor/autoload.php.
  |
  |	$config['composer_autoload'] = TRUE;
  |
  | Or if you have your vendor/ directory located somewhere else, you
  | can opt to set a specific path as well:
  |
  |	$config['composer_autoload'] = '/path/to/vendor/autoload.php';
  |
  | For more information about Composer, please visit http://getcomposer.org/
  |
  | Note: This will NOT disable or override the CodeIgniter-specific
  |	autoloading (application/config/autoload.php)
 */
$config['composer_autoload'] = 'vendor/autoload.php';

/*
  |--------------------------------------------------------------------------
  | Allowed URL Characters
  |--------------------------------------------------------------------------
  |
  | This lets you specify which characters are permitted within your URLs.
  | When someone tries to submit a URL with disallowed characters they will
  | get a warning message.
  |
  | As a security measure you are STRONGLY encouraged to restrict URLs to
  | as few characters as possible.  By default only these are allowed: a-z 0-9~%.:_-
  |
  | Leave blank to allow all characters -- but only if you are insane.
  |
  | The configured value is actually a regular expression character group
  | and it will be executed as: ! preg_match('/^[<permitted_uri_chars>]+$/i
  |
  | DO NOT CHANGE THIS UNLESS YOU FULLY UNDERSTAND THE REPERCUSSIONS!!
  |
 */
$config['permitted_uri_chars'] = 'a-z 0-9~%.:_\-';

/*
  |--------------------------------------------------------------------------
  | Enable Query Strings
  |--------------------------------------------------------------------------
  |
  | By default CodeIgniter uses search-engine friendly segment based URLs:
  | example.com/who/what/where/
  |
  | You can optionally enable standard query string based URLs:
  | example.com?who=me&what=something&where=here
  |
  | Options are: TRUE or FALSE (boolean)
  |
  | The other items let you set the query string 'words' that will
  | invoke your controllers and its functions:
  | example.com/index.php?c=controller&m=function
  |
  | Please note that some of the helpers won't work as expected when
  | this feature is enabled, since CodeIgniter is designed primarily to
  | use segment based URLs.
  |
 */
$config['enable_query_strings'] = FALSE;
$config['controller_trigger'] = 'c';
$config['function_trigger'] = 'm';
$config['directory_trigger'] = 'd';

/*
  |--------------------------------------------------------------------------
  | Allow $_GET array
  |--------------------------------------------------------------------------
  |
  | By default CodeIgniter enables access to the $_GET array.  If for some
  | reason you would like to disable it, set 'allow_get_array' to FALSE.
  |
  | WARNING: This feature is DEPRECATED and currently available only
  |          for backwards compatibility purposes!
  |
 */
$config['allow_get_array'] = TRUE;

/*
  |--------------------------------------------------------------------------
  | Error Logging Threshold
  |--------------------------------------------------------------------------
  |
  | You can enable error logging by setting a threshold over zero. The
  | threshold determines what gets logged. Threshold options are:
  |
  |	0 = Disables logging, Error logging TURNED OFF
  |	1 = Error Messages (including PHP errors)
  |	2 = Debug Messages
  |	3 = Informational Messages
  |	4 = All Messages
  |
  | You can also pass an array with threshold levels to show individual error types
  |
  | 	array(2) = Debug Messages, without Error Messages
  |
  | For a live site you'll usually only enable Errors (1) to be logged otherwise
  | your log files will fill up very fast.
  |
 */
$config['log_threshold'] = 1;

/*
  |--------------------------------------------------------------------------
  | Error Logging Directory Path
  |--------------------------------------------------------------------------
  |
  | Leave this BLANK unless you would like to set something other than the default
  | application/logs/ directory. Use a full server path with trailing slash.
  |
 */
$config['log_path'] = '';

/*
  |--------------------------------------------------------------------------
  | Log File Extension
  |--------------------------------------------------------------------------
  |
  | The default filename extension for log files. The default 'php' allows for
  | protecting the log files via basic scripting, when they are to be stored
  | under a publicly accessible directory.
  |
  | Note: Leaving it blank will default to 'php'.
  |
 */
$config['log_file_extension'] = '';

/*
  |--------------------------------------------------------------------------
  | Log File Permissions
  |--------------------------------------------------------------------------
  |
  | The file system permissions to be applied on newly created log files.
  |
  | IMPORTANT: This MUST be an integer (no quotes) and you MUST use octal
  |            integer notation (i.e. 0700, 0644, etc.)
 */
$config['log_file_permissions'] = 0644;

/*
  |--------------------------------------------------------------------------
  | Date Format for Logs
  |--------------------------------------------------------------------------
  |
  | Each item that is logged has an associated date. You can use PHP date
  | codes to set your own date formatting
  |
 */
$config['log_date_format'] = 'Y-m-d H:i:s';

/*
  |--------------------------------------------------------------------------
  | Error Views Directory Path
  |--------------------------------------------------------------------------
  |
  | Leave this BLANK unless you would like to set something other than the default
  | application/views/errors/ directory.  Use a full server path with trailing slash.
  |
 */
$config['error_views_path'] = '';

/*
  |--------------------------------------------------------------------------
  | Cache Directory Path
  |--------------------------------------------------------------------------
  |
  | Leave this BLANK unless you would like to set something other than the default
  | application/cache/ directory.  Use a full server path with trailing slash.
  |
 */
$config['cache_path'] = '';

/*
  |--------------------------------------------------------------------------
  | Cache Include Query String
  |--------------------------------------------------------------------------
  |
  | Whether to take the URL query string into consideration when generating
  | output cache files. Valid options are:
  |
  |	FALSE      = Disabled
  |	TRUE       = Enabled, take all query parameters into account.
  |	             Please be aware that this may result in numerous cache
  |	             files generated for the same page over and over again.
  |	array('q') = Enabled, but only take into account the specified list
  |	             of query parameters.
  |
 */
$config['cache_query_string'] = FALSE;

/*
  |--------------------------------------------------------------------------
  | Encryption Key
  |--------------------------------------------------------------------------
  |
  | If you use the Encryption class, you must set an encryption key.
  | See the user guide for more info.
  |
  | https://codeigniter.com/user_guide/libraries/encryption.html
  |
 */
$config['encryption_key'] = '';

/*
  |--------------------------------------------------------------------------
  | Session Variables
  |--------------------------------------------------------------------------
  |
  | 'sess_driver'
  |
  |	The storage driver to use: files, database, redis, memcached
  |
  | 'sess_cookie_name'
  |
  |	The session cookie name, must contain only [0-9a-z_-] characters
  |
  | 'sess_expiration'
  |
  |	The number of SECONDS you want the session to last.
  |	Setting to 0 (zero) means expire when the browser is closed.
  |
  | 'sess_save_path'
  |
  |	The location to save sessions to, driver dependent.
  |
  |	For the 'files' driver, it's a path to a writable directory.
  |	WARNING: Only absolute paths are supported!
  |
  |	For the 'database' driver, it's a table name.
  |	Please read up the manual for the format with other session drivers.
  |
  |	IMPORTANT: You are REQUIRED to set a valid save path!
  |
  | 'sess_match_ip'
  |
  |	Whether to match the user's IP address when reading the session data.
  |
  |	WARNING: If you're using the database driver, don't forget to update
  |	         your session table's PRIMARY KEY when changing this setting.
  |
  | 'sess_time_to_update'
  |
  |	How many seconds between CI regenerating the session ID.
  |
  | 'sess_regenerate_destroy'
  |
  |	Whether to destroy session data associated with the old session ID
  |	when auto-regenerating the session ID. When set to FALSE, the data
  |	will be later deleted by the garbage collector.
  |
  | Other session cookie settings are shared with the rest of the application,
  | except for 'cookie_prefix' and 'cookie_httponly', which are ignored here.
  |
 */
$config['sess_driver'] = 'database';
$config['sess_cookie_name'] = 'ci_session_swp_admin';
$config['sess_expiration'] = 86400;
$config['sess_save_path'] = 'swp_admin_sessions';
$config['sess_match_ip'] = FALSE;
$config['sess_time_to_update'] = 300;
$config['sess_regenerate_destroy'] = FALSE;

/*
  |--------------------------------------------------------------------------
  | Cookie Related Variables
  |--------------------------------------------------------------------------
  |
  | 'cookie_prefix'   = Set a cookie name prefix if you need to avoid collisions
  | 'cookie_domain'   = Set to .your-domain.com for site-wide cookies
  | 'cookie_path'     = Typically will be a forward slash
  | 'cookie_secure'   = Cookie will only be set if a secure HTTPS connection exists.
  | 'cookie_httponly' = Cookie will only be accessible via HTTP(S) (no javascript)
  |
  | Note: These settings (with the exception of 'cookie_prefix' and
  |       'cookie_httponly') will also affect sessions.
  |
 */
$config['cookie_prefix'] = '';
$config['cookie_domain'] = '';
$config['cookie_path'] = '/';
$config['cookie_secure'] = FALSE;
$config['cookie_httponly'] = FALSE;

/*
  |--------------------------------------------------------------------------
  | Standardize newlines
  |--------------------------------------------------------------------------
  |
  | Determines whether to standardize newline characters in input data,
  | meaning to replace \r\n, \r, \n occurrences with the PHP_EOL value.
  |
  | WARNING: This feature is DEPRECATED and currently available only
  |          for backwards compatibility purposes!
  |
 */
$config['standardize_newlines'] = FALSE;

/*
  |--------------------------------------------------------------------------
  | Global XSS Filtering
  |--------------------------------------------------------------------------
  |
  | Determines whether the XSS filter is always active when GET, POST or
  | COOKIE data is encountered
  |
  | WARNING: This feature is DEPRECATED and currently available only
  |          for backwards compatibility purposes!
  |
 */
$config['global_xss_filtering'] = FALSE;

/*
  |--------------------------------------------------------------------------
  | Cross Site Request Forgery
  |--------------------------------------------------------------------------
  | Enables a CSRF cookie token to be set. When set to TRUE, token will be
  | checked on a submitted form. If you are accepting user data, it is strongly
  | recommended CSRF protection be enabled.
  |
  | 'csrf_token_name' = The token name
  | 'csrf_cookie_name' = The cookie name
  | 'csrf_expire' = The number in seconds the token should expire.
  | 'csrf_regenerate' = Regenerate token on every submission
  | 'csrf_exclude_uris' = Array of URIs which ignore CSRF checks
 */
$config['csrf_protection'] = TRUE;
$config['csrf_token_name'] = 'csrf_token_eodbsws_admin';
$config['csrf_cookie_name'] = 'csrf_cookie_eodbsws_admin';
$config['csrf_expire'] = 7200;
$config['csrf_regenerate'] = TRUE;
$config['csrf_exclude_uris'] = array('utility/generate_new_token', 'utility/get_common_data', 'map/get_map_data',
    'srap/upload_evidence', 'repairer/generate_form1', 'dealer/generate_form1', 'manufacturer/generate_form1',
    'repairer/get_repairer_data', 'dealer/get_dealer_data', 'manufacturer/get_manufacturer_data',
    'repairer/generate_certificate', 'dealer/generate_certificate', 'manufacturer/generate_certificate',
    'wmregistration/generate_form1', 'wmregistration/generate_certificate',
    'wc/get_wc_data', 'wc/generate_form1', 'wc/generate_certificate', 'cinema/get_cinema_data', 'cinema/generate_form1',
    'cinema/generate_certificate', 'hotelregi/get_hotelregi_data', 'hotelregi/generate_formII',
    'hotelregi/generate_certificate', 'psfregistration/generate_certificate', 'psfregistration/get_psfregistration_data',
    'psfregistration/generate_form1', 'wmregistration/get_wmregistration_data', 'msme/get_msme_data',
    'msme/generate_form1', 'msme/generate_certificate', 'textile/get_textile_data', 'textile/generate_form1', 'textile/generate_excel',
    'textile/generate_certificate', 'msme/get_msme_data', 'msme/generate_excel', 'repairer_renewal/generate_form1',
    'repairer_renewal/get_repairer_renewal_data', 'dealer_renewal/get_dealer_renewal_data',
    'manufacturer_renewal/get_manufacturer_renewal_data', 'repairer_renewal/generate_certificate',
    'dealer_renewal/generate_certificate', 'manufacturer_renewal/generate_certificate', 'dealer_renewal/generate_form1',
    'manufacturer_renewal/generate_form1', 'subletting/get_subletting_data', 'subletting/generate_form1',
    'subletting/generate_certificate', 'sublessee/get_sublessee_data', 'sublessee/generate_form1',
    'sublessee/generate_certificate', 'noc/get_noc_data', 'noc/generate_form1', 'noc/generate_certificate',
    'transfer/get_transfer_data', 'transfer/generate_form1', 'transfer/generate_certificate', 'seller/get_seller_data',
    'seller/generate_form1', 'seller/generate_certificate', 'travelagent/get_travelagent_data',
    'travelagent/generate_form', 'travelagent/generate_certificate', 'hotel_renewal/get_hotel_renewal_data',
    'hotel_renewal/generate_form', 'hotel_renewal/generate_certificate', 'filmshooting/get_filmshooting_data',
    'filmshooting/generate_form1', 'filmshooting/generate_certificate', 'filmshooting/generate_excel', 'travelagent_renewal/get_travelagent_renewal_data',
    'travelagent_renewal/generate_form', 'travelagent_renewal/generate_certificate', 'tourismevent/get_tourismevent_data',
    'tourismevent/generate_form', 'tourismevent/generate_certificate', 'occupancy_certificate/get_occupancycertificate_data',
    'occupancy_certificate/generate_form1', 'occupancy_certificate/generate_certificate', 'inspection/get_inspection_data',
    'inspection/generate_form1', 'inspection/generate_certificate', 'inspection/generate_excel', 'construction/get_construction_data',
    'construction/generate_form1', 'construction/generate_certificate', 'site/get_site_data', 'site/generate_form1',
    'site/generate_certificate', 'zone/get_zone_data', 'zone/generate_form1', 'zone/generate_certificate',
    'landallotment/get_landallotment_data', 'landallotment/generate_form1', 'landallotment/generate_certificate',
    'shop/get_all_shop', 'shop/generate_FormI_pdf', 'shop/generate_FormXXIV_pdf', 'shop/generate_FormIV_pdf',
    'migrantworkers/get_all_migrantworkers', 'migrantworkers/generate_formI_pdf', 'shop/generate_FormII_pdf',
    'bocw/get_bocw_data', 'boileract/get_boiler_act_data', 'buildingplan/get_building_plan_data',
    'factorylicense/get_factory_license_data', 'clact/get_clact_data', 'singlereturn/get_single_return_data',
    'clact/generate_form1', 'bocw/generate_form1', 'clact/get_clact_data', 'clact/generate_form1',
    'clact/generate_certificate', 'factorylicense/generate_form1', 'boileract/generate_form1',
    'buildingplan/generate_form1', 'bocw/generate_certificate', 'factorylicense/generate_certificate',
    'boileract/generate_certificate', 'buildingplan/generate_certificate', 'boilermanufacture/get_boiler_manufacture_data',
    'boilermanufacture/generate_form1', 'boilermanufacture/generate_certificate', 'singlereturn/generate_form1',
    'singlereturn/generate_certificate', 'employee/get_employee_data', 'migrantworkers/generate_certificate',
    'property/get_property_data', 'property/generate_form1', 'property/generate_certificate', 'na/get_na_data',
    'na/generate_form', 'na/generate_certificate', 'shop_renewal/get_shop_renewal_data', 'shop_renewal/generate_form',
    'shop_renewal/generate_certificate', 'aplicence/generate_form1', 'aplicence/get_aplicence_data',
    'aplicence/generate_certificate', 'factorylicense_renewal/get_factory_license_renewal_data',
    'factorylicense_renewal/generate_form1', 'factorylicense_renewal/generate_certificate',
    'boileract_renewal/get_boiler_act_renewal_data', 'boileract_renewal/generate_form1',
    'boileract_renewal/generate_certificate', 'migrantworkers_renewal/get_migrantworkers_renewal_data',
    'migrantworkers_renewal/generate_form', 'migrantworkers_renewal/generate_certificate',
    'aplicence_renewal/generate_form1', 'aplicence_renewal/get_aplicence_renewal_data',
    'aplicence_renewal/generate_certificate', 'query_grievance/get_query_grievance_data',
    'sc_inspections/get_sc_inspections_data', 'sj_inspections/get_sj_inspections_data',
    'c_inspections/get_c_inspections_data', 'factorylicense/generate_excel', 'wc/generate_excel', 'hotelregi/generate_excel',
    'hotel_renewal/generate_excel', 'travelagent/generate_excel', 'travelagent_renewal/generate_excel', 'tourismevent/generate_excel',
    'cinema/generate_excel', 'na/generate_excel', 'factorylicense_renewal/generate_excel', 'buildingplan/generate_excel', 'boileract/generate_excel',
    'boileract_renewal/generate_excel', 'boilermanufacture/generate_excel', 'psfregistration/generate_excel', 'landallotment/generate_excel',
    'clact/generate_excel', 'bocw/generate_excel', 'shop/generate_excel', 'shop_renewal/generate_excel', 'migrantworkers/generate_excel',
    'migrantworkers_renewal/generate_excel', 'aplicence/generate_excel', 'aplicence_renewal/generate_excel', 'singlereturn/generate_excel',
    'construction/generate_excel', 'occupancy_certificate/generate_excel', 'site/generate_excel', 'zone/generate_excel',
    'property/generate_excel', 'dealer/generate_excel', 'dealer_renewal/generate_excel', 'manufacturer/generate_excel',
    'manufacturer_renewal/generate_excel', 'repairer/generate_excel', 'repairer_renewal/generate_excel',
    'wmregistration/generate_excel', 'active_users/get_active_users_data', 'vp_users/get_vp_users_data',
    'utility/upload_query_document', 'ismw/get_ismw_data', 'ismw/generate_form', 'ismw/generate_excel',
    'vc/get_vc_data', 'vc/generate_form', 'vc/generate_excel', 'rii/get_rii_data', 'rii/generate_form1',
    'rii/generate_certificate', 'periodicalreturn/get_periodicalreturn_data', 'periodicalreturn/generate_form1',
    'periodicalreturn/generate_certificate', 'periodicalreturn/generate_excel', 'rii/generate_excel',
    'ews_certificate/submit_ews_certificate', 'vc/generate_certificate', 'utility/get_all_payment_history',
    'ips/get_incentives_data', 'tree_cutting/get_tree_cutting_data', 'tree_cutting/generate_tree_cutting_excel',
    'society_registration/get_society_registration_data', 'society_registration/generate_society_registration_excel',
    'vp_users/get_deleted_users_data', 'nil_certificate/get_nil_certificate_data', 'nil_certificate/generate_nil_certificate_excel',
    'cfr/get_cfr_data', 'business/get_business_data', 'ips/generate_incentives_excel', 'wc/generate_naw_certificate',
    'noc/generate_excel', 'seller/generate_excel', 'transfer/generate_excel', 'subletting/generate_excel', 'sublessee/generate_excel');


/*
  |--------------------------------------------------------------------------
  | Output Compression
  |--------------------------------------------------------------------------
  |
  | Enables Gzip output compression for faster page loads.  When enabled,
  | the output class will test whether your server supports Gzip.
  | Even if it does, however, not all browsers support compression
  | so enable only if you are reasonably sure your visitors can handle it.
  |
  | Only used if zlib.output_compression is turned off in your php.ini.
  | Please do not use it together with httpd-level output compression.
  |
  | VERY IMPORTANT:  If you are getting a blank page when compression is enabled it
  | means you are prematurely outputting something to your browser. It could
  | even be a line of whitespace at the end of one of your scripts.  For
  | compression to work, nothing can be sent before the output buffer is called
  | by the output class.  Do not 'echo' any values with compression enabled.
  |
 */
$config['compress_output'] = FALSE;

/*
  |--------------------------------------------------------------------------
  | Master Time Reference
  |--------------------------------------------------------------------------
  |
  | Options are 'local' or any PHP supported timezone. This preference tells
  | the system whether to use your server's local time as the master 'now'
  | reference, or convert it to the configured one timezone. See the 'date
  | helper' page of the user guide for information regarding date handling.
  |
 */
$config['time_reference'] = 'local';

/*
  |--------------------------------------------------------------------------
  | Rewrite PHP Short Tags
  |--------------------------------------------------------------------------
  |
  | If your PHP installation does not have short tag support enabled CI
  | can rewrite the tags on-the-fly, enabling you to utilize that syntax
  | in your view files.  Options are TRUE or FALSE (boolean)
  |
  | Note: You need to have eval() enabled for this to work.
  |
 */
$config['rewrite_short_tags'] = FALSE;

/*
  |--------------------------------------------------------------------------
  | Reverse Proxy IPs
  |--------------------------------------------------------------------------
  |
  | If your server is behind a reverse proxy, you must whitelist the proxy
  | IP addresses from which CodeIgniter should trust headers such as
  | HTTP_X_FORWARDED_FOR and HTTP_CLIENT_IP in order to properly identify
  | the visitor's IP address.
  |
  | You can use both an array or a comma-separated list of proxy addresses,
  | as well as specifying whole subnets. Here are a few examples:
  |
  | Comma-separated:	'10.0.1.200,192.168.5.0/24'
  | Array:		array('10.0.1.200', '192.168.5.0/24')
 */
$config['proxy_ips'] = '';
