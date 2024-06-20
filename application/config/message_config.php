<?php

define('INVALID_ACCESS', 1);
define('INVALID_ACCESS_MESSAGE', 'Invalid Access !');

$config['invalid_access_array'] = array(
    INVALID_ACCESS => INVALID_ACCESS_MESSAGE
);

define('PASSWORD_VALIDATION_MESSAGE', '1. Password must be between 8 to 16 characters long.<br>'
        . '2. Contain at least one digit and two alphabetic character.<br>'
        . '3. At least one upper case and one lower case character.<br>'
        . '4. Contain at least one special character of (!#$@%-_+<>=).');

define('DATABASE_ERROR_MESSAGE', 'Some unexpected database error encountered due to which your transaction could not be complete');
define('INVALID_USER_MESSAGE', 'Invalid User !');
define('INVALID_PASSWORD_MESSAGE', 'Invalid Password !');
define('RETYPE_PASSWORD_MESSAGE', 'Retype your Password !');
define('NEW_PASSWORD_MESSAGE', 'Enter New Password !');
define('PASSWORD_AND_RETYPE_PASSWORD_NOT_MATCH_MESSAGE', 'Password and Retype password do not match !');
define('USERNAME_MESSAGE', 'Enter Username !');
define('PASSWORD_MESSAGE', 'Enter Password !');
define('USER_EXISTS_MESSAGE', 'User Already Exists !');
define('PASSWORD_POLICY_MESSAGE', 'Password entered is not as per password policy !');
define('NO_RECORD_FOUND_MESSAGE', 'No Record Found..!');
define('APPROVE_MESSAGE', 'Approved Successfully !');
define('APP_DRAFT_MESSAGE', 'Application Save as Draft Successfully  !');
define('APP_SUBMITTED_MESSAGE', 'Application Submitted Successfully  !');
define('ONE_CONTRACTOR_MESSAGE', 'Enter Atleast One Contractor Details!');
define('EMAIL_MESSAGE', 'Enter Email !');
define('INVALID_EMAIL_MESSAGE', 'Invalid Email !');
define('DATE_MESSAGE', 'Select Date !');
define('MOBILE_NUMBER_MESSAGE', 'Enter Mobile Number !');
define('INVALID_MOBILE_NUMBER_MESSAGE', 'Invalid Mobile Number !');
define('CHALLAN_UPLOADED_MESSAGE', 'Payment Details Send Successfully !');
define('LETTER_UPLOADED_MESSAGE', 'Letter Uploaded Successfully !');
define('PAYMENT_CONFIRMED_MESSAGE', 'Payment Confirmed Successfully !');
define('PIN_MESSAGE', 'Enter Pin !');
define('SIX_DIGIT_PIN_MESSAGE', 'Enter Proper 6 Digit Pin !');
define('INVALID_PIN_MESSAGE', 'Invalid Pin !');
define('MOBILE_NUMBER_OR_PIN_MESSAGE', 'Mobile Number or Pin is Invalid !');
define('CURRENT_PIN_VALIDATION_MESSAGE', 'Enter Current Pin !');
define('NEW_PIN_VALIDATION_MESSAGE', 'Enter New Pin !');
define('RETYPE_NEW_PIN_VALIDATION_MESSAGE', 'Retype New Pin !');
define('NOT_MATCH_PIN_VALIDATION_MESSAGE', 'New Pin and Retype Pin is Not Match !');
define('CURRENT_PIN_IS_INVALID_MESSAGE', 'Current Pin is Invalid !');
define('PIN_CHANGED_MESSAGE', 'Pin Changed Successfully !');
define('ONE_PAYMENT_OPTION_MESSAGE', 'Select One Payment Option !');
define('LICENSE_NO_NOT_AVAILABLE', 'Invalid License Number !');
define('REGISTRATION_NUMBER_EXISTS_MESSAGE', 'Registration Number Already Exists !');
define('REGISTRATION_FILE_NO_MESSAGE', 'Enter Only File No. !');
define('ENTITY_ESTABLISHMENT_TYPE_MESSAGE', 'Select Entity / Establishment Type !');
define('VER_MAIL_RESEND_MESSAGE', 'Verification Mail Re-Send Successfully !');

//Login
define('INVALID_USERNAME_OR_PASSWORD_MESSAGE', 'Username or Password is Invalid !');
define('EMAIL_NOT_VERIFY_MESSAGE', 'Your email is not verified. Please verify your email !');
define('MOBILE_NUMBER_NOT_VERIFY_MESSAGE', 'Your mobile number is not verified. Please verify your mobile number !');
define('ACCOUNT_NOT_ACTIVE_MESSAGE', 'Permission Denied !');
define('ACCOUNT_DELETE_MESSAGE', 'Your Account is Disabled. Please contect to System Administration !');

//User Type
define('INVALID_USER_TYPE_MESSAGE', 'Invalid User Type !');
define('USER_TYPE_MESSAGE', 'Enter User Type !');
define('USER_TYPE_EXISTS_MESSAGE', 'User Type Already Exists !');
define('USER_TYPE_SAVED_MESSAGE', 'User Type Saved Successfully !');
define('USER_TYPE_UPDATED_MESSAGE', 'User Type Updated Successfully !');

//User Module
define('NAME_MESSAGE', 'Enter Name !');
define('SELECT_USER_TYPE_MESSAGE', 'Select User Type !');
define('SELECT_USER_MESSAGE', 'Select User !');
define('USER_SAVED_MESSSAGE', 'User Saved Successfully !');
define('USER_UPDATED_MESSSAGE', 'User Updated Successfully !');
define('EMAIL_UPDATED_MESSSAGE', 'Email ID Updated Successfully !');
define('EMAIL_ID_EXISTS_MESSAGE', 'Email ID Already Exists !');
define('DELETE_MESSAGE', 'User Deleted Successfully !');

//Officer Module
define('OFFICER_SAVED_MESSAGE', 'Officer Detail Saved Successfully !');
define('RAND_SUCCESS_MESSAGE', 'Randomization Process Completed Successfully !');
define('LOCK_RAND_SUCCESS_MESSAGE', 'Randomization Locked Successfully !');

//Change Password Module
define('PASSWORD_CHANGED_MESSAGE', 'Password Changed Successfully !');
define('CURRENT_NEW_PASSWORD_SAME_MESSAGE', 'Your Current Password and New Password are Same. Please Enter Another Password !');
define('INCORRECT_CURRENT_PASSWORD', 'Incorrect Current Password !');

//Department Messages
define('DEPARTMENT_MESSAGE', 'Enter Department Name !');
define('SELECT_DEPARTMENT_MESSAGE', 'Select Department !');
define('INVALID_DEPARTMENT_MESSAGE', 'Invalid Department !');
define('DEPARTMENT_EXISTS_MESSAGE', 'Department Name Already Exists !');
define('DEPARTMENT_SAVED_MESSAGE', 'Department Saved Successfully !');
define('DEPARTMENT_UPDATED_MESSAGE', 'Department Updated Successfully !');

//Employee Messages
define('INVALID_EMPLOYEE_MESSAGE', 'Invalid Employee !');
define('EMPLOYEE_NAME_MESSAGE', 'Enter Employee Name !');
define('ONE_ROLE_MESSAGE', 'Select Atleast One Role !');
define('ENTER_DESIGNATION_MESSAGE', 'Enter Designation !');
define('MOBILE_EXISTS_MESSAGE', 'Mobile Number Already Exists !');
define('EMPLOYEE_SAVED_MESSAGE', 'Employee Details Saved Successfully !');
define('EMPLOYEE_UPDATED_MESSAGE', 'Employee Details Updated Successfully !');

//Service Messages
define('SERVICE_NAME_MESSAGE', 'Enter Name of Service/Clearance !');
define('INVALID_SERVICE_MESSAGE', 'Invalid Service !');
define('SERVICE_SUBMITTED_MESSAGE', 'Service Details Submitted Successfully !');
define('ENTER_TIMELINE_MESSAGE', 'Enter Timeline (Working Days) !');
define('ENTER_QUESTION_MESSAGE', 'Enter Question !');

//State Reforms Action Plan Module
define('SERIAL_NO_MESSAGE', 'Enter Serial Number !');
define('INVALID_SRAP_MESSAGE', 'Invalid State Reforms Action Plan !');
define('DISTRICT_MESSAGE', 'Select District !');
define('AREA_MESSAGE', 'Enter Area !');
define('SUB_AREA_MESSAGE', 'Enter Sub Area !');
define('REFORMS_MESSAGE', 'Enter Reforms !');
define('REFORM_CONTENT_MESSAGE', 'Enter Reform Content !');
define('ONE_OPTION_MESSAGE', 'Select One Option !');
define('DOC_INVALID_SIZE_MESSAGE', 'Upload at least 1kb Size Document !');
define('UPLOAD_DOC_MESSAGE', 'Upload any Document !');
define('DOC_NOT_UPLOAD_MESSAGE', 'Document Not Uploaded !');
define('UPLOAD_MAX_1_MB_MESSAGE', 'Maximum upload size 1 MB only.');
define('UPLOAD_MAX_ONE_MB_MESSAGE', 'Maximum upload size 10 MB only.');
define('DOCUMENT_NOT_UPLOAD_MESSAGE', 'Document Not Uploaded !');
define('DOCUMENT_REMOVED_MESSAGE', 'Document Removed Successfully !');
define('SRAP_SAVED_MESSAGE', 'State Reforms Action Plan Data Saved Successfully !');
define('APP_APPROVED_MESSAGE', 'Application Approved Successfully !');
define('APP_REJECTED_MESSAGE', 'Application Rejected Successfully !');

// Weight & Measure Repairer
define('REPAIRMEN_NAME_MESSAGE', 'Enter Name of the concern seeking the license !');
define('WORKSHOPS_ADDRESS_MESSAGE', 'Enter Complete address of the workshop !');
define('SUPPORT_DOCUMENT_MESSAGE', 'Upload Support Documents !');
define('ESTABLISHMENT_DATE_MESSAGE', 'Enter Date of Establishment of workshop/factory !');
define('SHOP_DATE_MESSAGE', 'Enter Date of shop/establishment/Municipal Trade License !');
define('SHOP_REGISTRATION_NUMBER_MESSAGE', 'Enter Registration Number of shop/establishment/Municipal Trade License !');
define('IDENTITY_MESSAGE', 'Enter Vat/Sales Tax Registration Numbers/CST Number/Professional Tax registration Number/It Number !');
define('WEIGHT_TYPE_MESSAGE', 'Enter The type of weights and measures proposed to be repaired !');
define('AREA_OPERATE_MESSAGE', 'Enter Area in which you wish to operate !');
define('PREV_EXPERIENCE_MESSAGE', 'Enter Previous experience in the line !');
define('SKILLED_NO_MESSAGE', 'Enter Skilled number of people employed !');
define('SEMISKILLED_NO_MESSAGE', 'Enter number of Semi Skilled people employed !');
define('UNSKILLED_NO_MESSAGE', 'Enter number of Unskilled people employed !');
define('TRAIN_EMP_MESSAGE', 'Enter number of Train Employee people employed !');
define('PERSONNEL_DETAIL_MESSAGE', 'Enter Details of Qualified Personnel !');
define('MACHINERY_MESSAGE', 'Enter Details of machinery/tools/accessories available !');
define('ELECTRIC_ENERGY_MESSAGE', 'Enter Availability of electric energy !');
define('STOCK_DETAIL_MESSAGE', 'Enter Stock Details !');
define('APPLIED_DATE_MESSAGE', 'Enter Date Applied On !');
define('LICENSE_RESULT_MESSAGE', 'Enter Result of the Application !');
define('DECLARATION_ONE_MESSAGE', 'Please Tick !');
define('DECLARATION_TWO_MESSAGE', 'Please Tick !');
define('DECLARATION_THREE_MESSAGE', 'Please Tick !');
define('UPLOAD_APPLICANT_SIGN_MESSAGE', 'Upload Signature !');
define('OCCUPIER_NAME_MESSAGE', 'Enter Occupier Name !');
define('FATHER_NAME_MESSAGE', 'Enter Father Name !');
define('PROPRIETOR_ADDRESS_MESSAGE', 'Enter Propritor Address !');
define('UPLOAD_DOCUMENT_MESSAGE', 'Upload Valid Document !');
define('IDENTITY_CHOICE_MESSAGE', 'Select one Identity !');
define('PREMISES_STATUS_MESSAGE', 'Select Status of the Premises !');

// Weight & Measure Dealer
define('DEALER_NAME_MESSAGE', 'Enter Name of the concern seeking the license !');
define('CATEGORY_SOLD_MESSAGE', 'Enter Categories of weights and measures sold/proposed to be sold at present !');

// Weight & Measure Manufacturer
define('MANUFACTURER_NAME_MESSAGE', 'Enter Name of the concern seeking the license !');
define('ACTIVITY_MESSAGE', 'Enter Nature of manufacturing Activity at present !');
define('MEASURE_TYPE_MESSAGE', 'Enter The Type of Measures !');
define('WEIGHT_INSTRUMENT_MESSAGE', 'Enter The Type of Weighing Instruments !');
define('MEASURE_INSTRUMENT_MESSAGE', 'Enter The Type of Measuring Instruments !');
define('FOUNDRY_MESSAGE', 'Enter Details of foundry/workshop facilities arranged whether ownership, long term lease !');
define('CASTING_FACILITY_MESSAGE', 'Enter Facilities of steel casting and hardness testing of Vital parts etc or other means !');
define('LOAN_DETAIL_MESSAGE', 'Enter Details of loan received from Government or Financial Institution !');
define('BANK_NAME_MESSAGE', 'Enter Name of Bankers !');
define('SELLING_LOCATION_MESSAGE', 'Enter Whether the item (s) proposed to be manufactured will be sold !');
define('APPROVAL_MODEL_MESSAGE', 'Enter Details of Model Approval received from Government of India !');
define('INSPECTION_DATE_MESSAGE', 'Select When can you produce for inspection samples of your products for which license is desired !');
define('IMPORTER_REG_MESSAGE', 'Enter Registration of importer of Weights and Measures !');

define('ESTABLISHMENT_REGISTRATION_NO_MESSAGE', 'Enter Registration No. !');
define('ESTABLISHMENT_REMARK_MESSAGE', 'Enter Remarks !');

// Weight & Measure New Registration
define('APPLICANT_NAME_MESSAGE', 'Enter Name of Applicant !');
define('COMPLETE_ADDRESS_MESSAGE', 'Enter Complete Address of Registered Office !');
define('APPLICANT_CATEGORY_MESSAGE', 'Select Item to be Manufactured/Packed/Imported !');
define('BRANCH_MESSAGE', 'Enter Complete Address of Manufacturing/Packing/Importing Premises  !');
define('ITEM_DETAIL_MESSAGE', 'Enter Item Detail  !');

// Water Connection
define('HOUSE_NO_MESSAGE', 'Enter House No. !');
define('WARD_NO_MESSAGE', 'Enter Ward No. !');
define('VILLAGE_MESSAGE', 'Select Village Name !');
define('PANCHAYT_OR_DMC_MESSAGE', 'Enter Panchayat/Dmc !');
define('APPLICANT_CATEGORY_WC_MESSAGE', 'Enter Water Connection Category !');
define('HOUSE_OWNERSHIP_MESSAGE', 'Enter House Ownership !');
define('WC_TYPE_MESSAGE', 'Enter Water Connection Type !');
define('DIAMETER_SERVICE_CONNECTION_MESSAGE', 'Enter Diameter of Service Connection !');
define('WATER_METER_MESSAGE', 'Enter Water Meter !');

// Cinema
//define('FATHER_NAME_MESSAGE', "Enter Father's Name. !");
define('DOB_MESSAGE', 'Enter Date of Birth. !');
define('PERMANENT_ADDRESS_MESSAGE', 'Enter Permanent Address !');
define('TEMPORARY_ADDRESS_MESSAGE', 'Enter Temporary Address !');
define('VIDEO_CASSETTE_RECORDER_LINK_MESSAGE', 'Enter Exhibition Video Cassette Recorder Link !');
define('NAME_OF_BUILDING_MESSAGE', 'Enter Name of Building !');
define('PLACE_OF_BUILDING_MESSAGE', 'Enter Place of Building !');
define('DISTANCE_OF_BUILDING_MESSAGE', 'Enter Distance of Building !');
define('TB_LICENSE_AFFECTED_MESSAGE', 'Enter Trade or business for which the license has been granted is likely to be affected. !');
define('BUILDING_AS_MESSAGE', 'Enter Area Square of Building !');
define('AUDITORIUM_AS_MESSAGE', 'Enter Area Square of Auditorium !');
define('PASSAGE_GANGWAYS_AS_MESSAGE', 'Enter Area Square of Passage and Gangways !');
define('URINALS_WC_AS_MESSAGE', 'Enter Area Square of Urinals and W.C. !');
define('TIME_SCHEDULE_FILM_MESSAGE', 'Enter Time schedule for exhibition of film !');
define('SCREEN_WIDTH_MESSAGE', 'Enter Width of television screen / Video Scope Screen Setting arrangement in the building !');

// Hotel
define('CATEGORY_HOTEL_MESSAGE', 'Select Category of Hotel !');
define('HOTEL_NAME_MESSAGE', 'Enter Name of Hotel !');
define('PERSON_NAME_MESSAGE', 'Enter Name of Person !');
define('FULL_ADDRESS_MESSAGE', 'Enter Full address of the site where the applicant intends to run the hotel or is being run !');
define('TOURIST_AREA_NAME_MESSAGE', 'Enter Name of the tourist area where the hotel is to be run or is being run !');
define('PROPRIETOR_NAME_MESSAGE', 'Enter Name of the Proprietor !');
define('MANAGER_NAME_MESSAGE', 'Enter Name of Manager !');
define('MANAGER_PERMANENT_ADDRESS_MESSAGE', 'Enter Manager Permanent Address !');
define('PERMANENT_RESIDENT_MESSAGE', 'Select Whether the applicant is a permanent resident of the Union Territory of Goa, Daman and Diu. !');
define('OTHER_BUSINESS_APPLICANT_MESSAGE', 'Select Any other business which the applicant is carrying on in any tourist area in the Union Territory. !');
define('HOTEL_RENTED_LEASED_MESSAGE', 'Select Whether the building wherein the hotel is operated or is rented out or leased. !');
define('LEASED_DATE_MESSAGE', 'Select In case of a leased building the period of lease to be mentioned with specific date !');
define('AGENT_NAME_MESSAGE', 'Enter Name of the Agent/Agents/employee/employees !');

// partnership Firm Registration
//define('FIRM_NAME_MESSAGE', 'Enter Firm Name !');
define('PRINCIPAL_ADDRESS_MESSAGE', 'Enter Principal Address !');
define('OTHER_ADDRESS_MESSAGE', 'Enter Other Address !');
define('FIRM_DURATION_MESSAGE', 'Enter Firm Duration !');

//Query Management Module
define('REMARKS_MESSAGE', 'Enter Remarks !');
define('QUERY_RAISED_MESSAGE', 'Query Raised Successfully !');
define('QUERY_RESOLVED_MESSAGE', 'Query Resolved Successfully !');
define('DOCUMENT_NAME_MESSAGE', 'Enter Document Name !');
define('QUERY_DOCUMENT_ITEM_REMOVED_MESSAGE', 'Query Document Item Removed Successfully !');

// Incentive General Form
define('OFFICE_ADDRESS_MESSAGE', 'Enter Office Address with pin code No. !');
define('OFFICE_CONTACT_NO_MESSAGE', 'Enter Office Contact No. !');
define('FACTORY_ADDRESS_MESSAGE', 'Enter Factory Address with pin code No. !');
define('FACTORY_CONTACT_NO_MESSAGE', 'Enter Factory Contact No. !');
define('FAX_MESSAGE', 'Enter Fax !');
define('CELL_PHNO_MESSAGE', 'Enter Cell Phone !');
define('PROMOTERS_DETAIL_MESSAGE', 'Enter Name,Designation & Contact Details of the Promoter  !');
define('OTHORIZED_PERSON_DETAIL_MESSAGE', 'Enter Name,Designation & Contact Details of the Authorized Person !');
define('EM_NO_MESSAGE', 'Enter E.M. No. !');
define('EM_DATE_MESSAGE', 'Enter E.M. Date !');
define('MANUFACTURING_ITEM_MESSAGE', 'Enter Manufacturing items !');
define('ANNUAL_CAPACITY_MESSAGE', 'Enter Annual production capacity !');
define('APPROVAL_NO_MESSAGE', 'Enter Approval / Consent No. !');
define('PCC_DATE_MESSAGE', 'Enter Date !');
define('PCC_VALIDUPTO_DATE_MESSAGE', 'Enter Date !');
define('FACTORY_NO_MESSAGE', 'Enter Registration No. !');
define('ESTABLISHMENTS_DATE_MESSAGE', 'Enter Date !');
define('ESTABLISHMENT_VALIDUPTO_DATE_MESSAGE', 'Enter Date !');
define('COMMENCEMENT_DATE_MESSAGE', 'Enter Date !');
define('NAME_OF_BANK_MESSAGE', 'Enter Name of Bank !');
define('BANK_ACCOUNT_NO_MESSAGE', 'Enter Bank Account No !');
define('IFSC_CODE_MESSAGE', 'Enter IFSC Code No. !');
define('BRANCH_CODE_MESSAGE', 'Enter Branch Code No !');
define('PAN_CARD_MESSAGE', 'Enter PAN Card No. of the Unit !');

define('PERSONS_NAME_MESSAGE', 'Enter Name !');
define('GENDER_MESSAGE', 'Enter Gender !');
define('COMMUNITY_MESSAGE', 'Enter Community !');
define('PH_MESSAGE', 'Enter P.H. !');
define('SHARE_MESSAGE', 'Enter Share !');
define('VALUE_MESSAGE', 'Enter Value !');
define('PERCENT_MESSAGE', 'Enter Percentage !');
define('CONSTITUTION_MESSAGE', 'Select Constitution of the Enterprise !');
define('SOCIAL_STATUS_MESSAGE', 'Select Social Status of the Entrepreneur !');
define('UNIT_TYPE_MESSAGE', 'Select Type of the Unit !');
define('CATEGORY_MESSAGE', 'Select Category of the Enterprise !');
define('FINANCIAL_ASSISTANCE_MESSAGE', 'Select financial assistance granted by Govt. of india !');
define('GOVT_DUES_MESSAGE', 'Select Government dues are outstanding OR Court case against Govt. !');
define('TURNOVER_MESSAGE', 'Enter Annual Turnover !');

// Incentive Part A Form
define('INVESTMENT_MESSAGE', 'Enter Investment made in Plant & Machinery !');
define('MACHINERY_UNIT_MESSAGE', 'Enter Investment already made in Plant & Machinery in Existing Unit !');
define('MNEW_INVESTMENT_MESSAGE', 'Enter New Investment in Plant & Machinery !');
define('INVESTMENT_PERCENTAGE_MESSAGE', 'Enter Increase in Investment !');
define('CONTRIBUTION_MESSAGE', 'Enter Promoters Contribution !');
define('TERM_LOAN_MESSAGE', 'Enter Term Loan !');
define('UNSECURED_LOAN_MESSAGE', 'Enter Unsecured Loan !');
define('ACCUALS_MESSAGE', 'Enter Internal Accruals / Others !');
define('FINANCE_TOTAL_MESSAGE', 'Enter Total !');
define('TERM_LOAN_DATE_MESSAGE', 'Enter Date of First Disbursement of Term Loan !');
define('LOAN_ACCOUNT_MESSAGE', 'Enter Term Loan Account No. !');
define('CAPITAL_SUBSIDY_MESSAGE', 'Enter Capital Investment Subsidy !');
define('ANUM_MESSAGE', 'Enter Interest Subsidy @ 5% per annum !');
define('CLIAM_AMOUNT_TOTAL_MESSAGE', 'Enter Total !');
//define('COMMENCEMENT_DATE_MESSAGE', 'Enter Date of commencement of commercial production !');
define('DISBURSEMENT_DATE_MESSAGE', 'Enter Date of first Disbursement of Loan !');
define('NAME_ADDRESS_MESSAGE', 'Enter Name & address !');
//define('IFSC_CODE_MESSAGE', 'Enter IFSC Code No. !');
//define('BRANCH_CODE_MESSAGE', 'Enter Branch Code No. !');
define('LOAN_TYPE_MESSAGE', 'Enter Type of Loan !');
define('SANCTION_AMOUNT_MESSAGE', 'Enter Sanction Amount !');
//define('DATE_MESSAGE', 'Enter Date !');
define('RATE_MESSAGE', 'Enter Rate of Interest !');

// Incentive Part B Form
define('SUPPLIER_NAME_ADDRESS_MESSAGE', 'Enter Name & Address of ERP System Supplier !');
define('FEATURE_SYSTEM_MESSAGE', 'Enter Features of the ERP System !');
define('AGENCY_NAME_MESSAGE', 'Enter Name & Address of Certifing Agency !');
define('PRODUCT_DETAIL_MESSAGE', 'Enter Details of Product of which the certificate has been issued !');
define('ISO_CERTIFICATE_NO_MESSAGE', 'Enter Certificate No. !');
define('ISO_CERTIFICATE_DATE_MESSAGE', 'Enter Certificate Date !');
define('ISI_CERTIFICATE_NO_MESSAGE', 'Enter Certificate No. !');
define('ISI_CERTIFICATE_DATE_MESSAGE', 'Enter Certificate Date !');
define('EXPENDITURE_MESSAGE', 'Enter Total Expenditure on Quality Certification !');
define('CAPITAL_COST_MESSAGE', 'Enter Capital Cost for installing ERP System !');
define('CONSUTANCY_MESSAGE', 'Enter all charges including Consultancy Fees !');
define('CERTIFICATION_CHARGES_MESSAGE', 'Enter all charges for obtaining each certification !');
define('TESTING_EQUIPMENTS_MESSAGE', 'Enter cost of testing equipments required for certification !');
define('CLAM_AMOUNT_TOTAL_MESSAGE', 'Enter Total !');

// Incentive Part C Form
define('REGISTRATION_NO_MESSAGE', 'Enter Patent Registration No. !');
define('CERTIFICATE_DATE_MESSAGE', 'Enter Certificate Date !');
define('PATENT_NAME_MESSAGE', 'Enter Name & Address of Office from where patent registration was obtained !');
define('PRODUCT_NAME_MESSAGE', 'Enter Name of Product / Activity for which Patent registration is obtained !');
define('PATENT_EXPENDITURE_MESSAGE', 'Enter Total Expenditure made on patent registration with details !');
define('CLIAM_AMOUNT_MESSAGE', 'Enter Total Amount claim for Assistance !');

// Incentive Part D Form
define('CONSULTANT_NAME_MESSAGE', 'Enter Name and Address of auditing Institution / consultant for Energy / Water !');
define('SUGGESTION_MESSAGE', 'Enter Brief of suggestions / recommendation of the Audit Study !');
define('RESULT_BENEFIT_MESSAGE', 'Enter Result / Benifits after implementation of energy / water saving equipments !');
define('TOTAL_EXPENDITURE_MESSAGE', 'Enter Total Expenditure made on Energy / water Conservation !');
define('AUDIT_FEES_MESSAGE', 'Enter Audit Fees !');
define('EQUIPMENT_COST_MESSAGE', 'Enter cost of equipments recommendation by Institution !');
define('EQUIPMENT_NAME_MESSAGE', 'Enter Equipment Name !');
define('COST_MESSAGE', 'Enter Cost !');

// Incentive Part E Form
define('REQUIT_EMP_MESSAGE', 'Enter Total Number of Local Employment Newly recruited !');
define('EMP_EXPENDITURE_MESSAGE', 'Enter Total Expenditure made on Local Employment !');
define('ASSCLAIM_AMOUNT_MESSAGE', 'Enter Total Amount Claim for Assistance !');

// Incentive Part F Form
define('INTREST_SUBSIDY_MESSAGE', 'Enter Interest Subsidy !');
define('OTHER_INFO_MESSAGE', 'Enter Other Information !');

// Incentive Part G Form
define('SECTOR_TEXTILE_MESSAGE', 'Enter Sector of Technical Textile !');

// Incentive Part H Form
define('JUSTIFICATION_MESSAGE', 'Enter Details with Justification !');
define('PROCESS_DETAIL_MESSAGE', 'Enter Brief of New Technology with manufacturing process & details thereof !');
//define('NAME_ADDRESS_MESSAGE', 'Enter Name & Address of the entity from which Technology will be acquired along with copy of !');
define('PURCHASE_MESSAGE', 'Enter Purchase of Design & Drawings !');
define('TECHNOLOGY_FEES_MESSAGE', 'Enter Technology Development Fees to Experts / R&D Institutions / Technical Consultancy Firm !');
define('OTHER_DETAIL_MESSAGE', 'Enter Others !');
define('TECHNOLOGY_PURPOSE_MESSAGE', 'Select Purpose of Technology !');

//NOC of Leased
define('STATE_MESSAGE', 'Select State / U.T. !');
define('TALUKA_MESSAGE', 'Select Taluka !');
define('PINCODE_MESSAGE', 'Enter Pincode !');
define('LOAN_AMOUNT_MESSAGE', 'Enter  Loan amount !');
define('PLOT_NO_MESSAGE', 'Select Plot No. !');
define('SURVEY_NO_MESSAGE', 'Enter Survey No. !');
define('ADMEASURING_MESSAGE', 'Enter Admeasuring square metre !');
define('GOVT_INDUSTRIAL_AR_MESSAGE', 'Enter  Government Industrial Estate Area !');
define('PURPOSE_MESSAGE', 'Enter Purpose Of Loan  !');
define('ACCOUNT_NO_MESSAGE', 'Enter Account Number !');
define('BRANCH_NAME_MESSAGE', 'Enter Branch Name !');
define('APPLICATION_DATE_MESSAGE', 'Select Application Date!');
define('LOAN_FROM_DATE_MESSAGE', 'Select From Date');
define('LOAN_TO_DATE_MESSAGE', 'Select To Date !');

//Sale/Transfer of Leased
define('REASONOF_TRANSFER_MESSAGE', 'Enter Reason Of Transfer !');
define('TRANSFERER_NAME_MESSAGE', 'Enter Transferer Name !');
define('NAME_OF_SERVICING_MESSAGE', 'Enter Name of Servicing !');
define('OTHER_SERVICES_MESSAGE', 'Enter Other Servicing !');
define('AADHAR_NO_MESSAGE', 'Enter Aadhar Number !');
define('PAN_NO_MESSAGE', 'Enter Pan Number !');
define('GST_NO_MESSAGE', 'Enter GST Number !');
define('REQUEST_LETTER_MESSAGE', 'Select appropriate option to upload !');
define('PROJECT_REPORT_MESSAGE', 'Select appropriate option to upload !');
define('CONSTITUTION_PROJECT_MESSAGE', 'Select appropriate option to upload !');
define('VALID_AUTHORIZATION_MESSAGE', 'Select appropriate option to upload !');

//Sub_letting Form
define('NAME_OF_MANUFACTRING_MESSAGE', 'Enter name of  manufacturing !');

//Repairer Renewal Form
define('PROPOSE_CHANGE_MESSAGE', 'Enter any Changes !');
define('PRODUCTION_SALES_MESSAGE', 'Enter Details of production and sales !');
define('LICENSE_NUMBER_MESSAGE', 'Enter License Number !');

// Occupancy Certificate
define('OCCUPANCY_PLOT_NO_MESSAGE', 'Enter Plot  No !');
define('ZONE_MESSAGE', 'Enter Zone !');
define('SITUATED_AT_MESSAGE', 'Enter Situated At !');
define('LICENSE_NO_MESSAGE', 'Permission / License No !');
define('COMPLETION_ON_DATE_MESSAGE', 'Enter Building Completed On !');
define('LICENSED_ENGINEER_NAME_MESSAGE', 'Enter Name of the Licensed Architect / Engineer / Surveyor / Structural Engineer !');
define('OWNER_NAME_MESSAGE', 'Enter Name of Owner !');
define('OCCUPANCY_REGISTRATION_NO_MESSAGE', 'Enter Registration No. !');
define('OCCUPANCY_VALID_UPTO_MESSAGE', 'Enter Valid upto !');
define('OCCUPANCY_ADDRESS_MESSAGE', 'Enter Address !');

// Film Shooting
define('PRODUCTION_HOUSE_MESSAGE', 'Enter Production House/Company/Producer !');
//define('PERMANENT_ADDRESS_MESSAGE', 'Enter Permanent Address !');
define('PRODUCTION_MANAGER_MESSAGE', 'Enter Production Manager !');
define('CONTACT_NO_MESSAGE', 'Enter Contact No/Facsimile !');
define('DIRECTOR_MESSAGE', 'Enter Director/Cast !');
define('FILM_TITLE_MESSAGE', 'Enter Film Title !');
define('FILM_SYNOPSIS_MESSAGE', 'Enter Film Synopsis Mandatory !');
define('FILM_SHOOTING_DAYS_MESSAGE', 'Enter Number Of Film Shooting Days In Goa !');
define('SHOOTING_LOCATION_MESSAGE', 'Enter Film Shooting Locations !');
define('SHOOTING_DATE_MESSAGE', 'Enter Film Shooting date (s) & timings !');
define('DEFENSE_INSTALLATION_MESSAGE', 'Enter  Defense Installations Are Involved !');
define('UNDERSIGNED_MESSAGE', 'Enter  Undersigned !');
define('AGED_YEAR_MESSAGE', 'Enter  Aged !');
define('RESIDENT_MESSAGE', 'Enter  Defense Resident !');
define('DECPURPOSE_MESSAGE', 'Enter  Purpose !');
define('WITNESS_NAME_MESSAGE', 'Enter  Witness Name !');
define('VILLAGE_NAME_MESSAGE', 'Select Village Name  !');

//Sub Lessee
define('REQUEST_LETTER_MANUFACTURE_MESSAGE', 'Select appropriate option to upload request letter of manufacture item !');
define('DETAIL_PROJECT_MANUFACTURE_MESSAGE', 'Select appropriate option to upload detail of project report !');

define('MEMORANDUM_PARTNERSHIP_DEED_MESSAGE', 'Select appropriate option to upload constitution of the project viz. memorandum and article association/partnership !');
define('SUBLESSE_SIGN_MESSAGE', 'Select appropriate option to upload Valid authorization to sign on behalf of Sub-Lessee !');

// Travel Agency
define('TRAVEL_AGENCY_NAME_MESSAGE', 'Enter Name of the Travel Agency !');
define('ADDRESS_OF_AGENCY_MESSAGE', 'Enter Address of the Agency !');
define('AREA_OF_AGENCY_MESSAGE', 'Enter Area where the travel agency is being operated/to be operated !');

// Property Registration
define('PARTY_TYPE_MESSAGE', 'Select Party Type !');
define('DOCUMENT_TYPE_MESSAGE', 'Select Document Type !');
define('PARTY_NAME_MESSAGE', 'Enter Party Name !');
define('PARTY_ADDRESS_MESSAGE', 'Enter Party Address !');
define('APPOINTMENT_DATE_MESSAGE', 'Select Appointment Date !');
define('PROPERTY_DESCRIPTION_MESSAGE', 'Enter Property Description/Schedule !');
define('SELECT_TIME_MESSAGE', 'Select time for Appointment !');

// Tourism Event
define('NAME_OF_EVENT_MESSAGE', 'Enter Name of the event !');
define('LOCATION_OF_EVENT_MESSAGE', 'Enter Location of the event !');
define('TIME_OF_EVENT_MESSAGE', 'Slect Time of event !');
define('DURATION_OF_MESSAGE', 'Enter Duration of event !');

//Construction Permission
define('BUILDING_NO_MESSAGE', 'Enter Building No !');
define('PLOT_NUMBER_MESSAGE', 'Enter Plot No !');
define('REVENUE_NO_MESSAGE', 'Enter Revenue No !');
define('CTS_NO_MESSAGE', 'Enter CTS no!');
define('STREET_NAME_MESSAGE', 'Enter Road/Street Name!');
define('ARCHITECT_NAME_MESSAGE', 'Enter Architect Name  !');
define('ARCHITECT_LICENSE_MESSAGE', 'Enter Architect Liscense No !');
define('UPLOAD_MESSAGE', 'Select appropriate option to upload !');
define('OWNER_ADDRESS_MESSAGE', 'Enter Address  !');
//define('OWNER_NAME_MESSAGE', 'Enter Name of Owner !');
//Site Elevation
define('PLOT_AREA_MESSAGE', 'Select Plot Area !');
define('PTS_NO_MESSAGE', 'Enter PTS No. !');

//Allotment of plot
define('APPLICANT_ADDRESS_MESSAGE', 'Enter Applicant Address!');
define('TELEPHONE_NO_MESSAGE', 'Enter Telephone No !');
define('EXPANSION_INDUSTRY_MESSAGE', 'Enter Category of the Enterprise !');
define('NATURE_OF_INDUSTRAY_MESSAGE', 'Enter Nature of Industry !');
define('PLOT_CHECKLIST_MESSAGE', 'Select Allotment of Plot !');
define('APPLICANT_TYPE_MESSAGE', 'Select Applicant Type !');
define('POSSESSTION_OF_INDUSTRY_MESSAGE', 'Enter Possession Of Industrial Plot !');
define('Detail_MESSAGE', 'Enter Detail !');
define('REASON_OF_LOAN_MESSAGE', 'Select Any One !');
define('NO_OF_LIKLY_EMP_MESSAGE', 'Select Number of Persons likely to be employed !');
define('NO_OF_EMP_MESSAGE', 'Enter Number of employed !');

// Shop & Establishment
define('SHOP_REGISTRATION_NO_MESSAGE', 'Enter Registration No.  !');
define('SHOP_REGISTRATION_CATEGORY_MESSAGE', 'Select Registration Category !');
define('SHOP_NAME_MESSAGE', 'Enter Name  !');
define('SHOP_DOOR_NO_MESSAGE', 'Enter Door No.  !');
define('SHOP_STREET_NAME_MESSAGE', 'Enter Street Name  !');
define('SHOP_LOCATION_MESSAGE', 'Enter Location  !');
define('SHOP_POSTAL_ADDRESS_MESSAGE', 'Enter Postal Address  !');
define('SHOP_OFFICE_LOCATION_MESSAGE', 'Enter Office Loaction  !');
define('SHOP_STORE_ROOM_LOCATION_MESSAGE', 'Enter Store Room Loaction  !');
define('SHOP_GODOWN_LOCATION_MESSAGE', 'Enter Godown Loaction  !');
define('SHOP_WAREHOUSE_LOCATION_MESSAGE', 'Enter Warehouse Loaction  !');
define('SHOP_EMPLOYER_NAME_MESSAGE', 'Enter Employer Name  !');
define('SHOP_EMPLOYER_RESIDENTIAL_ADDRESS_MESSAGE', 'Enter Employer Residential Address  !');
define('SHOP_MANAGER_NAME_MESSAGE', 'Enter Manager Name !');
define('SHOP_MANAGER_RESIDENTIAL_ADDRESS_MESSAGE', 'Enter Manager Residential Address  !');
define('SHOP_PARTNER_NAME_MESSAGE', 'Enter Partner Name !');
define('SHOP_PARTNER_RESIDENTIAL_ADDRESS_MESSAGE', 'Enter Partner Residential Address  !');
define('SHOP_CATEGORY_MESSAGE', 'Enter Categoty of establishment !');
define('SHOP_NATURE_OF_BUSINESS_MESSAGE', 'Enter Nature of Business !');
define('SHOP_DATE_COMMENCEMENT_OF_BUSINESS_MESSAGE', 'Enter Date of Commencement of Business !');
define('SHOP_TREASURY_NAME_MESSAGE', 'Enter Treasury Name !');
define('SHOP_CHALLAN_NO_MESSAGE', 'Enter Challan No !');
define('SHOP_CHALLAN_DATE_MESSAGE', 'Enter Challan Date !');
define('SHOP_AMOUNT_OF_FEES_PAID_MESSAGE', 'Enter Amount of Fees Paid !');
define('SHOP_SIGN_OF_EMPLOYER_MESSAGE', 'Upload Signature of Employer with Stamp !');
define('SHOP_DECLARATION_MESSAGE', 'Select Declaration !');
define('SHOP_CERTIFICATE_EXPIRY_DATE_MESSAGE', 'Enter Certificate Expiry Date !');
define('SHOP_REMARK_MESSAGE', 'Enter Remark !');

// Employees Validation
define('ONE_EMPLOYEE_MESSAGE', 'Enter Atleast One Employee Details!');
define('SHOP_EMPLOYEES_NAME_MESSAGE', 'Enter Employee Name !');
define('SHOP_EMPLOYEES_MANAGERIAL_CAPACITY_MESSAGE', 'Enter Employee Managerial Capacity !');
define('SHOP_EMPLOYEES_TYPE_MESSAGE', 'Enter Employee Type !');
define('SHOP_EMPLOYEES_GODOWN_EMPLOYED_MESSAGE', 'Enter Employee Godown Employed !');

// Establishment
//define('ESTABLISHMENT_REGISTRATION_NO_MESSAGE', 'Enter Establishment Registration No. !');
define('ESTABLISHMENT_NAME_MESSAGE', 'Enter Name of the Establishment !');
define('BUSINESS_TYPE_MESSAGE', 'Enter Nature of Work !');
define('ESTABLISHMENT_LOCATION_MESSAGE', 'Enter Location of the Establishment !');
define('ESTABLISHMENT_POSTAL_ADDRESS_MESSAGE', 'Enter Postal Address of the Establishment !');
define('PRINCIPLE_EMPLOYER_FULL_NAME_MESSAGE', 'Enter Full Name of the Principal Employer !');
define('PRINCIPLE_EMPLOYER_ADDRESS_MESSAGE', 'Enter Address of the Principal Employer !');
define('MANAGER_FULL_NAME_MESSAGE', 'Enter Full Name of Manager !');
define('MANAGER_ADDRESS_MESSAGE', 'Enter Address of Manager !');
define('CERTIFICATE_EXPIRY_DATE_MESSAGE', 'Enter Certificate Valid up-to Date !');
//define('ESTABLISHMENT_REMARK_MESSAGE', 'Enter Remark !');
define('TREASURY_RECIPT_ENCLOSED_MESSAGE', 'Upload Particulars of Treasury Receipt Enclosed Challan !');
define('ESTABLISHMENT_SEAL_STEMP', 'Upload Principal Employer Seal and Stamp !');
define('ESTABLISHMENT_CHALLAN_NO_MESSAGE', 'Enter Establishment Challan No. !');
define('ESTABLISHMENT_CHALLAN_DATE_MESSAGE', 'Enter Establishment Challan Date !');
define('ESTABLISHMENT_DECLARATION_MESSAGE', 'Select Declaration !');

// Contractor
define('CONTRACTOR_PROPRITER_NAME_MESSAGE', 'Enter Contractor Establishment Name !');
define('CONTRACTOR_NAME_MESSAGE', 'Enter Name of Contractor !');
define('CONTRACTOR_ADDRESS_MESSAGE', 'Enter Contractor Address !');
//define('ONE_CONTRACTOR_MESSAGE', 'Enter Atleast One Contractor Details!');
define('CONTRACTOR_NATURE_WORKING_MESSAGE', 'Enter Nature of Work !');
define('CONTRACTOR_LABOUR_MESSAGE', 'Enter Max No. of Contract Labour !');
define('CONTRACTOR_START_DATE_MESSAGE', 'Enter Contract Start Date !');
define('CONTRACTOR_TERMINATION_DATE_MESSAGE', 'Enter Contract Termination Date !');
define('CONTRACTOR_PERMANENT_ADDRESS_MESSAGE', 'Enter Permanent Address of Contractor !');

//// Boiler Manufacture
define('FIRM_NAME_MESSAGE', 'Enter Name Of the firm !');
define('WORKSHOP_ADDRESS_MESSAGE', 'Enter Address of the Workshop !');
define('COMM_ADDRESS_MESSAGE', 'Enter Address for Communication !');
define('JOB_TYPE_MESSAGE', 'Enter Type of jobs executed by the firm earlier !');
define('TOOLS_MESSAGE', 'Enter tools And tackles !');
define('STANDARD_WORK_MESSAGE', 'Enter the firm is prepared to execute the job Strictly !');
define('CONTROVERSIAL_ISSUE_MESSAGE', 'Enter the firm is prepared to accept full Responsibility for the work done !');
define('QUALITY_CONTROL_MESSAGE', 'Enter internal quality control Details !');
define('POWER_SANCTION_MESSAGE', 'Enter Details of power sanction !');
define('NOC_COPY_MESSAGE', 'Upload Copy of NOC from Local authorities !');
define('CONVERSANT_MESSAGE', 'Enter the firm is conversant with the Boilers Act,1923 and Indian Boiler Regulation, 1950 !');
define('WORKSHOP_PLAN_MESSAGE', 'Upload plan of workshop !');
define('INSTRUMENT_CALIBRATE_MESSAGE', 'Enter aforesaid instruments are calibrated Details !');
define('TESTING_FACILITY_MESSAGE', 'Enter Details of Testing facilities available !');
define('RECORD_SYSTEM_MESSAGE', 'Enter the recording system of documents !');
define('SIGN_SEAL_MESSAGE', 'Upload Signature & Seal !');

define('SUPERVISOR_NAME_MESSAGE', 'Enter Supervisor Name !');
define('QUALIFICATION_MESSAGE', 'Enter Qualification !');
define('EXPERIENCE_MESSAGE', 'Enter Experience !');
define('WELDERS_NAME_MESSAGE', 'Enter welder Name !');
define('WELDERS_CERTIFICATE_MESSAGE', 'Upload welder Certificate !');

// Single Return Form
define('TEL_NUMBER_MESSAGE', 'Enter Telephone Number !');
define('FAX_NUMBER_MESSAGE', 'Enter Fax Number !');
define('EMP_NAME_MESSAGE', 'Enter Name Of the Employer/Occupier/contractor !');
define('EMP_ADDRESS_MESSAGE', 'Enter Address Of the Employer/Occupier/contractor !');
define('MANAGER_PERSON_NAME_MESSAGE', 'Enter Name Of the Manager Person responsible for supervision !');
define('MANAGER_PERSON_ADDRESS_MESSAGE', 'Enter Address Of the Manager Person responsible for supervision !');
define('REGISTRATION_NUMBER_MESSAGE', 'Enter Registration No. of establishment/factory !');
define('COMMENCEMENTS_DATE_MESSAGE', 'Enter Date of commencement of the establishment/factory !');
define('INDUSTRY_NATURE_MESSAGE', 'Enter Nature of industry/activity !');
define('DIRECT_UNSKILLEDMESSAGE', 'Enter Unskilled Employees !');
define('DIRECT_SEMISKILLED_MESSAGE', 'Enter Semi Skilled Employees !');
define('DIRECT_SKILLED_MESSAGE', 'Enter Skilled Employees !');
define('DIRECT_TOTAL_MESSAGE', 'Enter Total Employees !');
define('DIRECT_MALE_MESSAGE', 'Enter Male Employees !');
define('DIRECT_FEMALE_MESSAGE', 'Enter Female Employees !');
define('CONTRACTOR_UNSKILLEDMESSAGE', 'Enter Unskilled Employees !');
define('CONTRACTOR_SEMISKILLED_MESSAGE', 'Enter Semi Skilled Employees !');
define('CONTRACTOR_SKILLED_MESSAGE', 'Enter Skilled Employees !');
define('CONTRACTOR_TOTAL_MESSAGE', 'Enter Total Employees !');
define('CONTRACTOR_MALE_MESSAGE', 'Enter Male Employees !');
define('CONTRACTOR_FEMALE_MESSAGE', 'Enter Female Employees !');
define('TOTAL_UNSKILLEDMESSAGE', 'Enter Unskilled Employees !');
define('TOTAL_SEMISKILLED_MESSAGE', 'Enter Semi Skilled Employees !');
define('TOTAL_SKILLED_MESSAGE', 'Enter Skilled Employees !');
define('TOTAL_TOTAL_MESSAGE', 'Enter Total Employees !');
define('TOTAL_MALE_MESSAGE', 'Enter Male Employees !');
define('TOTAL_FEMALE_MESSAGE', 'Enter Female Employees !');

//part A
define('WORKED_DAYS_MESSAGE', 'Enter Number of days the esytablishment/factory worked in this year !');
define('MAN_WORKED_DAYS_MESSAGE', 'Enter The number of man days worked in the year !');
define('AVERAGE_EMP_MESSAGE', 'Enter The Number of Average employees employed in the year !');
define('MALE_WAGES_MESSAGE', 'Enter Total wages paid to Male !');
define('FEMALE_WAGES_MESSAGE', 'Enter Total wages paid to Female !');
define('TOTAL_FINE_MESSAGE', 'Enter Total Fine Imposed !');
define('DEDUCTION_MESSAGE', 'Enter Other Deduction !');

//part B
define('PERCENTAGE_BONUS_MESSAGE', 'Enter Percentage of bonus paid !');
define('NO_OF_BENEFICIARIES_MESSAGE', 'Enter Number of baneficiaries !');
define('BONUS_PAID_MESSAGE', 'Enter Total amount of bonus paid !');
define('PAYMENT_DATE_MESSAGE', 'Enter Date of payment !');
define('BONUS_REASON_MESSAGE', 'Enter If bonus is not paid, reason there of !');

//part C
define('CONTRACTOR_NATURE_MESSAGE', 'Enter Nature of work/operations of contractor !');
define('EMPLOYED_LABOUR_MESSAGE', 'Enter Total number of days during the year on which contract labour was employed !');
define('LABOUR_WORKED_DAYS_MESSAGE', 'Enter Total number of man days worked during the year by the contract labour !');
define('EMPLOYED_DIRECT_LABOUR_MESSAGE', 'Enter Total number of days during the year on which direct labour was employed !');
define('DIRECT_LABOUR_WORKED_DAYS_MESSAGE', 'Enter Total number of man days worked by direct labour !');
define('CHNAGE_MANAGEMENT_DETAILS_MESSAGE', 'Enter Change, if any, in the management of establishments !');

define('CONTRACT_DURATION_MESSAGE', 'Enter Duration of contract Number of days worked during the year !');
define('CONTRACT_LABOUR_MESSAGE', 'Enter Average number of contract labour worked on any day during the year !');
define('WORK_HOURS_MESSAGE', 'Enter Working hours !');
define('OVERTIME_WORK_DAYS_MESSAGE', 'Enter Overtime work !');
define('WEEKLY_HOLIDAY_MESSAGE', 'Enter Weekly holiday !');
define('SPREAD_OVER_MESSAGE', 'Enter Spread over !');
define('MALE_WORKED_DAYS_MESSAGE', 'Enter Number of mandays worked During the year for male!');
define('FEMALE_WORKED_DAYS_MESSAGE', 'Enter Number of mandays worked During the year for female!');
define('TOTAL_WORKED_DAYS_MESSAGE', 'Enter Total !');
define('PAID_AMOUNT_MESSAGE', 'Enter Amount of wages paid !');
define('AMOUNT_DEDUCTION_MESSAGE', 'Enter Amount of deduction from wages !');

//part D
define('FIN_MESSAGE', 'Enter FIN (Factory Identification Number) !');
define('NIC_CODE_MESSAGE', 'Enter NIC code !');
define('SECTOR_MESSAGE', 'Select Sector !');
define('REGISTRATION_SECTION_MESSAGE', 'Select Registration Under Section !');
define('FACTORY_REGISTRATION_NUMBER_MESSAGE', 'Enter Registration Number !');
define('LICENSE_NUMNER_MESSAGE', 'Enter License Number !');
define('LICENSE_WORKER_MESSAGE', 'Enter Licensed Workers !');
define('LICENSE_HP_MESSAGE', 'Enter Lisensed H.P. !');
define('LICENSE_RENEWAL_YEAR_MESSAGE', 'Enter Licensed Renewal position !');
define('LICENSE_SUBMIT_YEAR_MESSAGE', 'Enter Licensed Renewal Application submitted for the year !');
define('PLAN_APPROVAL_NUMBER_MESSAGE', 'Enter Plan Approval No. !');
define('PLAN_APPROVAL_DATE_MESSAGE', 'Enter Plan Approval Date !');
define('CERTIFICATE_OBTAIN_DATE_MESSAGE', 'Enter Stability Certificate Obtained On Date !');
define('CERTIFICATE_SUBMIT_DATE_MESSAGE', 'Enter Stability Certificate Submitted On Date !');
define('FINISHED_PRODUCT_MESSAGE', 'Enter Finished Product !');
define('INTERMEDIATES_MESSAGE', 'Enter Intermediates !');
define('RAW_MATERIAL_MESSAGE', 'Enter Raw materials !');
define('MAL_AVERAGE_WORKERS_MESSAGE', 'Enter Male workers!');
define('FEMALE_AVERAGE_WORKERS_MESSAGE', 'Enter Female workers !');
define('FACTORY_WORKED_DAYS_MESSAGE', 'Enter Number of days the factory worked during previous Year !');
define('ADULT_MEN_MESSAGE', 'Enter Men workers !');
define('ADULT_WOMEN_MESSAGE', 'Enter Women workers !');
define('ADULT_TOTAL_MESSAGE', 'Enter Total workers !');
define('ADOLESCENT_MEN_MESSAGE', 'Enter Men workers !');
define('ADOLESCENT_WOMEN_MESSAGE', 'Enter Women workers !');
define('ADOLESCENT_TOTAL_MESSAGE', 'Enter Total workers !');
define('HYGINISTS_EMPLOYED_MESSAGE', 'Enter Number of industrial Hygienists employed to monitor work, environment as required!');
define('SAFETY_PROVISION_MESSAGE', 'Enter Compliance of safety provisions prescribed under Schedules, including guarding of machinery !');
define('FIGHTING_EQUIPMENTS_MESSAGE', 'Enter Details of fire fighting equipments including water storage capacity & trained personal !');
define('PERSONAL_EQUPMENTS_MESSAGE', 'Enter Details of personal protective equipments provided and special safety equipments !');
define('SAFETY_OFFICER_MESSAGE', 'Enter Details of Safety Officers & Safety Supervisors !');
define('SAFETY_PROGRAMS_MESSAGE', 'Enter Number of Safety programs for training & safety awareness arranged during last year !');
define('WORKER_TRAINED_MESSAGE', 'Enter number of workers trained through it !');
define('AMENDED_DATE_MESSAGE', 'Enter Onsite emergency plan prepared / amended date !');
define('REHEARSAL_DATE_MESSAGE', 'Enter Rehearsals done for Onsite Emergency Plan during last year !');
define('SAFETY_POLICY_MESSAGE', 'Enter Details of Safety Policy, Safety Audit & Safety Report !');
define('CANTEEN_MANAGED_BY_MESSAGE', 'Select canteen managed by !');
define('WORKING_HOURS_MESSAGE', 'Enter Compliance of provisions relating to working hours !');
define('WORKER_DISMISSED_MESSAGE', 'Enter Total number of workers discharged / dismissed from the service !');
define('PAID_LEAVE_WORKER_MESSAGE', 'Enter Number of workers in respect of whom wages : in lieu of leave were paid !');
define('ACCIDENTS_OCCURRENCES_MESSAGE', 'Enter Value !');
define('INJURIES_OCCURING_MESSAGE', 'Enter Value !');
define('FATAL_INJURIES_MESSAGE', 'Enter Number of injuries !');
define('NONFATAL_INJURIES_MESSAGE', 'Enter Mandays lost due to injuries !');
define('RETURN_FATAL_INJURIES_MESSAGE', 'Enter Number of injuries !');
define('RETURN_NONFATAL_INJURIES_MESSAGE', 'Enter Mandays lost due to injuries !');
define('NO_OF_WASHROOM_MESSAGE', 'Enter Number of Urinals,Latrines & Bathroom !');
define('RETAINER_SHIP_MESSAGE', 'Select Retainer Ship !');

define('PROCESS_NAME_MESSAGE', 'Enter Process Name !');
define('EMPLOYED_PERSON_MESSAGE', 'Enter Employed Person !');
define('EXAMINED_MALE_MESSAGE', 'Enter Examined Male !');
define('EXAMINED_FEMALE_MESSAGE', 'Enter Examined Female !');
define('UNFIT_MALE_MESSAGE', 'Enter Unfit Male !');
define('UNFIT_FEMALE_MESSAGE', 'Enter unfit Female !');

//part E
define('RESPECT_OF_FINES_MESSAGE', 'Enter Whether applicantion in respect of Fines being Imposed on the employees in sent !');
define('ADULT_WORKED_DAYS_MESSAGE', 'Enter Number of man days worked as Adult !');
define('YOUNG_PERSON_WORKED_DAYS_MESSAGE', 'Enter Number of man days worked as Young Persons !');
define('ADULTS_WORKERS_EMPLOYED_MESSAGE', 'Enter Average number of workers employed daily as Adult !');
define('YOUNG_PERSON_WORKERS_EMPLOYED_MESSAGE', 'Enter Average number of workers employed daily as Young Persons !');
define('BASIC_WAGES_MESSAGE', 'Enter Basic wages !');
define('DEARNESS_ALLOWANCES_MESSAGE', 'Enter Dearness Allowances !');
define('COMPOSITE_WAGES_MESSAGE', 'Enter Composite wages !');
define('OVER_TIME_WAGES_MESSAGE', 'Enter Overtime Wages !');
define('NON_PROFIT_BONUS_MESSAGE', 'Enter Non-profit sharing bonus !');
define('OTHER_BONUS_MESSAGE', 'Enter Any Other Bonus !');
define('OTHER_AMOUNT_MESSAGE', 'Enter Any other amount paid in cash which may form part of wages as define under the Act !');
define('ARREARS_OF_PAT_MESSAGE', 'Enter Arrears of pat in respects of Previous year during the year !');
define('TOTAL_WAGES_MESSAGE', 'Enter Total wages paid !');
define('YEAR_TOTAL_WAGES_MESSAGE', 'Enter Total wages paid during the year !');
define('YEAR_PAID_BONUS_MESSAGE', 'Enter Bonus paid during the year !');
define('COMMISION_AMOUNT_MESSAGE', 'Enter Amount of money Value of Commision given during the year !');
define('REALIZED_AMOUNT_MESSAGE', 'Enter Deduction number of case and amount realized !');

//part f
define('NO_OF_FEMALE_WORKERS_MESSAGE', 'Enter Number of female workers employed on any day !');
define('NO_OF_MATERNITY_WOMEN_WORKERS_MESSAGE', 'Enter Number of women workers, claimed Maternity benefits/ No, paid !');
define('MEDICAL_BONUS_MESSAGE', 'Enter No. of case in which medical Bonus is claimed/paid !');
define('MISCARRIAGE_LEVEL_MESSAGE', 'Enter No. of case of leave for miscarriage is applied/granted !');
define('ADDITIONAL_LEAVE_MESSAGE', 'Enter Number of cases of additional leave for illness applied/granted !');
define('MATERNITY_BENEFIT_AMOUNT_MESSAGE', 'Enter Total Amount of Maternity Benefit paid !');
define('DISMISSED_WOMEN_MESSAGE', 'Enter Number of women dismissed !');
define('DISMISSED_REASON_MESSAGE', 'Enter Reason thereof !');

//part g
define('NO_OF_EMPLOYED_WORKERS_MESSAGE', 'Enter Total No. of  workers employed !');
define('NO_OF_HANDICAPPED_EMPLOYED_MESSAGE', 'Enter Number of physically handicapped persons employed !');

//BOCW Module
define('NAME_LOCATION_MESSAGE', 'Enter Name and Location of the Establishment !');
define('POSTAL_ADDRESS_MESSAGE', 'Enter Postal Address of the Establishment !');
//define('NAME_ADDRESS_MESSAGE', 'Enter Name and Address of the Establishment !');
define('MANAGER_NAME_ADDRESS_MESSAGE', 'Enter Name and Address of the Manager !');
define('BUILDING_NATURE_MESSAGE', 'Enter Nature of building or other construction work !');
define('MAX_NUMBER_MESSAGE', 'Enter Maximum number of building workers to be employed !');
//define('COMMENCEMENT_DATE_MESSAGE', 'Enter Estimated date of commencement !');
define('COMPLETION_DATE_MESSAGE', 'Enter Estimated date of completion !');
define('PARTICULARS_MESSAGE', 'Enter Particulars of demand draft, enclosed !');
define('AMOUNT_MESSAGE', 'Enter Amount !');
define('DRAF_NO_MESSAGE', 'Enter demand draf No. !');
define('DRAF_DATE_MESSAGE', 'Enter demand draf Date !');
//define('DECLARATION_ONE_MESSAGE', 'Please Tick !');
//define('DECLARATION_TWO_MESSAGE', 'Please Tick !');
//define('UPLOAD_DOCUMENT_MESSAGE', 'Upload Valid Document !');
//define('APP_DRAFT_MESSAGE', 'Application Save as Draft Successfully  !');
//define('APP_SUBMITTED_MESSAGE', 'Application Submitted Successfully  !');
define('INVALID_IP_MESSAGE', 'Invalid IP Address !');
define('RECORDS_UPDATED_MESSAGE', 'Records Updated Successfully  !');

//Factory License Module
define('FACTORY_NAME_MESSAGE', 'Enter Name of factory !');
define('FACTORY_LICENSE_NO_MESSAGE', 'Enter Factory Licence number !');
//define('FACTORY_ADDRESS_MESSAGE', 'Enter Factory Address !');
define('FACTORY_POSTAL_ADDRESS_MESSAGE', 'Enter postal address of factory !');
define('MANUFACTURING_NATURE_MESSAGE', 'Enter Nature of manufacturing process !');
define('MAX_WORKER_MESSAGE', 'Enter Maximum number of workers !');
define('POWER_MESSAGE', 'Enter total amount of power !');
define('MAX_POWER_MESSAGE', 'Enter Maximum amount of power !');
define('MANAGER_MESSAGE', 'Enter name and residential address of the manager !');
define('OCCUPIER_MESSAGE', 'Enter name and residential address of the Occupier !');
define('FACTORY_PROPRIETOR_MESSAGE', 'Enter proprietor of the factory !');
define('SHARE_HOLDER_MESSAGE', 'Enter share holders !');
define('CHIEF_HEAD_MESSAGE', 'Enter chief administrative head !');
define('OWNER_MESSAGE', 'Enter name and address of the owner !');
define('REFERENCE_NO_MESSAGE', 'Enter Reference number !');
define('APPROVAL_DATE_MESSAGE', 'Enter Date of approval !');
define('DISPOSAL_WASTE_MESSAGE', 'Enter Disposal of trade waste and affluent !');
define('AUTHORITY_NAME_MESSAGE', 'Enter Name of the authority granting such approval !');
define('OCCUPIER_SIGN_MESSAGE', 'Upload Signature of Occupier !');
//define('PRODUCT_NAME_MESSAGE', 'Enter Product Name !');
define('PRODUCT_VALUE_MESSAGE', 'Enter Product Value !');
define('DIRECTOR_NAME_MESSAGE', 'Enter Directors !');
//define('MANAGER_NAME_MESSAGE', 'Enter Managing employee !');
define('MANAGING_DIRECTOR_MESSAGE', 'Enter Managing Directors !');
define('FACTORY_LICENSE_SAVED_MESSAGE', 'Saved Successfully  !');
define('FACTORY_LICENSE_UPDATED_MESSAGE', 'Updated Successfully  !');
define('INVALID_ID_MESSAGE', 'Select Valid ID !');

////Building plan Module
//define('APPLICANT_NAME_MESSAGE', 'Enter Name of Applicant !');
define('APPLICANT_PHNO_MESSAGE', 'Enter Phone No of Applicant !');
define('APPLICANT_EMAIL_MESSAGE', 'Enter Email of Applicant !');
define('FACTORY_BUILDING_MESSAGE', 'Enter the Factory Building !');
define('FACTORY_SECTOR_MESSAGE', 'Enter the Factory Street No./Sector !');
define('FACTORY_CITY_MESSAGE', 'Enter the City !');
define('FACTORY_PINCODE_MESSAGE', 'Enter the Pincode !');
define('FACTORY_DISTRICT_MESSAGE', 'Enter the District !');
define('FACTORY_TOWN_MESSAGE', 'Enter the Town / Village !');
define('POLICE_STATION_MESSAGE', 'Enter Nearest Police Station !');
define('RAILWAY_STATION_MESSAGE', 'Enter Nearest Railway Station !');
define('PLAN_MESSAGE', 'Enter Particulars Of Plant !');
define('FLOW_CHART_MESSAGE', 'Upload Flow Chart of the Manufacturing Process !');
define('SITE_PLAN_MESSAGE', 'Upload site Plan of Factory !');
define('ELEVATION_DOCUMENT_MESSAGE', 'Upload Elevation Document !');
define('APPLICANT_SIGN_MESSAGE', 'Upload Signature of Applicant !');

//Boiler Act
//define('OWNER_NAME_MESSAGE', 'Enter Name Of Owner !');
define('BOILER_SITUATION_MESSAGE', 'Enter Situation of Boiler !');
define('BOILER_TYPE_MESSAGE', 'Enter Boiler Type !');
//define('DISTRICT_MESSAGE', 'Enter District !');
define('UT_MESSAGE', 'Enter Name U. T. !');
define('WORKING_PRESSURE_MESSAGE', 'Enter Working Pressure Of Boiler (kg/cm2) !');
define('MAX_PRESSURE_MESSAGE', 'Enter Max Pressure Approved (Kg/cm2) !');
define('HEATING_SURFACE_MESSAGE', 'Enter Heating Surface Area / Boiler Rating (m2) !');
define('LENGTH_PIPES_MESSAGE', 'Enter Total Length of steam Pipes (in meters) !');
define('MAX_EVAPORATION_MESSAGE', 'Enter Maximum Continuous Evaporation !');
define('MANUFACTURE_PLACE_MESSAGE', 'Enter Place Of Manufacture !');
define('MANUFACTURE_YEAR_MESSAGE', 'Enter Year Of Manufacture !');
define('MANUFACTURE_NAME_MESSAGE', 'Enter Name Of Manufacture !');
define('MANUFACTURE_ADDRESS_MESSAGE', 'Enter Manufacture Address !');
define('HYDRULICALLY_TESTED_ON_MESSAGE', 'Enter Hydraulically Tested On !');
define('HYDRULICALLY_TESTED_MESSAGE', 'Enter Hydraulically Tested To !');
define('REPAIRS_MESSAGE', 'Enter Repairs !');
define('REMARK_MESSAGE', 'Enter Remarks !');
define('PIPELINE_DRAW_MESSAGE', 'Upload Steam Pipe Line Drawings !');
define('COPY_OF_CHALLAN_MESSAGE', 'Upload Copy of challan in respect of the fees paid !');
define('IBR_DOCUMENT_MESSAGE', 'Upload IBR Documents !');

//Allotment of Plot
define('PROMOTION_COUNCIL_MESSAGE', 'Please Upload Document of 100% EOU if Yes & Please Upload Document Of EOU If not 100%? ');

// NA Application
define('OCCUPATION_MESSAGE', 'Enter Occupation !');
define('NA_PURPOSE_MESSAGE', 'Assessed or held for the purpose of agriculture for the non-agricultureal purpose/purposes !');
define('NA_SURVEY_NO_MESSAGE', 'Enter Survey No. Hissa No. of the land !');
define('NA_AREA_ASSESSMENT_MESSAGE', 'Enter Area and assessment/rent of the land !');
define('NA_AREA_SITE_MESSAGE', 'Select Area of the site of (5) above proposed to be used for the !');
define('NA_OCCUPANT_CLASS_MESSAGE', 'Select Whether the applicant is occupant Class-I or Class-II or a tenamt or a government lessee !');
define('NA_PRESENT_USE_MESSAGE', 'Enter Present use of the land whether any building exists thereon and if so its use !');
define('NA_SITUATED_LAND_MESSAGE', 'Select Whether the land is situated or included !');
define('NA_ELECTRICAL_DISTANCE_LAND_MESSAGE', 'Select Whether electrical high transmission way, road, canal, nalla) pass over/through the land and if so what is the distance thereof from the proposed building or other works. !');
define('NA_ACQUISITIONS_UNDER_LAND_MESSAGE', 'Select Is the land under acquisitions if so, state details. !');
define('NA_ACCESSIBLE_LAND_MESSAGE', 'Select Is there a road from where the land is easily accessible ? State the name of the road and whether it is Highway, Major district road or village road. What is the distance of the proposed building or other work from the centre of the road? !');
define('NA_SITE_ACCESS_LAND_MESSAGE', 'Select If there is no road adjoining the land how is it proposed to provide for access to the site ? ( Please referpoint No. 2 (b) herebefore) !');
define('NA_REJECTED_LAND_MESSAGE', 'Select Was a similar application made in the past for non-agricultural use of this land and was it rejected? If yes, Why ? !');

//APPLICATION OF LIOCENCE
define('CONTRACTOR_FATHER_NAME_MESSAGE', 'Enter Contractor Father Name !');
define('CONTRACTOR_CONTACT_MESSAGE', 'Enter Contractor Contact No. !');
define('ESTABLISHMENT_ADDRESS_MESSAGE', 'Enter Establishment Address !');
define('CERTIFICATE_NO_MESSAGE', 'Enter Registration Certificate No.!');
define('EMPLOYER_NAME_MESSAGE', 'Enter Employer Name !');
define('EMPLOYER_ADDRESS_MESSAGE', 'Enter Employer Address !');
define('NATURE_PROCESS_MESSAGE', 'Enter Nature of process engaged with establishment!');
define('NATURE_PROCESS_LABOUR_MESSAGE', 'Enter Nature of process work for which contract labour !');
define('DURATION_WORK_MESSAGE', 'Duration Of Work !');
define('NAME_OF_AGENT_MESSAGE', 'Enter Agent Name !');
define('AGENT_ADDRESS_MESSAGE', 'Enter Agent Address !');
define('MAX_NO_MESSAGE', 'Maximum No. of employess !');
define('DETAIL_WORK_MESSAGE', 'Enter Detail Of Work!');
define('ESTABLISHMENT_MESSAGE', 'Enter Estimated value !');
define('TRESURY_RECEIPT_MESSAGE', 'Enter Treasury receipt !');
define('TRESURY_RECEIPT_DATE_MESSAGE', 'Select Treasury receipt Date !');
define('PLACE_MESSAGE', 'Enter Place !');
define('FEES_MESSAGE', 'Enter Fee !');

//Query Grievance
define('QUERY_DISTRICT_MESSAGE', 'Select District !');
define('ISSUE_CATEGORY_MESSAGE', 'Select Issue Category !');
define('QUERY_DEPARTMENT_MESSAGE', 'Select Department !');
define('APPLICANT_FULL_NAME_MESSAGE', 'Enter Full Name !');
define('BUSINESS_NAME_MESSAGE', 'Enter Business Name !');
define('APPLICATION_NUMBER_MESSAGE', 'Enter Application Number !');
define('QUERY_DETAIL_MESSAGE', 'Enter Query Detail !');
define('QUERY_RESPONSE_DETAIL_MESSAGE', 'Enter Query Response !');
define('QUERY_OTHER_DEPARTMENT_MESSAGE', 'Enter Other Department Name !');

// Complainant Module
define('CNAME_MESSAGE', 'Enter Complainant Name !');
define('CADDRESS_MESSAGE', 'Enter Complainant Address !');
define('CBNAME_MESSAGE', 'Enter Company / Business Name !');
define('CBADDRESS_MESSAGE', 'Enter Company / Business Address !');
define('IR_UPLOAD_MESSAGE', 'Inspection Report Uploaded Successfully !');

//Reporting/Informing/Intimation to Legal Metrology Office
define('USER_NAME_MESSAGE', 'Enter Name of User/ Premises  !');
define('TRADE_MESSAGE', 'Select Treade !');
define('REPORT_MESSAGE', 'Select Report/Intimate/Inform !');

define('PROMOTER_NAME_MESSAGE', 'Enter Promoter Name !');
define('PROMOTER_DESIGNATION_MESSAGE', 'Enter Promoter Designation !');
define('AP_NAME_MESSAGE', 'Enter Authorized Person !');
define('AP_DESIGNATION_MESSAGE', 'Enter Authorized Designation !');

// Periodical Return
define('SELECT_APPLICATIN_CATEGORY', 'Select Application Category !');
define('LICENCE_DATE', 'Enter Licence Date !');

define('DESCRIPTION_MESSAGE', 'Enter Description !');
define('ONE_FEE_MESSAGE', 'Enter Atleast One Fees Details !');
define('FEE_UPATED_MESSAGE', 'Fee Details Updated Successfully !');
define('HEAD_DETAILS_SUBMITTED_MESSAGE', 'Head Details Submitted Successfully !');

define('RES_NOT_REC_MESSAGE', 'Response Not Received !');

define('FROM_TO_DATE_MESSAGE', 'Select From Date or To Date !');

define('WITHDRAW_APPLICATION_MESSAGE', 'Application Withdraw Successfully !');
define('ALREADY_WITHDRAW_APPLICATION_MESSAGE', 'Application Already Withdraw !');
