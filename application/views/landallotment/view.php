<div class="row">
    <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title" style="float: none; text-align: center;">Allotment of Plot</h3>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">Application for Allotment of Plot for Industrial Purpose in Government Industrial Estates.</div>
            </div>
            <form role="form" id="landallotment_form" name="landallotment_form" onsubmit="return false;">
                
                <input type="hidden" id="landallotment_id" name="landallotment_id" value="{{landallotment_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="form-group col-sm-6">
                            To,<br>
                            The General Manager,<br>
                            District Industries Centre,<br>
                            DNH&DD.
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>Entity / Establishment Type <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                 <select id="entity_establishment_type" name="entity_establishment_type" class="form-control select2"
                                    data-placeholder="Select Entity / Establishment Type" style="width: 100%;" onblur="checkValidation('wmregistration', 'entity_establishment_type', entityEstablishmentTypeValidationMessage);" disabled="">
                            </select>
                            </div>
                            <span class="error-message error-message-wmregistration-entity_establishment_type"></span>
                        </div>
                    </div>
                     <div class="row">
                        <div class="form-group col-sm-6">
                            <label>1. Name of Applicant<span class="color-nic-red"></span></label>
                            <div class="input-group">
                                <input type="text" id="name_of_applicant" readonly="" name="name_of_applicant" class="form-control" placeholder="Enter Name of Applicant !"
                                       maxlength="100" onblur="checkValidation('landallotment', 'name_of_applicant', applicantNameValidationMessage);" value="{{name_of_applicant}}">
                            </div>
                            <span class="error-message error-message-landallotment-name_of_applicant"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>2. Applicant Address<span class="color-nic-red"></span></label>
                            <div class="input-group">
                                <input type="text" id="applicant_address" name="applicant_address" class="form-control" placeholder="Enter Name of Applicant !"
                                       maxlength="100" onblur="checkValidation('landallotment', 'applicant_address', applicantNameValidationMessage);" value="{{applicant_address}}" readonly="">
                            </div>
                            <span class="error-message error-message-landallotment-applicant_address"></span>
                        </div>
                        
                    </div>
                     <div class="row">
                        <div class="form-group col-sm-6">
                            <label>3. Email<span class="color-nic-red"></span></label>
                            <div class="input-group">
                                <input type="text" id="email" name="email" class="form-control" placeholder="Enter Name of Applicant !"
                                       maxlength="100" onblur="checkValidation('landallotment', 'email', applicantNameValidationMessage);" value="{{email}}" readonly="">
                            </div>
                            <span class="error-message error-message-landallotment-email"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>4. Telephone No.<span class="color-nic-red"></span></label>
                            <div class="input-group">
                                <input type="text" id="telehpone_no" name="telehpone_no" class="form-control" placeholder="Enter Name of Applicant !"
                                       maxlength="100" onblur="checkValidation('landallotment', 'telehpone_no', applicantNameValidationMessage);" value="{{telehpone_no}}" readonly="">
                            </div>
                            <span class="error-message error-message-landallotment-telehpone_no"></span>
                        </div>
                        
                        
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>5. Date of Application<span style="color: red;"></span></label>
                            <div class="input-group">
                                <input type="text" class= "form-control" placeholder="dd-mm-yyyy"
                                       value="{{application_date}}" readonly="">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-landallotment-application_date"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>6. Villages/Government Industrial Estate<span style="color: red;"></span></label>
                            <div class="input-group">
                                <select class="form-control" id="villages_for_noc_data" name="villages_for_noc_data"
                                        data-placeholder="Status !"  onchange="checkValidation('landallotment', 'villages_for_noc_data', villageNameValidationMessage);
                                    getPlotData($(this), 'plot_no', 'noc_data');" disabled="">
                                    <option value="">Select Village</option>
                                </select>
                            </div>
                            <span class="error-message error-message-landallotment-villages_for_noc_data"></span>
                        </div>
                        
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>7. Plot No.<span style="color: red;">*</span></label>
                            <div class="input-group">
                                <select class="form-control" id="plot_no_for_landallotment_data" name="plot_no_for_landallotment_data"
                                        data-placeholder="Status !" onchange="checkValidation('landallotment', 'plot_no_for_landallotment_data', plotnoValidationMessage);
                                    getAreaData($(this));" disabled="">
                                    <option value="">Select Plot NO</option>
                                </select>
                            </div>
                            <span class="error-message error-message-landallotment-plot_no_for_landallotment_data"></span>
                        </div>

                        <div class="form-group col-sm-6">
                            <label>8. Admeasuring in square metre <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="govt_industrial_estate_area" readonly="" name="govt_industrial_estate_area" class="form-control" placeholder="Enter Admeasuring square metre !" maxlength="100" value="{{govt_industrial_estate_area}}">
                            </div>
                            <span class="error-message error-message-landallotment-govt_industrial_estate_area"></span>
                        </div>
                    </div>
                    <div class="col-xs-12">
                        <div style="background-color: #d2d6de; padding: 5px;">
                            <span class="f-w-b" style="font-size: 15px; color: #000;">9. (a) Name and Address Along with their father's / husband's name of proprietor and/or Patners and Managing Director's in the case of limited company</span>
                            <hr>
                            <table class="table table-bordered m-b-0px" id="proprietorList" style="margin-top: 10px;">
                                <thead>
                                    <tr style='color: #000;'>
                                        <th style="width: 10px">Sr.No.</th>
                                        <th>Name of Applicant</th>
                                        <th>Address </th>
                                        <th>Applicant Type</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody id="proprietor_info_container">
                                </tbody>
                            </table>
                        </div>
                        <div class="box-footer" align="right" >
                            <button type="button" class="btn btn-sm btn-nic-blue float-right" id="submit_btn_for_principle_product" onclick="Landallotment.listview.addMultipleProprietor({});" style="margin-right: 5px;margin-top: 5px;" disabled=""><i class="fas fa-plus-circle" style="margin-right: 5px;"></i>Add Applicant
                            </button>
                        </div>
                    </div>
                    <br/>
                      
                                         <div class="row">
                        <div class="form-group col-sm-12" id="bio_data_doc_container_for_landallotment_view">
                            <label>9. (b) Complete bio-data of above persons.<span style="color: red;"> <br></span></label><br>
                            <input type="file" id="bio_data_doc" name="bio_data_doc"
                                   accept="image/pdf">
                             <div class="error-message error-message-landallotment-bio_data_doc"></div>
                        </div>

                     <div class="form-group col-sm-12" id="bio_data_doc_name_container_for_landallotment_view" style="display: none;">
                            <label>9. (b) Complete bio-data of above persons.<span style="color: red;"><br>  <span style="color: red;"></span></label><br>
                            <a id="bio_data_doc_name_download" target="_blank"><label id="bio_data_doc_name_image_for_landallotment_view" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            
                        </div>
                  
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>10. Constitution of the Enterprise <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <select class="form-control" id="constitution_artical" name="constitution_artical" onchange="Landallotment.listview.getConstitution(this);"
                                        data-placeholder="Status !" disabled="">
                                     <option value="">Select Enterprise Category</option>
                                    <option value="proprietary">Proprietary</option>
                                    <option value="partnership">Partnership</option>
                                    <option value="private">Private</option>
                                    <option value="public">Public</option>
                                    <option value="limited_liability_partnership">Limited liability partnership</option>
                                    <option value="others">Others</option>
                                </select>
                            </div>
                        </div>
                        <div class=" constitution_artical_div" style="display: none;">
                            <div class="form-group col-sm-12" id="constitution_artical_doc_container_for_landallotment_view">
                                <label>10.1 Please upload Articles of Association or copy of Partnership Deed of copy of registration in case of cooperative society. <span style="color: red;"> <br></span></label><br>
                                <label class="f-w-n">Document Not Uploaded</label><br>
                            </div>

                            <div class="form-group col-sm-12" id="constitution_artical_doc_name_container_for_landallotment_view" style="display: none;">
                                <label>10.1 Please upload Articles of Association or copy of Partnership Deed of copy of registration in case of cooperative society. <span style="color: red;"><br>  <span style="color: red;"></span></label><br>
                                <a id="constitution_artical_doc_download" target="_blank"><label id="constitution_artical_doc_name_image_for_landallotment_view" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                               
                            </div>
                        </div>
                        </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>10.(a) Category of the Enterprise.<span class="color-nic-red"></span></label>
                            <div class="input-group">
                                <input type="text" id="expansion_industry" name="expansion_industry" class="form-control" readonly="" value="{{expansion_industry}}">
                            </div>
                            <span class="error-message error-message-landallotment-expansion_industry"></span>
                        </div>
                    
                        <div class="form-group col-sm-6">
                            <label>10.(b) Nature of Industry proposed to be Established.<span class="color-nic-red"></span></label>
                            <div class="input-group">
                                <textarea id="nature_of_industry" name="nature_of_industry" readonly="" class="form-control" placeholder="Enter Nature of Industry !" maxlength="100" onblur="checkValidation('landallotment', 'nature_of_industry', principaladdressValidationMessage);">{{nature_of_industry}}</textarea>
                            </div>
                            <span class="error-message error-message-landallotment-nature_of_industry"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>10.(c) Possession of in any industrial plots if so give particulars.<span class="color-nic-red"></span></label>
                            <div class="input-group">
                                <textarea id="possession_of_industry_plot" readonly="" name="possession_of_industry_plot" class="form-control" placeholder="Enter Nature of Industry !" maxlength="100" onblur="checkValidation('landallotment', 'possession_of_industry_plot', principaladdressValidationMessage);">{{possession_of_industry_plot}}</textarea>
                            </div>
                            <span class="error-message error-message-landallotment-possession_of_industry_plot"></span>
                        </div>
                    </div>

                  <div class="row">
                         <div class="form-group col-sm-12">
                                <label>11. (a) Whether industrial license is necessary under the Industrial Development Act for setting up this unit?</label>&nbsp;
                                <input type="checkbox" id="industrial_license_necessary" name="industrial_license_necessary" class="checkbox" value="{{is_checked}}" disabled="">
                        </div>
                    </div>
                <div class="row">
                        <div class="form-group col-sm-12">
                            
                                <label>11. (b). In case license is necessary whether letter of intent is obtained ?</label>&nbsp;
                                <input type="checkbox" id="obtained_letter_of_intent" name="obtained_letter_of_intent" class="checkbox" value="{{is_checked}}" disabled="">
                           
                        
                    <div class=" obtained_letter_of_intent_div" style="display: none;">

                        <div class="form-group col-sm-12" id="obtained_letter_of_intent_doc_container_for_landallotment_view">
                            <label>11. (b).1 Please attach a copy of letter of intent if already obtained or a copy of the application if applied for the same.<span style="color: red;">&nbsp; <br></span></label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                        </div>
                        <div class="form-group col-sm-12" id="obtained_letter_of_intent_doc_name_container_for_landallotment_view" style="display: none;">
                            <label>11. (b).1 Please attach a copy of letter of intent if already obtained or a copy of the application if applied for the same. <span style="color: red;">&nbsp; <br> <span style="color: red;"></span></label><br>
                            <a id="obtained_letter_of_intent_doc_name_download" target="_blank"><label id="obtained_letter_of_intent_doc_name_image_for_landallotment_view" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            
                        </div>
                       </div>
                     </div>
                </div>
                      <div class="row">
                        <div class="form-group col-sm-12">
                            
                                <label>12. Whether the unit has been registered as MSME  or Non-MSEME ? </label>&nbsp;
                                <input type="checkbox" id="regist_letter_msme" name="regist_letter_msme" class="checkbox" value="{{is_checked}}" disabled="">
                           
                        
                    <div class=" regist_letter_msme_div" style="display: none;">

                        <div class="form-group col-sm-12" id="regist_letter_msme_doc_container_for_landallotment_view">
                            <label>12.1 Upload Document.<span style="color: red;">&nbsp; <br></span></label><br>
                           <label class="f-w-n">Document Not Uploaded</label><br>
                        </div>
                        <div class="form-group col-sm-12" id="regist_letter_msme_doc_name_container_for_landallotment_view" style="display: none;">
                            <label>12.1 Upload Document. <span style="color: red;">&nbsp; <br> <span style="color: red;"></span></label><br>
                            <a id="regist_letter_msme_doc_name_download" target="_blank"><label id="regist_letter_msme_doc_name_image_for_landallotment_view" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            
                        </div>
                       </div>
                     </div>
                </div>  
                    <div class="row">
                         <div class="form-group col-sm-12">
                                <label>13. Whether the project involves foreign collaboration ?</label>&nbsp;
                                <input type="checkbox" id="if_project_collaboration" name="if_project_collaboration" class="checkbox" value="{{is_checked}}" disabled="">
                        </div>
                    <div class=" if_project_collaboration_div" style="display: none;">
                        <div class="form-group col-sm-6">
                            <label>13.1 Please indicate the steps taken so far and when the approval from govt. of India is expected.<span class="color-nic-red"></span></label>
                            <div class="input-group">
                                <textarea id="project_collaboration" name="project_collaboration" readonly="" class="form-control" placeholder="Enter Nature of Industry !" maxlength="100" onblur="checkValidation('landallotment', 'project_collaboration', principaladdressValidationMessage);">{{project_collaboration}}</textarea>
                            </div>
                            <span class="error-message error-message-landallotment-project_collaboration"></span>
                        </div>
                     </div>
                    </div>

                    <div class="row">
                         <div class="form-group col-sm-12">
                                <label>14. If the project requires import of capital goods, please state the steps taken so far and expected scheduled for such import ?</label>&nbsp;
                                <input type="checkbox" id="if_project_requires_import" disabled="" name="if_project_requires_import" class="checkbox" value="{{is_checked}}">
                        </div>
                    <div class=" if_project_requires_import_div" style="display: none;">
                        <div class="form-group col-sm-12">
                            <label>14.1 Project requires import of capital goods.</label>
                            <div class="input-group">
                                <textarea id="project_requires_import" readonly="" name="project_requires_import" class="form-control" placeholder="Enter Nature of Industry !" maxlength="100" onblur="checkValidation('landallotment', 'project_requires_import', principaladdressValidationMessage);">{{project_requires_import}}</textarea>
                            </div>
                            <span class="error-message error-message-landallotment-project_requires_import"></span>
                        </div>
                     </div>
                    </div>
                    <div class="row">
                         <div class="form-group col-sm-12 " id="detailed_project_report_doc_container_for_landallotment_view">
                                <label>15. Detailed project report covering the points outlined. <span style="color: red;"> <br></span></label><br>
                                <label class="f-w-n">Document Not Uploaded</label><br>
                            </div>

                            <div class="form-group col-sm-12" id="detailed_project_report_doc_name_container_for_landallotment_view" style="display: none;">
                                <label>15. Detailed project report covering the points outlined. <span style="color: red;"><br>  <span style="color: red;"></span></label><br>
                                <a id="detailed_project_report_doc_name_download" target="_blank"><label id="detailed_project_report_doc_name_image_for_landallotment_view" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                               
                            </div>
                    </div>
                    <div class="row">
                         <div class="form-group col-sm-12 " id="proposed_finance_terms_doc_container_for_landallotment_view">
                                <label>16. Proposed means of finance in terms of equity and term loan sought from various financial institutions GSFC/Own/Banks/Others. <span style="color: red;"> <br></span></label><br>
                               <label class="f-w-n">Document Not Uploaded</label><br>
                            </div>

                            <div class="form-group col-sm-12" id="proposed_finance_terms_doc_name_container_for_landallotment_view" style="display: none;">
                                <label>16. Proposed means of finance in terms of equity and term loan sought from various financial institutions GSFC/Own/Banks/Others. <span style="color: red;"><br> </label><br>
                                <a id="proposed_finance_terms_doc_name_download" target="_blank"><label id="proposed_finance_terms_doc_name_image_for_landallotment_view" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                                
                            </div>
                    </div>
                    <span class="box-title f-w-b page-header m-b-0">17. Nos. of persons likely to be employed.&nbsp;<span class="color-nic-red"></span></span>
                    <div class="row">
                        <div class="form-group col-sm-6">17.1 &nbsp;
                            <input type="checkbox" id="no_of_persons_likely_emp" name="no_of_persons_likely_emp" class="checkbox" disabled="" value="{{is_checked}}">&nbsp;Skilled
                        </div>
                        <div class="form-group no_of_persons_likely_emp_div" style="display: none;">
                            <input type="text" id="no_of_persons_likely_emp_no" name="no_of_persons_likely_emp_no" class="form-control" placeholder="Enter Employed Skilled No !"
                                       maxlength="100" onblur="checkValidation('landallotment', 'no_of_persons_likely_emp_no', applicantNameValidationMessage);" readonly="" value="{{no_of_persons_likely_emp_no}}">
                           
                            <span class="error-message error-message-landallotment-no_of_persons_likely_emp_no"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">17.2 &nbsp;
                            <input type="checkbox" id="no_of_persons_likely_emp_unskilled" name="no_of_persons_likely_emp_unskilled" class="checkbox" disabled="" value="{{is_checked}}">&nbsp;Unskilled
                        </div>
                        <div class="form-group no_of_persons_likely_emp_unskilled_div" style="display: none;">
                                <input type="text" id="no_of_persons_likely_emp_no_unskilled" name="no_of_persons_likely_emp_no_unskilled" class="form-control" placeholder="Enter Employed Unskilled No !"
                                       maxlength="100" onblur="checkValidation('landallotment', 'no_of_persons_likely_emp_no_unskilled', applicantNameValidationMessage);" readonly="" value="{{no_of_persons_likely_emp_no_unskilled}}">
                       </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">17.3 &nbsp;
                            <input type="checkbox" id="no_of_persons_likely_emp_staff" name="no_of_persons_likely_emp_staff" class="checkbox" disabled="" value="{{is_checked}}">&nbsp;Staff
                        </div>
                        <div class="form-group no_of_persons_likely_emp_staff_div" style="display: none;">
                                <input type="text" id="no_of_persons_likely_emp_no_staff" name="no_of_persons_likely_emp_no_staff" class="form-control" placeholder="Enter Staff No !"
                                       maxlength="100" readonly="" onblur="checkValidation('landallotment', 'no_of_persons_likely_emp_no_staff', applicantNameValidationMessage);" value="{{no_of_persons_likely_emp_no_staff}}">
                           
                            <span class="error-message error-message-landallotment-no_of_persons_likely_emp_no_staff"></span>
                       </div>
                    </div>
                    <div class="row">
                         <div class="form-group col-sm-12 " id="details_of_manufacturing_doc_container_for_landallotment_view">
                                <label>18.1 Details of manufacturing process (Please attach a short note on separate sheet)<span style="color: red;"> <br></span></label><br>
                                <label class="f-w-n">Document Not Uploaded</label><br>
                            </div>

                            <div class="form-group col-sm-12" id="details_of_manufacturing_doc_name_container_for_landallotment_view" style="display: none;">
                                <label>18.1 Details of manufacturing process (Please attach a short note on separate sheet) <span style="color: red;"><br>  <span style="color: red;"></span></label><br>
                                <a id="details_of_manufacturing_doc_name_download" target="_blank"><label id="details_of_manufacturing_doc_name_image_for_landallotment_view" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                                
                            </div>
                    </div>
                    <span class="box-title f-w-b page-header m-b-0">19. If you are an entrepreneur belonging ? </span>
                    <div class="row">
                        <div class="form-group col-sm-6">19.1 &nbsp;
                            <input type="checkbox" id="if_backward_class_bac" name="if_backward_class_bac" disabled="" class="checkbox" value="{{is_checked}}">&nbsp;OBC
                        </div>
                        <div class=" if_backward_class_bac_div" style="display: none;">
                           <div class="form-group col-sm-12 " id="if_backward_class_bac_doc_container_for_landallotment_view">
                                <label>Please Upload document<span style="color: red;"><br>(Maximum File Size: 1MB)&nbsp; (Upload PDF Only)</span></label><br>
                                <label class="f-w-n">Document Not Uploaded</label><br>
                            </div>

                            <div class="form-group col-sm-12" id="if_backward_class_bac_doc_name_container_for_landallotment_view" style="display: none;">
                                <label>Please Upload document<span style="color: red;"><br> </label><br>
                                <a id="if_backward_class_bac_doc_name_download" target="_blank"><label id="if_backward_class_bac_doc_name_image_for_landallotment_view" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                                
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">19.2 &nbsp;
                            <input type="checkbox" id="if_backward_class_scst" name="if_backward_class_scst" disabled="" class="checkbox" value="{{is_checked}}">&nbsp;SC/ST
                        </div>
                        <div class=" if_backward_class_scst_div" style="display: none;">
                       <div class="form-group col-sm-12 " id="if_backward_class_scst_doc_container_for_landallotment_view">
                                <label>Please Upload document<span style="color: red;"> <br>(Maximum File Size: 1MB)&nbsp; (Upload PDF Only)</span></label><br>
                                <label class="f-w-n">Document Not Uploaded</label><br>
                            </div>

                            <div class="form-group col-sm-12" id="if_backward_class_scst_doc_name_container_for_landallotment_view" style="display: none;">
                                <label>Please Upload document<span style="color: red;"><br>  <span style="color: red;"></span></label><br>
                                <a id="if_backward_class_scst_doc_name_download" target="_blank"><label id="if_backward_class_scst_doc_name_image_for_landallotment_view" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                                
                            </div>
                         </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">19.3 &nbsp;
                            <input type="checkbox" id="if_backward_class_ex_serv" name="if_backward_class_ex_serv" disabled="" class="checkbox" value="{{is_checked}}">&nbsp;Ex-Service Men
                        </div>
                        <div class="row if_backward_class_ex_serv_div" style="display: none;">   
                         <div class="form-group col-sm-12" id="if_backward_class_ex_serv_doc_container_for_landallotment_view">
                                <label>Please Upload document<span style="color: red;"> <br>(Maximum File Size: 1MB)&nbsp; (Upload PDF Only)</span></label><br>
                                <label class="f-w-n">Document Not Uploaded</label><br>
                            </div>

                            <div class="form-group col-sm-12" id="if_backward_class_ex_serv_doc_name_container_for_landallotment_view" style="display: none;">
                                <label>Please Upload document<span style="color: red;"><br>  <span style="color: red;"></span></label><br>
                                <a id="if_backward_class_ex_serv_doc_name_download" target="_blank"><label id="if_backward_class_ex_serv_doc_name_image_for_landallotment_view" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                                
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">19.4 &nbsp;
                            <input type="checkbox" id="if_backward_class_wm" disabled="" name="if_backward_class_wm" disabled="" class="checkbox" value="{{is_checked}}">&nbsp;Women
                        </div>
                        <div class="row if_backward_class_wm_div" style="display: none;">
                          <div class="form-group col-sm-12" id="if_backward_class_wm_doc_container_for_landallotment_view">
                                <label>Please Upload document<span style="color: red;"> <br>(Maximum File Size: 1MB)&nbsp; (Upload PDF Only)</span></label><br>
                                <label class="f-w-n">Document Not Uploaded</label><br>
                            </div>

                            <div class="form-group col-sm-12" id="if_backward_class_wm_doc_name_container_for_landallotment_view" style="display: none;">
                                <label>Please Upload document<span style="color: red;"><br>  <span style="color: red;"></span></label><br>
                                <a id="if_backward_class_wm_doc_name_download" target="_blank"><label id="if_backward_class_wm_doc_name_image_for_landallotment_view" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                                
                            </div>
                       </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">19.5 &nbsp;
                            <input type="checkbox" id="if_backward_class_ph" name="if_backward_class_ph" disabled="" class="checkbox" value="{{is_checked}}">&nbsp;PH
                        </div>
                     <div class="row if_backward_class_ph_div" style="display: none;">
                        <div class="form-group col-sm-12" id="if_backward_class_ph_doc_container_for_landallotment_view">
                                <label>Please Upload document<span style="color: red;"> <br>(Maximum File Size: 1MB)&nbsp; (Upload PDF Only)</span></label><br>
                                <label class="f-w-n">Document Not Uploaded</label><br>
                            </div>

                            <div class="form-group col-sm-12" id="if_backward_class_ph_doc_name_container_for_landallotment_view" style="display: none;">
                                <label>Please Upload document<span style="color: red;"><br>  <span style="color: red;"></span></label><br>
                                <a id="if_backward_class_ph_doc_name_download" target="_blank"><label id="if_backward_class_ph_doc_name_image_for_landallotment_view" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                                
                            </div>
                            </div>
                    </div>
                                        <div class="row">
                        <div class="form-group col-sm-6">19.6 &nbsp;
                            <input type="checkbox" id="if_belonging_transg" name="if_belonging_transg" disabled="" class="checkbox" value="{{is_checked}}">&nbsp;Transgender
                        </div>
                     <div class="row if_belonging_transg_div" style="display: none;">
                        <div class="form-group col-sm-12" id="if_belonging_transg_doc_container_for_landallotment_view">
                                <label>Please Upload document</label><br>
                                <label class="f-w-n">Document Not Uploaded</label><br>
                            </div>

                            <div class="form-group col-sm-12" id="if_belonging_transg_doc_name_container_for_landallotment_view" style="display: none;">
                                <label>Please Upload document</label><br>
                                <a id="if_belonging_transg_doc_name_download" target="_blank"><label id="if_belonging_transg_doc_name_image_for_landallotment_view" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                                
                            </div>
                            </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">19.7 &nbsp;
                            <input type="checkbox" id="if_belonging_other" name="if_belonging_other" disabled="" class="checkbox" value="{{is_checked}}">&nbsp;Others
                        </div>
                    
                    </div>
                    <div class="row">
                         <div class="form-group col-sm-12">
                            <label>20. (a) If You are a bonafide of DNH ?<span style="color: red;"> </span> &emsp;</label>
                            <input type="radio" id="if_bonafide_yes" name="if_bonafide" disabled="" value="{{IS_CHECKED_YES}}"> Yes &emsp; 
                            <input type="radio" id="if_bonafide_no" name="if_bonafide" disabled="" value="{{IS_CHECKED_NO}}"> No
                        </div>
                    <div class=" if_bonafide_div" style="display: none;">
                         <div class="form-group col-sm-12 " id="bonafide_of_dnh_doc_container_for_landallotment_view">
                                <label>20.1 (a) Upload the bonafide of DNH and attach domicile certificate.<span style="color: red;"> <br></span></label><br>
                                <label class="f-w-n">Document Not Uploaded</label><br>
                            </div>

                            <div class="form-group col-sm-12" id="bonafide_of_dnh_doc_name_container_for_landallotment_view" style="display: none;">
                                <label>20.1 (a) Upload the bonafide of DNH and attach domicile certificate. <span style="color: red;"><br>  <span style="color: red;"></span></label><br>
                                <a id="bonafide_of_dnh_doc_name_download" target="_blank"><label id="bonafide_of_dnh_doc_name_image_for_landallotment_view" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                                
                             </div>
                        </div>
                    </div>

                     <div class="row">
                        <div class="form-group col-sm-12">
                            <label>20. (b) if not, please state particulars of the place to which you belong.<span style="color: red;"> </span> &emsp;</label>
                            <input type="radio" id="ifnot_state_particular_place_yes" disabled="" name="ifnot_state_particular_place" value="{{IS_CHECKED_YES}}"> Yes &emsp; 
                            <input type="radio" id="ifnot_state_particular_place_no" disabled="" name="ifnot_state_particular_place" value="{{IS_CHECKED_NO}}"> No
                        </div>
                        <div class=" ifnot_state_particular_place_div" style="display: none;">
                    <div class="form-group col-sm-12">
                            <label>20.1 (b) State particulars of the place to which you belong<span class="color-nic-red"></span></label>
                            <div class="input-group">
                                <textarea id="state_particular_place" readonly="" name="state_particular_place" class="form-control" placeholder="Enter Nature of Industry !" maxlength="100" onblur="checkValidation('landallotment', 'state_particular_place', principaladdressValidationMessage);">{{state_particular_place}}</textarea>
                            </div>
                            <span class="error-message error-message-landallotment-state_particular_place"></span>
                        </div>
                     </div>
                    </div>
                    
                    <div class="row">
                         <div class="form-group col-sm-12 " id="information_raw_materials_doc_container_for_landallotment_view">
                                <label>21. Upload Information about raw materials, area required and production. <span style="color: red;"><br></span></label><br>
                                <label class="f-w-n">Document Not Uploaded</label><br>
                            </div>

                            <div class="form-group col-sm-12" id="information_raw_materials_doc_name_container_for_landallotment_view" style="display: none;">
                                <label>21. Upload Information about raw materials, area required and production. </label><br>
                                <a id="information_raw_materials_doc_name_download" target="_blank"><label id="information_raw_materials_doc_name_image_for_landallotment_view" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                                
                            </div>
                    </div>
                    <div class="form-group col-sm-6">
                            <label>21.1 Details of open space required and purpose.<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="detail_of_space" name="detail_of_space" readonly="" class="form-control" placeholder="Enter open space required and purpose !" maxlength="100" onblur="checkValidation('landallotment', 'detail_of_space', detailValidationMessage);">{{detail_of_space}}</textarea>
                            </div>
                            <span class="error-message error-message-landallotment-detail_of_space"></span>
                        </div>
                    <div class="row">
                         <div class="form-group col-sm-12 " id="infrastructure_requirement_doc_container_for_landallotment_view">
                                <label>22. Upload the Infrastructure requirement. </label><br>
                               <label class="f-w-n">Document Not Uploaded</label><br>
                            </div>

                            <div class="form-group col-sm-12" id="infrastructure_requirement_doc_name_container_for_landallotment_view" style="display: none;">
                                <label>22. Upload the Infrastructure requirement. </label><br>
                                <a id="infrastructure_requirement_doc_name_download" target="_blank"><label id="infrastructure_requirement_doc_name_image_for_landallotment_view" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                                
                            </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>22.1 Please indicate Indian standard to followed for Water/Air treatment.<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="treatment_indicate" name="treatment_indicate" readonly="" class="form-control" placeholder="Enter Followed for Treatment !" maxlength="100" onblur="checkValidation('landallotment', 'treatment_indicate', detailValidationMessage);">{{treatment_indicate}}</textarea>
                            </div>
                            <span class="error-message error-message-landallotment-treatment_indicate"></span>
                        </div>
                       <div class="form-group col-sm-12 " id="effluent_teratment_doc_container_for_landallotment_view">
                                <label>22.2 Upload Document of separate sheet for the process of effluent treatment.</label><br>
                                <label class="f-w-n">Document Not Uploaded</label><br>
                            </div>

                            <div class="form-group col-sm-12" id="effluent_teratment_doc_name_container_for_landallotment_view" style="display: none;">
                                <label>22.2 Upload Document of separate sheet for the process of effluent treatment.</label><br>
                                <a id="effluent_teratment_doc_name_download" target="_blank"><label id="effluent_teratment_doc_name_image_for_landallotment_view" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                                
                            </div>
                        <div class="form-group col-sm-6">
                            <label>22.3 Details of emission of gases and its likely effect on adjoining plants, cultivation and habitants.<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="detail_of_emission_of_gases" readonly="" name="detail_of_emission_of_gases" class="form-control" placeholder="Enter Details of gases etc !" maxlength="100" onblur="checkValidation('landallotment', 'detail_of_emission_of_gases', detailValidationMessage);">{{detail_of_emission_of_gases}}</textarea>
                            </div>
                            <span class="error-message error-message-landallotment-detail_of_emission_of_gases"></span>
                        </div>
                         <div class="form-group col-sm-12" id="emission_of_gases_doc_container_for_landallotment_view">
                            <label>22.4 Upload Document of emission of gases.</label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                        </div>
                        <div class="form-group col-sm-12" id="emission_of_gases_doc_name_container_for_landallotment_view" style="display: none;">
                            <label>22.4 Upload Document of emission of gases.<span style="color: red;">&nbsp; <br> <span style="color: red;"></span></label><br>
                            <a id="emission_of_gases_doc_name_download" target="_blank"><label id="emission_of_gases_doc_name_image_for_landallotment_view" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                    
                        </div>
                        
                    </div></br>

                   
                    <h2 class="box-title f-w-b page-header color-nic-blue f-s-20px m-b-0" style="text-align: center">CHECKLIST FOR THE ALLOTMENT OF PLOT</h2>
                    <div class="row">
                        <div class="form-group col-sm-12" id="copy_authority_letter_doc_container_for_landallotment_view">
                            <label>23. Copy of Authority Letter/Board of Director’s Resolution of company depending on constitution of the applicant.</label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                        </div>
                        <div class="form-group col-sm-12" id="copy_authority_letter_doc_name_container_for_landallotment_view" style="display: none;">
                            <label>23. Copy of Authority Letter/Board of Director’s Resolution of company depending on constitution of the applicant.<span style="color: red;">&nbsp; <br> <span style="color: red;"></span></label><br>
                            <a id="copy_authority_letter_doc_name_download" target="_blank"><label id="copy_authority_letter_doc_name_image_for_landallotment_view" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                    
                        </div>

                         <div class="form-group col-sm-12" id="copy_project_profile_doc_container_for_landallotment_view">
                            <label>24. Upload Copy of Project profile.</label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                        </div>
                        <div class="form-group col-sm-12" id="copy_project_profile_doc_name_container_for_landallotment_view" style="display: none;">
                            <label>24. Upload Copy of Project profile.</label><br>
                            <a id="copy_project_profile_doc_name_download" target="_blank"><label id="copy_project_profile_doc_name_image_for_landallotment_view" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                           
                        </div>

                        <div class="form-group col-sm-12 " id="demand_of_deposit_draft_container_for_landallotment_view">
                                <label>25. Upload Bank draft or payment confirmation towards earnest money and application fees</label><br>
                                <label class="f-w-n">Document Not Uploaded</label><br>
                            </div>

                            <div class="form-group col-sm-12" id="demand_of_deposit_draft_name_container_for_landallotment_view" style="display: none;">
                                <label>25. Upload Bank draft or payment confirmation towards earnest money and application fees<span style="color: red;"></span></label><br>
                                <a id="demand_of_deposit_draft_name_download" target="_blank"><label id="demand_of_deposit_draft_name_image_for_landallotment_view" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                              </div> 

                         <div class="form-group col-sm-12" id="copy_proposed_land_doc_container_for_landallotment_view">
                            <label>26. Upload Copy of proposed land utilization plan.</label><br>
                           <label class="f-w-n">Document Not Uploaded</label><br>
                        </div>
                        <div class="form-group col-sm-12" id="copy_proposed_land_doc_name_container_for_landallotment_view" style="display: none;">
                            <label>26. Upload Copy of proposed land utilization plan. </label><br>
                            <a id="copy_proposed_land_doc_name_download" target="_blank"><label id="copy_proposed_land_doc_name_image_for_landallotment_view" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            
                        </div>

                        <div class="form-group col-sm-12" id="copy_of_partnership_deed_doc_container_for_landallotment_view">
                            <label>27. Upload Copy of Partnership deed/memorandum of association/article of association depending on constitution of the applicant</label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                        </div>
                        <div class="form-group col-sm-12" id="copy_of_partnership_deed_doc_name_container_for_landallotment_view" style="display: none;">
                            <label>27. Upload Copy of Partnership deed/memorandum of association and article of association depending on constitution of the applicant. </label><br>
                            <a id="copy_of_partnership_deed_doc_name_download" target="_blank"><label id="copy_of_partnership_deed_doc_name_image_for_landallotment_view" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            
                        </div>

                        <div class="form-group col-sm-12" id="relevant_experience_doc_container_for_landallotment_view">
                            <label>28. Upload Document showing net worth or turnover of previous year and relevant experience.</label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                        </div>
                        <div class="form-group col-sm-12" id="relevant_experience_doc_name_container_for_landallotment_view" style="display: none;">
                            <label>28. Upload Document showing net worth or turnover of previous year and relevant experience. <span style="color: red;">&nbsp; <br> <span style="color: red;"></span></label><br>
                            <a id="relevant_experience_doc_name_download" target="_blank"><label id="relevant_experience_doc_name_image_for_landallotment_view" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            
                        </div>

                        <div class="form-group col-sm-12">
                            <label>29. Ministry and Export promotion council in case of 100% EOU or Not !.<span style="color: red;">* </span> &emsp;</label>
                            <input type="radio" id="if_promotion_council_yes" name="if_promotion_council"  
                                   disabled="" value="{{IS_CHECKED_YES}}"> Yes &emsp; 
                            <input type="radio" id="if_promotion_council_no" name="if_promotion_council" 
                                   disabled="" value="{{IS_CHECKED_NO}}"> No
                        </div>
                    <div class=" if_promotion_council_div" style="display: none;">
                        <div class="form-group col-sm-12" id="certy_by_direc_indus_doc_container_for_landallotment_view">
                            <label>29.1 Upload Certificate issued by Directorate of industry.</label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                        </div>
                        <div class="form-group col-sm-12" id="certy_by_direc_indus_doc_name_container_for_landallotment_view" style="display: none;">
                            <label>29.1 Upload Certificate issued by Directorate of industry. <span style="color: red;">&nbsp; <br> <span style="color: red;"></span></label><br>
                            <a id="certy_by_direc_indus_doc_name_download" target="_blank"><label id="certy_by_direc_indus_doc_name_image_for_landallotment_view" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            
                         </div>
                        </div>

                        <div class="form-group col-sm-12" id="other_relevant_doc_container_for_landallotment_view">
                            <label>30. Upload Any other relevant document.</label><br>
                           <label class="f-w-n">Document Not Uploaded</label><br>
                        </div>
                        <div class="form-group col-sm-12" id="other_relevant_doc_name_container_for_landallotment_view" style="display: none;">
                            <label>30. Upload Any other relevant document.</label><br>
                            <a id="other_relevant_doc_name_download" target="_blank"><label id="other_relevant_doc_name_image_for_landallotment_view" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        
                        </div>
                    </div>
               


                    <div class="row">
                        <div class="form-group col-sm-12"> 
                            <strong>31. Declaration</strong><br/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-12">
                            <div class="input-group">
                                <span class="input-group-addon">&nbsp;
                                    <input type="checkbox" class="" name="declaration" id="declaration" autocomplete="true" value="{{is_checked}}" onblur="checkValidation('landallotment', 'declaration', declarationOneValidationMessage);" disabled>&nbsp;I/We hereby give an undertaking that I/We will abide by the terms and conditions laid down by the Administration of Dadra and Nagar Haveli from time to time.
                                    <span style="color: red;"></span>
                                </span>
                            </div>
                            <span class="error-message error-message-landallotment-declaration"></span>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-12 m-b-5px" id="seal_and_stamp_container_for_landallotment_view">
                            <label>32. Signature <span style="color: red;"> (Maximum File Size: 2MB)</span></label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                        </div>
                        <div class="form-group col-sm-12" id="seal_and_stamp_name_container_for_landallotment_view" style="display: none;">
                            <label>32. Signature <span style="color: red;"></label><br>
                            <a id="seal_and_stamp_download" target="_blank"><img id="seal_and_stamp_name_image_for_landallotment_view" style="width: 250px; height: 250px; border: 2px solid blue;"></a>
                        </div>
                    </div>

                    <div class="form-group">
                        <button type="button" class="btn btn-sm btn-danger" onclick="showTableContainer('landallotment');"><i class="fas fa-times"></i> Close</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>