<?php $base_url = base_url(); ?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>EODB ADMIN</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <?php $this->load->view('common/css_links', array('base_url' => $base_url, 'all_css_js' => true)); ?>
        <link rel="stylesheet" href="<?php echo $base_url; ?>plugins/datetimepicker/bootstrap-datetimepicker.css">
        <link rel="stylesheet" href="<?php echo $base_url; ?>plugins/daterangepicker/daterangepicker.css">
        <link rel="stylesheet" href="<?php echo $base_url; ?>plugins/osm/leaflet.css">
        <?php
        $this->load->view('common/utility_template');
        $this->load->view('common/js_links', array('base_url' => $base_url, 'all_css_js' => true));
        ?>
        <script src="<?php echo $base_url; ?>js/moment.min.js" type="text/javascript"></script>
        <script src="<?php echo $base_url; ?>adminLTE/js/demo.js" type="text/javascript"></script>
        <script src="<?php echo $base_url; ?>plugins/datetimepicker/bootstrap-datetimepicker.min.js" type="text/javascript"></script>
        <script src="<?php echo $base_url; ?>plugins/daterangepicker/daterangepicker.js" type="text/javascript"></script>
        <script src="<?php echo $base_url; ?>plugins/osm/leaflet.js" type="text/javascript"></script>
        <script src="<?php echo $base_url; ?>plugins/select2/select2.full.min.js" type="text/javascript"></script>
        <script src="<?php echo $base_url; ?>js/mordanizr.js" type="text/javascript"></script>
        <script src="<?php echo $base_url; ?>js/underscore.js" type="text/javascript"></script>
        <script src="<?php echo $base_url; ?>js/backbone.js" type="text/javascript"></script>
        <script src="<?php echo $base_url; ?>js/handlebars.js" type="text/javascript"></script>
        <?php $this->load->view('common/validation_message'); ?>
        <script type = "text/javascript">
            var tempIdInSession = <?php echo get_from_session('temp_id_for_eodbsws_admin'); ?>;
            var tempTypeInSession = <?php echo get_from_session('temp_type_for_eodbsws_admin'); ?>;
            var tempDistrictInSession = <?php echo get_from_session('temp_district_for_eodbsws_admin'); ?>;
            var optionTemplate = Handlebars.compile($('#option_template').html());
            var tagSpinnerTemplate = Handlebars.compile($('#tag_spinner_template').html());
            var spinnerTemplate = Handlebars.compile($('#spinner_template').html());
            var noRecordFoundTemplate = Handlebars.compile($('#no_record_found_template').html());
            var pageSpinnerTemplate = Handlebars.compile($('#page_spinner_template').html());
            var mDocListTemplate = Handlebars.compile($('#m_doc_list_template').html());
            var mDocItemViewTemplate = Handlebars.compile($('#m_doc_item_view_template').html());
            var mOtherDocListTemplate = Handlebars.compile($('#m_other_doc_list_template').html());
            var mOtherDocItemViewTemplate = Handlebars.compile($('#m_other_doc_item_view_template').html());
            var iconSpinnerTemplate = spinnerTemplate({'type': 'light', 'extra_class': 'spinner-border-small'});
            var IS_DEACTIVE = <?php echo IS_DEACTIVE ?>;
            var IS_DELETE = <?php echo IS_DELETE ?>;
            var defaultPassword = '<?php echo DEFAULT_PASSWORD ?>';

            var fbCnt = 1;
            var fbListTemplate = Handlebars.compile($('#fb_list_template').html());
            var fbItemTemplate = Handlebars.compile($('#fb_item_template').html());
            var fbItemViewTemplate = Handlebars.compile($('#fb_item_view_template').html());
            var phListTemplate = Handlebars.compile($('#ph_list_template').html());
            var phItemTemplate = Handlebars.compile($('#ph_item_template').html());
            var pgStatusArray = <?php echo json_encode($this->config->item('pg_status_array')); ?>;
            var pgStatusTextArray = <?php echo json_encode($this->config->item('pg_status_text_array')); ?>;
            var deptNameArray = <?php echo json_encode($this->config->item('dept_name_array')); ?>;
            var dvStatusArray = <?php echo json_encode($this->config->item('dv_status_array')); ?>;
            var dvStatusTextArray = <?php echo json_encode($this->config->item('dv_status_text_array')); ?>;

            var talukaArray = <?php echo json_encode($this->config->item('taluka_array')); ?>;
            var TALUKA_DAMAN = <?php echo TALUKA_DAMAN; ?>;
            var TALUKA_DIU = <?php echo TALUKA_DIU; ?>;
            var TALUKA_DNH = <?php echo TALUKA_DNH; ?>;

            var TEMP_TYPE_A = <?php echo TEMP_TYPE_A; ?>;
            var TEMP_TYPE_LABOUR_DEPT_USER = <?php echo TEMP_TYPE_LABOUR_DEPT_USER; ?>;
            var TEMP_TYPE_SUB_REGISTRAR = <?php echo TEMP_TYPE_SUB_REGISTRAR; ?>;
            var TEMP_TYPE_DIC = <?php echo TEMP_TYPE_DIC; ?>;
            var TEMP_TYPE_PCC = <?php echo TEMP_TYPE_PCC; ?>;
            var TEMP_TYPE_FB = <?php echo TEMP_TYPE_FB; ?>;
            var TEMP_TYPE_REV_COLL = <?php echo TEMP_TYPE_REV_COLL; ?>;
            var TEMP_TYPE_FIRE = <?php echo TEMP_TYPE_FIRE; ?>;
            var TEMP_TYPE_WM = <?php echo TEMP_TYPE_WM; ?>;
            var TEMP_TYPE_ELECTRICITY = <?php echo TEMP_TYPE_ELECTRICITY; ?>;
            var TEMP_TYPE_PWD = <?php echo TEMP_TYPE_PWD; ?>;
            var TEMP_TYPE_TOURISM = <?php echo TEMP_TYPE_TOURISM; ?>;
            var TEMP_TYPE_DIC_DNH = <?php echo TEMP_TYPE_DIC_DNH; ?>;
            var TEMP_TYPE_PDA = <?php echo TEMP_TYPE_PDA; ?>;
            var TEMP_TYPE_INSPECTIONS = <?php echo TEMP_TYPE_INSPECTIONS; ?>;
            var TEMP_TYPE_ISMW = <?php echo TEMP_TYPE_ISMW; ?>;
            var TEMP_TYPE_VDD = <?php echo TEMP_TYPE_VDD; ?>;
            var TEMP_TYPE_FOREST = <?php echo TEMP_TYPE_FOREST; ?>;
            var TEMP_TYPE_ARCS = <?php echo TEMP_TYPE_ARCS; ?>;
            var TEMP_TYPE_USER_ACC_VER = <?php echo TEMP_TYPE_USER_ACC_VER; ?>;


            var isChecked = <?php echo IS_CHECKED_YES ?>;
            var issueCategoryArray = <?php echo json_encode($this->config->item('issue_category_array')); ?>;
            var departmentArray = <?php echo json_encode($this->config->item('department_array')); ?>;

            var appStatusArray = <?php echo json_encode($this->config->item('app_status_array')); ?>;
            var paymentTypeArray = <?php echo json_encode($this->config->item('payment_type_array')); ?>;
            var userPaymentTypeArray = <?php echo json_encode($this->config->item('user_payment_type_array')); ?>;
            var queryGrievanceStatusArray = <?php echo json_encode($this->config->item('query_grievance_status_array')); ?>;
            var SCInspectionActArray = <?php echo json_encode($this->config->item('sc_inspection_act_array')); ?>;
            var SJInspectionActArray = <?php echo json_encode($this->config->item('sj_inspection_act_array')); ?>;
            var CInspectionActArray = <?php echo json_encode($this->config->item('c_inspection_act_array')); ?>;
            var inspectionTypeArray = <?php echo json_encode($this->config->item('inspection_type_array')); ?>;
            var cbTypeArray = <?php echo json_encode($this->config->item('cb_type_array')); ?>;
            var msmeTypeArray = <?php echo json_encode($this->config->item('msme_type_array')); ?>;
            var istatusArray = <?php echo json_encode($this->config->item('istatus_array')); ?>;
            var istatusTextArray = <?php echo json_encode($this->config->item('istatus_text_array')); ?>;
            var yesNoArray = <?php echo json_encode($this->config->item('yes_no_array')); ?>;
            var userStatusArray = <?php echo json_encode($this->config->item('user_status_array')); ?>;
            var tradeArray = <?php echo json_encode($this->config->item('trade_array')); ?>;
            var capacityTypeArray = <?php echo json_encode($this->config->item('capacity_type_array')); ?>;
            var classArray = <?php echo json_encode($this->config->item('class_array')); ?>;
            var verificationPlaceArray = <?php echo json_encode($this->config->item('verification_place_array')); ?>;
            var quantityUnitsArray = <?php echo json_encode($this->config->item('quantity_units_array')); ?>;
            var entityEstablishmentTypeArray = <?php echo json_encode($this->config->item('entity_establishment_type_array')); ?>;

            var treadeArray = <?php echo json_encode($this->config->item('trade_type_array')); ?>;
            var reportArray = <?php echo json_encode($this->config->item('report_type_array')); ?>;
            var queryModuleArray = <?php echo json_encode($this->config->item('query_module_array')); ?>;
            var appTimingArray = <?php echo json_encode($this->config->item('app_timing_array')); ?>;

            var VALUE_ZERO = <?php echo VALUE_ZERO; ?>;
            var VALUE_ONE = <?php echo VALUE_ONE; ?>;
            var VALUE_TWO = <?php echo VALUE_TWO; ?>;
            var VALUE_THREE = <?php echo VALUE_THREE; ?>;
            var VALUE_FOUR = <?php echo VALUE_FOUR; ?>;
            var VALUE_FIVE = <?php echo VALUE_FIVE; ?>;
            var VALUE_SIX = <?php echo VALUE_SIX; ?>;
            var VALUE_SEVEN = <?php echo VALUE_SEVEN; ?>;
            var VALUE_EIGHT = <?php echo VALUE_EIGHT; ?>;
            var VALUE_NINE = <?php echo VALUE_NINE; ?>;
            var VALUE_TEN = <?php echo VALUE_TEN; ?>;
            var VALUE_ELEVEN = <?php echo VALUE_ELEVEN; ?>;
            var VALUE_TWELVE = <?php echo VALUE_TWELVE; ?>;
            var VALUE_THIRTEEN = <?php echo VALUE_THIRTEEN; ?>;
            var VALUE_FOURTEEN = <?php echo VALUE_FOURTEEN; ?>;
            var VALUE_FIFTEEN = <?php echo VALUE_FIFTEEN; ?>;
            var VALUE_SIXTEEN = <?php echo VALUE_SIXTEEN; ?>;
            var VALUE_SEVENTEEN = <?php echo VALUE_SEVENTEEN; ?>;
            var VALUE_EIGHTEEN = <?php echo VALUE_EIGHTEEN; ?>;
            var VALUE_NINETEEN = <?php echo VALUE_NINETEEN; ?>;
            var VALUE_TWENTY = <?php echo VALUE_TWENTY; ?>;
            var VALUE_TWENTYONE = <?php echo VALUE_TWENTYONE; ?>;
            var VALUE_TWENTYTWO = <?php echo VALUE_TWENTYTWO; ?>;
            var VALUE_TWENTYTHREE = <?php echo VALUE_TWENTYTHREE; ?>;
            var VALUE_TWENTYFOUR = <?php echo VALUE_TWENTYFOUR; ?>;
            var VALUE_TWENTYFIVE = <?php echo VALUE_TWENTYFIVE; ?>;
            var VALUE_TWENTYSIX = <?php echo VALUE_TWENTYSIX; ?>;
            var VALUE_TWENTYSEVEN = <?php echo VALUE_TWENTYSEVEN; ?>;
            var VALUE_TWENTYEIGHT = <?php echo VALUE_TWENTYEIGHT; ?>;
            var VALUE_TWENTYNINE = <?php echo VALUE_TWENTYNINE; ?>;
            var VALUE_THIRTY = <?php echo VALUE_THIRTY; ?>;
            var VALUE_THIRTYONE = <?php echo VALUE_THIRTYONE; ?>;
            var VALUE_THIRTYTWO = <?php echo VALUE_THIRTYTWO; ?>;
            var VALUE_THIRTYTHREE = <?php echo VALUE_THIRTYTHREE; ?>;
            var VALUE_THIRTYFOUR = <?php echo VALUE_THIRTYFOUR; ?>;
            var VALUE_THIRTYFIVE = <?php echo VALUE_THIRTYFIVE; ?>;
            var VALUE_THIRTYSIX = <?php echo VALUE_THIRTYSIX; ?>;
            var VALUE_THIRTYSEVEN = <?php echo VALUE_THIRTYSEVEN; ?>;
            var VALUE_THIRTYEIGHT = <?php echo VALUE_THIRTYEIGHT; ?>;
            var VALUE_THIRTYNINE = <?php echo VALUE_THIRTYNINE; ?>;
            var VALUE_FOURTY = <?php echo VALUE_FOURTY; ?>;
            var VALUE_FOURTYONE = <?php echo VALUE_FOURTYONE; ?>;
            var VALUE_FOURTYTWO = <?php echo VALUE_FOURTYTWO; ?>;
            var VALUE_FOURTYTHREE = <?php echo VALUE_FOURTYTHREE; ?>;
            var VALUE_FOURTYFOUR = <?php echo VALUE_FOURTYFOUR; ?>;
            var VALUE_FOURTYFIVE = <?php echo VALUE_FOURTYFIVE; ?>;
            var VALUE_FOURTYSIX = <?php echo VALUE_FOURTYSIX; ?>;
            var VALUE_FOURTYSEVEN = <?php echo VALUE_FOURTYSEVEN; ?>;
            var VALUE_FOURTYEIGHT = <?php echo VALUE_FOURTYEIGHT; ?>;
            var VALUE_FOURTYNINE = <?php echo VALUE_FOURTYNINE; ?>;
            var VALUE_FIFTY = <?php echo VALUE_FIFTY; ?>;
            var VALUE_FIFTYONE = <?php echo VALUE_FIFTYONE; ?>;
            var VALUE_FIFTYTWO = <?php echo VALUE_FIFTYTWO; ?>;
            var VALUE_FIFTYNINE = <?php echo VALUE_FIFTYNINE; ?>;
            var VALUE_SIXTY = <?php echo VALUE_SIXTY; ?>;
            var VALUE_SIXTYONE = <?php echo VALUE_SIXTYONE; ?>;


            var maxFileSizeInKb = <?php echo MAX_FILE_SIZE_IN_KB; ?>;
            var maxFileSizeInMb = <?php echo MAX_FILE_SIZE_IN_MB; ?>;

            var IS_CHECKED_YES = <?php echo IS_CHECKED_YES; ?>;
            var IS_CHECKED_NO = <?php echo IS_CHECKED_NO; ?>;
            var MALE = <?php echo MALE; ?>;
            var FEMALE = <?php echo FEMALE; ?>;

            var appStatusTextArray = <?php echo json_encode($this->config->item('app_status_text_array')); ?>;
            var PROJECT_PATH = '<?php echo PROJECT_PATH; ?>';
            var REPAIRER_DOC_PATH = '<?php echo REPAIRER_DOC_PATH; ?>';
            var DEALER_DOC_PATH = '<?php echo DEALER_DOC_PATH; ?>';
            var MENUFACT_DOC_PATH = '<?php echo MENUFACT_DOC_PATH; ?>';
            var WMREG_DOC_PATH = '<?php echo WMREG_DOC_PATH; ?>';
            var WC_DOC_PATH = '<?php echo WC_DOC_PATH; ?>';
            var CINEMA_DOC_PATH = '<?php echo CINEMA_DOC_PATH; ?>';
            var HOTELREGI_DOC_PATH = '<?php echo HOTELREGI_DOC_PATH; ?>';
            var PSFREG_DOC_PATH = '<?php echo PSFREG_DOC_PATH; ?>';
            var MSME_DOC_PATH = '<?php echo MSME_DOC_PATH; ?>';
            var TEXTILE_DOC_PATH = '<?php echo TEXTILE_DOC_PATH; ?>';
            var NOC_DOC_PATH = '<?php echo NOC_DOC_PATH; ?>';
            var TRANSFER_DOC_PATH = '<?php echo TRANSFER_DOC_PATH; ?>';
            var SUBLETTING_DOC_PATH = '<?php echo SUBLETTING_DOC_PATH; ?>'
            var SUBLESSEE_DOC_PATH = '<?php echo SUBLESSEE_DOC_PATH; ?>'
            var SELLER_DOC_PATH = '<?php echo SELLER_DOC_PATH; ?>';
            var TRAVELAGENT_DOC_PATH = '<?php echo TRAVELAGENT_DOC_PATH; ?>';
            var PROPERTY_DOC_PATH = '<?php echo PROPERTY_DOC_PATH; ?>';
            var FILMSHOOTING_DOC_PATH = '<?php echo FILMSHOOTING_DOC_PATH; ?>';
            var TOURISMEVENT_DOC_PATH = '<?php echo TOURISMEVENT_DOC_PATH; ?>';
            var OCCUPANCY_DOC_PATH = '<?php echo OCCUPANCY_DOC_PATH; ?>';
            var INSPECTION_DOC_PATH = '<?php echo INSPECTION_DOC_PATH; ?>';
            var CONSTRUCTION_DOC_PATH = '<?php echo CONSTRUCTION_DOC_PATH; ?>';
            var SITE_DOC_PATH = '<?php echo SITE_DOC_PATH; ?>';
            var ZONE_DOC_PATH = '<?php echo ZONE_DOC_PATH; ?>';
            var LANDALLOTMENT_DOC_PATH = '<?php echo LANDALLOTMENT_DOC_PATH; ?>';
            var CLACT_DOC_PATH = '<?php echo CLACT_DOC_PATH; ?>';
            var SHOP_DOC_PATH = '<?php echo SHOP_DOC_PATH; ?>';
            var BOCW_DOC_PATH = '<?php echo BOCW_DOC_PATH; ?>';
            var FACTORY_DOC_PATH = '<?php echo FACTORY_DOC_PATH; ?>';
            var BUILD_DOC_PATH = '<?php echo BUILD_DOC_PATH; ?>';
            var BOILER_DOC_PATH = '<?php echo BOILER_DOC_PATH; ?>';
            var MIGRANTWORKERS_DOC_PATH = '<?php echo MIGRANTWORKERS_DOC_PATH; ?>';
            var BOILRMENUFACT_DOC_PATH = '<?php echo BOILRMENUFACT_DOC_PATH; ?>';
            var SINGLERETURN_DOC_PATH = '<?php echo SINGLERETURN_DOC_PATH; ?>';
            var NA_DOC_PATH = '<?php echo NA_DOC_PATH; ?>';
            var APLICENCE_DOC_PATH = '<?php echo APLICENCE_DOC_PATH; ?>';
            var RII_DOC_PATH = '<?php echo RII_DOC_PATH; ?>';
            var VC_DOC_PATH = '<?php echo VC_DOC_PATH; ?>';
            var PR_DOC_PATH = '<?php echo PR_DOC_PATH; ?>';
            var IPS_DOC_PATH = '<?php echo IPS_DOC_PATH; ?>';
            var IPS_INC_DOC_PATH = '<?php echo IPS_INC_DOC_PATH; ?>';
            var TREE_CUTTING_DOC_PATH = '<?php echo TREE_CUTTING_DOC_PATH; ?>';
            var SOCIETY_REGISTRATION_DOC_PATH = '<?php echo SOCIETY_REGISTRATION_DOC_PATH; ?>';
            var NIL_CERTIFICATE_DOC_PATH = '<?php echo NIL_CERTIFICATE_DOC_PATH; ?>';

            var documentRowCnt = 1;
            var mOtherDocRowCnt = 1;
            var queryFormTemplate = Handlebars.compile($('#query_form_template').html());
            var queryQuestionTemplate = Handlebars.compile($('#query_question_template').html());
            var queryQuestionViewTemplate = Handlebars.compile($('#query_question_view_template').html());
            var queryAnswerViewTemplate = Handlebars.compile($('#query_answer_view_template').html());
            var documentItemTemplate = Handlebars.compile($('#document_item_template').html());
            var documentItemViewTemplate = Handlebars.compile($('#document_item_view_template').html());
            var queryStatusArray = <?php echo json_encode($this->config->item('query_status_array')); ?>;
            var queryStatuTextsArray = <?php echo json_encode($this->config->item('query_status_text_array')); ?>;
            var prefixModuleArray = <?php echo json_encode($this->config->item('prefix_module_array')); ?>;
            var QUERY_PATH = '<?php echo QUERY_PATH; ?>';
            var VIEW_UPLODED_DOCUMENT = '<?php echo VIEW_UPLODED_DOCUMENT; ?>';
            var AT_WILL = '<?php echo AT_WILL; ?>';
            var rolesArray = <?php echo json_encode($this->config->item('roles_array')); ?>;
            var employeeStatusArray = <?php echo json_encode($this->config->item('employee_status_array')); ?>;
            var premisesStatusArray = <?php echo json_encode($this->config->item('premises_status_array')); ?>;
            var identityChoiceArray = <?php echo json_encode($this->config->item('identity_choice_array')); ?>;
            var partyTypeArray = <?php echo json_encode($this->config->item('party_type_array')); ?>;
            var serviceTypeArray = <?php echo json_encode($this->config->item('service_type_array')); ?>;
            var yesNoTypeArray = <?php echo json_encode($this->config->item('yes_no_type_array')); ?>;

            var constitutionArray = <?php echo json_encode($this->config->item('constitution_array')); ?>;
            var socialStatusArray = <?php echo json_encode($this->config->item('social_status_array')); ?>;
            var genderTypeArray = <?php echo json_encode($this->config->item('gender_type_array')); ?>;
            var randomizationStatusArray = <?php echo json_encode($this->config->item('randomization_status_array')); ?>;
            var lockStatusArray = <?php echo json_encode($this->config->item('lock_status_array')); ?>;
            var unitCategoryArray = <?php echo json_encode($this->config->item('unit_category_array')); ?>;
            var entrepreneurCategoryArray = <?php echo json_encode($this->config->item('entrepreneur_category_array')); ?>;
            var unitTypeArray = <?php echo json_encode($this->config->item('unit_type_array')); ?>;
            var sectorCategoryArray = <?php echo json_encode($this->config->item('sector_category_array')); ?>;
            var thrustSectorsArray = <?php echo json_encode($this->config->item('thrust_sectors_array')); ?>;
            var ownerCategoryArray = <?php echo json_encode($this->config->item('owner_category_array')); ?>;
            var casteCategoryArray = <?php echo json_encode($this->config->item('caste_category_array')); ?>;
            var schemeTypeArray = <?php echo json_encode($this->config->item('scheme_type_array')); ?>;
            var schemeArray = <?php echo json_encode($this->config->item('scheme_array')); ?>;
            var schemeDocArray = <?php echo json_encode($this->config->item('scheme_doc_array')); ?>;

            var damanVillagesArray = <?php echo json_encode($this->config->item('daman_village_array')); ?>;
            var diuVillagesArray = <?php echo json_encode($this->config->item('diu_village_array')); ?>;
            var dnhVillagesArray = <?php echo json_encode($this->config->item('dnh_village_array')); ?>;
            var moduleDocArray = <?php echo json_encode($this->config->item('module_doc_array')); ?>;

            var tempStateData = [];
            var tempDistrictData = [];
            var tempPlotData = [];
            var tempVillagesData = [];
            var tempDeptData = [];
            var TRAVEL_AGENCY_FEES = '<?php echo TRAVEL_AGENCY_FEES; ?>';
            var OTHER_VILLAGE = <?php echo OTHER_VILLAGE; ?>;

            var socRegUlStatusArray = <?php echo json_encode($this->config->item('soc_reg_ul_status_array')); ?>;

            var tempDropdownData = [];
            $(document).ready(function () {
                getCommonData();
            });
        </script>
    </head>
    <body class="hold-transition sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed">
        <?php $this->load->view('security'); ?>
        <script type="text/javascript">
            handleDataTableError();
        </script>
        <div id="full_page_overlay_div" class="overlay-full-page text-center">
            <div style="margin-top: 20%;">
                <i class="fas fa-spinner fa-5x fa-spin text-white"></i>
            </div>
            <div>
                <h2 class="text-white mt-5">Randomization in Progress . . .</h2>
            </div>
        </div>
        <div class="wrapper">
            <nav class="main-header navbar navbar-expand navbar-white navbar-light">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" id="sidebar_button" data-widget="pushmenu" href="#"><i class="fas fa-bars"></i></a>
                    </li>
                </ul>
                <ul class="navbar-nav ml-auto" style="padding-right: 10px;">
                    <li class="nav-item dropdown f-w-b color-black">
                        Logged User: <?php echo get_from_session('name'); ?>
                    </li>
                </ul>
            </nav>
            <button type="button" style="display: none;" id="temp_btn"></button>
            <?php $this->load->view('common/sidebar'); ?>
            <div class="modal fade" id="popup_modal" style="padding-right: 0px !important;">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 id="model_title" class="modal-title"></h4>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"
                                    onclick="resetModel();">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div id="model_body" class="modal-body">
                        </div>
                    </div>
                </div>
            </div>