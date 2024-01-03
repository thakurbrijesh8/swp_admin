<div class="row">
    <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <!-- <h3 class="card-title" style="float: none; text-align: center;">PART A</h3> -->
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">APPLICATION FORM FOR</div>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">FOR INVESTMENT PROMOTION SCHEME - 2015 FOR Textile Sector </div>
            </div>
            <form role="form" id="textile_form" name="textile_form" onsubmit="return false;">
                
                <input type="hidden" id="incentive_id" name="incentive_id" value="{{textile_data.incentive_id}}">
                <div class="card-body">
                     <div class="row">
                      <div class="form-group col-sm-6">
                  <label>1. District <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                 <select id="district" name="district" class="form-control select2"
                                    data-placeholder="Select District" style="width: 100%;" >
                            </select>
                            </div>
                            <span class="error-message error-message-textile-district"></span>
                        </div>
                        </div>
                    <div class="row">
                        <div class="col-sm-12 text-center">
                            <span class="error-message error-message-textile f-w-b" style="border-bottom: 2px solid red;"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>1.1 Name of the Enterprise<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="enterprise_name" name="enterprise_name" class="form-control" placeholder="Enter Name of the Enterprise !"
                                       maxlength="100" onblur="checkValidation('textile', 'enterprise_name', enterpriseNameValidationMessage);" value="{{textile_data.enterprise_name}}">
                            </div>
                            <span class="error-message error-message-textile-enterprise_name"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>2. Office Address with pin code No. <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="office_address" name="office_address" class="form-control" placeholder="Enter Office Address with pin code No. !" maxlength="100" onblur="checkValidation('textile', 'office_address', officeAddressValidationMessage);">{{textile_data.office_address}}</textarea>
                            </div>
                            <span class="error-message error-message-textile-office_address"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>2.1 Factory Address with pin code No. <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="factory_address" name="factory_address" class="form-control" placeholder="Enter Factory Address with pin code No. !" maxlength="100" onblur="checkValidation('textile', 'factory_address', factoryAddressValidationMessage);">{{textile_data.factory_address}}</textarea>
                            </div>
                            <span class="error-message error-message-textile-factory_address"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>2.2 Office Contact No. <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="office_contactno" name="office_contactno" class="form-control" placeholder="Enter Office Contact No. !" onkeyup="checkNumeric($(this));" maxlength="100" onblur="checkValidation('textile', 'office_contactno', officeContactNoValidationMessage);" value="{{textile_data.office_contactno}}">
                            </div>
                            <span class="error-message error-message-textile-office_contactno"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>2.3 Factory Contact No. <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="factory_contactno" name="factory_contactno" class="form-control" placeholder="Enter Factory Contact No. !" maxlength="100" onkeyup="checkNumeric($(this));" onblur="checkValidation('textile', 'factory_contactno', factoryContactNoValidationMessage);" value="{{textile_data.factory_contactno}}">
                            </div>
                            <span class="error-message error-message-textile-factory_contactno"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label>2.4 Fax </label>
                            <div class="input-group">
                                <input type="text" id="fax" name="fax" class="form-control" placeholder="Enter Fax !" maxlength="100" onblur="checkValidation('textile', 'fax', faxValidationMessage);" value="{{textile_data.fax}}" onkeyup="checkNumeric($(this));">
                            </div>
                            <span class="error-message error-message-textile-fax"></span>
                        </div>
                        <div class="form-group col-sm-4">
                            <label>2.5 Cell Phone </label>
                            <div class="input-group">
                                <input type="text" id="cellphone" name="cellphone" class="form-control" placeholder="Enter Cell Phone !" maxlength="100" onblur="checkValidationForMobileNumber('textile', 'cellphone', cellPhnoValidationMessage);" value="{{textile_data.cellphone}}" onkeyup="checkNumeric($(this));">
                            </div>
                            <span class="error-message error-message-textile-cellphone"></span>
                        </div>
                        <div class="form-group col-sm-4">
                            <label>2.6 Email<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="email" name="email" class="form-control" placeholder="Enter Email !" maxlength="100" onblur="checkValidationForEmail('textile', 'email', emailValidationMessage);" value="{{textile_data.email}}">
                            </div>
                            <span class="error-message error-message-textile-email"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>3. Constitution of the Enterprise<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="radio" id="propritorship" name="constitution" class="" value="{{VALUE_ONE}}" >&nbsp; Propritorship
                                &emsp;
                                <input type="radio" id="partnership" name="constitution" class="" style="margin-bottom: 0px;" value="{{VALUE_TWO}}" >&nbsp;Partnership
                                &emsp;
                                <input type="radio" id="company" name="constitution" class="" style="margin-bottom: 0px;"
                                value="{{VALUE_THREE}}" >&nbsp;Company
                                &emsp;
                                <input type="radio" id="society" name="constitution" class="" style="margin-bottom: 0px;"
                                value="{{VALUE_FOUR}}" >&nbsp;Society
                                &emsp;
                                <input type="radio" id="others" name="constitution" class="" style="margin-bottom: 0px;"
                                value="{{VALUE_FIVE}}" >&nbsp;Others
                            </div>
                            <span class="error-message error-message-textile-constitution"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>4. Name,Designation & Contact Details of the Promoter <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="promoters_details" name="promoters_details" class="form-control" placeholder="Enter Name,Designation & Contact Details of the Promoter !" maxlength="100" onblur="checkValidation('textile', 'promoters_details', promotersDetailValidationMessage);">{{textile_data.promoters_details}}</textarea>
                            </div>
                            <span class="error-message error-message-textile-promoters_details"></span>
                        </div>
                    </div>
                    <span class="box-title f-w-b page-header m-b-0">4. Social Status of the Entrepreneur </span>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <input type="checkbox" id="is_women_entrepreneur" name="is_women_entrepreneur" class="checkbox" value="{{is_checked}}"> 4.1 &nbsp;Women
                            <span class="error-message error-message-textile-is_women_entrepreneur"></span>
                        </div>
                        <div class="form-group col-sm-6 women_entrepreneur_div" id="women_entrepreneur_container_for_textile" style="display: none;">
                            <label>Please Upload document<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload PDF Only)</span></label><br>
                            <input type="file" id="women_entrepreneur_for_textile" name="women_entrepreneur_for_textile"
                                   accept="application/pdf,image/pdf">
                            <div class="error-message error-message-textile-women_entrepreneur_for_textile"></div>
                        </div>
                        <div class="form-group col-sm-6" id="women_entrepreneur_name_container_for_textile" style="display: none;">
                            <label>Upload document<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload PDF Only)</span></label><br>
                            <a id="women_entrepreneur_name_image_for_textile_download" download><label id="women_entrepreneur_name_image_for_textile" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <input type="checkbox" id="is_sc_st_entrepreneur" name="is_sc_st_entrepreneur" class="checkbox" value="{{is_checked}}"> 4.2 &nbsp;SC/ST
                            <span class="error-message error-message-textile-is_sc_st_entrepreneur"></span>
                        </div>
                        <div class="form-group col-sm-6 sc_st_entrepreneur_div" id="sc_st_entrepreneur_container_for_textile" style="display: none;">
                            <label>Please Upload document<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload PDF Only)</span></label><br>
                            <input type="file" id="sc_st_entrepreneur_for_textile" name="sc_st_entrepreneur_for_textile"
                                   accept="application/pdf,image/pdf">
                            <div class="error-message error-message-textile-sc_st_entrepreneur_for_textile"></div>
                        </div>
                        <div class="form-group col-sm-6" id="sc_st_entrepreneur_name_container_for_textile" style="display: none;">
                            <label>Upload document<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload PDF Only)</span></label><br>
                            <a id="sc_st_entrepreneur_name_image_for_textile_download" download><label id="sc_st_entrepreneur_name_image_for_textile" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <input type="checkbox" id="is_physically_entrepreneur" name="is_physically_entrepreneur" class="checkbox" value="{{is_checked}}"> 4.3 &nbsp;Physically Disabled
                            <span class="error-message error-message-textile-is_physically_entrepreneur"></span>
                        </div>
                        <div class="form-group col-sm-6 physically_entrepreneur_div" id="physically_entrepreneur_container_for_textile" style="display: none;">
                            <label>Please Upload document<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload PDF Only)</span></label><br>
                            <input type="file" id="physically_entrepreneur_for_textile" name="physically_entrepreneur_for_textile"
                                   accept="application/pdf,image/pdf">
                            <div class="error-message error-message-textile-physically_entrepreneur_for_textile"></div>
                        </div>
                        <div class="form-group col-sm-6" id="physically_entrepreneur_name_container_for_textile" style="display: none;">
                            <label>Upload document<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload PDF Only)</span><br>
                            <a id="physically_entrepreneur_name_image_for_textile_download" download><label id="physically_entrepreneur_name_image_for_textile" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <input type="checkbox" id="is_transgender_entrepreneur" name="is_transgender_entrepreneur" class="checkbox" value="{{is_checked}}"> 4.4 &nbsp;Transgender
                            <span class="error-message error-message-textile-is_transgender_entrepreneur"></span>
                        </div>
                        <div class="form-group col-sm-6 transgender_entrepreneur_div" id="transgender_entrepreneur_container_for_textile" style="display: none;">
                            <label>Please Upload document<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload PDF Only)</span></label><br>
                            <input type="file" id="transgender_entrepreneur_for_textile" name="transgender_entrepreneur_for_textile"
                                   accept="application/pdf,image/pdf">
                            <div class="error-message error-message-textile-transgender_entrepreneur_for_textile"></div>
                        </div>
                        <div class="form-group col-sm-6" id="transgender_entrepreneur_name_container_for_textile" style="display: none;">
                            <label>Upload document<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload PDF Only)</span></label><br>
                            <a id="transgender_entrepreneur_name_image_for_textile_download" download><label id="transgender_entrepreneur_name_image_for_textile" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <input type="checkbox" id="is_other_entrepreneur" name="is_other_entrepreneur" class="checkbox" value="{{is_checked}}"> 4.5 &nbsp;Others
                            <br/><span class="error-message error-message-textile-is_other_entrepreneur"></span>
                        </div>
                        <div class="form-group col-sm-6 other_entrepreneur_div" id="other_entrepreneur_container_for_textile" style="display: none;">
                            <label>Please Upload document<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload PDF Only)</span></label><br>
                            <input type="file" id="other_entrepreneur_for_textile" name="other_entrepreneur_for_textile"
                                   accept="application/pdf,image/pdf">
                            <div class="error-message error-message-textile-other_entrepreneur_for_textile"></div>
                        </div>
                        <div class="form-group col-sm-6" id="other_entrepreneur_name_container_for_textile" style="display: none;">
                            <label>Upload document<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload PDF Only)</span></label><br>
                            <a id="other_entrepreneur_name_image_for_textile_download" download><label id="other_entrepreneur_name_image_for_textile" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row proprietor_share_div" style="display: none;">
                        <div class="form-group col-sm-12">  
                            <div style="background-color: #d2d6de; padding: 5px;">
                                <span class="f-w-b" style="font-size: 15px; color: #000;">5. If Women / SC , ST / Physically Disabled / Transgender, please indicate % share of the Proprietor / Partner(s) / Director(s) in the equity </span>
                                <hr>
                                <table class="table table-bordered m-b-0px" id="proprietorShareList" style="margin-top: 10px;text-align: center;">
                                    <thead>
                                        <tr style='color: #000;'>
                                            <th></th>
                                            <th>Name</th>
                                            <th>Sex</th>
                                            <th>Community</th>
                                            <th>P.H.</th>
                                            <th>Share</th>
                                            <th>Value</th>
                                            <th>%</th>
                                        </tr>
                                    </thead>
                                    <tbody id="proprietor_share_info_container">
                                    </tbody>
                                </table>
                            </div>
                            <div class="box-footer" align="right" >
                                <button type="button" class="btn btn-sm btn-nic-blue float-right" id="submit_btn_for_proprietor_share" onclick="Textile.listview.addProprietorShare({});" style="margin-right: 5px;margin-top: 5px;"><i class="fas fa-plus-circle" style="margin-right: 5px;"></i>Add Proprietor share
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>6. Name,Designation & Contact Details of the Authorized Person <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="othorized_person_detail" name="othorized_person_detail" class="form-control" placeholder="Enter Name,Designation & Contact Details of the Authorized Person !" maxlength="100" onblur="checkValidation('textile', 'othorized_person_detail', othorizedPersonDetailValidationMessage);">{{textile_data.othorized_person_detail}}</textarea>
                            </div>
                            <span class="error-message error-message-textile-othorized_person_detail"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>7. Type of the Unit <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="radio" id="micro" name="unit_type" class="" value="{{VALUE_ONE}}" >&nbsp; Micro
                                &emsp;
                                <input type="radio" id="small" name="unit_type" class="" style="margin-bottom: 0px;" value="{{VALUE_TWO}}" >&nbsp;Small
                                &emsp;
                                <input type="radio" id="medium" name="unit_type" class="" style="margin-bottom: 0px;"
                                value="{{VALUE_THREE}}" >&nbsp;Medium
                            </div>
                            <span class="error-message error-message-textile-unit_type"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>8. Category of the Enterprise <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="radio" id="new" name="category" class="" value="{{VALUE_ONE}}" >&nbsp; New
                                &emsp;
                                <input type="radio" id="expansion" name="category" class="" style="margin-bottom: 0px;" value="{{VALUE_TWO}}" >&nbsp;Expansion
                            </div>
                            <span class="error-message error-message-textile-category"></span>
                        </div>
                    </div>
                    <span class="box-title f-w-b page-header m-b-0">9. E.M. No. & Date (Acknowledgement No. of EM Part I & II) </span>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>9.1 Part i E.M. No.<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="emno_part1" name="emno_part1" class="form-control" placeholder="Enter Part i E.M. No. !" maxlength="100" onkeyup="checkNumeric($(this));" onblur="checkValidation('textile', 'emno_part1', emNoValidationMessage);" value="{{textile_data.emno_part1}}">
                            </div>
                            <span class="error-message error-message-textile-emno_part1"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>9.2 Part i E.M. Date<span style="color: red;">*</span></label>
                            <div class="input-group date">
                                <input type="text" name="emdate_part1" id="emdate_part1" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                                       value="{{emdate_part1}}" onblur="checkValidation('textile', 'emdate_part1', emDateValidationMessage);">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-textile-emdate_part1"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>9.3 Part ii E.M. No.<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="emno_part2" name="emno_part2" class="form-control" placeholder="Enter Part ii E.M. No. !" maxlength="100" onblur="checkValidation('textile', 'emno_part2', emNoValidationMessage);" value="{{textile_data.emno_part2}}">
                            </div>
                            <span class="error-message error-message-textile-emno_part2"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>9.4 Part ii E.M. Date<span style="color: red;">*</span></label>
                            <div class="input-group date">
                                <input type="text" name="emdate_part2" id="emdate_part2" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                                       value="{{emdate_part2}}" onblur="checkValidation('textile', 'emdate_part2', emDateValidationMessage);">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-textile-emdate_part2"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>9.5 Manufacturing items<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="manufacturing_items" name="manufacturing_items" class="form-control" placeholder="Enter Manufacturing items!" maxlength="100" onblur="checkValidation('textile', 'manufacturing_items', manufacturingItemValidationMessage);">{{textile_data.manufacturing_items}}</textarea>
                            </div>
                            <span class="error-message error-message-textile-manufacturing_items"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>9.6 Annual production capacity (In MT p.a.)<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="annual_capacity" name="annual_capacity" class="form-control" placeholder="Enter annual production capacity !" maxlength="100" onkeyup="checkNumeric($(this));" onblur="checkValidation('textile', 'annual_capacity', annualCapacityValidationMessage);" value="{{textile_data.annual_capacity}}">
                            </div>
                            <span class="error-message error-message-textile-annual_capacity"></span>
                        </div>
                    </div>
                    <span class="box-title f-w-b page-header m-b-0">10. PCC approval for NOC / Consent </span>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>10.1 Approval / Consent No.<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="approval_no" name="approval_no" class="form-control" placeholder="Enter Approval / Consent No. !" maxlength="100" onblur="checkValidation('textile', 'approval_no', approvalNoValidationMessage);" value="{{textile_data.approval_no}}">
                            </div>
                            <span class="error-message error-message-textile-approval_no"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>10.2 Date<span style="color: red;">*</span></label>
                            <div class="input-group date">
                                <input type="text" name="pccno_date" id="pccno_date" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                                       value="{{pccno_date}}" onblur="checkValidation('textile', 'pccno_date', pccDateValidationMessage);">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-textile-pccno_date"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>10.3 Valid upto Date<span style="color: red;">*</span></label>
                            <div class="input-group date">
                                <input type="text" name="pccno_validupto_date" id="pccno_validupto_date" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                                       value="{{pccno_validupto_date}}" onblur="checkValidation('textile', 'pccno_validupto_date', pccValidUptoDateValidationMessage);">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-textile-pccno_validupto_date"></span>
                        </div>   
                    </div>
                    <span class="box-title f-w-b page-header m-b-0">11. Details of Factory License / Establishment Registration </span>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>11.1 Registration No.<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="factory_registration_no" name="factory_registration_no" class="form-control" placeholder="Enter Registration No. !" maxlength="100" onblur="checkValidation('textile', 'factory_registration_no', factoryNoValidationMessage);" value="{{textile_data.factory_registration_no}}">
                            </div>
                            <span class="error-message error-message-textile-factory_registration_no"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>11.2 Date<span style="color: red;">*</span></label>
                            <div class="input-group date">
                                <input type="text" name="establishment_date" id="establishment_date" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                                       value="{{establishment_date}}" onblur="checkValidation('textile', 'establishment_date', establishmentsDateValidationMessage);">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-textile-establishment_date"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>11.3 Valid upto Date<span style="color: red;">*</span></label>
                            <div class="input-group date">
                                <input type="text" name="establishment_validupto_date" id="establishment_validupto_date" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                                       value="{{establishment_validupto_date}}" onblur="checkValidation('textile', 'establishment_validupto_date', establishmentValidUptoDateValidationMessage);">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-textile-establishment_validupto_date"></span>
                        </div>   
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>12. Date of commencement of Commercial Production<span style="color: red;">*</span></label>
                            <div class="input-group date">
                                <input type="text" name="commencement_date" id="commencement_date" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                                       value="{{commencement_date}}" onblur="checkValidation('textile', 'commencement_date', commencementDateValidationMessage);">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-textile-commencement_date"></span>
                        </div>
                    </div>
                    <span class="box-title f-w-b page-header m-b-0">13. Annual Turnover (Actual/Estimated)<span class="color-nic-red">*</span></span>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>13.1 Year - {{previousYear}}<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="annual_turnover" name="annual_turnover" class="form-control" placeholder="Enter Annual Turnover of the Year {{previousYear}}" maxlength="100" onblur="checkValidation('textile', 'annual_turnover', turnoverValidationMessage);" value="{{textile_data.annual_turnover}}">
                            </div>
                            <span class="error-message error-message-textile-annual_turnover"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>13.2 Year - {{previousYearOne}}<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="annual_turnover_one" name="annual_turnover_one" class="form-control" placeholder="Enter Annual Turnover of the Year {{previousYearOne}}" maxlength="100" onblur="checkValidation('textile', 'annual_turnover_one', turnoverValidationMessage);" value="{{textile_data.annual_turnover_one}}">
                            </div>
                            <span class="error-message error-message-textile-annual_turnover_one"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>13.3 Year - {{previousYearTwo}}<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="annual_turnover_two" name="annual_turnover_two" class="form-control" placeholder="Enter Annual Turnover of the Year {{previousYearTwo}}" maxlength="100" onblur="checkValidation('textile', 'annual_turnover_two', turnoverValidationMessage);" value="{{textile_data.annual_turnover_two}}">
                            </div>
                            <span class="error-message error-message-textile-annual_turnover_two"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>13.4 Year - {{previousYearThree}}<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="annual_turnover_three" name="annual_turnover_three" class="form-control" placeholder="Enter Annual Turnover of the Year {{previousYearThree}}" maxlength="100" onblur="checkValidation('textile', 'annual_turnover_three', turnoverValidationMessage);" value="{{textile_data.annual_turnover_three}}">
                            </div>
                            <span class="error-message error-message-textile-annual_turnover_three"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>13.5 Year - {{previousYearFour}}<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="annual_turnover_four" name="annual_turnover_four" class="form-control" placeholder="Enter Annual Turnover of the Year {{previousYearFour}}" maxlength="100" onblur="checkValidation('textile', 'annual_turnover_four', turnoverValidationMessage);" value="{{textile_data.annual_turnover_four}}">
                            </div>
                            <span class="error-message error-message-textile-annual_turnover_four"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>14. Whether any financial assistance granted by Govt. of india / others ? (if Yes, please attech details) <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="radio" id="financial_assistance_yes" name="financial_assistance" class="" value="{{VALUE_ONE}}" >&nbsp; Yes
                                &emsp;
                                <input type="radio" id="financial_assistance_no" name="financial_assistance" class="" style="margin-bottom: 0px;"
                                        value="{{VALUE_TWO}}" >&nbsp;No
                                <br/><span class="error-message error-message-textile-financial_assistance"></span>
                            </div>
                        </div>
                        <div class="form-group col-sm-6 financial_assistance_upload_div" id="financial_assistance_upload_container_for_textile" style="display: none;">
                            <label>14.1 Please attech details document<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload PDF Only)</span></label><br>
                            <input type="file" id="financial_assistance_upload_for_textile" name="financial_assistance_upload_for_textile"
                                   accept="application/pdf">
                            <div class="error-message error-message-textile-financial_assistance_upload_for_textile"></div>
                        </div>
                        <div class="form-group col-sm-6" id="financial_assistance_upload_name_container_for_textile" style="display: none;">
                            <label>14.1 Please attech details document<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload PDF Only)</span></label><br>
                            <a id="financial_assistance_upload_name_image_for_textile_download" download><label id="financial_assistance_upload_name_image_for_textile" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>15. Whether any Government dues are outstanding OR Court case against Govt. ? (if Yes, please attech details) <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="radio" id="govt_dues_yes" name="govt_dues" class="" value="{{VALUE_ONE}}" >&nbsp; Yes
                                &emsp;
                                <input type="radio" id="govt_dues_no" name="govt_dues" class="" style="margin-bottom: 0px;"
                                        value="{{VALUE_TWO}}" >&nbsp;No
                                <br/><span class="error-message error-message-textile-govt_dues"></span>
                            </div>
                        </div>
                        <div class="form-group col-sm-6 govt_dues_upload_div" id="govt_dues_upload_container_for_textile" style="display: none;">
                            <label>15.1 Please attech details document<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload PDF Only)</span></label><br>
                            <input type="file" id="govt_dues_upload_for_textile" name="govt_dues_upload_for_textile"
                                   accept="application/pdf">
                            <div class="error-message error-message-textile-govt_dues_upload_for_textile"></div>
                        </div>
                        <div class="form-group col-sm-6" id="govt_dues_upload_name_container_for_textile" style="display: none;">
                            <label>15.1 Please attech details document<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload PDF Only)</span></label><br>
                            <a id="govt_dues_upload_name_image_for_textile_download" download><label id="govt_dues_upload_name_image_for_textile" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <span class="box-title f-w-b page-header m-b-0">16. Bank Details for Assistance </span>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>16.1 Name of Bank<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="bank_name" name="bank_name" class="form-control" placeholder="Enter Name of Bank !" maxlength="100" onblur="checkValidation('textile', 'bank_name', nameOfBankValidationMessage);" value="{{textile_data.bank_name}}">
                            </div>
                            <span class="error-message error-message-textile-bank_name"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>16.2 Bank Account No<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="account_no" name="account_no" class="form-control" placeholder="Enter Bank Account No !" maxlength="100" onblur="checkValidation('textile', 'account_no', bankAccountNoValidationMessage);" value="{{textile_data.account_no}}">
                            </div>
                            <span class="error-message error-message-textile-account_no"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>16.3 IFSC Code No.<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="ifsc_no" name="ifsc_no" class="form-control" placeholder="Enter IFSC Code No. !" maxlength="100" onblur="checkValidation('textile', 'ifsc_no', ifscCodeValidationMessage);" value="{{textile_data.ifsc_no}}">
                            </div>
                            <span class="error-message error-message-textile-ifsc_no"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>16.4 Branch Code No<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="bankbranch_no" name="bankbranch_no" class="form-control" placeholder="Enter Branch Code No !" maxlength="100" onblur="checkValidation('textile', 'bankbranch_no', branchCodeValidationMessage);" value="{{textile_data.bankbranch_no}}">
                            </div>
                            <span class="error-message error-message-textile-bankbranch_no"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>16.5 PAN Card No. of the Unit<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="pancard_no" name="pancard_no" class="form-control" placeholder="Enter PAN Card No. of the Unit !" maxlength="100" onblur="checkValidation('textile', 'pancard_no', panCardValidationMessage);" value="{{textile_data.pancard_no}}">
                            </div>
                            <span class="error-message error-message-textile-pancard_no"></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <button type="button" class="btn btn-sm btn-danger" onclick="Textile.listview.loadTextileData();">Cancel</button  >
                        <button type="button" id="submit_btn_for_incentive" class="btn btn-sm btn-success pull-right" onclick="Textile.listview.submitTextile({{VALUE_ONE}});" style="margin-right: 5px;">Next  <span class="fas fa-hand-point-right"></span></button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>