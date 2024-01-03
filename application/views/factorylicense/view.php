<div class="row">
   <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title" style="float: none; text-align: center;">FORM- 2</h3>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">Prescribed under rules 6 and 15</div>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">Application for registration and notice of occupation</div>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">Specified in section 6 and 7</div>
            </div>
            <form role="form" id="factory_license_form" name="factory_license_form" onsubmit="return false;">
                <input type="hidden" id="-" name="factorylicence_id" value="{{factorylicence_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>1. District</label>
                            <select id="district" name="district" class="form-control select2"
                                    data-placeholder="Select District" disabled="" style="width: 100%;">
                            </select>
                            <span class="error-message error-message-factory-license-district"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>1.1 Entity / Establishment Type <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                 <select id="entity_establishment_type" name="entity_establishment_type" class="form-control select2"
                                    data-placeholder="Select Entity / Establishment Type" style="width: 100%;" onblur="checkValidation('factory-license', 'entity_establishment_type', entityEstablishmentTypeValidationMessage);" disabled="">
                            </select>
                            </div>
                            <span class="error-message error-message-factory-license-entity_establishment_type"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>2. Full name of factory<span class="color-nic-red"></span></label>
                            <div class="input-group">
                                <input type="text" id="name_of_factory" name="name_of_factory" class="form-control" placeholder="Enter Full name of factory !"
                                       maxlength="100" onblur="checkValidation('factory-license', 'name_of_factory', factoryNameValidationMessage);" value="{{name_of_factory}}" readonly>
                            </div>
                            <span class="error-message error-message-factory-license-name_of_factory"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>3. Full factory address to situation of factory</label>
                            <div class="input-group">
                                <textarea id="factory_address" name="factory_address" class="form-control" placeholder="Enter Full factory address to situation of factory !" maxlength="100" onblur="checkValidation('factory-license', 'factory_address', factoryAddressValidationMessage);" readonly>{{factory_address}}</textarea>
                            </div>
                            <span class="error-message error-message-factory-license-factory_address"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>4. Full postal address to which communications Relating to factory should be sent <span class="color-nic-red"></span></label>
                            <div class="input-group">
                                <textarea id="factory_postal_address" name="factory_postal_address" class="form-control" placeholder="Enter Full postal address to which communications Relating to factory should be sent !" maxlength="100" onblur="checkValidation('factory-license', 'factory_postal_address', factoryPostalAddressValidationMessage);" readonly>{{factory_postal_address}}</textarea>
                            </div>
                            <span class="error-message error-message-factory-license-factory_postal_address"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>5. Nature of manufacturing process carried on in the factory during the next twelve months <span style="color: red;"></span></label>
                            <input type="text" id="work_carried" name="work_carried" class="form-control" placeholder="Enter Nature of manufacturing process Nature of manufacturing process to be carried on in the factory during the next twelve months !"
                                   maxlength="100" onblur="checkValidation('factory-license', 'work_carried', manufacturingNatureValidationMessage);" value="{{work_carried}}" readonly>
                            <span class="error-message error-message-factory-license-work_carried"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>6. Maximum number of workers proposed to be employed on any one day during the year<span style="color: red;"></span></label>
                            <input type="text" id="max_no_of_worker_year" name="max_no_of_worker_year" class="form-control" placeholder="Enter Maximum number of workers proposed to be employed on any one day during the year !" onkeyup="checkNumeric($(this));"
                                   maxlength="100" onblur="checkValidation('factory-license', 'max_no_of_worker_year', maxWorkerValidationMessage);" value="{{max_no_of_worker_year}}" readonly>
                            <span class="error-message error-message-factory-license-max_no_of_worker_year"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12">
                            <label>7. Factory Already exists ?</label>&nbsp;
                            <input type="checkbox" id="is_factory_exists" name="is_factory_exists" class="checkbox" value="{{is_checked}}" disabled>
                            <span class="error-message error-message-shop-is_factory_exists"></span>
                        </div>
                    </div>
                    <div class="row factory_exists_div" style="display: none">
                        <div class="form-group col-sm-6">
                            <label>7.1 Factory Licence number if already registered<span class="color-nic-red"></span></label>
                            <div class="input-group">
                                <input type="text" id="factory_license_no" name="factory_license_no" class="form-control" placeholder="Enter Factory Licence number if already registered !"
                                       maxlength="100" onblur="checkValidation('factory-license', 'factory_license_no', factoryLicenseNoValidationMessage);" value="{{factory_license_no}}" readonly>
                            </div>
                            <span class="error-message error-message-factory-license-factory_license_no"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>7.2 Nature of manufacturing process carried on in the factory in the last twelve months <span style="color: red;"></span></label>
                            <input type="text" id="nature_of_work" name="nature_of_work" class="form-control" placeholder="Enter Nature of manufacturing process carried on in the factory in the last twelve months !"
                                   maxlength="100" onblur="checkValidation('factory-license', 'nature_of_work', manufacturingNatureValidationMessage);" value="{{nature_of_work}}" readonly>
                            <span class="error-message error-message-factory-license-nature_of_work"></span>
                        </div>
                    </div>
                    <div class="col-xs-12 factory_exists_div" style="display: none">
                        <div style="background-color: #d2d6de; padding: 5px;">
                            <span class="f-w-b" style="font-size: 15px; color: #000;">7.3 Name and values of principle products manufactured during the last twelve months</span>
                            <hr>
                            <table class="table table-bordered m-b-0px" id="productList" style="margin-top: 10px;">
                                <thead>
                                    <tr style='color: #000;'>
                                        <th style="width: 10px">Sr.No.</th>
                                        <th>Name</th>
                                        <th>Values</th>
                                    </tr>
                                </thead>
                                <tbody id="principle_product_info_container">
                                </tbody>
                            </table>
                        </div>
                        <div class="box-footer" align="right" >
                            <button type="button" class="btn btn-sm btn-nic-blue float-right" id="submit_btn_for_principle_product" onclick="FactoryLicense.listview.addMultiplePrincipleProduct({});" disabled style="margin-right: 5px;margin-top: 5px;"><i class="fas fa-plus-circle" style="margin-right: 5px;margin-top: 5px;"></i>Add Principle Product
                            </button>
                        </div>
                    </div><br/><br/>
                    <div class="row">
                        <div class="form-group col-sm-6 factory_exists_div" style="display: none">
                            <label>7.4 Maximum number of workers employed on any one day during the last twelve months<span style="color: red;"></span></label>
                            <input type="text" id="max_no_of_worker_month" name="max_no_of_worker_month" class="form-control" placeholder="Enter Maximum number of workers employed on any one day during the last twelve months !" onkeyup="checkNumeric($(this));"
                                   maxlength="100" onblur="checkValidation('factory-license', 'max_no_of_worker_month', maxWorkerValidationMessage);" value="{{max_no_of_worker_month}}" readonly>
                            <span class="error-message error-message-factory-license-max_no_of_worker_month"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>8. Number of worker to be ordinarily employed in the factory<span style="color: red;"></span></label>
                            <input type="text" id="no_of_ordinarily_emp" name="no_of_ordinarily_emp" class="form-control" placeholder="Enter Number of worker to be ordinarily employed in the factory !" onkeyup="checkNumeric($(this));"
                                   maxlength="100" onblur="checkValidation('factory-license', 'no_of_ordinarily_emp', maxWorkerValidationMessage);" value="{{no_of_ordinarily_emp}}" readonly>
                            <span class="error-message error-message-factory-license-no_of_ordinarily_emp"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>9. Nature and total amount of power to be Installed<span style="color: red;"></span></label>
                            <input type="text" id="total_power_install" name="total_power_install" class="form-control" placeholder="Enter Nature and total amount of power to be Installed !" onkeyup="checkNumeric($(this));"
                                   maxlength="100" onblur="checkValidation('factory-license', 'total_power_install', powerValidationMessage);" value="{{total_power_install}}" readonly>
                            <span class="error-message error-message-factory-license-total_power_install"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>10. Nature and total amount of power Proposed to be installed <span style="color: red;"></span></label>
                            <input type="text" id="total_power_used" name="total_power_used" class="form-control" placeholder="Enter Nature and total amount of power Proposed to be installed !" onkeyup="checkNumeric($(this));"
                                   maxlength="100" onblur="checkValidation('factory-license', 'total_power_used', powerValidationMessage);" value="{{total_power_used}}" readonly>
                            <span class="error-message error-message-factory-license-total_power_used"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>11. Maximum amount of power (H.P.) proposed to be used<span style="color: red;"></span></label>
                            <input type="text" id="max_power_to_be_used" name="max_power_to_be_used" class="form-control" placeholder="Enter Maximum amount of power (H.P.) proposed to be used !"
                                   maxlength="100" onblur="checkValidation('factory-license', 'max_power_to_be_used', maxPowerValidationMessage);" onkeyup="checkNumeric($(this));" value="{{max_power_to_be_used}}" readonly>
                            <span class="error-message error-message-factory-license-max_power_to_be_used"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>12. Full name and residential address of the person who shall be the manager of the factory for the purpose of the Act</label>
                            <div class="input-group">
                                <textarea id="manager_detail" name="manager_detail" class="form-control" placeholder="Enter Full name and residential address of manager!" maxlength="100" onblur="checkValidation('factory-license', 'max_power_to_be_used', managerValidationMessage);" readonly>{{manager_detail}}</textarea>
                            </div>
                            <span class="error-message error-message-factory-license-manager_detail"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>13. Full name and residential address of the Occupier <span class="color-nic-red"></span></label>
                            <div class="input-group">
                                <textarea id="occupier_detail" name="occupier_detail" class="form-control" placeholder="Enter Full name and residential address of the Occupier !" maxlength="100" readonly onblur="checkValidation('factory-license', 'occupier_detail', occupierValidationMessage);">{{occupier_detail}}</textarea>
                            </div>
                            <span class="error-message error-message-factory-license-occupier_detail"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>14. The proprietor of the factory in case of a private firm or Proprietary concern.<span style="color: red;"></span></label>
                            <input type="text" id="proprietor_of_factory" name="proprietor_of_factory" class="form-control" placeholder="Enter The proprietor of the factory in case of a private firm or Proprietary concern. !"
                                   maxlength="100" onblur="checkValidation('factory-license', 'proprietor_of_factory', factoryProprietorValidationMessage);" value="{{proprietor_of_factory}}" readonly>
                            <span class="error-message error-message-factory-license-proprietor_of_factory"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>15. The share holders in case of a private company where no managing agent is employed <span style="color: red;"></span></label>
                            <input type="text" id="share_holders" name="share_holders" class="form-control" placeholder="Enter the share holders in case of a private company where no managing agent is employed !"
                                   maxlength="100" onblur="checkValidation('factory-license', 'share_holders', shareHolderValidationMessage);" value="{{share_holders}}" readonly>
                            <span class="error-message error-message-factory-license-share_holders"></span>
                        </div>
                    </div>
                    <div class="col-xs-12">
                        <div style="background-color: #d2d6de; padding: 5px;">
                            <span class="f-w-b" style="font-size: 15px; color: #000;">16. The directors in case of a public limited liability company or firm</span>
                            <hr>
                            <table class="table table-bordered m-b-0px" id="directorList" style="margin-top: 10px;">
                                <thead>
                                    <tr style='color: #000;'>
                                        <th style="width: 10px">Sr.No.</th>
                                        <th> Director Name</th>
                                    </tr>
                                </thead>
                                <tbody id="director_info_container">
                                </tbody>
                            </table>
                        </div>
                        <div class="box-footer" align="right" >
                            <button type="button" class="btn btn-sm btn-nic-blue float-right" id="submit_btn_for_Director" onclick="FactoryLicense.listview.addMultipleDirector({});" disabled style="margin-right: 5px;margin-top: 5px;"><i class="fas fa-plus-circle" style="margin-right: 5px;"></i>Add Director</label>
                            </button>
                        </div>
                    </div><br/><br/>
                    <div class="col-xs-12">
                        <div style="background-color: #d2d6de; padding: 5px;">
                            <span class="f-w-b" style="font-size: 15px; color: #000;">16. The managing agent is employed</span>
                            <hr>
                            <table class="table table-bordered m-b-0px" id="employeeList" style="margin-top: 10px;">
                                <thead>
                                    <tr style='color: #000;'>
                                        <th style="width: 10px">Sr.No.</th>
                                        <th> the managing agent in case where a managing agent is employed</th>
                                        <th> the directors of the above managing agent</th>
                                    </tr>
                                </thead>
                                <tbody id="employee_info_container">
                                </tbody>
                            </table>
                        </div>
                        <div class="box-footer" align="right" >
                            <button type="button" class="btn btn-sm btn-nic-blue float-right" id="submit_btn_for_employee" onclick="FactoryLicense.listview.addMultipleEmployee({});" disabled style="margin-right: 5px;margin-top: 5px;"><i class="fas fa-plus-circle" style="margin-right: 5px;"></i>Add Managing Agent</label>
                            </button>
                        </div>
                    </div><br/><br/>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>18. The chief administrative head in case of Government or factory run by a local authority or by any statutory corporation or body<span style="color: red;"></span></label>
                            <input type="text" id="chief_head" name="chief_head" class="form-control" placeholder="Enter the chief administrative head !"
                                   maxlength="100" onblur="checkValidation('factory-license', 'chief_head', chiefHeadValidationMessage);" value="{{chief_head}}" readonly>
                            <span class="error-message error-message-factory-license-chief_head"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>19. Full name and address of the owner of the premises or building (including the prints therefore) referred to in section 93<span class="color-nic-red"></span></label>
                            <div class="input-group">
                                <textarea id="owner_detail" name="owner_detail" class="form-control" placeholder="Enter Full name and address of the owner !" maxlength="100" onblur="checkValidation('factory-license', 'owner_detail', ownerValidationMessage);" readonly>{{owner_detail}}</textarea>
                            </div>
                            <span class="error-message error-message-factory-license-owner_detail"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12">
                            <label>20. Is factory constructed or extended after the commencement of these rules ?</label>&nbsp;
                            <input type="checkbox" id="factory_extend" name="factory_extend" class="checkbox" value="{{is_checked}}" disabled>
                            <span class="error-message error-message-shop-factory_extend"></span>
                        </div>
                    </div>
                    <div class="row factory_extend_div" style="display: none">
                        <div class="form-group col-sm-6">
                            <label>20.1 Reference number<span style="color: red;"></span></label>
                            <input type="text" id="reference_no" name="reference_no" class="form-control" placeholder="Enter Reference number !" onkeyup="checkNumeric($(this));"
                                   maxlength="100" onblur="checkValidation('factory-license', 'reference_no', referenceNoValidationMessage);" value="{{reference_no}}" readonly>
                            <span class="error-message error-message-factory-license-reference_no"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>20.2 Date of approval<span style="color: red;"></span></label>
                            <div class="input-group date">
                                <input type="text" name="date_of_approval" id="date_of_approval" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                                       value="{{date_of_approval}}" onblur="checkValidation('factory-license', 'date_of_approval', approvalDateValidationMessage);" readonly>
                                <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                            </div>
                            <span class="error-message error-message-factory-license-date_of_approval"></span>
                        </div>
                    </div>
                    <div class="row factory_extend_div" style="display: none">
                        <div class="form-group col-sm-6">
                            <label>20.3 Disposal of trade waste and affluent<span style="color: red;"></span></label>
                            <input type="text" id="disposal_waste" name="disposal_waste" class="form-control" placeholder="Enter disposal of trade waste and affluent !"
                                   maxlength="100" onblur="checkValidation('factory-license', 'disposal_waste', disposalWasteValidationMessage);" value="{{disposal_waste}}" readonly>
                            <span class="error-message error-message-factory-license-disposal_waste"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>20.4 Name of the authority granting such approval <span style="color: red;"></span></label>
                            <input type="text" id="name_of_authority" name="name_of_authority" class="form-control" placeholder="Enter name of the authority granting such approval !"
                                   maxlength="100" onblur="checkValidation('factory-license', 'name_of_authority', authorityNameValidationMessage);" value="{{name_of_authority}}" readonly>
                            <span class="error-message error-message-factory-license-name_of_authority"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="form_two_copy_container_for_fl">
                            <label>21.  Form II along with the paid challans.<span style="color: red;"> <br></span></label><br>
                            <input type="file" id="form_two_copy_for_fl" name="form_two_copy_for_fl"
                                   accept="image/pdf">
                            <div class="error-message error-message-factory-license-form_two_copy_for_fl"></div>
                        </div>

                        <div class="form-group col-sm-12" id="form_two_copy_name_container_for_fl" style="display: none;">
                            <label>21.  Form II along with the paid challans.<span style="color: red;"><br>  <span style="color: red;"></span></label><br>
                            <a id="form_two_copy_name_download" target="_blank" download><label id="form_two_copy_name_image_for_fl" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="occupancy_certificate_container_for_fl">
                            <label>22. Occupancy Certificate.<span style="color: red;"> <br></span></label><br>
                            <input type="file" id="occupancy_certificate_for_fl" name="occupancy_certificate_for_fl"
                                   accept="image/pdf">
                            <div class="error-message error-message-factory-license-occupancy_certificate_for_fl"></div>
                        </div>

                        <div class="form-group col-sm-12" id="occupancy_certificate_name_container_for_fl" style="display: none;">
                            <label>22. Occupancy Certificate.<span style="color: red;"><br>  <span style="color: red;"></span></label><br>
                            <a id="occupancy_certificate_name_download" target="_blank" ><label id="occupancy_certificate_name_image_for_fl" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="stability_certificate_container_for_fl">
                            <label>23. Certificate regarding stability of the structure form a qualified structural engineer.<span style="color: red;"> <br></span></label><br>
                            <input type="file" id="stability_certificate_for_fl" name="stability_certificate_for_fl"
                                   accept="image/pdf">
                            <div class="error-message error-message-factory-license-stability_certificate_for_fl"></div>
                        </div>

                        <div class="form-group col-sm-12" id="stability_certificate_name_container_for_fl" style="display: none;">
                            <label>23. Certificate regarding stability of the structure form a qualified structural engineer.<span style="color: red;"><br>  <span style="color: red;"></span></label><br>
                            <a id="stability_certificate_name_download" target="_blank" ><label id="stability_certificate_name_image_for_fl" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="safety_equipments_list_container_for_fl">
                            <label>24. List of safety equipments / precautionary measures taken on site. ( on company’s letterhead and signed ).<span style="color: red;"> <br></span></label><br>
                            <input type="file" id="safety_equipments_list_for_fl" name="safety_equipments_list_for_fl"
                                   accept="image/pdf">
                            <div class="error-message error-message-factory-license-safety_equipments_list_for_fl"></div>
                        </div>

                        <div class="form-group col-sm-12" id="safety_equipments_list_name_container_for_fl" style="display: none;">
                            <label>24. List of safety equipments / precautionary measures taken on site. ( on company’s letterhead and signed ).<span style="color: red;"><br>  <span style="color: red;"></span></label><br>
                            <a id="safety_equipments_list_name_download" target="_blank" ><label id="safety_equipments_list_name_image_for_fl" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="machinery_layout_container_for_fl">
                            <label>25.  Machinery layout drawing architect approved.<span style="color: red;"> <br></span></label><br>
                            <input type="file" id="machinery_layout_for_fl" name="machinery_layout_for_fl"
                                   accept="image/pdf">
                            <div class="error-message error-message-factory-license-machinery_layout_for_fl"></div>
                        </div>

                        <div class="form-group col-sm-12" id="machinery_layout_name_container_for_fl" style="display: none;">
                            <label>25.  Machinery layout drawing architect approved.<span style="color: red;"><br>  <span style="color: red;"></span></label><br>
                            <a id="machinery_layout_name_download" target="_blank" ><label id="machinery_layout_name_image_for_fl" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="approved_plan_copy_container_for_fl">
                            <label>26.   A copy of the approved plan.<span style="color: red;"> <br></span></label><br>
                            <input type="file" id="approved_plan_copy_for_fl" name="approved_plan_copy_for_fl"
                                   accept="image/pdf">
                            <div class="error-message error-message-factory-license-approved_plan_copy_for_fl"></div>
                        </div>

                        <div class="form-group col-sm-12" id="approved_plan_copy_name_container_for_fl" style="display: none;">
                            <label>26.   A copy of the approved plan.<span style="color: red;"><br>  <span style="color: red;"></span></label><br>
                            <a id="approved_plan_copy_name_download" target="_blank" ><label id="approved_plan_copy_name_image_for_fl" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="safety_provision_container_for_fl">
                            <label>27. Provisions of Health, Safety and Welfare under the Factory Act, 1948.<span style="color: red;"> <br></span></label><br>
                            <input type="file" id="safety_provision_for_fl" name="safety_provision_for_fl"
                                   accept="image/pdf">
                            <div class="error-message error-message-factory-license-safety_provision_for_fl"></div>
                        </div>

                        <div class="form-group col-sm-12" id="safety_provision_name_container_for_fl" style="display: none;">
                            <label>27. Provisions of Health, Safety and Welfare under the Factory Act, 1948.<span style="color: red;"><br>  <span style="color: red;"></span></label><br>
                            <a id="safety_provision_name_download" target="_blank" ><label id="safety_provision_name_image_for_fl" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="copy_of_site_plans_container_for_fl">
                            <label>28. A copy of ON SITE/OFF SITE PLANS if applicable/ signed statement on company’s letterhead that it is not applicable.<span style="color: red;"> <br></span></label><br>
                            <input type="file" id="copy_of_site_plans_for_fl" name="copy_of_site_plans_for_fl"
                                   accept="image/pdf">
                            <div class="error-message error-message-factory-license-copy_of_site_plans_for_fl"></div>
                        </div>

                        <div class="form-group col-sm-12" id="copy_of_site_plans_name_container_for_fl" style="display: none;">
                            <label>28. A copy of ON SITE/OFF SITE PLANS if applicable/ signed statement on company’s letterhead that it is not applicable.<span style="color: red;"><br>  <span style="color: red;"></span></label><br>
                            <a id="copy_of_site_plans_name_download" target="_blank" ><label id="copy_of_site_plans_name_image_for_fl" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="plan_approval_container_for_fl">
                            <label>29. Approval of the plans from the Chief Controller of Explosives, Nagpur in respect of the storage of Petroleum and Hazardous substances, if applicable /signed statement on company’s letterhead that it is not applicable.<span style="color: red;"> <br></span></label><br>
                            <input type="file" id="plan_approval_for_fl" name="plan_approval_for_fl"
                                   accept="image/pdf">
                            <div class="error-message error-message-factory-license-plan_approval_for_fl"></div>
                        </div>

                        <div class="form-group col-sm-12" id="plan_approval_name_container_for_fl" style="display: none;">
                            <label>29. Approval of the plans from the Chief Controller of Explosives, Nagpur in respect of the storage of Petroleum and Hazardous substances, if applicable /signed statement on company’s letterhead that it is not applicable.<span style="color: red;"><br>  <span style="color: red;"></span></label><br>
                            <a id="plan_approval_name_download" target="_blank" ><label id="plan_approval_name_image_for_fl" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="self_certificate_container_for_fl">
                            <label>30. Self Certification by the Management whether the premises is Owned/Leased.<span style="color: red;"> <br></span></label><br>
                            <input type="file" id="self_certificate_for_fl" name="self_certificate_for_fl"
                                   accept="image/pdf">
                            <div class="error-message error-message-factory-license-self_certificate_for_fl"></div>
                        </div>

                        <div class="form-group col-sm-12" id="self_certificate_name_container_for_fl" style="display: none;">
                            <label>30. Self Certification by the Management whether the premises is Owned/Leased.<span style="color: red;"><br>  <span style="color: red;"></span></label><br>
                            <a id="self_certificate_name_download" target="_blank" ><label id="self_certificate_name_image_for_fl" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="project_report_container_for_fl">
                            <label>31. Project Report (including flow chart) (Signed).<span style="color: red;"> <br></span></label><br>
                            <input type="file" id="project_report_for_fl" name="project_report_for_fl"
                                   accept="image/pdf">
                            <div class="error-message error-message-factory-license-project_report_for_fl"></div>
                        </div>

                        <div class="form-group col-sm-12" id="project_report_name_container_for_fl" style="display: none;">
                            <label>31. Project Report (including flow chart) (Signed).<span style="color: red;"><br>  <span style="color: red;"></span></label><br>
                            <a id="project_report_name_download" target="_blank" ><label id="project_report_name_image_for_fl" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="land_document_copy_container_for_fl">
                            <label>32. Copy of land document (Form I & XIV).<span style="color: red;"> <br></span></label><br>
                            <input type="file" id="land_document_copy_for_fl" name="land_document_copy_for_fl"
                                   accept="image/pdf">
                            <div class="error-message error-message-factory-license-land_document_copy_for_fl"></div>
                        </div>

                        <div class="form-group col-sm-12" id="land_document_copy_name_container_for_fl" style="display: none;">
                            <label>32. Copy of land document (Form I & XIV).<span style="color: red;"><br>  <span style="color: red;"></span></label><br>
                            <a id="land_document_copy_name_download" target="_blank" ><label id="land_document_copy_name_image_for_fl" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="ssi_registration_copy_container_for_fl">
                            <label>33. A Copy of SSI Registration/Industrial Licence /In principle clearance in case of MSI/LSL.<span style="color: red;"> <br></span></label><br>
                            <input type="file" id="ssi_registration_copy_for_fl" name="ssi_registration_copy_for_fl"
                                   accept="image/pdf">
                            <div class="error-message error-message-factory-license-ssi_registration_copy_for_fl"></div>
                        </div>

                        <div class="form-group col-sm-12" id="ssi_registration_copy_name_container_for_fl" style="display: none;">
                            <label>33. A Copy of SSI Registration/Industrial Licence /In principle clearance in case of MSI/LSL.<span style="color: red;"><br>  <span style="color: red;"></span></label><br>
                            <a id="ssi_registration_copy_name_download" target="_blank" ><label id="ssi_registration_copy_name_image_for_fl" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="detail_of_etp_container_for_fl">
                            <label>34.  Details of ETP, if any, (On company letterhead and signed).<span style="color: red;"> <br></span></label><br>
                            <input type="file" id="detail_of_etp_for_fl" name="detail_of_etp_for_fl"
                                   accept="image/pdf">
                            <div class="error-message error-message-factory-license-detail_of_etp_for_fl"></div>
                        </div>

                        <div class="form-group col-sm-12" id="detail_of_etp_name_container_for_fl" style="display: none;">
                            <label>34.  Details of ETP, if any, (On company letterhead and signed).<span style="color: red;"><br>  <span style="color: red;"></span></label><br>
                            <a id="detail_of_etp_name_download" target="_blank" ><label id="detail_of_etp_name_image_for_fl" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="questionnaire_copy_container_for_fl">
                            <label>35.  A copy of Questionnaire duly filled and signed by the Manager and the Occupier.<span style="color: red;"> <br></span></label><br>
                            <input type="file" id="questionnaire_copy_for_fl" name="questionnaire_copy_for_fl"
                                   accept="image/pdf">
                            <div class="error-message error-message-factory-license-questionnaire_copy_for_fl"></div>
                        </div>

                        <div class="form-group col-sm-12" id="questionnaire_copy_name_container_for_fl" style="display: none;">
                            <label>35.  A copy of Questionnaire duly filled and signed by the Manager and the Occupier.<span style="color: red;"><br>  <span style="color: red;"></span></label><br>
                            <a id="questionnaire_copy_name_download" target="_blank" ><label id="questionnaire_copy_name_image_for_fl" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 m-b-5px" id="seal_and_stamp_container_for_fl">
                            <label>36. Signature of Occupier</label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                        </div>
                        <div class="form-group col-sm-12" id="seal_and_stamp_name_container_for_fl" style="display: none;">
                            <label>36. Signature of Occupier</label><br>
                            <a id="seal_and_stamp_download" target="_blank"><img id="seal_and_stamp_name_image_for_fl" style="width: 250px; height: 250px; border: 2px solid blue;"></a>
                        </div>
                    </div>
                    <div class="form-group">
                        <button type="button" class="btn btn-sm btn-danger" onclick="FactoryLicense.listview.loadFactoryLicenseData();">Close</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>