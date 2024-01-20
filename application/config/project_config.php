<?php

define('IS_CHECKED_NO', 0);
define('IS_CHECKED_YES', 1);
define('IS_DELETE', 1);
define('IS_ACTIVE', 0);
define('IS_DEACTIVE', 1);
define('IS_VERIFY', 1);

define('LOGIN', 1);
define('LOGOUT', 2);

$config['log_type'] = array(
    LOGIN => 'Login',
    LOGOUT => 'Logout'
);

define("ENCRYPTION_KEY", "!@#$%^&*");

define('PASSWORD_REGEX', '/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!#$@%_+\-=<>]).{8,16}$/');

define('API_ENCRYPTION_KEY', 'sgAD#@$@^^&fAB%^*(*&&^%$');
define('API_ACCESS_KEY', '%#d@AE$#Idgqw$$^jhhh');

// Logs Table
define('TBL_LOGS_LOGIN_LOGOUT', 'sa_logs_login_details');
define('TBL_LOGS_LOGIN_LOGOUT_PRIMARY_KEY', 'sa_logs_login_details_id');
define('TBL_LOGS_CHANGE_PASSWORD', 'sa_logs_change_password');
define('TBL_LOGS_API', 'sa_logs_api');

define('DEFAULT_PASSWORD', 'Admin@1819');

define('TALUKA_DAMAN', 1);
define('TALUKA_DIU', 2);
define('TALUKA_DNH', 3);

$config['taluka_array'] = array(
    TALUKA_DAMAN => 'Daman',
    TALUKA_DIU => 'Diu',
    TALUKA_DNH => 'DNH'
);

define('FROM_NAME', 'noreply@swp.dddgov.in');
define('FROM_EMAIL', 'noreply@swp.dddgov.in');

define('TEMP_TYPE_A', 1);
define('TEMP_TYPE_LABOUR_DEPT_USER', 2);
define('TEMP_TYPE_SUB_REGISTRAR', 3);
define('TEMP_TYPE_DIC', 4);
define('TEMP_TYPE_PCC', 5);
define('TEMP_TYPE_FB', 6);
define('TEMP_TYPE_REV_COLL', 7);
define('TEMP_TYPE_FIRE', 8);
define('TEMP_TYPE_WM', 9);
define('TEMP_TYPE_ELECTRICITY', 10);
define('TEMP_TYPE_PWD', 11);
define('TEMP_TYPE_TOURISM', 12);
define('TEMP_TYPE_DIC_DNH', 13);
define('TEMP_TYPE_PDA', 14);
define('TEMP_TYPE_INSPECTIONS', 16);
define('TEMP_TYPE_ISMW', 17);
define('TEMP_TYPE_VDD', 18);
define('TEMP_TYPE_FOREST', 19);
define('TEMP_TYPE_ARCS', 20);
define('TEMP_TYPE_USER_ACC_VER', 21);

define('VERSION', 'v=1.1.73');

//define('GS_PATH', "C:\Program Files\gs\gs9.55.0\bin\gswin64c");
define('GS_PATH', "gs");
define('PROJECT_PATH', 'https://swp.dddgov.in/');
//define('PROJECT_PATH', 'http://localhost:90/swp/');

define('DOC_PATH', PROJECT_PATH . 'documents/');
define('REPAIRER_DOC_PATH', DOC_PATH . 'repairer/');
define('DEALER_DOC_PATH', DOC_PATH . 'dealer/');
define('MENUFACT_DOC_PATH', DOC_PATH . 'manufacturer/');
define('WMREG_DOC_PATH', DOC_PATH . 'wmregistration/');
define('WC_DOC_PATH', DOC_PATH . 'wc/');
define('CINEMA_DOC_PATH', DOC_PATH . 'cinema/');
define('HOTELREGI_DOC_PATH', DOC_PATH . 'hotelregi/');
define('PSFREG_DOC_PATH', DOC_PATH . 'psfregistration/');
define('QUERY_PATH', DOC_PATH . 'query/');
define('MSME_DOC_PATH', DOC_PATH . 'msme/');
define('TEXTILE_DOC_PATH', DOC_PATH . 'textile/');
define('NOC_DOC_PATH', DOC_PATH . 'noc/');
define('TRANSFER_DOC_PATH', DOC_PATH . 'transfer/');
define('SUBLETTING_DOC_PATH', DOC_PATH . 'subletting/');
define('FILMSHOOTING_DOC_PATH', DOC_PATH . 'filmshooting/');
define('SUBLESSEE_DOC_PATH', DOC_PATH . 'sublessee/');
define('SELLER_DOC_PATH', DOC_PATH . 'seller/');
define('TRAVELAGENT_DOC_PATH', DOC_PATH . 'travelagent/');
define('PROPERTY_DOC_PATH', DOC_PATH . 'property/');
define('TOURISMEVENT_DOC_PATH', DOC_PATH . 'tourismevent/');
define('OCCUPANCY_DOC_PATH', DOC_PATH . 'occupancycertificate/');
define('INSPECTION_DOC_PATH', DOC_PATH . 'inspection/');
define('CONSTRUCTION_DOC_PATH', DOC_PATH . 'construction/');
define('SITE_DOC_PATH', DOC_PATH . 'site/');
define('ZONE_DOC_PATH', DOC_PATH . 'zone/');
define('LANDALLOTMENT_DOC_PATH', DOC_PATH . 'landallotment/');
define('CLACT_DOC_PATH', DOC_PATH . 'clact/');
define('SHOP_DOC_PATH', DOC_PATH . 'shop/');
define('BOCW_DOC_PATH', DOC_PATH . 'bocw/');
define('FACTORY_DOC_PATH', DOC_PATH . 'factorylicense/');
define('BUILD_DOC_PATH', DOC_PATH . 'buildingplan/');
define('BOILER_DOC_PATH', DOC_PATH . 'boileract/');
define('MIGRANTWORKERS_DOC_PATH', DOC_PATH . 'migrantworkers/');
define('BOILRMENUFACT_DOC_PATH', DOC_PATH . 'boilermanufactures/');
define('SINGLERETURN_DOC_PATH', DOC_PATH . 'singlereturn/');
define('NA_DOC_PATH', DOC_PATH . 'na/');
define('APLICENCE_DOC_PATH', DOC_PATH . 'aplicence/');
define('RII_DOC_PATH', DOC_PATH . 'rii/');
define('VC_DOC_PATH', DOC_PATH . 'vc/');
define('PR_DOC_PATH', DOC_PATH . 'periodicalreturn/');
define('IPS_DOC_PATH', DOC_PATH . 'ips/');
define('IPS_INC_DOC_PATH', DOC_PATH . 'ips_inc/');
define('TREE_CUTTING_DOC_PATH', DOC_PATH . 'tree_cutting/');
define('SOCIETY_REGISTRATION_DOC_PATH', DOC_PATH . 'society_registration/');
define('NIL_CERTIFICATE_DOC_PATH', DOC_PATH . 'nil_certificate/');

define('AT_WILL', 'At Will');
define('VIEW_UPLODED_DOCUMENT', 'View Uploaded Document');
define('VALUE_ZERO', 0);
define('VALUE_ONE', 1);
define('VALUE_TWO', 2);
define('VALUE_THREE', 3);
define('VALUE_FOUR', 4);
define('VALUE_FIVE', 5);
define('VALUE_SIX', 6);
define('VALUE_SEVEN', 7);
define('VALUE_EIGHT', 8);
define('VALUE_NINE', 9);
define('VALUE_TEN', 10);
define('VALUE_ELEVEN', 11);
define('VALUE_TWELVE', 12);
define('VALUE_THIRTEEN', 13);
define('VALUE_FOURTEEN', 14);
define('VALUE_FIFTEEN', 15);
define('VALUE_SIXTEEN', 16);
define('VALUE_SEVENTEEN', 17);
define('VALUE_EIGHTEEN', 18);
define('VALUE_NINETEEN', 19);
define('VALUE_TWENTY', 20);
define('VALUE_TWENTYONE', 21);
define('VALUE_TWENTYTWO', 22);
define('VALUE_TWENTYTHREE', 23);
define('VALUE_TWENTYFOUR', 24);
define('VALUE_TWENTYFIVE', 25);
define('VALUE_TWENTYSIX', 26);
define('VALUE_TWENTYSEVEN', 27);
define('VALUE_TWENTYEIGHT', 28);
define('VALUE_TWENTYNINE', 29);
define('VALUE_THIRTY', 30);
define('VALUE_THIRTYONE', 31);
define('VALUE_THIRTYTWO', 32);
define('VALUE_THIRTYTHREE', 33);
define('VALUE_THIRTYFOUR', 34);
define('VALUE_THIRTYFIVE', 35);
define('VALUE_THIRTYSIX', 36);
define('VALUE_THIRTYSEVEN', 37);
define('VALUE_THIRTYEIGHT', 38);
define('VALUE_THIRTYNINE', 39);
define('VALUE_FOURTY', 40);
define('VALUE_FOURTYONE', 41);
define('VALUE_FOURTYTWO', 42);
define('VALUE_FOURTYTHREE', 43);
define('VALUE_FOURTYFOUR', 44);
define('VALUE_FOURTYFIVE', 45);
define('VALUE_FOURTYSIX', 46);
define('VALUE_FOURTYSEVEN', 47);
define('VALUE_FOURTYEIGHT', 48);
define('VALUE_FOURTYNINE', 49);
define('VALUE_FIFTY', 50);
define('VALUE_FIFTYONE', 51);
define('VALUE_FIFTYTWO', 52);
define('VALUE_FIFTYTHREE', 53);
define('VALUE_FIFTYFOUR', 54);
define('VALUE_FIFTYFIVE', 55);
define('VALUE_FIFTYSIX', 56);
define('VALUE_FIFTYSEVEN', 57);
define('VALUE_FIFTYEIGHT', 58);
define('VALUE_FIFTYNINE', 59);
define('VALUE_SIXTY', 60);
define('VALUE_SIXTYONE', 61);
define('VALUE_SIXTYTWO', 62);
define('VALUE_SIXTYTHREE', 63);
define('VALUE_SIXTYFOUR', 64);
define('VALUE_SIXTYFIVE', 65);
define('VALUE_SIXTYSIX', 66);
define('VALUE_SIXTYSEVEN', 67);
define('VALUE_SIXTYEIGHT', 68);
define('VALUE_SIXTYNINE', 69);
define('VALUE_SEVENTY', 70);
define('VALUE_SEVENTYONE', 71);
define('VALUE_HUNDRED', 100);

define('API_KEY_FOR_SMS', '');
define('SENDER_ID_FOR_SMS', '');

$config['email_type_array'] = array(
    VALUE_ONE => 'Registration Confirmation Link',
    VALUE_TWO => 'Mobile & Pin Email',
    VALUE_THREE => 'Sub Registar',
    VALUE_FOUR => 'Query Grievance',
    VALUE_FIVE => 'Raise Query',
    VALUE_SIX => 'Application Submitted',
    VALUE_SEVEN => 'Application Approve',
    VALUE_EIGHT => 'Application Reject',
    VALUE_NINE => 'Query Resolved',
    VALUE_TEN => 'Payment Confirmed'
);

$config['sms_otp_type_array'] = array(
    VALUE_ONE => 'Mobile Verification',
    VALUE_TWO => 'Mobile & Pin SMS',
    VALUE_FOUR => 'Query Grievance',
    VALUE_FIVE => 'Raise Query',
    VALUE_SIX => 'Application Submitted',
    VALUE_SEVEN => 'Application Approve',
    VALUE_EIGHT => 'Application Reject',
    VALUE_NINE => 'Query Resolved',
    VALUE_TEN => 'Payment Confirmed'
);

$config['app_status_array'] = array(
    VALUE_ZERO => '<span class="badge bg-warning app-status">Pending</span>',
    VALUE_ONE => '<span class="badge bg-nic-blue app-status">Draft</span>',
    VALUE_TWO => '<span class="badge bg-warning app-status">Application Submitted</span>',
    VALUE_THREE => '<span class="badge bg-warning app-status">Fees Pending</span>',
    VALUE_FOUR => '<span class="badge bg-warning app-status">Fees Paid</span>',
    VALUE_FIVE => '<span class="badge bg-success app-status">Approved</span>',
    VALUE_SIX => '<span class="badge bg-danger app-status">Rejected</span>',
    VALUE_SEVEN => '<span class="badge bg-success app-status">Payment Confirmed</span>',
    VALUE_EIGHT => '<span class="badge bg-warning app-status">Pay at Office</span>',
    VALUE_NINE => '<span class="badge bg-warning app-status">Fees N.A. & Application is Under Process</span>',
);

$config['app_status_text_array'] = array(
    VALUE_TWO => 'Application Submitted',
    VALUE_THREE => 'Fees Pending',
    VALUE_FOUR => 'Fees Paid',
    VALUE_FIVE => 'Approved',
    VALUE_SIX => 'Rejected',
    VALUE_SEVEN => 'Payment Confirmed',
    VALUE_EIGHT => 'Pay at Office',
    VALUE_NINE => 'Fees N.A. & Application is Under Process',
);

$config['yes_no_type_array'] = array(
    VALUE_ONE => 'Yes',
    VALUE_TWO => 'No',
);

$config['srap_status_array'] = array(
    VALUE_ONE => 'Completed',
    VALUE_TWO => 'Partially Completed',
    VALUE_THREE => 'Initiated',
    VALUE_FOUR => 'Not Applicable',
    VALUE_FIVE => 'Pending',
);
$config['soc_reg_ul_status_array'] = array(
    VALUE_ZERO => '<span class="badge bg-warning app-status">Letter Not Uploaded</span>',
    VALUE_ONE => '<span class="badge bg-success app-status">Letter Uploaded</span>',
    VALUE_TWO => '<span class="badge bg-success app-status">Passbook Uploaded</span>',
);
define('MAX_FILE_SIZE_IN_KB', 100);
define('MAX_FILE_SIZE_IN_MB', 5);

define("MALE", 1);
define("FEMALE", 2);
define("OTHERS", 3);

$config['gender_type_array'] = array(
    MALE => 'Male',
    FEMALE => 'Female',
    OTHERS => 'Others'
);

define("OWNED", 1);
define("RENTED", 2);
define("LEAVE_LICENSE", 3);

$config['premises_status_array'] = array(
    OWNED => 'Owned',
    RENTED => 'Rented',
    LEAVE_LICENSE => 'Taken on Lease/Leave License'
);

$config['registration_type_array'] = array(
    VALUE_ONE => 'Establishment',
    VALUE_TWO => 'Contractor'
);

$config['party_type_array'] = array(
    VALUE_ONE => 'Executing Party',
    VALUE_TWO => 'Claiming Party'
);

define("VAT_REG_NO", 1);
define("SALES_TAX_REG_NO", 2);
define("CST_NO", 3);
define("PRO_TAX_REG_NO", 4);
define("IT_NO", 5);

$config['identity_choice_array'] = array(
    VAT_REG_NO => 'VAT Registration Number',
    SALES_TAX_REG_NO => 'Sales Tax Registration Number',
    CST_NO => 'CST Number',
    PRO_TAX_REG_NO => 'Professional Tax Registration Number',
    IT_NO => 'IT Number'
);

$config['query_status_array'] = array(
    VALUE_ZERO => '-',
    VALUE_ONE => '<span class="badge bg-warning app-status">Queried</span>',
    VALUE_TWO => '<span class="badge bg-nic-blue app-status">Response Received</span>',
    VALUE_THREE => '<span class="badge bg-success app-status">Resolved</span>',
);

$config['query_status_text_array'] = array(
    VALUE_ONE => 'Queried',
    VALUE_TWO => 'Response Received',
    VALUE_THREE => 'Resolved'
);

$config['app_timing_array'] = array(
    VALUE_ONE => 'Within Time',
    VALUE_TWO => 'Delayed',
);

define('TEMP_LABOUR', 'Labour & Employment');
define('TEMP_SUB_REGISTRAR', 'Civil Registrar Cum Sub Registrar');
define('TEMP_DIC', 'District Industries Center(DIC)');
define('TEMP_PCC', 'Pollution Control Committee');
define('TEMP_FB', 'Factories & Boilers');
define('TEMP_REV_COLL', 'Collectorates');
define('TEMP_FIRE', 'Fire & Emergency Service');
define('TEMP_WM', 'Legal Metrology (Weight & Measures)');
define('TEMP_ELECTRICITY', 'Electricity Department');
define('TEMP_PWD', 'Public Works Department(PWD)');
define('TEMP_TOURISM', 'Tourism');
define('TEMP_PDA', 'Planning & Development Authority');
define('TEMP_FOREST', 'Forest Department');

$config['dept_name_array'] = array(
    TEMP_TYPE_LABOUR_DEPT_USER => TEMP_LABOUR,
    TEMP_TYPE_SUB_REGISTRAR => TEMP_SUB_REGISTRAR,
    TEMP_TYPE_DIC => TEMP_DIC,
    TEMP_TYPE_PCC => TEMP_PCC,
    TEMP_TYPE_FB => TEMP_FB,
    TEMP_TYPE_REV_COLL => TEMP_REV_COLL,
    TEMP_TYPE_FIRE => TEMP_FIRE,
    TEMP_TYPE_WM => TEMP_WM,
    TEMP_TYPE_ELECTRICITY => TEMP_ELECTRICITY,
    TEMP_TYPE_PWD => TEMP_PWD,
    TEMP_TYPE_TOURISM => TEMP_TOURISM,
    TEMP_TYPE_DIC_DNH => TEMP_DIC,
    TEMP_TYPE_PDA => TEMP_PDA,
    TEMP_TYPE_FOREST => TEMP_FOREST,
    TEMP_TYPE_ARCS => TEMP_REV_COLL,
);

$config['dept_module_array'] = array(
    TEMP_TYPE_LABOUR_DEPT_USER => array(VALUE_THIRTYONE, VALUE_THIRTYTWO, VALUE_THIRTYTHREE, VALUE_THIRTYFOUR, VALUE_THIRTYNINE, VALUE_FOURTYTWO,
        VALUE_FOURTYTHREE, VALUE_FOURTYFIVE, VALUE_FOURTYSIX, VALUE_FOURTYSEVEN),
    TEMP_TYPE_SUB_REGISTRAR => array(VALUE_SEVEN, VALUE_TWENTYONE, VALUE_SIXTYONE),
    TEMP_TYPE_DIC => array(VALUE_NINE, VALUE_TEN, VALUE_FIFTYTWO),
    TEMP_TYPE_PCC => array(),
    TEMP_TYPE_FB => array(VALUE_THIRTYFIVE, VALUE_THIRTYSIX, VALUE_THIRTYSEVEN, VALUE_THIRTYEIGHT, VALUE_FOURTYONE, VALUE_FOURTYFOUR),
    TEMP_TYPE_REV_COLL => array(VALUE_EIGHT, VALUE_TWENTYTWO, VALUE_FOURTY),
    TEMP_TYPE_FIRE => array(),
    TEMP_TYPE_WM => array(VALUE_ONE, VALUE_TWO, VALUE_THREE, VALUE_FOUR, VALUE_FOURTEEN, VALUE_FIFTEEN, VALUE_SIXTEEN,
        VALUE_FOURTYEIGHT, VALUE_FOURTYNINE, VALUE_FIFTY),
    TEMP_TYPE_ELECTRICITY => array(),
    TEMP_TYPE_PWD => array(VALUE_FIVE),
    TEMP_TYPE_TOURISM => array(VALUE_SIX, VALUE_NINETEEN, VALUE_TWENTY, VALUE_TWENTYTHREE, VALUE_TWENTYFOUR),
    TEMP_TYPE_DIC_DNH => array(VALUE_NINE, VALUE_TEN, VALUE_TWENTYFIVE, VALUE_FIFTYTWO),
    TEMP_TYPE_PDA => array(VALUE_TWENTYSIX, VALUE_TWENTYSEVEN, VALUE_TWENTYEIGHT, VALUE_TWENTYNINE, VALUE_THIRTY),
    TEMP_TYPE_FOREST => array(VALUE_FIFTYNINE),
    TEMP_TYPE_ARCS => array(VALUE_SIXTY),
);

$config['query_module_array'] = array(
    VALUE_ONE => array(
        'hd' => 'Done',
        'department_name' => TEMP_WM,
        'timeline' => '30 Days',
        'day' => 30,
        'title' => 'Registration under "Weights & Measure"',
        'working_days' => 'fdw',
        'key_id_text' => 'wmregistration_id',
        'tbl_text' => 'wm_registration'),
    VALUE_TWO => array(
        'hd' => 'Done',
        'department_name' => TEMP_WM,
        'timeline' => '30 Days',
        'day' => 30,
        'working_days' => 'fdw',
        'title' => 'Registration under "License for Repairer"',
        'key_id_text' => 'repairer_id',
        'tbl_text' => 'wm_repairer'),
    VALUE_THREE => array(
        'hd' => 'Done',
        'department_name' => TEMP_WM,
        'timeline' => '30 Days',
        'day' => 30,
        'working_days' => 'fdw',
        'title' => 'Registration under "License for Dealer"',
        'key_id_text' => 'dealer_id',
        'tbl_text' => 'wm_dealer'),
    VALUE_FOUR => array(
        'hd' => 'Done',
        'department_name' => TEMP_WM,
        'timeline' => '30 Days',
        'day' => 30,
        'working_days' => 'fdw',
        'title' => 'Registration under "License for Manufacturer"',
        'key_id_text' => 'manufacturer_id',
        'tbl_text' => 'wm_manufacturer'),
    VALUE_FIVE => array(
        'hd' => 'Done',
        'department_name' => TEMP_PWD,
        'timeline' => '07 Days',
        'day' => 7,
        'working_days' => 'fdw_ess',
        'title' => 'New Water Connection',
        'key_id_text' => 'wc_id',
        'tbl_text' => 'wc'),
    VALUE_SIX => array(
        'department_name' => TEMP_TOURISM,
        'timeline' => '21 Days',
        'day' => 21,
        'working_days' => 'fdw',
        'title' => 'Hotel & Home Stay /Bed & Breakfast Registration Form',
        'key_id_text' => 'hotelregi_id',
        'tbl_text' => 'hotel'),
    VALUE_SEVEN => array(
        'hd' => 'Done',
        'department_name' => TEMP_SUB_REGISTRAR,
        'timeline' => '15 Days',
        'day' => 15,
        'working_days' => 'fdw_ess',
        'title' => 'Partnership Firms Registration',
        'key_id_text' => 'psfregistration_id',
        'tbl_text' => 'psf_registration'),
    VALUE_EIGHT => array(
        'hd' => 'Done',
        'department_name' => TEMP_REV_COLL,
        'timeline' => '45 Days',
        'day' => 45,
        'working_days' => 'fdw',
        'title' => 'Application for State Cinema Regulations',
        'key_id_text' => 'cinema_id',
        'tbl_text' => 'cinema'),
    VALUE_NINE => array(
        'department_name' => TEMP_DIC,
        'timeline' => '30 Days',
        'day' => 30,
        'working_days' => 'fdw',
        'title' => 'Incentives under Investment Promotion Scheme - 2015 for MSME',
        'key_id_text' => 'msme_id',
        'tbl_text' => 'msme'),
    VALUE_TEN => array(
        'department_name' => TEMP_DIC,
        'timeline' => '30 Days',
        'day' => 30,
        'working_days' => 'fdw',
        'title' => 'Incentives under Investment Promotion Scheme - 2015 for Textile Sector',
        'key_id_text' => 'textile_id',
        'tbl_text' => 'textile'),
    VALUE_ELEVEN => array(
        'working_days' => 'fdw',
        'title' => 'NOC of Lease',
        'key_id_text' => 'noc_id',
        'tbl_text' => 'noc'),
    VALUE_TWELVE => array(
        'working_days' => 'fdw',
        'title' => 'Sale/Transfer of Lease',
        'key_id_text' => 'transfer_id',
        'tbl_text' => 'transfer'),
    VALUE_THIRTEEN => array(
        'working_days' => 'fdw',
        'title' => 'Subletting',
        'key_id_text' => 'subletting_id',
        'tbl_text' => 'sub_letting'),
    VALUE_FOURTEEN => array(
        'hd' => 'Done',
        'department_name' => TEMP_WM,
        'timeline' => '30 Days',
        'day' => 30,
        'working_days' => 'fdw',
        'title' => 'Renewal under "License for Repairer"',
        'key_id_text' => 'repairer_renewal_id',
        'tbl_text' => 'wm_repairer_renewal'),
    VALUE_FIFTEEN => array(
        'hd' => 'Done',
        'department_name' => TEMP_WM,
        'timeline' => '30 Days',
        'day' => 30,
        'working_days' => 'fdw',
        'title' => 'Renewal under "License for Dealer"',
        'key_id_text' => 'dealer_renewal_id',
        'tbl_text' => 'wm_dealer_renewal'),
    VALUE_SIXTEEN => array(
        'hd' => 'Done',
        'department_name' => TEMP_WM,
        'timeline' => '30 Days',
        'day' => 30,
        'working_days' => 'fdw',
        'title' => 'Renewal under "License for Manufacturer"',
        'key_id_text' => 'manufacturer_renewal_id',
        'tbl_text' => 'wm_manufacturer_renewal'),
    VALUE_SEVENTEEN => array(
        'working_days' => 'fdw',
        'title' => 'Sublessee',
        'key_id_text' => 'sublessee_id',
        'tbl_text' => 'sub_lessee'),
    VALUE_EIGHTEEN => array(
        'working_days' => 'fdw',
        'title' => 'Seller Of Lease',
        'key_id_text' => 'seller_id',
        'tbl_text' => 'lease_seller'),
    VALUE_NINETEEN => array(
        'department_name' => TEMP_TOURISM,
        'timeline' => '21 Days',
        'day' => 21,
        'working_days' => 'fdw',
        'title' => 'Travel Agency Registration Form',
        'key_id_text' => 'travelagent_id',
        'tbl_text' => 'travelagent'),
    VALUE_TWENTY => array(
        'department_name' => TEMP_TOURISM,
        'timeline' => '21 Days',
        'day' => 21,
        'working_days' => 'fdw',
        'title' => 'Hotel & Home Stay / Bed & Breakfast Registration Renewal Form',
        'key_id_text' => 'hotel_renewal_id',
        'tbl_text' => 'hotel_renewal'),
    VALUE_TWENTYONE => array(
        'department_name' => TEMP_SUB_REGISTRAR,
        'timeline' => 'Same Day',
        'day' => 1,
        'working_days' => 'fdw_ess',
        'title' => 'Property Registration',
        'key_id_text' => 'property_id',
        'tbl_text' => 'property_registration'),
    VALUE_TWENTYTWO => array(
        'hd' => 'Done',
        'department_name' => TEMP_REV_COLL,
        'timeline' => '5 Days',
        'day' => 5,
        'working_days' => 'fdw',
        'title' => 'Application for Permission from District Collector for Movie Shooting (Integrated with Police & Traffic / State Protected Monument / Municipal Councils)',
        'key_id_text' => 'filmshooting_id',
        'tbl_text' => 'filmshooting'),
    VALUE_TWENTYTHREE => array(
        'department_name' => TEMP_TOURISM,
        'timeline' => '21 Days',
        'day' => 21,
        'working_days' => 'fdw',
        'title' => 'Travel Agency Form - Renewal',
        'key_id_text' => 'travelagent_renewal_id',
        'tbl_text' => 'travelagent_renewal'),
    VALUE_TWENTYFOUR => array(
        'department_name' => TEMP_TOURISM,
        'timeline' => '21 Days',
        'day' => 21,
        'working_days' => 'fdw',
        'title' => 'Tourism Event - Performance',
        'key_id_text' => 'tourismevent_id',
        'tbl_text' => 'tourismevent'),
    VALUE_TWENTYFIVE => array(
        'department_name' => TEMP_DIC,
        'timeline' => '30 Days',
        'day' => 30,
        'working_days' => 'fdw',
        'title' => 'Allotment of land in Industrial Area',
        'key_id_text' => 'landallotment_id',
        'tbl_text' => 'land_allotment'),
    VALUE_TWENTYSIX => array(
        'department_name' => TEMP_PDA,
        'timeline' => '21 Days',
        'day' => 21,
        'working_days' => 'fdw',
        'title' => 'Construction Permission (Include Storage of Construction Material)',
        'key_id_text' => 'construction_id',
        'tbl_text' => 'construction'),
    VALUE_TWENTYSEVEN => array(
        'department_name' => TEMP_PDA,
        'timeline' => '15 Days',
        'day' => 15,
        'working_days' => 'fdw',
        'title' => 'Application for Inspection at Plinth level',
        'key_id_text' => 'inspection_id',
        'tbl_text' => 'inspection'),
    VALUE_TWENTYEIGHT => array(
        'department_name' => TEMP_PDA,
        'timeline' => '30 Days',
        'day' => 30,
        'working_days' => 'fdw',
        'title' => 'Occupancy Certificate / Part Occupancy Certificate',
        'key_id_text' => 'occupancy_certificate_id',
        'tbl_text' => 'occupancy_certificate'),
    VALUE_TWENTYNINE => array(
        'department_name' => TEMP_PDA,
        'timeline' => '10 Days',
        'day' => 10,
        'working_days' => 'fdw',
        'title' => 'Site Elevation ',
        'key_id_text' => 'site_id',
        'tbl_text' => 'site_elevation'),
    VALUE_THIRTY => array(
        'department_name' => TEMP_PDA,
        'timeline' => '07 Days',
        'day' => 7,
        'working_days' => 'fdw',
        'title' => 'Zone Information',
        'key_id_text' => 'zone_id',
        'tbl_text' => 'zone_information'),
    VALUE_THIRTYONE => array(
        'hd' => 'Done',
        'department_name' => TEMP_LABOUR,
        'timeline' => '20 Days',
        'day' => 20,
        'working_days' => 'fdw',
        'title' => "Registration / Renewal of principal employer's establishment under provision of The Contracts Labour (Regulation and Abolition) Act, 1970",
        'key_id_text' => 'establishment_id',
        'tbl_text' => 'establishment'),
    VALUE_THIRTYTWO => array(
        'hd' => 'Done',
        'department_name' => TEMP_LABOUR,
        'timeline' => '20 Days',
        'day' => 20,
        'working_days' => 'fdw',
        'title' => 'Registration / Renewal under "The Building and Other Construction Workers (Regulation of Employment Conditions of Service Act), 1996"',
        'key_id_text' => 'bocw_id',
        'tbl_text' => 'bocw'),
    VALUE_THIRTYTHREE => array(
        'hd' => 'Done',
        'department_name' => TEMP_LABOUR,
        'timeline' => '15 Days',
        'day' => 15,
        'working_days' => 'fdw',
        'title' => 'Registration under "Shops & Establishment Act"',
        'key_id_text' => 's_id',
        'tbl_text' => 'shop'),
    VALUE_THIRTYFOUR => array(
        'hd' => 'Done',
        'department_name' => TEMP_LABOUR,
        'timeline' => '20 Days',
        'day' => 20,
        'working_days' => 'fdw',
        'title' => 'Registration Certificate of "Establishment Inter State Migrant Workmen (RE&CS) Act, 1979 (License of Contractor Establishment)"',
        'key_id_text' => 'mw_id',
        'tbl_text' => 'migrantworkers'),
    VALUE_THIRTYFIVE => array(
        'hd' => 'Done',
        'department_name' => TEMP_FB,
        'timeline' => '20 Days',
        'day' => 20,
        'working_days' => 'fdw',
        'title' => ' Registration of license under The Factories Act, 1948',
        'key_id_text' => 'factorylicence_id',
        'tbl_text' => 'factorylicence'),
    VALUE_THIRTYSIX => array(
        'hd' => 'Done - Fees Not Applicable',
        'department_name' => TEMP_FB,
        'timeline' => '15 Days',
        'day' => 15,
        'working_days' => 'fdw',
        'title' => 'Approval of plan and permission to construct/extend/or take into use any building as a factory under the Factories Act, 1948',
        'key_id_text' => 'buildingplan_id',
        'tbl_text' => 'buildingplan'),
    VALUE_THIRTYSEVEN => array(
        'hd' => 'Done',
        'department_name' => TEMP_FB,
        'timeline' => '30 Days',
        'day' => 30,
        'working_days' => 'fdw',
        'title' => 'Registration of Boilers under The Boilers Act, 1923',
        'key_id_text' => 'boiler_id',
        'tbl_text' => 'boileract'),
    VALUE_THIRTYEIGHT => array(
        'hd' => 'Done - Fees Not Applicable',
        'department_name' => TEMP_FB,
        'timeline' => '15 Days',
        'day' => 15,
        'working_days' => 'fdw',
        'title' => 'Registration / Renewal of Boilers Manufactures under The Boilers Act, 1923',
        'key_id_text' => 'boilermanufacture_id',
        'tbl_text' => 'boilermanufactures'),
    VALUE_THIRTYNINE => array(
        'department_name' => TEMP_LABOUR,
        'timeline' => '20 Days',
        'day' => 20,
        'working_days' => 'fdw',
        'title' => 'Single Annual Return form',
        'key_id_text' => 'singlereturn_id',
        'tbl_text' => 'singlereturn'),
    VALUE_FOURTY => array(
        'hd' => 'Done',
        'department_name' => TEMP_REV_COLL,
        'timeline' => '90 Days',
        'day' => 90,
        'working_days' => 'fdw',
        'title' => ' Change In Land Use ( N.A.)',
        'key_id_text' => 'na_id',
        'tbl_text' => 'na'),
    VALUE_FOURTYONE => array(
        'hd' => 'Done',
        'department_name' => TEMP_FB,
        'timeline' => '60 Days',
        'day' => 60,
        'working_days' => 'fdw',
        'title' => 'Renewal of license under The Factories Act, 1948',
        'key_id_text' => 'factorylicence_renewal_id',
        'tbl_text' => 'factorylicence_renewal'),
    VALUE_FOURTYTWO => array(
        'hd' => 'Done',
        'department_name' => TEMP_LABOUR,
        'timeline' => '20 Days',
        'day' => 20,
        'working_days' => 'fdw',
        'title' => 'Renewal under "Shops and Establishment Act"',
        'key_id_text' => 'shop_renewal_id',
        'tbl_text' => 'shop_renewal'),
    VALUE_FOURTYTHREE => array(
        'hd' => 'Done',
        'department_name' => TEMP_LABOUR,
        'timeline' => '20 Days',
        'day' => 20,
        'working_days' => 'fdw',
        'title' => ' License for Contractors under provision of The Contracts Labour (R & A) Act,1970',
        'key_id_text' => 'aplicence_id',
        'tbl_text' => 'appli_licence'),
    VALUE_FOURTYFOUR => array(
        'hd' => 'Done',
        'department_name' => TEMP_FB,
        'timeline' => '15 Days',
        'day' => 15,
        'working_days' => 'fdw',
        'title' => 'Renewal of Boilers under The Boilers Act, 1923',
        'key_id_text' => 'boiler_renewal_id',
        'tbl_text' => 'boileract_renewal'),
    VALUE_FOURTYFIVE => array(
        'hd' => 'Done',
        'department_name' => TEMP_LABOUR,
        'timeline' => '20 Days',
        'day' => 20,
        'working_days' => 'fdw',
        'title' => 'Renewal Certificate of "Establishment Inter State Migrant Workmen (RE&CS) Act, 1979 (License of Contractor Establishment)"',
        'key_id_text' => 'migrantworkers_renewal_id',
        'tbl_text' => 'migrantworkers_renewal'),
    VALUE_FOURTYSIX => array(
        'hd' => 'Done',
        'department_name' => TEMP_LABOUR,
        'timeline' => '20 Days',
        'day' => 20,
        'working_days' => 'fdw',
        'title' => 'Renewal License for Contractors under provision of The Contracts Labour (R & A) Act,1970',
        'key_id_text' => 'aplicence_renewal_id',
        'tbl_text' => 'appli_licence_renewal'),
    VALUE_FOURTYSEVEN => array(
        'department_name' => TEMP_LABOUR,
        'working_days' => 'fdw',
        'title' => ' I.S.M.W Returnees',
        'key_id_text' => 'ismw_id',
        'tbl_text' => 'ismw'),
    VALUE_FOURTYEIGHT => array(
        'hd' => 'Done',
        'department_name' => TEMP_WM,
        'timeline' => '7 Days',
        'day' => 7,
        'working_days' => 'fdw',
        'title' => 'VC',
        'key_id_text' => 'vc_id',
        'tbl_text' => 'vc'),
    VALUE_FOURTYNINE => array(
        'hd' => 'Done - Fees Not Applicable',
        'department_name' => TEMP_WM,
        'timeline' => '30 Days',
        'day' => 30,
        'working_days' => 'fdw',
        'title' => ' Reporting/Informing/Intimation to Legal Metrology Office',
        'key_id_text' => 'rii_id',
        'tbl_text' => 'rii'),
    VALUE_FIFTY => array(
        'hd' => 'Done - Fees Not Applicable',
        'department_name' => TEMP_WM,
        'timeline' => '30 Days',
        'day' => 30,
        'working_days' => 'fdw',
        'title' => 'Online Registers / Periodical Return Form',
        'key_id_text' => 'periodicalreturn_id',
        'tbl_text' => 'periodicalreturn'),
    VALUE_FIFTYTWO => array(
        'department_name' => TEMP_DIC,
        'timeline' => '30 Days',
        'day' => 30,
        'working_days' => 'fdw',
        'title' => 'Investment Promotion Scheme : 2022 to 2027',
        'key_id_text' => 'ips_incentive_id',
        'tbl_text' => 'ips_incentive'),
    VALUE_FIFTYNINE => array(
        'hd' => 'Done',
        'department_name' => TEMP_FOREST,
        'timeline' => '30 Days',
        'day' => 30,
        'working_days' => 'fdw',
        'title' => 'Tree Cutting Permission',
        'key_id_text' => 'tree_cutting_id',
        'tbl_text' => 'tree_cutting'),
    VALUE_SIXTY => array(
        'hd' => 'Done - Fees Not Applicable',
        'department_name' => TEMP_REV_COLL,
        'timeline' => '30 Days',
        'day' => 30,
        'working_days' => 'fdw',
        'title' => 'Society Registration',
        'key_id_text' => 'society_registration_id',
        'tbl_text' => 'society_registration'),
    VALUE_SIXTYONE => array(
        'hd' => 'Done',
        'department_name' => TEMP_SUB_REGISTRAR,
        'timeline' => '30 Days',
        'day' => 30,
        'working_days' => 'fdw_ess',
        'title' => 'Nil Certificate for Encumbrance',
        'key_id_text' => 'nil_certificate_id',
        'tbl_text' => 'nil_certificate'),
);

$config['prefix_module_array'] = array(
    VALUE_ONE => 'WM',
    VALUE_TWO => 'LR',
    VALUE_THREE => 'LD',
    VALUE_FOUR => 'LM',
    VALUE_FIVE => 'WC',
    VALUE_SIX => 'HR',
    VALUE_SEVEN => 'PFR',
    VALUE_EIGHT => 'CNM',
    VALUE_NINE => 'MS',
    VALUE_TEN => 'TX',
    VALUE_ELEVEN => 'NOC',
    VALUE_TWELVE => 'TRL',
    VALUE_THIRTEEN => 'LES',
    VALUE_FOURTEEN => 'LRR',
    VALUE_FIFTEEN => 'LDR',
    VALUE_SIXTEEN => 'LMR',
    VALUE_SEVENTEEN => 'SUB',
    VALUE_EIGHTEEN => 'SLR',
    VALUE_NINETEEN => 'TA',
    VALUE_TWENTY => 'HRR',
    VALUE_TWENTYONE => 'PR',
    VALUE_TWENTYTWO => 'FS',
    VALUE_TWENTYTHREE => 'TAR',
    VALUE_TWENTYFOUR => 'TE',
    VALUE_TWENTYFIVE => 'ALP',
    VALUE_TWENTYSIX => 'CP',
    VALUE_TWENTYSEVEN => 'INS',
    VALUE_TWENTYEIGHT => 'OC',
    VALUE_TWENTYNINE => 'SE',
    VALUE_THIRTY => 'ZI',
    VALUE_THIRTYONE => 'CLA',
    VALUE_THIRTYTWO => 'BOCW',
    VALUE_THIRTYTHREE => 'SH',
    VALUE_THIRTYFOUR => 'IM',
    VALUE_THIRTYFIVE => 'FL',
    VALUE_THIRTYSIX => 'FBP',
    VALUE_THIRTYSEVEN => 'RUB',
    VALUE_THIRTYEIGHT => 'BM',
    VALUE_THIRTYNINE => 'SAR',
    VALUE_FOURTY => 'NA',
    VALUE_FOURTYONE => 'FLR',
    VALUE_FOURTYTWO => 'SR',
    VALUE_FOURTYTHREE => 'APLC',
    VALUE_FOURTYFOUR => 'FBR',
    VALUE_FOURTYFIVE => 'IMR',
    VALUE_FOURTYSIX => 'APLCR',
    VALUE_FOURTYNINE => 'RII',
    VALUE_FOURTYSEVEN => 'ISMW',
    VALUE_FOURTYEIGHT => 'VC',
    VALUE_FIFTY => 'PR',
    VALUE_FIFTYONE => 'IPS',
    VALUE_FIFTYTWO => 'INC',
    VALUE_FIFTYNINE => 'TCP',
    VALUE_SIXTY => 'SOR',
    VALUE_SIXTYONE => 'NC',
);

define("TRAVEL_AGENCY_FEES", 'Rs. 500');

$config['roles_array'] = array(
    VALUE_ONE => 'Dealing Hand',
    VALUE_TWO => 'Verifier',
    VALUE_THREE => 'Approver');

$config ['employee_status_array'] = array(
    VALUE_ZERO => '<span class="badge bg-danger app-status">Deactive</span>',
    VALUE_ONE => '<span class="badge bg-success app-status">Active</span>',
);

$config['payment_type_array'] = array(
    VALUE_ONE => 'Challan Copy',
    VALUE_TWO => 'Demand Draft (DD) / Pay at Office / Net Banking',
    VALUE_THREE => 'Fees N.A. & Application is Under Process'
);

$config['user_payment_type_array'] = array(
    VALUE_ONE => 'Demand Draft (DD)',
    VALUE_TWO => 'Pay at Office',
    VALUE_THREE => 'Net Banking',
);

$config['service_type_array'] = array(
    VALUE_ONE => 'Pre-Establishment',
    VALUE_TWO => 'Pre-Operation',
    VALUE_THREE => 'Pre-Establishment & Pre-Operation',
    VALUE_FOUR => 'Renewal',
    VALUE_FIVE => 'Post-Establishment',
    VALUE_SIX => 'Post-Operation',
    VALUE_SEVEN => 'Pre-Operation & Post-Operation',
);

$config['query_grievance_status_array'] = array(
    //
    VALUE_ZERO => '<span class="badge bg-warning app-status">Pending</span>',
    VALUE_ONE => '<span class="badge bg-nic-blue app-status">Query Submitted By User</span>',
    VALUE_TWO => '<span class="badge bg-warning app-status">Responded</span>',
);

$config['issue_category_array'] = array(
    VALUE_ONE => 'General Enquiry & Guidance',
    VALUE_TWO => 'Application Approval Status',
    VALUE_THREE => 'Enquiries Requiring Other Department Input',
    VALUE_FOUR => 'Grievance');

$config['department_array'] = array(
    VALUE_ONE => TEMP_PCC,
    VALUE_TWO => TEMP_FIRE,
    VALUE_THREE => TEMP_DIC,
    VALUE_FOUR => TEMP_LABOUR,
    VALUE_FIVE => TEMP_WM,
    VALUE_SIX => TEMP_REV_COLL,
    VALUE_SEVEN => TEMP_FB,
    VALUE_EIGHT => TEMP_ELECTRICITY,
    VALUE_NINE => TEMP_PWD,
    VALUE_TEN => 'Other',
);

$config['sc_inspection_act_array'] = array(
    VALUE_ONE => array('act_id' => VALUE_ONE, 'act_name' => 'Inspection under The Equal Remuneration Act, 1976', 'department' => TEMP_TYPE_LABOUR_DEPT_USER),
    VALUE_TWO => array('act_id' => VALUE_TWO, 'act_name' => 'Inspection under The Minimum Wages Act, 1948', 'department' => TEMP_TYPE_LABOUR_DEPT_USER),
    VALUE_THREE => array('act_id' => VALUE_THREE, 'act_name' => 'Inspection under The GDD Shops and Establishments Act, 1973', 'department' => TEMP_TYPE_LABOUR_DEPT_USER),
    VALUE_FOUR => array('act_id' => VALUE_FOUR, 'act_name' => 'Inspection under The Payment of Bonus Act, 1965', 'department' => TEMP_TYPE_LABOUR_DEPT_USER),
    VALUE_FIVE => array('act_id' => VALUE_FIVE, 'act_name' => 'Inspection under The Payment of Wages Act, 1936', 'department' => TEMP_TYPE_LABOUR_DEPT_USER),
    VALUE_SIX => array('act_id' => VALUE_SIX, 'act_name' => 'Inspection under The Payment of Gratuity Act, 1972', 'department' => TEMP_TYPE_LABOUR_DEPT_USER),
    VALUE_SEVEN => array('act_id' => VALUE_SEVEN, 'act_name' => 'Inspection under The Contract Labour (Regulation and Abolition) Act, 1970', 'department' => TEMP_TYPE_LABOUR_DEPT_USER),
    VALUE_EIGHT => array('act_id' => VALUE_EIGHT, 'act_name' => 'Inspection under The Factories Act, 1948', 'department' => TEMP_TYPE_FB),
    VALUE_NINE => array('act_id' => VALUE_NINE, 'act_name' => 'Inspection under The Boilers Act, 1923', 'department' => TEMP_TYPE_FB),
    VALUE_TEN => array('act_id' => VALUE_TEN, 'act_name' => 'Inspection under The Water (Prevention and Control of Pollution) Act, 1974', 'department' => TEMP_TYPE_PCC),
    VALUE_ELEVEN => array('act_id' => VALUE_ELEVEN, 'act_name' => 'Inspection under The Air (Prevention and Control of Pollution) Act, 1981', 'department' => TEMP_TYPE_PCC),
    VALUE_TWELVE => array('act_id' => VALUE_TWELVE, 'act_name' => 'Inspection under The Environment (Protection) Act, 1986', 'department' => TEMP_TYPE_PCC),
    VALUE_THIRTEEN => array('act_id' => VALUE_THIRTEEN, 'act_name' => 'Inspection under The legal Metrology Act, 2009', 'department' => TEMP_TYPE_WM),
);

$config['inspection_type_array'] = array(
    VALUE_ONE => 'Surprise',
    VALUE_TWO => 'Complaint',
);

$config['cb_type_array'] = array(
    VALUE_ONE => 'Micro',
    VALUE_TWO => 'Small',
    VALUE_THREE => 'Medium',
    VALUE_FOUR => 'Large',
);

$config['msme_type_array'] = array(
    VALUE_ONE => 'Micro (Investment in Plant and Machinery or Equipment : Not more than Rs. 1 crore and Annual Turnover : not more than Rs. 5 crore)',
    VALUE_TWO => 'Small (Investment in Plant and Machinery or Equipment : Not more than Rs. 10 crore and Annual Turnover : not more than Rs. 50 crore)',
    VALUE_THREE => 'Medium (Investment in Plant and Machinery or Equipment : Not more than Rs. 50 crore and Annual Turnover : not more than Rs. 250 crore)',
);

$config['istatus_array'] = array(
    VALUE_ONE => '<span class="badge bg-warning app-status">Pending</span>',
    VALUE_TWO => '<span class="badge bg-nic-blue app-status">Draft</span>',
    VALUE_THREE => '<span class="badge bg-success app-status">Submitted</span>'
);

$config['istatus_text_array'] = array(
    VALUE_ONE => 'Pending',
    VALUE_TWO => 'Draft',
    VALUE_THREE => 'Submitted',
);

$config['sj_inspection_act_array'] = array(
    VALUE_ONE => array('act_id' => VALUE_ONE, 'act_name' => 'Inspection under The Equal Remuneration Act, 1976', 'department' => TEMP_TYPE_LABOUR_DEPT_USER),
    VALUE_TWO => array('act_id' => VALUE_TWO, 'act_name' => 'Inspection under The Factories Act, 1948', 'department' => TEMP_TYPE_LABOUR_DEPT_USER),
    VALUE_THREE => array('act_id' => VALUE_THREE, 'act_name' => 'Inspection under The Maternity Benefit Act, 1961', 'department' => TEMP_TYPE_LABOUR_DEPT_USER),
    VALUE_FOUR => array('act_id' => VALUE_FOUR, 'act_name' => 'Inspection under The Minimum Wages Act, 1948', 'department' => TEMP_TYPE_LABOUR_DEPT_USER),
    VALUE_FIVE => array('act_id' => VALUE_FIVE, 'act_name' => 'Inspection under The Shops and Establishments Act(as applicable)', 'department' => TEMP_TYPE_LABOUR_DEPT_USER),
    VALUE_SIX => array('act_id' => VALUE_SIX, 'act_name' => 'Inspection under The Labour Welfare Fund Act(as applicable)', 'department' => TEMP_TYPE_LABOUR_DEPT_USER),
    VALUE_SEVEN => array('act_id' => VALUE_SEVEN, 'act_name' => 'Inspection under The Payment of Bonus Act, 1965', 'department' => TEMP_TYPE_LABOUR_DEPT_USER),
    VALUE_EIGHT => array('act_id' => VALUE_EIGHT, 'act_name' => 'Inspection under The Payment of Wages Act, 1936', 'department' => TEMP_TYPE_LABOUR_DEPT_USER),
    VALUE_NINE => array('act_id' => VALUE_NINE, 'act_name' => 'Inspection under The Payment of Gratuity Act, 1972', 'department' => TEMP_TYPE_LABOUR_DEPT_USER),
    VALUE_TEN => array('act_id' => VALUE_TEN, 'act_name' => 'Inspection under The Contract Labour (Regulation and Abolition) Act, 1970', 'department' => TEMP_TYPE_LABOUR_DEPT_USER),
);

$config['c_inspection_act_array'] = array(
    VALUE_ONE => array('act_id' => VALUE_ONE, 'act_name' => 'Inspection under The Equal Remuneration Act, 1976', 'department' => TEMP_TYPE_LABOUR_DEPT_USER),
    VALUE_TWO => array('act_id' => VALUE_TWO, 'act_name' => 'Inspection under The Minimum Wages Act, 1948', 'department' => TEMP_TYPE_LABOUR_DEPT_USER),
    VALUE_THREE => array('act_id' => VALUE_THREE, 'act_name' => 'Inspection under The Shops and Establishments Act', 'department' => TEMP_TYPE_LABOUR_DEPT_USER),
    VALUE_FOUR => array('act_id' => VALUE_FOUR, 'act_name' => 'Inspection under The Payment of Bonus Act, 1965', 'department' => TEMP_TYPE_LABOUR_DEPT_USER),
    VALUE_FIVE => array('act_id' => VALUE_FIVE, 'act_name' => 'Inspection under The Payment of Wages Act, 1936', 'department' => TEMP_TYPE_LABOUR_DEPT_USER),
    VALUE_SIX => array('act_id' => VALUE_SIX, 'act_name' => 'Inspection under The Payment of Gratuity Act, 1972', 'department' => TEMP_TYPE_LABOUR_DEPT_USER),
    VALUE_SEVEN => array('act_id' => VALUE_SEVEN, 'act_name' => 'Inspection under The Contract Labour (Regulation and Abolition) Act, 1970', 'department' => TEMP_TYPE_LABOUR_DEPT_USER),
    VALUE_EIGHT => array('act_id' => VALUE_EIGHT, 'act_name' => 'Inspection under The Factories Act, 1948', 'department' => TEMP_TYPE_FB),
    VALUE_NINE => array('act_id' => VALUE_NINE, 'act_name' => 'Inspection under The Indian Boilers Act 1923', 'department' => TEMP_TYPE_FB),
    VALUE_TEN => array('act_id' => VALUE_TEN, 'act_name' => 'Inspection under The Legal Metrology Act, 2009 and Rules Environment', 'department' => TEMP_TYPE_WM),
    VALUE_ELEVEN => array('act_id' => VALUE_ELEVEN, 'act_name' => 'Inspection under The Water (Prevention and Control of Pollution) Act, 1974', 'department' => TEMP_TYPE_PCC),
    VALUE_TWELVE => array('act_id' => VALUE_TWELVE, 'act_name' => 'Inspection under The Air (Prevention and Control of Pollution) Act, 1981', 'department' => TEMP_TYPE_PCC),
    VALUE_THIRTEEN => array('act_id' => VALUE_THIRTEEN, 'act_name' => 'Inspection under The Building Plan Approval', 'department' => TEMP_TYPE_PDA),
    VALUE_FOURTEEN => array('act_id' => VALUE_FOURTEEN, 'act_name' => 'Inspection under The Plinth Level Inspection', 'department' => TEMP_TYPE_PDA),
    VALUE_FIFTEEN => array('act_id' => VALUE_FIFTEEN, 'act_name' => 'Inspection under The Completion / Occupancy Certificate', 'department' => TEMP_TYPE_PDA),
);

$config['constitution_array'] = array(
    VALUE_ONE => 'Proprietorship',
    VALUE_TWO => 'Partnership',
    VALUE_THREE => 'Company / Private Ltd',
    VALUE_FOUR => 'Society / Public Limited',
    VALUE_FIVE => 'Others (SHG, NRLM etc.)'
);

$config['social_status_array'] = array(
    VALUE_ONE => 'Women',
    VALUE_TWO => 'SC/ST',
    VALUE_THREE => 'Physically Disabled',
    VALUE_FOUR => 'Transgender',
    VALUE_FIVE => 'Others'
);

$config['yes_no_array'] = array(
    VALUE_ZERO => '<span class="badge bg-danger app-status">No</span>',
    VALUE_ONE => '<span class="badge bg-success app-status">Yes</span>',
);

$config['user_status_array'] = array(
    VALUE_ZERO => '<span class="badge bg-warning app-status">Pending</span>',
    VALUE_ONE => '<span class="badge bg-success app-status">Active</span>',
);

$config['randomization_status_array'] = array(
    VALUE_ZERO => '<span class="badge bg-warning app-status">Pending</span>',
    VALUE_ONE => '<span class="badge bg-success app-status">Completed</span>',
);

$config['lock_status_array'] = array(
    VALUE_ZERO => '<span class="badge bg-warning app-status">Unlock</span>',
    VALUE_ONE => '<span class="badge bg-success app-status">Lock</span>',
);

define('OTHER_VILLAGE', 999999);

$config['trade_array'] = array(
    VALUE_ONE => 'Petrol/Diesel/CNG pump',
    VALUE_TWO => 'Dealer/Repairer/Manufacturer',
    VALUE_THREE => 'Super Store',
    VALUE_FOUR => 'Grocery/Kirana Store',
    VALUE_FIVE => 'Veg/Fruit Vendor',
    VALUE_SIX => 'Scrap Vendor',
    VALUE_SEVEN => 'Hotel/Bar/ Restaurant',
    VALUE_EIGHT => 'Factory',
    VALUE_NINE => 'Jewellers',
    VALUE_TEN => 'Fair Price Shops',
    VALUE_ELEVEN => 'Other'
);

$config['report_type_array'] = array(
    VALUE_ONE => 'Manufacture to repair weights',
    VALUE_TWO => 'Change in qualified person',
    VALUE_THREE => 'Short delivery of petrol/Diesel pump',
    VALUE_FOUR => 'Dismantle weights & measure from original site',
    VALUE_FIVE => 'Verification of immovable weights & measures',
    VALUE_SIX => 'Excess delivery of petrol/diesel pumps',
    VALUE_ELEVEN => 'Other',
);

$config['capacity_type_array'] = array(
    VALUE_ONE => 'Kg',
    VALUE_TWO => 'g',
    VALUE_THREE => 'mg',
    VALUE_FOUR => 'ml',
    VALUE_FIVE => 'liter',
    VALUE_SIX => 't',
    VALUE_SEVEN => 'c',
);

$config['class_array'] = array(
    VALUE_ONE => 'I',
    VALUE_TWO => 'II',
    VALUE_THREE => 'III',
    VALUE_FOUR => 'IV',
);

$config['verification_place_array'] = array(
    VALUE_ONE => 'LM Office',
    VALUE_TWO => 'Own premises',
);

$config['quantity_units_array'] = array(
    VALUE_ONE => '1',
    VALUE_TWO => '2',
    VALUE_THREE => '3',
    VALUE_FOUR => '4',
    VALUE_FIVE => '5',
    VALUE_SIX => '6',
    VALUE_SEVEN => '7',
    VALUE_EIGHT => '8',
    VALUE_NINE => '9',
    VALUE_TEN => '10',
);
$config['entity_establishment_type_array'] = array(
    VALUE_ONE => 'Commercial',
    VALUE_TWO => 'Individual'
);

$config['trade_type_array'] = array(
    VALUE_TWO => 'Pre-Operation',
    VALUE_THREE => 'Pre-Establishment & Pre-Operation',
    VALUE_FOUR => 'Renewal',
    VALUE_FIVE => 'Post-Establishment',
    VALUE_SIX => 'Post-Operation',
    VALUE_SEVEN => 'Pre-Operation & Post-Operation',
);

$config['unit_category_array'] = array(
    VALUE_ONE => 'MSME',
    VALUE_TWO => 'Non MSME',
);

$config['entrepreneur_category_array'] = array(
    VALUE_ONE => 'New Entrepreneur (Disclaimer will be used to verify this)',
    VALUE_TWO => 'Women Entrepreneur',
    VALUE_THREE => 'Young Entrepreneur (Below 35 years)',
    VALUE_FOUR => 'Differently Abled Entrepreneur',
    VALUE_FIVE => 'Startup'
);

$config['unit_type_array'] = array(
    VALUE_ONE => 'New Manufacturing Unit',
    VALUE_TWO => 'New Service Unit',
    VALUE_THREE => 'Existing Manufacturing Unit',
    VALUE_FOUR => 'Existing Service Unit',
    VALUE_FIVE => 'Diversification or Expansion for Manufacturing Unit',
    VALUE_SIX => 'Diversification or Expansion for Service Unit',
);

$config['sector_category_array'] = array(
    VALUE_ONE => 'Textile',
    VALUE_TWO => 'Non Textile'
);

$config['thrust_sectors_array'] = array(
    VALUE_ONE => 'FURNITURE SECTOR',
    VALUE_TWO => 'MARBLE',
    VALUE_THREE => 'IT & ITES',
    VALUE_FOUR => 'ELECTRIC VEHICLES & SPARE PARTS',
    VALUE_FIVE => 'TOYS',
    VALUE_SIX => 'SEMI-CONDUCTOR INDUSTRIES',
    VALUE_SEVEN => 'MEDICAL EQUIPMENT AND ACCESSORIES',
    VALUE_EIGHT => 'MEDICAL DIAGNOSTICS',
    VALUE_NINE => 'AYUSH PRODUCTS MANUFACTURING UNITS',
    VALUE_TEN => 'FOOD PROCESSING INDUSTRIES',
    VALUE_ELEVEN => 'MARINE PRODUCTS PROCESSING UNITS',
    VALUE_TWELVE => 'VACCINE MANUFACTURING UNITS'
);

$config['owner_category_array'] = array(
    VALUE_ONE => 'Proprietor',
    VALUE_TWO => 'Partner',
    VALUE_THREE => 'Director',
);

$config['caste_category_array'] = array(
    VALUE_ONE => 'SC',
    VALUE_TWO => 'ST',
    VALUE_THREE => 'OBC',
    VALUE_FOUR => 'EWS',
    VALUE_FIVE => 'General'
);

$config['scheme_type_array'] = array(
    VALUE_ONE => 'I. SCHEME A. MSME SECTOR',
    VALUE_TWO => 'II. SCHEME B. TEXTILE SECTOR',
    VALUE_THREE => 'III. SCHEME C. THRUST SECTORS',
    VALUE_FOUR => 'IV. SCHEME D. GENERAL',
    VALUE_FIVE => 'V. SCHEME E. HANDICRAFT ARTISANS AND COTTAGE INDUSTRIES'
);

$config['scheme_array'] = array(
    VALUE_ONE => 'A.1 ASSISTANCE OF FIXED CAPITAL INVESTMENT SUBSIDY',
    VALUE_TWO => 'A.2 ASSISTANCE OF INTEREST SUBSIDY',
    VALUE_THREE => 'A.3 ASSISTANCE FOR QUALITY CERTIFICATION',
    VALUE_FOUR => 'A.4 ASSISTANCE FOR PATENT REGISRATION / TRADE MARK REGISTRATION',
    VALUE_FIVE => 'A.5 ASSITANCE FOR ZED CERTIFICATION',
    VALUE_SIX => 'A.6 ASSISTANCE FOR SAVING IN CONSUMPTION OF ENERGY AND WATER',
    VALUE_SEVEN => 'A.7 ASSISTANCE FOR ENTREPRENEURSHIP UNDER SKILL DEVELOPMENT',
    VALUE_EIGHT => 'A.8 ASSISTANCE TO SMALL & MEDIUM ENTERPRISES (SME) FOR RAISING OF CAPITAL THROUGH SMALL & MEDIUM ENTERPRISES (SME) EXCHANGE',
    VALUE_NINE => 'A.9 INCENTIVES FOR DOUBLING OF EXPORT VALUES',
    VALUE_TEN => 'A.10 REIMBURSEMENT OF FREE ON BOARD (FOB) EXPENSES',
    VALUE_ELEVEN => 'A.11 ASSISTANCE FOR CAPITAL INVESTMENT IN SOLAR POWER GENERATION',
    VALUE_TWELVE => 'A.12 ASISTANCE FOR PARTICIPATION IN INDUSTRIAL EXHIBITIONS ABROAD',
    VALUE_THIRTEEN => 'A.13 INCENTIVES FOR LOCAL EMPLOYMENT',
    VALUE_FOURTEEN => 'A.14 AWARDS FOR MSMEs',
    VALUE_FIFTEEN => 'B.1 ASSISTANCE OF INTEREST SUBSIDY FOR TEXTILE SECTOR',
    VALUE_SIXTEEN => 'C.1 ASSISTANCE FOR FURNITURE SECTOR',
    VALUE_SEVENTEEN => 'C.2 ASSISTANCE FOR MARBLE, IT & ITES, ELECTRIC VEHICLES & SPARE PARTS, TOYS AND SEMI-CONDUCTOR INDUSTRIES SECTORS',
    VALUE_EIGHTEEN => 'C.3 SCHEME FOR MEDICAL EQUIPMENT AND ACCESSORIES, MEDICAL DIAGNOSTICS AND AYUSH PRODUCTS MANUFACTURING UNITS',
    VALUE_NINETEEN => 'C.4 SCHEME FOR FOOD PROCESSING INDUSTRIES',
    VALUE_TWENTY => 'C.5 SCHEME FOR MARINE PRODUCTS PROCESSING UNITS',
    VALUE_TWENTYONE => 'C.6 SCHEME FOR VACCINE MANUFACTURING UNITS',
    VALUE_TWENTYTWO => 'D.1 SCHEME FOR REIMBURSEMENT OF STAMP DUTY',
    VALUE_TWENTYTHREE => 'D.2 ENVIRONMENT PROTECTION INFRASTRUCTURE SUBSIDY',
    VALUE_TWENTYFOUR => 'E.1 ASSISTANCE FOR CAPITAL INVESTMENT FOR THE HANDICRAFTS AND HANDLOOM ARTISANS OF THE U.T REQUIRING FINANCIAL ASSISTANCE FOR PURCHASE OF MACHINERY OR RAW MATERIALS',
    VALUE_TWENTYFIVE => 'E.2 ASSISTANCE FOR CAPITAL INVESTMENT TO UPLIFT THE ECONOMIC CONDITION OF ARTISANS/PERSONS',
    VALUE_TWENTYSIX => 'E.3 FINANCIAL ASSISTANCE TO COTTAGE INDUSTRIES'
);

$config['scheme_doc_array'] = array(
    VALUE_ONE => array(
        VALUE_ONE => 'Scheme application form. <span class="color-nic-red">*</span>',
        VALUE_TWO => 'Undertaking on Rs.100/- Stamp Paper.',
        VALUE_THREE => 'Copy of Loan Sanction letter from the Bank / Financial Institution in respect of Bank / Institutional financed Enterprises and Disbursement letter from Bank.',
        VALUE_FOUR => 'Copy of the invoices, cash bills and stamped receipts duly attested. The bank scroll which shows the payment, with the details of the machinery supplier, should be furnished, with the attestation of the Bank Manager.',
        VALUE_FIVE => 'Certificate of Chartered Accountant for fixed assets created as on date of commencement of commercial production in the prescribed form.',
        VALUE_SIX => 'Valuation report of building from Government Approved Architect / Valuer / Chartered Engineer.',
        VALUE_SEVEN => 'Chartered Accountant Certificate for the investment made in Fixed Assets viz., Land, Building and Plant and machinery and eligible GFCI as per the prescribed format.',
        VALUE_EIGHT => 'Copy of the first sale invoice raised after commencement of Commercial Production or copy of first delivery challan in case of enterprises manufacturing on job work basis and copy of last sale invoice at the time of submission of application.',
        VALUE_NINE => 'Other Statutory clearances/licenses, as applicable.',
        VALUE_TEN => 'For self fabricated Plant and Machinery items :<br>'
        . 'a) Chartered Engineer’s Certificate for the value of the plant and machinery.<br>'
        . 'b) Chartered Accountant Certificate for the expenses incurred for the purchase of Plant and machinery to be furnished.<br>'
        . 'c) Copy of the invoices, cash bills , job work bills and stamped receipt dulyattested.',
        VALUE_ELEVEN => 'Additional documents in respect of existing enterprises taking up expansion / diversification. Certificate from Chartered Accountant on the following :<br>'
        . 'a) Date of commencement of commercial production after expansion / diversification.<br>'
        . 'b) Annual production turnover for the last 3 years before the date of commencement of commercial production under expansion/ diversification.<br>'
        . 'c) Value of fixed assets before Expansion/diversification , on Expansion /diversification and after Expansion / diversification % increase of fixedassets due to Expansion / diversification.<br>'
        . 'd) Production capacity / Turnover (both in terms of units and value in Rs.) before expansion/diversification, after expansion / diversificationand % increase of production capacity / Turnover due to expansion /diversification.'
    ),
    VALUE_TWO => array(
        VALUE_ONE => 'Scheme application form. <span class="color-nic-red">*</span>',
        VALUE_TWO => 'Undertaking on Rs.100/- Stamp Paper.',
        VALUE_THREE => 'Copy of Loan Sanction letter from the Bank / Financial Institution in respect Bank / Institutional financed Enterprises.',
        VALUE_FOUR => 'Copy of the invoices, cash bills and stamped receipts duly attested. Bank scroll which shows the payment, with the details of the machinery supplier, should be furnished, in original, with the attestation of the Bank Manager.',
        VALUE_FIVE => 'Certificate of Chartered Accountant for fixed assets created as on date of commencement of commercial production in the prescribed form.',
        VALUE_SIX => 'Valuation report of building from Government Approved Architect / Valuer / Chartered Engineer.',
        VALUE_SEVEN => 'Chartered Accountant Certificate for the investment made in Fixed Assets viz., Land, Building and Plant and machinery and eligible GFCI as per the prescribed format.',
        VALUE_EIGHT => 'Copy of the first sale invoice raised after commencement of Commercial Production or copy of first delivery challan in case of enterprises manufacturing on job work basis or first invoice of the services rendered and copy of last sale invoice at the time of submission of application.',
        VALUE_NINE => 'Copy of the loan sanction letter including Loan repayment schedule, Terms & Conditions of the credit facilities like monthly installment of repayment of principle amount and interest amount, extended by Bank/Financial Institution.',
        VALUE_TEN => 'Bank Certificate on actual loan repayment for calculation of interest subsidy based to be submitted at the time of disbursement of loan, in format at Annexure for Capital/Interest Subsidy based on actual repayment of loan.',
        VALUE_ELEVEN => 'Other Statutory clearances/licenses, as applicable.',
        VALUE_TWELVE => 'The applicant shall submit necessary repayment details every year/half yearly for disbursement of interest subsidy in tranches as per attached Annexure for Interest Subsidy For 5 Years',
        VALUE_THIRTEEN => 'Declaration as per the Given format from the Applicant.',
        VALUE_FOURTEEN => 'CA Certificate certifying the Annual Production, Sales Turnover and Power Consumption as on 31st March of Every Financial Year.',
        VALUE_FIFTEEN => 'Bank Statement duly certified by the Applicant for a Particular Financial Year',
    ),
    VALUE_THREE => array(
        VALUE_ONE => 'Scheme application form. <span class="color-nic-red">*</span>',
        VALUE_TWO => 'Undertaking on Rs.100/- Stamp Paper.',
        VALUE_THREE => 'Copy of certificate for national / international Certification i.e. BIS / ISI / WHO / GMP / Hallmark etc. and other national / international certification',
        VALUE_FOUR => 'Proof of Certification bodies accredited to NABCB as available at www.qcin.org.',
        VALUE_FIVE => 'Project report of Quality certification.',
        VALUE_SIX => 'Chartered Accountant Certificate on Expenditure on Quality Certification project as per Annexure for Quality Certification.',
        VALUE_SEVEN => 'List of testing equipment and machinery procured for Certification',
        VALUE_EIGHT => 'Copy of the invoices, cash bills and stamped receipt duly attested of payment of fees and testing equipment and machinery required for above certification. The bank scroll which shows the payment, with the details of the machinery supplier, should be furnished, in original, with the attestation of the Bank Manager. (Attach proof of online payment/Bank Statement).',
    ),
    VALUE_FOUR => array(
        VALUE_ONE => 'Scheme application form. <span class="color-nic-red">*</span>',
        VALUE_TWO => 'Undertaking on Rs.100/- Stamp Paper.',
        VALUE_THREE => 'Copy of Patent / Trade Mark Registration.',
        VALUE_FOUR => 'Project report of Patent / Trademark Registration.',
        VALUE_FIVE => 'Expenditure statement as per Annexure for Patent / Trade Mark Registration.',
        VALUE_SIX => 'Copy of the invoices, cash bills and stamped receipt duly attested of payment of fees and testing equipment and machinery required for above certification. The bank scroll which shows the payment, with the details of the machinery supplier, should be furnished, in original, with the attestation of the Bank Manager. (Attach proof of online payment/Bank Statement).',
    ),
    VALUE_FIVE => array(
        VALUE_ONE => 'Scheme application form. <span class="color-nic-red">*</span>',
        VALUE_TWO => 'Undertaking on Rs.100/- Stamp Paper.',
        VALUE_THREE => 'Copy of Zero Defect and Zero Effect (ZED) Certificate.',
        VALUE_FOUR => 'Project report for ZED certification.',
        VALUE_FIVE => 'Expenditure statement as per Annexure for ZED Certification.',
        VALUE_SIX => 'Copy of the invoices, cash bills and stamped receipt duly attested of
        payment of fees and testing equipment and machinery required for above
        certification. The bank scroll which shows the payment, with the details
        of the machinery supplier, should be furnished, in original, with the
        attestation of the Bank Manager. (Attach proof of online payment / Bank
        Statement).',
    ),
    VALUE_SIX => array(
        VALUE_ONE => 'Scheme application form. <span class="color-nic-red">*</span>',
        VALUE_TWO => 'Undertaking on Rs.100/- Stamp Paper.',
        VALUE_THREE => 'Copy of audit report including suggestion recommendations from
        auditing agency.',
        VALUE_FOUR => 'Project report for saving in consumption of energy and water.',
        VALUE_FIVE => 'Expenditure statement as per Annexure for Saving in Consumption of
        Energy and Water',
        VALUE_SIX => 'Certified copy of report on result / benefits after implementation of
        energy / water saving equipment i.e. decrease in conservation of water /
        electricity in Nos/units/liters etc. from a qualified auditing agency.',
        VALUE_SEVEN => 'List of equipment recommended by auditing authority.',
        VALUE_EIGHT => 'List of equipment procured and installed certified by auditing agency.',
        VALUE_NINE => 'Copy of the invoices, cash bills and stamped receipt duly attested of
        payment of fees and testing equipment and machinery. The bank scroll
        which shows the payment, with the details of the machinery supplier,
        should be furnished, in original, with the attestation of the Bank Manager.
        (Attach proof of online payment / Bank Statement).',
    ),
    VALUE_SEVEN => array(
        VALUE_ONE => 'Scheme application form. <span class="color-nic-red">*</span>',
        VALUE_TWO => 'Undertaking on Rs.100/- Stamp Paper.',
        VALUE_THREE => 'Copy of training certificate.',
        VALUE_FOUR => 'Expenditure statement as per Annexure for Entrepreneurship
        Development Training Under Skill Development.',
        VALUE_FIVE => 'Copy of receipts of payment of fees.',
        VALUE_SIX => 'Copy of the invoices, cash bills and stamped receipt duly attested of
        payment of fees. (Attach proof of online payment / Bank Statement).',
    ),
    VALUE_EIGHT => array(
        VALUE_ONE => 'Scheme application form. <span class="color-nic-red">*</span>',
        VALUE_TWO => 'Undertaking on Rs.100/- Stamp Paper.',
        VALUE_THREE => 'Copy of SME Exchange Registration / Permission',
        VALUE_FOUR => 'Other Registrations / Licenses / Approval / Permissions',
        VALUE_FIVE => 'Copy of Application form prepared by enterprise & approved by SEBI
        for Equity Capital issue.',
        VALUE_SIX => 'Detailed Project Report (DPR).',
        VALUE_SEVEN => 'Copy of Public Issue Brochure.',
        VALUE_EIGHT => 'C.A Certificate for Equity Capital raised through SME Exchange',
        VALUE_NINE => 'Proof for Commencement of Commercial production (First Sale Bill).',
        VALUE_TEN => 'Chartered Accountant Certificate on Expenditure incurred on raising of
        fund through SME Exchange as per Annexure for Raising of Fund
        through SME Exchange.',
    ),
    VALUE_NINE => array(
        VALUE_ONE => 'Scheme application form. <span class="color-nic-red">*</span>',
        VALUE_TWO => 'Undertaking on Rs.100/- Stamp Paper.',
        VALUE_THREE => 'Copy of UDYAM Registration.',
        VALUE_FOUR => 'Chartered Accountant certificate for FOB exports claim per year and
        preceding year as per Annexure for Doubling of Export Values.',
    ),
    VALUE_TEN => array(
        VALUE_ONE => 'Scheme application form. <span class="color-nic-red">*</span>',
        VALUE_TWO => 'Undertaking on Rs.100/- Stamp Paper.',
        VALUE_THREE => 'Chartered Accountant certificate for Export and FOB expenses in format
        at Annexure for Reimbursement of FOB Expenses.',
        VALUE_FOUR => 'Copy of Commercial Invoices.',
        VALUE_FIVE => 'Copy of Certificate of Origin.',
        VALUE_SIX => 'Copy of Bill of Loading - bill of loading acknowledges that the relative
        goods have been received on board the specified vessel / Aircraft.',
        VALUE_SEVEN => 'Copy of Shipping Bill stating the details of the goods being exported,
        accepted and assigned a unique number by the Indian Customs Electronic
        Data Interchange System.',
        VALUE_EIGHT => 'Copy of Customs Duty payment.',
        VALUE_NINE => 'Documents of the following FOB related expenses (As applicable):<br>
        1.Loading on carrier charges.<br>
        2.Transportation charges up to Customs.<br>
        3.Unloading charges.<br>
        4.Amount paid under Customs duty.<br>
        5.Customs clearance charges.<br>
        6.Local Insurance.<br>
        7.GST.<br>
        8.Loading on board Charges.',
    ),
    VALUE_ELEVEN => array(
        VALUE_ONE => 'Scheme application form. <span class="color-nic-red">*</span>',
        VALUE_TWO => 'Undertaking on Rs.100/- Stamp Paper.',
        VALUE_THREE => 'Copy of project report of Solar Power Plant.',
        VALUE_FOUR => 'Certificate of Chartered Accountant for fixed assets of Solar Power Plant
        created during the scheme period and as on date of commencement of
        generation of solar power in prescribed form (Annexure for Solar Power
        Plant Project).',
        VALUE_FIVE => 'Power consumption details before (3 months) and after commencement
        of Solar Power Generation in format at Annexure for Before and After
        Commencement of Solar Power Generation.',
        VALUE_SIX => 'Copy of Loan Sanction letter from the Bank / Financial Institution in
        respect Bank / Institutional financed Enterprises.',
        VALUE_SEVEN => 'Copy of the invoices, cash bills and stamped receipts duly attested. The
        bank scroll which shows the payment, with the details of the machinery
        supplier, should be furnished, in original, with the attestation of the Bank
        Manager.',
        VALUE_EIGHT => 'Certificate of commencement of Solar power generation duly signed by
        Chartered Engineer.',
        VALUE_NINE => 'Self-declaration regarding use of solar power daily as per availability.',
        VALUE_TEN => 'Certificate of CA for Capital Subsidy for Solar Plant',
    ),
    VALUE_TWELVE => array(
        VALUE_ONE => 'Scheme application form. <span class="color-nic-red">*</span>',
        VALUE_TWO => 'Undertaking on Rs.100/- Stamp Paper.',
        VALUE_THREE => 'Copy of Aadhar card of delegate.',
        VALUE_FOUR => ' Profile of the company.',
        VALUE_FIVE => 'Passport, Visa and page containing stamping of immigration
        authority in India and destination country.',
        VALUE_SIX => 'Air ticket.',
        VALUE_SEVEN => 'Duly filled application form',
        VALUE_EIGHT => 'Attested Copy of Boarding Passes',
        VALUE_NINE => 'Attested Copy of Hotel bill',
        VALUE_TEN => 'CA Certificate for having incurred the claimed expenditure in
        format at Annexure for Having Incurred the Claimed Expenditure.',
        VALUE_ELEVEN => 'Attested Copy of Agreement regarding booking of space for
        exhibition with details of space area and rent.',
        VALUE_TWELVE => 'Attested Copy of Stall rent receipt',
        VALUE_THIRTEEN => 'Tour report on letterhead with signature',
        VALUE_FOURTEEN => 'Copy of order any financial assistance granted by Govt. of India /
        Others, if any along with details of assistance.',
        VALUE_FIFTEEN => 'Copy of pamphlets for advertisement.',
        VALUE_SIXTEEN => 'Copy of invoice of space rent.',
        VALUE_SEVENTEEN => 'Copy of voucher and Bank scroll of transaction of payment of
        space rent.',
    ),
    VALUE_THIRTEEN => array(
        VALUE_ONE => 'Scheme application form. <span class="color-nic-red">*</span>',
        VALUE_TWO => 'Undertaking on Rs.100/- Stamp Paper.',
        VALUE_THREE => 'Certificate regarding employment from Chartered Accountant.',
        VALUE_FOUR => 'CA Certificate regarding project expenditure and date of
        commencement of production as per format at Annexure for
        Capital/Interest subsidy.',
        VALUE_FIVE => 'CA Certificate regarding details of employees recruited for the project
        which has commenced production during the scheme period ,as per
        format at Annexure for Details of Employees.',
        VALUE_SIX => 'CA Certificate regarding details of expenditure on salaries of local
        people recruited for the project which has commenced production
        during the scheme period, for 12 months, as per format at Annexure for
        Monthly Salary Details of Local Employees.',
        VALUE_SEVEN => 'Copy of order any financial assistance granted by Govt. of India /
        Others, if any along with details of assistance.',
    ),
    VALUE_FOURTEEN => array(
        VALUE_ONE => 'Scheme application form. <span class="color-nic-red">*</span>',
        VALUE_TWO => 'Undertaking on Rs.100/- Stamp Paper.',
        VALUE_THREE => 'Chartered Accountant certificate on details of turnover and employees
        as per Annexure for Details of Turnover and Employees.',
        VALUE_FOUR => 'Certificate of commencement of commercial production duly signed by
        Chartered Accountant as per Annexure for Capital/Interest subsidy.',
        VALUE_FIVE => 'Chartered Accountant certificate on details of Exports',
        VALUE_SIX => 'Chartered Accountant certificate on details of International
        Certification.',
        VALUE_SEVEN => 'Write up about entrepreneur as per the format at Annexure for Awards
        for MSME’s.',
    ),
    VALUE_FIFTEEN => array(
        VALUE_ONE => 'Scheme application form. <span class="color-nic-red">*</span>',
        VALUE_TWO => 'Undertaking on Rs.100/- Stamp Paper.',
        VALUE_THREE => 'Copy of Loan Sanction letter from the Bank / Financial Institution in respect
        Bank / Institutional financed Enterprises.',
        VALUE_FOUR => 'Copy of the invoices, cash bills and stamped receipts duly attested. The
        bank scroll which shows the payment, with the details of the machinery
        supplier, should be furnished, in original, with the attestation of the Bank
        Manager.',
        VALUE_FIVE => 'Certificate of Chartered Accountant for fixed assets created as on date of
        commencement of commercial production in the prescribed form.',
        VALUE_SIX => 'Valuation report of building from Government Approved Architect / Valuer
        / Chartered Engineer.',
        VALUE_SEVEN => 'Chartered Accountant Certificate for the investment made in Eligible Fixed
        Assets viz., Land, Building and Plant and machinery as per the prescribed
        format.',
        VALUE_EIGHT => 'Copy of the first sale invoice raised after commencement of Commercial
        Production or copy of first delivery challan in case of enterprises
        manufacturing on job work basis and copy of last sale invoice at the time of
        submission of application.',
        VALUE_NINE => 'Copy of the loan sanction letter including Loan repayment schedule, Terms
        & Conditions of the credit facilities like monthly installment of repayment
        of principle amount and interest amount, extended by Bank/Financial
        Institution.',
        VALUE_TEN => 'Statutory Auditor / Chartered Accountant certificate regarding tentative
        calculation of interest subsidy for the eligible period based on repayment
        schedule of Bank in format at Annexure for Interest Subsidy For 5 Years.',
        VALUE_ELEVEN => 'Bank Certificate on actual loan repayment for calculation of interest subsidy
        based to be submitted at the time of disbursement of loan, in format at
        Annexure for Capital/Interest Subsidy based on actual repayment of loan.',
        VALUE_TWELVE => 'Other Statutory clearances/licenses, as applicable.',
        VALUE_THIRTEEN => 'Documentary proof of Export oriented Carpet industry.',
        VALUE_FOURTEEN => 'The applicant shall submit necessary repayment details every year/half
        yearly for disbursement of interest subsidy in tranches.',
        VALUE_FIFTEEN => 'Declaration as per the Given format from the Applicant.',
        VALUE_SIXTEEN => 'CA Certificate certifying the Annual Production, Sales Turnover and Power Consumption as on 31st March of Every Financial Year.',
        VALUE_SEVENTEEN => 'Bank Statement duly certified by the Applicant for a Particular Financial Year',
    ),
    VALUE_SIXTEEN => array(
        VALUE_ONE => 'Scheme application form. <span class="color-nic-red">*</span>',
        VALUE_TWO => 'Undertaking on Rs.100/- Stamp Paper.',
        VALUE_THREE => '<div class="text-primary">For Capital Investment subsidy.</div>
            Certificate from Company’s Statutory Auditor in case of companies
        incorporated under ROC / Chartered Accountant in case of
        Proprietary/Partnership firms, for the investment made in Eligible Fixed
        Assets as per the definition of GFCI in IPS-2022, as per format at
        Annexure for Capital/Interest Subsidy or Certificate to be furnished from
        the Company Chartered Accountant / Statutory Auditor, as applicable.',
        VALUE_FOUR => '<div class="text-primary">For Capital Investment subsidy.</div>Chartered Accountant Certificate for the investment made in Eligible Fixed
        Assets viz., Land, Building and Plant and machinery as per format at
        Annexure for Chartered Accountant Certificate.',
        VALUE_FIVE => '<div class="text-primary">For Capital Investment subsidy.</div>Statutory Auditor / Chartered Accountant certificate regarding date of
        commencement of commercial production cum first invoice raised for the
        new/expansion project in format at Annexure for First Sale Invoice.',
        VALUE_SIX => '<div class="text-primary">For Capital Investment subsidy.</div>Copy of the invoices of the plant and machinery purchased duly attested
        by the Authorised signatory of the company/concern and evidence for the
        settlement of the invoices.',
        VALUE_SEVEN => '<div class="text-primary">For Capital Investment subsidy.</div>The documents for new machinery such as copy of Letter of Credit, Bill of
        Entry, Bill of Lading, duty and details of clearing charges paid etc., shall
        be furnished.',
        VALUE_EIGHT => '<div class="text-primary">For Capital Investment subsidy.</div>Chartered Accountant Certificate on annual production and sales in format
        at Annexure for Details of Production and Sales.',
        VALUE_NINE => '<div class="text-primary">For Capital Investment subsidy.</div>Copy of order any financial assistance granted by Govt. of India / Others,
        if any along with details of assistance.',
        VALUE_TEN => '<div class="text-primary">For Incentives of Interest subsidy</div>
        Copy of Loan Sanction letter from the Bank / Financial Institution in respect Bank / Institutional financed Enterprises.',
        VALUE_ELEVEN => '<div class="text-primary">For Incentives of Interest subsidy</div>
        Certificate of Chartered Accountant for fixed assets created as on date of commencement of commercial production in the prescribed form.',
        VALUE_TWELVE => '<div class="text-primary">For Incentives of Interest subsidy</div>
            Valuation report of building from Government Approved Architect / Valuer / Chartered Engineer.',
        VALUE_THIRTEEN => '<div class="text-primary">For Incentives of Interest subsidy</div>
            Chartered Accountant Certificate for the investment made in Eligible Fixed Assets viz., Land, Building and Plant and machinery as per the prescribed format.',
        VALUE_FOURTEEN => '<div class="text-primary">For Incentives of Interest subsidy</div>
            Copy of the first sale invoice raised after commencement of
        Commercial Production or copy of first delivery challan in case of
        enterprises manufacturing on job work basis and copy of last sale
        invoice at the time of submission of application.',
        VALUE_FIFTEEN => '<div class="text-primary">For Incentives of Interest subsidy</div>
            Copy of the loan sanction letter including Loan repayment schedule,
        Terms & Conditions of the credit facilities like monthly installment
        of repayment of principle amount and interest amount, extended by
        Bank/Financial Institution.',
        VALUE_SIXTEEN => '<div class="text-primary">For Incentives of Interest subsidy</div>
            Statutory Auditor / Chartered Accountant certificate regarding
        tentative calculation of interest subsidy for the eligible period based
        on repayment schedule of Bank in format at Annexure for Interest
        Subsidy For 5 Years.',
        VALUE_SEVENTEEN => '<div class="text-primary">For Incentives of Interest subsidy</div>
            Bank Certificate on actual loan repayment for calculation of interest
        subsidy based to be submitted at the time of disbursement of loan, in
        format at Annexure for Capital/Interest Subsidy based on actual
        repayment of loan.',
        VALUE_EIGHTEEN => '<div class="text-primary">For Incentives of Interest subsidy</div>
            The applicant shall submit necessary repayment details every
        year/half yearly for disbursement of interest subsidy in tranches.',
        VALUE_NINETEEN => '<div class="text-primary">For subsidy on cost of establishment of showroom for display & sale</div>'
        . 'Copy of registered lease deed / rent agreement of showroom, if any.',
        VALUE_TWENTY => '<div class="text-primary">For subsidy on cost of establishment of showroom for display & sale</div>
            Chartered Accountant Certificate regarding Cost of establishment of
        showroom for display & sale, in format at Annexure for Establishment of
        Showroom.',
        VALUE_TWENTYONE => '<div class="text-primary">For subsidy on cost of establishment of showroom for display & sale</div> Month-wise calculation of rent for showroom for display & sale, for 3 years.',
        VALUE_TWENTYTWO => '<div class="text-primary">Space rent subsidy for participation in industrial exhibitions in foreign countries</div>'
        . 'Photos of exhibits during exhibition.',
        VALUE_TWENTYTHREE => '<div class="text-primary">Space rent subsidy for participation in industrial exhibitions in foreign countries</div>Copy of pamphlets of exhibition.',
        VALUE_TWENTYFOUR => '<div class="text-primary">Space rent subsidy for participation in industrial exhibitions in foreign countries</div>Certified copy of voucher and Bank scroll of transaction.',
        VALUE_TWENTYFIVE => '<div class="text-primary">Space rent subsidy for participation in industrial exhibitions in foreign countries</div>Receipt / online payment transaction detail of payment of space rent.',
        VALUE_TWENTYSIX => '<div class="text-primary">Incentive for course fee for training in manufacture of modern furniture.</div>Copy of certificate of training.',
        VALUE_TWENTYSEVEN => '<div class="text-primary">Incentive for course fee for training in manufacture of modern furniture.</div>Copy of receipt of fees payment.',
        VALUE_TWENTYEIGHT => '<div class="text-primary">Power rate incentive</div>Chartered Accountant Certificate on energy consumption in format at
        Annexure for Electricity Consumed.',
    ),
    VALUE_SEVENTEEN => array(
        VALUE_ONE => 'Scheme application form. <span class="color-nic-red">*</span>',
        VALUE_TWO => 'Undertaking on Rs.100/- Stamp Paper.',
        VALUE_THREE => 'Copy of Loan Sanction letter from the Bank / Financial Institution in
        respect Bank / Institutional financed Enterprises.',
        VALUE_FOUR => 'Copy of the invoices, cash bills and stamped receipts duly attested. In case
        of non-availability of receipts, the bank scroll which shows the payment,
        with the details of the machinery supplier, should be furnished, in original,
        with the attestation of the Bank Manager.',
        VALUE_FIVE => 'Certificate of Chartered Accountant for fixed assets created as on date of
        commencement of commercial production in the prescribed form.',
        VALUE_SIX => 'Valuation report of building from Government Approved Architect / Valuer
        / Chartered Engineer.',
        VALUE_SEVEN => 'Chartered Accountant Certificate for the investment made in Eligible Fixed
        Assets viz., Land, Building and Plant and machinery as per the prescribed
        format.',
        VALUE_EIGHT => 'Copy of the first sale invoice raised after commencement of Commercial
        Production or copy of first delivery challan in case of enterprises
        manufacturing on job work basis and copy of last sale invoice at the time of
        submission of application.',
        VALUE_NINE => 'Copy of the loan sanction letter including Loan repayment schedule, Terms
        & Conditions of the credit facilities like monthly installment of repayment
        of principle amount and interest amount, extended by Bank/Financial
        Institution.',
        VALUE_TEN => 'Statutory Auditor / Chartered Accountant certificate regarding tentative
        calculation of interest subsidy for the eligible period based on repayment
        schedule of Bank in format at Annexure for Interest Subsidy For 5 Years.',
        VALUE_ELEVEN => 'Bank Certificate on actual loan repayment for calculation of interest subsidy
        based to be submitted at the time of disbursement of loan, in format at
        Annexure for Capital/Interest Subsidy based on actual repayment of loan.',
        VALUE_TWELVE => 'Other Statutory clearances/licenses, as applicable.',
        VALUE_THIRTEEN => 'The applicant shall submit necessary repayment details every year/half
        yearly for disbursement of interest subsidy in tranches.',
    ),
    VALUE_EIGHTEEN => array(
        VALUE_ONE => 'Scheme application form. <span class="color-nic-red">*</span>',
        VALUE_TWO => 'Undertaking on Rs.100/- Stamp Paper.',
        VALUE_THREE => 'Copy of Loan Sanction letter from the Bank / Financial Institution in
        respect Bank / Institutional financed Enterprises.',
        VALUE_FOUR => 'Copy of the invoices, cash bills and stamped receipts duly attested. In case
        of non-availability of receipts, the bank scroll which shows the payment,
        with the details of the machinery supplier, should be furnished, in original,
        with the attestation of the Bank Manager.',
        VALUE_FIVE => 'Certificate of Chartered Accountant for fixed assets created as on date of
        commencement of commercial production in the prescribed form.',
        VALUE_SIX => 'Valuation report of building from Government Approved Architect / Valuer
        / Chartered Engineer.',
        VALUE_SEVEN => 'Chartered Accountant Certificate for the investment made in Eligible Fixed
        Assets viz., Land, Building and Plant and machinery as per the prescribed
        format.',
        VALUE_EIGHT => 'Copy of the first sale invoice raised after commencement of Commercial
        Production or copy of first delivery challan in case of enterprises
        manufacturing on job work basis and copy of last sale invoice at the time of
        submission of application.',
        VALUE_NINE => 'Copy of the loan sanction letter including Loan repayment schedule, Terms
        & Conditions of the credit facilities like monthly installment of repayment
        of principle amount and interest amount, extended by Bank/Financial
        Institution.',
        VALUE_TEN => 'Statutory Auditor / Chartered Accountant certificate regarding tentative
        calculation of interest subsidy for the eligible period based on repayment
        schedule of Bank in format at Annexure for Interest Subsidy For 5 Years.',
        VALUE_ELEVEN => 'Bank Certificate on actual loan repayment for calculation of interest subsidy
        based to be submitted at the time of disbursement of loan, in format at
        Annexure for Capital/Interest Subsidy based on actual repayment of loan.',
        VALUE_TWELVE => 'Other Statutory clearances/licenses, as applicable.',
        VALUE_THIRTEEN => 'The applicant shall submit necessary repayment details every year/half
        yearly for disbursement of interest subsidy in tranches.',
    ),
    VALUE_NINETEEN => array(
        VALUE_ONE => 'Scheme application form. <span class="color-nic-red">*</span>',
        VALUE_TWO => 'Undertaking on Rs.100/- Stamp Paper.',
        VALUE_THREE => 'Copy of Loan Sanction letter from the Bank / Financial Institution in
        respect Bank / Institutional financed Enterprises.',
        VALUE_FOUR => 'Copy of the invoices, cash bills and stamped receipts duly attested. In case
        of non-availability of receipts, the bank scroll which shows the payment,
        with the details of the machinery supplier, should be furnished, in original,
        with the attestation of the Bank Manager.',
        VALUE_FIVE => 'Certificate of Chartered Accountant for fixed assets created as on date of
        commencement of commercial production in the prescribed form.',
        VALUE_SIX => 'Valuation report of building from Government Approved Architect / Valuer
        / Chartered Engineer.',
        VALUE_SEVEN => 'Chartered Accountant Certificate for the investment made in Eligible Fixed
        Assets viz., Land, Building and Plant and machinery as per the prescribed
        format.',
        VALUE_EIGHT => 'Copy of the first sale invoice raised after commencement of Commercial
        Production or copy of first delivery challan in case of enterprises
        manufacturing on job work basis and copy of last sale invoice at the time of
        submission of application.',
        VALUE_NINE => 'Copy of the loan sanction letter including Loan repayment schedule, Terms
        & Conditions of the credit facilities like monthly installment of repayment
        of principle amount and interest amount, extended by Bank/Financial
        Institution.',
        VALUE_TEN => 'Statutory Auditor / Chartered Accountant certificate regarding tentative
        calculation of interest subsidy for the eligible period based on repayment
        schedule of Bank in format at Annexure for Interest Subsidy For 5 Years.',
        VALUE_ELEVEN => 'Bank Certificate on actual loan repayment for calculation of interest subsidy
        based to be submitted at the time of disbursement of loan, in format at
        Annexure for Capital/Interest Subsidy based on actual repayment of loan.',
        VALUE_TWELVE => 'Other Statutory clearances/licenses, as applicable.',
        VALUE_THIRTEEN => 'The applicant shall submit necessary repayment details every year/half
        yearly for disbursement of interest subsidy in tranches.',
    ),
    VALUE_TWENTY => array(
        VALUE_ONE => 'Scheme application form. <span class="color-nic-red">*</span>',
        VALUE_TWO => 'Undertaking on Rs.100/- Stamp Paper.',
        VALUE_THREE => 'Copy of IEM Registration/Udyam Registration.',
        VALUE_FOUR => 'Copy of Loan Sanction letter from the Bank / Financial Institution in
        respect Bank / Institutional financed Enterprises.',
        VALUE_FIVE => 'Copy of the invoices, cash bills and stamped receipts duly attested. In case
        of non-availability of receipts, the bank scroll which shows the payment,
        with the details of the machinery supplier, should be furnished, in original,
        with the attestation of the Bank Manager.',
        VALUE_SIX => 'Certificate of Chartered Accountant for fixed assets created as on date of
        commencement of commercial production in the prescribed form.',
        VALUE_SEVEN => 'Valuation report of building from Government Approved Architect / Valuer
        / Chartered Engineer.',
        VALUE_EIGHT => 'Chartered Accountant Certificate for the investment made in Eligible Fixed
        Assets viz., Land, Building and Plant and machinery as per the prescribed
        format.',
        VALUE_NINE => 'Copy of the first sale invoice raised after commencement of Commercial
        Production or copy of first delivery challan in case of enterprises
        manufacturing on job work basis and copy of last sale invoice at the time of
        submission of application.',
        VALUE_TEN => 'Copy of the loan sanction letter including Loan repayment schedule, Terms
        & Conditions of the credit facilities like monthly installment of repayment
        of principle amount and interest amount, extended by Bank/Financial
        Institution.',
        VALUE_ELEVEN => 'Statutory Auditor / Chartered Accountant certificate regarding tentative
        calculation of interest subsidy for the eligible period based on repayment
        schedule of Bank in format at Annexure for Interest Subsidy For 5 Years.',
        VALUE_TWELVE => 'Bank Certificate on actual loan repayment for calculation of interest subsidy
        based to be submitted at the time of disbursement of loan, in format at
        Annexure for Capital/Interest Subsidy based on actual repayment of loan.',
        VALUE_THIRTEEN => 'Other Statutory clearances/licenses, as applicable.',
        VALUE_FOURTEEN => 'The applicant shall submit necessary repayment details every year/half
        yearly for disbursement of interest subsidy in tranches.',
    ),
    VALUE_TWENTYONE => array(
        VALUE_ONE => 'Scheme application form. <span class="color-nic-red">*</span>',
        VALUE_TWO => 'Undertaking on Rs.100/- Stamp Paper.',
        VALUE_THREE => 'Copy of Occupancy certificate.',
        VALUE_FOUR => 'Certificate from Company’s Statutory Auditor in case of companies
        incorporated under ROC / Chartered Accountant in case of
        Proprietary/Partnership firms, for the investment made in Eligible Fixed
        Assets as per the definition of GFCI in IPS-2022, as per format at
        Annexure for Capital/Interest Subsidy or Certificate to be furnished from
        the Company Chartered Accountant / Statutory Auditor, as applicable.',
        VALUE_FIVE => 'Chartered Accountant Certificate for the investment made in Eligible Fixed
        Assets viz., Land, Building and Plant and machinery as per format at
        Annexure for Chartered Accountant Certificate.',
        VALUE_SIX => 'Statutory Auditor / Chartered Accountant certificate regarding date of
        commencement of commercial production cum first invoice raised for the
        new/expansion project in format at Annexure for First Sale Invoice.',
        VALUE_SEVEN => 'Copy of the invoices of the plant and machinery purchased duly attested
        by the Authorized signatory of the company/concern and evidence for the
        settlement of the invoices.',
        VALUE_EIGHT => 'The documents for new machinery such as copy of Letter of Credit, Bill of
        Entry, Bill of Lading, duty and details of clearing charges paid etc., shall
        be furnished.',
        VALUE_NINE => 'Chartered Accountant Certificate on annual production and sales in format
        at Annexure for Details of Production and Sales.',
        VALUE_TEN => 'Copy of order any financial assistance granted by Govt. of India / Others,
        if any along with details of assistance.',
        VALUE_ELEVEN => '<div class="text-primary">For Incentives of Interest subsidy</div>
        Copy of Loan Sanction letter from the Bank / Financial Institution in
        respect Bank / Institutional financed Enterprises.',
        VALUE_TWELVE => '<div class="text-primary">For Incentives of Interest subsidy</div>
        Copy of sanction order from Electricity Department for power
        supply with copy of last bill.',
        VALUE_THIRTEEN => '<div class="text-primary">For Incentives of Interest subsidy</div>
        Certificate of Chartered Accountant for fixed assets created as on
        date of commencement of commercial production in the prescribed
        form.',
        VALUE_FOURTEEN => '<div class="text-primary">For Incentives of Interest subsidy</div>
        Valuation report of building from Government Approved Architect /
        Valuer / Chartered Engineer.',
        VALUE_FIFTEEN => '<div class="text-primary">For Incentives of Interest subsidy</div>
        Chartered Accountant Certificate for the investment made in
        Eligible Fixed Assets viz., Land, Building and Plant and machinery
        as per the prescribed format .',
        VALUE_SIXTEEN => '<div class="text-primary">For Incentives of Interest subsidy</div>
        Copy of the first sale invoice raised after commencement of
        Commercial Production or copy of first delivery challan in case of
        enterprises manufacturing on job work basis and copy of last sale
        invoice at the time of submission of application.',
        VALUE_SEVENTEEN => '<div class="text-primary">For Incentives of Interest subsidy</div>
        Copy of the loan sanction letter including Loan repayment schedule,
        Terms & Conditions of the credit facilities like monthly installment
        of repayment of principle amount and interest amount, extended by
        Bank/Financial Institution.',
        VALUE_EIGHTEEN => '<div class="text-primary">For Incentives of Interest subsidy</div>
        Statutory Auditor / Chartered Accountant certificate regarding
        tentative calculation of interest subsidy for the eligible period based
        on repayment schedule of Bank in format at Annexure for Interest
        Subsidy For 5 Years.',
        VALUE_NINETEEN => '<div class="text-primary">For Incentives of Interest subsidy</div>
        Bank Certificate on actual loan repayment for calculation of interest
        subsidy based to be submitted at the time of disbursement of loan, in
        format at Annexure for Capital/Interest Subsidy based on actual
        repayment of loan.',
        VALUE_TWENTY => '<div class="text-primary">For Incentives of Interest subsidy</div>
        The applicant shall submit necessary repayment details every
        year/half yearly for disbursement of interest subsidy in tranches.',
    ),
    VALUE_TWENTYTWO => array(
        VALUE_ONE => 'Scheme application form. <span class="color-nic-red">*</span>',
        VALUE_TWO => 'Undertaking on Rs.100/- Stamp Paper.',
        VALUE_THREE => 'Copy of Project Report.',
        VALUE_FOUR => 'Chartered Engineer’s Certificate regarding investment in proposed project as
        per the format at Annexure for Chartered Engineer’s Certificate for Stamp
        Duty.',
        VALUE_FIVE => 'Chartered Accountant certificate on details of purchase of property in format
        at Annexure for First Sale Invoice.',
        VALUE_SIX => 'Copy of the Registered sale deed executed for land and building for factory.',
        VALUE_SEVEN => 'Copy of receipt of payment of stamp duty for purchase of Land and Building.',
        VALUE_EIGHT => 'Copy of NA permission.',
        VALUE_NINE => 'Copy of Occupancy certificate.',
        VALUE_TEN => 'Statutory Auditor / Chartered Accountant certificate regarding date of
        commencement of commercial production cum first invoice raised for the
        new/expansion project in format at Annexure for Chartered Accountant
        Certificate.',
        VALUE_ELEVEN => 'Copy of loan sanction for the project from Bank / Financial Institution.',
        VALUE_TWELVE => 'Copy of order any financial assistance granted by Govt. of India /Others, if
        any along with details of assistance.',
    ),
    VALUE_TWENTYTHREE => array(
        VALUE_ONE => 'Scheme application form. <span class="color-nic-red">*</span>',
        VALUE_TWO => 'Undertaking on Rs.100/- Stamp Paper.',
        VALUE_THREE => 'Copy of project report of setting up of Zero Liquid Discharge (ZLD) Facility
        for Effluent Treatment and Hazardous Waste Treatment Storage and disposal
        facility for waste water recycling.',
        VALUE_FOUR => 'Certificate from Company’s Statutory / Chartered Accountant for investment
        made in Zero Liquid Discharge (ZLD) Facility Copy of project report of setting up of manufacturing units dealing with
        alternatives to single use plastic items.',
        VALUE_FIVE => 'Copy of invoices and payment receipts for purchase of machineries /
        equipment for Environment Protection Infrastructure.',
        VALUE_SIX => 'Copy of order any financial assistance granted by Govt. of India / Others, if
        any along with details of assistance.',
    ),
    VALUE_TWENTYFOUR => array(
        VALUE_ONE => 'Scheme application form. <span class="color-nic-red">*</span>',
        VALUE_TWO => 'Proof of age.',
        VALUE_THREE => 'Educational qualification details.',
        VALUE_FOUR => 'Copy of AADHAAR Card.',
        VALUE_FIVE => 'Duly attested bills of machinery, working capital, raw materials procurements
        etc.',
    ),
    VALUE_TWENTYFIVE => array(
        VALUE_ONE => 'Scheme application form. <span class="color-nic-red">*</span>',
        VALUE_TWO => 'Recent passport size photograph.',
        VALUE_THREE => 'Proof of age.',
        VALUE_FOUR => 'Income certificate issued by Competent Authority.',
        VALUE_FIVE => 'Copy of AADHAAR Card.',
        VALUE_SIX => 'Quotation of dealers with GST/VAT number for machinery / raw materials to be
        purchased.',
        VALUE_SEVEN => 'Registration details of the Self Help Group, names of members in case of SHGs,
        Credit history of SHG etc',
    ),
    VALUE_TWENTYSIX => array(
        VALUE_ONE => 'Scheme application form. <span class="color-nic-red">*</span>',
        VALUE_TWO => 'Copy of Caste Certificate issued by Competent Authority, if applicable.',
        VALUE_THREE => 'Copy of Loan Sanction letter from the Bank / Financial Institution in
        respect of Bank / Institutional financed Enterprises.',
        VALUE_FOUR => 'Copy of the invoices, cash bills and stamped receipts duly attested. The
        bank scroll which shows the payment, with the details of the machinery
        supplier, should be furnished, with the attestation of the Bank Manager.',
        VALUE_FIVE => 'Certificate of Chartered Accountant for fixed assets created as on date of
        commencement of commercial production in the prescribed form.',
        VALUE_SIX => 'Chartered Accountant Certificate for the investment made in Fixed Assets
        viz., Land, Building and Plant and machinery and eligible GFCI as per
        the prescribed format.',
        VALUE_SEVEN => 'Copy of the first sale invoice raised after commencement of Commercial
        Production or copy of first delivery challan in case of enterprises
        manufacturing on job work basis and copy of last sale invoice at the time
        of submission of application.',
    ),
);

$config['daman_village_array'] = array(
    VALUE_ONE => 'Antiawad',
    VALUE_TWO => 'Bhamati',
    VALUE_THREE => 'Bhenslore',
    VALUE_FOUR => 'Bhimpore (CT)',
    VALUE_FIVE => 'Dabhel (CT)',
    VALUE_SIX => 'Damanwada (Dama O-De-Cima)',
    VALUE_SEVEN => 'Deva Pardi',
    VALUE_EIGHT => 'Devka',
    VALUE_NINE => 'Dholar',
    VALUE_TEN => 'Dunetha (CT)',
    VALUE_ELEVEN => 'GHELWAD',
    VALUE_TWELVE => 'Jampore',
    VALUE_THIRTEEN => 'Janivankad',
    VALUE_FOURTEEN => 'Kachigam (CT)',
    VALUE_FIFTEEN => 'Kadaiya (CT)',
    VALUE_SIXTEEN => 'KATHIRIA',
    VALUE_SEVENTEEN => 'Magarwada',
    VALUE_EIGHTEEN => 'Marwad (CT)',
    VALUE_NINETEEN => 'Naila Pardi',
    VALUE_TWENTY => 'Palhit',
    VALUE_TWENTYONE => 'Pariari',
    VALUE_TWENTYTWO => 'Patlara',
    VALUE_TWENTYTHREE => 'Ringanwada',
    VALUE_TWENTYFOUR => 'Somnath',
    VALUE_TWENTYFIVE => 'Thana Pardi',
    VALUE_TWENTYSIX => 'Varkund',
    VALUE_TWENTYSEVEN => 'Zari',
    VALUE_TWENTYEIGHT => 'Ward 1 - MOTI DAMAN - MARKET AREA',
    VALUE_TWENTYNINE => 'Ward 2 - MOTI DAMAN - FOOTBALL GROUND',
    VALUE_THIRTY => 'Ward 3 - NANI DAMAN - GANCHIWAD',
    VALUE_THIRTYONE => 'Ward 4 - RANA STREET / JAIN STREET',
    VALUE_THIRTYTWO => 'Ward 5 - NANI DAMAN JETTY AREA',
    VALUE_THIRTYTHREE => 'Ward 6 - ZAPABAR MAIN ROAD - TAXI STAND',
    VALUE_THIRTYFOUR => 'Ward 7 - TIN BATTI TO TAXI STAND',
    VALUE_THIRTYFIVE => 'Ward 8 - SATYANARAYAN MANDIR / CHAPPLI SHERI',
    VALUE_THIRTYSIX => 'Ward 9 - BHANDARWAD / CHINIYA SHERI',
    VALUE_THIRTYSEVEN => 'Ward 10 - MARWAD HOSPITAL / NARAYAN PARK',
    VALUE_THIRTYEIGHT => 'Ward 11 - DILIPNAGAR TO MASHAL CHOWK',
    VALUE_THIRTYNINE => 'Ward 12 - GOVT COLLEGE ROAD',
    VALUE_FOURTY => 'Ward 13 - KHARIWAD / ICE FACTORY ROAD',
    VALUE_FOURTYONE => 'Ward 14 - ROMA GAS / LIFE CARE HOSPITAL',
    VALUE_FOURTYTWO => 'Ward 15 - MITNAWAD / VAAD CHOWKI'
);

$config['diu_village_array'] = array(
    VALUE_ONE => 'Bhucharvada',
    VALUE_TWO => 'Saudwadi',
    VALUE_THREE => 'Vanakbara',
    VALUE_FOUR => 'Zolawadi',
);

$config['dnh_village_array'] = array(
    VALUE_ONE => 'Ambabari',
    VALUE_TWO => 'Amboli',
    VALUE_THREE => 'Apti',
    VALUE_FOUR => 'Athal',
    VALUE_FIVE => 'Athola',
    VALUE_SIX => 'Bedpa',
    VALUE_SEVEN => 'Bensda',
    VALUE_EIGHT => 'Bildhari',
    VALUE_NINE => 'Bindrabin',
    VALUE_TEN => 'Bonta',
    VALUE_ELEVEN => 'Chauda',
    VALUE_TWELVE => 'Chikhali',
    VALUE_THIRTEEN => 'Chinchpada',
    VALUE_FOURTEEN => 'Chinsda',
    VALUE_FIFTEEN => 'Dadra (CT)',
    VALUE_SIXTEEN => 'Dapada',
    VALUE_SEVENTEEN => 'Demani',
    VALUE_EIGHTEEN => 'Dhapsa',
    VALUE_NINETEEN => 'Dolara',
    VALUE_TWENTY => 'Dudhani',
    VALUE_TWENTYONE => 'FALANDI',
    VALUE_TWENTYTWO => 'GALONDA',
    VALUE_TWENTYTHREE => 'Ghodbari',
    VALUE_TWENTYFOUR => 'Goratpada',
    VALUE_TWENTYFIVE => 'Gunsa',
    VALUE_TWENTYSIX => 'Jamalpada',
    VALUE_TWENTYSEVEN => 'Kala',
    VALUE_TWENTYEIGHT => 'Kanadi',
    VALUE_TWENTYNINE => 'Karachgam',
    VALUE_THIRTY => 'Karad',
    VALUE_THIRTYONE => 'Karchond',
    VALUE_THIRTYTWO => 'Kauncha',
    VALUE_THIRTYTHREE => 'Khadoli',
    VALUE_THIRTYFOUR => 'Khanvel',
    VALUE_THIRTYFIVE => 'Kharadpada',
    VALUE_THIRTYSIX => 'Khedpa',
    VALUE_THIRTYSEVEN => 'Kherarbari',
    VALUE_THIRTYEIGHT => 'Kherdi',
    VALUE_THIRTYNINE => 'Khutali',
    VALUE_FOURTY => 'Kilavani',
    VALUE_FOURTYONE => 'Kothar',
    VALUE_FOURTYTWO => 'Kudacha',
    VALUE_FOURTYTHREE => 'Luhari',
    VALUE_FOURTYFOUR => 'Mandoni',
    VALUE_FOURTYFIVE => 'Masat (CT)',
    VALUE_FOURTYSIX => 'Medha',
    VALUE_FOURTYSEVEN => 'Morkhal',
    VALUE_FOURTYEIGHT => 'Mota Randha',
    VALUE_FOURTYNINE => 'Nana Randha',
    VALUE_FIFTY => 'Naroli (CT)',
    VALUE_FIFTYONE => 'Parzai',
    VALUE_FIFTYTWO => 'Pati',
    VALUE_FIFTYTHREE => 'Rakholi (CT)',
    VALUE_FIFTYFOUR => 'Rudana',
    VALUE_FIFTYFIVE => 'Saily',
    VALUE_FIFTYSIX => 'Samarvarni (CT)',
    VALUE_FIFTYSEVEN => 'Shelti',
    VALUE_FIFTYEIGHT => 'Sili',
    VALUE_FIFTYNINE => 'Silvassa',
    VALUE_SIXTY => 'Sindoni',
    VALUE_SIXTYONE => 'Surangi',
    VALUE_SIXTYTWO => 'Talavali',
    VALUE_SIXTYTHREE => 'Tighra',
    VALUE_SIXTYFOUR => 'Tinoda',
    VALUE_SIXTYFIVE => 'UMARKUI',
    VALUE_SIXTYSIX => 'Umbervarni',
    VALUE_SIXTYSEVEN => 'Vaghchauda',
    VALUE_SIXTYEIGHT => 'Vaghchhipa',
    VALUE_SIXTYNINE => 'Vansda',
    VALUE_SEVENTY => 'Vasona',
    VALUE_SEVENTYONE => 'Velugam',
);

$config['module_doc_array'] = array(
    VALUE_FIFTYNINE => array(
        VALUE_ONE => array(
            'is_require' => VALUE_ONE, 'name' => 'Application Form'
        ),
        VALUE_TWO => array(
            'is_require' => VALUE_ONE, 'name' => 'Property / Occupancy Documents'
        ),
        VALUE_THREE => array(
            'is_require' => VALUE_ONE, 'name' => 'Plan of the properly showing the survey number.'
        ),
        VALUE_FOUR => array(
            'is_require' => VALUE_ONE, 'name' => 'Enumeration list (duly signed by the applicant)'
        ),
        VALUE_FIVE => array(
            'is_require' => VALUE_ONE, 'name' => 'Boundry list (duly signed by the applicant)'
        ),
        VALUE_SIX => array(
            'is_require' => VALUE_ONE, 'name' => 'Latest index of land record issued by the Mamlatdar.'
        ),
        VALUE_SEVEN => array(
            'is_require' => VALUE_ONE, 'name' => 'No Objection Certificate from Administrator of Communidade.'
        ),
        VALUE_EIGHT => array(
            'is_require' => VALUE_ONE, 'name' => 'No Objection Certificate from adjoining property owners.'
        ),
    ),
    VALUE_SIXTY => array(
        VALUE_ONE => array(
            'is_require' => VALUE_ONE, 'name' => 'Application &  Project Report of the proposed society in  Prescribed Form ‘A’'
        ),
        VALUE_TWO => array(
            'is_require' => VALUE_ONE, 'name' => 'Resolution Authorizing Chief promoter to act on behalf of the society vides resolution no.7'
        ),
        VALUE_THREE => array(
            'is_require' => VALUE_ONE, 'name' => 'Declaration about nationality and non-possession of accommodation.'
        ),
        VALUE_FOUR => array(
            'is_require' => VALUE_ONE, 'name' => 'copy of by-laws duty signed by promoters of different family members'
        ),
        VALUE_FIVE => array(
            'is_require' => VALUE_ONE, 'name' => 'Attested true copy of Deed and release deed duly  registered with the sub-Registrar of Daman.'
        ),
        VALUE_SIX => array(
            'is_require' => VALUE_ONE, 'name' => 'List of Promoters indicating the amount contributed towards share capital.'
        ),
        VALUE_SEVEN => array(
            'is_require' => VALUE_ONE, 'name' => 'List of promoters who have joined for allotment of commercial premises.'
        ),
        VALUE_EIGHT => array(
            'is_require' => VALUE_ONE, 'name' => 'Legal opinion regarding the title of the property – Copy of title clearance report.'
        ),
        VALUE_NINE => array(
            'is_require' => VALUE_ONE, 'name' => 'Architecture/Engineer’s Certificate about estimated cost of flats/studio /offices/shops/commercial premises/parking spaces as per the project of the society. '
        ),
        VALUE_TEN => array(
            'is_require' => VALUE_ONE, 'name' => 'Copy of the Site plan of plot'
        ),
        VALUE_ELEVEN => array(
            'is_require' => VALUE_ONE, 'name' => 'Copy of I & IXIV of plot'
        ),
        VALUE_TWELVE => array(
            'is_require' => VALUE_ONE, 'name' => 'Plan and estimates of the proposed society duly signed by architects & int. designers.'
        ),
        VALUE_THIRTEEN => array(
            'is_require' => VALUE_ONE, 'name' => 'Certified copies of  identity cards in respect of proposed members of the society issued by the competent authority.'
        ),
        VALUE_FOURTEEN => array(
            'is_require' => VALUE_ONE, 'name' => 'Estimated income and expenditure  statement of the proposed society.'
        ),
        VALUE_FIFTEEN => array(
            'is_require' => VALUE_ONE, 'name' => 'Confirmation letter from district Town Planning  Officer that the land in question of the proposed society is in residential zone.( Copy of N.A. Sanad )'
        ),
        VALUE_SIXTEEN => array(
            'is_require' => VALUE_ONE, 'name' => 'Information /Proforma for bio data of each promoters of the proposed housing Co-Operative Society.'
        ),
    ),
    VALUE_SIXTYONE => array(
        VALUE_ONE => array(
            'is_require' => VALUE_ONE, 'name' => 'Application Form'
        ),
        VALUE_TWO => array(
            'is_require' => VALUE_ZERO, 'name' => 'I.D Proof of all Property Holder as per Property Details'
        ),
        VALUE_THREE => array(
            'is_require' => VALUE_ZERO, 'name' => 'Latest Form No. 1 & XIV/site Plan/ Survey No./Gauthan No./PTS No./Sale Deeds etc'
        ),
        VALUE_FOUR => array(
            'is_require' => VALUE_ZERO, 'name' => 'Declaration'
        ),
    ),
);

$config['rating_array'] = array(
    VALUE_ONE => VALUE_ONE,
    VALUE_TWO => VALUE_TWO,
    VALUE_THREE => VALUE_THREE,
    VALUE_FOUR => VALUE_FOUR,
    VALUE_FIVE => VALUE_FIVE
);
