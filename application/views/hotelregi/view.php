<div class="row">
    <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title" style="float: none; text-align: center;">DEPARTMENT OF TOURISM </h3>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">UT OF DADRA & NAGAR AND DAMAN & DIU </div>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">Application Form for Registration of a Hotel Keeper</div>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">FORM-II</div>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">(See Rule 3)</div>
            </div>
            <form role="form" id="hotelregi_form" name="hotelregi_form" onsubmit="return false;">

                <input type="hidden" id="hotelregi_id" name="hotelregi_id" value="{{hotelregi_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="form-group col-sm-6">
                            To,<br>
                            The Dy. Director of Tourism,<br>
                            Tourism Department,<br>
                            Dadra and Nagar Haveli &  Daman and Diu.<br>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>1. Name of Hotel <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="name_of_hotel" name="name_of_hotel" class="form-control" placeholder="Name of Hotel !"
                                       disabled=""   maxlength="100" value="{{name_of_hotel}}">
                            </div>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>2. Name of the Applicant <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="name_of_person" name="name_of_person" class="form-control" placeholder="Name of Applicant !" maxlength="100" value="{{name_of_person}}" 
                                       disabled="" >
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>3. Full address of the site where the applicant intends to run the hotel or is being run <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea type="text" id="full_address" name="full_address" class="form-control" placeholder="Full address of the site where the applicant intends to run the hotel or is being run !"
                                          disabled="" maxlength="100" >{{full_address}}</textarea>
                            </div>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>4. Name of the tourist area where the hotel is to be run or is being run <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <select class="form-control select2" id="name_of_tourist_area" name="name_of_tourist_area" disabled=""
                                        data-placeholder="Select Name of the tourist area !" style="width: 100%;" >
                                </select>
                            </div>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>4.1 Entity / Establishment Type <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <select id="entity_establishment_type" name="entity_establishment_type" class="form-control select2" disabled=""
                                        data-placeholder="Select Entity / Establishment Type" style="width: 100%;" onblur="checkValidation('hotelregi', 'entity_establishment_type', entityEstablishmentTypeValidationMessage);">
                                </select>
                            </div>
                            <span class="error-message error-message-hotelregi-entity_establishment_type"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>5. Name of the Proprietor (s) <span style="color: red;">*</span></label>
                            <div class="input-group">
                                <input type="text" disabled="" id="name_of_proprietor" name="name_of_proprietor" class="form-control" placeholder="Name of the Proprietor (s) !" maxlength="100" value="{{name_of_proprietor}}">
                            </div>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>6. Category of Hotel <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <select class="form-control" id="category_of_hotel" name="category_of_hotel" onchange="Hotelregi.listview.getFees(this);"
                                        data-placeholder="Status !" disabled="">
                                    <option value="">Select Category of Hotel</option>
                                    <option value="A">A Category</option>
                                    <option value="B">B Category</option>
                                    <option value="C">C Category</option>
                                    <option value="D">D Category</option>
                                    <option value="E">E Category (Homestay)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>7. Fees <span style="color: red;">*</span></label>
                            <div class="input-group">
                                <input type="text" id="fees" name="fees" class="form-control" placeholder="Fees !" maxlength="10" disabled="">
                            </div>
                            <span class="error-message error-message-hotelregi-fees"></span>
                        </div>
                        <div class="col-sm-6 form-group">
                            <label>8. Mobile No. <span style="color: red;">*</span></label>
                            <input type="text" id="mob_no" name="mob_no" class="form-control" placeholder=" Mobile No. !" readonly=""
                                   maxlength="10" value="{{mob_no}}">
                            <span class="error-message error-message-hotelregi-mob_no"></span>
                        </div>
                    </div>
                    <hr class="m-b-1rem">
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>9. Name of the Manager <span style="color: red;">*</span></label>
                            <div class="input-group">
                                <input type="text" disabled="" id="name_of_manager" name="name_of_manager" class="form-control" placeholder="Name of the Manager !" maxlength="100" value="{{name_of_manager}}">
                            </div>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>10. Manager Full Permanent Address <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea type="text" disabled="" id="manager_permanent_address" name="manager_permanent_address" class="form-control" placeholder="Manager Full Permanent Address !" maxlength="100">{{manager_permanent_address}}</textarea>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12">
                        <div style="background-color: #d2d6de; padding: 5px;">
                            <span class="f-w-b" style="font-size: 15px; color: #000;">11. Details of Agent/Agents/employee/employees </span>
                            <hr>
                            <table class="table table-bordered m-b-0px" id="agentList" style="margin-top: 10px;">
                                <thead>
                                    <tr style='color: #000;'>
                                        <th style="width: 10px">Sr.No.</th>
                                        <th>Name of the Agent/Agents/employee/employees</th>
                                        <th class="remove_btn_hidden"></th>
                                    </tr>
                                </thead>
                                <tbody id="agent_info_container">
                                </tbody>
                            </table>
                        </div>
                        <div class="box-footer" align="right" style="margin-bottom: 50px;" >
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12">
                            <label>12. Whether the applicant is a permanent resident of the Union Territory of Goa, Daman and Diu <span style="color: red;">* </span>  &emsp; </label>
                            <input type="radio" id="permanent_resident_of_ut_yes" name="permanent_resident_of_ut"  
                                   disabled="" value="{{IS_CHECKED_YES}}"> Yes &emsp; 
                            <input type="radio" id="permanent_resident_of_ut_no" name="permanent_resident_of_ut" 
                                   disabled="" maxlength="100" value="{{IS_CHECKED_NO}}"> No
                        </div>
                        <div class="form-group col-sm-12">
                            <label>13. Any other business which the applicant is carrying on in any tourist area in the Union Territory. <span style="color: red;">* </span> &emsp;</label>
                            <input type="radio" id="other_business_of_applicant_yes" name="other_business_of_applicant"  
                                   disabled="" maxlength="100" value="{{IS_CHECKED_YES}}"> Yes &emsp; 
                            <input type="radio" id="other_business_of_applicant_no" name="other_business_of_applicant" 
                                   disabled="" maxlength="100" value="{{IS_CHECKED_NO}}"> No
                        </div>
                    </div>
                    <div class="hotel" style="display: none;">
                        <div class="row">
                            <div class="col-12 m-b-5px" id="site_plan_container_for_hotelregi">
                                <label>14. Site plan of land and approved plan of building and room layout. <span style="color: red;">* <br>(Maximum File Size: 1MB) &nbsp; (Upload PDF Only)</span></label><br>
                                <label class="f-w-n">Document Not Uploaded</label><br>
                                <div class="error-message error-message-hotelregi-site_plan_for_hotelregi"></div>
                            </div>
                            <div class="form-group col-sm-12" id="site_plan_name_container_for_hotelregi" style="display: none;">
                                <label>14. Site plan of land and approved plan of building and room layout. <span style="color: red;">* </label><br>
                                <a target="_blank" id="site_plan_download"><label id="site_plan_name_image_for_hotelregi" style="border: 2px solid black;" class="btn btn-sm btn-nic-blue f-w-n">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 m-b-5px" id="construction_plan_container_for_hotelregi">
                                <label>15. Upload  approved construction plan. <span style="color: red;">* <br>(Maximum File Size: 1MB) &nbsp; (Upload PDF Only)</span></label><br>
                                <label class="f-w-n">Document Not Uploaded</label><br>
                                <div class="error-message error-message-hotelregi-construction_plan_for_hotelregi"></div>
                            </div>
                            <div class="form-group col-sm-12" id="construction_plan_name_container_for_hotelregi" style="display: none;">
                                <label>15. Upload  approved construction plan. <span style="color: red;">* </label><br>
                                <a target="_blank" id="construction_plan_download"><label id="construction_plan_name_image_for_hotelregi" style="border: 2px solid black;" class="btn btn-sm btn-nic-blue f-w-n">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 m-b-5px" id="occupancy_certificate_container_for_hotelregi">
                                <label>16. Upload Occupancy Certificate. <span style="color: red;">* <br>(Maximum File Size: 1MB) &nbsp; (Upload PDF Only)</span></label><br>
                                <label class="f-w-n">Document Not Uploaded</label><br>
                                <div class="error-message error-message-hotelregi-occupancy_certificate_for_hotelregi"></div>
                            </div>
                            <div class="form-group col-sm-12" id="occupancy_certificate_name_container_for_hotelregi" style="display: none;">
                                <label>16. Upload Occupancy Certificate. <span style="color: red;">* </label><br>
                                <a target="_blank" id="occupancy_certificate_download"><label id="occupancy_certificate_name_image_for_hotelregi" style="border: 2px solid black;" class="btn btn-sm btn-nic-blue f-w-n">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 m-b-5px" id="noc_medical_container_for_hotelregi">
                                <label>17. Upload Health NOC. <span style="color: red;">* <br>(Maximum File Size: 1MB) &nbsp; (Upload PDF Only)</span></label><br>
                                <label class="f-w-n">Document Not Uploaded</label><br>
                                <div class="error-message error-message-hotelregi-noc_medical_for_hotelregi"></div>
                            </div>
                            <div class="form-group col-sm-12" id="noc_medical_name_container_for_hotelregi" style="display: none;">
                                <label>17. Upload Health NOC. <span style="color: red;">* </label><br>
                                <a target="_blank" id="noc_medical_download"><label id="noc_medical_name_image_for_hotelregi" style="border: 2px solid black;" class="btn btn-sm btn-nic-blue f-w-n">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 m-b-5px" id="noc_concerned_container_for_hotelregi">
                                <label>18. Upload NOC of DMC/concerned panchayat. <span style="color: red;">* <br>(Maximum File Size: 1MB) &nbsp; (Upload PDF Only)</span></label><br>
                                <label class="f-w-n">Document Not Uploaded</label><br>
                                <div class="error-message error-message-hotelregi-noc_concerned_for_hotelregi"></div>
                            </div>
                            <div class="form-group col-sm-12" id="noc_concerned_name_container_for_hotelregi" style="display: none;">
                                <label>18. Upload NOC of DMC/concerned panchayat. <span style="color: red;">* </label><br>
                                <a target="_blank" id="noc_concerned_download"><label id="noc_concerned_name_image_for_hotelregi" style="border: 2px solid black;" class="btn btn-sm btn-nic-blue f-w-n">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 m-b-5px" id="noc_electricity_container_for_hotelregi">
                                <label>19. Upload NOC of electricity department. <span style="color: red;">* <br>(Maximum File Size: 1MB) &nbsp; (Upload PDF Only)</span></label><br>
                                <label class="f-w-n">Document Not Uploaded</label><br>
                                <div class="error-message error-message-hotelregi-noc_electricity_for_hotelregi"></div>
                            </div>
                            <div class="form-group col-sm-12" id="noc_electricity_name_container_for_hotelregi" style="display: none;">
                                <label>19. Upload NOC of electricity department. <span style="color: red;">* </label><br>
                                <a target="_blank" id="noc_electricity_download"><label id="noc_electricity_name_image_for_hotelregi" style="border: 2px solid black;" class="btn btn-sm btn-nic-blue f-w-n">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            </div>
                        </div>
                    </div>
                    <div class="homestay" style="display: none;">
                        <div class="row">
                            <div class="col-12 m-b-5px" id="aadhar_card_container_for_homestay">
                                <label>14. Upload aadhar card of the person under whom the Bed & breakfast/Homestay is to be registered. <span style="color: red;">* <br>(Maximum File Size: 1MB) &nbsp; (Upload PDF Only)</span></label><br>
                                <label class="f-w-n">Document Not Uploaded</label><br>
                                <div class="error-message error-message-hotelregi-aadhar_card_for_hotelregi"></div>
                            </div>
                            <div class="form-group col-sm-12" id="aadhar_card_name_container_for_homestay" style="display: none;">
                                <label>14. Upload aadhar card of the person under whom the Bed & breakfast/Homestay is to be registered. <span style="color: red;">* </label><br>
                                <a target="_blank" id="aadhar_card_download"><label id="aadhar_card_name_image_for_homestay" style="border: 2px solid black;" class="btn btn-sm btn-nic-blue f-w-n">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 m-b-5px" id="form_xiv_container_for_homestay">
                                <!--<label>22. Police Verification Report of person intend to be register as Hotel Keeper. <span style="color: red;">* <br>(Maximum File Size: 1MB) &nbsp; (Upload PDF Only)</span></label><br>-->
                                <label>15. Upload form XIV of survey no. <span style="color: red;">* <br>(Maximum File Size: 1MB) &nbsp; (Upload PDF Only)</span></label><br>
                                <label class="f-w-n">Document Not Uploaded</label><br>
                                <div class="error-message error-message-hotelregi-form_xiv_for_homestay"></div>
                            </div>
                            <div class="form-group col-sm-12" id="form_xiv_name_container_for_homestay" style="display: none;">
                                <label>15. Upload form XIV of survey no. <span style="color: red;">* </label><br>
                                <a target="_blank" id="form_xiv_download"><label id="form_xiv_name_image_for_homestay" style="border: 2px solid black;" class="btn btn-sm btn-nic-blue f-w-n">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 m-b-5px" id="site_plan_container_for_homestay">
                                <label>16. Upload site plan of survey no. <span style="color: red;">* <br>(Maximum File Size: 1MB) &nbsp; (Upload PDF Only)</span></label><br>
                                <label class="f-w-n">Document Not Uploaded</label><br>
                                <div class="error-message error-message-hotelregi-site_plan_for_homestay"></div>
                            </div>
                            <div class="form-group col-sm-12" id="site_plan_name_container_for_homestay" style="display: none;">
                                <label>16. Upload site plan of survey no. <span style="color: red;">* </label><br>
                                <a target="_blank" id="site_plan_homestay_download"><label id="site_plan_name_image_for_homestay" style="border: 2px solid black;" class="btn btn-sm btn-nic-blue f-w-n">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 m-b-5px" id="na_order_container_for_homestay">
                                <label>17. Upload NA order of the survey no. <span style="color: red;">* <br>(Maximum File Size: 1MB) &nbsp; (Upload PDF Only)</span></label><br>
                                <label class="f-w-n">Document Not Uploaded</label><br>
                                <div class="error-message error-message-hotelregi-na_order_for_homestay"></div>
                            </div>
                            <div class="form-group col-sm-12" id="na_order_name_container_for_homestay" style="display: none;">
                                <label>17. Upload NA order of the survey no. <span style="color: red;">* </label><br>
                                <a target="_blank" id="na_order_download"><label id="na_order_name_image_for_homestay" style="border: 2px solid black;" class="btn btn-sm btn-nic-blue f-w-n">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 m-b-5px" id="completion_certificate_container_for_homestay">
                                <label>18. Upload completion/occupancy certificate. <span style="color: red;">* <br>(Maximum File Size: 1MB) &nbsp; (Upload PDF Only)</span></label><br>
                                <label class="f-w-n">Document Not Uploaded</label><br>
                                <div class="error-message error-message-hotelregi-completion_certificate_for_homestay"></div>
                            </div>
                            <div class="form-group col-sm-12" id="completion_certificate_name_container_for_homestay" style="display: none;">
                                <label>18. Upload completion/occupancy certificate. <span style="color: red;">* </label><br>
                                <a target="_blank" id="completion_certificate_download"><label id="completion_certificate_name_image_for_homestay" style="border: 2px solid black;" class="btn btn-sm btn-nic-blue f-w-n">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 m-b-5px" id="house_tax_receipt_container_for_homestay">
                                <label>19. Upload house tax receipt. <span style="color: red;">* <br>(Maximum File Size: 1MB) &nbsp; (Upload PDF Only)</span></label><br>
                                <label class="f-w-n">Document Not Uploaded</label><br>
                                <div class="error-message error-message-hotelregi-house_tax_receipt_for_homestay"></div>
                            </div>
                            <div class="form-group col-sm-12" id="house_tax_receipt_name_container_for_homestay" style="display: none;">
                                <label>19. Upload house tax receipt. <span style="color: red;">* </label><br>
                                <a target="_blank" id="house_tax_receipt_download"><label id="house_tax_receipt_name_image_for_homestay" style="border: 2px solid black;" class="btn btn-sm btn-nic-blue f-w-n">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 m-b-5px" id="electricity_bill_container_for_homestay">
                                <label>20. Upload copy of electricity bill. <span style="color: red;">* <br>(Maximum File Size: 1MB) &nbsp; (Upload PDF Only)</span></label><br>
                                <label class="f-w-n">Document Not Uploaded</label><br>
                                <div class="error-message error-message-hotelregi-electricity_bill_for_homestay"></div>
                            </div>
                            <div class="form-group col-sm-12" id="electricity_bill_name_container_for_homestay" style="display: none;">
                                <label>20.Upload copy of electricity bill. <span style="color: red;">* </label><br>
                                <a target="_blank" id="electricity_bill_download"><label id="electricity_bill_name_image_for_homestay" style="border: 2px solid black;" class="btn btn-sm btn-nic-blue f-w-n">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 m-b-5px" id="noc_fire_container_for_hotelregi">
                            <label>21. Upload Fire NOC. <span style="color: red;">* <br>(Maximum File Size: 1MB) &nbsp; (Upload PDF Only)</span></label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                            <div class="error-message error-message-hotelregi-noc_fire_for_hotelregi"></div>
                        </div>
                        <div class="form-group col-sm-12" id="noc_fire_name_container_for_hotelregi" style="display: none;">
                            <label>21. Upload Fire NOC. <span style="color: red;">* </label><br>
                            <a target="_blank" id="noc_fire_download"><label id="noc_fire_name_image_for_hotelregi" style="border: 2px solid black;" class="btn btn-sm btn-nic-blue f-w-n">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 m-b-5px" id="police_clearance_certificate_container_for_hotelregi">
                            <label>22. Upload police clearance certificate. <span style="color: red;">* <br>(Maximum File Size: 1MB) &nbsp; (Upload PDF Only)</span></label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                            <div class="error-message error-message-hotelregi-police_clearance_certificate_for_hotelregi"></div>
                        </div>
                        <div class="form-group col-sm-12" id="police_clearance_certificate_name_container_for_hotelregi" style="display: none;">
                            <label>22. Upload police clearance certificate. <span style="color: red;">* </label><br>
                            <a target="_blank" id="police_clearance_certificate_download"><label id="police_clearance_certificate_name_image_for_hotelregi" style="border: 2px solid black;" class="btn btn-sm btn-nic-blue f-w-n">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 m-b-5px" id="seal_and_stamp_container_for_hotelregi">
                            <label>23. Signature<span style="color: red;">* (Maximum File Size: 1MB)</span></label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                            <div class="error-message error-message-hotelregi-seal_and_stamp_for_hotelregi"></div>
                        </div>
                        <div class="form-group col-sm-12" id="seal_and_stamp_name_container_for_hotelregi" style="display: none;">
                            <label>23. Principal Employer Seal & Stamp <span style="color: red;">* (Maximum File Size: 1MB)</label><br>
                            <a target="_blank" id="seal_and_stamp_download"><img id="seal_and_stamp_name_image_for_hotelregi" style="width: 250px; height: 250px; border: 2px solid blue;"></a>
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
                        <button type="button" class="btn btn-sm btn-danger" onclick="Hotelregi.listview.loadHotelregiData();">Close</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>