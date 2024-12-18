<div class="card-header">
    <h3 class="card-title f-w-b" style="float: none; text-align: center;">
        {{title}} for FORM OF APPLICATION UNDER SUB-SECTION (1) OF SECTION 32 OF <br> THE GOA, DAMAN AND DIU LAND REVENUE CODE - 1968.
    </h3>
</div>
<div class="card-body p-b-0px text-left" style="font-size: 13px;">
    <div class="table-responsive">
        <table class="table table-bordered table-padding bg-beige">
            <tr>
                <td class="f-w-b" style="width: 40%;">Application Number</td>
                <td>{{application_number}}</td>
            </tr>
            <tr>
                <td class="f-w-b text-left">District where the land is situated</td>
                <td class="text-left">{{district_text}}</td>
            </tr>
            <tr>
                <td class="f-w-b text-left">Entity / Establishment Type </td>
                <td class="text-left">{{entity_establishment_type}}</td>
            </tr>
        </table>
    </div>
        <span class="f-w-b" style="font-size: 15px;">1. Details of Applicant </span>
        <div id="applicant_display_for_na_view"></div>
    <table class="table table-bordered m-b-0px" style="margin-top: 10px;">
        <thead>
            <tr>
                <td class="text-center" style="width: 40px">1.(a)</td>
                <td style="width: 305px">Assessed or held for the purpose of agriculture for the non-agricultural
                    purpose/purposes of</td>
                <td>
                    <div class="input-group">
                        {{agri_purpose_a}}
                    </div>
                    <span class="error-message error-message-na-agri_purpose_a"></span>
                </td>
            </tr>
            <tr>
                <td class="text-center" >1.(b)</td>
                <td>Assessed or held for the non-agricultural purpose of</td>
                <td>
                    <div class="input-group">
                        {{non_agri_purpose_b}}
                    </div>
                    <span class="error-message error-message-na-non_agri_purpose_b"></span>
                </td>
            </tr>
            <tr>
                <td class="text-center">1.(c)</td>
                <td>Assessed or held for the non-agricultural purpose of</td>
                <td>
                    <div class="input-group">
                        {{non_agri_purpose_c}}
                    </div>
                    <span class="error-message error-message-na-non_agri_purpose_c"></span>
                </td>
            </tr>
            <tr>
                <td class="text-center"></td>
                <td>for the same purpose but in relaxation of condition</td>
                <td>
                    <div class="input-group">
                        {{rel_condition_c}}
                    </div>
                    <span class="error-message error-message-na-rel_condition_c"></span>
                </td>
            </tr>
            <tr>
                <td class="text-center"></td>
                <td>imposed at the time of grant of land or permission
                    for such non-agricultural use viz.
                </td>
                <td>
                    <div class="input-group">
                        {{pre_non_agri_c}}
                    </div>
                    <span class="error-message error-message-na-pre_non_agri_c"></span>
                </td>
            </tr>
        </thead>
    </table>
    <div class="" style="margin-top: 20px;">
        <span class="f-w-b" style="font-size: 15px; color: #000;">2. I annex to this application </span>
        
        <table class="table table-bordered m-b-0px" id="applicantList" style="margin-top: 10px;">
            <thead>
                <tr class="f-w-b bg-beige">
                    <th style="width: 10px">Sr.No.</th>
                    <th style="width: 305px">Name of Document</th>
                    <th></th>
                </tr>
                <tr style="background-color: #fff;">
                    <td class="text-center">2.(a)</td>
                    <td>A certified copy of record of rights in respect of the land as it existed at the
                        time of application(R/R Nakal, Form I & XIV and site plan). <label><span style="color: red;">* </span></label></td>
                    <td>
                        {{#if show_certified_copy}}
                            <a target="_blank" href="{{NA_DOC_PATH}}{{certified_copy}}">
                                <label class="btn btn-sm btn-nic-blue f-w-n cursor-pointer mb-1">
                                    <i class="fas fa-download"></i> &nbsp; R/R Nakal, Form I & XIV and site plan
                                </label>
                            </a>
                        {{/if}}
                    </td>
                </tr>
                <tr>
                    <td class="text-center">2.(b)</td>
                    <td>A sketch or layout of the site in question showing the location of the proposed
                        building or other works for which permission is sought and the nearest road or
                        means of access. (h'revocable Declaration/Consent/ NOC in fbrm of affidavit
                        of the holder of the plot from where access will be provided). <label><span style="color: red;">* </span></label></td>
                    <td>
                        {{#if show_sketch_layout}}
                            <a target="_blank" href="{{NA_DOC_PATH}}{{sketch_layout}}">
                                <label class="btn btn-sm btn-nic-blue f-w-n cursor-pointer mb-1">
                                    <i class="fas fa-download"></i> &nbsp; A sketch or layout of the site
                                </label>
                            </a>
                        {{/if}}
                    </td>
                </tr>
                <tr>
                    <td class="text-center">2.(c)</td>
                    <td>Written consent of the tenant/superior holder /occupant and an affidavit of the
                        applicant stating that the access will be obtained from the land holder.</td>
                    <td>
                        {{#if show_written_consent}}
                            <a target="_blank" href="{{NA_DOC_PATH}}{{written_consent}}">
                                <label class="btn btn-sm btn-nic-blue f-w-n cursor-pointer mb-1">
                                    <i class="fas fa-download"></i> &nbsp; Written consent of the tenant
                                </label>
                            </a>
                        {{/if}}
                    </td>
                </tr>
            </thead>
        </table>
    </div>
    <h3 style="margin-top: 20px;" class="box-title f-w-b page-header color-nic-blue f-s-20px m-b-0">3. I also furnish the following information: </h3>
  
    <div class="table-responsive">
        <table class="table table-bordered table-padding bg-beige">
            <tr>
                <td class="f-w-b" style="width: 50%;">3.1 Full Name of the applicant</td>
                <td>{{name_of_applicant}}</td>
            </tr>
            <tr>
                <td>3.2 Full Postal Address</td>
                <td>{{postel_address}}</td>
            </tr>
            <tr>
                <td>3.3 Occupation</td>
                <td>{{occupation}}</td>
            </tr>
            <tr>
                <td>3.4 Village Taluka where the land is situated</td>
                <td>{{village}}</td>
            </tr>
            <tr>
                <td>3.5.1 Survey No. Hissa No. of the land</td>
                <td>{{survey_no}}</td>
            </tr>
            <tr>
                <td>3.5.2 Area and Assessment/Rent of the land</td>
                <td>{{area_assessment}}</td>
            </tr>
            <tr>
                <td>
                    3.6 Area of the site of (5) above proposed to be used for the purpose of: <br>
                    &emsp;1) Residential....<br>
                    &emsp;2) Industrial.....<br>
                    &emsp;3) Commercial.....<br>
                    &emsp;4) Residential-cumCommercial.............<br>
                    &emsp;5) Any other N.A. purpose.<br>
                    &emsp;(Supported with write-up and sketch<br>
                    &emsp;or lay-out showing land utilization<br>
                    &emsp;details<br>
                    &emsp;separately for each proposed
                    &emsp;purpose)</td>
                <td>{{area_of_site_used}}</td>
            </tr>
            <tr>
                <td>3.7 Whether the applicant is occupant Class-I or Class-II or a tenant or a government lessee</td>
                <td>{{occupant_class}}</td>
            </tr>
            <tr>
                <td>3.8 Present use of the land whether any building exists thereon and if so its use.</td>
                <td>{{present_use_land}}</td>
            </tr>
            <tr>
                <td style="width: 60px;" colspan="2">
                    3.9 Whether the land is Situated or Included. <br>
                    &emsp;a) In Municipal Area<br>
                    &emsp;b) In City Survey Area<br>
                    &emsp;c) In or near a Cantonment area<br>
                    &emsp;4) Near a Air-Port or a Ply. Station or a Jail or Prison or local public office or cremation or burial ground.<br>
                    &emsp;5) Adjoining to nalla, creek, bank of river, etc.<br>
                    &emsp;If so, its approximate distance there from.
                </td>
            </tr>
            <tr>
                <td colspan="2">{{situated_land}}</td>
            </tr>
            <tr>
                <td>3.10 Whether electrical high transmission way, road, canal, nalla) pass over/through the land and if so what is the distance thereof from the proposed building or other works.</td>
                <td>{{electrical_distance_land}}</td>
            </tr>
            <tr>
                <td>3.11 Is the land under acquisitions if so, state details.</td>
                <td>{{acquisition_under_land}}</td>
            </tr>
            <tr>
                <td>3.12 Is there a road from where the land is easily accessible ? State the name of the road and whether it is Highway, Major district road or village road. What is the distance of the proposed building or other work from the centre of the road?</td>
                <td>{{accessible_land}}</td>
            </tr>
            <tr>
                <td>3.13 If there is no road adjoining the land how is it proposed to provide for access to the site ? ( Please referpoint No. 2 (b) herebefore)</td>
                <td>{{site_access_land}}</td>
            </tr>
            <tr>
                <td>3.14 Was a similar application made in the past for non-agricultural use of this land and was it rejected? If yes, Why ?</td>
                <td>{{rejected_land}}</td>
            </tr>
        </table>
    </div>
    <div class="row">

    </div>
    <table class="table table-bordered m-b-0px" id="applicantList" style="margin-top: 10px;">
        <thead>
            <tr class="f-w-b bg-beige">
                <th style="width: 10px">Sr.No.</th>
                <th style="width: 305px">Name of Document</th>
                <th></th>
            </tr>
            <tr style="background-color: #fff;">
                <td class="text-center">4.(a)</td>
                <td>Form No. I & XIV of the land in question, in original + 9 Zerox copy.</td>
                <td>
                    {{#if show_form_land_document}}
                        <a target="_blank" href="{{NA_DOC_PATH}}{{form_land_document}}">
                            <label class="btn btn-sm btn-nic-blue f-w-n cursor-pointer mb-1">
                                <i class="fas fa-download"></i> &nbsp; Form No. I & XIV of the land
                            </label>
                        </a>
                    {{/if}}
                </td>
            </tr>
            <tr>
                <td class="text-center">5. </td>
                <td>Site Plan of the land in question, in original + 9 Zerox copy. <label><span style="color: red;">* </span></label></td>
                <td>
                    {{#if show_site_plan_document}}
                        <a target="_blank" href="{{NA_DOC_PATH}}{{site_plan_document}}">
                            <label class="btn btn-sm btn-nic-blue f-w-n cursor-pointer mb-1">
                                <i class="fas fa-download"></i> &nbsp;Site Plan of the land in question
                            </label>
                        </a>
                    {{/if}}
                </td>
            </tr>
            <tr>
                <td class="text-center">6. </td>
                <td>Signature </td>
                <td>
                    {{#if show_signature_na}}
                        <img style="border: 2px solid blue; width: 160px; height: 180px;"
                            src="{{NA_DOC_PATH}}{{signature}}">
                    {{/if}}
                </td>
            </tr>
        </thead>
    </table>
    <div class="row">
        <div class="form-group col-sm-12">
            <strong>7. Declaration <span class="color-nic-red">*</span></strong><br />
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
</div>
<hr class="m-b-1rem">
<div class="form-group button-right text-right">
    <button type="button" class="btn btn-sm btn-danger " onclick="window.print();" id="pa_btn_for_icview">
        <i class="fas fa-file-pdf mr-1"></i> Print Application
    </button>
    <button type="button" class="btn btn-sm btn-danger " onclick="Swal.close();"><i class="fas fa-times"></i>&nbsp; Close</button>
</div>