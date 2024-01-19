<div class="row">
    <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title" style="float: none; text-align: center;">Allotment of Plot</h3>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">Application for Allotment of Plot for Industrial Purpose in Government Industrial Estates.</div>
            </div>
            <form role="form" id="landallotment_form" name="landallotment_form" onsubmit="return false;">
                
                <input type="hidden" id="landallotment_id" name="landallotment_id" value="{{landallotment_data.landallotment_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-12 text-center">
                            <span class="error-message error-message-landallotment f-w-b" style="border-bottom: 2px solid red;"></span>
                        </div>
                    </div>
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
                                    data-placeholder="Select Entity / Establishment Type" style="width: 100%;" onblur="checkValidation('landallotment', 'entity_establishment_type', entityEstablishmentTypeValidationMessage);">
                            </select>
                            </div>
                            <span class="error-message error-message-landallotment-entity_establishment_type"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>1. Name of Applicant<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="name_of_applicant" name="name_of_applicant" class="form-control" placeholder="Enter Name of Applicant !"
                                       maxlength="100" onblur="checkValidation('landallotment', 'name_of_applicant', applicantNameValidationMessage);" value="{{landallotment_data.name_of_applicant}}">
                            </div>
                            <span class="error-message error-message-landallotment-name_of_applicant"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>2. Applicant Address<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="applicant_address" name="applicant_address" class="form-control" placeholder="Enter Applicant Address !"
                                       maxlength="100" onblur="checkValidation('landallotment', 'applicant_address', applicantAddressValidationMessage);" value="{{landallotment_data.applicant_address}}">
                            </div>
                            <span class="error-message error-message-landallotment-applicant_address"></span>
                        </div>
                        
                    </div>
                     <div class="row">
                        <div class="form-group col-sm-6">
                            <label>3. Email<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="email" name="email" class="form-control" placeholder="Enter Email !"
                                       maxlength="100" onkeypress="emailIdValidation($(this));" onblur="checkValidation('landallotment', 'email', emailValidationMessage);" value="{{landallotment_data.email}}">
                            </div>
                            <span class="error-message error-message-landallotment-email"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>4. Telephone No.<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="telehpone_no" name="telehpone_no" class="form-control" placeholder="Enter Telephone No. !"
                                       maxlength="100" onkeyup="checkNumeric($(this));" onblur="checkValidation('landallotment', 'telehpone_no', applicantNameValidationMessage);" value="{{landallotment_data.telehpone_no}}">
                            </div>
                            <span class="error-message error-message-landallotment-telehpone_no"></span>
                        </div>
                        
                        
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>5. Date of Application<span style="color: red;">*</span></label>
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
                            <label>6. Villages/Government Industrial Estate<span style="color: red;">*</span></label>
                            <div class="input-group">
                                <select class="form-control" id="villages_for_noc_data" name="villages_for_noc_data"
                                        data-placeholder="Status !"  onchange="checkValidation('landallotment', 'villages_for_noc_data', villageNameValidationMessage);
                                    getPlotData($(this), 'plot_no', 'landallotment_data');">
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
                                    getAreaData($(this));">
                                    <option value="">Select Plot NO</option>
                                </select>
                            </div>
                            <span class="error-message error-message-landallotment-plot_no_for_landallotment_data"></span>
                        </div>

                        <div class="form-group col-sm-6">
                            <label>8. Admeasuring in square metre <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="govt_industrial_estate_area" readonly="" name="govt_industrial_estate_area" class="form-control" placeholder="Enter Admeasuring square metre !" maxlength="100" value="{{landallotment_data.govt_industrial_estate_area}}">
                            </div>
                            <span class="error-message error-message-landallotment-govt_industrial_estate_area"></span>
                        </div>
                    </div>
                   <div class="col-xs-12">
                        <div style="background-color: #d2d6de; padding: 5px;">
                            <span class="f-w-b" style="font-size: 15px; color: #000;">9. (a) Name and full address of the applicant i.e. Proprietor, Partners or Directors.</span>
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
                            <button type="button" class="btn btn-sm btn-nic-blue float-right" id="submit_btn_for_principle_product" onclick="Landallotment.listview.addMultipleProprietor({});" style="margin-right: 5px;margin-top: 5px;"><i class="fas fa-plus-circle" style="margin-right: 5px;"></i>Add Applicant 
                            </button>
                        </div>
                    </div>
                    <br/>
                    <br/>
                    
                   <div class="row">
                        <div class="form-group col-sm-12" id="bio_data_doc_container_for_landallotment">
                            <label>10. (b) Complete bio-data of above persons.<span style="color: red;"> <br></span></label><br>
                            <input type="file" id="bio_data_doc" name="bio_data_doc"
                                   accept="image/pdf">
                             <div class="error-message error-message-landallotment-bio_data_doc"></div>
                        </div>

                     <div class="form-group col-sm-12" id="bio_data_doc_name_container_for_landallotment" style="display: none;">
                            <label>10. (b) Complete bio-data of above persons.<span style="color: red;"><br>  <span style="color: red;"></span></label><br>
                            <a id="bio_data_doc_name_download" target="_blank"><label id="bio_data_doc_name_image_for_landallotment" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            
                        </div>
                  
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>11. Constitution of the Enterprise<span class="color-nic-red">*</span></label>
                             <div class="input-group">
                                <select class="form-control" id="constitution_artical" name="constitution_artical"
                                        data-placeholder="Status !" onchange="Landallotment.listview.getConstitution(this);" onblur="checkValidation('landallotment', 'constitution_artical', expansionIndustryValidationMessage);">
                                    <option value="">Select Enterprise Category</option>
                                    <option value="proprietary">Proprietary</option>
                                    <option value="partnership">Partnership</option>
                                    <option value="private">Private</option>
                                    <option value="public">Public</option>
                                    <option value="limited_liability_partnership">Limited liability partnership</option>
                                    <option value="others">Others</option>
                                </select>
                            </div>
                            <span class="error-message error-message-landallotment-constitution_artical"></span>
                        </div></br>
                        <div  class=" constitution_artical_div" style="display: none;">
                            <div class="form-group col-sm-12" id="constitution_artical_doc_container_for_landallotment">
                                <label>11.1 Please upload Articles of Association or copy of Partnership Deed of copy of registration in case of cooperative society. <span style="color: red;"> <br></span></label><br>
                                <input type="file" id="constitution_artical_doc_for_landallotment" name="constitution_artical_doc_for_landallotment"
                                       accept="image/pdf">
                                <div class="error-message error-message-landallotment-constitution_artical_doc_for_landallotment"></div>
                            </div>

                            <div class="form-group col-sm-12" id="constitution_artical_doc_name_container_for_landallotment" style="display: none;">
                                <label>11.1 Please upload Articles of Association or copy of Partnership Deed of copy of registration in case of cooperative society. <span style="color: red;"><br>  <span style="color: red;"></span></label><br>
                                <a id="constitution_artical_doc_download" target="_blank"><label id="constitution_artical_doc_name_image_for_landallotment" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                                
                            </div>
                        </div>
                    
                             
                        </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>11.(a) Category of the Enterprise.<span class="color-nic-red">*</span></label>
                             <div class="input-group">
                                <select class="form-control" id="expansion_industry" name="expansion_industry"
                                        data-placeholder="Status !" onblur="checkValidation('landallotment', 'expansion_industry', expansionIndustryValidationMessage);">
                                    <option value="">Select Category</option>
                                    <option value="New Industry ">New Industry </option>
                                    <option value="Expansion of Existing Industry">Expansion of Existing Industry</option>
                                </select>
                            </div>
                            <span class="error-message error-message-landallotment-expansion_industry"></span>
                        </div></br>
                    
                        <div class="form-group col-sm-6">
                            <label>11.(b) Nature of Industry proposed to be Established.<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="nature_of_industry" name="nature_of_industry" class="form-control" placeholder="Enter Nature of Industry !" maxlength="100" onblur="checkValidation('landallotment', 'nature_of_industry', natureOfIndustryValidationMessage);">{{landallotment_data.nature_of_industry}}</textarea>
                            </div>
                            <span class="error-message error-message-landallotment-nature_of_industry"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>11.(c) Possession of in any industrial plots if so give particulars.<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="possession_of_industry_plot" name="possession_of_industry_plot" class="form-control" placeholder="Enter Possession of Industrial Plot !" maxlength="100" onblur="checkValidation('landallotment', 'possession_of_industry_plot', possessionOfIndustryValidationMessage);">{{landallotment_data.possession_of_industry_plot}}</textarea>
                            </div>
                            <span class="error-message error-message-landallotment-possession_of_industry_plot"></span>
                        </div>
                    </div>

                  <div class="row">
                         <div class="form-group col-sm-12">
                                <label>11. (a) Whether industrial license is necessary under the Industrial Development Act for setting up this unit?</label>&nbsp;
                                <input type="checkbox" id="industrial_license_necessary" name="industrial_license_necessary" class="checkbox" value="{{is_checked}}">
                                <span class="error-message error-message-landallotment-industrial_license_necessary"></span>
                        </div>
                    </div>
                <div class="row">
                        <div class="form-group col-sm-12">
                            
                                <label>11. (b). In case license is necessary whether letter of intent is obtained ?</label>&nbsp;
                                <input type="checkbox" id="obtained_letter_of_intent" name="obtained_letter_of_intent" class="checkbox" value="{{is_checked}}" disabled>
                                <span class="error-message error-message-landallotment-obtained_letter_of_intent"></span>
                           
                        
                    <div class=" obtained_letter_of_intent_div" style="display: none;">

                        <div class="form-group col-sm-12" id="obtained_letter_of_intent_doc_container_for_landallotment">
                            <label>11. (b).1 Please attach a copy of letter of intent if already obtained or a copy of the application if applied for the same.<span style="color: red;">&nbsp; <br></span></label><br>
                            <input type="file" id="obtained_letter_of_intent_doc_for_landallotment" name="obtained_letter_of_intent_doc_for_landallotment"
                                   accept="image/pdf">
                            <div class="error-message error-message-landallotment-obtained_letter_of_intent_doc_for_landallotment"></div>
                        </div>
                        <div class="form-group col-sm-12" id="obtained_letter_of_intent_doc_name_container_for_landallotment" style="display: none;">
                            <label>11. (b).1 Please attach a copy of letter of intent if already obtained or a copy of the application if applied for the same. <span style="color: red;">&nbsp; <br> <span style="color: red;"></span></label><br>
                            <a id="obtained_letter_of_intent_doc_name_download" target="_blank"><label id="obtained_letter_of_intent_doc_name_image_for_landallotment" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            
                        </div>
                       </div>
                     </div>
                </div>
                      <div class="row">
                        <div class="form-group col-sm-12">
                            
                                <label>12. Whether the unit has been registered as MSME  or Non-MSME ? </label>&nbsp;
                                <input type="checkbox" id="regist_letter_msme" name="regist_letter_msme" class="checkbox" value="{{is_checked}}" disabled>
                                <span class="error-message error-message-landallotment-regist_letter_msme"></span>
                           
                        
                    <div class=" regist_letter_msme_div" style="display: none;">

                        <div class="form-group col-sm-12" id="regist_letter_msme_doc_container_for_landallotment">
                            <label>12.1 Upload Document.<span style="color: red;">&nbsp; <br></span></label><br>
                            <input type="file" id="regist_letter_msme_doc_for_landallotment" name="regist_letter_msme_doc_for_landallotment"
                                   accept="image/pdf">
                            <div class="error-message error-message-landallotment-regist_letter_msme_doc_for_landallotment"></div>
                        </div>
                        <div class="form-group col-sm-12" id="regist_letter_msme_doc_name_container_for_landallotment" style="display: none;">
                            <label>12.1 Upload Document. <span style="color: red;">&nbsp; <br> <span style="color: red;"></span></label><br>
                            <a id="regist_letter_msme_doc_name_download" target="_blank"><label id="regist_letter_msme_doc_name_image_for_landallotment" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            
                        </div>
                       </div>
                     </div>
                </div>  
                    <div class="row">
                         <div class="form-group col-sm-12">
                                <label>13. Whether the project involves foreign collaboration ?</label>&nbsp;
                                <input type="checkbox" id="if_project_collaboration" name="if_project_collaboration" class="checkbox" value="{{is_checked}}" >
                                <span class="error-message error-message-landallotment-if_project_collaboration"></span>
                        </div>
                    <div class=" if_project_collaboration_div" style="display: none;">
                        <div class="form-group col-sm-6">
                            <label>13.1 Please indicate the steps taken so far and when the approval from govt. of India is expected.<span class="color-nic-red"></span></label>
                            <div class="input-group">
                                <textarea id="project_collaboration" name="project_collaboration" class="form-control" placeholder="Enter Detail of collaboration!" maxlength="100" onblur="checkValidation('landallotment', 'project_collaboration', detailValidationMessage);">{{landallotment_data.project_collaboration}}</textarea>
                            </div>
                            <span class="error-message error-message-landallotment-project_collaboration"></span>
                        </div>
                     </div>
                    </div>

                    <div class="row">
                         <div class="form-group col-sm-12">
                                <label>14. If the project requires import of capital goods, please state the steps taken so far and expected scheduled for such import ?</label>&nbsp;
                                <input type="checkbox" id="if_project_requires_import" name="if_project_requires_import" class="checkbox" value="{{is_checked}}">
                                <span class="error-message error-message-landallotment-if_project_requires_import"></span>
                        </div>
                    <div class=" if_project_requires_import_div" style="display: none;">
                        <div class="form-group col-sm-12">
                            <label>14.1 Project requires import of capital goods.</label>
                            <div class="input-group">
                                <textarea id="project_requires_import" name="project_requires_import" class="form-control" placeholder="Enter Detail of Project Requires import !" maxlength="100" onblur="checkValidation('landallotment', 'project_requires_import', detailValidationMessage);">{{landallotment_data.project_requires_import}}</textarea>
                            </div>
                            <span class="error-message error-message-landallotment-project_requires_import"></span>
                        </div>
                     </div>
                    </div>
                    <div class="row">
                         <div class="form-group col-sm-12 " id="detailed_project_report_doc_container_for_landallotment">
                                <label>15. Detailed project report covering the points outlined. <span style="color: red;"> <br></span></label><br>
                                <input type="file" id="detailed_project_report_doc_for_landallotment" name="detailed_project_report_doc_for_landallotment"
                                       accept="image/pdf">
                                <div class="error-message error-message-landallotment-detailed_project_report_doc_for_landallotment"></div>
                            </div>

                            <div class="form-group col-sm-12" id="detailed_project_report_doc_name_container_for_landallotment" style="display: none;">
                                <label>15. Detailed project report covering the points outlined. <span style="color: red;"><br>  <span style="color: red;"></span></label><br>
                                <a id="detailed_project_report_doc_name_download" target="_blank"><label id="detailed_project_report_doc_name_image_for_landallotment" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                                
                            </div>
                    </div>
                    <div class="row">
                         <div class="form-group col-sm-12 " id="proposed_finance_terms_doc_container_for_landallotment">
                                <label>16. Proposed means of finance in terms of equity and term loan sought from various financial institutions GSFC/Own/Banks/Others. <span style="color: red;"> <br></span></label><br>
                                <input type="file" id="proposed_finance_terms_doc_for_landallotment" name="proposed_finance_terms_doc_for_landallotment"
                                       accept="image/pdf">
                                <div class="error-message error-message-landallotment-proposed_finance_terms_doc_for_landallotment"></div>
                            </div>

                            <div class="form-group col-sm-12" id="proposed_finance_terms_doc_name_container_for_landallotment" style="display: none;">
                                <label>16. Proposed means of finance in terms of equity and term loan sought from various financial institutions GSFC/Own/Banks/Others. <span style="color: red;"><br> </label><br>
                                <a id="proposed_finance_terms_doc_name_download" target="_blank"><label id="proposed_finance_terms_doc_name_image_for_landallotment" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                                
                            </div>
                    </div>
                    <span class="box-title f-w-b page-header m-b-0">17. Nos. of persons likely to be employed.&nbsp;<span class="color-nic-red"></span></span>
                    <div class="row">
                        <div class="form-group col-sm-6">17.1 &nbsp;
                            <input type="checkbox" id="no_of_persons_likely_emp" name="no_of_persons_likely_emp" class="checkbox" value="{{is_checked}}">&nbsp;Skilled
                            <br/><span class="error-message error-message-msme-no_of_persons_likely_emp"></span>
                        </div>
                        <div class="form-group no_of_persons_likely_emp_div" style="display: none;">
                            <input type="text" id="no_of_persons_likely_emp_no" name="no_of_persons_likely_emp_no" class="form-control" placeholder="Enter Employed Skilled No !"
                                       maxlength="100" onkeyup="checkNumeric($(this));" onblur="checkValidation('landallotment', 'no_of_persons_likely_emp_no', noOfEmpValidationMessage);" value="{{landallotment_data.no_of_persons_likely_emp_no}}">
                           
                            <span class="error-message error-message-landallotment-no_of_persons_likely_emp_no"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">17.2 &nbsp;
                            <input type="checkbox" id="no_of_persons_likely_emp_unskilled" name="no_of_persons_likely_emp_unskilled" class="checkbox" value="{{is_checked}}">&nbsp;Unskilled
                            <br/><span class="error-message error-message-landallotment-no_of_persons_likely_emp_unskilled"></span>
                        </div>
                        <div class="form-group no_of_persons_likely_emp_unskilled_div" style="display: none;">
                                <input type="text" id="no_of_persons_likely_emp_no_unskilled" name="no_of_persons_likely_emp_no_unskilled" class="form-control" placeholder="Enter Employed Unskilled No !"
                                       maxlength="100" onkeyup="checkNumeric($(this));" onblur="checkValidation('landallotment', 'no_of_persons_likely_emp_no_unskilled', noOfEmpValidationMessage);" value="{{landallotment_data.no_of_persons_likely_emp_no_unskilled}}">
                           
                            <span class="error-message error-message-landallotment-no_of_persons_likely_emp_no_unskilled"></span>
                       </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">17.3 &nbsp;
                            <input type="checkbox" id="no_of_persons_likely_emp_staff" name="no_of_persons_likely_emp_staff" class="checkbox" value="{{is_checked}}">&nbsp;Staff
                            <br/><span class="error-message error-message-landallotment-no_of_persons_likely_emp_staff"></span>
                        </div>
                        <div class="form-group no_of_persons_likely_emp_staff_div" style="display: none;">
                                <input type="text" id="no_of_persons_likely_emp_no_staff" name="no_of_persons_likely_emp_no_staff" class="form-control" placeholder="Enter Staff No !"
                                       maxlength="100" onkeyup="checkNumeric($(this));" onblur="checkValidation('landallotment', 'no_of_persons_likely_emp_no_staff', noOfEmpValidationMessage);" value="{{landallotment_data.no_of_persons_likely_emp_no_staff}}">
                           
                            <span class="error-message error-message-landallotment-no_of_persons_likely_emp_no_staff"></span>
                       </div>
                    </div>
                    <div class="row">
                         <div class="form-group col-sm-12 " id="details_of_manufacturing_doc_container_for_landallotment">
                                <label>18.1 Details of manufacturing process (Please attach a short note on separate sheet)<span style="color: red;"> <br></span></label><br>
                                <input type="file" id="details_of_manufacturing_doc_for_landallotment" name="details_of_manufacturing_doc_for_landallotment"
                                       accept="image/pdf">
                                <div class="error-message error-message-landallotment-details_of_manufacturing_doc_for_landallotment"></div>
                            </div>

                            <div class="form-group col-sm-12" id="details_of_manufacturing_doc_name_container_for_landallotment" style="display: none;">
                                <label>18.1 Details of manufacturing process (Please attach a short note on separate sheet) <span style="color: red;">*<br>  <span style="color: red;"></span></label><br>
                                <a id="details_of_manufacturing_doc_name_download" target="_blank"><label id="details_of_manufacturing_doc_name_image_for_landallotment" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                                
                            </div>
                    </div>
                    <span class="box-title f-w-b page-header m-b-0">19. If you are an entrepreneur belonging ? </span>
                    <div class="row">
                        <div class="form-group col-sm-6">19.1 &nbsp;
                            <input type="checkbox" id="if_backward_class_bac" name="if_backward_class_bac" class="checkbox" value="{{is_checked}}" disabled>&nbsp;OBC
                            <span class="error-message error-message-landallotment-if_backward_class_bac"></span>
                        </div>
                        <div class=" if_backward_class_bac_div" style="display: none;">
                           <div class="form-group col-sm-12 " id="if_backward_class_bac_doc_container_for_landallotment">
                                <label>Please Upload document<span style="color: red;"><br></span></label><br>
                                <input type="file" id="if_backward_class_bac_doc_for_landallotment" name="if_backward_class_bac_doc_for_landallotment"
                                       accept="image/pdf">
                                <div class="error-message error-message-landallotment-if_backward_class_bac_doc_for_landallotment"></div>
                            </div>

                            <div class="form-group col-sm-12" id="if_backward_class_bac_doc_name_container_for_landallotment" style="display: none;">
                                <label>Please Upload document<span style="color: red;"><br> </label><br>
                                <a id="if_backward_class_bac_doc_name_download" target="_blank"><label id="if_backward_class_bac_doc_name_image_for_landallotment" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                                
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">19.2 &nbsp;
                            <input type="checkbox" id="if_backward_class_scst" name="if_backward_class_scst" class="checkbox" value="{{is_checked}}" disabled>&nbsp;SC/ST
                            <span class="error-message error-message-landallotment-if_backward_class_scst"></span>
                        </div>
                        <div class=" if_backward_class_scst_div" style="display: none;">
                       <div class="form-group col-sm-12 " id="if_backward_class_scst_doc_container_for_landallotment">
                                <label>Please Upload document<span style="color: red;"> <br></span></label><br>
                                <input type="file" id="if_backward_class_scst_doc_for_landallotment" name="if_backward_class_scst_doc_for_landallotment"
                                       accept="image/pdf">
                                <div class="error-message error-message-landallotment-if_backward_class_scst_doc_for_landallotment"></div>
                            </div>

                            <div class="form-group col-sm-12" id="if_backward_class_scst_doc_name_container_for_landallotment" style="display: none;">
                                <label>Please Upload document<span style="color: red;">*<br>  <span style="color: red;">*</span></label><br>
                                <a id="if_backward_class_scst_doc_name_download" target="_blank"><label id="if_backward_class_scst_doc_name_image_for_landallotment" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                                
                            </div>
                         </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">19.3 &nbsp;
                            <input type="checkbox" id="if_backward_class_ex_serv" name="if_backward_class_ex_serv" class="checkbox" value="{{is_checked}}" disabled>&nbsp;Ex-Service Men
                            <span class="error-message error-message-landallotment-if_backward_class_ex_serv"></span>
                        </div>
                        <div class="row if_backward_class_ex_serv_div" style="display: none;">   
                         <div class="form-group col-sm-12" id="if_backward_class_ex_serv_doc_container_for_landallotment">
                                <label>Please Upload document<span style="color: red;"> <br></span></label><br>
                                <input type="file" id="if_backward_class_ex_serv_doc_for_landallotment" name="if_backward_class_ex_serv_doc_for_landallotment"
                                       accept="image/pdf">
                                <div class="error-message error-message-landallotment-if_backward_class_ex_serv_doc_for_landallotment"></div>
                            </div>

                            <div class="form-group col-sm-12" id="if_backward_class_ex_serv_doc_name_container_for_landallotment" style="display: none;">
                                <label>Please Upload document<span style="color: red;">*<br>  <span style="color: red;">*</span></label><br>
                                <a id="if_backward_class_ex_serv_doc_name_download" target="_blank"><label id="if_backward_class_ex_serv_doc_name_image_for_landallotment" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                                
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">19.4 &nbsp;
                            <input type="checkbox" id="if_backward_class_wm" name="if_backward_class_wm" class="checkbox" value="{{is_checked}}" disabled>&nbsp;Women
                            <span class="error-message error-message-landallotment-if_backward_class_wm"></span>
                        </div>
                        <div class="row if_backward_class_wm_div" style="display: none;">
                          <div class="form-group col-sm-12" id="if_backward_class_wm_doc_container_for_landallotment">
                                <label>Please Upload document<span style="color: red;"> <br></span></label><br>
                                <input type="file" id="if_backward_class_wm_doc_for_landallotment" name="if_backward_class_wm_doc_for_landallotment"
                                       accept="image/pdf">
                                <div class="error-message error-message-landallotment-if_backward_class_wm_doc_for_landallotment"></div>
                            </div>

                            <div class="form-group col-sm-12" id="if_backward_class_wm_doc_name_container_for_landallotment" style="display: none;">
                                <label>Please Upload document<span style="color: red;"><br>  <span style="color: red;">*</span></label><br>
                                <a id="if_backward_class_wm_doc_name_download" target="_blank"><label id="if_backward_class_wm_doc_name_image_for_landallotment" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                                
                            </div>
                       </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">19.5 &nbsp;
                            <input type="checkbox" id="if_backward_class_ph" name="if_backward_class_ph" class="checkbox" value="{{is_checked}}" disabled>&nbsp;PH
                            <span class="error-message error-message-landallotment-if_backward_class_ph"></span>
                        </div>
                     <div class="row if_backward_class_ph_div" style="display: none;">
                        <div class="form-group col-sm-12" id="if_backward_class_ph_doc_container_for_landallotment">
                                <label>Please Upload document<span style="color: red;"> <br></span></label><br>
                                <input type="file" id="if_backward_class_ph_doc_for_landallotment" name="if_backward_class_ph_doc_for_landallotment"
                                       accept="image/pdf">
                                <div class="error-message error-message-landallotment-if_backward_class_ph_doc_for_landallotment"></div>
                            </div>

                            <div class="form-group col-sm-12" id="if_backward_class_ph_doc_name_container_for_landallotment" style="display: none;">
                                <label>Please Upload document<span style="color: red;"><br>  <span style="color: red;"></span></label><br>
                                <a id="if_backward_class_ph_doc_name_download" target="_blank"><label id="if_backward_class_ph_doc_name_image_for_landallotment" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                                
                            </div>
                            </div>
                    </div>
                      <div class="row">
                        <div class="form-group col-sm-6">19.6 &nbsp;
                            <input type="checkbox" id="if_belonging_transg" name="if_belonging_transg" class="checkbox" value="{{is_checked}}" disabled>&nbsp;Transgender
                            <span class="error-message error-message-landallotment-if_belonging_transg"></span>
                        </div>
                     <div class="row if_belonging_transg_div" style="display: none;">
                        <div class="form-group col-sm-12" id="if_belonging_transg_doc_container_for_landallotment">
                                <label>Please Upload document<span style="color: red;"> <br>(Maximum File Size: 1MB)&nbsp; (Upload PDF Only)</span></label><br>
                                <input type="file" id="if_belonging_transg_doc_for_landallotment" name="if_belonging_transg_doc_for_landallotment"
                                       accept="image/pdf">
                                <div class="error-message error-message-landallotment-if_belonging_transg_doc_for_landallotment"></div>
                            </div>

                            <div class="form-group col-sm-12" id="if_belonging_transg_doc_name_container_for_landallotment" style="display: none;">
                                <label>Please Upload document<span style="color: red;"><br>  <span style="color: red;"></span></label><br>
                                <a id="if_belonging_transg_doc_name_download" target="_blank"><label id="if_belonging_transg_doc_name_image_for_landallotment" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                                
                            </div>
                            </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">19.7 &nbsp;
                            <input type="checkbox" id="if_belonging_other" name="if_belonging_other" class="checkbox" value="{{is_checked}}" disabled>&nbsp;Others
                            <br/><span class="error-message error-message-landallotment-if_belonging_other"></span>
                        </div>
                     
                    </div>
                    
                            <div class="row">
                                <div class="form-group col-sm-12">
                            <label>20. (a) If You are a bonafide of DNH ?<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="radio" id="if_bonafide_yes" name="if_bonafide" class="" value="{{IS_CHECKED_YES}}" disabled>&nbsp; Yes
                                &emsp;
                                <input type="radio" id="if_bonafide_no" name="if_bonafide" class="" style="margin-bottom: 0px;" value="{{IS_CHECKED_NO}}" disabled>&nbsp;No
                            </div>
                            <span class="error-message error-message-landallotment-if_bonafide"></span>
                        </div>
                       
                        <div class=" if_bonafide_div" style="display: none;">
                            <div class="form-group col-sm-12 " id="bonafide_of_dnh_doc_container_for_landallotment">
                                <label>20.1 (a) Upload the bonafide of DNH and attach domicile certificate. <span style="color: red;"> <br></span></label><br>
                                <input type="file" id="bonafide_of_dnh_doc_for_landallotment" name="bonafide_of_dnh_doc_for_landallotment"
                                       accept="image/pdf">
                                <div class="error-message error-message-landallotment-bonafide_of_dnh_doc_for_landallotment"></div>
                            </div>

                            <div class="form-group col-sm-12" id="bonafide_of_dnh_doc_name_container_for_landallotment" style="display: none;">
                                <label>20.1 (a) Upload the bonafide of DNH and attach domicile certificate. <span style="color: red;"><br>  <span style="color: red;"></span></label><br>
                                <a id="bonafide_of_dnh_doc_name_download" target="_blank"><label id="bonafide_of_dnh_doc_name_image_for_landallotment" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                               
                            </div>
                        </div>
                    </div>
                     <div class="row">
                        <div class="form-group col-sm-12">
                            <label>20. (b) if not, please state particulars of the place to which you belong.<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="radio" id="ifnot_state_particular_place_yes" name="ifnot_state_particular_place" class="" value="{{IS_CHECKED_YES}}" >&nbsp; Yes
                                &emsp;
                                <input type="radio" id="ifnot_state_particular_place_no" name="ifnot_state_particular_place" class="" style="margin-bottom: 0px;" value="{{IS_CHECKED_NO}}" >&nbsp;No
                            </div>
                            <span class="error-message error-message-landallotment-ifnot_state_particular_place"></span>
                        </div>
                        <div class=" ifnot_state_particular_place_div" style="display: none;">
                    <div class="form-group col-sm-12">
                            <label>20.1 (b) State particulars of the place to which you belong<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="state_particular_place" name="state_particular_place" class="form-control" placeholder="Enter Place !" maxlength="100" onblur="checkValidation('landallotment', 'state_particular_place', detailValidationMessage);">{{landallotment_data.state_particular_place}}</textarea>
                            </div>
                            <span class="error-message error-message-landallotment-state_particular_place"></span>
                        </div>
                     </div>
                    </div>
                    
                    <div class="row">
                         <div class="form-group col-sm-12 " id="information_raw_materials_doc_container_for_landallotment">
                                <label>21. Upload Information about raw materials, area required and production.</label><br>
                                <input type="file" id="information_raw_materials_doc_for_landallotment" name="information_raw_materials_doc_for_landallotment"
                                       accept="image/pdf">
                                <div class="error-message error-message-landallotment-information_raw_materials_doc_for_landallotment"></div>
                            </div>

                            <div class="form-group col-sm-12" id="information_raw_materials_doc_name_container_for_landallotment" style="display: none;">
                                <label>21. Upload Information about raw materials, area required and production. </label><br>
                                <a id="information_raw_materials_doc_name_download" target="_blank"><label id="information_raw_materials_doc_name_image_for_landallotment" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                                
                            </div>
                    </div>
                    <div class="form-group col-sm-6">
                            <label>21.1 Details of open space required and purpose.<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="detail_of_space" name="detail_of_space" class="form-control" placeholder="Enter open space required and purpose !" maxlength="100" onblur="checkValidation('landallotment', 'detail_of_space', detailValidationMessage);">{{landallotment_data.detail_of_space}}</textarea>
                            </div>
                            <span class="error-message error-message-landallotment-detail_of_space"></span>
                        </div>
                    <div class="row">
                         <div class="form-group col-sm-12 " id="infrastructure_requirement_doc_container_for_landallotment">
                                <label>22. Upload the Infrastructure requirement. </label><br>
                                <input type="file" id="infrastructure_requirement_doc_for_landallotment" name="infrastructure_requirement_doc_for_landallotment"
                                       accept="image/pdf">
                                <div class="error-message error-message-landallotment-infrastructure_requirement_doc_for_landallotment"></div>
                            </div>

                            <div class="form-group col-sm-12" id="infrastructure_requirement_doc_name_container_for_landallotment" style="display: none;">
                                <label>22. Upload the Infrastructure requirement. </label><br>
                                <a id="infrastructure_requirement_doc_name_download" target="_blank"><label id="infrastructure_requirement_doc_name_image" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                                
                            </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>22.1 Please indicate Indian standard to followed for Water/Air treatment.<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="treatment_indicate" name="treatment_indicate" class="form-control" placeholder="Enter Followed for Treatment !" maxlength="100" onblur="checkValidation('landallotment', 'treatment_indicate', detailValidationMessage);">{{landallotment_data.treatment_indicate}}</textarea>
                            </div>
                            <span class="error-message error-message-landallotment-treatment_indicate"></span>
                        </div>
                        <div class="form-group col-sm-12 " id="effluent_teratment_doc_container_for_landallotment">
                                <label>22.2 Upload Document of separate sheet for the process of effluent treatment. <span style="color: red;"><br></span></label><br>
                                <input type="file" id="effluent_teratment_doc_for_landallotment" name="effluent_teratment_doc_for_landallotment"
                                       accept="image/pdf">
                                <div class="error-message error-message-landallotment-effluent_teratment_doc_for_landallotment"></div>
                            </div>

                            <div class="form-group col-sm-12" id="effluent_teratment_doc_name_container_for_landallotment" style="display: none;">
                                <label>22.2 Upload Document of separate sheet for the process of effluent treatment. <span style="color: red;"><br>  <span style="color: red;"></span></label><br>
                                <a id="effluent_teratment_doc_name_download" target="_blank"><label id="effluent_teratment_doc_name_image_for_landallotment" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                                
                            </div>
                     </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>22.3 Details of emission of gases and its likely effect on adjoining plants, cultivation and habitants.<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="detail_of_emission_of_gases" name="detail_of_emission_of_gases" class="form-control" placeholder="Enter Detail Of Gases!" maxlength="100" onblur="checkValidation('landallotment', 'detail_of_emission_of_gases', detailValidationMessage);">{{landallotment_data.detail_of_emission_of_gases}}</textarea>
                            </div>
                            <span class="error-message error-message-landallotment-detail_of_emission_of_gases"></span>
                        </div>
                        <div class="form-group col-sm-12" id="emission_of_gases_doc_container_for_landallotment">
                            <label>22.4 Upload Document of emission of gases.<span style="color: red;">&nbsp; <br></span></label><br>
                            <input type="file" id="emission_of_gases_doc_for_landallotment" name="emission_of_gases_doc_for_landallotment"
                                   accept="image/pdf">
                            <div class="error-message error-message-landallotment-emission_of_gases_doc_for_landallotment"></div>
                        </div>
                        <div class="form-group col-sm-12" id="emission_of_gases_doc_name_container_for_landallotment" style="display: none;">
                            <label>22.4 Upload Document of emission of gases.<span style="color: red;">&nbsp; <br> <span style="color: red;"></span></label><br>
                            <a id="emission_of_gases_doc_name_download" target="_blank"><label id="emission_of_gases_doc_name_image_for_landallotment" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            
                        </div>
                        
                    </div></br>

                   
                    <h2 class="box-title f-w-b page-header color-nic-blue f-s-20px m-b-0" style="text-align: center">CHECKLIST FOR THE ALLOTMENT OF PLOT</h2>
                    <div class="row">
                        <div class="form-group col-sm-12" id="copy_authority_letter_doc_container_for_landallotment">
                            <label>23. Copy of Authority Letter/Board of Director’s Resolution of company depending on constitution of the applicant.<span style="color: red;">&nbsp; <br></span></label><br>
                            <input type="file" id="copy_authority_letter_doc_for_landallotment" name="copy_authority_letter_doc_for_landallotment"
                                   accept="image/pdf">
                            <div class="error-message error-message-landallotment-copy_authority_letter_doc_for_landallotment"></div>
                        </div>
                        <div class="form-group col-sm-12" id="copy_authority_letter_doc_name_container_for_landallotment" style="display: none;">
                            <label>23. Copy of Authority Letter/Board of Director’s Resolution of company depending on constitution of the applicant.<span style="color: red;">&nbsp; <br> <span style="color: red;"></span></label><br>
                            <a id="copy_authority_letter_doc_name_download" target="_blank"><label id="copy_authority_letter_doc_name_image_for_landallotment" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            
                        </div>
                     </div>
                <div class="row">
                         <div class="form-group col-sm-12" id="copy_project_profile_doc_container_for_landallotment">
                            <label>24. Upload Copy of Project profile<span style="color: red;">&nbsp; <br></span></label><br>
                            <input type="file" id="copy_project_profile_doc_for_landallotment" name="copy_project_profile_doc_for_landallotment"
                                   accept="image/pdf">
                            <div class="error-message error-message-landallotment-copy_project_profile_doc_for_landallotment"></div>
                        </div>
                        <div class="form-group col-sm-12" id="copy_project_profile_doc_name_container_for_landallotment" style="display: none;">
                            <label>24. Upload Copy of Project profile <span style="color: red;">&nbsp; <br> <span style="color: red;"></span></label><br>
                            <a id="copy_project_profile_doc_name_download" target="_blank"><label id="copy_project_profile_doc_name_image_for_landallotment" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                           
                        </div>

                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12 " id="demand_of_deposit_draft_container_for_landallotment">
                                <label>25. Upload Bank draft or payment confirmation towards earnest money and application fees<span style="color: red;"><br></span></label><br>
                                <input type="file" id="demand_of_deposit_draft_for_landallotment" name="demand_of_deposit_draft_for_landallotment"
                                       accept="image/pdf">
                                <div class="error-message error-message-landallotment-demand_of_deposit_draft_for_landallotment"></div>
                            </div>

                            <div class="form-group col-sm-12" id="demand_of_deposit_draft_name_container_for_landallotment" style="display: none;">
                                <label>25. Upload Bank draft or payment confirmation towards earnest money and application fees<span style="color: red;"></span></label><br>
                                <a id="demand_of_deposit_draft_name_download" target="_blank"><label id="demand_of_deposit_draft_name_image_for_landallotment" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                                
                            </div>
                        </div>
                    <div class="row">
                         <div class="form-group col-sm-12" id="copy_proposed_land_doc_container_for_landallotment">
                            <label>26. Upload Copy of proposed land utilization plan.<span style="color: red;">&nbsp; <br></span></label><br>
                            <input type="file" id="copy_proposed_land_doc_for_landallotment" name="copy_proposed_land_doc_for_landallotment"
                                   accept="image/pdf">
                            <div class="error-message error-message-landallotment-copy_proposed_land_doc_for_landallotment"></div>
                        </div>
                        <div class="form-group col-sm-12" id="copy_proposed_land_doc_name_container_for_landallotment" style="display: none;">
                            <label>26. Upload Copy of proposed land utilization plan. <span style="color: red;">&nbsp; <br> <span style="color: red;"></span></label><br>
                            <a id="copy_proposed_land_doc_name_download" target="_blank"><label id="copy_proposed_land_doc_name_image_for_landallotment" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                           
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="copy_of_partnership_deed_doc_container_for_landallotment">
                            <label>27. Upload Copy of Partnership deed/memorandum of association and article of association depending on constitution of the applicant.<span style="color: red;">&nbsp; <br></span></label><br>
                            <input type="file" id="copy_of_partnership_deed_doc_for_landallotment" name="copy_of_partnership_deed_doc_for_landallotment"
                                   accept="image/pdf">
                            <div class="error-message error-message-landallotment-copy_of_partnership_deed_doc_for_landallotment"></div>
                        </div>
                        <div class="form-group col-sm-12" id="copy_of_partnership_deed_doc_name_container_for_landallotment" style="display: none;">
                            <label>27. Upload Copy of Partnership deed/memorandum of association/article of association depending on constitution of the applicant. <span style="color: red;">&nbsp; <br> <span style="color: red;"></span></label><br>
                            <a id="copy_of_partnership_deed_doc_name_download" target="_blank"><label id="copy_of_partnership_deed_doc_name_image_for_landallotment" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            
                        </div>
                       </div> 
                    <div class="row">
                        <div class="form-group col-sm-12" id="relevant_experience_doc_container_for_landallotment">
                            <label>28. Upload Document showing net worth or turnover of previous year and relevant experience.<span style="color: red;">&nbsp; <br></span></label><br>
                            <input type="file" id="relevant_experience_doc_for_landallotment" name="relevant_experience_doc_for_landallotment"
                                   accept="image/pdf">
                            <div class="error-message error-message-landallotment-relevant_experience_doc_for_landallotment"></div>
                        </div>
                        <div class="form-group col-sm-12" id="relevant_experience_doc_name_container_for_landallotment" style="display: none;">
                            <label>28. Upload Document showing net worth or turnover of previous year and relevant experience. <span style="color: red;">&nbsp; <br> <span style="color: red;"></span></label><br>
                            <a id="relevant_experience_doc_name_download" target="_blank"><label id="relevant_experience_doc_name_image_for_landallotment" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            
                        </div>
                    </div> 
                    <div class="row"> 
                        <div class="form-group col-sm-12">
                            <label>29. Ministry and Export promotion council in case of 100% EOU or Not !. <span style="color: red;"> </span> &emsp;</label>
                            <input type="radio" id="if_promotion_council_yes" name="if_promotion_council" value="{{IS_CHECKED_YES}}"> Yes &emsp; 

                            <input type="radio" id="if_promotion_council_no" name="if_promotion_council" value="{{IS_CHECKED_NO}}"> No
                            <br><span class="error-message error-message-landallotment-if_promotion_council"></span>
                        </div>
                        <div class=" if_promotion_council_div" style="display: none;">
                        <div class="form-group col-sm-12" id="certy_by_direc_indus_doc_container_for_landallotment">
                            <label>29.1 Upload Certificate issued by Directorate of industry.<span style="color: red;">&nbsp; <br></span></label><br>
                            <input type="file" id="certy_by_direc_indus_doc_for_landallotment" name="certy_by_direc_indus_doc_for_landallotment"
                                   accept="image/pdf">
                            <div class="error-message error-message-landallotment-certy_by_direc_indus_doc_for_landallotment"></div>
                        </div>
                        <div class="form-group col-sm-12" id="certy_by_direc_indus_doc_name_container_for_landallotment" style="display: none;">
                            <label>29.1 Upload Certificate issued by Directorate of industry. <span style="color: red;">&nbsp; <br> <span style="color: red;"></span></label><br>
                            <a id="certy_by_direc_indus_doc_name_download" target="_blank"><label id="certy_by_direc_indus_doc_name_image_for_landallotment" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            
                        </div>
                    </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="other_relevant_doc_container_for_landallotment">
                            <label>30. Upload Any other relevant document.<span style="color: red;">&nbsp; <br></span></label><br>
                            <input type="file" id="other_relevant_doc_for_landallotment" name="other_relevant_doc_for_landallotment"
                                   accept="image/pdf">
                            <div class="error-message error-message-landallotment-other_relevant_doc_for_landallotment"></div>
                        </div>
                        <div class="form-group col-sm-12" id="other_relevant_doc_name_container_for_landallotment" style="display: none;">
                            <label>30. Upload Any other relevant document. <span style="color: red;">&nbsp; <br> <span style="color: red;"></span></label><br>
                            <a id="other_relevant_doc_name_download" target="_blank"><label id="other_relevant_doc_name_image_for_landallotment" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-sm-12"> 
                            <strong>24. Declaration</strong><br/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-12">
                            <div class="input-group">
                                <span class="input-group-addon"> &nbsp;
                                    <input type="checkbox" class="" name="declaration" id="declaration" autocomplete="true" value="{{is_checked}}" onblur="checkValidation('landallotment', 'declaration', declarationOneValidationMessage);">&nbsp;). I/We hereby give an undertaking that I/We will abide by the terms and conditions laid down by the Administration of Dadra and Nagar Haveli from time to time.
                                    <span style="color: red;"></span>
                                </span>
                            </div>
                            <span class="error-message error-message-landallotment-declaration"></span>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-12 m-b-5px" id="seal_and_stamp_container_for_landallotment">
                            <label>28. Signature<span style="color: red;"> </span></label><br>
                            <input type="file" id="seal_and_stamp_for_landallotment" name="seal_and_stamp_for_landallotment"
                                   accept="image/jpg,image/png,image/jpeg,image/jfif">
                            <div class="error-message error-message-landallotment-seal_and_stamp_for_landallotment"></div>
                        </div>
                        <div class="form-group col-sm-12" id="seal_and_stamp_name_container_for_landallotment" style="display: none;">
                            <label>28. Principal Employer Seal & Stamp <span style="color: red;"></label><br>
                            <a target="_blank" id="seal_and_stamp_download"><img id="seal_and_stamp_name_image_for_landallotment" style="width: 250px; height: 250px; border: 2px solid blue;"></a>
                            
                        </div>
                    </div>

                    <div class="form-group"><!-- 
                        <button type="button" id="draft_btn_for_landallotment" class="btn btn-sm btn-nic-blue" onclick="Landallotment.listview.submitLandallotment({{VALUE_ONE}});" style="margin-right: 5px;">Save as a Draft</button> -->
                        <button type="button" id="submit_btn_for_landallotment" class="btn btn-sm btn-success" onclick="Landallotment.listview.submitLandallotment({{VALUE_TWO}});" style="margin-right: 5px;"><i class="fas fa-save"></i> Submit</button>
                        <button type="button" class="btn btn-sm btn-danger" onclick="showTableContainer('landallotment');"><i class="fas fa-times"></i> Close</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>