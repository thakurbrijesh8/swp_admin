<div class="row">
   <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">PART D</div>
                <div style="font-size: 16px; margin-top: 0px;">Details Under the factory Act,1948 and the rule made there under.</div>
                
            </div>
            <form role="form" id="single_return_partd_form" name="single_return_partd_form" onsubmit="return false;">
                <input type="hidden" id="singlereturn_id" name="singlereturn_id" value="{{singlereturn_id}}">
                <input type="hidden" id="singlereturn_partd_id" name="singlereturn_partd_id" value="{{singlereturn_partd_id}}">
                <div class="card-body">
                    <h2 class="box-title f-w-b page-header color-nic-blue f-s-20px m-b-0">1. Factory Identification Details</h2>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>1.1 FIN (Factory Identification Number)<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="fin" name="fin" class="form-control" placeholder="Enter FIN (Factory Identification Number) !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'fin', finValidationMessage);" value="{{fin}}">
                            </div>
                            <span class="error-message error-message-single-return-fin"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>1.2 NIC code<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="nic_code" name="nic_code" class="form-control" placeholder="Enter NIC code !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'nic_code', nicCodeValidationMessage);" value="{{nic_code}}">
                            </div>
                            <span class="error-message error-message-single-return-nic_code"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>1.3 Select Sector</label>
                            <div class="input-group">
                                <select class="form-control" style="margin-top: 22px;" 
                                    data-placeholder="Select Sector !" name="sector" id="sector" readonly onblur="checkValidation('dealer', 'sector', sectorValidationMessage);">
                                    <option value="">Select Sector</option>
                                    <option value="1">Public</option>
                                    <option value="2">Co-Operative</option>
                                    <option value="3">Joint Venture</option>
                                </select>
                            </div>
                            <span class="error-message error-message-single-return-sector"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>1.4 Select Registration Under Section</label>
                            <div class="input-group">
                                <select class="form-control" style="margin-top: 22px;" 
                                    data-placeholder="Select Registration Under Section !" name="registration_section" id="registration_section" readonly onblur="checkValidation('dealer', 'registration_section', registrationSectionValidationMessage);">
                                    <option value="">Select Registration Under Section</option>
                                    <option value="1">2m (i)</option>
                                    <option value="2">2m (ii)</option>
                                    <option value="3">85</option>
                                </select>
                            </div>
                            <span class="error-message error-message-single-return-registration_section"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>1.5 Registration Number<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="registration_no" name="registration_no" class="form-control" placeholder="Enter Registration Number !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'registration_no', registrationNumberValidationMessage);" value="{{registration_no}}">
                            </div>
                            <span class="error-message error-message-single-return-registration_no"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>1.6 License Number<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="license_no" name="license_no" class="form-control" placeholder="Enter License Number !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'license_no', licenseNumberValidationMessage);" value="{{license_no}}">
                            </div>
                            <span class="error-message error-message-single-return-license_no"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>1.7 Licensed Workers<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="license_workers" name="license_workers" class="form-control" placeholder="Enter Licensed Workers !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'license_workers', licenseWorkerValidationMessage);" value="{{license_workers}}">
                            </div>
                            <span class="error-message error-message-single-return-license_workers"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>1.8 Lisensed H.P.<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="license_hp" name="license_hp" class="form-control" placeholder="Enter Lisensed H.P. !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'license_hp', licensehpValidationMessage);" value="{{license_hp}}">
                            </div>
                            <span class="error-message error-message-single-return-license_hp"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>1.9 Licensed Renewal position (Year)<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="license_renewal_year" name="license_renewal_year" class="form-control" placeholder="Enter Licensed Renewal position !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'license_renewal_year', licenseRenewalYearValidationMessage);" value="{{license_renewal_year}}">
                            </div>
                            <span class="error-message error-message-single-return-license_renewal_year"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>1.10 Licensed Renewal Application submitted for the year <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="license_submitted_year" name="license_submitted_year" class="form-control" placeholder="Enter Licensed Renewal Application submitted for the year  !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'license_submitted_year', licenseSubmitYearValidationMessage);" value="{{license_submitted_year}}">
                            </div>
                            <span class="error-message error-message-single-return-license_submitted_year"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>1.11 Plan Approval No.<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="plan_approval_no" name="plan_approval_no" class="form-control" placeholder="Enter Plan Approval No. !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'plan_approval_no', planApprovalNumberValidationMessage);" value="{{plan_approval_no}}">
                            </div>
                            <span class="error-message error-message-single-return-plan_approval_no"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>1.12 Plan Approval Date  <span style="color: red;">*</span></label>
                            <div class="input-group date">
                                <input type="text" name="plan_approval_date" id="plan_approval_date" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                                       value="{{plan_approval_date}}" readonly onblur="checkValidation('bocw', 'plan_approval_date', planApprovalDateValidationMessage);">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-single-return-plan_approval_date"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>1.13 Stability Certificate Obtained On Date  <span style="color: red;">*</span></label>
                            <div class="input-group date">
                                <input type="text" name="certificate_obtain_on_date" id="certificate_obtain_on_date" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                                       value="{{certificate_obtain_on_date}}" readonly onblur="checkValidation('bocw', 'certificate_obtain_on_date', certificateObtainDateValidationMessage);">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-single-return-certificate_obtain_on_date"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>1.14 Stability Certificate Submitted On Date  <span style="color: red;">*</span></label>
                            <div class="input-group date">
                                <input type="text" name="certificate_submitted_on_date" id="certificate_submitted_on_date" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                                       value="{{certificate_submitted_on_date}}" readonly onblur="checkValidation('bocw', 'certificate_submitted_on_date', certificateSubmitDateValidationMessage);">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-single-return-certificate_submitted_on_date"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>1.15 Finished Product<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="finished_product" name="finished_product" class="form-control" placeholder="Enter Finished Product !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'finished_product', finishedProductValidationMessage);">{{finished_product}}</textarea>
                            </div>
                            <span class="error-message error-message-single-return-finished_product"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>1.16 Intermediates<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="intermediates" name="intermediates" class="form-control" placeholder="Enter Intermediates !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'intermediates', intermediatesValidationMessage);">{{intermediates}}</textarea>
                            </div>
                            <span class="error-message error-message-single-return-intermediates"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>1.17 Raw materials<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="raw_materials" name="raw_materials" class="form-control" placeholder="Enter Raw materials !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'raw_materials', rawMaterialValidationMessage);">{{raw_materials}}</textarea>
                            </div>
                            <span class="error-message error-message-single-return-raw_materials"></span>
                        </div>
                    </div>
                    <h2 class="box-title f-w-b page-header color-nic-blue f-s-20px m-b-0">2. Details of Employment</h2>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>2.1 Average Daily workers <br/> 2.1.1 Male<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="male_average_workers" name="male_average_workers" class="form-control" placeholder="Enter Male workers !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'male_average_workers', malAverageWorkersValidationMessage);" value="{{male_average_workers}}">
                            </div>
                            <span class="error-message error-message-single-return-male_average_workers"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label style="margin-top: 20px;">2.1.2 Female <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="female_average_workers" name="female_average_workers" class="form-control" placeholder="Enter Female workers !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'female_average_workers', femalAverageWorkersValidationMessage);" value="{{female_average_workers}}">
                            </div>
                            <span class="error-message error-message-single-return-female_average_workers"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>2.2 Number of days the factory worked during previous Year <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="factory_worked_days" name="factory_worked_days" class="form-control" placeholder="Enter Number of days the factory worked during previous Year !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'factory_worked_days', factoryWorkedDaysValidationMessage);" value="{{factory_worked_days}}">
                            </div>
                            <span class="error-message error-message-single-return-factory_worked_days"></span>
                        </div>
                    </div>
                    <span class="box-title f-w-b page-header m-b-0">2.3 Number of man days worked (i.e. aggregate attendance during the Previous year)</span>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label>2.3.1 Adults <br/>2.3.1.1 Men<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="adult_men_worked_days" name="adult_men_worked_days" class="form-control" placeholder="Enter Men workers !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'adult_men_worked_days', adultMenValidationMessage);" value="{{adult_men_worked_days}}">
                            </div>
                            <span class="error-message error-message-single-return-adult_men_worked_days"></span>
                        </div>
                        <div class="form-group col-sm-4">
                            <label style="margin-top: 20px;">2.3.1.2 Women <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="adult_women_worked_days" name="adult_women_worked_days" class="form-control" placeholder="Enter Women workers !" 
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'adult_women_worked_days', adultWomenValidationMessage);" value="{{adult_women_worked_days}}">
                            </div>
                            <span class="error-message error-message-single-return-adult_women_worked_days"></span>
                        </div>
                        <div class="form-group col-sm-4">
                            <label style="margin-top: 20px;">2.3.1.3 Total <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="adult_total_worked_days" name="adult_total_worked_days" class="form-control" placeholder="Enter Total workers !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'adult_total_worked_days', adultTotalValidationMessage);" value="{{adult_total_worked_days}}">
                            </div>
                            <span class="error-message error-message-single-return-adult_total_worked_days"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label>2.3.2 Adolescents <br/>2.3.2.1 Men<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="adolescent_men_worked_days" name="adolescent_men_worked_days" class="form-control" placeholder="Enter Men workers !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'adolescent_men_worked_days', adolescentMenValidationMessage);" value="{{adolescent_men_worked_days}}">
                            </div>
                            <span class="error-message error-message-single-return-adolescent_men_worked_days"></span>
                        </div>
                        <div class="form-group col-sm-4">
                            <label style="margin-top: 20px;">2.3.2.2 Women <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="adolescent_women_worked_days" name="adolescent_women_worked_days" class="form-control" placeholder="Enter Women workers !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'adolescent_women_worked_days', adolescentWomenValidationMessage);" value="{{adolescent_women_worked_days}}">
                            </div>
                            <span class="error-message error-message-single-return-adolescent_women_worked_days"></span>
                        </div>
                        <div class="form-group col-sm-4">
                            <label style="margin-top: 20px;">2.3.2.3 Total <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="adolescent_total_worked_days" name="adolescent_total_worked_days" class="form-control" placeholder="Enter Total workers !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'adolescent_total_worked_days', adolescentOtherValidationMessage);" value="{{adolescent_total_worked_days}}">
                            </div>
                            <span class="error-message error-message-single-return-adolescent_total_worked_days"></span>
                        </div>
                    </div>
                    <span class="box-title f-w-b page-header m-b-0">2.4 Average Number of workers Employed daily i.e. man days worked divided by number of days worked</span>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label>2.4.1 Adults <br/>2.4.1.1 Men<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="adult_men_workers_employed" name="adult_men_workers_employed" class="form-control" placeholder="Enter Men workers !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'adult_men_workers_employed', adultMenValidationMessage);" value="{{adult_men_workers_employed}}">
                            </div>
                            <span class="error-message error-message-single-return-adult_men_workers_employed"></span>
                        </div>
                        <div class="form-group col-sm-4">
                            <label style="margin-top: 20px;">2.4.1.2 Women <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="adult_women_workers_employed" name="adult_women_workers_employed" class="form-control" placeholder="Enter Women workers !" 
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'adult_women_workers_employed', adultWomenValidationMessage);" value="{{adult_women_workers_employed}}">
                            </div>
                            <span class="error-message error-message-single-return-adult_women_workers_employed"></span>
                        </div>
                        <div class="form-group col-sm-4">
                            <label style="margin-top: 20px;">2.4.1.3 Total <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="adult_total_workers_employed" name="adult_total_workers_employed" class="form-control" placeholder="Enter Total workers !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'adult_total_workers_employed', adultTotalValidationMessage);" value="{{adult_total_workers_employed}}">
                            </div>
                            <span class="error-message error-message-single-return-adult_total_workers_employed"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label>2.4.2 Adolescents <br/>2.4.2.1 Men<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="adolescent_men_workers_employed" name="adolescent_men_workers_employed" class="form-control" placeholder="Enter Men workers !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'adolescent_men_workers_employed', adolescentMenValidationMessage);" value="{{adolescent_men_workers_employed}}">
                            </div>
                            <span class="error-message error-message-single-return-adolescent_men_workers_employed"></span>
                        </div>
                        <div class="form-group col-sm-4">
                            <label style="margin-top: 20px;">2.4.2.2 Women <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="adolescent_women_workers_employed" name="adolescent_women_workers_employed" class="form-control" placeholder="Enter Women workers !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'adolescent_women_workers_employed', adolescentWomenValidationMessage);" value="{{adolescent_women_workers_employed}}">
                            </div>
                            <span class="error-message error-message-single-return-adolescent_women_workers_employed"></span>
                        </div>
                        <div class="form-group col-sm-4">
                            <label style="margin-top: 20px;">2.4.2.3 Total <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="adolescent_total_workers_employed" name="adolescent_total_workers_employed" class="form-control" placeholder="Enter Total workers !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'adolescent_total_workers_employed', adolescentOtherValidationMessage);" value="{{adolescent_total_workers_employed}}">
                            </div>
                            <span class="error-message error-message-single-return-adolescent_total_workers_employed"></span>
                        </div>
                    </div>
                    <span class="box-title f-w-b page-header m-b-0">2.5 Total number of man-hours worked including overtime but excluding rest interval</span>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label>2.5.1 Adults <br/>2.5.1.1 Men<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="adult_men_work_hours" name="adult_men_work_hours" class="form-control" placeholder="Enter Men workers !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'adult_men_work_hours', adultMenValidationMessage);" value="{{adult_men_work_hours}}">
                            </div>
                            <span class="error-message error-message-single-return-adult_men_work_hours"></span>
                        </div>
                        <div class="form-group col-sm-4">
                            <label style="margin-top: 20px;">2.5.1.2 Women <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="adult_women_work_hours" name="adult_women_work_hours" class="form-control" placeholder="Enter Women workers !" 
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'adult_women_work_hours', adultWomenValidationMessage);" value="{{adult_women_work_hours}}">
                            </div>
                            <span class="error-message error-message-single-return-adult_women_work_hours"></span>
                        </div>
                        <div class="form-group col-sm-4">
                            <label style="margin-top: 20px;">2.5.1.3 Total <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="adult_total_work_hours" name="adult_total_work_hours" class="form-control" placeholder="Enter Total workers !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'adult_total_work_hours', adultTotalValidationMessage);" value="{{adult_total_work_hours}}">
                            </div>
                            <span class="error-message error-message-single-return-adult_total_work_hours"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label>2.5.2 Adolescents <br/>2.5.2.1 Men<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="adolescent_men_work_hours" name="adolescent_men_work_hours" class="form-control" placeholder="Enter Men workers !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'adolescent_men_work_hours', adolescentMenValidationMessage);" value="{{adolescent_men_work_hours}}">
                            </div>
                            <span class="error-message error-message-single-return-adolescent_men_work_hours"></span>
                        </div>
                        <div class="form-group col-sm-4">
                            <label style="margin-top: 20px;">2.5.2.2 Women <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="adolescent_women_work_hours" name="adolescent_women_work_hours" class="form-control" placeholder="Enter Women workers !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'adolescent_women_work_hours', adolescentWomenValidationMessage);" value="{{adolescent_women_work_hours}}">
                            </div>
                            <span class="error-message error-message-single-return-adolescent_women_work_hours"></span>
                        </div>
                        <div class="form-group col-sm-4">
                            <label style="margin-top: 20px;">2.5.2.3 Total <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="adolescent_total_work_hours" name="adolescent_total_work_hours" class="form-control" placeholder="Enter Total workers !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'adolescent_total_work_hours', adolescentOtherValidationMessage);" value="{{adolescent_total_work_hours}}">
                            </div>
                            <span class="error-message error-message-single-return-adolescent_total_work_hours"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12">
                            <div style="background-color: #d2d6de; padding: 5px;">
                                <span class="f-w-b" style="font-size: 15px; color: #000;">2.6 In respect of factories carrying on process or operation declared dangerous under section 87, furnish the following information. (See explanatory note 'A') </span>
                                <hr>
                                <table class="table table-bordered m-b-0px" id="processList" style="margin-top: 10px;text-align: center;">
                                    <thead>
                                        <tr style='color: #000;'>
                                            <th></th>
                                            <th width="20%">Name of the dangerous process or operation carried of(See explanatory note 'A') </th>
                                            <th width="20%">Average number of persons employed daily in each of the process or operation given (See explanatory note 'B') </th>
                                            <th colspan="5">Number of persons</th>
                                        </tr>
                                        <tr style='color: #000;'>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th colspan="2">Medically examined </th>
                                            <th colspan="2">declared unfit </th>
                                            <th></th>
                                        </tr>
                                        <tr style='color: #000;'>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th>Male</th>
                                            <th>Female</th>
                                            <th>Male</th>
                                            <th>Female</th>
                                            <th></th>
                                        </tr>
                                        <tr style='color: #000;'>
                                            <th>Sr No.</th>
                                            <th>1</th>
                                            <th>2</th>
                                            <th>3</th>
                                            <th>5</th>
                                            <th>5</th>
                                            <th>6</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody id="dangerous_process_info_container">
                                    </tbody>
                                </table>
                            </div>
                            <div class="box-footer" align="right" >
                                <button type="button" class="btn btn-sm btn-nic-blue float-right" id="submit_btn_for_dangerous_process" onclick="SingleReturn.listview.addDangerousProcess({});" style="margin-right: 5px;margin-top: 5px;" disabled><i class="fas fa-plus-circle" style="margin-right: 5px;"></i>Add Dangerous Process
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12">
                            <div style="background-color: #d2d6de; padding: 5px;">
                                <span class="f-w-b" style="font-size: 15px; color: #000;">2.7 In respect of factories carrying on processes on "hazardous process” as defined in Section 2(cb) furnish the following information.(See explanatory note 'C')  </span>
                                <hr>
                                <table class="table table-bordered m-b-0px" id="hazardousList" style="margin-top: 10px;text-align: center;">
                                    <thead>
                                        <tr style='color: #000;'>
                                            <th></th>
                                            <th width="20%">Name of the dangerous process or operation carried of(See explanatory note 'A') </th>
                                            <th width="20%">Average number of persons employed daily in each of the process or operation given (See explanatory note 'B') </th>
                                            <th colspan="5">Number of persons</th>
                                        </tr>
                                        <tr style='color: #000;'>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th colspan="2">Medically examined </th>
                                            <th colspan="2">declared unfit </th>
                                            <th></th>
                                        </tr>
                                        <tr style='color: #000;'>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th>Male</th>
                                            <th>Female</th>
                                            <th>Male</th>
                                            <th>Female</th>
                                            <th></th>
                                        </tr>
                                        <tr style='color: #000;'>
                                            <th>Sr No.</th>
                                            <th>1</th>
                                            <th>2</th>
                                            <th>3</th>
                                            <th>5</th>
                                            <th>5</th>
                                            <th>6</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody id="hazardous_process_info_container">
                                    </tbody>
                                </table>
                            </div>
                            <div class="box-footer" align="right" >
                                <button type="button" class="btn btn-sm btn-nic-blue float-right" id="submit_btn_for_hazardous_process" onclick="SingleReturn.listview.addHazardousProcess({});" style="margin-right: 5px;margin-top: 5px;" disabled><i class="fas fa-plus-circle" style="margin-right: 5px;"></i>Add Hazardous Process
                                </button>
                            </div>
                        </div>
                    </div>
                    <h2 class="box-title f-w-b page-header color-nic-blue f-s-20px m-b-0">3. Compliance Status for Health Provision</h2>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>3.1 Measures taken for prevention of dust / fumes generated in the Process<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="radio" id="is_dust_generated_yes" name="is_dust_generated" class="" value="{{VALUE_ONE}}" disabled>&nbsp; Yes
                                &emsp;
                                <input type="radio" id="is_dust_generated_no" name="is_dust_generated" class="" style="margin-bottom: 0px;"
                                        value="{{VALUE_TWO}}" disabled>&nbsp;No
                            </div>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>3.2 Provision of wholsome drinking water<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="radio" id="is_provide_drinking_water_yes" name="is_provide_drinking_water" class="" value="{{VALUE_ONE}}" disabled>&nbsp; Yes
                                &emsp;
                                <input type="radio" id="is_provide_drinking_water_no" name="is_provide_drinking_water" class="" style="margin-bottom: 0px;"
                                        value="{{VALUE_TWO}}" disabled>&nbsp;No
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>3.3 Provision of Urinals,Latrines & Bathroom facility seprately for men and women<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="radio" id="is_provide_washroom_yes" name="is_provide_washroom" class="" value="{{VALUE_ONE}}" disabled>&nbsp; Yes
                                &emsp;
                                <input type="radio" id="is_provide_washroom_no" name="is_provide_washroom" class="" style="margin-bottom: 0px;"
                                        value="{{VALUE_TWO}}" disabled>&nbsp;No
                            </div>
                        </div> 
                        <div class="form-group col-sm-3 is_provide_washroom_div" style="display: none;">
                            <label>3.3.1 Number of Urinals,Latrines & Bathroom for Men<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="washroom_for_men" name="washroom_for_men" class="form-control" placeholder="Enter Number of Urinals,Latrines & Bathroom !"
                                       maxlength="100" onkeyup="checkNumeric($(this));" readonly onblur="checkNumeric($(this));checkValidation('single-return', 'washroom_for_men', noOfWashroomValidationMessage);" value="{{washroom_for_men}}">
                            </div>
                            <span class="error-message error-message-single-return-washroom_for_men"></span>
                        </div>
                        <div class="form-group col-sm-3 is_provide_washroom_div" style="display: none;">
                            <label>3.3.2 Number of Urinals,Latrines & Bathroom for Women<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="washroom_for_women" name="washroom_for_women" class="form-control" placeholder="Enter Number of Urinals,Latrines & Bathroom !"
                                       maxlength="100" onkeyup="checkNumeric($(this));" readonly onblur="checkNumeric($(this));checkValidation('single-return', 'washroom_for_women', noOfWashroomValidationMessage);" value="{{washroom_for_women}}">
                            </div>
                            <span class="error-message error-message-single-return-washroom_for_women"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>3.4 Maintenance of health records<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="radio" id="is_health_record_maintain_yes" name="is_health_record_maintain" class="" value="{{VALUE_ONE}}" disabled>&nbsp; Yes
                                &emsp;
                                <input type="radio" id="is_health_record_maintain_no" name="is_health_record_maintain" class="" style="margin-bottom: 0px;"
                                        value="{{VALUE_TWO}}" disabled>&nbsp;No
                            </div>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>3.5 Provision of Occupational Health Center<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="radio" id="is_provide_health_center_yes" name="is_provide_health_center" class="" value="{{VALUE_ONE}}" disabled>&nbsp; Yes
                                &emsp;
                                <input type="radio" id="is_provide_health_center_no" name="is_provide_health_center" class="" style="margin-bottom: 0px;"
                                        value="{{VALUE_TWO}}" disabled>&nbsp;No
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>3.6 Provision of Factory Medical Officer<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="radio" id="is_provide_medical_officer_yes" name="is_provide_medical_officer" class="" value="{{VALUE_ONE}}" disabled>&nbsp; Yes
                                &emsp;
                                <input type="radio" id="is_provide_medical_officer_no" name="is_provide_medical_officer" class="" style="margin-bottom: 0px;"
                                        value="{{VALUE_TWO}}" disabled>&nbsp;No
                            </div>
                        </div> 
                        <div class="form-group col-sm-6 is_provide_medical_officer_div" style="display: none">
                            <label>3.6.1 Select Retainer Ship</label>
                            <div class="input-group">
                                <select class="form-control"  
                                    data-placeholder="Select Retainer Ship !" name="retainer_ship" id="retainer_ship" readonly onblur="checkValidation('dealer', 'retainer_ship', retainerShipValidationValidationMessage);">
                                    <option value="">Select Retainer Ship</option>
                                    <option value="1">Part Time</option>
                                    <option value="2">Full Time</option>
                                </select>
                            </div>
                            <span class="error-message error-message-single-return-retainer_ship"></span>
                        </div> 
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label>3.7 Number of industrial Hygienists employed to monitor work, environment as required under section 7-A, 112 <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="no_of_hyginists_employed" name="no_of_hyginists_employed" class="form-control" placeholder="Enter Total workers !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'no_of_hyginists_employed', hyginistsEmployedValidationMessage);" value="{{no_of_hyginists_employed}}">
                            </div>
                            <span class="error-message error-message-single-return-no_of_hyginists_employed"></span>
                        </div>
                    </div>
                    <h2 class="box-title f-w-b page-header color-nic-blue f-s-20px m-b-0">4. Compliance Status for Safety Provisions</h2>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label>4.1 Compliance of safety provisions prescribed under Schedules, including guarding of machinery. (Sec.21, 22)<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="safety_provision" name="safety_provision" class="form-control" placeholder="Enter Compliance of safety provisions prescribed under Schedules !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'safety_provision', safetyProvisionValidationMessage);" value="{{safety_provision}}">
                            </div>
                            <span class="error-message error-message-single-return-safety_provision"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>4.2 Whether safe means of access provided to plants &machinery (Sec.32, 33) <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="radio" id="is_provide_safe_access_yes" name="is_provide_safe_access" class="" value="{{VALUE_ONE}}" disabled>&nbsp; Yes
                                &emsp;
                                <input type="radio" id="is_provide_safe_access_no" name="is_provide_safe_access" class="" style="margin-bottom: 0px;"
                                        value="{{VALUE_TWO}}" disabled>&nbsp;No
                            </div>
                        </div> 
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>4.3 Whether emergency fire exits provided <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="radio" id="is_provide_fire_exits_yes" name="is_provide_fire_exits" class="" value="{{VALUE_ONE}}" disabled>&nbsp; Yes
                                &emsp;
                                <input type="radio" id="is_provide_fire_exits_no" name="is_provide_fire_exits" class="" style="margin-bottom: 0px;"
                                        value="{{VALUE_TWO}}" disabled>&nbsp;No
                            </div>
                        </div> 
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>4.4 Details of fire fighting equipments including water storage capacity & trained personal<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="fighting_equipments_details" name="fighting_equipments_details" class="form-control" placeholder="Enter Details of fire fighting equipments including water storage capacity & trained personal!"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'fighting_equipments_details', fightingEuipmentsValidationMessage);">{{fighting_equipments_details}}</textarea>
                            </div>
                            <span class="error-message error-message-single-return-fighting_equipments_details"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>4.5 Whether hoists, lifts, cranes, lifting tackles & lifting devices are certified duly by Competent Person in prescribed forms? (Sec.28, Sec.29)<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="radio" id="is_devices_certified_yes" name="is_devices_certified" class="" value="{{VALUE_ONE}}" disabled>&nbsp; Yes
                                &emsp;
                                <input type="radio" id="is_devices_certified_no" name="is_devices_certified" class="" style="margin-bottom: 0px;"
                                        value="{{VALUE_TWO}}" disabled>&nbsp;No
                            </div>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>4.6 Whether pressure vessels in use are tested by Competent Person & duly certified in prescribed form. (Sec.31) <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="radio" id="is_pressure_vessels_certified_yes" name="is_pressure_vessels_certified" class="" value="{{VALUE_ONE}}" disabled>&nbsp; Yes
                                &emsp;
                                <input type="radio" id="is_pressure_vessels_certified_no" name="is_pressure_vessels_certified" class="" style="margin-bottom: 0px;"
                                        value="{{VALUE_TWO}}" disabled>&nbsp;No
                            </div>
                        </div> 
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>4.7 Details of personal protective equipments provided and special safety equipments if any(Sec.41)<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="personal_equipments_details" name="personal_equipments_details" class="form-control" placeholder="Enter Details of personal protective equipments provided and special safety equipments!"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'personal_equipments_details', personalequipmentsValidationMessage);">{{personal_equipments_details}}</textarea>
                            </div>
                            <span class="error-message error-message-single-return-personal_equipments_details"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>4.8 Details of Safety Officers & Safety Supervisors (Sec.40) <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="safety_officers_detail" name="safety_officers_detail" class="form-control" placeholder="Enter Details of Safety Officers & Safety Supervisors!"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'safety_officers_detail', safetyOfficerValidationMessage);">{{safety_officers_detail}}</textarea>
                            </div>
                            <span class="error-message error-message-single-return-safety_officers_detail"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>4.9 Safety Committee functioning ? (if applicable) <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="radio" id="is_functioning_safety_committee_yes" name="is_functioning_safety_committee" class="" value="{{VALUE_ONE}}" disabled>&nbsp; Yes
                                &emsp;
                                <input type="radio" id="is_functioning_safety_committee_no" name="is_functioning_safety_committee" class="" style="margin-bottom: 0px;"
                                        value="{{VALUE_TWO}}" disabled>&nbsp;No
                            </div>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>4.10 Whether provisions of Chapter-IVA there under complied with (if covered under Schedule-I framed under Sec.2cb) (Sec. 41B to41H)  <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="radio" id="is_provision_of_chapteriva_yes" name="is_provision_of_chapteriva" class="" value="{{VALUE_ONE}}" disabled>&nbsp; Yes
                                &emsp;
                                <input type="radio" id="is_provision_of_chapteriva_no" name="is_provision_of_chapteriva" class="" style="margin-bottom: 0px;"
                                        value="{{VALUE_TWO}}" disabled>&nbsp;No
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>4.11 Number of Safety programs for training & safety awareness arranged during last year <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="no_of_safety_programs" name="no_of_safety_programs" class="form-control" placeholder="Enter Number of Safety programs for training & safety awareness arranged during last year !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'no_of_safety_programs', safetyProgramsValidationMessage);" value="{{no_of_safety_programs}}">
                            </div>
                            <span class="error-message error-message-single-return-no_of_safety_programs"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>4.12 number of workers trained through it <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="no_of_worker_trained" name="no_of_worker_trained" class="form-control" placeholder="Enter number of workers trained through it !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'no_of_worker_trained', workerTrainedValidationMessage);" value="{{no_of_worker_trained}}">
                            </div>
                            <span class="error-message error-message-single-return-no_of_worker_trained"></span>
                        </div>
                    </div>
                    <span class="box-title f-w-b page-header m-b-0">4.13 For Major Accident Hazard Factories</span>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>4.13.1 Onsite emergency plan prepared / amended date <span style="color: red;">*</span></label>
                            <div class="input-group date">
                                <input type="text" name="amended_date" id="amended_date" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                                       value="{{amended_date}}" readonly onblur="checkValidation('bocw', 'amended_date', amendedDateValidationMessage);">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-single-return-amended_date"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>4.13.2 Rehearsals done for Onsite Emergency Plan during last year.(Give dates)  <span style="color: red;">*</span></label>
                            <div class="input-group date">
                                <input type="text" name="rehearsals_date" id="rehearsals_date" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                                       value="{{rehearsals_date}}" readonly onblur="checkValidation('bocw', 'rehearsals_date', rehearsalsDateValidationMessage);">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-single-return-rehearsals_date"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>4.13.3 Details of Safety Policy, Safety Audit & Safety Report. (if applicable)<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="safety_policy_detail" name="safety_policy_detail" class="form-control" placeholder="Enter Details of fire fighting equipments including water storage capacity & trained personal!"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'safety_policy_detail', safetyPolicyValidationMessage);">{{safety_policy_detail}}</textarea>
                            </div>
                            <span class="error-message error-message-single-return-safety_policy_detail"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>4.13.4 Whether information regarding hazards and actions taken provided to public, workers and authorities  <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="radio" id="is_action_taken_yes" name="is_action_taken" class="" value="{{VALUE_ONE}}" disabled>&nbsp; Yes
                                &emsp;
                                <input type="radio" id="is_action_taken_no" name="is_action_taken" class="" style="margin-bottom: 0px;"
                                        value="{{VALUE_TWO}}" disabled>&nbsp;No
                            </div>
                        </div>
                    </div>
                    <h2 class="box-title f-w-b page-header color-nic-blue f-s-20px m-b-0">5. Compliance status for Welfare provisions</h2>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>5.1 Whether first aid facilities are provided as per rules. (Sec. 45)  <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="radio" id="is_firstaid_provide_yes" name="is_firstaid_provide" class="" value="{{VALUE_ONE}}" disabled>&nbsp; Yes
                                &emsp;
                                <input type="radio" id="is_firstaid_provide_no" name="is_firstaid_provide" class="" style="margin-bottom: 0px;"
                                        value="{{VALUE_TWO}}" disabled>&nbsp;No
                            </div>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>5.2 Provision of Ambulance Room, required staff, Ambulance Van (if applicable) (Sec.45)   <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="radio" id="is_ambulance_room_provide_yes" name="is_ambulance_room_provide" class="" value="{{VALUE_ONE}}" disabled>&nbsp; Yes
                                &emsp;
                                <input type="radio" id="is_ambulance_room_provide_no" name="is_ambulance_room_provide" class="" style="margin-bottom: 0px;"
                                        value="{{VALUE_TWO}}" disabled>&nbsp;No
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>5.3 Whether canteen facility provided as per standards prescribed if niore chan 250 workers are employed. (Sec. 46)  <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="radio" id="is_provide_canteen_yes" name="is_provide_canteen" class="" value="{{VALUE_ONE}}" disabled>&nbsp; Yes
                                &emsp;
                                <input type="radio" id="is_provide_canteen_no" name="is_provide_canteen" class="" style="margin-bottom: 0px;"
                                        value="{{VALUE_TWO}}" disabled>&nbsp;No
                            </div>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>5.4 Is canteen managed / run departmentally? through a contractor ? </label>
                            <div class="input-group">
                                <select class="form-control" style="margin-top: 22px;" 
                                    data-placeholder="Select canteen managed !" name="canteen_managed_by" id="canteen_managed_by" readonly onblur="checkValidation('dealer', 'canteen_managed_by', cateenManagedByValidationMessage);">
                                    <option value="">Select canteen managed by</option>
                                    <option value="1">Departmentally</option>
                                    <option value="2">Through Contractor </option>
                                </select>
                            </div>
                            <span class="error-message error-message-single-return-canteen_managed_by"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label>5.5 Whether Rest Rooms and Lunch Rooms are provided ? If more than 150 workers are employed. (Sec. 47)   <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="radio" id="is_provide_rest_room_yes" name="is_provide_rest_room" class="" value="{{VALUE_ONE}}" disabled>&nbsp; Yes
                                &emsp;
                                <input type="radio" id="is_provide_rest_room_no" name="is_provide_rest_room" class="" style="margin-bottom: 0px;"
                                        value="{{VALUE_TWO}}" disabled>&nbsp;No
                            </div>
                        </div>
                        <div class="form-group col-sm-4">
                            <label>5.6 Whether creche facilities are provided forthe use of children of women employees ? (if more than 30 women are employed) (Sec.48) <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="radio" id="is_provide_creche_yes" name="is_provide_creche" class="" value="{{VALUE_ONE}}" disabled>&nbsp; Yes
                                &emsp;
                                <input type="radio" id="is_provide_creche_no" name="is_provide_creche" class="" style="margin-bottom: 0px;"
                                        value="{{VALUE_TWO}}" disabled>&nbsp;No
                            </div>
                        </div>
                        <div class="form-group col-sm-4">
                            <label>5.7 Whether Welfare Officer is appointed as per the provisions laid down (Sec.49) <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="radio" id="is_welfare_officer_apponyed_yes" name="is_welfare_officer_apponyed" class="" value="{{VALUE_ONE}}" disabled>&nbsp; Yes
                                &emsp;
                                <input type="radio" id="is_welfare_officer_apponyed_no" name="is_welfare_officer_apponyed" class="" style="margin-bottom: 0px;"
                                        value="{{VALUE_TWO}}" disabled>&nbsp;No
                            </div>
                        </div>
                    </div>
                    <h2 class="box-title f-w-b page-header color-nic-blue f-s-20px m-b-0">6. Compliance status of Working Hours provisions</h2>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>6.1 Compliance of provisions relating to working hours for adults i.e. 9 hours a day and 48 hours per week, (Sec. 51) <span style="color: red;">*</span></label>
                            <div class="input-group">
                                <input type="text" id="working_hours_for_adults" name="working_hours_for_adults" class="form-control" placeholder="Enter Total workers !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'working_hours_for_adults', workingHoursValidationMessage);" value="{{working_hours_for_adults}}">
                            </div>
                            <span class="error-message error-message-single-return-working_hours_for_adults"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>6.2 Whether notice of period of work displayed on notice board ? (Sec. 61) <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="radio" id="is_disply_period_of_work_yes" name="is_disply_period_of_work" class="" value="{{VALUE_ONE}}" disabled>&nbsp; Yes
                                &emsp;
                                <input type="radio" id="is_disply_period_of_work_no" name="is_disply_period_of_work" class="" style="margin-bottom: 0px;"
                                        value="{{VALUE_TWO}}" disabled>&nbsp;No
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>6.3 Normal working time for women workers In case of relaxation granted for working hours of women workers, whether return & transport and security facilities provided. <span style="color: red;">*</span></label>
                            <div class="input-group">
                                <input type="text" id="working_hours_for_women" name="working_hours_for_women" class="form-control" placeholder="Enter Total workers !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'working_hours_for_women', workingHoursValidationMessage);" value="{{working_hours_for_women}}">
                            </div>
                            <span class="error-message error-message-single-return-working_hours_for_women"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>6.4 Whether certificates of fitness are obtained foremployment of young persons (above 14 yrs) in the prescribed Form No.5 (Sec.69) <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="radio" id="is_obtain_fitness_certificate_yes" name="is_obtain_fitness_certificate" class="" value="{{VALUE_ONE}}" disabled>&nbsp; Yes
                                &emsp;
                                <input type="radio" id="is_obtain_fitness_certificate_no" name="is_obtain_fitness_certificate" class="" style="margin-bottom: 0px;"
                                        value="{{VALUE_TWO}}" disabled>&nbsp;No
                            </div>
                        </div>
                    </div>
                    <h2 class="box-title f-w-b page-header color-nic-blue f-s-20px m-b-0">7. Compliance status for Annual leave with wages</h2>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label>7.1 Whether leave with wages are allowed to the eligible employees (Sec.79)  <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="radio" id="is_leave_with_wages_yes" name="is_leave_with_wages" class="" value="{{VALUE_ONE}}" disabled>&nbsp; Yes
                                &emsp;
                                <input type="radio" id="is_leave_with_wages_no" name="is_leave_with_wages" class="" style="margin-bottom: 0px;"
                                        value="{{VALUE_TWO}}" disabled>&nbsp;No
                            </div>
                        </div>
                        <div class="form-group col-sm-4">
                            <label>7.2 Total number of workers discharged / dismissed from the service /quit employment / super annuated /died while in service during the previous year <span style="color: red;">*</span></label>
                            <div class="input-group">
                                <input type="text" id="no_of_worker_dismissed" name="no_of_worker_dismissed" class="form-control" placeholder="Enter Total workers !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'no_of_worker_dismissed', workerDismissedValidationMessage);" value="{{no_of_worker_dismissed}}">
                            </div>
                            <span class="error-message error-message-single-return-no_of_worker_dismissed"></span>
                        </div>
                        <div class="form-group col-sm-4">
                            <label>7.3 Number of workers in respect of whom wages : in lieu of leave were paid <span style="color: red;">*</span></label>
                            <div class="input-group">
                                <input type="text" id="no_of_paid_leave_worker" name="no_of_paid_leave_worker" class="form-control" placeholder="Enter Total workers !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'no_of_paid_leave_worker', paidLeaveWorkerValidationMessage);" value="{{no_of_paid_leave_worker}}">
                            </div>
                            <span class="error-message error-message-single-return-no_of_paid_leave_worker"></span>
                        </div>
                    </div>
                    <span class="box-title f-w-b page-header m-b-0">7.4 Leave with wages </span>
                    <span class="box-title f-w-b page-header m-b-0">Total number of workers employed during the year</span>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label>7.4.1 Adults <br/>7.4.1.1 Men<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="adult_men_workers_employed_year" name="adult_men_workers_employed_year" class="form-control" placeholder="Enter Men workers !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'adult_men_workers_employed_year', adultMenValidationMessage);" value="{{adult_men_workers_employed_year}}">
                            </div>
                            <span class="error-message error-message-single-return-adult_men_workers_employed_year"></span>
                        </div>
                        <div class="form-group col-sm-4">
                            <label style="margin-top: 20px;">7.4.1.2 Women <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="adult_women_workers_employed_year" name="adult_women_workers_employed_year" class="form-control" placeholder="Enter Women workers !" 
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'adult_women_workers_employed_year', adultWomenValidationMessage);" value="{{adult_women_workers_employed_year}}">
                            </div>
                            <span class="error-message error-message-single-return-adult_women_workers_employed_year"></span>
                        </div>
                        <div class="form-group col-sm-4">
                            <label style="margin-top: 20px;">7.4.1.3 Total <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="adult_total_workers_employed_year" name="adult_total_workers_employed_year" class="form-control" placeholder="Enter Total workers !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'adult_total_workers_employed_year', adultTotalValidationMessage);" value="{{adult_total_workers_employed_year}}">
                            </div>
                            <span class="error-message error-message-single-return-adult_total_workers_employed_year"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label>7.4.2 Adolescents <br/>7.4.2.1 Men<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="adolescent_men_workers_employed_year" name="adolescent_men_workers_employed_year" class="form-control" placeholder="Enter Men workers !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'adolescent_men_workers_employed_year', adolescentMenValidationMessage);" value="{{adolescent_men_workers_employed_year}}">
                            </div>
                            <span class="error-message error-message-single-return-adolescent_men_workers_employed_year"></span>
                        </div>
                        <div class="form-group col-sm-4">
                            <label style="margin-top: 20px;">7.4.2.2 Women <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="adolescent_women_workers_employed_year" name="adolescent_women_workers_employed_year" class="form-control" placeholder="Enter Women workers !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'adolescent_women_workers_employed_year', adolescentWomenValidationMessage);" value="{{adolescent_women_workers_employed_year}}">
                            </div>
                            <span class="error-message error-message-single-return-adolescent_women_workers_employed_year"></span>
                        </div>
                        <div class="form-group col-sm-4">
                            <label style="margin-top: 20px;">7.4.2.3 Total <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="adolescent_total_workers_employed_year" name="adolescent_total_workers_employed_year" class="form-control" placeholder="Enter Total workers !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'adolescent_total_workers_employed_year', adolescentOtherValidationMessage);" value="{{adolescent_total_workers_employed_year}}">
                            </div>
                            <span class="error-message error-message-single-return-adolescent_total_workers_employed_year"></span>
                        </div>
                    </div>
                    <span class="box-title f-w-b page-header m-b-0">7.5 Number of workers who were entitled to annual leave with wages during the year. </span>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label>7.5.1 Adults <br/>7.5.1.1 Men<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="adult_men_leave_with_wages" name="adult_men_leave_with_wages" class="form-control" placeholder="Enter Men workers !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'adult_men_leave_with_wages', adultMenValidationMessage);" value="{{adult_men_leave_with_wages}}">
                            </div>
                            <span class="error-message error-message-single-return-adult_men_leave_with_wages"></span>
                        </div>
                        <div class="form-group col-sm-4">
                            <label style="margin-top: 20px;">7.5.1.2 Women <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="adult_women_leave_with_wages" name="adult_women_leave_with_wages" class="form-control" placeholder="Enter Women workers !" 
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'adult_women_leave_with_wages', adultWomenValidationMessage);" value="{{adult_women_leave_with_wages}}">
                            </div>
                            <span class="error-message error-message-single-return-adult_women_leave_with_wages"></span>
                        </div>
                        <div class="form-group col-sm-4">
                            <label style="margin-top: 20px;">7.5.1.3 Total <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="adult_total_leave_with_wages" name="adult_total_leave_with_wages" class="form-control" placeholder="Enter Total workers !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'adult_total_leave_with_wages', adultTotalValidationMessage);" value="{{adult_total_leave_with_wages}}">
                            </div>
                            <span class="error-message error-message-single-return-adult_total_leave_with_wages"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label>7.5.2 Adolescents <br/>7.5.2.1 Men<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="adolescent_men_leave_with_wages" name="adolescent_men_leave_with_wages" class="form-control" placeholder="Enter Men workers !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'adolescent_men_leave_with_wages', adolescentMenValidationMessage);" value="{{adolescent_men_leave_with_wages}}">
                            </div>
                            <span class="error-message error-message-single-return-adolescent_men_leave_with_wages"></span>
                        </div>
                        <div class="form-group col-sm-4">
                            <label style="margin-top: 20px;">7.5.2.2 Women <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="adolescent_women_leave_with_wages" name="adolescent_women_leave_with_wages" class="form-control" placeholder="Enter Women workers !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'adolescent_women_leave_with_wages', adolescentWomenValidationMessage);" value="{{adolescent_women_leave_with_wages}}">
                            </div>
                            <span class="error-message error-message-single-return-adolescent_women_leave_with_wages"></span>
                        </div>
                        <div class="form-group col-sm-4">
                            <label style="margin-top: 20px;">7.5.2.3 Total <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="adolescent_total_leave_with_wages" name="adolescent_total_leave_with_wages" class="form-control" placeholder="Enter Total workers !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'adolescent_total_leave_with_wages', adolescentOtherValidationMessage);" value="{{adolescent_total_leave_with_wages}}">
                            </div>
                            <span class="error-message error-message-single-return-adolescent_total_leave_with_wages"></span>
                        </div>
                    </div>
                    <span class="box-title f-w-b page-header m-b-0">7.6 Number of workers who were granted to annual leave with wages during the year </span>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label>7.6.1 Adults <br/>7.6.1.1 Men<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="adult_men_annual_leave_with_wages" name="adult_men_annual_leave_with_wages" class="form-control" placeholder="Enter Men workers !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'adult_men_annual_leave_with_wages', adultMenValidationMessage);" value="{{adult_men_annual_leave_with_wages}}">
                            </div>
                            <span class="error-message error-message-single-return-adult_men_annual_leave_with_wages"></span>
                        </div>
                        <div class="form-group col-sm-4">
                            <label style="margin-top: 20px;">7.6.1.2 Women <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="adult_women_annual_leave_with_wages" name="adult_women_annual_leave_with_wages" class="form-control" placeholder="Enter Women workers !" 
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'adult_women_annual_leave_with_wages', adultWomenValidationMessage);" value="{{adult_women_annual_leave_with_wages}}">
                            </div>
                            <span class="error-message error-message-single-return-adult_women_annual_leave_with_wages"></span>
                        </div>
                        <div class="form-group col-sm-4">
                            <label style="margin-top: 20px;">7.6.1.3 Total <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="adult_total_annual_leave_with_wages" name="adult_total_annual_leave_with_wages" class="form-control" placeholder="Enter Total workers !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'adult_total_annual_leave_with_wages', adultTotalValidationMessage);" value="{{adult_total_annual_leave_with_wages}}">
                            </div>
                            <span class="error-message error-message-single-return-adult_total_annual_leave_with_wages"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label>7.6.2 Adolescents <br/>7.6.2.1 Men<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="adolescent_men_annual_leave_with_wages" name="adolescent_men_annual_leave_with_wages" class="form-control" placeholder="Enter Men workers !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'adolescent_men_annual_leave_with_wages', adolescentMenValidationMessage);" value="{{adolescent_men_annual_leave_with_wages}}">
                            </div>
                            <span class="error-message error-message-single-return-adolescent_men_annual_leave_with_wages"></span>
                        </div>
                        <div class="form-group col-sm-4">
                            <label style="margin-top: 20px;">7.6.2.2 Women <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="adolescent_women_annual_leave_with_wages" name="adolescent_women_annual_leave_with_wages" class="form-control" placeholder="Enter Women workers !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'adolescent_women_annual_leave_with_wages', adolescentWomenValidationMessage);" value="{{adolescent_women_annual_leave_with_wages}}">
                            </div>
                            <span class="error-message error-message-single-return-adolescent_women_annual_leave_with_wages"></span>
                        </div>
                        <div class="form-group col-sm-4">
                            <label style="margin-top: 20px;">7.6.2.3 Total <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="adolescent_total_annual_leave_with_wages" name="adolescent_total_annual_leave_with_wages" class="form-control" placeholder="Enter Total workers !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'adolescent_total_annual_leave_with_wages', adolescentOtherValidationMessage);" value="{{adolescent_total_annual_leave_with_wages}}">
                            </div>
                            <span class="error-message error-message-single-return-adolescent_total_annual_leave_with_wages"></span>
                        </div>
                    </div>
                    <h2 class="box-title f-w-b page-header color-nic-blue f-s-20px m-b-0">8. Reporting of accidents to Factory Inspectorate - </h2>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>8.1 Whether arrangements are made to report the accidents involving more than 48 hours absence including serious and fatal to Factory Inspectorate? (Sec. 88) <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="radio" id="is_report_accident_yes" name="is_report_accident" class="" value="{{VALUE_ONE}}" disabled>&nbsp; Yes
                                &emsp;
                                <input type="radio" id="is_report_accident_no" name="is_report_accident" class="" style="margin-bottom: 0px;"
                                        value="{{VALUE_TWO}}" disabled>&nbsp;No
                            </div>
                        </div>
                    </div>
                    <span class="box-title f-w-b page-header m-b-0">8.2 Number of Accidents and Dangerous Occurrences during Previous year </span>
                    <div class="row">
                        <div class="form-group col-sm-12">
                            <table class="table table-bordered m-b-0px" id="productList" style="margin-top: 10px;">
                                <thead>
                                    <tr style='color: #000;text-align: center;'>
                                        <th></th>
                                        <th colspan="8">Accidents involving </th>
                                    </tr>
                                    <tr style='color: #000;text-align: center;'>
                                        <th></th>
                                        <th colspan="3">Only non-fatal injuries </th>
                                        <th colspan="5">Fatal injuries as well as non-fatal injuries </th>
                                    </tr>
                                    <tr style='color: #000;text-align: center;'>
                                        <th></th>
                                        <th colspan="3">Number of  </th>
                                        <th colspan="5">Number of  </th>
                                    </tr>
                                    <tr style='color: #000;text-align: center;'>
                                        <th></th>
                                        <th>Accidents/Occurrences </th>
                                        <th>Persons injured inside</th>
                                        <th>Persons injured outside</th>
                                        <th>Accidents/Occurrences  </th>
                                        <th>Persons injured inside  </th>
                                        <th>Persons injured outside </th>
                                        <th>Persons killed inside   </th>
                                        <th>Persons killed outside   </th>
                                    </tr>
                                    <tr style='color: #000;text-align: center;'>
                                        <th></th>
                                        <th></th>
                                        <th colspan="2">The Factory</th>
                                        <th></th>
                                        <th colspan="2">The Factory</th>
                                        <th colspan="2">The Factory</th>
                                    </tr>
                                    <tr style='color: #000;text-align: center;'>
                                        <th>1</th>
                                        <th>2 </th>
                                        <th>3</th>
                                        <th>4</th>
                                        <th>5</th>
                                        <th>6</th>
                                        <th>7</th>
                                        <th>8</th>
                                        <th>9</th>
                                    </tr>
                                    <tr style='color: #000;'>
                                        <th>1. Accidents including dangerous occurrences and major accidents involving injuries /deaths</th>
                                        <th><input type="text" id="nonfatal_dangerous_major_accidents" name="nonfatal_dangerous_major_accidents" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'nonfatal_dangerous_major_accidents', accidentsOccurrencesValidationMessage);" value="{{nonfatal_dangerous_major_accidents}}"></th>
                                        <th><input type="text" id="nonfatal_dangerous_major_accidents_inside" name="nonfatal_dangerous_major_accidents_inside" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'nonfatal_dangerous_major_accidents_inside', accidentsOccurrencesValidationMessage);" value="{{nonfatal_dangerous_major_accidents_inside}}"></th>
                                        <th><input type="text" id="nonfatal_dangerous_major_accidents_outside" name="nonfatal_dangerous_major_accidents_outside" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'nonfatal_dangerous_major_accidents_outside', accidentsOccurrencesValidationMessage);" value="{{nonfatal_dangerous_major_accidents_outside}}"></th>
                                        <th><input type="text" id="fatal_dangerous_major_accidents" name="fatal_dangerous_major_accidents" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'fatal_dangerous_major_accidents', accidentsOccurrencesValidationMessage);" value="{{fatal_dangerous_major_accidents}}"></th>
                                        <th><input type="text" id="fatal_dangerous_major_accidents_inside" name="fatal_dangerous_major_accidents_inside" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'fatal_dangerous_major_accidents_inside', accidentsOccurrencesValidationMessage);" value="{{fatal_dangerous_major_accidents_inside}}"></th>
                                        <th><input type="text" id="fatal_dangerous_major_accidents_outside" name="fatal_dangerous_major_accidents_outside" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'fatal_dangerous_major_accidents_outside', accidentsOccurrencesValidationMessage);" value="{{fatal_dangerous_major_accidents_outside}}"></th>
                                        <th><input type="text" id="fatal_dangerous_major_accidents_killed_inside" name="fatal_dangerous_major_accidents_killed_inside" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'fatal_dangerous_major_accidents_killed_inside', accidentsOccurrencesValidationMessage);" value="{{fatal_dangerous_major_accidents_killed_inside}}"></th>
                                        <th><input type="text" id="fatal_dangerous_major_accidents_killed_outside" name="fatal_dangerous_major_accidents_killed_outside" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'fatal_dangerous_major_accidents_killed_outside', accidentsOccurrencesValidationMessage);" value="{{fatal_dangerous_major_accidents_killed_outside}}"></th>
                                    </tr>
                                    <tr style='color: #000;'>
                                        <th>2. Dangerous occurrences not involving injuries /deaths. </th>
                                        <th><input type="text" id="nonfatal_nondangerous_accidents" name="nonfatal_nondangerous_accidents" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'nonfatal_nondangerous_accidents', accidentsOccurrencesValidationMessage);" value="{{nonfatal_nondangerous_accidents}}"></th>
                                        <th><input type="text" id="nonfatal_nondangerous_accidents_inside" name="nonfatal_nondangerous_accidents_inside" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'nonfatal_nondangerous_accidents_inside', accidentsOccurrencesValidationMessage);" value="{{nonfatal_nondangerous_accidents_inside}}"></th>
                                        <th><input type="text" id="nonfatal_nondangerous_accidents_outside" name="nonfatal_nondangerous_accidents_outside" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'nonfatal_nondangerous_accidents_outside', accidentsOccurrencesValidationMessage);" value="{{nonfatal_nondangerous_accidents_outside}}"></th>
                                        <th><input type="text" id="fatal_nondangerous_accidents" name="fatal_nondangerous_accidents" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'fatal_nondangerous_accidents', accidentsOccurrencesValidationMessage);" value="{{fatal_nondangerous_accidents}}"></th>
                                        <th><input type="text" id="fatal_nondangerous_accidents_inside" name="fatal_nondangerous_accidents_inside" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'fatal_nondangerous_accidents_inside', accidentsOccurrencesValidationMessage);" value="{{fatal_nondangerous_accidents_inside}}"></th>
                                        <th><input type="text" id="fatal_nondangerous_accidents_outside" name="fatal_nondangerous_accidents_outside" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'fatal_nondangerous_accidents_outside', accidentsOccurrencesValidationMessage);" value="{{fatal_nondangerous_accidents_outside}}"></th>
                                        <th><input type="text" id="fatal_nondangerous_accidents_killed_inside" name="fatal_nondangerous_accidents_killed_inside" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'fatal_nondangerous_accidents_killed_inside', accidentsOccurrencesValidationMessage);" value="{{fatal_nondangerous_accidents_killed_inside}}"></th>
                                        <th><input type="text" id="fatal_nondangerous_accidents_killed_outside" name="fatal_nondangerous_accidents_killed_outside" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'fatal_nondangerous_accidents_killed_outside', accidentsOccurrencesValidationMessage);" value="{{fatal_nondangerous_accidents_killed_outside}}"></th>
                                    </tr>
                                    <tr style='color: #000;'>
                                        <th>3. Dangerous occurrences involving injuries/deaths.</th>
                                        <th><input type="text" id="nonfatal_dangerous_accidents" name="nonfatal_dangerous_accidents" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'nonfatal_dangerous_accidents', accidentsOccurrencesValidationMessage);" value="{{nonfatal_dangerous_accidents}}"></th>
                                        <th><input type="text" id="nonfatal_dangerous_accidents_inside" name="nonfatal_dangerous_accidents_inside" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'nonfatal_dangerous_accidents_inside', accidentsOccurrencesValidationMessage);" value="{{nonfatal_dangerous_accidents_inside}}"></th>
                                        <th><input type="text" id="nonfatal_dangerous_accidents_outside" name="nonfatal_dangerous_accidents_outside" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'nonfatal_dangerous_accidents_outside', accidentsOccurrencesValidationMessage);" value="{{nonfatal_dangerous_accidents_outside}}"></th>
                                        <th><input type="text" id="fatal_dangerous_accidents" name="fatal_dangerous_accidents" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'fatal_dangerous_accidents', accidentsOccurrencesValidationMessage);" value="{{fatal_dangerous_accidents}}"></th>
                                        <th><input type="text" id="fatal_dangerous_accidents_inside" name="fatal_dangerous_accidents_inside" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'fatal_dangerous_accidents_inside', accidentsOccurrencesValidationMessage);" value="{{fatal_dangerous_accidents_inside}}"></th>
                                        <th><input type="text" id="fatal_dangerous_accidents_outside" name="fatal_dangerous_accidents_outside" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'fatal_dangerous_accidents_outside', accidentsOccurrencesValidationMessage);" value="{{fatal_dangerous_accidents_outside}}"></th>
                                        <th><input type="text" id="fatal_dangerous_accidents_killed_inside" name="fatal_dangerous_accidents_killed_inside" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'fatal_dangerous_accidents_killed_inside', accidentsOccurrencesValidationMessage);" value="{{fatal_dangerous_accidents_killed_inside}}"></th>
                                        <th><input type="text" id="fatal_dangerous_accidents_killed_outside" name="fatal_dangerous_accidents_killed_outside" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'fatal_dangerous_accidents_killed_outside', accidentsOccurrencesValidationMessage);" value="{{fatal_dangerous_accidents_killed_outside}}"></th>
                                    </tr>
                                    <tr style='color: #000;'>
                                        <th>4. Major accidents involving injuries/deaths.</th>
                                        <th><input type="text" id="nonfatal_major_accidents" name="nonfatal_major_accidents" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'nonfatal_major_accidents', accidentsOccurrencesValidationMessage);" value="{{nonfatal_major_accidents}}"></th>
                                        <th><input type="text" id="nonfatal_major_accidents_inside" name="nonfatal_major_accidents_inside" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'nonfatal_major_accidents_inside', accidentsOccurrencesValidationMessage);" value="{{nonfatal_major_accidents_inside}}"></th>
                                        <th><input type="text" id="nonfatal_major_accidents_outside" name="nonfatal_major_accidents_outside" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'nonfatal_major_accidents_outside', accidentsOccurrencesValidationMessage);" value="{{nonfatal_major_accidents_outside}}"></th>
                                        <th><input type="text" id="fatal_major_accidents" name="fatal_major_accidents" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'fatal_major_accidents', accidentsOccurrencesValidationMessage);" value="{{fatal_major_accidents}}"></th>
                                        <th><input type="text" id="fatal_major_accidents_inside" name="fatal_major_accidents_inside" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'fatal_major_accidents_inside', accidentsOccurrencesValidationMessage);" value="{{fatal_major_accidents_inside}}"></th>
                                        <th><input type="text" id="fatal_major_accidents_outside" name="fatal_major_accidents_outside" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'fatal_major_accidents_outside', accidentsOccurrencesValidationMessage);" value="{{fatal_major_accidents_outside}}"></th>
                                        <th><input type="text" id="fatal_major_accidents_killed_inside" name="fatal_major_accidents_killed_inside" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'fatal_major_accidents_killed_inside', accidentsOccurrencesValidationMessage);" value="{{fatal_major_accidents_killed_inside}}"></th>
                                        <th><input type="text" id="fatal_major_accidents_killed_outside" name="fatal_major_accidents_killed_outside" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'fatal_major_accidents_killed_outside', accidentsOccurrencesValidationMessage);" value="{{fatal_major_accidents_killed_outside}}"></th>
                                    </tr>
                                    <tr style='color: #000;'>
                                        <th>5. Major accidents not involving injuries/deaths.</th>
                                        <th><input type="text" id="nonfatal_nonmajor_accidents" name="nonfatal_nonmajor_accidents" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'nonfatal_nonmajor_accidents', accidentsOccurrencesValidationMessage);" value="{{nonfatal_nonmajor_accidents}}"></th>
                                        <th><input type="text" id="nonfatal_nonmajor_accidents_inside" name="nonfatal_nonmajor_accidents_inside" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'nonfatal_nonmajor_accidents_inside', accidentsOccurrencesValidationMessage);" value="{{nonfatal_nonmajor_accidents_inside}}"></th>
                                        <th><input type="text" id="nonfatal_nonmajor_accidents_outside" name="nonfatal_nonmajor_accidents_outside" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'nonfatal_nonmajor_accidents_outside', accidentsOccurrencesValidationMessage);" value="{{nonfatal_nonmajor_accidents_outside}}"></th>
                                        <th><input type="text" id="fatal_nonmajor_accidents" name="fatal_nonmajor_accidents" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'fatal_nonmajor_accidents', accidentsOccurrencesValidationMessage);" value="{{fatal_nonmajor_accidents}}"></th>
                                        <th><input type="text" id="fatal_nonmajor_accidents_inside" name="fatal_nonmajor_accidents_inside" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'fatal_nonmajor_accidents_inside', accidentsOccurrencesValidationMessage);" value="{{fatal_nonmajor_accidents_inside}}"></th>
                                        <th><input type="text" id="fatal_nonmajor_accidents_outside" name="fatal_nonmajor_accidents_outside" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'fatal_nonmajor_accidents_outside', accidentsOccurrencesValidationMessage);" value="{{fatal_nonmajor_accidents_outside}}"></th>
                                        <th><input type="text" id="fatal_nonmajor_accidents_killed_inside" name="fatal_nonmajor_accidents_killed_inside" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'fatal_nonmajor_accidents_killed_inside', accidentsOccurrencesValidationMessage);" value="{{fatal_nonmajor_accidents_killed_inside}}"></th>
                                        <th><input type="text" id="fatal_nonmajor_accidents_killed_outside" name="fatal_nonmajor_accidents_killed_outside" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'fatal_nonmajor_accidents_killed_outside', accidentsOccurrencesValidationMessage);" value="{{fatal_nonmajor_accidents_killed_outside}}"></th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                    <span class="box-title f-w-b page-header m-b-0">8.3 Injuries occurring inside the factory during the previous year </span>
                    <div class="row">
                        <div class="form-group col-sm-12">
                            <table class="table table-bordered m-b-0px" id="productList" style="margin-top: 10px;">
                                <thead>
                                    <tr style='color: #000;text-align: center;'>
                                        <th colspan="9">Number of injuries occurring in </th>
                                    </tr>
                                    <tr style='color: #000;text-align: center;'>
                                        <th colspan="3">Hazardous Process under Section 2(b)</th>
                                        <th colspan="3">Dangerous operations under Section 87  </th>
                                        <th colspan="3">Others  </th>
                                    </tr>
                                    <tr style='color: #000;text-align: center;'>
                                        <th colspan="3">Number of </th>
                                        <th colspan="3">Number of </th>
                                        <th colspan="3">Number of </th>
                                    </tr>
                                    <tr style='color: #000;text-align: center;'>
                                        <th> Accidents </th>
                                        <th colspan="2">Persons injured  </th>
                                        <th> Accidents </th>
                                        <th>Persons injured  </th>
                                        <th></th>
                                        <th> Accidents </th>
                                        <th colspan="2">Persons injured  </th>
                                    </tr>
                                    <tr style='color: #000;text-align: center;'>
                                        <th></th>
                                        <th>Fatal  </th>
                                        <th>Nonfatal </th>
                                        <th></th>
                                        <th>Fatal  </th>
                                        <th>Nonfatal </th>
                                        <th></th>
                                        <th>Fatal  </th>
                                        <th>Nonfatal </th>
                                    </tr>
                                    <tr style='color: #000;text-align: center;'>
                                        <th>1</th>
                                        <th>2 </th>
                                        <th>3</th>
                                        <th>4</th>
                                        <th>5</th>
                                        <th>6</th>
                                        <th>7</th>
                                        <th>8</th>
                                        <th>9</th>
                                    </tr>
                                    <tr style='color: #000;'>
                                        <th><input type="text" id="hazardous_accidents" name="hazardous_accidents" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'hazardous_accidents', injuriesOccurringValidationMessage);" value="{{hazardous_accidents}}"></th>
                                        <th><input type="text" id="hazardous_fatal_injured" name="hazardous_fatal_injured" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'hazardous_fatal_injured', injuriesOccurringValidationMessage);" value="{{hazardous_fatal_injured}}"></th>
                                        <th><input type="text" id="hazardous_nonfatal_injured" name="hazardous_nonfatal_injured" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'hazardous_nonfatal_injured', injuriesOccurringValidationMessage);" value="{{hazardous_nonfatal_injured}}"></th>
                                        <th><input type="text" id="dangerous_accidents" name="dangerous_accidents" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'dangerous_accidents', injuriesOccurringValidationMessage);" value="{{dangerous_accidents}}"></th>
                                        <th><input type="text" id="dangerous_fatal_injured" name="dangerous_fatal_injured" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'dangerous_fatal_injured', injuriesOccurringValidationMessage);" value="{{dangerous_fatal_injured}}"></th>
                                        <th><input type="text" id="dangerous_nonfatal_injured" name="dangerous_nonfatal_injured" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'dangerous_nonfatal_injured', injuriesOccurringValidationMessage);" value="{{dangerous_nonfatal_injured}}"></th>
                                         <th><input type="text" id="other_accidents" name="other_accidents" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'other_accidents', injuriesOccurringValidationMessage);" value="{{other_accidents}}"></th>
                                        <th><input type="text" id="other_fatal_injured" name="other_fatal_injured" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'other_fatal_injured', injuriesOccurringValidationMessage);" value="{{other_fatal_injured}}"></th>
                                        <th><input type="text" id="other_nonfatal_injured" name="other_nonfatal_injured" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'other_nonfatal_injured', injuriesOccurringValidationMessage);" value="{{other_nonfatal_injured}}"></th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                    <span class="box-title f-w-b page-header m-b-0">8.4 Nonfatal injuries (workers injured during the Year in which injured workers returned to work During the same year </span>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>8.4.1 Number of injuries<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="no_of_non_fatal_injuries" name="no_of_non_fatal_injuries" class="form-control" placeholder="Enter Number of injuries !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'no_of_non_fatal_injuries', fatalinjuriesValidationMessage);" value="{{no_of_non_fatal_injuries}}">
                            </div>
                            <span class="error-message error-message-single-return-no_of_non_fatal_injuries"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>8.4.2 Mandays lost due to injuries<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="no_of_non_fatal_lost_injuries" name="no_of_non_fatal_lost_injuries" class="form-control" placeholder="Enter Mandays lost due to injuries !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'no_of_non_fatal_lost_injuries', nonFatalinjuriesValidationMessage);" value="{{no_of_non_fatal_lost_injuries}}">
                            </div>
                            <span class="error-message error-message-single-return-no_of_non_fatal_lost_injuries"></span>
                        </div>
                    </div>
                    <span class="box-title f-w-b page-header m-b-0">8.5 Nonfatal injuries (workers injuries) occurring in : The previous year in which injured workers returned to Work during the year to which this information relates  </span>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>8.5.1 Number of injuries<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="no_of_return_non_fatal_injuries" name="no_of_return_non_fatal_injuries" class="form-control" placeholder="Enter Number of injuries !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'no_of_return_non_fatal_injuries', returnNonFatalinjuriesValidationMessage);" value="{{no_of_return_non_fatal_injuries}}">
                            </div>
                            <span class="error-message error-message-single-return-no_of_return_non_fatal_injuries"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>8.5.2 Mandays lost due to injuries (this Should be the total mandays lost during The previous year as well as in the current year). <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="no_of_return_non_fatal_lost_injuries" name="no_of_return_non_fatal_lost_injuries" class="form-control" placeholder="Enter Mandays lost due to injuries !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'no_of_return_non_fatal_lost_injuries', returnNonFatalLostinjuriesValidationMessage);" value="{{no_of_return_non_fatal_lost_injuries}}">
                            </div>
                            <span class="error-message error-message-single-return-no_of_return_non_fatal_lost_injuries"></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <button type="button" class="btn btn-sm btn-danger" onclick="SingleReturn.listview.loadSingleReturnData();">Cancel</button>
                        <button type="button" id="submit_btn_for_partd_details" class="btn btn-sm btn-success pull-right" onclick="SingleReturn.listview.editOrViewPartE($('#previous_btn_for_parta_details'), '{{singlereturn_id}}', false);" style="margin-right: 5px;">Next <span class="fas fa-hand-point-right"></span></button>
                        <button type="button" id="previous_btn_for_partc_details" class="btn btn-sm btn-success pull-right" onclick="SingleReturn.listview.editOrViewPartC($('#previous_btn_for_parta_details'), '{{singlereturn_id}}', false);" style="margin-right: 5px;"><span class="fas fa-hand-point-left"></span> Previous</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>