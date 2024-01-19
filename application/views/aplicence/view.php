<div class="row">
    <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title" style="float: none; text-align: center;">FORM - IV</h3>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">[See Rule 21(1)]</div>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">APPLICATION FOR LICENCE</div>
                <form role="form" id="aplicence_form" name="aplicence_form" onsubmit="return false;">

                    <input type="hidden" id="aplicence_id" name="aplicence_id" value="{{aplicence_id}}">
                    <div class="card-body">
                        <div class="row">
                            <div class="form-group col-sm-6">
                                <label>1. District <span style="color: red;">*</span></label>
                                <div class="input-group">
                                    <select id="district" name="district" class="form-control select2" disabled=""
                                            data-placeholder="Select District" style="width: 100%;">  
                                    </select>
                                </div>
                                <span class="error-message error-message-aplicence-district"></span>
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
                        <h3 class="box-title f-w-b page-header color-nic-blue f-s-20px m-b-0">2. Contractor Information</h3>
                        <hr class="m-b-5px">
                        <div class="row">
                            <div class="form-group col-sm-6">
                                <label>2.1 Name of Contractor<span class="color-nic-red">*</span></label>
                                <div class="input-group">
                                    <input type="text" id="contractor_name" name="contractor_name" class="form-control" placeholder="Enter Name of Contractor !"
                                           maxlength="100" readonly="" value="{{contractor_name}}">
                                </div>
                                <span class="error-message error-message-aplicence-contractor_name"></span>
                            </div>
                            <div class="form-group col-sm-6">
                                <label>2.2 Contractor Father Name <span class="color-nic-red">*</span></label>
                                <div class="input-group">
                                    <input type="text" id="contractor_fathername" name="contractor_fathername" class="form-control" placeholder="Enter Contractor Father Name!"
                                           maxlength="100" readonly="" value="{{contractor_fathername}}">
                                </div>
                                <span class="error-message error-message-aplicence-contractor_fathername"></span>
                            </div>
                        </div>

                        <div class="row">
                            <div class="form-group col-sm-6">
                                <label>2.3 Contractor Address<span class="color-nic-red">*</span></label>
                                <div class="input-group">
                                    <textarea id="contractor_address" name="contractor_address" class="form-control" placeholder="Enter Address!" maxlength="100" readonly="">{{contractor_address}}</textarea>
                                </div>
                                <span class="error-message error-message-aplicence-contractor_address"></span>
                            </div>
                            <div class="form-group col-sm-6">
                                <label>2.4 Contractor Contact No. <span class="color-nic-red">*</span></label>
                                <div class="input-group">
                                    <input type="text" id="contractor_contact" name="contractor_contact" class="form-control" placeholder="Enter Contact No!"
                                           maxlength="100" readonly="" value="{{contractor_contact}}">
                                </div>
                                <span class="error-message error-message-aplicence-contractor_contact"></span>
                            </div>
                        </div>

                        <div class="row">
                            <div class="form-group col-sm-6">
                                <label>2.5 Contractor Email<span class="color-nic-red">*</span></label>
                                <div class="input-group">
                                    <input type="text" id="contractor_email" name="contractor_email" class="form-control" placeholder="Enter Contractor Email !"
                                           maxlength="100" readonly="" value="{{contractor_email}}">
                                </div>
                                <span class="error-message error-message-aplicence-contractor_email"></span>
                            </div>
                        </div>
                        <h3 class="box-title f-w-b page-header color-nic-blue f-s-20px m-b-0">3. Particulars of Establishment or Extablishments where contract labour is to be employed</h3>
                        <hr class="m-b-5px">
                        <div class="row">
                            <div class="form-group col-sm-6">
                                <label>3.1 Name of Establishment<span class="color-nic-red">*</span></label>
                                <div class="input-group">
                                    <input type="text" id="establi_name" name="establi_name" class="form-control" placeholder="Enter Name of Applicant !"
                                           maxlength="100" readonly="" value="{{establi_name}}">
                                </div>
                                <span class="error-message error-message-aplicence-establi_name"></span>
                            </div>
                            <div class="form-group col-sm-6">
                                <label>3.2 Address of Establishment <span class="color-nic-red">*</span></label>
                                <div class="input-group">
                                    <textarea id="establi_address" name="establi_address" class="form-control" placeholder="Enter Address of Establishment !" maxlength="100" readonly="">{{establi_address}}</textarea>
                                </div>
                                <span class="error-message error-message-aplicence-establi_address"></span>
                            </div>
                        </div>

                        <div class="row">
                            <div class="form-group col-sm-6">
                                <label>3.3 No. Of certificate of Registration of Establishment under act<span class="color-nic-red">*</span></label>
                                <div class="input-group">
                                    <input type="text" id="no_of_certificate" name="no_of_certificate" class="form-control" placeholder="Enter No. Of certificate !"
                                           maxlength="100" readonly="" value="{{no_of_certificate}}">
                                </div>
                                <span class="error-message error-message-aplicence-no_of_certificate"></span>
                            </div>
                            <div class="form-group col-sm-6">
                                <label>3.4 Date  Of certificate of Registration of Establishment under act<span style="color: red;">*</span></label>
                                <div class="input-group date">
                                    <input type="text" name="date_of_certificate" id="date_of_certificate" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                                           value="{{date_of_certificate}}" readonly="">
                                    <div class="input-group-append">
                                        <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                    </div>
                                </div>
                                <span class="error-message error-message-aplicence-date_of_certificate"></span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-sm-6">
                                <label>3.5 Name of Principal Employer<span class="color-nic-red">*</span></label>
                                <div class="input-group">
                                    <input type="text" id="employer_name" name="employer_name" class="form-control" placeholder="Enter Name of Employer !"
                                           maxlength="100" readonly="" value="{{employer_name}}">
                                </div>
                                <span class="error-message error-message-aplicence-employer_name"></span>
                            </div>
                            <div class="form-group col-sm-6">
                                <label>3.6 Address of Principal Employer <span class="color-nic-red">*</span></label>
                                <div class="input-group">
                                    <textarea id="employer_address" name="employer_address" class="form-control" placeholder="Enter Employer Address !" maxlength="100" readonly="">{{employer_address}}</textarea>
                                </div>
                                <span class="error-message error-message-aplicence-employer_address"></span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-sm-6">
                                <label>3.7 Nature of process, Opration of work for which establishment in engaged <span class="color-nic-red">*</span></label>
                                <div class="input-group">
                                    <input type="text" id="nature_of_process_for_establi" name="nature_of_process_for_establi" class="form-control" placeholder="Enter Nature of process !" maxlength="100" readonly="" value="{{nature_of_process_for_establi}}">
                                </div>
                                <span class="error-message error-message-aplicence-nature_of_process_for_establi"></span>
                            </div>
                            <div class="form-group col-sm-6">
                                <label>3.8 Nature of process, Opration or work  for which contract labour to be employed in the establishment <span class="color-nic-red">*</span></label>
                                <div class="input-group">
                                    <input type="text" id="nature_of_process_for_labour" name="nature_of_process_for_labour" class="form-control" placeholder="Enter Nature of process for contract labour!"  maxlength="100" readonly="" value="{{nature_of_process_for_labour}}">
                                </div>
                                <span class="error-message error-message-aplicence-nature_of_process_for_labour"></span>
                            </div>
                        </div>

                        <div class="row">
                            <div class="form-group col-sm-6">
                                <label>3.9 Duration of process contract work<span class="color-nic-red">*</span></label>
                                <div class="input-group">
                                    <input type="text" id="duration_of_work" name="duration_of_work" class="form-control" placeholder="Enter Duration of Work !"
                                           maxlength="100" readonly="" value="{{duration_of_work}}">
                                </div>
                                <span class="error-message error-message-aplicence-duration_of_work"></span>
                            </div>
                            <div class="form-group col-sm-6">
                                <label>3.10 Name of Agent or manager of contractor at the work establishment<span class="color-nic-red">*</span></label>
                                <div class="input-group">
                                    <input type="text" id="name_of_agent" name="name_of_agent" class="form-control" placeholder="Enter Name of Agent !"  maxlength="100" readonly="" value="{{name_of_agent}}">
                                </div>
                                <span class="error-message error-message-aplicence-name_of_agent"></span>
                            </div>
                        </div>

                        <div class="row">
                            <div class="form-group col-sm-6">
                                <label>3.11 Address of Agent or manager of contractor at the work establishment<span class="color-nic-red">*</span></label>
                                <div class="input-group">
                                    <textarea id="address_of_agent" name="address_of_agent" class="form-control" placeholder="Enter Address of Agent !" maxlength="100" readonly="">{{address_of_agent}}</textarea>
                                </div>
                                <span class="error-message error-message-aplicence-address_of_agent"></span>
                            </div>
                            <div class="form-group col-sm-6">
                                <label>3.12 Maximum number of employess proposed to be employed as contract employed as contract labour in establishment <span class="color-nic-red">*</span></label>
                                <div class="input-group">
                                    <input type="text" id="max_no_of_empl" name="max_no_of_empl" class="form-control" placeholder="Enter Maximum number of employess !"
                                           maxlength="100" readonly="" value="{{max_no_of_empl}}">
                                </div>
                                <span class="error-message error-message-aplicence-max_no_of_empl"></span>
                            </div>
                        </div>

                        <div class="row">
                            <div class="form-group col-sm-6">
                                <label>4. Whether the contractor has worked in any other establishmemnt within five year ?</label>&nbsp;
                                <input type="checkbox" id="if_contractor_work_other_place" name="if_contractor_work_other_place" class="checkbox" disabled="" value="{{is_checked}}">

                            </div>


                            <div class="form-group col-sm-6 if_contractor_work_other_place_div" style="display: none;">
                                <label>4.1 Detail of the Principal Employer, establishment and nature of work.<span class="color-nic-red"></span></label>
                                <textarea id="detail_of_other_work" name="detail_of_other_work" class="form-control" placeholder="Enter Nature of work !" maxlength="100" readonly="">{{detail_of_other_work}}</textarea>

                                <span class="error-message error-message-aplicence-detail_of_other_work"></span>
                            </div>

                        </div> <br>

                        <div class="row">
                            <div class="form-group col-sm-6">
                                <label>5. Estimated value of the contract work <span class="color-nic-red">*</span></label>
                                <div class="input-group">
                                    <input type="text" id="estimeted_value" name="estimeted_value" class="form-control" placeholder="Enter Estimated value !"
                                           maxlength="100" readonly="" value="{{estimeted_value}}">
                                </div>
                                <span class="error-message error-message-aplicence-estimeted_value"></span>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-6 m-b-5px" id="formv_doc_container_for_aplicence_view">
                                <label>6. Upload Document of Form-V issued by Principal Employer.</span></label><br>
                                <label class="f-w-n">Document Not Uploaded</label><br>
                            </div>
                            <div class="form-group col-sm-12" id="formv_doc_name_container_for_aplicence_view" style="display: none;">
                                <label>6. Upload Document of Form-V issued by Principal Employer.</label><br>
                                <a id="formv_doc_name_download" target="_blank"><label id="formv_doc_name_image_for_aplicence_view" class="btn btn-sm btn-nic-blue f-w-n" style="border: 2px solid blue;">{{VIEW_UPLODED_DOCUMENT}}</label></a>

                            </div>
                        </div>

                        <div class="row">
                            <div class="col-6 m-b-5px" id="formiv_doc_container_for_aplicence_view">
                                <label>7. Upload Document of Form-V issued by Principal Employer.</span></label><br>
                                <label class="f-w-n">Document Not Uploaded</label><br>
                            </div>
                            <div class="form-group col-sm-12" id="formiv_doc_name_container_for_aplicence_view" style="display: none;">
                                <label>7. Upload Document of Form-V issued by Principal Employer.</label><br>
                                <a id="formiv_doc_name_download" target="_blank"><label id="formiv_doc_name_image_for_aplicence_view" class="btn btn-sm btn-nic-blue f-w-n" style="border: 2px solid blue;">{{VIEW_UPLODED_DOCUMENT}}</label></a>

                            </div>
                        </div>

                        <div class="row">
                            <div class="col-6 m-b-5px" id="register_certification_doc_container_for_aplicence_view">
                                <label>8. Upload Document of Form-V issued by Principal Employer.</span></label><br>
                                <label class="f-w-n">Document Not Uploaded</label><br>
                            </div>
                            <div class="form-group col-sm-12" id="register_certification_doc_name_container_for_aplicence_view" style="display: none;">
                                <label>8. Upload Document of Form-V issued by Principal Employer.</label><br>
                                <a id="register_certification_doc_name_download" target="_blank"><label id="register_certification_doc_name_image_for_aplicence_view" class="btn btn-sm btn-nic-blue f-w-n" style="border: 2px solid blue;">{{VIEW_UPLODED_DOCUMENT}}</label></a>

                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12 m-b-5px" id="seal_and_stamp_container_for_aplicence_view">
                                <label>9. Signature <span style="color: red;"></span></label><br>
                                <label class="f-w-n">Document Not Uploaded</label><br>
                            </div>
                            <div class="form-group col-sm-12" id="seal_and_stamp_name_container_for_aplicence_view" style="display: none;">
                                <label>9. Signature <span style="color: red;"></label><br>
                                <a id="seal_and_stamp_download" target="_blank"><img id="seal_and_stamp_name_image_for_aplicence_view" style="width: 250px; height: 250px; border: 2px solid blue;"></a>
                            </div>
                        </div>

                        <hr class="m-b-5px">
                        <div class="form-group">
                            <button type="button" class="btn btn-sm btn-danger" onclick="showTableContainer('aplicence');"><i class="fas fa-times"></i> Close</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>