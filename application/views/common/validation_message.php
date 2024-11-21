<script type="text/javascript">
    var baseUrl = '<?php echo base_url(); ?>';
    var invalidAccessValidationMessage = '<?php echo INVALID_ACCESS_MESSAGE ?>';
    var passwordPolicyValidationMessage = '<?php echo PASSWORD_POLICY_MESSAGE ?>';
    var passwordAndRetypePasswordValidationMessage = '<?php echo PASSWORD_AND_RETYPE_PASSWORD_NOT_MATCH_MESSAGE; ?>';
    var noRecordFoundMessage = '<?php echo NO_RECORD_FOUND_MESSAGE; ?>';
    var emailValidationMessage = '<?php echo EMAIL_MESSAGE; ?>';
    var invalidEmailValidationMessage = '<?php echo INVALID_EMAIL_MESSAGE; ?>';
    var dateValidationMessage = '<?php echo DATE_MESSAGE; ?>';
    var mobileValidationMessage = '<?php echo MOBILE_NUMBER_MESSAGE; ?>';
    var invalidMobileValidationMessage = '<?php echo INVALID_MOBILE_NUMBER_MESSAGE; ?>';
    var pinValidationMessage = '<?php echo PIN_MESSAGE; ?>';
    var sixDigitPinValidationMessage = '<?php echo SIX_DIGIT_PIN_MESSAGE; ?>';
    var invalidPinValidationMessage = '<?php echo INVALID_PIN_MESSAGE; ?>';
    var currentPinValidationMessage = '<?php echo CURRENT_PIN_VALIDATION_MESSAGE; ?>';
    var newPinValidationMessage = '<?php echo NEW_PIN_VALIDATION_MESSAGE; ?>';
    var retypeNewPinValidationMessage = '<?php echo RETYPE_NEW_PIN_VALIDATION_MESSAGE; ?>';
    var notMatchPinValidationMessage = '<?php echo NOT_MATCH_PIN_VALIDATION_MESSAGE; ?>';
    var onePaymentOptionValidationMessage = '<?php echo ONE_PAYMENT_OPTION_MESSAGE; ?>';
    var licenseNoNotAvailable = '<?php echo LICENSE_NO_NOT_AVAILABLE; ?>';
    var registrationNumberExistsValidationMessage = '<?php echo REGISTRATION_NUMBER_EXISTS_MESSAGE; ?>';
    var registrationFileNoValidationMessage = '<?php echo REGISTRATION_FILE_NO_MESSAGE; ?>';
    var entityEstablishmentTypeValidationMessage = '<?php echo ENTITY_ESTABLISHMENT_TYPE_MESSAGE; ?>';

    // Login Messages
    var passwordRegex = <?php echo PASSWORD_REGEX ?>;
    var usernameValidationMessage = '<?php echo USERNAME_MESSAGE; ?>';
    var passwordValidationMessage = '<?php echo PASSWORD_MESSAGE; ?>';
    var newPasswordValidationMessage = '<?php echo NEW_PASSWORD_MESSAGE; ?>';
    var invalidPasswordValidationMessage = '<?php echo INVALID_PASSWORD_MESSAGE; ?>';
    var retypePasswordValidationMessage = '<?php echo RETYPE_PASSWORD_MESSAGE; ?>';
    var usernameOrPasswordIsInvalid = '<?php echo INVALID_USERNAME_OR_PASSWORD_MESSAGE; ?>';

    // User Type Messages
    var invalidUserTypeValidationMessage = '<?php echo INVALID_USER_TYPE_MESSAGE; ?>';
    var userTypeValidationMessage = '<?php echo USER_TYPE_MESSAGE; ?>';

    // Users Messages
    var nameValidationMessage = '<?php echo NAME_MESSAGE; ?>';
    var selectUserTypeValidationMessage = '<?php echo SELECT_USER_TYPE_MESSAGE; ?>';
    var selectUserValidationMessage = '<?php echo SELECT_USER_MESSAGE; ?>';
    var invalidUserValidationMessage = '<?php echo INVALID_USER_MESSAGE; ?>';

    // Department Messages
    var departmentValidationMessage = '<?php echo DEPARTMENT_MESSAGE; ?>';
    var selectDepartmentValidationMessage = '<?php echo SELECT_DEPARTMENT_MESSAGE; ?>';
    var invalidDepartmentValidationMessage = '<?php echo INVALID_DEPARTMENT_MESSAGE; ?>';

    // Employee Messages
    var invalidEmployeeValidationMessage = '<?php echo INVALID_EMPLOYEE_MESSAGE; ?>';
    var employeeNameValidationMessage = '<?php echo EMPLOYEE_NAME_MESSAGE; ?>';
    var oneRoleValidationMessage = '<?php echo ONE_ROLE_MESSAGE; ?>';
    var designationValidationMessage = '<?php echo ENTER_DESIGNATION_MESSAGE; ?>';
    var uploadDocValidationMessage = '<?php echo UPLOAD_DOC_MESSAGE; ?>';

    // Services Messages
    var serviceNameValidationMessage = '<?php echo SERVICE_NAME_MESSAGE; ?>';
    var invalidServiceValidationMessage = '<?php echo INVALID_SERVICE_MESSAGE; ?>';
    var enterTimelineValidationMessage = '<?php echo ENTER_TIMELINE_MESSAGE; ?>';
    var oneOptionValidationMessage = '<?php echo ONE_OPTION_MESSAGE; ?>';
    var enterQuestionValidationMessage = '<?php echo ENTER_QUESTION_MESSAGE; ?>';

    // Weight & Measure Repairer
    var repairmenNameValidationMessage = '<?php echo REPAIRMEN_NAME_MESSAGE; ?>';
    var workshopAddressValidationMessage = '<?php echo WORKSHOPS_ADDRESS_MESSAGE; ?>';
    var supportDocumentValidationMessage = '<?php echo SUPPORT_DOCUMENT_MESSAGE; ?>';
    var establishmentDateValidationMessage = '<?php echo ESTABLISHMENT_DATE_MESSAGE; ?>';
    var shopDateValidationMessage = '<?php echo SHOP_DATE_MESSAGE; ?>';
    var shopRegNoValidationMessage = '<?php echo SHOP_REGISTRATION_NUMBER_MESSAGE; ?>';
    var identityNoValidationMessage = '<?php echo IDENTITY_MESSAGE; ?>';
    var weightTypeValidationMessage = '<?php echo WEIGHT_TYPE_MESSAGE; ?>';
    var areaOperateValidationMessage = '<?php echo AREA_OPERATE_MESSAGE; ?>';
    var prevexperienceValidationMessage = '<?php echo PREV_EXPERIENCE_MESSAGE; ?>';
    var skilledNoValidationMessage = '<?php echo SKILLED_NO_MESSAGE; ?>';
    var semiskilledNoValidationMessage = '<?php echo SEMISKILLED_NO_MESSAGE; ?>';
    var unskilledNoValidationMessage = '<?php echo UNSKILLED_NO_MESSAGE; ?>';
    var trainEmpValidationMessage = '<?php echo TRAIN_EMP_MESSAGE; ?>';
    var personnelDetailValidationMessage = '<?php echo PERSONNEL_DETAIL_MESSAGE; ?>';
    var machineryValidationMessage = '<?php echo MACHINERY_MESSAGE; ?>';
    var electricEnergyValidationMessage = '<?php echo ELECTRIC_ENERGY_MESSAGE; ?>';
    var stockDetailValidationMessage = '<?php echo STOCK_DETAIL_MESSAGE; ?>';
    var appliedDateValidationMessage = '<?php echo APPLIED_DATE_MESSAGE; ?>';
    var licenseResultValidationMessage = '<?php echo LICENSE_RESULT_MESSAGE; ?>';
    var declarationOneValidationMessage = '<?php echo DECLARATION_ONE_MESSAGE; ?>';
    var declarationTwoValidationMessage = '<?php echo DECLARATION_TWO_MESSAGE; ?>';
    var declarationThreeValidationMessage = '<?php echo DECLARATION_THREE_MESSAGE; ?>';
    var uploadApplicantSignValidationMessage = '<?php echo UPLOAD_APPLICANT_SIGN_MESSAGE; ?>';
    var occupierNameValidationMessage = '<?php echo OCCUPIER_NAME_MESSAGE; ?>';
    var fatherNameValidationMessage = '<?php echo FATHER_NAME_MESSAGE; ?>';
    var proprietorAddressValidationMessage = '<?php echo PROPRIETOR_ADDRESS_MESSAGE; ?>';
    var uploadDocumentValidationMessage = '<?php echo UPLOAD_DOCUMENT_MESSAGE; ?>';
    var identityChoiceValidationMessage = '<?php echo IDENTITY_CHOICE_MESSAGE; ?>';
    var premisesStatusValidationMessage = '<?php echo PREMISES_STATUS_MESSAGE; ?>';


    // Weight & Measure Dealer
    var dealerNameValidationMessage = '<?php echo DEALER_NAME_MESSAGE; ?>';
    var categoriesSoldValidationMessage = '<?php echo CATEGORY_SOLD_MESSAGE; ?>';
    var importerRegValidationMessage = '<?php echo IMPORTER_REG_MESSAGE; ?>';

    // Weight & Measure Manufacturer
    var manufacturerNameValidationMessage = '<?php echo MANUFACTURER_NAME_MESSAGE; ?>';
    var activityValidationMessage = '<?php echo ACTIVITY_MESSAGE; ?>';
    var measureTypeValidationMessage = '<?php echo MEASURE_TYPE_MESSAGE; ?>';
    var weightInstrumrntValidationMessage = '<?php echo WEIGHT_INSTRUMENT_MESSAGE; ?>';
    var measureInstumentValidationMessage = '<?php echo MEASURE_INSTRUMENT_MESSAGE; ?>';
    var foundryValidationMessage = '<?php echo FOUNDRY_MESSAGE; ?>';
    var castingFacilityValidationMessage = '<?php echo CASTING_FACILITY_MESSAGE; ?>';
    var loanDetailValidationMessage = '<?php echo LOAN_DETAIL_MESSAGE; ?>';
    var bankNameValidationMessage = '<?php echo BANK_NAME_MESSAGE; ?>';
    var sellingLocationStatusValidationMessage = '<?php echo SELLING_LOCATION_MESSAGE; ?>';
    var approvalModelValidationMessage = '<?php echo APPROVAL_MODEL_MESSAGE; ?>';
    var inspectionDateValidationMessage = '<?php echo INSPECTION_DATE_MESSAGE; ?>';

    var establishmentRegistrationNoValidationMessage = '<?php echo ESTABLISHMENT_REGISTRATION_NO_MESSAGE; ?>';
    var establishmentRemarkValidationMessage = '<?php echo ESTABLISHMENT_REMARK_MESSAGE; ?>';

    // Weight & Measure New Registration
    var applicantNameValidationMessage = '<?php echo APPLICANT_NAME_MESSAGE; ?>';
    var completeAddressValidationMessage = '<?php echo COMPLETE_ADDRESS_MESSAGE; ?>';
    var applicantCategoryValidationMessage = '<?php echo APPLICANT_CATEGORY_MESSAGE; ?>';
    var branchValidationMessage = '<?php echo BRANCH_MESSAGE; ?>';
    var itemDetailValidationMessage = '<?php echo ITEM_DETAIL_MESSAGE; ?>';

    // Water Connection
    var houseNoValidationMessage = '<?php echo HOUSE_NO_MESSAGE; ?>';
    var wardNoValidationMessage = '<?php echo WARD_NO_MESSAGE; ?>';
    var villageValidationMessage = '<?php echo VILLAGE_MESSAGE; ?>';
    var panchayatOrDmcValidationMessage = '<?php echo PANCHAYT_OR_DMC_MESSAGE; ?>';
    var applicantCategoryWcValidationMessage = '<?php echo APPLICANT_CATEGORY_WC_MESSAGE; ?>';
    var houseOwnershipValidationMessage = '<?php echo HOUSE_OWNERSHIP_MESSAGE; ?>';
    var wcTypeValidationMessage = '<?php echo WC_TYPE_MESSAGE; ?>';
    var diameterServiceConnectionValidationMessage = '<?php echo DIAMETER_SERVICE_CONNECTION_MESSAGE; ?>';
    var waterMeterValidationMessage = '<?php echo WATER_METER_MESSAGE; ?>';
    var applyingForValidationMessage = '<?php echo APPLYING_FOR_MESSAGE; ?>';
    var reasonForRejectionValidationMessage = '<?php echo REASON_FOR_REJECTION_MESSAGE; ?>';

    // Cinema 

    var fatherNameValidationMessage = '<?php echo FATHER_NAME_MESSAGE; ?>';
    var dobValidationMessage = '<?php echo DOB_MESSAGE; ?>';
    var permanentAddressValidationMessage = '<?php echo PERMANENT_ADDRESS_MESSAGE; ?>';
    var temporaryAddressValidationMessage = '<?php echo TEMPORARY_ADDRESS_MESSAGE; ?>';
    var videoCassetteRecorderLinkValidationMessage = '<?php echo VIDEO_CASSETTE_RECORDER_LINK_MESSAGE; ?>';
    var nameOfBuildingValidationMessage = '<?php echo NAME_OF_BUILDING_MESSAGE; ?>';
    var placeOfBuildingValidationMessage = '<?php echo PLACE_OF_BUILDING_MESSAGE; ?>';
    var distanceOfBuildingValidationMessage = '<?php echo DISTANCE_OF_BUILDING_MESSAGE; ?>';
    var tbLicenseAffectedValidationMessage = '<?php echo TB_LICENSE_AFFECTED_MESSAGE; ?>';
    var buildingASValidationMessage = '<?php echo BUILDING_AS_MESSAGE; ?>';
    var auditoriumASValidationMessage = '<?php echo AUDITORIUM_AS_MESSAGE; ?>';
    var passagesAndGangwaysASValidationMessage = '<?php echo PASSAGE_GANGWAYS_AS_MESSAGE; ?>';
    var urinalsAndWcASValidationMessage = '<?php echo URINALS_WC_AS_MESSAGE; ?>';
    var timeScheduleFilmValidationMessage = '<?php echo TIME_SCHEDULE_FILM_MESSAGE; ?>';
    var screenWidthValidationMessage = '<?php echo SCREEN_WIDTH_MESSAGE; ?>';

    // Hotel
    var categoryOfHotelValidationMessage = '<?php echo CATEGORY_HOTEL_MESSAGE; ?>';
    var hotelNameValidationMessage = '<?php echo HOTEL_NAME_MESSAGE; ?>';
    var personNameValidationMessage = '<?php echo PERSON_NAME_MESSAGE; ?>';
    var fullAddressValidationMessage = '<?php echo FULL_ADDRESS_MESSAGE; ?>';
    var nameOfTouristAreaValidationMessage = '<?php echo TOURIST_AREA_NAME_MESSAGE; ?>';
    var nameOfProprietorValidationMessage = '<?php echo PROPRIETOR_NAME_MESSAGE; ?>';
    var nameOfManagerValidationMessage = '<?php echo MANAGER_NAME_MESSAGE; ?>';
    var managerPermanentAddressValidationMessage = '<?php echo MANAGER_PERMANENT_ADDRESS_MESSAGE; ?>';
    var permanentResidentUTValidationMessage = '<?php echo PERMANENT_RESIDENT_MESSAGE; ?>';
    var otherBusinessOfApplicantValidationMessage = '<?php echo OTHER_BUSINESS_APPLICANT_MESSAGE; ?>';
    var hotelRentedOrLeasedValidationMessage = '<?php echo HOTEL_RENTED_LEASED_MESSAGE; ?>';
    var leasedDateValidationMessage = '<?php echo LEASED_DATE_MESSAGE; ?>';
    var agentNameValidationMessage = '<?php echo AGENT_NAME_MESSAGE; ?>';

    // Partnership Firm Registration
    var firmNameValidationMessage = '<?php echo FIRM_NAME_MESSAGE; ?>';
    var principaladdressValidationMessage = '<?php echo PRINCIPAL_ADDRESS_MESSAGE; ?>';
    var otheraddressValidationMessage = '<?php echo OTHER_ADDRESS_MESSAGE; ?>';
    var firmdurationValidationMessage = '<?php echo FIRM_DURATION_MESSAGE; ?>';

    // Query Mananagemt Module
    var remarksValidationMessage = '<?php echo REMARKS_MESSAGE; ?>';
    var documentNameValidationMessage = '<?php echo DOCUMENT_NAME_MESSAGE; ?>';

    // Incentive General Form
    var officeAddressValidationMessage = '<?php echo OFFICE_ADDRESS_MESSAGE; ?>';
    var officeContactNoValidationMessage = '<?php echo OFFICE_CONTACT_NO_MESSAGE; ?>';
    var factoryAddressValidationMessage = '<?php echo FACTORY_ADDRESS_MESSAGE; ?>';
    var factoryContactNoValidationMessage = '<?php echo FACTORY_CONTACT_NO_MESSAGE; ?>';
    var faxValidationMessage = '<?php echo FAX_MESSAGE; ?>';
    var cellPhnoValidationMessage = '<?php echo CELL_PHNO_MESSAGE; ?>';
    var promotersDetailValidationMessage = '<?php echo PROMOTERS_DETAIL_MESSAGE; ?>';
    var othorizedPersonDetailValidationMessage = '<?php echo OTHORIZED_PERSON_DETAIL_MESSAGE; ?>';
    var emNoValidationMessage = '<?php echo EM_NO_MESSAGE; ?>';
    var emDateValidationMessage = '<?php echo EM_DATE_MESSAGE; ?>';
    var manufacturingItemValidationMessage = '<?php echo MANUFACTURING_ITEM_MESSAGE; ?>';
    var annualCapacityValidationMessage = '<?php echo ANNUAL_CAPACITY_MESSAGE; ?>';
    var approvalNoValidationMessage = '<?php echo APPROVAL_NO_MESSAGE; ?>';
    var pccDateValidationMessage = '<?php echo PCC_DATE_MESSAGE; ?>';
    var pccValidUptoDateValidationMessage = '<?php echo PCC_VALIDUPTO_DATE_MESSAGE; ?>';
    var factoryNoValidationMessage = '<?php echo FACTORY_NO_MESSAGE; ?>';
    var establishmentsDateValidationMessage = '<?php echo ESTABLISHMENTS_DATE_MESSAGE; ?>';
    var establishmentValidUptoDateValidationMessage = '<?php echo ESTABLISHMENT_VALIDUPTO_DATE_MESSAGE; ?>';
    var commencementDateValidationMessage = '<?php echo COMMENCEMENT_DATE_MESSAGE; ?>';
    var nameOfBankValidationMessage = '<?php echo NAME_OF_BANK_MESSAGE; ?>';
    var bankAccountNoValidationMessage = '<?php echo BANK_ACCOUNT_NO_MESSAGE; ?>';
    var ifscCodeValidationMessage = '<?php echo IFSC_CODE_MESSAGE; ?>';
    var branchCodeValidationMessage = '<?php echo BRANCH_CODE_MESSAGE; ?>';
    var panCardValidationMessage = '<?php echo PAN_CARD_MESSAGE; ?>';

    var personsNameValidationMessage = '<?php echo PERSONS_NAME_MESSAGE; ?>';
    var genderValidationMessage = '<?php echo GENDER_MESSAGE; ?>';
    var communityValidationMessage = '<?php echo COMMUNITY_MESSAGE; ?>';
    var phValidationMessage = '<?php echo PH_MESSAGE; ?>';
    var shareValidationMessage = '<?php echo SHARE_MESSAGE; ?>';
    var valueValidationMessage = '<?php echo VALUE_MESSAGE; ?>';
    var percentValidationMessage = '<?php echo PERCENT_MESSAGE; ?>';
    var constitutionValidationMessage = '<?php echo CONSTITUTION_MESSAGE; ?>';
    var socialStatusValidationMessage = '<?php echo SOCIAL_STATUS_MESSAGE; ?>';
    var unitTypeValidationMessage = '<?php echo UNIT_TYPE_MESSAGE; ?>';
    var categoryValidationMessage = '<?php echo CATEGORY_MESSAGE; ?>';
    var financialAssistanceValidationMessage = '<?php echo FINANCIAL_ASSISTANCE_MESSAGE; ?>';
    var govtDuesValidationMessage = '<?php echo GOVT_DUES_MESSAGE; ?>';
    var turnoverValidationMessage = '<?php echo TURNOVER_MESSAGE; ?>';

    // Incentive Part A Form
    var investmentValidationMessage = '<?php echo INVESTMENT_MESSAGE; ?>';
    var machineryUnitValidationMessage = '<?php echo MACHINERY_UNIT_MESSAGE; ?>';
    var newInvestmentValidationMessage = '<?php echo MNEW_INVESTMENT_MESSAGE; ?>';
    var investmentPercentageValidationMessage = '<?php echo INVESTMENT_PERCENTAGE_MESSAGE; ?>';
    var contributionValidationMessage = '<?php echo CONTRIBUTION_MESSAGE; ?>';
    var termLoanValidationMessage = '<?php echo TERM_LOAN_MESSAGE; ?>';
    var unsecuredLoanValidationMessage = '<?php echo UNSECURED_LOAN_MESSAGE; ?>';
    var accrualsValidationMessage = '<?php echo ACCUALS_MESSAGE; ?>';
    var financeTotalValidationMessage = '<?php echo FINANCE_TOTAL_MESSAGE; ?>';
    var termLoanDateValidationMessage = '<?php echo TERM_LOAN_DATE_MESSAGE; ?>';
    var loanAccountNoValidationMessage = '<?php echo LOAN_ACCOUNT_MESSAGE; ?>';
    var capitalSubsidyValidationMessage = '<?php echo CAPITAL_SUBSIDY_MESSAGE; ?>';
    var anumValidationMessage = '<?php echo ANUM_MESSAGE; ?>';
    var clamAmountTotalValidationMessage = '<?php echo CLIAM_AMOUNT_TOTAL_MESSAGE; ?>';
    var disbursementDateValidationMessage = '<?php echo DISBURSEMENT_DATE_MESSAGE; ?>';
    var nameAddressValidationMessage = '<?php echo NAME_ADDRESS_MESSAGE; ?>';
    var loanTypeValidationMessage = '<?php echo LOAN_TYPE_MESSAGE; ?>';
    var sanctionAmountValidationMessage = '<?php echo SANCTION_AMOUNT_MESSAGE; ?>';
    var rateValidationMessage = '<?php echo RATE_MESSAGE; ?>';


    // Incentive Part B Form
    var supplierNameAddressValidationMessage = '<?php echo SUPPLIER_NAME_ADDRESS_MESSAGE; ?>';
    var featureSystemValidationMessage = '<?php echo FEATURE_SYSTEM_MESSAGE; ?>';
    var agencyNameValidationMessage = '<?php echo AGENCY_NAME_MESSAGE; ?>';
    var productDetailValidationMessage = '<?php echo PRODUCT_DETAIL_MESSAGE; ?>';
    var isoCertificateNoValidationMessage = '<?php echo ISO_CERTIFICATE_NO_MESSAGE; ?>';
    var isoCertificateDateValidationMessage = '<?php echo ISO_CERTIFICATE_DATE_MESSAGE; ?>';
    var isicertificateNoValidationMessage = '<?php echo ISI_CERTIFICATE_NO_MESSAGE; ?>';
    var isicertificateDateValidationMessage = '<?php echo ISI_CERTIFICATE_DATE_MESSAGE; ?>';
    var expenditureValidationMessage = '<?php echo EXPENDITURE_MESSAGE; ?>';
    var capitalCostValidationMessage = '<?php echo CAPITAL_COST_MESSAGE; ?>';
    var consutancyFeesValidationMessage = '<?php echo CONSUTANCY_MESSAGE; ?>';
    var certificationChargesValidationMessage = '<?php echo CERTIFICATION_CHARGES_MESSAGE; ?>';
    var testingEquipmentsValidationMessage = '<?php echo TESTING_EQUIPMENTS_MESSAGE; ?>';
    var clamAmountTotalValidationMessage = '<?php echo CLAM_AMOUNT_TOTAL_MESSAGE; ?>';

    // Incentive Part C Form
    var registrationNoValidationMessage = '<?php echo REGISTRATION_NO_MESSAGE; ?>';
    var certificateDateValidationMessage = '<?php echo CERTIFICATE_DATE_MESSAGE; ?>';
    var patentNameValidationMessage = '<?php echo PATENT_NAME_MESSAGE; ?>';
    var productNameValidationMessage = '<?php echo PRODUCT_NAME_MESSAGE; ?>';
    var patentExpenditureValidationMessage = '<?php echo PATENT_EXPENDITURE_MESSAGE; ?>';
    var cliamAmountValidationMessage = '<?php echo CLIAM_AMOUNT_MESSAGE; ?>';

    // Incentive Part D Form
    var consultantNameAddressValidationMessage = '<?php echo CONSULTANT_NAME_MESSAGE; ?>';
    var suggestionValidationMessage = '<?php echo SUGGESTION_MESSAGE; ?>';
    var resultBenefitAddressValidationMessage = '<?php echo RESULT_BENEFIT_MESSAGE; ?>';
    var totalExpenditureValidationMessage = '<?php echo TOTAL_EXPENDITURE_MESSAGE; ?>';
    var auditFeesValidationMessage = '<?php echo AUDIT_FEES_MESSAGE; ?>';
    var equipmentCostValidationMessage = '<?php echo EQUIPMENT_COST_MESSAGE; ?>';
    var equipmentNameValidationMessage = '<?php echo EQUIPMENT_NAME_MESSAGE; ?>';
    var costValidationMessage = '<?php echo COST_MESSAGE; ?>';

    // Incentive Part E Form
    var requitEmpValidationMessage = '<?php echo REQUIT_EMP_MESSAGE; ?>';
    var empExpenditureValidationMessage = '<?php echo EMP_EXPENDITURE_MESSAGE; ?>';
    var assclaimAmountValidationMessage = '<?php echo ASSCLAIM_AMOUNT_MESSAGE; ?>';

    // Incentive Part F Form
    var intrestSubsidyValidationMessage = '<?php echo INTREST_SUBSIDY_MESSAGE; ?>';
    var otherInfoValidationMessage = '<?php echo OTHER_INFO_MESSAGE; ?>';

    // Incentive Part G Form
    var sectorTextileValidationMessage = '<?php echo SECTOR_TEXTILE_MESSAGE; ?>';

    // Incentive Part H Form
    var justificationValidationMessage = '<?php echo JUSTIFICATION_MESSAGE; ?>';
    var processDetailValidationMessage = '<?php echo PROCESS_DETAIL_MESSAGE; ?>';
    var technologyPurposeValidationMessage = '<?php echo TECHNOLOGY_PURPOSE_MESSAGE; ?>';
    var purchaseValidationMessage = '<?php echo PURCHASE_MESSAGE; ?>';
    var technologyFeesValidationMessage = '<?php echo TECHNOLOGY_FEES_MESSAGE; ?>';
    var otherDetailValidationMessage = '<?php echo OTHER_DETAIL_MESSAGE; ?>';

    // NOC of Leased
    var appDateValidationMessage = '<?php echo APPLICATION_DATE_MESSAGE; ?>';
    var loanFromDateValidationMessage = '<?php echo LOAN_FROM_DATE_MESSAGE; ?>';
    var loanToDateValidationMessage = '<?php echo LOAN_TO_DATE_MESSAGE; ?>';
    var stateValidationMessage = '<?php echo STATE_MESSAGE; ?>';
    var districtValidationMessage = '<?php echo DISTRICT_MESSAGE; ?>';
    var talukaValidationMessage = '<?php echo TALUKA_MESSAGE; ?>';
    var villageValidationMessage = '<?php echo VILLAGE_MESSAGE; ?>';
    var pincodeValidationMessage = '<?php echo PINCODE_MESSAGE; ?>';
    var loanamountValidationMessage = '<?php echo LOAN_AMOUNT_MESSAGE; ?>';
    var plotnoValidationMessage = '<?php echo PLOT_NO_MESSAGE; ?>';
    var surveynoValidationMessage = '<?php echo SURVEY_NO_MESSAGE; ?>';
    var admeasuringValidationMessage = '<?php echo ADMEASURING_MESSAGE; ?>';
    var govtIndustrialEstateAreaValidationMessage = '<?php echo GOVT_INDUSTRIAL_AR_MESSAGE; ?>';
    var purposeleaseValidationMessage = '<?php echo PURPOSE_MESSAGE; ?>';
    var acNumberValidationMessage = '<?php echo ACCOUNT_NO_MESSAGE; ?>';
    var banknameValidationMessage = '<?php echo BANK_NAME_MESSAGE; ?>';
    var branchNameValidationMessage = '<?php echo BRANCH_NAME_MESSAGE; ?>';
    var ifscCodeValidationMessage = '<?php echo IFSC_CODE_MESSAGE; ?>';
    var loanAmountValidationMessage = '<?php echo LOAN_AMOUNT_MESSAGE; ?>';

    //Sale/Transfer of Leased
    var reasonofTransferValidationMessage = '<?php echo REASONOF_TRANSFER_MESSAGE; ?>';
    var transfererNameValidationMessage = '<?php echo TRANSFERER_NAME_MESSAGE; ?>';
    var nameofservicingValidationMessage = '<?php echo NAME_OF_SERVICING_MESSAGE; ?>';
    var otherservicesValidationMessage = '<?php echo OTHER_SERVICES_MESSAGE; ?>';
    var aadharnoValidationMessage = '<?php echo AADHAR_NO_MESSAGE; ?>'
    var pannoValidationMessage = '<?php echo PAN_NO_MESSAGE; ?>'
    var gstnoValidationMessage = '<?php echo GST_NO_MESSAGE; ?>'
    var RequestLetterValidationMessage = '<?php echo REQUEST_LETTER_MESSAGE; ?>';
    var projectReportValidationMessage = '<?php echo PROJECT_REPORT_MESSAGE; ?>';
    var constitutionProjectValidationMessage = '<?php echo CONSTITUTION_PROJECT_MESSAGE; ?>';
    var validAuthorizationValidationMessage = '<?php echo VALID_AUTHORIZATION_MESSAGE; ?>';

    //Sub-letting Form 
    var nameofmanufactringValidationMessage = '<?php echo NAME_OF_MANUFACTRING_MESSAGE; ?>';
    var occupancyValidationMessage = '<?php echo OCCUPANCY_MESSAGE; ?>';

    // Repairer Renewal Form
    var proposeChangeValidationMessage = '<?php echo PROPOSE_CHANGE_MESSAGE; ?>';
    var productionSalesValidationMessage = '<?php echo PRODUCTION_SALES_MESSAGE; ?>';
    var licenseNumberValidationMessage = '<?php echo LICENSE_NUMBER_MESSAGE; ?>';

    // Film Shooting
    var productionHouseValidationMessage = '<?php echo PRODUCTION_HOUSE_MESSAGE; ?>';
    //var permanentAddressValidationMessage = '<?php echo PERMANENT_ADDRESS_MESSAGE; ?>';
    var productionManagerValidationMessage = '<?php echo PRODUCTION_MANAGER_MESSAGE; ?>';
    var contactNoValidationMessage = '<?php echo CONTACT_NO_MESSAGE; ?>';
    var directorValidationMessage = '<?php echo DIRECTOR_MESSAGE; ?>';
    var filmTitleValidationMessage = '<?php echo FILM_TITLE_MESSAGE; ?>';
    var filmSynopsisValidationMessage = '<?php echo FILM_SYNOPSIS_MESSAGE; ?>';
    var filmShootingDaysValidationMessage = '<?php echo FILM_SHOOTING_DAYS_MESSAGE; ?>';
    var shootingLocationValidationMessage = '<?php echo SHOOTING_LOCATION_MESSAGE; ?>';
    var shootingDateValidationMessage = '<?php echo SHOOTING_DATE_MESSAGE; ?>';
    var defenseInstallationValidationMessage = '<?php echo DEFENSE_INSTALLATION_MESSAGE; ?>';
    var undersignedValidationMessage = '<?php echo UNDERSIGNED_MESSAGE; ?>';
    var agedYearValidationMessage = '<?php echo AGED_YEAR_MESSAGE; ?>';
    var residentValidationMessage = '<?php echo RESIDENT_MESSAGE; ?>';
    var purposeValidationMessage = '<?php echo DECPURPOSE_MESSAGE; ?>';
    var witnessNameValidationMessage = '<?php echo WITNESS_NAME_MESSAGE; ?>';
    var villageNameValidationMessage = '<?php echo VILLAGE_NAME_MESSAGE; ?>';


    //Sub Lessee
    var requestletterValidationMessage = '<?php echo REQUEST_LETTER_MANUFACTURE_MESSAGE; ?>';
    var detailprojectValidationMessage = '<?php echo DETAIL_PROJECT_MANUFACTURE_MESSAGE; ?>';
    var partnershipdeedValidationMessage = '<?php echo MEMORANDUM_PARTNERSHIP_DEED_MESSAGE; ?>';

    // Travel Agency
    var travelAgencyNameValidationMessage = '<?php echo TRAVEL_AGENCY_NAME_MESSAGE; ?>';
    var addressOfAgencyValidationMessage = '<?php echo ADDRESS_OF_AGENCY_MESSAGE; ?>';
    var areaOfAgencyValidationMessage = '<?php echo AREA_OF_AGENCY_MESSAGE; ?>';

    // Property Registration
    var partyTypeNameValidationMessage = '<?php echo PARTY_TYPE_MESSAGE; ?>';
    var documentTypeValidationMessage = '<?php echo DOCUMENT_TYPE_MESSAGE; ?>';
    var partyNameValidationMessage = '<?php echo PARTY_NAME_MESSAGE; ?>';
    var partyAddressNameValidationMessage = '<?php echo PARTY_ADDRESS_MESSAGE; ?>';
    var appoinmentdateValidation = '<?php echo APPOINTMENT_DATE_MESSAGE; ?>';
    var propertyDescriptionValidationMessage = '<?php echo PROPERTY_DESCRIPTION_MESSAGE; ?>';
    var selectTimeValidationMessage = '<?php echo SELECT_TIME_MESSAGE; ?>';


    // Tourism Event
    var nameOfEventValidationMessage = '<?php echo NAME_OF_EVENT_MESSAGE; ?>';
    var locationOfEventValidationMessage = '<?php echo LOCATION_OF_EVENT_MESSAGE; ?>';
    var timeOfEventValidationMessage = '<?php echo TIME_OF_EVENT_MESSAGE; ?>';
    var durationOfEventValidationMessage = '<?php echo DURATION_OF_MESSAGE; ?>';

    //Construction Permission 
    var owneraddressMessage = '<?php echo OWNER_ADDRESS_MESSAGE; ?>';
    var buildingNoValidationMessage = '<?php echo BUILDING_NO_MESSAGE; ?>';
    var plotNoValidationMessage = '<?php echo PLOT_NUMBER_MESSAGE; ?>';
    var revenueNoValidationMessage = '<?php echo REVENUE_NO_MESSAGE; ?>';
    var ctsNoValidationMessage = '<?php echo CTS_NO_MESSAGE; ?>';
    var streetNameValidationMessage = '<?php echo STREET_NAME_MESSAGE; ?>';
    var architectNameValidationMessage = '<?php echo ARCHITECT_NAME_MESSAGE; ?>';
    var architectlicenseNoValidationMessage = '<?php echo ARCHITECT_LICENSE_MESSAGE; ?>';
    var uploadValidationMessage = '<?php echo UPLOAD_MESSAGE; ?>';

    //Site Elevation
    var plotAreaValidationMessage = '<?php echo PLOT_AREA_MESSAGE; ?>';
    var ptsnoValidationMessage = '<?php echo PTS_NO_MESSAGE; ?>';

    //allotment of plot
    var applicantAddressValidationMessage = '<?php echo APPLICANT_ADDRESS_MESSAGE; ?>';
    var telephoneNoValidationMessage = '<?php echo TELEPHONE_NO_MESSAGE; ?>';
    var expansionIndustryValidationMessage = '<?php echo EXPANSION_INDUSTRY_MESSAGE; ?>';
    var natureOfIndustryValidationMessage = '<?php echo NATURE_OF_INDUSTRAY_MESSAGE; ?>';
    var plotChecklistValidationMessage = '<?php echo PLOT_CHECKLIST_MESSAGE; ?>';
    var applicantTypeValidationMessage = '<?php echo APPLICANT_TYPE_MESSAGE; ?>';
    var possessionOfIndustryValidationMessage = '<?php echo POSSESSTION_OF_INDUSTRY_MESSAGE; ?>';
    var detailValidationMessage = '<?php echo Detail_MESSAGE; ?>';
    var reasonofloanValidationMessage = '<?php echo REASON_OF_LOAN_MESSAGE; ?>';
    var noOfPersonsLiklyEmpValidationMessage = '<?php echo NO_OF_LIKLY_EMP_MESSAGE; ?>';
    var noOfEmpValidationMessage = '<?php echo NO_OF_EMP_MESSAGE; ?>';

    // Shop & Establishment
    var shopRegistrationNoValidationMessage = '<?php echo SHOP_REGISTRATION_NO_MESSAGE; ?>';
    var shopRegiCategoryValidationMessage = '<?php echo SHOP_REGISTRATION_CATEGORY_MESSAGE; ?>';
    var shopNameValidationMessage = '<?php echo SHOP_NAME_MESSAGE; ?>';
    var shopDoorNoValidationMessage = '<?php echo SHOP_DOOR_NO_MESSAGE; ?>';
    var shopStreetNameValidationMessage = '<?php echo SHOP_STREET_NAME_MESSAGE; ?>';
    var shopLocationValidationMessage = '<?php echo SHOP_LOCATION_MESSAGE; ?>';
    var shopPostalAddressValidationMessage = '<?php echo SHOP_POSTAL_ADDRESS_MESSAGE; ?>';
    var shopOfficeLocationValidationMessage = '<?php echo SHOP_OFFICE_LOCATION_MESSAGE; ?>';
    var shopStoreRoomLocationValidationMessage = '<?php echo SHOP_STORE_ROOM_LOCATION_MESSAGE; ?>';
    var shopGodownLocationValidationMessage = '<?php echo SHOP_GODOWN_LOCATION_MESSAGE; ?>';
    var shopWarehouseLocationValidationMessage = '<?php echo SHOP_WAREHOUSE_LOCATION_MESSAGE; ?>';
    var shopEmployerNameValidationMessage = '<?php echo SHOP_EMPLOYER_NAME_MESSAGE; ?>';
    var shopEmployerResidentialAddressValidationMessage = '<?php echo SHOP_EMPLOYER_RESIDENTIAL_ADDRESS_MESSAGE; ?>';
    var shopManagerNameValidationMessage = '<?php echo SHOP_MANAGER_NAME_MESSAGE; ?>';
    var shopManagerResidentialAddressValidationMessage = '<?php echo SHOP_MANAGER_RESIDENTIAL_ADDRESS_MESSAGE; ?>';
    var shopPartnerNameValidationMessage = '<?php echo SHOP_PARTNER_NAME_MESSAGE; ?>';
    var shopPartnerResidentialAddressValidationMessage = '<?php echo SHOP_PARTNER_RESIDENTIAL_ADDRESS_MESSAGE; ?>';
    var shopCategoryValidationMessage = '<?php echo SHOP_CATEGORY_MESSAGE; ?>';
    var shopNatureOfBusinessValidationMessage = '<?php echo SHOP_NATURE_OF_BUSINESS_MESSAGE; ?>';
    var shopDateCommencementOfBusinessValidationMessage = '<?php echo SHOP_DATE_COMMENCEMENT_OF_BUSINESS_MESSAGE; ?>';
    var oneEmployeeValidationMessage = '<?php echo ONE_EMPLOYEE_MESSAGE; ?>';

    var shopTreasuryNameValidationMessage = '<?php echo SHOP_TREASURY_NAME_MESSAGE; ?>';
    var shopChallanNoValidationMessage = '<?php echo SHOP_CHALLAN_NO_MESSAGE; ?>';
    var shopChallanDateValidationMessage = '<?php echo SHOP_CHALLAN_DATE_MESSAGE; ?>';
    var shopAmountOfFeesPaidValidationMessage = '<?php echo SHOP_AMOUNT_OF_FEES_PAID_MESSAGE; ?>';
    var shopSignOfEmployerValidationMessage = '<?php echo SHOP_SIGN_OF_EMPLOYER_MESSAGE; ?>';
    var shopCerticateExpiryDateValidationMessage = '<?php echo SHOP_CERTIFICATE_EXPIRY_DATE_MESSAGE; ?>';
    var shopDeclarationValidationMessage = '<?php echo SHOP_DECLARATION_MESSAGE; ?>';
    var shopRemarkValidationMessage = '<?php echo SHOP_REMARK_MESSAGE; ?>';

    // Employees Validation
    var shopEmployeeNameValidationMessage = '<?php echo SHOP_EMPLOYEES_NAME_MESSAGE; ?>';
    var shopEmployeeManagerialCapacityValidationMessage = '<?php echo SHOP_EMPLOYEES_MANAGERIAL_CAPACITY_MESSAGE; ?>';
    var shopEmployeeTypeValidationMessage = '<?php echo SHOP_EMPLOYEES_TYPE_MESSAGE; ?>';
    var shopEmployeeGodownEmployedValidationMessage = '<?php echo SHOP_EMPLOYEES_GODOWN_EMPLOYED_MESSAGE; ?>';

    //gender & commom
    var genderValidationMessage = '<?php echo GENDER_MESSAGE; ?>';

    // Establishment
    var establishmentRegistrationNoValidationMessage = '<?php echo ESTABLISHMENT_REGISTRATION_NO_MESSAGE; ?>';
    var establishmentNameValidationMessage = '<?php echo ESTABLISHMENT_NAME_MESSAGE; ?>';
    var establishmentTypeValidationMessage = '<?php echo BUSINESS_TYPE_MESSAGE; ?>';
    var establishmentLocationValidationMessage = '<?php echo ESTABLISHMENT_LOCATION_MESSAGE; ?>';
    var establishmentPostalAddressValidationMessage = '<?php echo ESTABLISHMENT_POSTAL_ADDRESS_MESSAGE; ?>';
    var establishmentPrincipalNameValidationMessage = '<?php echo PRINCIPLE_EMPLOYER_FULL_NAME_MESSAGE; ?>';
    var establishmentPrincipalAddressValidationMessage = '<?php echo PRINCIPLE_EMPLOYER_ADDRESS_MESSAGE; ?>';
    var establishmentManagerNameValidationMessage = '<?php echo MANAGER_FULL_NAME_MESSAGE; ?>';
    var establishmentManagerAddressValidationMessage = '<?php echo MANAGER_ADDRESS_MESSAGE; ?>';
    var establishmentCerticateExpiryDateValidationMessage = '<?php echo CERTIFICATE_EXPIRY_DATE_MESSAGE; ?>';
    var establishmentRemarkValidationMessage = '<?php echo ESTABLISHMENT_REMARK_MESSAGE; ?>';
    var establishmentTreasuryReciptEnclosedValidationMessage = '<?php echo TREASURY_RECIPT_ENCLOSED_MESSAGE; ?>';
    var establishmentSealStempValidationMessage = '<?php echo ESTABLISHMENT_SEAL_STEMP; ?>';
    var establishmentChallanNoValidationMessage = '<?php echo ESTABLISHMENT_CHALLAN_NO_MESSAGE; ?>';
    var establishmentChallanDateValidationMessage = '<?php echo ESTABLISHMENT_CHALLAN_DATE_MESSAGE; ?>';
    var establishmentDeclarationValidationMessage = '<?php echo ESTABLISHMENT_DECLARATION_MESSAGE; ?>';

    // Contractor
    var oneContractorValidationMessage = '<?php echo ONE_CONTRACTOR_MESSAGE; ?>';
    var contractorPropriterNameValidationMessage = '<?php echo CONTRACTOR_PROPRITER_NAME_MESSAGE; ?>';
    var contractorNameValidationMessage = '<?php echo CONTRACTOR_NAME_MESSAGE; ?>';
    var contractorAddressValidationMessage = '<?php echo CONTRACTOR_ADDRESS_MESSAGE; ?>';
    var contractorPermanentAddressValidationMessage = '<?php echo CONTRACTOR_PERMANENT_ADDRESS_MESSAGE; ?>';
    var contractorNatureOfWorkingValidationMessage = '<?php echo CONTRACTOR_NATURE_WORKING_MESSAGE; ?>';
    var contractorLabourValidationMessage = '<?php echo CONTRACTOR_LABOUR_MESSAGE; ?>';
    var contractorStartDateValidationMessage = '<?php echo CONTRACTOR_START_DATE_MESSAGE; ?>';
    var contractorTerminationDateValidationMessage = '<?php echo CONTRACTOR_TERMINATION_DATE_MESSAGE; ?>';

    // Boiler Manufacture
    var firmNameValidationMessage = '<?php echo FIRM_NAME_MESSAGE; ?>';
    var workshopAddressValidationMessage = '<?php echo WORKSHOP_ADDRESS_MESSAGE; ?>';
    var commAddressValidationMessage = '<?php echo COMM_ADDRESS_MESSAGE; ?>';
    var jobTypeValidationMessage = '<?php echo JOB_TYPE_MESSAGE; ?>';
    var toolsValidationMessage = '<?php echo TOOLS_MESSAGE; ?>';
    var standardWorkValidationMessage = '<?php echo STANDARD_WORK_MESSAGE; ?>';
    var controversialIssueValidationMessage = '<?php echo CONTROVERSIAL_ISSUE_MESSAGE; ?>';
    var qualityControlValidationMessage = '<?php echo QUALITY_CONTROL_MESSAGE; ?>';
    var powerSanctionValidationMessage = '<?php echo POWER_SANCTION_MESSAGE; ?>';
    var nocCopyValidationMessage = '<?php echo NOC_COPY_MESSAGE; ?>';
    var conversantValidationMessage = '<?php echo CONVERSANT_MESSAGE; ?>';
    var workshopPlanValidationMessage = '<?php echo WORKSHOP_PLAN_MESSAGE; ?>';
    var instrumentCalibrateValidationMessage = '<?php echo INSTRUMENT_CALIBRATE_MESSAGE; ?>';
    var testingFacilityValidationMessage = '<?php echo TESTING_FACILITY_MESSAGE; ?>';
    var recordSystemValidationMessage = '<?php echo RECORD_SYSTEM_MESSAGE; ?>';
    var signSealValidationMessage = '<?php echo SIGN_SEAL_MESSAGE; ?>';

    var supervisorNameValidationMessage = '<?php echo SUPERVISOR_NAME_MESSAGE; ?>';
    var qualificationValidationMessage = '<?php echo QUALIFICATION_MESSAGE; ?>';
    var experienceValidationMessage = '<?php echo EXPERIENCE_MESSAGE; ?>';
    var welderNameValidationMessage = '<?php echo WELDERS_NAME_MESSAGE; ?>';
    var weldersCertificateValidationMessage = '<?php echo WELDERS_CERTIFICATE_MESSAGE; ?>';


    // Single Return Form
    var telNoValidationMessage = '<?php echo TEL_NUMBER_MESSAGE; ?>';
    var faxNoValidationMessage = '<?php echo FAX_NUMBER_MESSAGE; ?>';
    var empNameValidationMessage = '<?php echo EMP_NAME_MESSAGE; ?>';
    var empAddressValidationMessage = '<?php echo EMP_ADDRESS_MESSAGE; ?>';
    var managerPersonNameValidationMessage = '<?php echo MANAGER_PERSON_NAME_MESSAGE; ?>';
    var managerPersonAddressValidationMessage = '<?php echo MANAGER_PERSON_ADDRESS_MESSAGE; ?>';
    var registrationNoValidationMessage = '<?php echo REGISTRATION_NUMBER_MESSAGE; ?>';
    var licenseNoValidationMessage = '<?php echo LICENSE_NUMBER_MESSAGE; ?>';
    var commencementsDateValidationMessage = '<?php echo COMMENCEMENTS_DATE_MESSAGE; ?>';
    var industryNatureValidationMessage = '<?php echo INDUSTRY_NATURE_MESSAGE; ?>';
    var directUnskilledValidationMessage = '<?php echo DIRECT_UNSKILLEDMESSAGE; ?>';
    var directSemiskilledValidationMessage = '<?php echo DIRECT_SEMISKILLED_MESSAGE; ?>';
    var directSkilledValidationMessage = '<?php echo DIRECT_SKILLED_MESSAGE; ?>';
    var directTotalValidationMessage = '<?php echo DIRECT_TOTAL_MESSAGE; ?>';
    var directMaleValidationMessage = '<?php echo DIRECT_MALE_MESSAGE; ?>';
    var directFemaleValidationMessage = '<?php echo DIRECT_FEMALE_MESSAGE; ?>';
    var contractorUnskilledValidationMessage = '<?php echo CONTRACTOR_UNSKILLEDMESSAGE; ?>';
    var contractorSemiskilledValidationMessage = '<?php echo CONTRACTOR_SEMISKILLED_MESSAGE; ?>';
    var contractorSkilledValidationMessage = '<?php echo CONTRACTOR_SKILLED_MESSAGE; ?>';
    var contractorTotalValidationMessage = '<?php echo CONTRACTOR_TOTAL_MESSAGE; ?>';
    var contractorMaleValidationMessage = '<?php echo CONTRACTOR_MALE_MESSAGE; ?>';
    var contractorFemaleValidationMessage = '<?php echo CONTRACTOR_FEMALE_MESSAGE; ?>';
    var totalUnskilledValidationMessage = '<?php echo TOTAL_UNSKILLEDMESSAGE; ?>';
    var totalSemiskilledValidationMessage = '<?php echo TOTAL_SEMISKILLED_MESSAGE; ?>';
    var totalSkilledValidationMessage = '<?php echo TOTAL_SKILLED_MESSAGE; ?>';
    var totalTotalValidationMessage = '<?php echo TOTAL_TOTAL_MESSAGE; ?>';
    var totalMaleValidationMessage = '<?php echo TOTAL_MALE_MESSAGE; ?>';
    var totalFemaleValidationMessage = '<?php echo TOTAL_FEMALE_MESSAGE; ?>';


    //part A
    var workedDaysValidationMessage = '<?php echo WORKED_DAYS_MESSAGE; ?>';
    var manWorkedDaysValidationMessage = '<?php echo MAN_WORKED_DAYS_MESSAGE; ?>';
    var averageEmpValidationMessage = '<?php echo AVERAGE_EMP_MESSAGE; ?>';
    var maleWagesValidationMessage = '<?php echo MALE_WAGES_MESSAGE; ?>';
    var femaleWagesValidationMessage = '<?php echo FEMALE_WAGES_MESSAGE; ?>';
    var totalFineValidationMessage = '<?php echo TOTAL_FINE_MESSAGE; ?>';
    var deductionValidationMessage = '<?php echo DEDUCTION_MESSAGE; ?>';

    //part B
    var percentageBonusValidationMessage = '<?php echo PERCENTAGE_BONUS_MESSAGE; ?>';
    var noOfBeneficiariesValidationMessage = '<?php echo NO_OF_BENEFICIARIES_MESSAGE; ?>';
    var bonusPaidValidationMessage = '<?php echo BONUS_PAID_MESSAGE; ?>';
    var paymentDateValidationMessage = '<?php echo PAYMENT_DATE_MESSAGE; ?>';
    var bonusReasonValidationMessage = '<?php echo BONUS_REASON_MESSAGE; ?>';

    //part C
    var contractorNatureValidationMessage = '<?php echo CONTRACTOR_NATURE_MESSAGE; ?>';
    var employedLabourValidationMessage = '<?php echo EMPLOYED_LABOUR_MESSAGE; ?>';
    var labourWorkedDaysValidationMessage = '<?php echo LABOUR_WORKED_DAYS_MESSAGE; ?>';
    var employedDirectLabourValidationMessage = '<?php echo EMPLOYED_DIRECT_LABOUR_MESSAGE; ?>';
    var directLabouWOrkedDaysValidationMessage = '<?php echo DIRECT_LABOUR_WORKED_DAYS_MESSAGE; ?>';
    var changeManagementDetailsValidationMessage = '<?php echo CHNAGE_MANAGEMENT_DETAILS_MESSAGE; ?>';

    var contractDurationValidationMessage = '<?php echo CONTRACT_DURATION_MESSAGE; ?>';
    var contractLanourValidationMessage = '<?php echo CONTRACT_LABOUR_MESSAGE; ?>';
    var workHoursValidationMessage = '<?php echo WORK_HOURS_MESSAGE; ?>';
    var overtimeWorkDaysValidationMessage = '<?php echo OVERTIME_WORK_DAYS_MESSAGE; ?>';
    var weeklyHolidayValidationMessage = '<?php echo WEEKLY_HOLIDAY_MESSAGE; ?>';
    var spreadOverValidationMessage = '<?php echo SPREAD_OVER_MESSAGE; ?>';
    var maleWOrkedDaysValidationMessage = '<?php echo MALE_WORKED_DAYS_MESSAGE; ?>';
    var femaleWOrkedDaysValidationMessage = '<?php echo FEMALE_WORKED_DAYS_MESSAGE; ?>';
    var totalWOrkedDaysValidationMessage = '<?php echo TOTAL_WORKED_DAYS_MESSAGE; ?>';
    var paidAmountValidationMessage = '<?php echo PAID_AMOUNT_MESSAGE; ?>';
    var amountDeductionValidationMessage = '<?php echo AMOUNT_DEDUCTION_MESSAGE; ?>';

    //part D
    var finValidationMessage = '<?php echo FIN_MESSAGE; ?>';
    var nicCodeValidationMessage = '<?php echo NIC_CODE_MESSAGE; ?>';
    var sectorValidationMessage = '<?php echo SECTOR_MESSAGE; ?>';
    var registrationSectionValidationMessage = '<?php echo REGISTRATION_SECTION_MESSAGE; ?>';
    var registrationNumberValidationMessage = '<?php echo FACTORY_REGISTRATION_NUMBER_MESSAGE; ?>';
    var licenseNumberValidationMessage = '<?php echo LICENSE_NUMNER_MESSAGE; ?>';
    var licenseWorkerValidationMessage = '<?php echo LICENSE_WORKER_MESSAGE; ?>';
    var licensehpValidationMessage = '<?php echo LICENSE_HP_MESSAGE; ?>';
    var licenseRenewalYearValidationMessage = '<?php echo LICENSE_RENEWAL_YEAR_MESSAGE; ?>';
    var licenseSubmitYearValidationMessage = '<?php echo LICENSE_SUBMIT_YEAR_MESSAGE; ?>';
    var planApprovalNumberValidationMessage = '<?php echo PLAN_APPROVAL_NUMBER_MESSAGE; ?>';
    var planApprovalDateValidationMessage = '<?php echo PLAN_APPROVAL_DATE_MESSAGE; ?>';
    var certificateObtainDateValidationMessage = '<?php echo CERTIFICATE_OBTAIN_DATE_MESSAGE; ?>';
    var certificateSubmitDateValidationMessage = '<?php echo CERTIFICATE_SUBMIT_DATE_MESSAGE; ?>';
    var finishedProductValidationMessage = '<?php echo FINISHED_PRODUCT_MESSAGE; ?>';
    var intermediatesValidationMessage = '<?php echo INTERMEDIATES_MESSAGE; ?>';
    var rawMaterialValidationMessage = '<?php echo RAW_MATERIAL_MESSAGE; ?>';
    var malAverageWorkersValidationMessage = '<?php echo MAL_AVERAGE_WORKERS_MESSAGE; ?>';
    var femalAverageWorkersValidationMessage = '<?php echo FEMALE_AVERAGE_WORKERS_MESSAGE; ?>';
    var factoryWorkedDaysValidationMessage = '<?php echo FACTORY_WORKED_DAYS_MESSAGE; ?>';
    var adultMenValidationMessage = '<?php echo ADULT_MEN_MESSAGE; ?>';
    var adultWomenValidationMessage = '<?php echo ADULT_WOMEN_MESSAGE; ?>';
    var adultTotalValidationMessage = '<?php echo ADULT_TOTAL_MESSAGE; ?>';
    var adolescentMenValidationMessage = '<?php echo ADOLESCENT_MEN_MESSAGE; ?>';
    var adolescentWomenValidationMessage = '<?php echo ADOLESCENT_WOMEN_MESSAGE; ?>';
    var adolescentOtherValidationMessage = '<?php echo ADOLESCENT_TOTAL_MESSAGE; ?>';
    var hyginistsEmployedValidationMessage = '<?php echo HYGINISTS_EMPLOYED_MESSAGE; ?>';
    var safetyProvisionValidationMessage = '<?php echo SAFETY_PROVISION_MESSAGE; ?>';
    var fightingEuipmentsValidationMessage = '<?php echo FIGHTING_EQUIPMENTS_MESSAGE; ?>';
    var personalequipmentsValidationMessage = '<?php echo PERSONAL_EQUPMENTS_MESSAGE; ?>';
    var safetyOfficerValidationMessage = '<?php echo SAFETY_OFFICER_MESSAGE; ?>';
    var safetyProgramsValidationMessage = '<?php echo SAFETY_PROGRAMS_MESSAGE; ?>';
    var workerTrainedValidationMessage = '<?php echo WORKER_TRAINED_MESSAGE; ?>';
    var amendedDateValidationMessage = '<?php echo AMENDED_DATE_MESSAGE; ?>';
    var rehearsalsDateValidationMessage = '<?php echo REHEARSAL_DATE_MESSAGE; ?>';
    var safetyPolicyValidationMessage = '<?php echo SAFETY_POLICY_MESSAGE; ?>';
    var cateenManagedByValidationMessage = '<?php echo CANTEEN_MANAGED_BY_MESSAGE; ?>';
    var workingHoursValidationMessage = '<?php echo WORKING_HOURS_MESSAGE; ?>';
    var workerDismissedValidationMessage = '<?php echo WORKER_DISMISSED_MESSAGE; ?>';
    var paidLeaveWorkerValidationMessage = '<?php echo PAID_LEAVE_WORKER_MESSAGE; ?>';
    var accidentsOccurrencesValidationMessage = '<?php echo ACCIDENTS_OCCURRENCES_MESSAGE; ?>';
    var injuriesOccurringValidationMessage = '<?php echo INJURIES_OCCURING_MESSAGE; ?>';
    var fatalinjuriesValidationMessage = '<?php echo FATAL_INJURIES_MESSAGE; ?>';
    var nonFatalinjuriesValidationMessage = '<?php echo NONFATAL_INJURIES_MESSAGE; ?>';
    var returnNonFatalinjuriesValidationMessage = '<?php echo RETURN_FATAL_INJURIES_MESSAGE; ?>';
    var returnNonFatalLostinjuriesValidationMessage = '<?php echo RETURN_NONFATAL_INJURIES_MESSAGE; ?>';
    var noOfWashroomValidationMessage = '<?php echo NO_OF_WASHROOM_MESSAGE; ?>';
    var retainerShipValidationValidationMessage = '<?php echo RETAINER_SHIP_MESSAGE; ?>';

    var processNameValidationMessage = '<?php echo PROCESS_NAME_MESSAGE; ?>';
    var employedPersonValidationMessage = '<?php echo EMPLOYED_PERSON_MESSAGE; ?>';
    var examinedMaleValidationMessage = '<?php echo EXAMINED_MALE_MESSAGE; ?>';
    var examinedFemaleValidationMessage = '<?php echo EXAMINED_FEMALE_MESSAGE; ?>';
    var unfitMaleValidationMessage = '<?php echo UNFIT_MALE_MESSAGE; ?>';
    var unfitFemaleValidationMessage = '<?php echo UNFIT_FEMALE_MESSAGE; ?>';



    //part E
    var respectOfFinesValidationMessage = '<?php echo RESPECT_OF_FINES_MESSAGE; ?>';
    var adultsWorkedDaysValidationMessage = '<?php echo ADULT_WORKED_DAYS_MESSAGE; ?>';
    var youngPersonWorkedDaysValidationMessage = '<?php echo YOUNG_PERSON_WORKED_DAYS_MESSAGE; ?>';
    var adultsWorkersEmployedValidationMessage = '<?php echo ADULTS_WORKERS_EMPLOYED_MESSAGE; ?>';
    var youngPersonWorkersEmployedValidationMessage = '<?php echo YOUNG_PERSON_WORKERS_EMPLOYED_MESSAGE; ?>';
    var basicwagesValidationMessage = '<?php echo BASIC_WAGES_MESSAGE; ?>';
    var dearnessAllowancesValidationMessage = '<?php echo DEARNESS_ALLOWANCES_MESSAGE; ?>';
    var compositewagesValidationMessage = '<?php echo COMPOSITE_WAGES_MESSAGE; ?>';
    var overtimeWagesValidationMessage = '<?php echo OVER_TIME_WAGES_MESSAGE; ?>';
    var nonProfitBonusValidationMessage = '<?php echo NON_PROFIT_BONUS_MESSAGE; ?>';
    var otherBonusValidationMessage = '<?php echo OTHER_BONUS_MESSAGE; ?>';
    var otherAmountValidationMessage = '<?php echo OTHER_AMOUNT_MESSAGE; ?>';
    var arrearsOfPatValidationMessage = '<?php echo ARREARS_OF_PAT_MESSAGE; ?>';
    var totalWagesValidationMessage = '<?php echo TOTAL_WAGES_MESSAGE; ?>';
    var yearTotalWagesValidationMessage = '<?php echo YEAR_TOTAL_WAGES_MESSAGE; ?>';
    var yearPaidBonusValidationMessage = '<?php echo YEAR_PAID_BONUS_MESSAGE; ?>';
    var commisionAmountValidationMessage = '<?php echo COMMISION_AMOUNT_MESSAGE; ?>';
    var realizedAmountValidationMessage = '<?php echo REALIZED_AMOUNT_MESSAGE; ?>';


    //part F
    var noOfFemaleWorkersValidationMessage = '<?php echo NO_OF_FEMALE_WORKERS_MESSAGE; ?>';
    var noOfMaternityWomenWorkersValidationMessage = '<?php echo NO_OF_MATERNITY_WOMEN_WORKERS_MESSAGE; ?>';
    var medicalBonusValidationMessage = '<?php echo MEDICAL_BONUS_MESSAGE; ?>';
    var miscarriageLeaveValidationMessage = '<?php echo MISCARRIAGE_LEVEL_MESSAGE; ?>';
    var additionalLeaveValidationMessage = '<?php echo ADDITIONAL_LEAVE_MESSAGE; ?>';
    var maternityBenefitAmountValidationMessage = '<?php echo MATERNITY_BENEFIT_AMOUNT_MESSAGE; ?>';
    var dismissedWomenValidationMessage = '<?php echo DISMISSED_WOMEN_MESSAGE; ?>';
    var dismissedReasonValidationMessage = '<?php echo DISMISSED_REASON_MESSAGE; ?>';

    //part G
    var noOfEmployedWorkersValidationMessage = '<?php echo NO_OF_EMPLOYED_WORKERS_MESSAGE; ?>';
    var noOfHandicappedEmployedValidationMessage = '<?php echo NO_OF_HANDICAPPED_EMPLOYED_MESSAGE; ?>';

    //BOCW Module
    var nameLocationValidationMessage = '<?php echo NAME_LOCATION_MESSAGE; ?>';
    var postalAddressValidationMessage = '<?php echo POSTAL_ADDRESS_MESSAGE; ?>';
    var nameAddressValidationMessage = '<?php echo NAME_ADDRESS_MESSAGE; ?>';
    var managerNameAddressValidationMessage = '<?php echo MANAGER_NAME_ADDRESS_MESSAGE; ?>';
    var buildingNatureValidationMessage = '<?php echo BUILDING_NATURE_MESSAGE; ?>';
    var maxnumberValidationMessage = '<?php echo MAX_NUMBER_MESSAGE; ?>';
    var commencementDateValidationMessage = '<?php echo COMMENCEMENT_DATE_MESSAGE; ?>';
    var completionDateValidationMessage = '<?php echo COMPLETION_DATE_MESSAGE; ?>';
    var particularsValidationMessage = '<?php echo PARTICULARS_MESSAGE; ?>';
    var amountValidationMessage = '<?php echo AMOUNT_MESSAGE; ?>';
    var drafNoValidationMessage = '<?php echo DRAF_NO_MESSAGE; ?>';
    var demandDrafDateValidationMessage = '<?php echo DRAF_DATE_MESSAGE; ?>';
    var declarationOneValidationMessage = '<?php echo DECLARATION_ONE_MESSAGE; ?>';
    var declarationTwoValidationMessage = '<?php echo DECLARATION_TWO_MESSAGE; ?>';
    var uploadDocumentValidationMessage = '<?php echo UPLOAD_DOCUMENT_MESSAGE; ?>';

    //Factory License Module
    var factoryNameValidationMessage = '<?php echo FACTORY_NAME_MESSAGE; ?>';
    var factoryLicenseNoValidationMessage = '<?php echo FACTORY_LICENSE_NO_MESSAGE; ?>';
    var factoryAddressValidationMessage = '<?php echo FACTORY_ADDRESS_MESSAGE; ?>';
    var factoryPostalAddressValidationMessage = '<?php echo FACTORY_POSTAL_ADDRESS_MESSAGE; ?>';
    var manufacturingNatureValidationMessage = '<?php echo MANUFACTURING_NATURE_MESSAGE; ?>';
    var maxWorkerValidationMessage = '<?php echo MAX_WORKER_MESSAGE; ?>';
    var powerValidationMessage = '<?php echo POWER_MESSAGE; ?>';
    var maxPowerValidationMessage = '<?php echo MAX_POWER_MESSAGE; ?>';
    var managerValidationMessage = '<?php echo MANAGER_MESSAGE; ?>';
    var occupierValidationMessage = '<?php echo OCCUPIER_MESSAGE; ?>';
    var factoryProprietorValidationMessage = '<?php echo FACTORY_PROPRIETOR_MESSAGE; ?>';
    var shareHolderValidationMessage = '<?php echo SHARE_HOLDER_MESSAGE; ?>';
    var chiefHeadValidationMessage = '<?php echo CHIEF_HEAD_MESSAGE; ?>';
    var ownerValidationMessage = '<?php echo OWNER_MESSAGE; ?>';
    var referenceNoValidationMessage = '<?php echo REFERENCE_NO_MESSAGE; ?>';
    var approvalDateValidationMessage = '<?php echo APPROVAL_DATE_MESSAGE; ?>';
    var disposalWasteValidationMessage = '<?php echo DISPOSAL_WASTE_MESSAGE; ?>';
    var authorityNameValidationMessage = '<?php echo AUTHORITY_NAME_MESSAGE; ?>';
    var occupierSignValidationMessage = '<?php echo OCCUPIER_SIGN_MESSAGE; ?>';
    var productNameValidationMessage = '<?php echo PRODUCT_NAME_MESSAGE; ?>';
    var productValueValidationMessage = '<?php echo PRODUCT_VALUE_MESSAGE; ?>';
    var directorNameValidationMessage = '<?php echo DIRECTOR_NAME_MESSAGE; ?>';
    var managerNameValidationMessage = '<?php echo MANAGER_NAME_MESSAGE; ?>';
    var managingDirectorNameValidationMessage = '<?php echo MANAGING_DIRECTOR_MESSAGE; ?>';
    var invalidIdValidationMessage = '<?php echo INVALID_ID_MESSAGE; ?>';


    //Building plan Module
    var applicantNameValidationMessage = '<?php echo APPLICANT_NAME_MESSAGE; ?>';
    var applicantPhnoValidationMessage = '<?php echo APPLICANT_PHNO_MESSAGE; ?>';
    var applicantEmailValidationMessage = '<?php echo APPLICANT_EMAIL_MESSAGE; ?>';
    var factoryBuildingValidationMessage = '<?php echo FACTORY_BUILDING_MESSAGE; ?>';
    var factorySectorValidationMessage = '<?php echo FACTORY_SECTOR_MESSAGE; ?>';
    var factoryCityValidationMessage = '<?php echo FACTORY_CITY_MESSAGE; ?>';
    var factoryPincodeValidationMessage = '<?php echo FACTORY_PINCODE_MESSAGE; ?>';
    var factoryDistrictValidationMessage = '<?php echo FACTORY_DISTRICT_MESSAGE; ?>';
    var factoryTownValidationMessage = '<?php echo FACTORY_TOWN_MESSAGE; ?>';
    var policeStationValidationMessage = '<?php echo POLICE_STATION_MESSAGE; ?>';
    var railwayStationValidationMessage = '<?php echo RAILWAY_STATION_MESSAGE; ?>';
    var planValidationMessage = '<?php echo PLAN_MESSAGE; ?>';
    var flowChartValidationMessage = '<?php echo FLOW_CHART_MESSAGE; ?>';
    var sitePlanValidationMessage = '<?php echo SITE_PLAN_MESSAGE; ?>';
    var elevationDocumentValidationMessage = '<?php echo ELEVATION_DOCUMENT_MESSAGE; ?>';
    var applicantSignValidationMessage = '<?php echo APPLICANT_SIGN_MESSAGE; ?>';

    // Boiler Act
    var ownerNameValidationMessage = '<?php echo OWNER_NAME_MESSAGE; ?>';
    var boilerSituationValidationMessage = '<?php echo BOILER_SITUATION_MESSAGE; ?>';
    var boilerTypeValidationMessage = '<?php echo BOILER_TYPE_MESSAGE; ?>';
    var districtValidationMessage = '<?php echo DISTRICT_MESSAGE; ?>';
    var utValidationMessage = '<?php echo UT_MESSAGE; ?>';
    var workingPressureValidationMessage = '<?php echo WORKING_PRESSURE_MESSAGE; ?>';
    var maxPressureValidationMessage = '<?php echo MAX_PRESSURE_MESSAGE; ?>';
    var heatingSurfaceValidationMessage = '<?php echo HEATING_SURFACE_MESSAGE; ?>';
    var lengthPipesValidationMessage = '<?php echo LENGTH_PIPES_MESSAGE; ?>';
    var maxEvaporationValidationMessage = '<?php echo MAX_EVAPORATION_MESSAGE; ?>';
    var manufacturePlaceValidationMessage = '<?php echo MANUFACTURE_PLACE_MESSAGE; ?>';
    var manufactureYearValidationMessage = '<?php echo MANUFACTURE_YEAR_MESSAGE; ?>';
    var manufactureNameValidationMessage = '<?php echo MANUFACTURE_NAME_MESSAGE; ?>';
    var manufactureAddressValidationMessage = '<?php echo MANUFACTURE_ADDRESS_MESSAGE; ?>';
    var hydrulicallyTestedOnValidationMessage = '<?php echo HYDRULICALLY_TESTED_ON_MESSAGE; ?>';
    var hydrulicallyTestedValidationMessage = '<?php echo HYDRULICALLY_TESTED_MESSAGE; ?>';
    var repairsValidationMessage = '<?php echo REPAIRS_MESSAGE; ?>';
    var remarksValidationMessage = '<?php echo REMARK_MESSAGE; ?>';
    var pipeLineDrawValidationMessage = '<?php echo PIPELINE_DRAW_MESSAGE; ?>';
    var copyOfChallanValidationMessage = '<?php echo COPY_OF_CHALLAN_MESSAGE; ?>';
    var ibrDocumentValidationMessage = '<?php echo IBR_DOCUMENT_MESSAGE; ?>';

    // Occupancy Certificate
    var surveyNoValidationMessage = '<?php echo SURVEY_NO_MESSAGE; ?>';
    var plotNoValidationMessage = '<?php echo OCCUPANCY_PLOT_NO_MESSAGE; ?>';
    var zoneValidationMessage = '<?php echo ZONE_MESSAGE; ?>';
    var situatedAtValidationMessage = '<?php echo SITUATED_AT_MESSAGE; ?>';
    var licenseNoValidationMessage = '<?php echo LICENSE_NO_MESSAGE; ?>';
    var completionOnDateValidationMessage = '<?php echo COMPLETION_ON_DATE_MESSAGE; ?>';
    var licensedEngineerNameValidationMessage = '<?php echo LICENSED_ENGINEER_NAME_MESSAGE; ?>';
    var ownerNameValidationMessage = '<?php echo OWNER_NAME_MESSAGE; ?>';
    var occupancyRegistrationNoValidationMessage = '<?php echo OCCUPANCY_REGISTRATION_NO_MESSAGE; ?>';
    var occupancyValidUptoValidationMessage = '<?php echo OCCUPANCY_VALID_UPTO_MESSAGE; ?>';
    var occupancyAddressValidationMessage = '<?php echo OCCUPANCY_ADDRESS_MESSAGE; ?>';

    //Allotment of Plot
    var promotionCouncilMessage = '<?php echo PROMOTION_COUNCIL_MESSAGE; ?>';

    // NA Applcation
    var occupationValidationMessage = '<?php echo OCCUPATION_MESSAGE; ?>';
    var naPurposeValidationMessage = '<?php echo NA_PURPOSE_MESSAGE; ?>';
    var naSurveyNoValidationMessage = '<?php echo NA_SURVEY_NO_MESSAGE; ?>';
    var naAreaAssessmentValidationMessage = '<?php echo NA_AREA_ASSESSMENT_MESSAGE; ?>';
    var naAreaSiteValidationMessage = '<?php echo NA_AREA_SITE_MESSAGE; ?>';
    var naOccupantClassValidationMessage = '<?php echo NA_OCCUPANT_CLASS_MESSAGE; ?>';
    var naPresentUseValidationMessage = '<?php echo NA_PRESENT_USE_MESSAGE; ?>';
    var naSituatedLandValidationMessage = '<?php echo NA_SITUATED_LAND_MESSAGE; ?>';
    var naElectricalDistanceLandValidationMessage = '<?php echo NA_ELECTRICAL_DISTANCE_LAND_MESSAGE; ?>';
    var naAcquisitionsUnderLandValidationMessage = '<?php echo NA_ACQUISITIONS_UNDER_LAND_MESSAGE; ?>';
    var naAccessibleLandValidationMessage = '<?php echo NA_ACCESSIBLE_LAND_MESSAGE; ?>';
    var naSiteAccessLandValidationMessage = '<?php echo NA_SITE_ACCESS_LAND_MESSAGE; ?>';
    var naRejectedLandValidationMessage = '<?php echo NA_REJECTED_LAND_MESSAGE; ?>';

    //Application of Licence
    var contractorNameValidationMessage = '<?php echo CONTRACTOR_NAME_MESSAGE; ?>';
    var contractorFatherNameValidationMessage = '<?php echo CONTRACTOR_FATHER_NAME_MESSAGE; ?>';
    var contractorAddressValidationMessage = '<?php echo CONTRACTOR_ADDRESS_MESSAGE; ?>';
    var contractorCcontactValidationMessage = '<?php echo CONTRACTOR_CONTACT_MESSAGE; ?>';
    var establishmentNameValidationMessage = '<?php echo ESTABLISHMENT_NAME_MESSAGE; ?>';
    var establishmentAddressValidationMessage = '<?php echo ESTABLISHMENT_ADDRESS_MESSAGE; ?>';
    var certificateNoValidationMessage = '<?php echo CERTIFICATE_NO_MESSAGE; ?>';
    var certificateDateValidationMessage = '<?php echo CERTIFICATE_DATE_MESSAGE; ?>';
    var employerNameValidationMessage = '<?php echo EMPLOYER_NAME_MESSAGE; ?>';
    var employerAddressValidationMessage = '<?php echo EMPLOYER_ADDRESS_MESSAGE; ?>';
    var natureOfProcessValidationMessage = '<?php echo NATURE_PROCESS_MESSAGE; ?>';
    var natureOfProcesslabourValidationMessage = '<?php echo NATURE_PROCESS_LABOUR_MESSAGE; ?>';
    var durationOfWorkValidationMessage = '<?php echo DURATION_WORK_MESSAGE; ?>';
    var agentNameValidationMessage = '<?php echo AGENT_NAME_MESSAGE; ?>';
    var agentAddressValidationMessage = '<?php echo AGENT_ADDRESS_MESSAGE; ?>';
    var maxNoEmpValidationMessage = '<?php echo MAX_NO_MESSAGE; ?>';
    var estimetedValueValidationMessage = '<?php echo ESTABLISHMENT_MESSAGE; ?>';
    var treasuryReceiptNoValidationMessage = '<?php echo TRESURY_RECEIPT_MESSAGE; ?>';
    var treasuryReceiptDateValidationMessage = '<?php echo TRESURY_RECEIPT_DATE_MESSAGE; ?>';
    var placeValidationMessage = '<?php echo PLACE_MESSAGE; ?>';
    var detailOfWorkValidationMessage = '<?php echo DETAIL_WORK_MESSAGE; ?>';
    var feesValidationMessage = '<?php echo FEES_MESSAGE; ?>';


    // QueryGrievance
    var queryDistrictValidationMessage = '<?php echo QUERY_DISTRICT_MESSAGE; ?>';
    var issueCategoryValidationMessage = '<?php echo ISSUE_CATEGORY_MESSAGE; ?>';
    var queryDepartmentValidationMessage = '<?php echo QUERY_DEPARTMENT_MESSAGE; ?>';
    var queryOtherDepartmentValidationMessage = '<?php echo QUERY_OTHER_DEPARTMENT_MESSAGE; ?>';
    var applicantFullNameValidationMessage = '<?php echo APPLICANT_FULL_NAME_MESSAGE; ?>';
    var businessNameValidationMessage = '<?php echo BUSINESS_NAME_MESSAGE; ?>';
    var mobileNumberValidationMessage = '<?php echo MOBILE_NUMBER_MESSAGE; ?>';
    var emailValidationMessage = '<?php echo EMAIL_MESSAGE; ?>';
    var applicationNumberValidationMessage = '<?php echo APPLICATION_NUMBER_MESSAGE; ?>';
    var queryDetailValidationMessage = '<?php echo QUERY_DETAIL_MESSAGE; ?>';
    var queryResponseDetailValidationMessage = '<?php echo QUERY_RESPONSE_DETAIL_MESSAGE; ?>';


    // Complainant Module
    var cnameValidationMessage = '<?php echo CNAME_MESSAGE; ?>';
    var caddressValidationMessage = '<?php echo CADDRESS_MESSAGE; ?>';
    var cbnameValidationMessage = '<?php echo CBNAME_MESSAGE; ?>';
    var cbaddressValidationMessage = '<?php echo CBADDRESS_MESSAGE; ?>';

    //Reporting/Informing/Intimation to Legal Metrology Office
    var userNameValidationMessage = '<?php echo USER_NAME_MESSAGE; ?>';
    var tradeValidationMessage = '<?php echo TRADE_MESSAGE; ?>';
    var reportValidationMessage = '<?php echo REPORT_MESSAGE; ?>';

    // Periodical Return
    var applicationCategoryValidationMessage = '<?php echo SELECT_APPLICATIN_CATEGORY; ?>';
    var licenceDateValidationMessage = '<?php echo LICENCE_DATE; ?>';

    var descValidationMessage = '<?php echo DESCRIPTION_MESSAGE; ?>';
    var oneFeeValidationMessage = '<?php echo ONE_FEE_MESSAGE; ?>';

    var fromToDateValidationMessage = '<?php echo FROM_TO_DATE_MESSAGE; ?>';
</script>