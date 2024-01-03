<div class="row">
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title" style="float: none; text-align: center;">SCHEDULE - 1</h3>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">(See Rule 3)</div>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">FORM OF APPLICATION UNDER SUB-SECTION (1) OF SECTION 32 OF </div>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">THE GOA, DAMAN AND DIU LAND REVENUE CODE - 1968. </div>
            </div>
            <form role="form" id="na_form" name="na_form" onsubmit="return false;">

                <input type="hidden" id="na_id" name="na_id" value="{{na_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-12 text-center">
                            <span class="error-message error-message-na f-w-b" style="border-bottom: 2px solid red;"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            To,<br>
                            The Collector,<br>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>District where the land is situated <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <select id="district" name="district" class="form-control select2" readonly=""
                                        data-placeholder="Select District" style="width: 100%;">  
                                </select>
                            </div>
                            <span class="error-message error-message-na-district"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>1.1 Entity / Establishment Type <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                 <select id="entity_establishment_type" name="entity_establishment_type" class="form-control select2"
                                    data-placeholder="Select Entity / Establishment Type" style="width: 100%;"  disabled="">
                            </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12">
                        <div style="background-color: #d2d6de; padding: 5px;">
                            <span class="f-w-b" style="font-size: 15px; color: #000;">1. Details of Applicant </span>
                            <hr>
                            <table class="table table-bordered m-b-0px" id="applicantList" style="margin-top: 10px;">
                                <thead>
                                    <tr style='color: #000;'>
                                        <th style="width: 10px">Sr.No.</th>
                                        <th>Full Name of the Applicant</th>
                                        <th>Full Postel Address of the Applicant</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody id="applicant_info_container">
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="col-xs-12" style="margin-top: 20px;">
                        <div style="background-color: #d2d6de; padding: 5px;">
                            <span class="f-w-b" style="font-size: 15px; color: #000;"> </span>
                            <hr>
                            <table class="table table-bordered m-b-0px" id="" style="margin-top: 10px;">
                                <thead>
                                    <tr style='color: #000;'>
                                        <th style="width: 40px"></th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                    <tr style="background-color: #fff;">
                                        <td style="width: 10px">1.(a)</td>
                                        <td style="width: 650px">Assessed or held for the purpose of agriculture for the non-agricultural
                                            purpose/purposes of</td>
                                        <td>
                                            <div class="input-group">
                                                <input type="text" id="agri_purpose_a" name="agri_purpose_a" class="form-control"
                                                       maxlength="200" value="{{agri_purpose_a}}" readonly="">
                                            </div>
                                            <span class="error-message error-message-na-agri_purpose_a"></span>
                                        </td>
                                    </tr>
                                    <tr style="background-color: #fff;">
                                        <td style="width: 10px">1.(b)</td>
                                        <td>Assessed or held for the non-agricultural purpose of</td>
                                        <td>
                                            <div class="input-group">
                                                <input type="text" id="non_agri_purpose_b" name="non_agri_purpose_b" class="form-control"
                                                       maxlength="100" value="{{non_agri_purpose_b}}" readonly="">
                                            </div>
                                            <span class="error-message error-message-na-non_agri_purpose_b"></span>
                                        </td>
                                    </tr>
                                    <tr style="background-color: #fff;">
                                        <td style="width: 10px">1.(c)</td>
                                        <td>Assessed or held for the non-agricultural purpose of</td>
                                        <td>
                                            <div class="input-group">
                                                <input type="text" id="non_agri_purpose_c" name="non_agri_purpose_c" class="form-control" 
                                                       maxlength="200"  value="{{non_agri_purpose_c}}" readonly="">
                                            </div>
                                            <span class="error-message error-message-na-non_agri_purpose_c"></span>
                                        </td>
                                    </tr>
                                    <tr style="background-color: #fff;">
                                        <td style="width: 10px"></td>
                                        <td>for the same purpose but in relaxation of condition</td>
                                        <td>
                                            <div class="input-group">
                                                <input type="text" id="rel_condition_c" name="rel_condition_c" class="form-control" 
                                                       maxlength="200" value="{{rel_condition_c}}" readonly="">
                                            </div>
                                            <span class="error-message error-message-na-rel_condition_c"></span>
                                        </td>
                                    </tr>
                                    <tr style="background-color: #fff;">
                                        <td style="width: 10px"></td>
                                        <td>imposed at the time of grant of land or permission
                                            for such non-agricultural use viz.
                                        </td>
                                        <td>
                                            <div class="input-group">
                                                <input type="text" id="pre_non_agri_c" name="pre_non_agri_c" class="form-control" 
                                                       maxlength="200" value="{{pre_non_agri_c}}" readonly="">
                                            </div>
                                            <span class="error-message error-message-na-pre_non_agri_c"></span>
                                        </td>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                    <div class="col-xs-12" style="margin-top: 20px;">
                        <div style="background-color: #d2d6de; padding: 5px;">
                            <span class="f-w-b" style="font-size: 15px; color: #000;">2. I annex to this application </span>
                            <hr>
                            <table class="table table-bordered m-b-0px" id="applicantList" style="margin-top: 10px;">
                                <thead>
                                    <tr style='color: #000;'>
                                        <th style="width: 10px">Sr.No.</th>
                                        <th>Name of Document</th>
                                        <th></th>
                                    </tr>
                                    <tr style="background-color: #fff;">
                                        <td style="width: 10px">2.(a)</td>
                                        <td style="width: 850px">A certified copy of record of rights in respect of the land as it existed at the
                                            time of application(R/RNakal, Form I & XIV and site plan). <label><span style="color: red;">* </span></label></td>
                                        <td>
                                            <div class="form-group col-sm-12" id="certified_copy_container">
                                                <label><span style="color: red;">(Maximum File Size: 1MB) &nbsp;<br> (Upload PDF Only)</span></label><br>
                                                <label class="f-w-n">Document Not Uploaded</label><br>
                                                <div class="error-message error-message-na-certified_copy"></div>
                                            </div>
                                            <div class="form-group col-sm-12" id="certified_copy_name_container" style="display: none;">
                                                <a id="certified_copy_download" target="_blank"><label id="certified_copy_name_image" class="btn btn-sm btn-nic-blue f-w-n spinner_name_container_for_na_{{VALUE_FOUR}}" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style="background-color: #fff;">
                                        <td style="width: 10px">2.(b)</td>
                                        <td>A sketch or layout of the site in question showing the location of the proposed
                                            building or other works for which permission is sought and the nearest road or
                                            means of access. (h'revocable Declaration/Consent/ NOC in fbrm of affidavit
                                            of the holder of the plot from where access will be provided). <label><span style="color: red;">* </span></label></td>
                                        <td>
                                            <div class="form-group col-sm-12" id="sketch_layout_container">
                                                <label><span style="color: red;">(Maximum File Size: 1MB) &nbsp;<br> (Upload PDF Only)</span></label><br>
                                                <label class="f-w-n">Document Not Uploaded</label><br>
                                                <div class="error-message error-message-na-sketch_layout"></div>
                                            </div>
                                            <div class="form-group col-sm-12" id="sketch_layout_name_container" style="display: none;">
                                                <a id="sketch_layout_download" target="_blank"><label id="sketch_layout_name_image" class="btn btn-sm btn-nic-blue f-w-n spinner_name_container_for_na_{{VALUE_FIVE}}" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style="background-color: #fff;">
                                        <td style="width: 10px">2.(c)</td>
                                        <td>Written consent of the tenant/superior holder /occupant and an affidavit of the
                                            applicant stating that the access will be obtained from the land holder.</td>
                                        <td>
                                            <div class="form-group col-sm-12" id="written_consent_container">
                                                <label><span style="color: red;">(Maximum File Size: 1MB) &nbsp;<br> (Upload PDF Only)</span></label><br>
                                                <label class="f-w-n">Document Not Uploaded</label><br>
                                                <div class="error-message error-message-na-written_consent"></div>
                                            </div>
                                            <div class="form-group col-sm-12" id="written_consent_name_container" style="display: none;">
                                                <a id="written_consent_download" target="_blank"><label id="written_consent_name_image" class="btn btn-sm btn-nic-blue f-w-n spinner_name_container_for_na_{{VALUE_SIX}}" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                                            </div>
                                        </td>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                    <h3 style="margin-top: 20px;" class="box-title f-w-b page-header color-nic-blue f-s-20px m-b-0">3. I also furnish the following information: </h3>
                    <hr class="m-b-5px">
                    <div class="row" style="margin-top: 20px;">
                        <div class="form-group col-sm-6">
                            <label>3.1 Full Name of the applicant  <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="name_of_applicant" name="name_of_applicant" readonly="" class="form-control" placeholder="Name of Applicant !"
                                       maxlength="100" onblur="checkValidation('na', 'name_of_applicant', applicantNameValidationMessage);" value="{{name_of_applicant}}">
                            </div>
                            <span class="error-message error-message-na-name_of_applicant"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>3.2 Full Postal address  <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea type="text" id="postel_address" name="postel_address"  readonly="" class="form-control" placeholder="Full Postal address !"
                                          onblur="checkValidation('na', 'postel_address', addressValidationMessage);">{{postel_address}}</textarea>
                            </div>
                            <span class="error-message error-message-na-postel_address"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>3.3 Occupation <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="occupation" name="occupation" class="form-control" readonly="" placeholder="Occupation !" maxlength="100" value="{{occupation}}" onblur="checkValidation('na', 'occupation', occupationValidationMessage);">
                            </div>
                            <span class="error-message error-message-na-occupation"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>3.4 Village Taluka where the land is situated <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="village" name="village" readonly="" value="{{village}}" maxlength="100"
                                       placeholder="Village Taluka where the land is situated !" onblur="checkValidation('na', 'village', villageValidationMessage);">
                            </div>
                            <span class="error-message error-message-na-village"></span>
                        </div>
                        <!--                        <div class="form-group col-sm-6">
                                                    <label>3.4 Assessed or held for the purpose of agriculture for the non-agricultureal purpose/purposes <span class="color-nic-red">*</span></label>
                                                    <div class="input-group">
                                                        <input type="text" id="purpose" name="purpose" class="form-control" placeholder="Assessed or held for the purpose of agriculture for the non-agricultureal purpose/purposes !" maxlength="100" value="{{purpose}}" onblur="checkValidation('na', 'purpose', naPurposeValidationMessage);">
                                                    </div>
                                                    <span class="error-message error-message-na-purpose"></span>
                                                </div>-->

                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>3.5.1 Survey No. Hissa No. of the land <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="survey_no" name="survey_no" readonly="" maxlength="100" value="{{survey_no}}" placeholder="Survey No. Hissa No. of the land !" onblur="checkValidation('na', 'survey_no', naSurveyNoValidationMessage);">
                            </div>
                            <span class="error-message error-message-na-survey_no"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>3.5.2 Area and assessment/rent of the land <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="area_assessment" readonly="" name="area_assessment" value="{{area_assessment}}" placeholder="Area and assessment/rent of the land !" maxlength="100" onblur="checkValidation('na', 'area_assessment', naAreaAssessmentValidationMessage);">
                            </div>
                            <span class="error-message error-message-na-area_assessment"></span>
                        </div>
                    </div>
                    <div class="row">

                        <div class="form-group col-sm-6">
                                <label>3.6 Area of the site of (5) above proposed to be used for the purpose of:  <br>
                                    &emsp;1) Residential....<br>
                                    &emsp;2) Industrial.....<br>
                                    &emsp;3) Commercial.....<br>
                                    &emsp;4) Residential-cumCommercial.............<br>
                                    &emsp;5) Any other N.A. purpose.<br>
                                    &emsp;(Supported with write-up and sketch
                                    or lay-out showing land utilization
                                    details<br>  
                                    &emsp;separately for each proposed
                                    purpose)<span style="color: red;">*</span></label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="area_of_site_used" readonly="" name="area_of_site_used" value="{{area_of_site_used}}" placeholder="Area of the site !" maxlength="100" onblur="checkValidation('na', 'area_of_site_used', naAreaSiteValidationMessage);">
                                </div>
    <!--                            <select class="form-control" id="area_of_site_used" name="area_of_site_used"
                                        data-placeholder="Area of the site !" onblur="checkValidation('na', 'area_of_site_used', naAreaSiteValidationMessage);">
                                    <option value="">Select Area of the site</option>
                                    <option value="Residential">Residential</option>
                                    <option value="Industrial">Industrial</option>
                                    <option value="Commercial">Commercial</option>
                                    <option value="Residential-cum-Commercial">Residential-cum-Commercial</option>
                                    <option value="Any other N.A. Purpose">Any other N.A. Purpose</option>
                                </select>-->
                                <span class="error-message error-message-na-area_of_site_used"></span>
                            </div>
                            <div class="form-group col-sm-6">
                                <label>3.7 Whether the applicant is occupant Class-I or Class-II or a tenant or a government lessee<span style="color: red;">*</span></label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="occupant_class" readonly="" name="occupant_class" maxlength="100" value="{{occupant_class}}" placeholder="Whether the applicant is occupant Class-I or Class-II or a tenant or a government lessee. !" onblur="checkValidation('na', 'occupant_class', naOccupantClassValidationMessage);">
                                </div>
    <!--                            <select class="form-control" id="occupant_class" name="occupant_class"
                                        data-placeholder="Whether the applicant is occupant Class-I or Class-II or a tenant or a government lessee. !" onblur="checkValidation('na', 'occupant_class', naOccupantClassValidationMessage);">
                                    <option value="">Select occupant class</option>
                                    <option value="Class-I">Class-I</option>
                                    <option value="Class-II">Class-II</option>
                                </select>-->
                                <span class="error-message error-message-na-occupant_class"></span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-sm-6">
                                <label>3.8 Present use of the land whether any building exists thereon and if so its use.<span style="color: red;">*</span></label>
                                <input type="text" class="form-control" id="present_use_land" readonly="" name="present_use_land" value="{{present_use_land}}"
                                       placeholder="Present use of the land whether any building exists thereon and if so its use !" maxlength="100" onblur="checkValidation('na', 'present_use_land', naPresentUseValidationMessage);">
                                <span class="error-message error-message-na-present_use_land"></span>
                            </div>
                            <div class="form-group col-sm-12">
                                <label>3.9 Whether the land is Situated or Included. <br>
                                &emsp;a) In Municipal Area<br>
                                &emsp;b)  In City Survey Area<br>
                                &emsp;c)  In or near a Cantonment area<br>
                                &emsp;4)  Near a Air-Port or a Ply. Station or a Jail or Prison or local public office or cremation or burial ground.<br>
                                &emsp;5)  Adjoining to nalla, creek, bank of river, etc.<br>
                                &emsp;If so, its approximate distance there from.<span style="color: red;">*</span></label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="situated_land" readonly="" name="situated_land" value="{{situated_land}}" maxlength="100" placeholder="Whether the land is Situated or Included !" onblur="checkValidation('na', 'situated_land', naSituatedLandValidationMessage);">
                                </div>
    <!--                            <select class="form-control" id="situated_land" name="situated_land"
                                        data-placeholder="Whether the land is Situated or Included !" onblur="checkValidation('na', 'situated_land', naSituatedLandValidationMessage);">
                                    <option value="">Select Whether the land is Situated or Included</option>
                                    <option value="In Municipal Area">In Municipal Area</option>
                                    <option value="In City Survey Area">In City Survey Area</option>
                                    <option value="In or near a cantonment area">In or near a cantonment area</option>
                                    <option value="Near a Air-port or a Rly. Station or a Jail or prison or local public office or cremation or burial ground">Near a Air-port or a Rly. Station or a Jail or prison or local public office or cremation or burial ground</option>
                                    <option value="Adjoining to nalla, creek, bank of river etc">Adjoining to nalla, creek, bank of river etc</option>
                                </select>-->
                                <span class="error-message error-message-na-situated_land"></span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-sm-6">
                                <label>3.10 Whether electrical high transmission way, road, canal, nalla) pass over/through the land and if so what is the distance thereof from the proposed building or other works. <span style="color: red;">* </span>  &emsp; </label><br>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="electrical_distance_land" readonly="" name="electrical_distance_land" maxlength="100" value="{{electrical_distance_land}}" placeholder="Whether electrical high transmission way, road, canal, nalla) pass over/through the land !" onblur="checkValidation('na', 'electrical_distance_land', naElectricalDistanceLandValidationMessage);">
                                </div>
    <!--                            <input type="radio" id="electrical_distance_land_yes" name="electrical_distance_land"  
                                       onblur="checkValidation('na', 'electrical_distance_land', naElectricalDistanceLandValidationMessage);" value="{{IS_CHECKED_YES}}"> YES &emsp; 
                                <input type="radio" id="electrical_distance_land_no" name="electrical_distance_land" 
                                       maxlength="100" onblur="checkValidation('na', 'electrical_distance_land', naElectricalDistanceLandValidationMessage);" value="{{IS_CHECKED_NO}}"> NO-->
                                <span class="error-message error-message-na-electrical_distance_land"></span>
                            </div>
                            <div class="form-group col-sm-6"><br>
                                <label>3.11 Is the land under acquisitions if so, state details. <span style="color: red;">* </span> &emsp;</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="acquisition_under_land" readonly="" name="acquisition_under_land" maxlength="100" value="{{acquisition_under_land}}" placeholder="Is the land under acquisitions if so, state details !" onblur="checkValidation('na', 'acquisition_under_land', naAcquisitionsUnderLandValidationMessage);">
                                </div>
    <!--                            <input type="radio" id="acquisition_under_land_yes" name="acquisition_under_land"  
                                       maxlength="100" onblur="checkValidation('na', 'acquisition_under_land', naAcquisitionsUnderLandValidationMessage);" value="{{IS_CHECKED_YES}}"> YES &emsp; 
                                <input type="radio" id="acquisition_under_land_no" name="acquisition_under_land" 
                                       maxlength="100" onblur="checkValidation('na', 'acquisition_under_land', naAcquisitionsUnderLandValidationMessage);" value="{{IS_CHECKED_NO}}"> NO-->
                                <span class="error-message error-message-na-acquisition_under_land"></span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-sm-6">
                                <label>3.12 Is there a road from where the land is easily accessible ? State the name of the road and whether it is Highway, Major district road or village road. What is the distance of the proposed building or other work from the centre of the road? <span style="color: red;">* </span>  &emsp; </label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="accessible_land" readonly="" name="accessible_land" maxlength="100" value="{{accessible_land}}" placeholder="Is there a road from where the land is easily accessible ?" onblur="checkValidation('na', 'accessible_land', naAccessibleLandValidationMessage);">
                                </div>
    <!--                            <input type="radio" id="accessible_land_yes" name="accessible_land"  
                                       onblur="checkValidation('na', 'accessible_land', naAccessibleLandValidationMessage);" value="{{IS_CHECKED_YES}}"> YES &emsp; 
                                <input type="radio" id="accessible_land_no" name="accessible_land" 
                                       maxlength="100" onblur="checkValidation('na', 'accessible_land', naAccessibleLandValidationMessage);" value="{{IS_CHECKED_NO}}"> NO-->
                                <span class="error-message error-message-na-accessible_land"></span>
                            </div>
                            <div class="form-group col-sm-6"><br>
                                <label>3.13 If there is no road adjoining the land how is it proposed to provide for access to the site ? ( Please referpoint No. 2 (b) herebefore). <span style="color: red;">* </span> &emsp;</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="site_access_land" readonly="" name="site_access_land" maxlength="100" value="{{site_access_land}}" placeholder="If there is no road adjoining the land how is it proposed to provide for access to the site ?" onblur="checkValidation('na', 'site_access_land', naSiteAccessLandValidationMessage);">
                                </div>
    <!--                            <input type="radio" id="site_access_land_yes" name="site_access_land"  
                                       maxlength="100" onblur="checkValidation('na', 'site_access_land', naSiteAccessLandValidationMessage);" value="{{IS_CHECKED_YES}}"> YES &emsp; 
                                <input type="radio" id="site_access_land_no" name="site_access_land" 
                                       maxlength="100" onblur="checkValidation('na', 'site_access_land', naSiteAccessLandValidationMessage);" value="{{IS_CHECKED_NO}}"> NO-->
                                <span class="error-message error-message-na-site_access_land"></span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-sm-6">
                                <label>3.14 Was a similar application made in the past for non-agricultural use of this land and was it rejected? If yes, Why ? <span style="color: red;">* </span>  &emsp; </label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="rejected_land" readonly="" name="rejected_land" maxlength="100" value="{{rejected_land}}" placeholder="Was a similar application made in the past for non-agricultural use of this land and was it rejected?" onblur="checkValidation('na', 'rejected_land', naRejectedLandValidationMessage);">
                                </div>
    <!--                            <input type="radio" id="rejected_land_yes" name="rejected_land"  
                                       onblur="checkValidation('na', 'rejected_land', naRejectedLandValidationMessage);" value="{{IS_CHECKED_YES}}"> YES &emsp; 
                                <input type="radio" id="rejected_land_no" name="rejected_land" 
                                       maxlength="100" onblur="checkValidation('na', 'rejected_land', naRejectedLandValidationMessage);" value="{{IS_CHECKED_NO}}"> NO-->
                                <span class="error-message error-message-na-rejected_land"></span>
                            </div>
                        </div>
                        <div class="row">

                        </div>
                        <div class="row">
                            <div class="form-group col-sm-12" id="form_land_document_container">
                                <label>4. Form No. I & XIV of the land in question, in original + 9 Zerox copy. <span style="color: red;">* <br>(Maximum File Size: 1MB) &nbsp; (Upload PDF Only)</span></label><br>
                                <label class="f-w-n">Document Not Uploaded</label><br>
                                <div class="error-message error-message-na-form_land_document"></div>
                            </div>
                            <div class="form-group col-sm-12" id="form_land_document_name_container" style="display: none;">
                                <label>4. Form No. I & XIV of the land in question, in original + 9 Zerox copy. <span style="color: red;">*</span></label><br>
                                <a id="form_land_document_download" target="_blank"><label id="form_land_document_name_image" class="btn btn-sm btn-nic-blue f-w-n spinner_name_container_for_na_{{VALUE_ONE}}" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            </div>
                            <div class="text-center color-nic-blue col-3 m-b-5px" id="spinner_template_{{VALUE_ONE}}" style="display: none;"><i class="fas fa-sync-alt fa-spin fa-1x"></i></div>
                        </div>

                        <div class="row">
                            <div class="form-group col-sm-12" id="site_plan_document_container">
                                <label>5. Site Plan of the land in question, in original + 9 Zerox copy. <span style="color: red;">* <br>(Maximum File Size: 1MB) &nbsp; (Upload PDF Only)</span></label><br>
                                <label class="f-w-n">Document Not Uploaded</label><br>
                                <div class="error-message error-message-na-site_plan_document"></div>
                            </div>
                            <div class="form-group col-sm-12" id="site_plan_document_name_container" style="display: none;">
                                <label>5. Site Plan of the land in question, in original + 9 Zerox copy. <span style="color: red;">*</span></label><br>
                                <a id="site_plan_document_download" target="_blank"><label id="site_plan_document_name_image" class="btn btn-sm btn-nic-blue f-w-n spinner_name_container_for_na_{{VALUE_TWO}}" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 m-b-5px" id="seal_and_stamp_container_for_na">
                                <label>6. Signature <span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload JPG | PNG | JPEG | JFIF Only)</span></label><br>
                                <label class="f-w-n">Document Not Uploaded</label><br>
                                <div class="error-message error-message-na-seal_and_stamp_for_na"></div>
                            </div>
                            <div class="form-group col-sm-12" id="seal_and_stamp_name_container_for_na" style="display: none;">
                                <label>6. Principal Employer Seal & Stamp <span style="color: red;">*</label><br>
                                <a target="_blank" id="seal_and_stamp_download"><img id="seal_and_stamp_name_image_for_na" style="width: 250px; height: 250px; border: 2px solid blue;"></a>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-sm-12"> 
                                <strong>7. Declaration <span class="color-nic-red">*</span></strong><br/>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-md-12">
                                <div class="input-group">
                                    <span class="input-group-addon">
                                        <input type="checkbox" class="" name="declaration_for_na" id="declaration_for_na" autocomplete="true" value="{{is_checked}}" >&nbsp;I solemnly affirm that the information given above is true to the best of my knowledge and belief.
                                        <span style="color: red;">*</span>
                                    </span>
                                </div>
                                <span class="error-message error-message-na-declaration_for_na"></span>
                            </div>
                        </div>
                        <hr class="m-b-1rem">
                        <div class="row">
                            <div class="form-group col-sm-6">
                                <label>Remarks  <span style="color: red;">*</span></label>
                                <textarea class="form-control" placeholder="Remarks !" readonly="">{{remarks}}</textarea>
                            </div>
                        </div>
                        <hr class="m-b-1rem"> 
                        <div class="form-group">
                            <button type="button" class="btn btn-sm btn-danger" onclick="Na.listview.loadNaData();">Close</button>
                        </div>
                    </div>
            </form>
        </div>
    </div>
</div>
<!--<div class="row">
      <div class="col-sm-12"></div> 
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title" style="float: none; text-align: center;">SCHEDULE - 1</h3>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">(See Rule 3)</div>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">FORM OF APPLICATION UNDER SUB-SECTION (1) OF SECTION 32 OF </div>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">THE GOA, DAMAN AND DIU LAND REVENUE CODE - 1968. </div>
            </div>
            <form role="form" id="na_form" name="na_form" onsubmit="return false;">

                <input type="hidden" id="na_id" name="na_id" value="{{na_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="form-group col-sm-6">
                            To,<br>
                            The Collector,<br>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>1. Full Name of the applicant  <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="name_of_applicant" name="name_of_applicant" class="form-control" placeholder="Name of Applicant !"
                                       maxlength="100" value="{{name_of_applicant}}" readonly="">
                            </div>
                            <span class="error-message error-message-na-name_of_applicant"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>2. Occupation <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="occupation" name="occupation" class="form-control" placeholder="Occupation !" maxlength="100" value="{{occupation}}" readonly="">
                            </div>
                            <span class="error-message error-message-na-occupation"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>3. Assessed or held for the purpose of agriculture for the non-agricultureal purpose/purposes <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="purpose" name="purpose" class="form-control" placeholder="Assessed or held for the purpose of agriculture for the non-agricultureal purpose/purposes !" maxlength="100" value="{{purpose}}" readonly="">
                            </div>
                            <span class="error-message error-message-na-purpose"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>4. Full Postal address  <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea type="text" id="postel_address" name="postel_address" class="form-control" placeholder="Full Postal address !"
                                          maxlength="100" readonly="">{{postel_address}}</textarea>
                            </div>
                            <span class="error-message error-message-na-postel_address"></span>
                        </div>

                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>5. District where the land is situated <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <select id="district" name="district" class="form-control select2" disabled=""
                                        data-placeholder="Select District" style="width: 100%;">  
                                </select>
                            </div>
                            <span class="error-message error-message-na-district"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>6. Village Taluka where the land is situated <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input class="form-control" id="village" name="village" value="{{village}}"
                                       placeholder="Village Taluka where the land is situated !" readonly="">
                            </div>
                            <span class="error-message error-message-na-village"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>7. Survey No. Hissa No. area and assessment/rent of the land <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input class="form-control" id="survey_no" name="survey_no" value="{{survey_no}}" placeholder="Survey No. Hissa No. area and assessment/rent of the land !" readonly="">
                            </div>
                            <span class="error-message error-message-na-survey_no"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>8. Area of the site of (5) above proposed to be used for the  <span style="color: red;">*</span></label>
                            <select class="form-control" id="area_of_site_used" name="area_of_site_used"
                                    data-placeholder="Area of the site !" readonly="">
                                <option value="">Select Area of the site</option>
                                <option value="Residential">Residential</option>
                                <option value="Industrial">Industrial</option>
                                <option value="Commercial">Commercial</option>
                                <option value="Residential-cum-Commercial">Residential-cum-Commercial</option>
                                <option value="Any other N.A. Purpose">Any other N.A. Purpose</option>
                            </select>
                            <span class="error-message error-message-na-area_of_site_used"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>9. Whether the applicant is occupant Class-I or Class-II or a tenamt or a government lessee <span style="color: red;">*</span></label>
                            <select class="form-control" id="occupant_class" name="occupant_class"
                                    data-placeholder="Whether the applicant is occupant Class-I or Class-II or a tenamt or a government lessee. !" readonly="">
                                <option value="">Select occupant class</option>
                                <option value="Class-I">Class-I</option>
                                <option value="Class-II">Class-II</option>
                            </select>
                            <span class="error-message error-message-na-occupant_class"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>10. Present use of the land whether any building exists thereon and if so its use.<span style="color: red;">*</span></label>
                            <input class="form-control" id="present_use_land" name="present_use_land" value="{{present_use_land}}"
                                   placeholder="Present use of the land whether any building exists thereon and if so its use !" readonly="">
                            <span class="error-message error-message-na-present_use_land"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>11. Whether the land is situateWhetherd or included. <span style="color: red;">*</span></label>
                            <select class="form-control" id="situated_land" name="situated_land"
                                    data-placeholder="Whether the land is situated or included !" readonly="">
                                <option value="">Select Whether the land is situateWhetherd or included</option>
                                <option value="In Municipal Area">In Municipal Area</option>
                                <option value="In City Survey Area">In City Survey Area</option>
                                <option value="In or near a cantonment area">In or near a cantonment area</option>
                                <option value="Near a Air-port or a Rly. Station or a Jail or prison or local public office or cremation or burial ground">Near a Air-port or a Rly. Station or a Jail or prison or local public office or cremation or burial ground</option>
                                <option value="Adjoining to nalla, creek, bank of river etc">Adjoining to nalla, creek, bank of river etc</option>
                            </select>
                            <span class="error-message error-message-na-situated_land"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12">
                            <label>12. Whether electrical high transmission way, road, canal, nalla) pass over/through the land and if so what is the distance thereof from the proposed building or other works. <span style="color: red;">* </span>  &emsp; </label><br>
                            <input type="radio" id="electrical_distance_land_yes" name="electrical_distance_land"  
                                   onblur="checkValidation('na', 'electrical_distance_land', naElectricalDistanceLandValidationMessage);" value="{{IS_CHECKED_YES}}" disabled=""> YES &emsp; 
                            <input type="radio" id="electrical_distance_land_no" name="electrical_distance_land" 
                                   maxlength="100" onblur="checkValidation('na', 'electrical_distance_land', naElectricalDistanceLandValidationMessage);" value="{{IS_CHECKED_NO}}" disabled=""> NO
                            <br><span class="error-message error-message-na-electrical_distance_land"></span>
                        </div>
                        <div class="form-group col-sm-12">
                            <label>13. Is the land under acquisitions if so, state details. <span style="color: red;">* </span> &emsp;</label>
                            <input type="radio" id="acquisition_under_land_yes" name="acquisition_under_land"  
                                   maxlength="100" onblur="checkValidation('na', 'acquisition_under_land', naAcquisitionsUnderLandValidationMessage);" value="{{IS_CHECKED_YES}}" disabled=""> YES &emsp; 
                            <input type="radio" id="acquisition_under_land_no" name="acquisition_under_land" 
                                   maxlength="100" onblur="checkValidation('na', 'acquisition_under_land', naAcquisitionsUnderLandValidationMessage);" value="{{IS_CHECKED_NO}}" disabled=""> NO
                            <br><span class="error-message error-message-na-acquisition_under_land"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12">
                            <label>14. Is there a road from where the land is easily accessible ? State the name of the road and whether it is Highway, Major district road or village road. What is the distance of the proposed building or other work from the centre of the road? <span style="color: red;">* </span>  &emsp; </label>
                            <input type="radio" id="accessible_land_yes" name="accessible_land"  
                                   onblur="checkValidation('hotelregi', 'accessible_land', naAccessibleLandValidationMessage);" value="{{IS_CHECKED_YES}}" disabled=""> YES &emsp; 
                            <input type="radio" id="accessible_land_no" name="accessible_land" 
                                   maxlength="100" onblur="checkValidation('hotelregi', 'accessible_land', naAccessibleLandValidationMessage);" value="{{IS_CHECKED_NO}}" disabled=""> NO
                            <br><span class="error-message error-message-hotelregi-accessible_land"></span>
                        </div>
                        <div class="form-group col-sm-12">
                            <label>15. If there is no road adjoining the land how is it proposed to provide for access to the site ? ( Please referpoint No. 2 (b) herebefore). <span style="color: red;">* </span> &emsp;</label>
                            <input type="radio" id="site_access_land_yes" name="site_access_land"  
                                   maxlength="100" onblur="checkValidation('hotelregi', 'site_access_land', naSiteAccessLandValidationMessage);" value="{{IS_CHECKED_YES}}" disabled=""> YES &emsp; 
                            <input type="radio" id="site_access_land_no" name="site_access_land" 
                                   maxlength="100" onblur="checkValidation('hotelregi', 'site_access_land', naSiteAccessLandValidationMessage);" value="{{IS_CHECKED_NO}}" disabled=""> NO
                            <br><span class="error-message error-message-hotelregi-site_access_land"></span>
                        </div>  
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12">
                            <label>16. Was a similar application made in the past for non-agricultural use of this land and was it rejected? If yes, Why ? <span style="color: red;">* </span>  &emsp; </label>
                            <input type="radio" id="rejected_land_yes" name="rejected_land"  
                                   onblur="checkValidation('hotelregi', 'rejected_land', naRejectedLandValidationMessage);" value="{{IS_CHECKED_YES}}" disabled=""> YES &emsp; 
                            <input type="radio" id="rejected_land_no" name="rejected_land" 
                                   maxlength="100" onblur="checkValidation('hotelregi', 'rejected_land', naRejectedLandValidationMessage);" value="{{IS_CHECKED_NO}}" disabled=""> NO
                            <br><span class="error-message error-message-hotelregi-rejected_land"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="form_land_document_container">
                            <label>17. Form No. I & XIV of the land in question, in original + 9 Zerox copy. <span style="color: red;">* <br>(Maximum File Size: 1MB) &nbsp; (Upload PDF Only)</span></label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                            <div class="error-message error-message-na-form_land_document"></div>
                        </div>
                        <div class="form-group col-sm-12" id="form_land_document_name_container" style="display: none;">
                            <label>17. Form No. I & XIV of the land in question, in original + 9 Zerox copy. <span style="color: red;">*</span></label><br>
                            <a id="form_land_document_download" target="_blank"><label id="form_land_document_name_image" class="btn btn-sm btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-sm-12" id="site_plan_document_container">
                            <label>18. Site Plan of the land in question, in original + 9 Zerox copy. <span style="color: red;">* <br>(Maximum File Size: 1MB) &nbsp; (Upload PDF Only)</span></label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                            <div class="error-message error-message-na-site_plan_document"></div>
                        </div>
                        <div class="form-group col-sm-12" id="site_plan_document_name_container" style="display: none;">
                            <label>18. Site Plan of the land in question, in original + 9 Zerox copy. <span style="color: red;">*</span></label><br>
                            <a id="site_plan_document_download" target="_blank"><label id="site_plan_document_name_image" class="btn btn-sm btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 m-b-5px" id="seal_and_stamp_container_for_na">
                            <label>19. Signature <span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload JPG | PNG | JPEG | JFIF Only)</span></label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                            <div class="error-message error-message-na-seal_and_stamp_for_na"></div>
                        </div>
                        <div class="form-group col-sm-12" id="seal_and_stamp_name_container_for_na" style="display: none;">
                            <label>19. Principal Employr Seal & Stamp <span style="color: red;">*</label><br>
                            <a target="_blank" id="seal_and_stamp_download"><img id="seal_and_stamp_name_image_for_na" style="width: 250px; height: 250px; border: 2px solid blue;"></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12"> 
                            <strong>20. Declaration <span class="color-nic-red">*</span></strong><br/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-12">
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <input type="checkbox" class="" name="declaration_for_na" id="declaration_for_na" autocomplete="true" value="{{is_checked}}" disabled>&nbsp;I solemnly affirm that the information given above is true to the best of my knowledge and belief.
                                    <span style="color: red;">*</span>
                                </span>
                            </div>
                            <span class="error-message error-message-na-declaration_for_na"></span>
                        </div>
                    </div>
                    <hr class="m-b-1rem">
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>Remarks  <span style="color: red;">*</span></label>
                            <textarea class="form-control" placeholder="Remarks !" readonly="">{{remarks}}</textarea>
                        </div>
                    </div>
                    <hr class="m-b-1rem"> 
                    <div class="form-group">
                        <button type="button" class="btn btn-sm btn-danger" onclick="Na.listview.loadNaData();">Close</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>-->