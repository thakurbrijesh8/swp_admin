<div class="card-header">
    <h3 class="card-title f-w-b" style="float: none; text-align: center;">
        View Investment Promotion Scheme
    </h3>
</div>
<div class="card-body p-b-0px text-left" style="font-size: 13px;">
    <div class="table-responsive">
        <table class="table table-bordered table-padding bg-beige">
            <tr>
                <td class="f-w-b">District</td>
                <td>{{district_text}}</td>
            </tr>
            <tr>
                <td class="f-w-b" style="width: 40%;">Common Application Form Number</td>
                <td>{{common_application_number}}</td>
            </tr>
            <tr>
                <td class="f-w-b" style="width: 40%;">Incentive Application Form Number</td>
                <td class="f-w-b">{{inc_application_number}}</td>
            </tr>
            <tr>
                <td class="f-w-b">Scheme Type</td>
                <td class="f-w-b">{{scheme_type_text}}</td>
            </tr>
            <tr>
                <td class="f-w-b">Scheme Name</td>
                <td class="f-w-b">{{scheme_text}}</td>
            </tr>
        </table>
    </div>
    <div class="card">
        <div class="card-header bg-nic-blue p-2">
            <h3 class="card-title f-w-b f-s-14px">Ownership Details</h3>
            <div class="card-tools">
                <button type="button" class="btn btn-tool" data-card-widget="collapse">
                    <i class="fas fa-minus text-white"></i>
                </button>
            </div>
        </div>
        <div class="card-body border-nic-blue">
            <div class="table-responsive">
                <table class="table table-bordered table-padding bg-beige mb-0">
                    <tr>
                        <td class="f-w-b" style="width: 40%;">Name of Owner</td>
                        <td>{{owner_name}}</td>
                    </tr>
                    <tr>
                        <td class="f-w-b">Owner Category</td>
                        <td>{{owner_category_text}}</td>
                    </tr>
                    <tr>
                        <td class="f-w-b">Email</td>
                        <td>{{email}}</td>
                    </tr>
                    <tr>
                        <td class="f-w-b">Mobile Number</td>
                        <td>{{mobile_no}}</td>
                    </tr>
                    <tr>
                        <td class="f-w-b">Aadhar Number</td>
                        <td>{{aadhar_no}}</td>
                    </tr>
                    <tr>
                        <td class="f-w-b">Pan Number</td>
                        <td>{{pan_no}}</td>
                    </tr>
                    <tr>
                        <td class="f-w-b">Caste Category</td>
                        <td>{{caste_category_text}}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
    <div class="card">
        <div class="card-header bg-nic-blue p-2">
            <h3 class="card-title f-w-b f-s-14px">Authorized Person Details</h3>
            <div class="card-tools">
                <button type="button" class="btn btn-tool" data-card-widget="collapse">
                    <i class="fas fa-minus text-white"></i>
                </button>
            </div>
        </div>
        <div class="card-body border-nic-blue">
            <div class="table-responsive">
                <table class="table table-bordered table-padding bg-beige mb-0">
                    <tr>
                        <td class="f-w-b" style="width: 40%;">Name of Authorized Person</td>
                        <td>{{ap_name}}</td>
                    </tr>
                    <tr>
                        <td class="f-w-b">Designation of Authorized Person</td>
                        <td>{{ap_designation}}</td>
                    </tr>
                    <tr>
                        <td class="f-w-b">Email of Authorized Person</td>
                        <td>{{ap_email}}</td>
                    </tr>
                    <tr>
                        <td class="f-w-b">Mobile No. of Authorized Person</td>
                        <td>{{ap_mobile}}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
    <div class="card">
        <div class="card-header bg-nic-blue p-2">
            <h3 class="card-title f-w-b f-s-14px">Enterprise Details</h3>
            <div class="card-tools">
                <button type="button" class="btn btn-tool" data-card-widget="collapse">
                    <i class="fas fa-minus text-white"></i>
                </button>
            </div>
        </div>
        <div class="card-body border-nic-blue">
            <table class="table table-bordered table-padding bg-beige mb-2">
                <tr>
                    <td class="f-w-b" style="width: 40%;">Udyam Registration / IEM No. Part-II : E.M. No and Date :</td>
                    <td>{{udyam_registration}}</td>
                </tr>
                <tr>
                    <td class="f-w-b">Details of Registrations as applicable</td>
                    <td>{{regi_details}}</td>
                </tr>
            </table>
            <div class="row">
                <div class="col-sm-12">
                    <label>ROC / Firm Registration Certificate / CIN No. / TIN No./ PAN No. GST No. Other registrations</label>
                </div>
            </div>
            <table class="table table-bordered table-padding bg-beige mb-2">
                <tr>
                    <td class="f-w-b" style="width: 40%;">CIN No.</td>
                    <td>{{ur_cin_no}}</td>
                </tr>
                <tr>
                    <td class="f-w-b">CIN Document</td>
                    <td>
                        <div id="upload_name_container_for_ips_{{VALUE_THIRTEEN}}" style="display: none;">
                            <a target="_blank" id="upload_name_href_for_ips_{{VALUE_THIRTEEN}}" class="cursor-pointer">
                                <label class="btn btn-sm btn-nic-blue f-w-n cursor-pointer"><i class="fas fa-eye"></i> &nbsp; {{VIEW_UPLODED_DOCUMENT}}</label>
                            </a>
                        </div>
                    </td>
                </tr>
            </table>
            <table class="table table-bordered table-padding bg-beige mb-2">
                <tr>
                    <td class="f-w-b" style="width: 40%;">TIN No.</td>
                    <td>{{ur_tin_no}}</td>
                </tr>
                <tr>
                    <td class="f-w-b">TIN Document</td>
                    <td>
                        <div id="upload_name_container_for_ips_{{VALUE_FOURTEEN}}" style="display: none;">
                            <a target="_blank" id="upload_name_href_for_ips_{{VALUE_FOURTEEN}}" class="cursor-pointer">
                                <label class="btn btn-sm btn-nic-blue f-w-n cursor-pointer"><i class="fas fa-eye"></i> &nbsp; {{VIEW_UPLODED_DOCUMENT}}</label>
                            </a>
                        </div>
                    </td>
                </tr>
            </table>
            <table class="table table-bordered table-padding bg-beige mb-2">
                <tr>
                    <td class="f-w-b" style="width: 40%;">PAN No.</td>
                    <td>{{ur_pan_no}}</td>
                </tr>
                <tr>
                    <td class="f-w-b">PAN Document</td>
                    <td>
                        <div id="upload_name_container_for_ips_{{VALUE_FIFTEEN}}" style="display: none;">
                            <a target="_blank" id="upload_name_href_for_ips_{{VALUE_FIFTEEN}}" class="cursor-pointer">
                                <label class="btn btn-sm btn-nic-blue f-w-n cursor-pointer"><i class="fas fa-eye"></i> &nbsp; {{VIEW_UPLODED_DOCUMENT}}</label>
                            </a>
                        </div>
                    </td>
                </tr>
            </table>
            <table class="table table-bordered table-padding bg-beige mb-2">
                <tr>
                    <td class="f-w-b" style="width: 40%;">GST No.</td>
                    <td>{{ur_gst_no}}</td>
                </tr>
                <tr>
                    <td class="f-w-b">GST Document</td>
                    <td>
                        <div id="upload_name_container_for_ips_{{VALUE_SIXTEEN}}" style="display: none;">
                            <a target="_blank" id="upload_name_href_for_ips_{{VALUE_SIXTEEN}}" class="cursor-pointer">
                                <label class="btn btn-sm btn-nic-blue f-w-n cursor-pointer"><i class="fas fa-eye"></i> &nbsp; {{VIEW_UPLODED_DOCUMENT}}</label>
                            </a>
                        </div>
                    </td>
                </tr>
            </table>
            <table class="table table-bordered table-padding bg-beige mb-2">
                <tr>
                    <td class="f-w-b" style="width: 40%;">Other registrations No.</td>
                    <td>{{ur_other_reg_no}}</td>
                </tr>
                <tr>
                    <td class="f-w-b">Other registrations Document</td>
                    <td>
                        <div id="upload_name_container_for_ips_{{VALUE_SEVENTEEN}}" style="display: none;">
                            <a target="_blank" id="upload_name_href_for_ips_{{VALUE_SEVENTEEN}}" class="cursor-pointer">
                                <label class="btn btn-sm btn-nic-blue f-w-n cursor-pointer"><i class="fas fa-eye"></i> &nbsp; {{VIEW_UPLODED_DOCUMENT}}</label>
                            </a>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <div class="card">
        <div class="card-header bg-nic-blue p-2">
            <h3 class="card-title f-w-b f-s-14px">Manufacturing Unit / Service Unit Details</h3>
            <div class="card-tools">
                <button type="button" class="btn btn-tool" data-card-widget="collapse">
                    <i class="fas fa-minus text-white"></i>
                </button>
            </div>
        </div>
        <div class="card-body border-nic-blue">
            <div class="table-responsive">
                <table class="table table-bordered table-padding bg-beige mb-0">
                    <tr>
                        <td class="f-w-b" style="width: 40%;">Name of Manufacturing Unit / Service Unit</td>
                        <td>{{manu_name}}</td>
                    </tr>
                    <tr>
                        <td class="f-w-b">Main Unit/Plant Address</td>
                        <td>{{main_plant_address}}</td>
                    </tr>
                    <tr>
                        <td class="f-w-b">Office Address</td>
                        <td>{{office_address}}</td>
                    </tr>
                    <tr>
                        <td class="f-w-b">Latitude</td>
                        <td>{{latitude}}</td>
                    </tr>
                    <tr>
                        <td class="f-w-b">Longitude</td>
                        <td>{{longitude}}</td>
                    </tr>
                </table>
            </div>
            {{#if show_map}}
            <div class="row">
                <div class="col-12">
                    <div id="map_container_for_ips_view" style="height: 250px;"></div>
                </div>
            </div>
            {{/if}}
        </div>
    </div>
    <div class="table-responsive">
        <table class="table table-bordered table-padding bg-beige">
            <tr>
                <td class="f-w-b" style="width: 40%;">Constitution of Firm</td>
                <td>{{constitution_text}}</td>
            </tr>
            <tr>
                <td class="f-w-b">Category of Unit</td>
                <td>{{unit_category_text}}</td>
            </tr>
            {{#if show_unit_category_one}}
            <tr>
                <td class="f-w-b">Category</td>
                <td>{{msme_category_text}} </td>
            </tr>
<!--            <tr>
                <td class="f-w-b">Document for Ips</td>
                <td>
                    <div id="upload_name_container_for_ips_{{VALUE_ONE}}" style="display: none;">
                        <a target="_blank" id="upload_name_href_for_ips_{{VALUE_ONE}}" class="cursor-pointer">
                            <label class="btn btn-sm btn-nic-blue f-w-n cursor-pointer"><i class="fas fa-eye"></i> &nbsp; {{VIEW_UPLODED_DOCUMENT}}</label>
                        </a>
                    </div>
                </td>
            </tr>-->
            {{/if}}
            {{#if show_unit_category_two}}
<!--            <tr>
                <td class="f-w-b">Document for NON Ips</td>
                <td>
                    <div id="upload_name_container_for_ips_{{VALUE_TWO}}" style="display: none;">
                        <a target="_blank" id="upload_name_href_for_ips_{{VALUE_TWO}}" class="cursor-pointer">
                            <label class="btn btn-sm btn-nic-blue f-w-n cursor-pointer"><i class="fas fa-eye"></i> &nbsp; {{VIEW_UPLODED_DOCUMENT}}</label>
                        </a>
                    </div>
                </td>
            </tr>-->
            {{/if}}
        </table>
    </div>
    <div class="table-responsive">
        <table class="table table-bordered table-padding bg-beige">
            <tr>
                <td class="f-w-b" style="width: 40%;">Entrepreneur Category</td>
                <td>{{entrepreneur_category_text}} {{birth_date_text}}</td>
            </tr>
            {{#if show_entrepreneur_category_dob_details}}
            <tr>
                <td class="f-w-b">Birth Date</td>
                <td>{{birth_date_text}}</td>
            </tr>
            <tr>
                <td class="f-w-b">DOB Proof</td>
                <td>
                    <div id="upload_name_container_for_ips_{{VALUE_THREE}}" style="display: none;">
                        <a target="_blank" id="upload_name_href_for_ips_{{VALUE_THREE}}" class="cursor-pointer">
                            <label class="btn btn-sm btn-nic-blue f-w-n cursor-pointer"><i class="fas fa-eye"></i> &nbsp; {{VIEW_UPLODED_DOCUMENT}}</label>
                        </a>
                    </div>
                </td>
            </tr>
            {{/if}}
        </table>
    </div>
    <div class="table-responsive">
        <table class="table table-bordered table-padding bg-beige">
            <tr>
                <td class="f-w-b" style="width: 40%;">Type of Unit</td>
                <td>{{unit_type_text}}</td>
            </tr>
            {{#if show_unit_type_three}}
            <tr>
                <td class="f-w-b">Manufacturing units which undertakes Expansion</td>
                <td>{{manufacuring_unit}}</td>
            </tr>
            <tr>
                <td class="f-w-b">Diversification (Manufacturing)</td>
                <td>{{diversification_unit}}</td>
            </tr>
            {{/if}}
            {{#if show_unit_type_four}}
            <tr>
                <td class="f-w-b">Service units which undertakes Expansion</td>
                <td>{{service_unit}}</td>
            </tr>
            <tr>
                <td class="f-w-b">Diversification (Service)</td>
                <td>{{diversification_service}}</td>
            </tr>
            {{/if}}
        </table>
    </div>
    <div class="table-responsive">
        <table class="table table-bordered table-padding bg-beige">
            <tr>
                <td class="f-w-b" style="width: 40%;">Sector Category </td>
                <td>{{sector_category_text}}</td>
            </tr>
            <tr>
                <td class="f-w-b">Thrust Sectors (if Applicable)</td>
                <td>{{thrust_sectors_text}}</td>
            </tr>
            <tr>
                <td class="f-w-b">Date of Commencement of the Commercial Production / Service</td>
                <td>{{commencement_date_text}}</td>
            </tr>
            <tr>
                <td class="f-w-b">Gross Fixed Capital Investment ((GFCI))</td>
                <td>{{gfc_investment}}</td>
            </tr>
        </table>
    </div>
    <div class="card">
        <div class="card-header bg-nic-blue p-2">
            <h3 class="card-title f-w-b f-s-14px">List of Documents to be Submitted Along with Common Application Form</h3>
            <div class="card-tools">
                <button type="button" class="btn btn-tool" data-card-widget="collapse">
                    <i class="fas fa-minus text-white"></i>
                </button>
            </div>
        </div>
        <div class="card-body pb-0 border-nic-blue">
            <div class="table-responsive">
                <table class="table table-bordered table-hover mb-2">
                    <thead>
                        <tr class="bg-light-gray">
                            <th class="text-center" style="width: 50px;">No.</th>
                            <th class="text-center" style="min-width: 250px;">Document Name</th>
                            <th class="text-center" style="width: 220px;">Document</th>
                        </tr>
                        <tr>
                            <td class="text-center view-doc-sr-no"></td>
                            <td class="f-w-b">Copy of Udyam Registration / Industrial Entrepreneur Memorandum, as applicable.</td>
                            <td class="text-center">
                                <div id="upload_name_container_for_ips_{{VALUE_FOUR}}" style="display: none;">
                                    <a target="_blank" id="upload_name_href_for_ips_{{VALUE_FOUR}}" class="cursor-pointer">
                                        <label class="btn btn-sm btn-nic-blue f-w-n cursor-pointer"><i class="fas fa-eye"></i> &nbsp; {{VIEW_UPLODED_DOCUMENT}}</label>
                                    </a>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-center view-doc-sr-no"></td>
                            <td class="f-w-b">Copy of Partnership Deed and Firm Registration Certificate in case ofs
                                partnership concern or Memorandum & Articles of Association and Date
                                of Incorporation Certificate in case of Public/Private Limited companies.</td>
                            <td class="text-center">
                                <div id="upload_name_container_for_ips_{{VALUE_FIVE}}" style="display: none;">
                                    <a target="_blank" id="upload_name_href_for_ips_{{VALUE_FIVE}}" class="cursor-pointer">
                                        <label class="btn btn-sm btn-nic-blue f-w-n cursor-pointer"><i class="fas fa-eye"></i> &nbsp; {{VIEW_UPLODED_DOCUMENT}}</label>
                                    </a>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-center view-doc-sr-no"></td>
                            <td class="f-w-b">A) If the Enterprise is functioning in its own land, copy of land purchase
                                deed duly signed by the applicant.<br>
                                B) If the Enterprise is functioning in a leased land/ building, copy of
                                registered lease agreement for a minimum period of 5 years from the date
                                of commencement of commercial production.
                            </td>
                            <td class="text-center">
                                <div id="upload_name_container_for_ips_{{VALUE_SIX}}" style="display: none;">
                                    <a target="_blank" id="upload_name_href_for_ips_{{VALUE_SIX}}" class="cursor-pointer">
                                        <label class="btn btn-sm btn-nic-blue f-w-n cursor-pointer"><i class="fas fa-eye"></i> &nbsp; {{VIEW_UPLODED_DOCUMENT}}</label>
                                    </a>
                                </div>
                            </td>
                        </tr>
<!--                        <tr>
                            <td class="text-center view-doc-sr-no"></td>
                            <td class="f-w-b">
                                If the Enterprise is functioning in a leased land/ building, copy of
                                registered lease agreement for a minimum period of 5 years from the date
                                of commencement of commercial production. 
                            </td>
                            <td class="text-center">
                                <div id="upload_name_container_for_ips_{{VALUE_SEVEN}}" style="display: none;">
                                    <a target="_blank" id="upload_name_href_for_ips_{{VALUE_SEVEN}}" class="cursor-pointer">
                                        <label class="btn btn-sm btn-nic-blue f-w-n cursor-pointer"><i class="fas fa-eye"></i> &nbsp; {{VIEW_UPLODED_DOCUMENT}}</label>
                                    </a>
                                </div>
                            </td>
                        </tr>-->
                        <tr>
                            <td class="text-center view-doc-sr-no"></td>
                            <td class="f-w-b">Copy of sanction order from Electricity Department for power supply
                                with copy of the latest bill.</td>
                            <td class="text-center">
                                <div id="upload_name_container_for_ips_{{VALUE_EIGHT}}" style="display: none;">
                                    <a target="_blank" id="upload_name_href_for_ips_{{VALUE_EIGHT}}" class="cursor-pointer">
                                        <label class="btn btn-sm btn-nic-blue f-w-n cursor-pointer"><i class="fas fa-eye"></i> &nbsp; {{VIEW_UPLODED_DOCUMENT}}</label>
                                    </a>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-center view-doc-sr-no"></td>
                            <td class="f-w-b">Authorization letter.</td>
                            <td class="text-center">
                                <div id="upload_name_container_for_ips_{{VALUE_NINE}}" style="display: none;">
                                    <a target="_blank" id="upload_name_href_for_ips_{{VALUE_NINE}}" class="cursor-pointer">
                                        <label class="btn btn-sm btn-nic-blue f-w-n cursor-pointer"><i class="fas fa-eye"></i> &nbsp; {{VIEW_UPLODED_DOCUMENT}}</label>
                                    </a>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-center view-doc-sr-no"></td>
                            <td class="f-w-b">Copy of Consent to Operate / Renewal from PCC, DNH & DD (as applicable for
                                Notification No. PCC/DMN/13(PART VI)/2020-21/448 DATED
                                25/01/2021).</td>
                            <td class="text-center">
                                <div id="upload_name_container_for_ips_{{VALUE_TEN}}" style="display: none;">
                                    <a target="_blank" id="upload_name_href_for_ips_{{VALUE_TEN}}" class="cursor-pointer">
                                        <label class="btn btn-sm btn-nic-blue f-w-n cursor-pointer"><i class="fas fa-eye"></i> &nbsp; {{VIEW_UPLODED_DOCUMENT}}</label>
                                    </a>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-center view-doc-sr-no"></td>
                            <td class="f-w-b">Copy of Factory licensee.</td>
                            <td class="text-center">
                                <div id="upload_name_container_for_ips_{{VALUE_ELEVEN}}" style="display: none;">
                                    <a target="_blank" id="upload_name_href_for_ips_{{VALUE_ELEVEN}}" class="cursor-pointer">
                                        <label class="btn btn-sm btn-nic-blue f-w-n cursor-pointer"><i class="fas fa-eye"></i> &nbsp; {{VIEW_UPLODED_DOCUMENT}}</label>
                                    </a>
                                </div>
                            </td>
                        </tr>
<!--                        <tr>
                            <td class="text-center view-doc-sr-no"></td>
                            <td class="f-w-b">Other Statutory clearances/Licenses, as applicable.</td>
                            <td class="text-center">
                                <div id="upload_name_container_for_ips_{{VALUE_TWELVE}}" style="display: none;">
                                    <a target="_blank" id="upload_name_href_for_ips_{{VALUE_TWELVE}}" class="cursor-pointer">
                                        <label class="btn btn-sm btn-nic-blue f-w-n cursor-pointer"><i class="fas fa-eye"></i> &nbsp; {{VIEW_UPLODED_DOCUMENT}}</label>
                                    </a>
                                </div>
                            </td>
                        </tr>-->
                        <tr>
                            <td class="text-center view-doc-sr-no"></td>
                            <td class="f-w-b">Undertaking.</td>
                            <td class="text-center">
                                <div id="upload_name_container_for_ips_{{VALUE_EIGHTEEN}}" style="display: none;">
                                    <a target="_blank" id="upload_name_href_for_ips_{{VALUE_EIGHTEEN}}" class="cursor-pointer">
                                        <label class="btn btn-sm btn-nic-blue f-w-n cursor-pointer"><i class="fas fa-eye"></i> &nbsp; {{VIEW_UPLODED_DOCUMENT}}</label>
                                    </a>
                                </div>
                            </td>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
    <div class="card">
        <div class="card-header bg-nic-blue p-2">
            <h3 class="card-title f-w-b f-s-14px">CHECK LIST OF ENCLOSURES (AS APPLICABLE) TO BE SUBMITTED FOR SUBSIDY UNDER SCHEME</h3>
            <div class="card-tools">
                <button type="button" class="btn btn-tool" data-card-widget="collapse">
                    <i class="fas fa-minus text-white"></i>
                </button>
            </div>
        </div>
        <div class="card-body pb-0 border-nic-blue">
            <div class="table-responsive">
                <table class="table table-bordered table-hover">
                    <thead>
                        <tr class="bg-light-gray">
                            <th class="text-center" style="width: 50px;">No.</th>
                            <th class="text-center" style="min-width: 250px;">Document Name</th>
                            <th class="text-center" style="width: 220px;">Document</th>
                        </tr>
                    </thead>
                    <tbody id="doc_item_container_for_view_incentives"></tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="card">
        <div class="card-header bg-nic-blue p-2">
            <h3 class="card-title f-w-b f-s-14px">OTHER DOCUMENTS (IF REQUIRE)</h3>
        </div>
        <div class="card-body pb-0 border-nic-blue">
            <div class="table-responsive">
                <table class="table table-bordered table-hover">
                    <thead>
                        <tr class="bg-light-gray">
                            <th class="text-center" style="width: 50px;">No.</th>
                            <th class="text-center" style="min-width: 250px;">Document Name</th>
                            <th class="text-center" style="width: 220px;">Document</th>
                        </tr>
                    </thead>
                    <tbody id="od_item_container_for_view_incentives"></tbody>
                </table>
            </div>
        </div>
    </div>
</div>
<div class="card-footer text-right">
    <button type="button" class="btn btn-sm btn-danger" onclick="Swal.close();">
        <i class="fas fa-times"></i> &nbsp; Close
    </button>
</div>
